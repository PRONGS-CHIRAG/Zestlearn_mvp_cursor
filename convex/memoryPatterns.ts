import { query } from "./_generated/server";
import { v } from "convex/values";

export const listWorkspaceAndSharedPatterns = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    const workspace = await ctx.db
      .query("memoryPatterns")
      .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
      .take(10);
    const shared = await ctx.db
      .query("memoryPatterns")
      .filter((q) => q.eq(q.field("scope"), "shared"))
      .take(10);
    return [...workspace, ...shared];
  },
});
