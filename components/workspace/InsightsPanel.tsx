"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { CATEGORY_DISPLAY } from "@/types/memory";

interface Props {
  workspaceId: string;
}

interface PatternDoc {
  _id: string;
  scope: "workspace" | "shared";
  category: string;
  patternText: string;
  confidenceScore?: number;
  sourceType: "report" | "chat" | "seed" | "document";
  createdAt: number;
}

const GROUP_META: Record<string, { title: string; description: string; color: string }> = {
  recommended: {
    title: "Recommended Next Steps",
    description: "AI-identified opportunities and suggested first moves for your team",
    color: "emerald",
  },
  blockers: {
    title: "Common Blockers & Risks",
    description: "Patterns and constraints to watch for based on your context",
    color: "amber",
  },
  context: {
    title: "What Similar Teams Do",
    description: "Operating patterns and readiness signals from similar pharma/biotech teams",
    color: "blue",
  },
};

const GROUP_ORDER = ["recommended", "blockers", "context"];

const SOURCE_LABELS: Record<string, string> = {
  report: "From your report",
  chat: "From consultant chat",
  document: "From uploaded documents",
  seed: "Industry benchmark",
};

function getGroup(category: string): string {
  return CATEGORY_DISPLAY[category]?.group ?? "context";
}

function getCategoryLabel(category: string): string {
  return CATEGORY_DISPLAY[category]?.label ?? category.replace(/_/g, " ");
}

export default function InsightsPanel({ workspaceId }: Props) {
  const patterns = useQuery(
    api.memoryPatterns.listInsightsForPanel,
    workspaceId ? { workspaceId: workspaceId as Id<"workspaces"> } : "skip"
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    if (!patterns) return {};
    const groups: Record<string, PatternDoc[]> = {};
    for (const p of patterns as PatternDoc[]) {
      const g = getGroup(p.category);
      if (!groups[g]) groups[g] = [];
      groups[g].push(p);
    }
    return groups;
  }, [patterns]);

  const totalCount = patterns?.length ?? 0;
  const wsCount = patterns?.filter((p) => p.scope === "workspace").length ?? 0;
  const sharedCount = totalCount - wsCount;

  if (patterns === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Collective Memory Insights</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Patterns and learnings from your workspace and similar teams
          </p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-muted/50">
              <svg className="h-7 w-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-foreground">
              No insights yet
            </h4>
            <p className="max-w-md text-sm text-muted-foreground">
              Insights will appear here after you upload documents, chat with the AI consultant, or generate a report.
              The collective memory layer learns from each interaction.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Collective Memory Insights</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Patterns and learnings from your workspace and similar teams
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-card/50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-muted-foreground">{wsCount} workspace</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-card/50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span className="text-xs text-muted-foreground">{sharedCount} shared</span>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/5 via-transparent to-blue-500/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10">
            <svg className="h-6 w-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI-Powered Collective Memory</h3>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              ZestLearn captures patterns from your reports, documents, and conversations.
              These insights help ground future recommendations and highlight what works for teams like yours.
            </p>
          </div>
        </div>
      </div>

      {/* Grouped sections */}
      {GROUP_ORDER.map((groupKey) => {
        const items = grouped[groupKey];
        if (!items?.length) return null;
        const meta = GROUP_META[groupKey];

        return (
          <div key={groupKey} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{meta.title}</h3>
              <p className="text-xs text-muted-foreground">{meta.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((p) => {
                const isExpanded = expandedId === p._id;
                const colorClass =
                  meta.color === "emerald"
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : meta.color === "amber"
                      ? "border-amber-500/20 bg-amber-500/5"
                      : "border-blue-500/20 bg-blue-500/5";
                const textColor =
                  meta.color === "emerald"
                    ? "text-emerald-400"
                    : meta.color === "amber"
                      ? "text-amber-400"
                      : "text-blue-400";

                return (
                  <div
                    key={p._id}
                    className={`group rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-5 transition-all hover:border-white/10 ${
                      isExpanded ? "md:col-span-2" : ""
                    }`}
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border ${colorClass}`}>
                          <span className={`text-xs font-bold ${textColor}`}>
                            {p.scope === "workspace" ? "W" : "S"}
                          </span>
                        </div>
                        <div>
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${colorClass} ${textColor}`}>
                            {getCategoryLabel(p.category)}
                          </span>
                          <p className={`mt-1.5 text-sm leading-relaxed text-foreground ${!isExpanded ? "line-clamp-2" : ""}`}>
                            {p.patternText}
                          </p>
                        </div>
                      </div>
                      {p.patternText.length > 100 && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : p._id)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/5 bg-card/50 text-muted-foreground transition-all hover:border-white/10 hover:text-foreground"
                        >
                          <svg
                            className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-3">
                      {p.confidenceScore != null && (
                        <div className="flex items-center gap-1.5">
                          <div className="h-1 w-12 rounded-full bg-white/10">
                            <div
                              className={`h-1 rounded-full ${
                                meta.color === "emerald" ? "bg-emerald-400" : meta.color === "amber" ? "bg-amber-400" : "bg-blue-400"
                              }`}
                              style={{ width: `${Math.min(100, p.confidenceScore)}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {p.confidenceScore}%
                          </span>
                        </div>
                      )}
                      <span className="text-[10px] text-muted-foreground/70">
                        {SOURCE_LABELS[p.sourceType] ?? p.sourceType}
                      </span>
                      <span className="ml-auto text-[10px] text-muted-foreground/50">
                        {p.scope === "workspace" ? "Your workspace" : "Shared insight"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
