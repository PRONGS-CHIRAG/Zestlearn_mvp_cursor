import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createDocumentRecord = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    fileName: v.string(),
    fileType: v.string(),
    storagePath: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("documents", {
      ...args,
      processingStatus: "uploaded",
      createdAt: Date.now(),
    });
  },
});

export const updateDocumentProcessingStatus = mutation({
  args: {
    documentId: v.id("documents"),
    processingStatus: v.union(
      v.literal("uploaded"),
      v.literal("processing"),
      v.literal("done"),
      v.literal("error")
    ),
  },
  handler: async (ctx, { documentId, processingStatus }) => {
    await ctx.db.patch(documentId, { processingStatus });
  },
});

export const saveDocumentSummary = mutation({
  args: {
    documentId: v.id("documents"),
    extractedText: v.optional(v.string()),
    summary: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, { documentId, extractedText, summary, tags }) => {
    await ctx.db.patch(documentId, {
      extractedText,
      summary,
      tags,
      processingStatus: "done",
    });
  },
});

export const listWorkspaceDocuments = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .collect();
  },
});
