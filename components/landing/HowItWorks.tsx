const steps = [
  {
    number: "01",
    title: "Share Your Context",
    description:
      "Tell us about your company, team structure, current bottlenecks, and AI maturity level through our guided assessment.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI Analyzes Your Needs",
    description:
      "Our AI copilot processes your inputs, identifies opportunities, and maps them against industry best practices and use cases.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get Your Roadmap",
    description:
      "Receive a prioritized AI opportunity report with specific use cases, risk assessment, and a practical implementation timeline.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 md:py-36">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(30,58,95,0.15),transparent)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-rose/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose">
            How It Works
          </span>
          <h2 className="mb-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            From Assessment to Action
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Our streamlined process helps you identify the right AI
            opportunities for your organization in three simple steps.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-8 transition-all duration-500 hover:border-rose/20 hover:bg-white/[0.04]"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 translate-x-full bg-gradient-to-r from-white/10 to-transparent lg:block" />
              )}

              {/* Step header */}
              <div className="mb-8 flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose/20 to-rose/5 text-rose ring-1 ring-rose/10 transition-all duration-500 group-hover:ring-rose/20">
                  {step.icon}
                </div>
                <span className="text-5xl font-bold text-white/[0.04] transition-all duration-500 group-hover:text-rose/10">
                  {step.number}
                </span>
              </div>

              {/* Step content */}
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
