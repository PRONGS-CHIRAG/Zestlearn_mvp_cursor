import EmptyState from "@/components/shared/EmptyState";

interface Props {
  workspaceId: string;
}

export default function OverviewPanel({ workspaceId }: Props) {
  // TODO: fetch workspace + assessment data via Convex query
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
      <EmptyState
        title="Workspace overview"
        description="Company profile and assessment summary will appear here once data is loaded."
      />
    </div>
  );
}
