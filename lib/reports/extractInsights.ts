import type { OpportunityReport } from "@/types/report";
import type { MemoryPattern } from "@/types/memory";

export function extractInsightsFromReport(
  report: OpportunityReport,
  workspaceId?: string
): Omit<MemoryPattern, "id" | "createdAt">[] {
  const patterns: Omit<MemoryPattern, "id" | "createdAt">[] = [];

  if (report.best_first_pilot?.title) {
    patterns.push({
      workspaceId,
      scope: "workspace",
      category: "first_pilot",
      patternText: `Best first pilot: ${report.best_first_pilot.title}. ${report.best_first_pilot.why_this_first}`,
      sourceType: "report",
      industry: "pharma/biotech",
      confidenceScore: 85,
    });
  }

  for (const uc of (report.recommended_use_cases ?? []).slice(0, 3)) {
    patterns.push({
      workspaceId,
      scope: "shared",
      category: "use_case",
      patternText: `AI use case for pharma/biotech: ${uc.title} — ${uc.business_value} (difficulty: ${uc.difficulty}, priority: ${uc.priority_score}/10)`,
      sourceType: "report",
      industry: "pharma/biotech",
      confidenceScore: 80,
    });
  }

  for (const uc of (report.recommended_use_cases ?? [])) {
    for (const risk of (uc.risks ?? []).slice(0, 2)) {
      patterns.push({
        workspaceId,
        scope: "workspace",
        category: "risk",
        patternText: `Risk for "${uc.title}": ${risk}`,
        sourceType: "report",
        industry: "pharma/biotech",
        confidenceScore: 75,
      });
    }
  }

  for (const pp of (report.current_pain_points ?? []).slice(0, 3)) {
    patterns.push({
      workspaceId,
      scope: "shared",
      category: "pain_point",
      patternText: `Common pain point in pharma/biotech operations: ${pp}`,
      sourceType: "report",
      industry: "pharma/biotech",
      confidenceScore: 70,
    });
  }

  if (report.risks_and_constraints?.length) {
    for (const rc of report.risks_and_constraints.slice(0, 2)) {
      patterns.push({
        workspaceId,
        scope: "workspace",
        category: "compliance_constraint",
        patternText: rc,
        sourceType: "report",
        industry: "pharma/biotech",
        confidenceScore: 75,
      });
    }
  }

  return patterns;
}
