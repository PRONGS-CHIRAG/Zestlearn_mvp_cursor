interface WorkspaceData {
  id: string;
  companyName: string;
  createdAt: string;
  status: "active" | "completed" | "archived";
  assessment?: {
    companyType?: string;
    department?: string;
    bottleneck?: string;
  };
}

interface Props {
  workspaceId: string;
  initialData?: WorkspaceData;
}

export default function OverviewPanel({ workspaceId, initialData }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Company profile and assessment summary
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
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

      {/* Company profile card */}
      <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Company Profile
        </h3>
        {initialData ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-white/5 bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Company
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {initialData.companyName}
              </p>
            </div>
            <div className="rounded-lg border border-white/5 bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Type
              </p>
              <p className="mt-1 text-sm font-medium capitalize text-foreground">
                {initialData.assessment?.companyType || "Not specified"}
              </p>
            </div>
            <div className="rounded-lg border border-white/5 bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Department
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {initialData.assessment?.department || "Not specified"}
              </p>
            </div>
            <div className="rounded-lg border border-white/5 bg-muted/30 p-4 sm:col-span-2 lg:col-span-3">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Main Bottleneck
              </p>
              <p className="mt-1 text-sm text-foreground">
                {initialData.assessment?.bottleneck || "Not specified"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-muted/20 py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-muted/50 text-muted-foreground">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h4 className="mb-1 text-sm font-medium text-foreground">
              No profile data
            </h4>
            <p className="text-xs text-muted-foreground">
              Company profile will appear once assessment is completed.
            </p>
          </div>
        )}
      </div>

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
