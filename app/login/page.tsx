import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import { getCurrentSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session?.workspaceId) {
    redirect(`/workspace/${session.workspaceId}`);
  }

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
          <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Back to Home
          </Link>
        </div>
      </header>

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose/20 bg-rose/5 px-4 py-1.5 text-sm text-rose">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Secure Login
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="text-base text-muted-foreground">
            Log in to access your AI assessment workspace
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/5 bg-gradient-to-b from-card to-background p-1">
          <div className="rounded-xl bg-card/50 p-6 backdrop-blur-sm sm:p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export function generateMetadata() {
  return {
    title: "Log In | ZestLearn",
    description: "Log in to your ZestLearn workspace",
  };
}
