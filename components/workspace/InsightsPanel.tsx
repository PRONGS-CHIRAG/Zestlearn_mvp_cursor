interface Props {
  workspaceId: string;
}

export default function InsightsPanel({ workspaceId }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Insights</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Reusable patterns and learnings from your workspace
        </p>
      </div>

      {/* Coming soon card */}
      <div className="rounded-2xl border border-rose/20 bg-gradient-to-br from-rose/5 to-transparent p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-rose/20 bg-rose/10">
            <svg
              className="h-5 w-5 text-rose"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              AI-Powered Insights
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              As you use ZestLearn, we will surface patterns and learnings from
              your workspace and similar teams to help accelerate your AI
              journey.
            </p>
          </div>
        </div>
      </div>

      {/* Placeholder insights grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: "Industry Patterns",
            description:
              "Common AI use cases and success patterns in pharma and biotech",
            icon: (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
              </svg>
            ),
          },
          {
            title: "Implementation Tips",
            description:
              "Best practices learned from similar teams implementing AI",
            icon: (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            ),
          },
          {
            title: "Risk Alerts",
            description:
              "Proactive warnings about common pitfalls in AI adoption",
            icon: (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            ),
          },
          {
            title: "Opportunity Score",
            description:
              "Track your organization's AI readiness and opportunity score",
            icon: (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            ),
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/5 bg-gradient-to-b from-card to-background p-5 transition-all hover:border-white/10"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 bg-muted/50 text-muted-foreground">
              {item.icon}
            </div>
            <h4 className="mb-1 text-sm font-semibold text-foreground">
              {item.title}
            </h4>
            <p className="text-xs text-muted-foreground">{item.description}</p>
            <div className="mt-3 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
              Coming soon
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-8">
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            No insights yet
          </h4>
          <p className="max-w-sm text-sm text-muted-foreground">
            Insights will appear here after your first report is generated and
            as you continue using ZestLearn.
          </p>
        </div>
      </div>
    </div>
  );
}
