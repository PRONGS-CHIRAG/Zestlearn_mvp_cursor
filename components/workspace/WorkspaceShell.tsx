"use client";

import { useState } from "react";
import OverviewPanel from "./OverviewPanel";
import DocumentsPanel from "./DocumentsPanel";
import ChatPanel from "./ChatPanel";
import ReportsPanel from "./ReportsPanel";
import InsightsPanel from "./InsightsPanel";

const TABS = ["Overview", "Documents", "Chat", "Reports", "Insights"] as const;
type Tab = (typeof TABS)[number];

interface Props {
  workspaceId: string;
}

export default function WorkspaceShell({ workspaceId }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-slate-900">ZestLearn Workspace</h1>
        <p className="text-xs text-slate-500">ID: {workspaceId}</p>
      </header>

      {/* Tab navigation */}
      <nav className="flex gap-1 border-b border-slate-200 bg-white px-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium transition ${
              activeTab === tab
                ? "border-b-2 border-indigo-500 text-indigo-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Panel content */}
      <main className="flex-1 px-6 py-8">
        {activeTab === "Overview" && <OverviewPanel workspaceId={workspaceId} />}
        {activeTab === "Documents" && <DocumentsPanel workspaceId={workspaceId} />}
        {activeTab === "Chat" && <ChatPanel workspaceId={workspaceId} />}
        {activeTab === "Reports" && <ReportsPanel workspaceId={workspaceId} />}
        {activeTab === "Insights" && <InsightsPanel workspaceId={workspaceId} />}
      </main>
    </div>
  );
}
