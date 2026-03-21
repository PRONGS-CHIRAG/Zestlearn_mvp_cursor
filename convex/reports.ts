import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createReportRecord = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    title: v.string(),
    structuredJson: v.any(),
    renderedMarkdown: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reports", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getLatestReportByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    return await ctx.db
      .query("reports")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .first();
  },
});

export const listReportsByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    return await ctx.db
      .query("reports")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .collect();
  },
});
