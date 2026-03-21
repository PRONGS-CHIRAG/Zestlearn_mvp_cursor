import type { AIProvider } from "@/lib/ai";
import {
  buildSummarizeSystemPrompt,
  buildSummarizeUserPrompt,
} from "@/lib/ai/prompts/summarize";
import { parseSummaryResponse } from "@/lib/ai/parsers/summaryParser";
import { tagDocument } from "./tagDocument";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DocumentSummaryResult {
  /** 3–5 sentence description of the document for downstream AI context. */
  summary: string;
  /** 1–5 taxonomy tags useful for filtering/retrieval. */
  tags: string[];
  /**
   * 3–6 specific facts (system names, departments, volumes, timelines) extracted
   * from the document. Used in report generation and chat context building.
   */
  keyFacts: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Character limit passed to the model. Keeps tokens and cost predictable. */
const TEXT_CHAR_LIMIT = 12_000;

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

/**
 * Summarize extracted document text using the given AI provider.
 *
 * Strategy:
 *  1. Send a single structured prompt that requests summary + keyFacts + tags
 *     in one JSON response (cheaper and faster than three separate calls).
 *  2. If the model response is malformed, `parseSummaryResponse` falls back
 *     to treating the whole response as a plain-text summary.
 *  3. If the structured call produces no tags, fall back to the dedicated
 *     `tagDocument()` helper as a second attempt.
 *
 * Never throws — returns a graceful fallback result on any AI failure.
 */
export async function summarizeDocument(
  text: string,
  provider: AIProvider
): Promise<DocumentSummaryResult> {
  // Guard: nothing to summarize
  if (!text.trim()) {
    return {
      summary: "Document contained no extractable text.",
      tags: [],
      keyFacts: [],
    };
  }

  // Truncate to keep within safe token range while preserving the beginning
  // (most documents front-load their most relevant context).
  const truncated = text.slice(0, TEXT_CHAR_LIMIT);

  try {
    const raw = await provider.generateText({
      systemPrompt: buildSummarizeSystemPrompt(),
      userPrompt: buildSummarizeUserPrompt(truncated),
      temperature: 0.3,
    });

    const parsed = parseSummaryResponse(raw);

    // If the structured call didn't produce tags (e.g. model ignored instruction),
    // fall back to the dedicated tagging call.
    const tags =
      parsed.tags.length > 0
        ? parsed.tags
        : await tagDocument(parsed.summary, provider);

    return {
      summary: parsed.summary,
      keyFacts: parsed.keyFacts,
      tags,
    };
  } catch (err) {
    // Non-fatal: log and return a minimal result so the upload still completes.
    console.error("[summarizeDocument] AI call failed:", err);
    return {
      summary:
        "Document was uploaded successfully but automatic summarization failed. " +
        "The content will be available for manual review.",
      tags: [],
      keyFacts: [],
    };
  }
}
