import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-navy/40 via-card to-rose/10 p-10 md:p-20">
          {/* Background decorations */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-rose/15 blur-[150px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-navy/40 blur-[120px]" />
          
          {/* Grid pattern */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur-sm">
              <svg className="h-4 w-4 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-foreground">Free Assessment</span>
            </div>

            {/* Headline */}
            <h2 className="mb-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Ready to Find Your AI Opportunity?
            </h2>
            
            {/* Description */}
            <p className="mb-10 text-pretty text-lg text-muted-foreground">
              Start your free AI assessment today and discover how AI can
              transform your pharma or biotech operations. No commitment
              required.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/assessment"
                className="group relative flex items-center gap-2.5 overflow-hidden rounded-2xl bg-rose px-10 py-5 text-base font-semibold text-white shadow-2xl shadow-rose/30 transition-all duration-300 hover:shadow-rose/50"
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
            </div>

            {/* Trust note */}
            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Takes less than 10 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
