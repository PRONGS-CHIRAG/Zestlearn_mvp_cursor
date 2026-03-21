"use client";

import Link from "next/link";
import Image from "next/image";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,58,95,0.3),transparent)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(30,58,95,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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
        </div>
      </header>

      {/* Error content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-16">
        <div className="max-w-md text-center">
          {/* Error icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
            <svg
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Error message */}
          <h1 className="mb-3 text-2xl font-bold text-foreground">
            Failed to Load Workspace
          </h1>
          <p className="mb-8 text-muted-foreground">
            {error.message ||
              "Something went wrong while loading your workspace. Please try again."}
          </p>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/30 hover:brightness-110"
            >
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Try Again
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-card/50 px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-white/20 hover:bg-card hover:text-foreground"
            >
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Error details (development) */}
          {process.env.NODE_ENV === "development" && error.stack && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Error details
              </summary>
              <pre className="mt-2 overflow-auto rounded-lg border border-white/5 bg-card/50 p-4 text-xs text-muted-foreground">
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </main>
    </div>
  );
}
