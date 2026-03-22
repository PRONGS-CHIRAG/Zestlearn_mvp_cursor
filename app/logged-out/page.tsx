import Link from "next/link";
import Image from "next/image";

export default function LoggedOutPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,58,95,0.3),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(30,58,95,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Header */}
      <header className="relative border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/zestlearn-logo.png" alt="ZestLearn" width={40} height={40} className="h-10 w-10" />
            <span className="text-lg font-semibold text-foreground">ZestLearn</span>
          </Link>
        </div>
      </header>

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        {/* Checkmark icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
          <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          You&apos;re Logged Out
        </h1>
        <p className="mb-8 max-w-sm text-base leading-relaxed text-muted-foreground">
          Your session has been securely ended. Thank you for using ZestLearn.
        </p>

        <Link
          href="/login"
          className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-rose to-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-rose/25 transition-all duration-300 hover:shadow-xl hover:shadow-rose/30 hover:brightness-110"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Go to Login
        </Link>

        <p className="mt-6 text-xs text-muted-foreground">
          Or{" "}
          <Link href="/" className="text-rose hover:underline">
            return to the homepage
          </Link>
        </p>
      </div>
    </main>
  );
}

export function generateMetadata() {
  return {
    title: "Logged Out | ZestLearn",
    description: "You have been logged out of ZestLearn",
  };
}
