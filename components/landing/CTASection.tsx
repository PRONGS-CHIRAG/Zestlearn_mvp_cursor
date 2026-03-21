import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-rose/20 bg-gradient-to-br from-navy/30 via-card to-rose/10 p-8 md:p-16">
          {/* Background decorations */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-rose/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-navy/40 blur-[80px]" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-5xl">
              Ready to Find Your AI Opportunity?
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Start your free AI assessment today and discover how AI can
              transform your pharma or biotech operations. No commitment
              required.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/assessment"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-rose/25 transition-all hover:shadow-xl hover:shadow-rose/40 hover:brightness-110"
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
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Takes less than 10 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
