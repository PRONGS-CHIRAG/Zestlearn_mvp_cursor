import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { getModelById } from "@/lib/ai/models";
import { requireOwnership } from "@/lib/auth/requireSession";
import { GeminiProvider } from "@/lib/ai/providers/gemini";
import { FeatherlessProvider } from "@/lib/ai/providers/featherless";
import { validateChatResponse } from "@/lib/ai/validation";
import { CONSULTANT_SYSTEM_PROMPT } from "@/lib/ai/prompts/system";
import {
  buildWorkspaceProfileContext,
  buildAssessmentContext,
  buildDocumentContext,
  buildRecentChatContext,
  buildMemoryContext,
} from "@/lib/ai/context/buildChatContext";
import type { AIProvider } from "@/lib/ai";

function getConvex(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  return new ConvexHttpClient(url);
}

function createProvider(
  provider: "gemini" | "featherless",
  modelName: string
): AIProvider {
  if (provider === "gemini") {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY is not configured");
    return new GeminiProvider(key, modelName);
  }
  const key = process.env.FEATHERLESS_API_KEY;
  if (!key) throw new Error("FEATHERLESS_API_KEY is not configured");
  return new FeatherlessProvider(key, modelName);
}

export async function POST(req: NextRequest) {
  const convex = getConvex();

  try {
    const body = await req.json();
    const { workspaceId, message, modelId } = body as {
      workspaceId?: string;
      message?: string;
      modelId?: string;
    };

    if (!workspaceId || !message?.trim() || !modelId) {
      return NextResponse.json(
        { success: false, error: "workspaceId, message, and modelId are required" },
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

    const modelConfig = getModelById(modelId);
    if (!modelConfig) {
      return NextResponse.json(
        { success: false, error: `Unknown model: ${modelId}` },
        { status: 400 }
      );
    }

    const wsId = workspaceId as Id<"workspaces">;

    // Save user message
    await convex.mutation(api.chat.createChatMessage, {
      workspaceId: wsId,
      role: "user",
      content: message.trim(),
    });

    // Fetch context in parallel
    const [dashboardData, recentMessages, memoryPatterns] = await Promise.all([
      convex.query(api.workspaces.getWorkspaceDashboardData, { workspaceId: wsId }),
      convex.query(api.chat.listRecentMessagesByWorkspace, { workspaceId: wsId, limit: 15 }),
      convex.query(api.memoryPatterns.listWorkspaceAndSharedPatterns, { workspaceId: wsId }),
    ]);

    if (!dashboardData?.workspace) {
      return NextResponse.json(
        { success: false, error: "Workspace not found" },
        { status: 404 }
      );
    }

    const { workspace, assessment, documents } = dashboardData;

    // Build RAG context
    const workspaceCtx = {
      companyName: workspace.companyName,
      companyType: workspace.companyType,
      companySize: workspace.companySize,
      department: workspace.department,
      role: workspace.role,
      aiMaturity: workspace.aiMaturity,
      bottleneck: assessment?.bottleneck ?? "Not specified",
      desiredOutcome: assessment?.desiredOutcome ?? "Not specified",
      currentTools: assessment?.currentTools,
      dataAvailability: assessment?.dataAvailability,
    };

    const contextBlock = [
      "## Company Profile",
      buildWorkspaceProfileContext(workspaceCtx),
      "",
      "## Business Problem",
      buildAssessmentContext(workspaceCtx),
      "",
      "## Uploaded Documents",
      buildDocumentContext(
        (documents ?? []).map((d) => ({
          fileName: d.fileName,
          summary: d.summary ?? undefined,
          tags: d.tags ?? undefined,
        }))
      ),
      "",
      "## Recent Conversation",
      buildRecentChatContext(
        (recentMessages ?? []).map((m) => ({ role: m.role, content: m.content }))
      ),
      "",
      "## Patterns from Similar Teams",
      buildMemoryContext(
        (memoryPatterns ?? []).map((p) => ({
          patternText: p.patternText,
          category: p.category,
        }))
      ),
    ].join("\n");

    const systemPrompt = `${CONSULTANT_SYSTEM_PROMPT}\n\n--- WORKSPACE CONTEXT ---\n${contextBlock}`;

    // Call AI
    const aiProvider = createProvider(modelConfig.provider, modelConfig.modelName);
    const rawReply = await aiProvider.generateText({
      systemPrompt,
      userPrompt: message.trim(),
      temperature: 0.7,
    });

    // Validate output
    const validation = validateChatResponse(rawReply);

    // Save assistant message
    await convex.mutation(api.chat.createChatMessage, {
      workspaceId: wsId,
      role: "assistant",
      content: validation.sanitized,
      metadata: { modelId, validated: validation.valid, reason: validation.reason },
    });

    // Selective chat memory extraction (every 5th assistant message for this workspace)
    try {
      const allMessages = await convex.query(
        api.chat.listRecentMessagesByWorkspace,
        { workspaceId: wsId, limit: 50 }
      );
      const assistantCount = allMessages?.filter((m) => m.role === "assistant").length ?? 0;
      if (assistantCount > 0 && assistantCount % 5 === 0) {
        const { extractPatternsFromChat } = await import("@/lib/memory/extractFromChat");
        const { savePatterns } = await import("@/lib/memory/savePatterns");
        const chatPatterns = extractPatternsFromChat(
          (allMessages ?? []).map((m) => ({ role: m.role, content: m.content })),
          workspaceId
        );
        if (chatPatterns.length > 0) {
          await savePatterns(chatPatterns, (p) =>
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
      }
    } catch (chatExtractErr) {
      console.error("[chat] memory extraction failed (non-fatal):", chatExtractErr);
    }

    return NextResponse.json({
      success: true,
      reply: validation.sanitized,
      modelUsed: modelId,
      validated: validation.valid,
    });
  } catch (error) {
    console.error("[chat] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Chat request failed",
      },
      { status: 500 }
    );
  }
}
