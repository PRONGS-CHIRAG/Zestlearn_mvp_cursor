import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card/50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/zestlearn-logo.png"
              alt="ZestLearn"
              width={36}
              height={36}
              className="h-9 w-auto"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              ZestLearn
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-2">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#audience", label: "Who It's For" },
              { href: "#examples", label: "Examples" },
              { href: "/assessment", label: "Assessment" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} ZestLearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
