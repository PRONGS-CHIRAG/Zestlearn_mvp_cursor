"use client";

import type { ReactNode } from "react";
import { useWorkspace } from "@/hooks/useWorkspace";
import EmptyState from "@/components/shared/EmptyState";

const AI_MATURITY_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Exploring", color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
  2: { label: "Experimenting", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  3: { label: "Implementing", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  4: { label: "Scaling", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  5: { label: "Optimizing", color: "text-rose bg-rose/10 border-rose/20" },
};

const DEPARTMENT_LABELS: Record<string, string> = {
  rd: "R&D",
  manufacturing: "Manufacturing",
  quality: "Quality Assurance",
  regulatory: "Regulatory Affairs",
  commercial: "Commercial",
  operations: "Operations",
  it: "IT / Digital",
  other: "Other",
};

const COMPANY_TYPE_LABELS: Record<string, string> = {
  pharmaceutical: "Pharmaceutical",
  biotech: "Biotechnology",
  medtech: "Medical Technology",
  cro: "CRO",
  cdmo: "CDMO",
  other: "Other",
};

const ROLE_LABELS: Record<string, string> = {
  executive: "Executive / C-Suite",
  director: "Director",
  manager: "Manager",
  lead: "Team Lead",
  specialist: "Specialist",
  analyst: "Analyst",
  other: "Other",
};

const DATA_AVAILABILITY_LABELS: Record<string, string> = {
  well_organized: "Well Organized",
  scattered: "Scattered Across Systems",
  mostly_paper: "Mostly Paper-Based",
  mixed: "Mixed Digital & Paper",
  unsure: "Unsure",
};

interface Props {
  workspaceId: string;
}

export default function OverviewPanel({ workspaceId }: Props) {
  const { workspace, assessment, documents, latestReport, insights, loading, notFound } =
    useWorkspace(workspaceId);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted/40" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted/30" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-muted/20" />
      </div>
    );
  }

  if (notFound || !workspace) {
    return (
      <EmptyState
        title="Workspace not found"
        description="This workspace does not exist or may have been deleted."
      />
    );
  }

  const aiMaturity = workspace.aiMaturity ?? 1;
  const maturityInfo = AI_MATURITY_LABELS[aiMaturity] || AI_MATURITY_LABELS[1];

  const docCount = documents.length;
  const reportCount = latestReport ? 1 : 0;
  const insightCount = insights.length;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">Workspace profile and assessment summary</p>
        </div>
        <span className="rounded-md border border-white/5 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
          ID: {workspaceId.slice(0, 8)}…
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Documents", value: String(docCount), icon: docIcon },
          { label: "Chat Messages", value: "0", icon: chatIcon },
          { label: "Reports", value: String(reportCount), icon: reportIcon },
          { label: "AI Insights", value: String(insightCount), icon: insightIcon },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/5 bg-gradient-to-b from-card to-background p-5 transition-all hover:border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-muted/50 text-muted-foreground">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Company Profile</h3>
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${maturityInfo.color}`}>
            AI Maturity: {maturityInfo.label}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileField
            label="Company"
            value={workspace.companyName}
            icon={buildingIcon}
          />
          <ProfileField
            label="Company Type"
            value={COMPANY_TYPE_LABELS[workspace.companyType] || workspace.companyType}
            icon={flaskIcon}
          />
          <ProfileField
            label="Company Size"
            value={workspace.companySize ? `${workspace.companySize} employees` : undefined}
            icon={usersIcon}
          />
          <ProfileField
            label="Department"
            value={DEPARTMENT_LABELS[workspace.department] || workspace.department}
            icon={gridIcon}
          />
          <ProfileField
            label="Role"
            value={ROLE_LABELS[workspace.role] || workspace.role}
            icon={personIcon}
          />
          <ProfileField
            label="Data availability (assessment)"
            value={
              assessment?.dataAvailability
                ? DATA_AVAILABILITY_LABELS[assessment.dataAvailability] || assessment.dataAvailability
                : undefined
            }
            icon={dbIcon}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">AI Maturity Level</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Level</span>
            <span className="font-medium text-foreground">{aiMaturity} of 5</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  level <= aiMaturity ? "bg-gradient-to-r from-rose to-pink-500" : "bg-muted/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {assessment ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {assessment.bottleneck && (
            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground">Main Bottleneck</h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{assessment.bottleneck}</p>
            </div>
          )}
          {assessment.desiredOutcome && (
            <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground">Desired Outcome</h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{assessment.desiredOutcome}</p>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="No assessment yet"
          description="Assessment data will appear here once submitted from the assessment flow."
        />
      )}

      {assessment?.currentTools && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-muted/50 text-muted-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-foreground">Current Tools & Systems</h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{assessment.currentTools}</p>
        </div>
      )}

      {assessment && (
        <p className="text-xs text-muted-foreground">
          Assessment status: <span className="font-medium text-foreground">{assessment.status}</span>
        </p>
      )}
    </div>
  );
}

function ProfileField({ label, value, icon }: { label: string; value?: string; icon: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/5 bg-muted/20 p-4 transition-all hover:border-white/10 hover:bg-muted/30">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-sm font-medium text-foreground">{value || "Not specified"}</p>
    </div>
  );
}

const docIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);
const chatIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);
const reportIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);
const insightIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);
const buildingIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);
const flaskIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  </svg>
);
const usersIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);
const gridIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    />
  </svg>
);
const personIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const dbIcon = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    />
  </svg>
);
