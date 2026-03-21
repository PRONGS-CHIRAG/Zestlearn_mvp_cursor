export default function WorkspaceLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,58,95,0.3),transparent)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(30,58,95,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Header skeleton */}
      <header className="relative z-10 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-muted" />
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
        </div>
      </header>

      {/* Tab skeleton */}
      <nav className="relative z-10 border-b border-white/5 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl gap-1 px-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-12 w-24 animate-pulse rounded-t-lg bg-muted/50"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </nav>

      {/* Content skeleton */}
      <main className="relative z-10 flex-1 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl border border-white/5 bg-card/50"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>

          {/* Loading spinner */}
          <div className="mt-12 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-rose" />
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border border-rose/30" />
            </div>
            <p className="text-sm text-muted-foreground">
              Loading your workspace...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
