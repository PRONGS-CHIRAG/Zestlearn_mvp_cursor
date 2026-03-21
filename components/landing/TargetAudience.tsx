const audiences = [
  {
    title: "Pharmaceutical SMEs",
    description:
      "Small to mid-sized pharma companies looking to leverage AI for drug discovery, clinical trials optimization, and regulatory compliance.",
    features: [
      "Drug development acceleration",
      "Clinical trial optimization",
      "Regulatory document automation",
    ],
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    title: "Biotech Startups",
    description:
      "Innovative biotech companies seeking to integrate AI into their research workflows and scale their scientific operations efficiently.",
    features: [
      "Research workflow automation",
      "Data analysis pipelines",
      "Lab operations optimization",
    ],
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: "Life Sciences Teams",
    description:
      "Cross-functional teams in life sciences organizations looking to identify and prioritize AI opportunities across departments.",
    features: [
      "Cross-team collaboration",
      "Process standardization",
      "Knowledge management",
    ],
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

export function TargetAudience() {
  return (
    <section id="audience" className="relative bg-gradient-to-b from-background via-card to-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider text-rose">
            Who It's For
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
            Built for Life Sciences Innovators
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Whether you're a pharmaceutical company, biotech startup, or a
            cross-functional team, ZestLearn helps you navigate the AI
            landscape.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="group flex flex-col rounded-2xl border border-navy/50 bg-gradient-to-b from-card to-background p-8 transition-all hover:border-rose/30 hover:shadow-xl hover:shadow-rose/5"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/10 to-navy/10 text-rose">
                {audience.icon}
              </div>

              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {audience.title}
              </h3>

              <p className="mb-6 flex-1 leading-relaxed text-muted-foreground">
                {audience.description}
              </p>

              <ul className="space-y-3">
                {audience.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-rose"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
