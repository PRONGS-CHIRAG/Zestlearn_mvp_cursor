import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkspace = mutation({
  args: {
    createdBy: v.id("users"),
    companyName: v.string(),
    companyType: v.string(),
    companySize: v.string(),
    department: v.string(),
    role: v.string(),
    aiMaturity: v.number(),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspaces", {
      ...args,
      createdAt: Date.now(),
    });
    return { workspaceId };
  },
});

export const getWorkspaceById = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    return await ctx.db.get(workspaceId);
  },
});

export const getWorkspaceDashboardData = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const workspace = await ctx.db.get(workspaceId);
    if (!workspace) return null;

    const assessment = await ctx.db
      .query("assessments")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .first();

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .collect();

    const latestReport = await ctx.db
      .query("reports")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .first();

    const wsPatterns = await ctx.db
      .query("memoryPatterns")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .take(20);

    const sharedPatterns = await ctx.db
      .query("memoryPatterns")
      .withIndex("by_scope", (q) => q.eq("scope", "shared"))
      .order("desc")
      .take(10);

    const seen = new Set(wsPatterns.map((p) => p._id));
    const insights = [
      ...wsPatterns,
      ...sharedPatterns.filter((p) => !seen.has(p._id)),
    ];

    return { workspace, assessment, documents, latestReport, insights };
  },
});
