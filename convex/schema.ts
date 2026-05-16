import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    createdAt: v.number(),
  }),

  workspaces: defineTable({
    createdBy: v.optional(v.id("users")),
    companyName: v.string(),
    companyType: v.string(),
    companySize: v.string(),
    department: v.string(),
    role: v.string(),
    aiMaturity: v.number(),
    createdAt: v.number(),
  }),

  assessments: defineTable({
    workspaceId: v.id("workspaces"),
    bottleneck: v.string(),
    desiredOutcome: v.string(),
    currentTools: v.optional(v.string()),
    dataAvailability: v.optional(v.string()),
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("analyzed")
    ),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  documents: defineTable({
    workspaceId: v.id("workspaces"),
    fileName: v.string(),
    fileType: v.string(),
    storagePath: v.optional(v.string()),
    extractedText: v.optional(v.string()),
    summary: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    processingStatus: v.union(
      v.literal("uploaded"),
      v.literal("processing"),
      v.literal("done"),
      v.literal("error")
    ),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  chatMessages: defineTable({
    workspaceId: v.id("workspaces"),
    role: v.union(
      v.literal("user"),
      v.literal("assistant"),
      v.literal("system")
    ),
    content: v.string(),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  reports: defineTable({
    workspaceId: v.id("workspaces"),
    title: v.string(),
    structuredJson: v.any(),
    renderedMarkdown: v.string(),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  memoryPatterns: defineTable({
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
    createdAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_scope", ["scope"]),

  events: defineTable({
    workspaceId: v.optional(v.id("workspaces")),
    eventType: v.string(),
    payload: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),
});
