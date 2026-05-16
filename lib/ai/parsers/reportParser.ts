import type { OpportunityReport, RecommendedUseCase } from "@/types/report";

const REQUIRED_KEYS: (keyof OpportunityReport)[] = [
  "executive_summary",
  "problem_summary",
  "current_pain_points",
  "recommended_use_cases",
  "best_first_pilot",
  "estimated_business_impact",
  "roadmap_30_60_90",
  "risks_and_constraints",
  "open_questions",
  "assumptions",
];

const VALID_DIFFICULTY = new Set(["low", "medium", "high"]);

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function ensureStringArray(val: unknown, max = 20): string[] {
  if (!Array.isArray(val)) return [];
  return val
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .slice(0, max);
}

function normalizeUseCase(raw: Record<string, unknown>): RecommendedUseCase {
  return {
    title: typeof raw.title === "string" ? raw.title : "Untitled",
    description: typeof raw.description === "string" ? raw.description : "",
    business_value: typeof raw.business_value === "string" ? raw.business_value : "",
    difficulty: VALID_DIFFICULTY.has(raw.difficulty as string)
      ? (raw.difficulty as "low" | "medium" | "high")
      : "medium",
    data_requirements: ensureStringArray(raw.data_requirements, 10),
    risks: ensureStringArray(raw.risks, 10),
    priority_score:
      typeof raw.priority_score === "number"
        ? clamp(Math.round(raw.priority_score), 1, 10)
        : 5,
  };
}

export function parseReportJson(raw: string): OpportunityReport {
  let parsed: Record<string, unknown>;

  try {
    const cleaned = raw
      .replace(/^```(?:json)?\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();
    parsed = JSON.parse(cleaned) as Record<string, unknown>;
  } catch {
    throw new Error("Report output is not valid JSON");
  }

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Report output is not an object");
  }

  for (const key of REQUIRED_KEYS) {
    if (!(key in parsed)) {
      throw new Error(`Report is missing required field: ${key}`);
    }
  }

  if (
    typeof parsed.executive_summary !== "string" ||
    parsed.executive_summary.trim().length < 10
  ) {
    throw new Error("executive_summary is empty or too short");
  }

  if (
    typeof parsed.problem_summary !== "string" ||
    parsed.problem_summary.trim().length < 10
  ) {
    throw new Error("problem_summary is empty or too short");
  }

  const useCases = Array.isArray(parsed.recommended_use_cases)
    ? (parsed.recommended_use_cases as Record<string, unknown>[])
        .slice(0, 6)
        .map(normalizeUseCase)
    : [];

  if (useCases.length === 0) {
    throw new Error("Report contains no recommended use cases");
  }

  const pilot = parsed.best_first_pilot as Record<string, unknown> | undefined;
  const impact = parsed.estimated_business_impact as Record<string, unknown> | undefined;
  const roadmap = parsed.roadmap_30_60_90 as Record<string, unknown> | undefined;

  const report: OpportunityReport = {
    executive_summary: (parsed.executive_summary as string).trim(),
    problem_summary: (parsed.problem_summary as string).trim(),
    current_pain_points: ensureStringArray(parsed.current_pain_points, 10),
    recommended_use_cases: useCases,
    best_first_pilot: {
      title: typeof pilot?.title === "string" ? pilot.title : useCases[0].title,
      why_this_first: typeof pilot?.why_this_first === "string" ? pilot.why_this_first : "",
      success_metrics: ensureStringArray(pilot?.success_metrics, 10),
      estimated_timeline: typeof pilot?.estimated_timeline === "string" ? pilot.estimated_timeline : "8-12 weeks",
    },
    estimated_business_impact: {
      efficiency_gains: typeof impact?.efficiency_gains === "string" ? impact.efficiency_gains : "To be determined based on pilot results",
      cost_reduction: typeof impact?.cost_reduction === "string" ? impact.cost_reduction : "To be determined based on pilot results",
      timeline_to_value: typeof impact?.timeline_to_value === "string" ? impact.timeline_to_value : "3-6 months",
    },
    roadmap_30_60_90: {
      days_30: ensureStringArray(roadmap?.days_30, 10),
      days_60: ensureStringArray(roadmap?.days_60, 10),
      days_90: ensureStringArray(roadmap?.days_90, 10),
    },
    risks_and_constraints: ensureStringArray(parsed.risks_and_constraints, 10),
    open_questions: ensureStringArray(parsed.open_questions, 10),
    assumptions: ensureStringArray(parsed.assumptions, 10),
  };

  return report;
}
