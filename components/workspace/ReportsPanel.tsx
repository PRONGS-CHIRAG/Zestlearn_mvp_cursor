import Link from "next/link";

interface Props {
  workspaceId: string;
}

export default function ReportsPanel({ workspaceId }: Props) {
  const canGenerate = false; // TODO: Check if enough context exists

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-generated opportunity reports and roadmaps
          </p>
        </div>
        <button
          disabled={!canGenerate}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            canGenerate
              ? "bg-gradient-to-r from-rose to-pink-500 text-white shadow-lg shadow-rose/20 hover:shadow-xl hover:shadow-rose/30 hover:brightness-110"
              : "border border-white/10 bg-muted/30 text-muted-foreground cursor-not-allowed"
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          Generate Report
        </button>
      </div>

      {/* Prerequisites card */}
      <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Before generating a report
        </h3>
        <div className="space-y-3">
          {[
            {
              done: false,
              label: "Upload at least one context document",
              description: "SOPs, strategy docs, or process flows",
            },
            {
              done: false,
              label: "Have a conversation with the AI consultant",
              description: "Discuss your challenges and goals",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-white/5 bg-muted/20 p-4"
            >
              <div
                className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
                  item.done
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {item.done ? (
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-xs">{i + 1}</span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-8">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            No reports yet
          </h4>
          <p className="max-w-sm text-sm text-muted-foreground">
            Complete the steps above to generate your first AI opportunity
            report with actionable recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
