import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveMemoryPattern = mutation({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    scope: v.union(v.literal("workspace"), v.literal("shared")),
    category: v.string(),
    functionArea: v.optional(v.string()),
    industry: v.optional(v.string()),
    patternText: v.string(),
    confidenceScore: v.optional(v.number()),
    sourceType: v.union(
      v.literal("report"),
      v.literal("chat"),
      v.literal("seed"),
      v.literal("document")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("memoryPatterns", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const listRelevantMemoryPatterns = query({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { workspaceId, limit = 10 }) => {
    const shared = await ctx.db
      .query("memoryPatterns")
      .withIndex("by_scope", (q) => q.eq("scope", "shared"))
      .order("desc")
      .take(limit);

    if (!workspaceId) return shared.slice(0, limit);

    const workspace = await ctx.db
      .query("memoryPatterns")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .take(limit);

    const seen = new Set(workspace.map((p) => p._id));
    return [...workspace, ...shared.filter((p) => !seen.has(p._id))].slice(0, limit);
  },
});

export const seedSharedPatterns = mutation({
  args: {
    patterns: v.array(
      v.object({
        category: v.string(),
        patternText: v.string(),
        industry: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, { patterns }) => {
    const ids = [];
    for (const p of patterns) {
      const id = await ctx.db.insert("memoryPatterns", {
        scope: "shared",
        category: p.category,
        patternText: p.patternText,
        industry: p.industry ?? "pharma/biotech",
        sourceType: "seed",
        createdAt: Date.now(),
      });
      ids.push(id);
    }
    return ids;
  },
});
