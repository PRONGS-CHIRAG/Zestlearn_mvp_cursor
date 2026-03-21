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
    const all = await ctx.db.query("memoryPatterns").collect();
    return all
      .filter(
        (p) => p.scope === "shared" || p.workspaceId === workspaceId
      )
      .slice(0, limit);
  },
});
