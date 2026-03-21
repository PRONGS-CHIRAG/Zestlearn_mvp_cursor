import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/zestlearn-logo.png"
            alt="ZestLearn"
            width={48}
            height={48}
            className="h-10 w-auto"
          />
          <span className="text-xl font-semibold text-foreground">
            ZestLearn
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="#audience"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Who It's For
          </Link>
          <Link
            href="#examples"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Examples
          </Link>
        </nav>
        <Link
          href="/assessment"
          className="rounded-lg bg-coral px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-coral/90 hover:shadow-lg hover:shadow-coral/25"
        >
          Start Assessment
        </Link>
      </div>
    </header>
  );
}
