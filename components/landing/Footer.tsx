import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Image
              src="/images/zestlearn-logo.png"
              alt="ZestLearn"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold text-foreground">
              ZestLearn
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
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
            <Link
              href="/assessment"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Assessment
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} ZestLearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
