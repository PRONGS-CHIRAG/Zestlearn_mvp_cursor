const examples = [
  {
    category: "AI Opportunity Report",
    title: "Prioritized Use Cases",
    description:
      "Get a ranked list of AI opportunities tailored to your organization's specific context, maturity level, and strategic goals.",
    preview: {
      items: [
        {
          priority: "High",
          name: "Automated Literature Review",
          impact: "8/10",
        },
        {
          priority: "High",
          name: "Clinical Trial Matching",
          impact: "9/10",
        },
        {
          priority: "Medium",
          name: "Document Summarization",
          impact: "7/10",
        },
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
    <section id="examples" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-rose">
            What You Get
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
            Actionable AI Intelligence
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Our AI copilot delivers comprehensive reports designed to help you
            make informed decisions about your AI investments.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {examples.map((example, index) => (
            <div
              key={example.title}
              className="group relative overflow-hidden rounded-2xl border border-navy/50 bg-gradient-to-b from-card to-background transition-all hover:border-rose/30 hover:shadow-xl hover:shadow-rose/5"
            >
              {/* Preview area */}
              <div className="border-b border-navy/30 bg-background/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-rose">
                    {example.category}
                  </span>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-rose/60" />
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <div className="h-2 w-2 rounded-full bg-muted" />
                  </div>
                </div>

                {/* Preview content based on type */}
                {index === 0 && (
                  <div className="space-y-2">
                    {example.preview.items?.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              item.priority === "High"
                                ? "bg-rose"
                                : "bg-muted-foreground"
                            }`}
                          />
                          <span className="text-foreground">{item.name}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {item.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {index === 1 && (
                  <div className="space-y-2">
                    {example.preview.risks?.map((risk) => (
                      <div
                        key={risk.type}
                        className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                      >
                        <span className="text-foreground">{risk.type}</span>
                        <span
                          className={`rounded px-2 py-0.5 text-xs ${
                            risk.level === "Low"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {risk.level}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {index === 2 && (
                  <div className="space-y-2">
                    {example.preview.phases?.map((phase) => (
                      <div
                        key={phase.week}
                        className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                      >
                        <span className="w-12 shrink-0 font-mono text-rose">
                          W{phase.week}
                        </span>
                        <span className="text-foreground">{phase.task}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description area */}
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground">
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
