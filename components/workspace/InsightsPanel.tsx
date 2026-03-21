import EmptyState from "@/components/shared/EmptyState";

interface Props {
  workspaceId: string;
}

export default function InsightsPanel({ workspaceId }: Props) {
  // TODO: fetch memory patterns via Convex query
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900">Insights</h2>
      <p className="text-sm text-slate-500">
        Reusable patterns and learnings from your workspace and similar teams.
      </p>
      <EmptyState
        title="No insights yet"
        description="Insights will appear here after your first report is generated."
      />
    </div>
  );
}
