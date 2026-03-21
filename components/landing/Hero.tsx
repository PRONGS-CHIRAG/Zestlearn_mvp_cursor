import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy/20 via-transparent to-transparent" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-coral/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-navy/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-coral" />
          AI-Powered Consulting for Life Sciences
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Find Your Next AI Pilot in{" "}
          <span className="bg-gradient-to-r from-coral to-coral/70 bg-clip-text text-transparent">
            Minutes, Not Months
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          ZestLearn is your AI consultant copilot for pharma and biotech SMEs.
          We analyze your business context and generate a practical AI
          opportunity roadmap tailored to your team.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/assessment"
            className="group flex items-center gap-2 rounded-lg bg-coral px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-coral/90 hover:shadow-xl hover:shadow-coral/25"
          >
            Start Your AI Assessment
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-8 py-4 text-base font-medium text-foreground transition-all hover:border-muted-foreground hover:bg-secondary"
          >
            See How It Works
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-coral"
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
            No technical expertise required
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-coral"
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
            Results in under 10 minutes
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-coral"
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
            Pharma & biotech focused
          </div>
        </div>
      </div>
    </section>
  );
}
