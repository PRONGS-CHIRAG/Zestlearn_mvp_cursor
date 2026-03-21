"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { downloadReportPdf } from "@/lib/reports/downloadReportPdf";

interface Props {
  workspaceId: string;
}

export default function ReportsPanel({ workspaceId }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsId = workspaceId as Id<"workspaces">;
  const latestReport = useQuery(api.reports.getLatestReportByWorkspace, { workspaceId: wsId });
  const documents = useQuery(api.documents.listWorkspaceDocuments, { workspaceId: wsId });
  const chatMessages = useQuery(api.chat.listRecentMessagesByWorkspace, { workspaceId: wsId, limit: 10 });

  const hasDocuments = (documents ?? []).some((d) => d.processingStatus === "done");
  const hasChatHistory = (chatMessages ?? []).filter((m) => m.role === "user").length >= 2;
  const canGenerate = hasDocuments && hasChatHistory;

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error ?? "Report generation failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    setError(null);

    try {
      await downloadReportPdf(workspaceId);
    } catch (downloadError) {
      setError(
        downloadError instanceof Error
          ? downloadError.message
          : "Unable to download the report PDF."
      );
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated opportunity reports and implementation roadmaps
          </p>
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={!canGenerate || isGenerating}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
            canGenerate && !isGenerating
              ? "bg-gradient-to-r from-rose to-pink-500 text-white shadow-lg shadow-rose/20 hover:shadow-xl hover:shadow-rose/30 hover:brightness-110"
              : "border border-white/10 bg-muted/30 text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              {latestReport ? "Regenerate Report" : "Generate Report"}
            </>
          )}
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Prerequisites card — show only when no report yet */}
      {!latestReport && !isGenerating && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">Before generating a report</h3>
          <div className="space-y-3">
            <PrerequisiteItem done={hasDocuments} number={1} label="Upload at least one context document" description="SOPs, strategy docs, or process flows" />
            <PrerequisiteItem done={hasChatHistory} number={2} label="Have a conversation with the AI consultant" description="Discuss your challenges and goals (at least 2 messages)" />
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">
                {[hasDocuments, hasChatHistory].filter(Boolean).length} of 2 complete
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose to-pink-500 transition-all duration-500"
                style={{ width: `${([hasDocuments, hasChatHistory].filter(Boolean).length / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Generating state */}
      {isGenerating && (
        <div className="rounded-2xl border border-rose/20 bg-gradient-to-b from-rose/5 to-transparent p-8">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-6 relative">
              <div className="h-16 w-16 rounded-full border-2 border-rose/30 border-t-rose animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-6 w-6 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-foreground">Generating your report...</h4>
            <p className="max-w-sm text-sm text-muted-foreground">
              Our AI is analyzing your documents and conversation to create a comprehensive opportunity assessment.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse" />
              This may take 30-60 seconds
            </div>
          </div>
        </div>
      )}

      {/* Report preview card */}
      {latestReport && !isGenerating && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose/20 to-pink-500/20 text-rose">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{latestReport.title}</h3>
                  <p className="text-sm text-muted-foreground">Generated {formatDate(latestReport.createdAt)}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Ready
              </span>
            </div>
          </div>

          {/* Summary from structured JSON */}
          <div className="p-6 border-b border-white/5">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Executive Summary</h4>
            <p className="text-foreground leading-relaxed">
              {(latestReport.structuredJson as { executive_summary?: string })?.executive_summary ?? "Report generated successfully."}
            </p>
          </div>

          {/* Section list */}
          <div className="p-6 border-b border-white/5">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Report Sections</h4>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Executive Summary",
                "Problem Summary",
                "Pain Points",
                "Recommended Use Cases",
                "First Pilot",
                "Business Impact",
                "30/60/90 Roadmap",
                "Risks & Constraints",
                "Open Questions",
              ].map((name, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-white/5 bg-muted/20 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/50 text-xs font-medium text-muted-foreground">{i + 1}</div>
                  <p className="text-sm font-medium text-foreground truncate">{name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/workspace/${workspaceId}/report`}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/30 hover:brightness-110"
            >
              View Full Report
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                isDownloadingPdf
                  ? "cursor-not-allowed border border-white/10 bg-muted/20 text-muted-foreground"
                  : "border border-white/10 bg-muted/40 text-foreground hover:bg-muted/60"
              }`}
            >
              {isDownloadingPdf ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v-9m0 9l-3.75-3.75M12 16.5l3.75-3.75M4.5 19.5h15" />
                  </svg>
                  Download Report as PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!latestReport && !isGenerating && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-8">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-foreground">No reports yet</h4>
            <p className="max-w-sm text-sm text-muted-foreground">
              Complete the prerequisites above to generate your first AI opportunity report with actionable recommendations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function PrerequisiteItem({ done, number, label, description }: { done: boolean; number: number; label: string; description: string }) {
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 transition-all ${done ? "border-emerald-500/20 bg-emerald-500/5" : "border-white/5 bg-muted/20"}`}>
      <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${done ? "bg-emerald-500/20 text-emerald-400" : "bg-muted/50 text-muted-foreground"}`}>
        {done ? (
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          number
        )}
      </div>
      <div>
        <p className={`text-sm font-medium ${done ? "text-emerald-400" : "text-foreground"}`}>{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
