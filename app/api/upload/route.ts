import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { extractText } from "@/lib/documents/extractText";
import { summarizeDocument } from "@/lib/documents/summarizeDocument";
import { isSupportedExtension } from "@/lib/documents/supportedTypes";
import { GeminiProvider } from "@/lib/ai/providers/gemini";
import { toReadableError } from "@/lib/utils/errors";
import { requireOwnership } from "@/lib/auth/requireSession";

// File size limit: 10 MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function getConvexClient(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  return new ConvexHttpClient(url);
}

export async function POST(req: NextRequest) {
  let documentId: Id<"documents"> | null = null;
  const convex = getConvexClient();

  try {
    // ── 1. Parse multipart form data ─────────────────────────────────────
    const formData = await req.formData();
    const workspaceId = formData.get("workspaceId");
    const file = formData.get("file");

    if (!workspaceId || typeof workspaceId !== "string") {
      return NextResponse.json(
        { success: false, error: "workspaceId is required" },
        { status: 400 }
      );
    }

    const session = await requireOwnership(workspaceId);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "file is required" },
        { status: 400 }
      );
    }

    // ── 2. Validate file ─────────────────────────────────────────────────
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File exceeds 10 MB limit" },
        { status: 413 }
      );
    }

    // Browsers sometimes send "text/plain" for .md files — normalise to the
    // canonical MIME type so downstream extractors handle it correctly.
    const rawMime = file.type || "application/octet-stream";
    const lower = file.name.toLowerCase();
    const mimeType =
      rawMime === "text/plain" && lower.endsWith(".md") ? "text/markdown" : rawMime;

    if (!isSupportedExtension(file.name)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file type. Accepted: .txt, .md, .pdf`,
        },
        { status: 415 }
      );
    }

    // ── 3. Create document record (status: "uploaded") ───────────────────
    documentId = await convex.mutation(api.documents.createDocumentRecord, {
      workspaceId: workspaceId as Id<"workspaces">,
      fileName: file.name,
      fileType: mimeType,
      // MVP: no binary file storage — text is extracted in-memory
      storagePath: undefined,
    });

    // ── 4. Mark as processing ─────────────────────────────────────────────
    await convex.mutation(api.documents.updateDocumentProcessingStatus, {
      documentId,
      processingStatus: "processing",
    });

    // ── 5. Extract text ───────────────────────────────────────────────────
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const extraction = await extractText(fileBuffer, file.name, mimeType);

    if (extraction.error && !extraction.text) {
      // Hard failure: no text at all and not a soft partial failure
      if (!extraction.partial) {
        await convex.mutation(api.documents.updateDocumentProcessingStatus, {
          documentId,
          processingStatus: "error",
        });
        return NextResponse.json(
          {
            success: false,
            error: extraction.error,
            documentId,
          },
          { status: 422 }
        );
      }
      // Partial (e.g. scanned PDF) — document is saved but no summary
    }

    // ── 6. Summarize + tag via Gemini ─────────────────────────────────────
    let summary = "Document uploaded. AI summary not available.";
    let tags: string[] = [];
    let keyFacts: string[] = [];
    let aiStatus: "success" | "skipped" | "failed" = "skipped";
    let aiError: string | undefined;

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      aiError = "GEMINI_API_KEY not configured on server";
      console.warn("[upload] GEMINI_API_KEY not set — skipping AI summarization");
    } else if (!extraction.text.trim()) {
      aiError = "No text extracted from document";
    } else {
      try {
        const provider = new GeminiProvider(geminiKey);
        const result = await summarizeDocument(extraction.text, provider);
        summary = result.summary;
        tags = result.tags;
        keyFacts = result.keyFacts;
        aiStatus = "success";

        if (keyFacts.length > 0) {
          summary =
            result.summary +
            "\n\nKey Facts:\n" +
            keyFacts.map((f) => `- ${f}`).join("\n");
        }
      } catch (err) {
        aiStatus = "failed";
        aiError = err instanceof Error ? err.message : String(err);
        console.error("[upload] AI processing failed:", err);
        summary = "Document uploaded. AI summarization failed — will retry on next access.";
      }
    }

    // ── 7. Save results (status: "done") ──────────────────────────────────
    await convex.mutation(api.documents.saveDocumentSummary, {
      documentId,
      extractedText: extraction.text || undefined,
      summary,
      tags,
    });

    // ── 8. Extract document-derived memory patterns ────────────────────
    if (aiStatus === "success") {
      try {
        const { extractPatternsFromDocuments } = await import("@/lib/memory/extractFromDocuments");
        const { savePatterns } = await import("@/lib/memory/savePatterns");
        const docPatterns = extractPatternsFromDocuments(
          [{ fileName: file.name, summary, tags }],
          workspaceId
        );
        if (docPatterns.length > 0) {
          await savePatterns(docPatterns, (p) =>
            convex.mutation(api.memory.saveMemoryPattern, {
              workspaceId: p.workspaceId ? (p.workspaceId as Id<"workspaces">) : undefined,
              scope: p.scope,
              category: p.category,
              functionArea: p.functionArea,
              industry: p.industry,
              patternText: p.patternText,
              confidenceScore: p.confidenceScore,
              sourceType: p.sourceType,
            })
          );
        }
      } catch (memErr) {
        console.error("[upload] document memory extraction failed (non-fatal):", memErr);
      }
    }

    return NextResponse.json({
      success: true,
      documentId,
      fileName: file.name,
      summary: keyFacts.length > 0
        ? summary.split("\n\nKey Facts:")[0]
        : summary,
      keyFacts,
      tags,
      aiStatus,
      ...(aiError && { aiError }),
    });
  } catch (error) {
    console.error("[upload] unhandled error:", error);

    // Best-effort: mark document as errored if one was already created
    if (documentId) {
      try {
        await convex.mutation(api.documents.updateDocumentProcessingStatus, {
          documentId,
          processingStatus: "error",
        });
      } catch {
        // ignore secondary failure
      }
    }

    return NextResponse.json(
      { success: false, error: toReadableError(error) },
      { status: 500 }
    );
  }
}
