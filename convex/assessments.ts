import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitAssessment = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    bottleneck: v.string(),
    desiredOutcome: v.string(),
    currentTools: v.optional(v.string()),
    dataAvailability: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const assessmentId = await ctx.db.insert("assessments", {
      ...args,
      status: "submitted",
      createdAt: Date.now(),
    });
    return { assessmentId, status: "submitted" as const };
  },
});

export const getAssessmentByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, { workspaceId }) => {
    return await ctx.db
      .query("assessments")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
      .first();
  },
});

export const updateAssessmentStatus = mutation({
  args: {
    assessmentId: v.id("assessments"),
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("analyzed")
    ),
  },
  handler: async (ctx, { assessmentId, status }) => {
    await ctx.db.patch(assessmentId, { status });
  },
});
