"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import OverviewPanel from "./OverviewPanel";
import DocumentsPanel from "./DocumentsPanel";
import ChatPanel from "./ChatPanel";
import ReportsPanel from "./ReportsPanel";
import InsightsPanel from "./InsightsPanel";

const TABS = [
  {
    id: "overview" as const,
    label: "Overview",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "documents" as const,
    label: "Documents",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "chat" as const,
    label: "AI Chat",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    id: "reports" as const,
    label: "Reports",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "insights" as const,
    label: "Insights",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

type TabId = (typeof TABS)[number]["id"];

interface WorkspaceData {
  id: string;
  companyName: string;
  createdAt: string;
  status: "active" | "completed" | "archived";
  assessment?: {
    companyType?: string;
    department?: string;
    bottleneck?: string;
  };
}

interface Props {
  workspaceId: string;
  initialData?: WorkspaceData;
}

export default function WorkspaceShell({ workspaceId, initialData }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(30,58,95,0.3),transparent)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(30,58,95,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,95,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
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
            
            {/* Workspace info */}
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-muted-foreground">/</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {initialData?.companyName || "Workspace"}
                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  {initialData?.status || "Active"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/workspace/${workspaceId}/report`}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-white/20 hover:bg-card hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">View Report</span>
            </Link>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-rose/20 transition-all hover:shadow-xl hover:shadow-rose/30 hover:brightness-110">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="hidden sm:inline">Upload</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <nav className="relative z-10 border-b border-white/5 bg-card/30 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl gap-1 px-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "border-b-2 border-rose text-rose"
                  : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Panel content */}
      <main className="relative z-10 flex-1 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          {activeTab === "overview" && (
            <OverviewPanel workspaceId={workspaceId} initialData={initialData} />
          )}
          {activeTab === "documents" && (
            <DocumentsPanel workspaceId={workspaceId} />
          )}
          {activeTab === "chat" && <ChatPanel workspaceId={workspaceId} />}
          {activeTab === "reports" && <ReportsPanel workspaceId={workspaceId} />}
          {activeTab === "insights" && (
            <InsightsPanel workspaceId={workspaceId} />
          )}
        </div>
      </main>
    </div>
  );
}
