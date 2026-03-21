import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { OpenAIProvider } from "@/lib/ai/providers/openai";
import { generateReport } from "@/lib/reports/generateReport";
import { renderReportMarkdown } from "@/lib/reports/renderMarkdown";
import { extractInsightsFromReport } from "@/lib/reports/extractInsights";
import { buildReportContext } from "@/lib/ai/context/buildReportContext";
import {
  buildRecentChatContext,
} from "@/lib/ai/context/buildChatContext";

function getConvex(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  return new ConvexHttpClient(url);
}

export async function POST(req: NextRequest) {
  const convex = getConvex();

  try {
    const body = await req.json();
    const { workspaceId } = body as { workspaceId?: string };

    if (!workspaceId) {
      return NextResponse.json(
        { success: false, error: "workspaceId is required" },
        { status: 400 }
      );
    }

    const wsId = workspaceId as Id<"workspaces">;

    // Fetch all context in parallel
    const [dashboardData, recentMessages, memoryPatterns] = await Promise.all([
      convex.query(api.workspaces.getWorkspaceDashboardData, { workspaceId: wsId }),
      convex.query(api.chat.listRecentMessagesByWorkspace, { workspaceId: wsId, limit: 20 }),
      convex.query(api.memoryPatterns.listWorkspaceAndSharedPatterns, { workspaceId: wsId }),
    ]);

    if (!dashboardData?.workspace) {
      return NextResponse.json(
        { success: false, error: "Workspace not found" },
        { status: 404 }
      );
    }

    const { workspace, assessment, documents } = dashboardData;

    // Build structured context for the report prompt
    const chatInsights = buildRecentChatContext(
      (recentMessages ?? []).map((m) => ({ role: m.role, content: m.content }))
    );

    const reportContext = buildReportContext({
      workspace: {
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
      },
      documents: (documents ?? []).map((d) => ({
        fileName: d.fileName,
        summary: d.summary ?? undefined,
        tags: d.tags ?? undefined,
      })),
      recentChatInsights: chatInsights,
      memoryPatterns: (memoryPatterns ?? []).map((p) => ({
        patternText: p.patternText,
        category: p.category,
      })),
    });

    // Generate structured report via AI
    const openAiKey = process.env.OPENAI_API_KEY;
    if (!openAiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "OPENAI_API_KEY is not configured on the server",
        },
        { status: 500 }
      );
    }

    const provider = new OpenAIProvider(openAiKey, "gpt-4o-mini");
    const structuredReport = await generateReport(reportContext, provider);

    // Render deterministic markdown from structured JSON
    const renderedMarkdown = renderReportMarkdown(structuredReport, workspace.companyName);

    // Save report to Convex
    const reportId = await convex.mutation(api.reports.createReportRecord, {
      workspaceId: wsId,
      title: "AI Opportunity Assessment Report",
      structuredJson: structuredReport,
      renderedMarkdown,
    });

    // Extract and save memory insights
    try {
      const insights = extractInsightsFromReport(structuredReport, workspaceId);
      for (const insight of insights) {
        await convex.mutation(api.memory.saveMemoryPattern, {
          workspaceId: insight.workspaceId ? (insight.workspaceId as Id<"workspaces">) : undefined,
          scope: insight.scope,
          category: insight.category,
          functionArea: insight.functionArea,
          industry: insight.industry,
          patternText: insight.patternText,
          sourceType: insight.sourceType,
        });
      }
    } catch (insightErr) {
      console.error("[report] insight extraction failed (non-fatal):", insightErr);
    }

    return NextResponse.json({
      success: true,
      report: {
        id: reportId,
        workspaceId,
        title: "AI Opportunity Assessment Report",
        structuredJson: structuredReport,
        renderedMarkdown,
        createdAt: Date.now(),
      },
    });
  } catch (error) {
    console.error("[report] error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "OpenAI report generation failed",
      },
      { status: 500 }
    );
  }
}
