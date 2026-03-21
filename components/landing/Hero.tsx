import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(236,72,153,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(30,58,95,0.2),transparent)]" />
      </div>
      
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[600px] w-[600px] rounded-full bg-rose/8 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/5 h-[500px] w-[500px] rounded-full bg-navy/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-rose/20 bg-rose/5 px-5 py-2.5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
          </span>
          <span className="text-sm font-medium text-rose">AI-Powered Consulting for Life Sciences</span>
        </div>

        {/* Headline */}
        <h1 className="mb-8 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your Next AI Pilot in{" "}
          <span className="bg-gradient-to-r from-rose via-pink-400 to-rose-light bg-clip-text text-transparent">
            Minutes, Not Months
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-12 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          ZestLearn is your AI consultant copilot for pharma and biotech SMEs.
          We analyze your business context and generate a practical AI
          opportunity roadmap tailored to your team.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href="/assessment"
            className="group relative flex items-center gap-2.5 overflow-hidden rounded-2xl bg-rose px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-rose/25 transition-all duration-300 hover:shadow-rose/40"
          >
            <span className="relative z-10">Start Your AI Assessment</span>
            <svg
              className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
            <div className="absolute inset-0 bg-gradient-to-r from-rose to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
          >
            See How It Works
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            "No technical expertise required",
            "Results in under 10 minutes",
            "Pharma & biotech focused",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rose/10">
                <svg
                  className="h-3 w-3 text-rose"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
