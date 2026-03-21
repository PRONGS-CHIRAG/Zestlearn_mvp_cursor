"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import MarkdownReportView from "@/components/report/MarkdownReportView";
import { downloadReportPdf } from "@/lib/reports/downloadReportPdf";

interface ReportPageProps {
  params: { workspaceId: string };
}

export default function ReportPage({ params }: ReportPageProps) {
  const { workspaceId } = params;
  const wsId = workspaceId as Id<"workspaces">;
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const report = useQuery(api.reports.getLatestReportByWorkspace, { workspaceId: wsId });

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    setDownloadError(null);

    try {
      await downloadReportPdf(workspaceId);
    } catch (error) {
      setDownloadError(
        error instanceof Error
          ? error.message
          : "Unable to download the report PDF."
      );
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={`/workspace/${workspaceId}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to workspace
          </Link>
          <div className="flex items-center gap-3">
            {report && (
              <>
                <span className="text-xs text-muted-foreground">
                  Generated{" "}
                  {new Date(report.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    isDownloadingPdf
                      ? "cursor-not-allowed border border-white/10 bg-muted/20 text-muted-foreground"
                      : "border border-white/10 bg-muted/40 text-foreground hover:bg-muted/60"
                  }`}
                >
                  {isDownloadingPdf ? "Downloading..." : "Download PDF"}
                </button>
              </>
            )}
          </div>
        </div>

        {downloadError && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {downloadError}
          </div>
        )}

        {/* Loading */}
        {report === undefined && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-10 w-10 rounded-full border-2 border-rose/30 border-t-rose animate-spin mb-4" />
            <p className="text-muted-foreground text-sm">Loading report...</p>
          </div>
        )}

        {/* No report */}
        {report === null && (
          <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">No report generated yet</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Go back to the workspace and click Generate Report to create your AI opportunity report.
            </p>
            <Link
              href={`/workspace/${workspaceId}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/30 hover:brightness-110"
            >
              Go to Workspace
            </Link>
          </div>
        )}

        {/* Report content */}
        {report && (
          <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-8 md:p-12">
            <MarkdownReportView markdown={report.renderedMarkdown} />
          </div>
        )}
      </div>
    </main>
  );
}
