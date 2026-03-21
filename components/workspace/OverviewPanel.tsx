"use client";

import { useWorkspace } from "@/hooks/useWorkspace";
import EmptyState from "@/components/shared/EmptyState";

interface Props {
  workspaceId: string;
}

export default function OverviewPanel({ workspaceId }: Props) {
  const { workspace, assessment, loading, notFound } = useWorkspace(workspaceId);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-48 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
        <div className="h-4 w-3/4 bg-slate-100 rounded" />
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Company Profile</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow label="Company" value={workspace.companyName} />
          <InfoRow label="Type" value={workspace.companyType} />
          <InfoRow label="Size" value={workspace.companySize} />
          <InfoRow label="Department" value={workspace.department} />
          <InfoRow label="Your Role" value={workspace.role} />
          <InfoRow label="AI Maturity" value={`${workspace.aiMaturity} / 5`} />
        </dl>
      </div>

      {assessment ? (
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Assessment</h2>
          <dl className="grid grid-cols-1 gap-4">
            <InfoRow label="Primary Bottleneck" value={assessment.bottleneck} />
            <InfoRow label="Desired Outcome" value={assessment.desiredOutcome} />
            {assessment.currentTools && (
              <InfoRow label="Current Tools" value={assessment.currentTools} />
            )}
            {assessment.dataAvailability && (
              <InfoRow label="Data Availability" value={assessment.dataAvailability} />
            )}
          </dl>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Status: {assessment.status}
          </p>
        </div>
      ) : (
        <EmptyState
          title="No assessment yet"
          description="Assessment data will appear here once submitted."
        />
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</dt>
      <dd className="text-sm text-slate-900">{value}</dd>
    </div>
  );
}
