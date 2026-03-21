"use client";

// TODO: wire to Convex query getWorkspaceDashboardData
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

export function useWorkspace(workspaceId: string) {
  // Placeholder until Convex is initialized
  return {
    workspace: null,
    assessment: null,
    loading: false,
    error: null,
  };
}
