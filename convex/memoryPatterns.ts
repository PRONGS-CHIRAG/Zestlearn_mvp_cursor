import { query } from "./_generated/server";
import { v } from "convex/values";

export const listWorkspaceAndSharedPatterns = query({
  args: {
    workspaceId: v.id("workspaces"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { workspaceId, limit = 20 }) => {
    const workspacePatterns = await ctx.db
      .query("memoryPatterns")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .take(limit);

    const sharedPatterns = await ctx.db
      .query("memoryPatterns")
      .withIndex("by_scope", (q) => q.eq("scope", "shared"))
      .order("desc")
      .take(limit);

    const seen = new Set(workspacePatterns.map((p) => p._id));
    const merged = [
      ...workspacePatterns,
      ...sharedPatterns.filter((p) => !seen.has(p._id)),
    ];

    merged.sort((a, b) => {
      if (a.scope === "workspace" && b.scope === "shared") return -1;
      if (a.scope === "shared" && b.scope === "workspace") return 1;
      return b.createdAt - a.createdAt;
    });

    return merged.slice(0, limit);
  },
});

export const listInsightsForPanel = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const workspacePatterns = await ctx.db
      .query("memoryPatterns")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .take(30);

    const sharedPatterns = await ctx.db
      .query("memoryPatterns")
      .withIndex("by_scope", (q) => q.eq("scope", "shared"))
      .order("desc")
      .take(20);

    const seen = new Set(workspacePatterns.map((p) => p._id));
    const all = [
      ...workspacePatterns,
      ...sharedPatterns.filter((p) => !seen.has(p._id)),
    ];

    all.sort((a, b) => {
      if (a.scope === "workspace" && b.scope === "shared") return -1;
      if (a.scope === "shared" && b.scope === "workspace") return 1;
      return b.createdAt - a.createdAt;
    });

    return all;
  },
});
