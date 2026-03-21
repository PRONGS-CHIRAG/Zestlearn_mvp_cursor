import type { OpportunityReport } from "@/types/report";

const REQUIRED_KEYS: (keyof OpportunityReport)[] = [
  "problem_summary",
  "current_pain_points",
  "recommended_use_cases",
  "best_first_pilot",
  "roadmap_30_60_90",
  "open_questions",
];

export function parseReportJson(raw: string): OpportunityReport {
  let parsed: unknown;

  try {
    // Strip potential markdown code fences if model adds them
    const cleaned = raw.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Report output is not valid JSON");
  }

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Report output is not an object");
  }

  for (const key of REQUIRED_KEYS) {
    if (!(key in (parsed as object))) {
      throw new Error(`Report is missing required field: ${key}`);
    }
  }

  const report = parsed as OpportunityReport;

  // Normalize optional arrays to empty arrays if missing
  report.current_pain_points ??= [];
  report.open_questions ??= [];
  report.recommended_use_cases ??= [];
  report.roadmap_30_60_90.days_30 ??= [];
  report.roadmap_30_60_90.days_60 ??= [];
  report.roadmap_30_60_90.days_90 ??= [];

  return report;
}
