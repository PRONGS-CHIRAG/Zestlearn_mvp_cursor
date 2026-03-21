"use client";

import { useState } from "react";

interface Insight {
  id: string;
  type: "blocker" | "pattern" | "pilot" | "opportunity";
  title: string;
  description: string;
  source: string;
  confidence: number;
  relevanceScore: number;
  tags: string[];
  actionable?: string;
  relatedTeams?: number;
  successRate?: number;
}

interface Props {
  workspaceId: string;
  insights?: Insight[];
}

// Demo insights data representing the collective memory layer
const demoInsights: Insight[] = [
  {
    id: "1",
    type: "blocker",
    title: "Data Silos in Clinical Operations",
    description:
      "Teams in your sector commonly face fragmented data across clinical trial management systems, EDC platforms, and internal databases. This creates bottlenecks in reporting and analysis.",
    source: "Pattern from 47 similar pharma SMEs",
    confidence: 89,
    relevanceScore: 95,
    tags: ["Clinical Trials", "Data Integration", "Operations"],
    actionable: "Consider a unified data layer or API-first approach before implementing AI solutions.",
    relatedTeams: 47,
  },
  {
    id: "2",
    type: "pattern",
    title: "R&D Teams Benefit Most from Document AI",
    description:
      "Organizations with similar profiles see the highest ROI from AI-powered literature review and regulatory document analysis. Average time savings of 40% in document processing.",
    source: "Success pattern from biotech companies",
    confidence: 92,
    relevanceScore: 88,
    tags: ["R&D", "Document Processing", "Literature Review"],
    relatedTeams: 31,
    successRate: 87,
  },
  {
    id: "3",
    type: "pilot",
    title: "Recommended First Pilot: Adverse Event Monitoring",
    description:
      "Based on your company profile and AI maturity level, an AI-assisted adverse event detection system offers the best balance of impact, feasibility, and regulatory alignment.",
    source: "AI recommendation based on your assessment",
    confidence: 85,
    relevanceScore: 92,
    tags: ["Pharmacovigilance", "Safety", "Quick Win"],
    actionable: "Start with a focused pilot on post-market surveillance data.",
    successRate: 78,
  },
  {
    id: "4",
    type: "opportunity",
    title: "Regulatory Submission Automation",
    description:
      "Companies at your AI maturity level typically achieve 30% efficiency gains by automating regulatory document compilation and cross-referencing.",
    source: "Benchmark from 23 similar organizations",
    confidence: 81,
    relevanceScore: 85,
    tags: ["Regulatory", "Automation", "Compliance"],
    relatedTeams: 23,
    successRate: 82,
  },
  {
    id: "5",
    type: "blocker",
    title: "Compliance Concerns Slow AI Adoption",
    description:
      "GxP validation requirements and 21 CFR Part 11 compliance are the most cited barriers. Successful teams address these early with validation-ready AI solutions.",
    source: "Common challenge in life sciences",
    confidence: 94,
    relevanceScore: 90,
    tags: ["Compliance", "Validation", "GxP"],
    actionable: "Prioritize vendors with pre-validated, audit-ready AI solutions.",
    relatedTeams: 52,
  },
  {
    id: "6",
    type: "pattern",
    title: "Cross-Functional AI Champions Drive Success",
    description:
      "Organizations that establish a cross-functional AI steering committee see 2.3x higher pilot success rates compared to IT-led initiatives alone.",
    source: "Organizational pattern analysis",
    confidence: 88,
    relevanceScore: 82,
    tags: ["Organization", "Change Management", "Leadership"],
    relatedTeams: 38,
    successRate: 91,
  },
];

const typeConfig = {
  blocker: {
    label: "Common Blocker",
    color: "amber",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    bgClass: "bg-amber-500/10 border-amber-500/20",
    textClass: "text-amber-400",
    badgeClass: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  pattern: {
    label: "Team Pattern",
    color: "blue",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
    bgClass: "bg-blue-500/10 border-blue-500/20",
    textClass: "text-blue-400",
    badgeClass: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  },
  pilot: {
    label: "Suggested Pilot",
    color: "emerald",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    bgClass: "bg-emerald-500/10 border-emerald-500/20",
    textClass: "text-emerald-400",
    badgeClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  opportunity: {
    label: "Opportunity",
    color: "rose",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    bgClass: "bg-rose/10 border-rose/20",
    textClass: "text-rose",
    badgeClass: "bg-rose/10 border-rose/20 text-rose",
  },
};

type FilterType = "all" | "blocker" | "pattern" | "pilot" | "opportunity";

export default function InsightsPanel({ workspaceId, insights = demoInsights }: Props) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredInsights = filter === "all" 
    ? insights 
    : insights.filter((i) => i.type === filter);

  const filterOptions: { value: FilterType; label: string; count: number }[] = [
    { value: "all", label: "All Insights", count: insights.length },
    { value: "blocker", label: "Blockers", count: insights.filter((i) => i.type === "blocker").length },
    { value: "pattern", label: "Patterns", count: insights.filter((i) => i.type === "pattern").length },
    { value: "pilot", label: "Pilots", count: insights.filter((i) => i.type === "pilot").length },
    { value: "opportunity", label: "Opportunities", count: insights.filter((i) => i.type === "opportunity").length },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Collective Memory Insights</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Patterns and learnings from similar teams to accelerate your AI journey
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-card/50 p-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose/10">
            <svg className="h-4 w-4 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div className="pr-3">
            <p className="text-xs font-medium text-foreground">{insights.length} Insights</p>
            <p className="text-[10px] text-muted-foreground">From 150+ teams</p>
          </div>
        </div>
      </div>

      {/* Memory Layer Visualization */}
      <div className="rounded-2xl border border-rose/20 bg-gradient-to-br from-rose/5 via-transparent to-blue-500/5 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-rose/20 bg-rose/10">
              <svg className="h-6 w-6 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI-Powered Collective Memory</h3>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                ZestLearn learns from every assessment and conversation. These insights represent patterns, 
                blockers, and opportunities discovered across similar pharma and biotech teams.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {[
              { label: "Teams Analyzed", value: "150+" },
              { label: "Patterns Found", value: "340" },
              { label: "Avg. Confidence", value: "87%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/5 bg-card/50 px-4 py-3 text-center">
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === option.value
                ? "bg-rose/10 text-rose border border-rose/20"
                : "border border-white/5 bg-card/50 text-muted-foreground hover:border-white/10 hover:text-foreground"
            }`}
          >
            {option.label}
            <span className={`rounded-full px-2 py-0.5 text-xs ${
              filter === option.value ? "bg-rose/20" : "bg-white/5"
            }`}>
              {option.count}
            </span>
          </button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredInsights.map((insight) => {
          const config = typeConfig[insight.type];
          const isExpanded = expandedId === insight.id;

          return (
            <div
              key={insight.id}
              className={`group rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6 transition-all hover:border-white/10 ${
                isExpanded ? "md:col-span-2" : ""
              }`}
            >
              {/* Card Header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${config.bgClass} ${config.textClass}`}>
                    {config.icon}
                  </div>
                  <div>
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${config.badgeClass}`}>
                      {config.label}
                    </span>
                    <h4 className="mt-2 text-base font-semibold text-foreground">
                      {insight.title}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : insight.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-card/50 text-muted-foreground transition-all hover:border-white/10 hover:text-foreground"
                >
                  <svg
                    className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {insight.description}
              </p>

              {/* Expanded Content */}
              {isExpanded && insight.actionable && (
                <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-emerald-400">Recommended Action</p>
                      <p className="mt-1 text-sm text-foreground">{insight.actionable}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metrics Footer */}
              <div className="flex flex-wrap items-center gap-4 border-t border-white/5 pt-4">
                {/* Confidence */}
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 rounded-full bg-white/10">
                    <div
                      className="h-1.5 rounded-full bg-rose"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {insight.confidence}% confidence
                  </span>
                </div>

                {/* Relevance */}
                <div className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="text-xs text-muted-foreground">
                    {insight.relevanceScore}% relevant
                  </span>
                </div>

                {/* Related Teams */}
                {insight.relatedTeams && (
                  <div className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <span className="text-xs text-muted-foreground">
                      {insight.relatedTeams} similar teams
                    </span>
                  </div>
                )}

                {/* Success Rate */}
                {insight.successRate && (
                  <div className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                    <span className="text-xs text-emerald-400">
                      {insight.successRate}% success rate
                    </span>
                  </div>
                )}

                {/* Source */}
                <span className="ml-auto text-[10px] text-muted-foreground/70">
                  {insight.source}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredInsights.length === 0 && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-muted/50">
              <svg className="h-7 w-7 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h4 className="mb-2 text-lg font-semibold text-foreground">
              No insights in this category
            </h4>
            <p className="max-w-sm text-sm text-muted-foreground">
              Try selecting a different filter or check back later as our collective memory grows.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 text-sm font-medium text-rose hover:text-rose/80"
            >
              View all insights
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
