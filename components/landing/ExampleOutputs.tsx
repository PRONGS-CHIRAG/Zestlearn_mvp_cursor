const examples = [
  {
    category: "AI Opportunity Report",
    title: "Prioritized Use Cases",
    description:
      "Get a ranked list of AI opportunities tailored to your organization's specific context, maturity level, and strategic goals.",
    preview: {
      items: [
        { priority: "High", name: "Automated Literature Review", impact: "8/10" },
        { priority: "High", name: "Clinical Trial Matching", impact: "9/10" },
        { priority: "Medium", name: "Document Summarization", impact: "7/10" },
      ],
    },
  },
  {
    category: "Risk Assessment",
    title: "Implementation Risks",
    description:
      "Understand potential challenges and mitigation strategies for each AI initiative before you commit resources.",
    preview: {
      risks: [
        { type: "Technical", level: "Low", mitigation: "Phased rollout" },
        { type: "Regulatory", level: "Medium", mitigation: "FDA guidance review" },
        { type: "Adoption", level: "Low", mitigation: "Change management" },
      ],
    },
  },
  {
    category: "Implementation Roadmap",
    title: "90-Day Action Plan",
    description:
      "A clear timeline with milestones, resource requirements, and success metrics for your top AI initiatives.",
    preview: {
      phases: [
        { week: "1-2", task: "Stakeholder alignment" },
        { week: "3-6", task: "Pilot development" },
        { week: "7-12", task: "Testing & iteration" },
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
            What You Get
          </span>
          <h2 className="mb-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Actionable AI Intelligence
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Our AI copilot delivers comprehensive reports designed to help you
            make informed decisions about your AI investments.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {examples.map((example, index) => (
            <div
              key={example.title}
              className="group overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-500 hover:border-rose/20"
            >
              {/* Preview area */}
              <div className="border-b border-white/5 bg-black/20 p-6">
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-lg bg-rose/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-rose">
                    {example.category}
                  </span>
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                </div>

                {/* Preview content */}
                <div className="space-y-2.5">
                  {index === 0 &&
                    example.preview.items?.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              item.priority === "High" ? "bg-rose" : "bg-muted-foreground"
                            }`}
                          />
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.impact}</span>
                      </div>
                    ))}

                  {index === 1 &&
                    example.preview.risks?.map((risk) => (
                      <div
                        key={risk.type}
                        className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/5"
                      >
                        <span className="text-sm font-medium text-foreground">{risk.type}</span>
                        <span
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                            risk.level === "Low"
                              ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                          }`}
                        >
                          {risk.level}
                        </span>
                      </div>
                    ))}

                  {index === 2 &&
                    example.preview.phases?.map((phase) => (
                      <div
                        key={phase.week}
                        className="flex items-center gap-4 rounded-xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/5"
                      >
                        <span className="w-14 shrink-0 font-mono text-sm font-semibold text-rose">
                          W{phase.week}
                        </span>
                        <span className="text-sm font-medium text-foreground">{phase.task}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Description area */}
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                  {example.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
