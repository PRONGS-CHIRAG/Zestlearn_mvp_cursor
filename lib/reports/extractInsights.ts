import type { OpportunityReport } from "@/types/report";
import type { MemoryPattern } from "@/types/memory";

export function extractInsightsFromReport(
  report: OpportunityReport,
  workspaceId?: string
): Omit<MemoryPattern, "id" | "createdAt">[] {
  const patterns: Omit<MemoryPattern, "id" | "createdAt">[] = [];

  // Extract best pilot pattern
  if (report.best_first_pilot.title) {
    patterns.push({
      workspaceId,
      scope: "workspace",
      category: "first_pilot",
      patternText: `Best first pilot: ${report.best_first_pilot.title}. ${report.best_first_pilot.why_this_first}`,
      sourceType: "report",
      industry: "pharma/biotech",
    });
  }

  // Extract risk patterns from use cases
  for (const uc of report.recommended_use_cases) {
    for (const risk of uc.risks) {
      patterns.push({
        workspaceId,
        scope: "workspace",
        category: "risk",
        functionArea: undefined,
        patternText: `Risk for ${uc.title}: ${risk}`,
        sourceType: "report",
        industry: "pharma/biotech",
      });
    }
  }

  return patterns;
}
