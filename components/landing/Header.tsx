import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/5 bg-background/60 px-6 py-3 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Image
              src="/images/zestlearn-logo.png"
              alt="ZestLearn"
              width={44}
              height={44}
              className="h-9 w-auto"
            />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              ZestLearn
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#audience", label: "Who It's For" },
              { href: "#examples", label: "Examples" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/assessment"
            className="group relative overflow-hidden rounded-xl bg-rose px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose/20 transition-all duration-300 hover:shadow-xl hover:shadow-rose/30"
          >
            <span className="relative z-10">Start Assessment</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </header>
  );
}
