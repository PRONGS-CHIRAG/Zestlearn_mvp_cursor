"use client";

import { useState } from "react";
import Link from "next/link";

interface Report {
  id: string;
  title: string;
  generatedAt: string;
  status: "generating" | "ready" | "error";
  summary?: string;
  sections?: {
    name: string;
    itemCount: number;
  }[];
}

interface Props {
  workspaceId: string;
  documents?: { status: string }[];
  chatMessages?: { role: string }[];
  latestReport?: Report | null;
  onGenerateReport?: () => Promise<void>;
}

export default function ReportsPanel({
  workspaceId,
  documents = [],
  chatMessages = [],
  latestReport = null,
  onGenerateReport,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<Report | null>(latestReport);

  // Check prerequisites
  const hasDocuments = documents.some((d) => d.status === "ready");
  const hasChatHistory = chatMessages.filter((m) => m.role === "user").length >= 2;
  const canGenerate = hasDocuments && hasChatHistory;

  const handleGenerateReport = async () => {
    setIsGenerating(true);

    try {
      if (onGenerateReport) {
        await onGenerateReport();
      } else {
        // Demo: Simulate report generation
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setReport({
          id: "report-" + Date.now(),
          title: "AI Opportunity Assessment Report",
          generatedAt: new Date().toISOString(),
          status: "ready",
          summary:
            "Based on your assessment and uploaded documents, we have identified 5 high-impact AI opportunities for your organization. The recommended first pilot focuses on automating batch record review, with an estimated 40% reduction in review time.",
          sections: [
            { name: "Executive Summary", itemCount: 1 },
            { name: "Top AI Use Cases", itemCount: 5 },
            { name: "Recommended First Pilot", itemCount: 1 },
            { name: "Data Requirements", itemCount: 8 },
            { name: "Risk Assessment", itemCount: 4 },
            { name: "30/60/90 Day Roadmap", itemCount: 3 },
          ],
        });
      }
    } catch {
      // Handle error silently for demo
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
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
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
              Generate Report
            </>
          )}
        </button>
      </div>

      {/* Prerequisites card - show only if no report exists */}
      {!report && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Before generating a report
          </h3>
          <div className="space-y-3">
            <PrerequisiteItem
              done={hasDocuments}
              number={1}
              label="Upload at least one context document"
              description="SOPs, strategy docs, or process flows"
            />
            <PrerequisiteItem
              done={hasChatHistory}
              number={2}
              label="Have a conversation with the AI consultant"
              description="Discuss your challenges and goals (at least 2 messages)"
            />
          </div>

          {/* Progress indicator */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">
                {[hasDocuments, hasChatHistory].filter(Boolean).length} of 2
                complete
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose to-pink-500 transition-all duration-500"
                style={{
                  width: `${([hasDocuments, hasChatHistory].filter(Boolean).length / 2) * 100}%`,
                }}
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
                <svg
                  className="h-6 w-6 text-rose"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-foreground">
              Generating your report...
            </h4>
            <p className="max-w-sm text-sm text-muted-foreground">
              Our AI is analyzing your documents and conversation to create a
              comprehensive opportunity assessment.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse" />
              This may take a few moments
            </div>
          </div>
        </div>
      )}

      {/* Report preview card */}
      {report && report.status === "ready" && !isGenerating && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background overflow-hidden">
          {/* Report header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose/20 to-pink-500/20 text-rose">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {report.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generated {formatDate(report.generatedAt)}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Ready
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="p-6 border-b border-white/5">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Summary
            </h4>
            <p className="text-foreground leading-relaxed">{report.summary}</p>
          </div>

          {/* Sections */}
          {report.sections && (
            <div className="p-6 border-b border-white/5">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">
                Report Sections
              </h4>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {report.sections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-white/5 bg-muted/20 p-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy/50 text-xs font-medium text-muted-foreground">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {section.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {section.itemCount}{" "}
                        {section.itemCount === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/workspace/${workspaceId}/report/${report.id}`}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose to-pink-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/30 hover:brightness-110"
            >
              View Full Report
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-muted/30 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted/50">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download PDF
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-muted/30 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted/50">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                />
              </svg>
              Share
            </button>
          </div>
        </div>
      )}

      {/* Empty state - show only if no report and not generating */}
      {!report && !isGenerating && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-8">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-foreground">
              No reports yet
            </h4>
            <p className="max-w-sm text-sm text-muted-foreground">
              Complete the prerequisites above to generate your first AI
              opportunity report with actionable recommendations.
            </p>
          </div>
        </div>
      )}

      {/* Previous reports list placeholder */}
      {report && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Report History
            </h3>
            <span className="text-sm text-muted-foreground">1 report</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Your generated reports will appear here for future reference.
          </p>
        </div>
      )}
    </div>
  );
}

function PrerequisiteItem({
  done,
  number,
  label,
  description,
}: {
  done: boolean;
  number: number;
  label: string;
  description: string;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 transition-all ${
        done
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-white/5 bg-muted/20"
      }`}
    >
      <div
        className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${
          done
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-muted/50 text-muted-foreground"
        }`}
      >
        {done ? (
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          number
        )}
      </div>
      <div>
        <p
          className={`text-sm font-medium ${done ? "text-emerald-400" : "text-foreground"}`}
        >
          {label}
        </p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
