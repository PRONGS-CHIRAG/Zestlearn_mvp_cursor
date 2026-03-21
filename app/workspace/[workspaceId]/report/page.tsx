import ReportView from "@/components/report/ReportView";
import EmptyState from "@/components/shared/EmptyState";
import Link from "next/link";

interface ReportPageProps {
  params: { workspaceId: string };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { workspaceId } = params;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6">
          <Link
            href={`/workspace/${workspaceId}`}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            ← Back to workspace
          </Link>
        </div>
        {/* ReportView will be wired to backend data during implementation */}
        <EmptyState
          title="No report generated yet"
          description="Go back to the workspace and click Generate Report to create your AI opportunity report."
        />
      </div>
    </main>
  );
}
