"use client";

import { AssessmentInput } from "@/types/assessment";

// AI Maturity level labels
const AI_MATURITY_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Exploring", color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
  2: { label: "Experimenting", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  3: { label: "Implementing", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  4: { label: "Scaling", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  5: { label: "Optimizing", color: "text-rose bg-rose/10 border-rose/20" },
};

// Department display labels
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

// Company type display labels
const COMPANY_TYPE_LABELS: Record<string, string> = {
  pharmaceutical: "Pharmaceutical",
  biotech: "Biotechnology",
  medtech: "Medical Technology",
  cro: "CRO",
  cdmo: "CDMO",
  other: "Other",
};

// Role display labels
const ROLE_LABELS: Record<string, string> = {
  executive: "Executive / C-Suite",
  director: "Director",
  manager: "Manager",
  lead: "Team Lead",
  specialist: "Specialist",
  analyst: "Analyst",
  other: "Other",
};

// Data availability labels
const DATA_AVAILABILITY_LABELS: Record<string, string> = {
  well_organized: "Well Organized",
  scattered: "Scattered Across Systems",
  mostly_paper: "Mostly Paper-Based",
  mixed: "Mixed Digital & Paper",
  unsure: "Unsure",
};

interface WorkspaceData {
  id: string;
  companyName: string;
  createdAt: string;
  status: "active" | "completed" | "archived";
  assessment?: Partial<AssessmentInput>;
}

interface Props {
  workspaceId: string;
  initialData?: WorkspaceData;
}

export default function OverviewPanel({ workspaceId, initialData }: Props) {
  const assessment = initialData?.assessment;
  const aiMaturity = assessment?.aiMaturity || 1;
  const maturityInfo = AI_MATURITY_LABELS[aiMaturity] || AI_MATURITY_LABELS[1];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Workspace profile and assessment summary
          </p>
        </div>
        <span className="rounded-md border border-white/5 bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
          ID: {workspaceId.slice(0, 8)}...
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Documents",
            value: "0",
            icon: (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
          },
          {
            label: "Chat Messages",
            value: "0",
            icon: (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            ),
          },
          {
            label: "Reports",
            value: "0",
            icon: (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
          },
          {
            label: "AI Insights",
            value: "0",
            icon: (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            ),
          },
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

      {/* Company Profile Card */}
      <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Company Profile
          </h3>
          {assessment && (
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${maturityInfo.color}`}>
              AI Maturity: {maturityInfo.label}
            </span>
          )}
        </div>

        {assessment ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Company Name */}
            <ProfileField 
              label="Company" 
              value={initialData?.companyName} 
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />

            {/* Company Type */}
            <ProfileField 
              label="Company Type" 
              value={COMPANY_TYPE_LABELS[assessment.companyType || ""] || assessment.companyType} 
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              }
            />

            {/* Company Size */}
            <ProfileField 
              label="Company Size" 
              value={assessment.companySize ? `${assessment.companySize} employees` : undefined} 
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />

            {/* Department */}
            <ProfileField 
              label="Department" 
              value={DEPARTMENT_LABELS[assessment.department || ""] || assessment.department} 
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              }
            />

            {/* Role */}
            <ProfileField 
              label="Role" 
              value={ROLE_LABELS[assessment.role || ""] || assessment.role} 
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            {/* Data Availability */}
            <ProfileField 
              label="Data Availability" 
              value={DATA_AVAILABILITY_LABELS[assessment.dataAvailability || ""] || assessment.dataAvailability} 
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              }
            />
          </div>
        ) : (
          <EmptyState 
            title="No profile data"
            description="Company profile will appear once assessment is completed."
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
        )}
      </div>

      {/* AI Maturity Progress */}
      {assessment && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            AI Maturity Level
          </h3>
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
                    level <= aiMaturity
                      ? "bg-gradient-to-r from-rose to-pink-500"
                      : "bg-muted/30"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {aiMaturity === 1 && "Just starting to explore AI possibilities for your organization."}
              {aiMaturity === 2 && "Running initial experiments and proof-of-concepts."}
              {aiMaturity === 3 && "Actively implementing AI solutions in production."}
              {aiMaturity === 4 && "Scaling AI across multiple departments and use cases."}
              {aiMaturity === 5 && "Continuously optimizing and expanding AI capabilities."}
            </p>
          </div>
        </div>
      )}

      {/* Bottleneck & Desired Outcome */}
      {assessment && (assessment.bottleneck || assessment.desiredOutcome) && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bottleneck */}
          {assessment.bottleneck && (
            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground">Main Bottleneck</h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {assessment.bottleneck}
              </p>
            </div>
          )}

          {/* Desired Outcome */}
          {assessment.desiredOutcome && (
            <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/5 to-transparent p-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-foreground">Desired Outcome</h4>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {assessment.desiredOutcome}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Current Tools */}
      {assessment?.currentTools && (
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-muted/50 text-muted-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-foreground">Current Tools & Systems</h4>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {assessment.currentTools}
          </p>
        </div>
      )}

      {/* Getting started card */}
      <div className="rounded-2xl border border-rose/20 bg-gradient-to-br from-rose/5 to-transparent p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Get Started
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload documents and chat with the AI consultant to generate your
              first report.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-white/20 hover:bg-card hover:text-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Documents
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/30 hover:brightness-110">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Profile Field Component
function ProfileField({ 
  label, 
  value, 
  icon 
}: { 
  label: string; 
  value?: string; 
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-muted/20 p-4 transition-all hover:border-white/10 hover:bg-muted/30">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <p className="text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p className="text-sm font-medium text-foreground">
        {value || "Not specified"}
      </p>
    </div>
  );
}

// Empty State Component
function EmptyState({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-muted/10 py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
        {icon}
      </div>
      <h4 className="mb-1 text-sm font-medium text-foreground">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
