import type { OpportunityReport } from "@/types/report";
import type { MemoryPattern } from "@/types/memory";

export function extractInsightsFromReport(
  report: OpportunityReport,
  workspaceId?: string
): Omit<MemoryPattern, "id" | "createdAt">[] {
  const patterns: Omit<MemoryPattern, "id" | "createdAt">[] = [];

  // Best pilot recommendation
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

  // Top use-case patterns
  for (const uc of report.recommended_use_cases.slice(0, 3)) {
    patterns.push({
      workspaceId,
      scope: "shared",
      category: "use_case",
      patternText: `Recommended AI use case: ${uc.title} — ${uc.business_value} (difficulty: ${uc.difficulty}, priority: ${uc.priority_score}/10)`,
      sourceType: "report",
      industry: "pharma/biotech",
    });
  }

  // Risk patterns from use cases
  for (const uc of report.recommended_use_cases) {
    for (const risk of uc.risks.slice(0, 2)) {
      patterns.push({
        workspaceId,
        scope: "workspace",
        category: "risk",
        patternText: `Risk for "${uc.title}": ${risk}`,
        sourceType: "report",
        industry: "pharma/biotech",
      });
    }
  }

  // Key pain points as shared patterns
  for (const pp of report.current_pain_points.slice(0, 3)) {
    patterns.push({
      workspaceId,
      scope: "shared",
      category: "pain_point",
      patternText: pp,
      sourceType: "report",
      industry: "pharma/biotech",
    });
  }

  return patterns;
}
