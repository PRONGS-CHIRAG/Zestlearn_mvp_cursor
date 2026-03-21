import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] border border-rose/20 bg-gradient-to-br from-navy/50 via-background to-rose/5 p-12 md:p-24">
          {/* Background decorations */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-rose/20 blur-[180px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-navy/50 blur-[150px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/10 blur-[100px]" />
          
          {/* Animated grid pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-rose/30 bg-rose/10 px-5 py-2.5 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose"></span>
              </span>
              <span className="text-sm font-semibold text-rose">Start Free Today</span>
            </div>

            {/* Headline */}
            <h2 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Turn Your Business Bottleneck into a{" "}
              <span className="bg-gradient-to-r from-rose via-pink-400 to-rose-light bg-clip-text text-transparent">
                Practical AI Roadmap
              </span>
            </h2>
            
            {/* Description */}
            <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Stop guessing where AI fits in your organization. ZestLearn analyzes your 
              specific context and delivers actionable recommendations you can implement 
              immediately. Get clarity in minutes, not months.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center justify-center gap-5">
              <Link
                href="/assessment"
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-rose px-12 py-6 text-lg font-bold text-white shadow-2xl shadow-rose/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-rose/60"
              >
                <span className="relative z-10">Start Your AI Assessment</span>
                <svg
                  className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-rose via-pink-500 to-rose opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="#how-it-works"
                className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                See how it works
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-10">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Results in under 10 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Your data stays private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
