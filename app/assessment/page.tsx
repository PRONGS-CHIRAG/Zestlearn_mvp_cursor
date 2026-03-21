import AssessmentForm from "@/components/assessment/AssessmentForm";
import Link from "next/link";
import Image from "next/image";

export default function AssessmentPage() {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,58,95,0.3),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Header */}
      <header className="relative border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/zestlearn-logo.png"
              alt="ZestLearn"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-lg font-semibold text-foreground">
              ZestLearn
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <div className="relative mx-auto max-w-2xl px-6 py-12 md:py-16">
        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose text-xs font-medium text-white">
              1
            </span>
            <span className="text-sm font-medium text-foreground">
              Assessment
            </span>
          </div>
          <div className="h-px w-8 bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              2
            </span>
            <span className="text-sm text-muted-foreground">Context</span>
          </div>
          <div className="h-px w-8 bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              3
            </span>
            <span className="text-sm text-muted-foreground">Results</span>
          </div>
        </div>

        {/* Intro section */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose/20 bg-rose/5 px-4 py-1.5 text-sm text-rose">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Takes under 5 minutes
          </div>
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Start Your{" "}
            <span className="bg-gradient-to-r from-rose to-rose-light bg-clip-text text-transparent">
              AI Assessment
            </span>
          </h1>
          <p className="mx-auto max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Share details about your team, challenges, and goals. We will
            analyze your context and generate a practical AI opportunity
            roadmap tailored to your organization.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-1">
          <div className="rounded-xl bg-card/50 backdrop-blur-sm">
            <AssessmentForm />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Your data stays private</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Results in minutes</span>
          </div>
        </div>
      </div>
    </main>
  );
}
