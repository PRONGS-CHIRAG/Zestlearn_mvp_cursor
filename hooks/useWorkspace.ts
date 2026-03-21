"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export function useWorkspace(workspaceId: string) {
  // Skip the query if workspaceId is empty (prevents v.id() validation errors).
  const data = useQuery(
    api.workspaces.getWorkspaceDashboardData,
    workspaceId ? { workspaceId: workspaceId as Id<"workspaces"> } : "skip"
  );

  if (!workspaceId) {
    return {
      workspace: null,
      assessment: null,
      documents: [],
      latestReport: null,
      insights: [],
      loading: false,
      notFound: true,
    };
  }

  return {
    workspace: data?.workspace ?? null,
    assessment: data?.assessment ?? null,
    documents: data?.documents ?? [],
    latestReport: data?.latestReport ?? null,
    insights: data?.insights ?? [],
    // undefined = still loading, null = workspace not found, object = loaded
    loading: data === undefined,
    notFound: data === null,
  };
}
