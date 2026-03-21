import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createChatMessage = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system")
    ),
    content: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("chatMessages", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const listRecentMessagesByWorkspace = query({
  args: {
    workspaceId: v.id("workspaces"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { workspaceId, limit = 20 }) => {
    const messages = await ctx.db
      .query("chatMessages")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .take(limit);
    return messages.reverse();
  },
});
