import type { MemoryPattern } from "@/types/memory";

interface DocumentSummary {
  fileName: string;
  summary?: string;
  tags?: string[];
}

const TAG_CATEGORY_MAP: Record<string, string> = {
  bottleneck: "bottleneck",
  compliance: "compliance_constraint",
  workflow: "operating_pattern",
  process: "operating_pattern",
  data: "data_readiness",
  operations: "operations",
  research: "use_case",
  systems: "data_readiness",
};

/**
 * Extract workspace-scoped patterns from document summaries and tags.
 * Uses summaries (not raw text) to avoid leaking sensitive document content.
 */
export function extractPatternsFromDocuments(
  docs: DocumentSummary[],
  workspaceId?: string
): Omit<MemoryPattern, "id" | "createdAt">[] {
  const patterns: Omit<MemoryPattern, "id" | "createdAt">[] = [];

  for (const doc of docs) {
    if (!doc.summary || doc.summary.length < 20) continue;

    const category = inferCategory(doc.tags ?? []);

    patterns.push({
      workspaceId,
      scope: "workspace",
      category,
      patternText: `From document analysis: ${doc.summary.slice(0, 200)}`,
      sourceType: "document",
      industry: "pharma/biotech",
      confidenceScore: 60,
    });
  }

  return patterns.slice(0, 5);
}

function inferCategory(tags: string[]): string {
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    if (TAG_CATEGORY_MAP[lower]) return TAG_CATEGORY_MAP[lower];
  }
  return "operating_pattern";
}
