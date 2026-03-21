const examples = [
  {
    category: "Use Case Analysis",
    title: "Top AI Use Cases",
    description:
      "Prioritized list of AI opportunities ranked by impact, feasibility, and alignment with your strategic goals.",
    preview: {
      items: [
        { rank: 1, name: "Automated Literature Review", score: "94" },
        { rank: 2, name: "Clinical Trial Patient Matching", score: "91" },
        { rank: 3, name: "Regulatory Document Processing", score: "87" },
        { rank: 4, name: "Lab Notebook Digitization", score: "82" },
      ],
    },
  },
  {
    category: "Pilot Recommendation",
    title: "Best First Pilot",
    description:
      "Our AI identifies the optimal starting point based on quick wins, resource availability, and risk profile.",
    preview: {
      pilot: {
        name: "Automated Literature Review",
        timeline: "8 weeks",
        team: "2-3 FTEs",
        investment: "$25-40K",
        roi: "3-4x in Year 1",
      },
    },
  },
  {
    category: "Data Requirements",
    title: "Data Readiness Assessment",
    description:
      "Clear breakdown of data sources needed, quality requirements, and integration considerations for your pilot.",
    preview: {
      requirements: [
        { source: "Internal Documents", status: "Ready", icon: "check" },
        { source: "CRM/ERP Data", status: "Partial", icon: "warning" },
        { source: "Lab Systems API", status: "Required", icon: "info" },
      ],
    },
  },
  {
    category: "Risk & Compliance",
    title: "Risks & Compliance Considerations",
    description:
      "Proactive identification of regulatory, technical, and organizational risks with mitigation strategies.",
    preview: {
      risks: [
        { type: "FDA 21 CFR Part 11", level: "Medium", action: "Validation protocol" },
        { type: "Data Privacy (GDPR)", level: "Low", action: "DPA review" },
        { type: "Model Accuracy", level: "Low", action: "Human-in-loop" },
      ],
    },
  },
  {
    category: "Implementation Plan",
    title: "30/60/90 Day Roadmap",
    description:
      "Structured action plan with milestones, deliverables, and success metrics for your AI initiative.",
    preview: {
      phases: [
        { day: "30", milestone: "POC Complete", tasks: "Data prep, model selection, initial testing" },
        { day: "60", milestone: "Pilot Launch", tasks: "Integration, user training, soft launch" },
        { day: "90", milestone: "Scale Decision", tasks: "ROI analysis, stakeholder review, expansion plan" },
      ],
    },
  },
];

export function ExampleOutputs() {
  return (
    <section id="examples" className="relative py-28 md:py-36">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(30,58,95,0.15),transparent)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose">
            Deliverables
          </span>
          <h2 className="mb-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Your AI Opportunity Report
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Every engagement delivers a comprehensive, actionable report tailored
            to your organization's unique context and goals.
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Top AI Use Cases - spans 2 columns on large screens */}
          <div className="group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-500 hover:border-rose/20 lg:col-span-2">
            <div className="border-b border-white/5 bg-black/20 p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center rounded-lg bg-rose/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose">
                  {examples[0].category}
                </span>
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {examples[0].preview.items?.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose/20 text-xs font-bold text-rose">
                        {item.rank}
                      </span>
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-rose">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {examples[0].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {examples[0].description}
              </p>
            </div>
          </div>

          {/* Best First Pilot */}
          <div className="group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-500 hover:border-rose/20">
            <div className="border-b border-white/5 bg-black/20 p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center rounded-lg bg-rose/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose">
                  {examples[1].category}
                </span>
                <svg className="h-5 w-5 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                <p className="mb-3 text-base font-semibold text-foreground">{examples[1].preview.pilot?.name}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Timeline</p>
                    <p className="font-medium text-foreground">{examples[1].preview.pilot?.timeline}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Team Size</p>
                    <p className="font-medium text-foreground">{examples[1].preview.pilot?.team}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Investment</p>
                    <p className="font-medium text-foreground">{examples[1].preview.pilot?.investment}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expected ROI</p>
                    <p className="font-semibold text-rose">{examples[1].preview.pilot?.roi}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {examples[1].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {examples[1].description}
              </p>
            </div>
          </div>

          {/* Data Requirements */}
          <div className="group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-500 hover:border-rose/20">
            <div className="border-b border-white/5 bg-black/20 p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center rounded-lg bg-rose/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose">
                  {examples[2].category}
                </span>
                <svg className="h-5 w-5 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div className="space-y-2.5">
                {examples[2].preview.requirements?.map((req) => (
                  <div
                    key={req.source}
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/5"
                  >
                    <span className="text-sm font-medium text-foreground">{req.source}</span>
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                        req.status === "Ready"
                          ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                          : req.status === "Partial"
                          ? "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {examples[2].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {examples[2].description}
              </p>
            </div>
          </div>

          {/* Risks & Compliance - spans 2 columns */}
          <div className="group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-500 hover:border-rose/20 md:col-span-2">
            <div className="border-b border-white/5 bg-black/20 p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center rounded-lg bg-rose/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose">
                  {examples[3].category}
                </span>
                <svg className="h-5 w-5 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {examples[3].preview.risks?.map((risk) => (
                  <div
                    key={risk.type}
                    className="rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/5"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{risk.type}</span>
                      <span
                        className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${
                          risk.level === "Low"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {risk.level}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{risk.action}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {examples[3].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {examples[3].description}
              </p>
            </div>
          </div>

          {/* 30/60/90 Day Roadmap - full width */}
          <div className="group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-500 hover:border-rose/20 md:col-span-2 lg:col-span-3">
            <div className="border-b border-white/5 bg-black/20 p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="inline-flex items-center rounded-lg bg-rose/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose">
                  {examples[4].category}
                </span>
                <svg className="h-5 w-5 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {examples[4].preview.phases?.map((phase, index) => (
                  <div
                    key={phase.day}
                    className="relative rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/5"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose/20 font-mono text-sm font-bold text-rose">
                        {phase.day}
                      </span>
                      <div>
                        <p className="text-xs text-muted-foreground">Day {phase.day}</p>
                        <p className="font-semibold text-foreground">{phase.milestone}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.tasks}</p>
                    {index < 2 && (
                      <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-white/20 sm:block">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {examples[4].title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {examples[4].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
