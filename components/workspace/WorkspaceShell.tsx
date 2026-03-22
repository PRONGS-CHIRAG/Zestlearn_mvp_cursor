"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import OverviewPanel from "./OverviewPanel";
import DocumentsPanel from "./DocumentsPanel";
import ChatPanel from "./ChatPanel";
import ReportsPanel from "./ReportsPanel";
import InsightsPanel from "./InsightsPanel";
import PanelErrorBoundary from "@/components/shared/PanelErrorBoundary";
import { useWorkspace } from "@/hooks/useWorkspace";

const TABS = [
  {
    id: "overview" as const,
    label: "Overview",
    description: "Dashboard summary",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "documents" as const,
    label: "Documents",
    description: "Uploaded files",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    id: "chat" as const,
    label: "AI Chat",
    description: "Consultant",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    id: "reports" as const,
    label: "Reports",
    description: "AI roadmaps",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: "insights" as const,
    label: "Insights",
    description: "Key findings",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
];

type TabId = (typeof TABS)[number]["id"];

interface Props {
  workspaceId: string;
}

export default function WorkspaceShell({ workspaceId }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { workspace, loading } = useWorkspace(workspaceId);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/logged-out");
    } catch {
      router.push("/logged-out");
    }
  }

  const companyName = workspace?.companyName ?? "Workspace";
  const departmentLabel = workspace?.department ?? "AI Assessment";
  const statusColors = {
    active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    completed: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    archived: "border-gray-500/30 bg-gray-500/10 text-gray-400",
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,58,95,0.25),transparent)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(30,58,95,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Header */}
      <header className="relative z-20 border-b border-white/[0.06] bg-background/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] p-2 text-muted-foreground transition-all hover:border-white/15 hover:bg-white/[0.05] hover:text-foreground"
              title="Back to Home"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-80">
              <div className="relative">
                <Image
                  src="/images/zestlearn-logo.png"
                  alt="ZestLearn"
                  width={36}
                  height={36}
                  className="h-9 w-9"
                />
                <div className="absolute -inset-1 rounded-full bg-rose/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
              </div>
              <span className="hidden text-lg font-semibold tracking-tight text-foreground sm:block">
                ZestLearn
              </span>
            </Link>

            <div className="hidden h-6 w-px bg-white/10 sm:block" />

            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-tight text-foreground">
                  {loading ? "Loading…" : companyName}
                </span>
                <span className="text-xs text-muted-foreground">{departmentLabel}</span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${statusColors.active}`}
              >
                Active
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-white/15 hover:bg-white/[0.05] hover:text-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
            <Link
              href={`/workspace/${workspaceId}/report`}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-white/15 hover:bg-white/[0.05] hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Export Report
            </Link>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/25 hover:brightness-110">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Upload Files
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400 disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] p-2 text-muted-foreground transition-all hover:bg-white/[0.05] hover:text-foreground md:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-white/[0.06] bg-card/95 backdrop-blur-xl md:hidden">
            <div className="space-y-1 px-4 py-3">
              <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                <span className="text-sm font-medium text-foreground">{companyName}</span>
                <span className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${statusColors.active}`}>
                  Active
                </span>
              </div>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/[0.05] hover:text-foreground">
                Settings
              </button>
              <Link
                href={`/workspace/${workspaceId}/report`}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"
              >
                Export Report
              </Link>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/5"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        )}
      </header>

      <nav className="relative z-10 border-b border-white/[0.06] bg-card/40 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mb-px flex gap-1 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-2.5 whitespace-nowrap px-4 py-4 text-sm font-medium transition-all ${
                  activeTab === tab.id ? "text-rose" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`transition-colors ${
                    activeTab === tab.id ? "text-rose" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-gradient-to-r from-rose to-pink-500" />
                )}
                {activeTab !== tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 rounded-t-full bg-white/20 transition-transform group-hover:scale-x-100" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PanelErrorBoundary>
              {activeTab === "overview" && <OverviewPanel workspaceId={workspaceId} />}
              {activeTab === "documents" && <DocumentsPanel workspaceId={workspaceId} />}
              {activeTab === "chat" && <ChatPanel workspaceId={workspaceId} />}
              {activeTab === "reports" && <ReportsPanel workspaceId={workspaceId} />}
              {activeTab === "insights" && <InsightsPanel workspaceId={workspaceId} />}
            </PanelErrorBoundary>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] bg-card/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} ZestLearn. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/help" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Help
            </Link>
            <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
