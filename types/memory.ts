export const MEMORY_CATEGORIES = [
  "bottleneck",
  "first_pilot",
  "use_case",
  "risk",
  "decision",
  "objection",
  "data_readiness",
  "compliance_constraint",
  "operating_pattern",
  "pain_point",
  "maturity_guidance",
  "knowledge_fragmentation",
  "operations",
] as const;

export type MemoryCategory = (typeof MEMORY_CATEGORIES)[number] | string;

export interface MemoryPattern {
  id: string;
  workspaceId?: string;
  scope: "workspace" | "shared";
  category: MemoryCategory;
  functionArea?: string;
  industry?: string;
  patternText: string;
  confidenceScore?: number;
  sourceType: "report" | "chat" | "seed" | "document";
  createdAt?: number;
}

export interface MemoryQueryResponse {
  success: boolean;
  insights: MemoryPattern[];
  error?: string;
}

export const CATEGORY_DISPLAY: Record<string, { label: string; group: string }> = {
  first_pilot: { label: "Suggested First Move", group: "recommended" },
  use_case: { label: "AI Use Case", group: "recommended" },
  decision: { label: "Key Decision", group: "recommended" },
  bottleneck: { label: "Common Blocker", group: "blockers" },
  risk: { label: "Risk", group: "blockers" },
  objection: { label: "Objection", group: "blockers" },
  compliance_constraint: { label: "Compliance Constraint", group: "blockers" },
  pain_point: { label: "Pain Point", group: "blockers" },
  data_readiness: { label: "Data Readiness", group: "context" },
  operating_pattern: { label: "Operating Pattern", group: "context" },
  maturity_guidance: { label: "Maturity Guidance", group: "context" },
  knowledge_fragmentation: { label: "Knowledge Gap", group: "context" },
  operations: { label: "Operations Insight", group: "context" },
};
