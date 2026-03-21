const steps = [
  {
    number: "01",
    title: "Tell Us About Your Team",
    description:
      "Share your team structure, current workflows, and the bottlenecks slowing you down through our guided assessment.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Upload Internal Context",
    description:
      "Securely upload relevant documents, SOPs, or data samples to give our AI deeper insight into your operations.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Chat with AI Consultant",
    description:
      "Have a guided conversation with our AI copilot to refine your needs and explore potential AI applications.",
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
    number: "04",
    title: "Get Your AI Roadmap",
    description:
      "Receive a practical AI opportunity report with prioritized use cases, risk assessment, and implementation steps.",
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
            opportunities for your organization in four simple steps.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose/20 to-rose/5 text-rose ring-1 ring-rose/10 transition-all duration-500 group-hover:ring-rose/20">
                  {step.icon}
                </div>
                <span className="text-4xl font-bold text-white/[0.04] transition-all duration-500 group-hover:text-rose/10">
                  {step.number}
                </span>
              </div>

              {/* Step content */}
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
