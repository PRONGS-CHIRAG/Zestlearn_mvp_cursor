const audiences = [
  {
    title: "Innovation Managers",
    painPoint: "Overwhelmed by AI hype with no clear path to real ROI",
    description:
      "You're tasked with driving innovation but lack the bandwidth to evaluate every AI tool. ZestLearn cuts through the noise and surfaces only the opportunities worth pursuing.",
    benefits: [
      "Prioritized AI use cases by impact",
      "Clear business case documentation",
      "Stakeholder-ready recommendations",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    title: "Digital Transformation Leads",
    painPoint: "Struggling to align AI initiatives with business strategy",
    description:
      "Bridging the gap between technical possibilities and business needs is hard. ZestLearn maps AI opportunities directly to your strategic objectives and existing workflows.",
    benefits: [
      "Strategy-aligned roadmaps",
      "Integration-first approach",
      "Change management insights",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Operations Managers",
    painPoint: "Manual processes draining team productivity",
    description:
      "You see inefficiencies daily but can't justify the time to research AI solutions. ZestLearn identifies quick wins that free up your team for higher-value work.",
    benefits: [
      "Process automation opportunities",
      "Time-to-value estimates",
      "Low-risk pilot recommendations",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "R&D / Process Leads",
    painPoint: "Scientific expertise trapped in siloed, repetitive tasks",
    description:
      "Your team's brilliance is wasted on data wrangling and documentation. ZestLearn finds AI solutions that amplify your scientists' impact, not replace them.",
    benefits: [
      "Research workflow optimization",
      "Data pipeline automation",
      "Compliance-aware solutions",
    ],
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
];

export function TargetAudience() {
  return (
    <section id="audience" className="relative py-28 md:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/50 via-transparent to-card/50" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose">
            Who It's For
          </span>
          <h2 className="mb-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Built for Pharma & Biotech Leaders
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            ZestLearn is designed for decision-makers at SMEs who need to move
            fast on AI without the luxury of a dedicated data science team.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="group flex flex-col rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-6 transition-all duration-500 hover:border-rose/20 hover:bg-white/[0.04] lg:p-8"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/20 to-navy/20 text-rose ring-1 ring-white/5 transition-all duration-500 group-hover:ring-rose/20">
                {audience.icon}
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {audience.title}
              </h3>

              {/* Pain point */}
              <p className="mb-4 text-sm font-medium italic text-rose/80">
                "{audience.painPoint}"
              </p>

              {/* Description */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {audience.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2.5">
                {audience.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  >
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose/10">
                      <svg
                        className="h-2.5 w-2.5 text-rose"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {benefit}
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
