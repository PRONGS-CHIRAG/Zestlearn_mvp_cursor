import type { OpportunityReport } from "@/types/report";

export function renderReportMarkdown(report: OpportunityReport): string {
  const lines: string[] = [];

  lines.push(`# AI Opportunity Report`);
  lines.push(``);
  lines.push(`## Problem Summary`);
  lines.push(report.problem_summary);
  lines.push(``);

  if (report.current_pain_points.length > 0) {
    lines.push(`## Current Pain Points`);
    for (const p of report.current_pain_points) {
      lines.push(`- ${p}`);
    }
    lines.push(``);
  }

  if (report.recommended_use_cases.length > 0) {
    lines.push(`## Recommended AI Use Cases`);
    for (const uc of report.recommended_use_cases) {
      lines.push(`### ${uc.title} (Priority: ${uc.priority_score}/10 | Difficulty: ${uc.difficulty})`);
      lines.push(uc.description);
      lines.push(`**Business value:** ${uc.business_value}`);
      if (uc.data_requirements.length > 0) {
        lines.push(`**Data requirements:** ${uc.data_requirements.join(", ")}`);
      }
      if (uc.risks.length > 0) {
        lines.push(`**Risks:** ${uc.risks.join(", ")}`);
      }
      lines.push(``);
    }
  }

  lines.push(`## Best First Pilot`);
  lines.push(`**${report.best_first_pilot.title}**`);
  lines.push(report.best_first_pilot.why_this_first);
  if (report.best_first_pilot.success_metrics.length > 0) {
    lines.push(`Success metrics:`);
    for (const m of report.best_first_pilot.success_metrics) {
      lines.push(`- ${m}`);
    }
  }
  lines.push(``);

  lines.push(`## 30 / 60 / 90 Day Roadmap`);
  lines.push(`### 30 Days`);
  for (const item of report.roadmap_30_60_90.days_30) lines.push(`- ${item}`);
  lines.push(`### 60 Days`);
  for (const item of report.roadmap_30_60_90.days_60) lines.push(`- ${item}`);
  lines.push(`### 90 Days`);
  for (const item of report.roadmap_30_60_90.days_90) lines.push(`- ${item}`);
  lines.push(``);

  if (report.open_questions.length > 0) {
    lines.push(`## Open Questions`);
    for (const q of report.open_questions) {
      lines.push(`- ${q}`);
    }
  }

  return lines.join("\n");
}
