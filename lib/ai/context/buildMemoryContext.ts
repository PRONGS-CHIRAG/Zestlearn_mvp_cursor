import type { OpportunityReport } from "@/types/report";

export function buildMemoryExtractionContext(report: OpportunityReport): string {
  return JSON.stringify(
    {
      problem_summary: report.problem_summary,
      best_first_pilot: report.best_first_pilot,
      recommended_use_cases: report.recommended_use_cases.map((uc) => ({
        title: uc.title,
        difficulty: uc.difficulty,
        risks: uc.risks,
      })),
    },
    null,
    2
  );
}
