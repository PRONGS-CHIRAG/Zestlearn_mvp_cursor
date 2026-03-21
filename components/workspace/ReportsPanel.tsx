import Link from "next/link";
import EmptyState from "@/components/shared/EmptyState";

interface Props {
  workspaceId: string;
}

export default function ReportsPanel({ workspaceId }: Props) {
  // TODO: fetch latest report via Convex query and wire generate button to /api/report
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Reports</h2>
        <button
          disabled
          className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white opacity-50"
        >
          Generate Report
        </button>
      </div>
      <EmptyState
        title="No report generated yet"
        description="Generate your first AI opportunity report once you have uploaded context and chatted with the consultant."
      />
    </div>
  );
}
