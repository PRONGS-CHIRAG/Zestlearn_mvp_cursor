import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const logEvent = mutation({
  args: {
    workspaceId: v.optional(v.id("workspaces")),
    eventType: v.string(),
    payload: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const listEventsByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    return await ctx.db
      .query("events")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .order("desc")
      .collect();
  },
});
