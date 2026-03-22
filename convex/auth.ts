import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const registerUser = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    name: v.optional(v.string()),
    companyName: v.string(),
    companyType: v.string(),
    companySize: v.string(),
    department: v.string(),
    role: v.string(),
    aiMaturity: v.number(),
    bottleneck: v.string(),
    desiredOutcome: v.string(),
    currentTools: v.optional(v.string()),
    dataAvailability: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const userId = await ctx.db.insert("users", {
      email: args.email,
      passwordHash: args.passwordHash,
      name: args.name,
      createdAt: Date.now(),
    });

    const workspaceId = await ctx.db.insert("workspaces", {
      createdBy: userId,
      companyName: args.companyName,
      companyType: args.companyType,
      companySize: args.companySize,
      department: args.department,
      role: args.role,
      aiMaturity: args.aiMaturity,
      createdAt: Date.now(),
    });

    await ctx.db.insert("assessments", {
      workspaceId,
      bottleneck: args.bottleneck,
      desiredOutcome: args.desiredOutcome,
      currentTools: args.currentTools,
      dataAvailability: args.dataAvailability,
      status: "submitted",
      createdAt: Date.now(),
    });

    return { userId, workspaceId };
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) return null;

    return {
      _id: user._id,
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
    };
  },
});

export const getUserWorkspace = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const workspace = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("createdBy"), userId))
      .first();

    return workspace;
  },
});

export const updateLastLogin = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    await ctx.db.patch(userId, { lastLoginAt: Date.now() });
  },
});
