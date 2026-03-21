"use client";

// TODO: wire to Convex query listWorkspaceDocuments
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

export function useDocuments(workspaceId: string) {
  return {
    documents: [],
    loading: false,
    error: null,
  };
}
