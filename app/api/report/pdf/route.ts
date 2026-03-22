import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { renderToBuffer } from "@react-pdf/renderer";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import type { OpportunityReport } from "@/types/report";
import { ReportPdfDocument } from "@/lib/reports/renderPdfDocument";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getConvex(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  }
  return new ConvexHttpClient(url);
}

function slugifyFilePart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export async function GET(req: NextRequest) {
  const convex = getConvex();

  try {
    const workspaceId = req.nextUrl.searchParams.get("workspaceId");

    if (!workspaceId) {
      return NextResponse.json(
        { error: "workspaceId is required" },
        { status: 400 }
      );
    }

    const wsId = workspaceId as Id<"workspaces">;

    const [report, workspace] = await Promise.all([
      convex.query(api.reports.getLatestReportByWorkspace, { workspaceId: wsId }),
      convex.query(api.workspaces.getWorkspaceById, { workspaceId: wsId }),
    ]);

    if (!report) {
      return NextResponse.json(
        { error: "No report found for this workspace" },
        { status: 404 }
      );
    }

    const companyName = workspace?.companyName ?? "organization";
    const safeCompanyName = slugifyFilePart(companyName) || "organization";
    const filename = `zestlearn-report-${safeCompanyName}.pdf`;

    const buffer = await renderToBuffer(
      ReportPdfDocument({
        title: report.title,
        companyName,
        createdAt: report.createdAt,
        report: report.structuredJson as OpportunityReport,
      })
    );

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[report-pdf] error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate report PDF",
      },
      { status: 500 }
    );
  }
}
