export function buildReportSystemPrompt(): string {
  return `You are an AI transformation consultant generating a structured opportunity report for a pharma or biotech SME.

Rules:
- Return ONLY valid JSON matching the schema exactly. No markdown fences, no extra text.
- Be specific and grounded in the provided context.
- Use conservative, assumption-backed estimates for any numerical claims.
- State ranges rather than precise numbers when exact data is unavailable.
- Clearly separate assumptions from findings.
- Prioritize low-risk, high-value pilots suitable for the team's AI maturity level.`;
}

export const REPORT_JSON_SCHEMA = `{
  "executive_summary": "string (2-4 sentence high-level overview)",
  "problem_summary": "string (detailed problem description)",
  "current_pain_points": ["string"],
  "recommended_use_cases": [
    {
      "title": "string",
      "description": "string",
      "business_value": "string",
      "difficulty": "low | medium | high",
      "data_requirements": ["string"],
      "risks": ["string"],
      "priority_score": "number 1-10"
    }
  ],
  "best_first_pilot": {
    "title": "string",
    "why_this_first": "string",
    "success_metrics": ["string"],
    "estimated_timeline": "string"
  },
  "estimated_business_impact": {
    "efficiency_gains": "string (conservative range, state assumptions)",
    "cost_reduction": "string (conservative range, state assumptions)",
    "timeline_to_value": "string"
  },
  "roadmap_30_60_90": {
    "days_30": ["string"],
    "days_60": ["string"],
    "days_90": ["string"]
  },
  "risks_and_constraints": ["string"],
  "open_questions": ["string"],
  "assumptions": ["string"]
}`;

export function buildReportUserPrompt(context: string): string {
  return `
Based on the following company context, generate a structured AI opportunity assessment report.

${context}

Return a single JSON object exactly matching this schema:
${REPORT_JSON_SCHEMA}

Requirements:
- Recommend 2-4 realistic AI use cases specific to this pharma/biotech context.
- Prioritize low-risk, high-value pilots for a team at this AI maturity level.
- Be specific about data requirements and risks.
- The best_first_pilot should be realistic and actionable within 90 days.
- Estimated business impact must use conservative ranges and clearly state what assumptions they depend on.
- Include at least 2 assumptions and 2 open questions.
- Return ONLY valid JSON. No markdown, no extra text.
`.trim();
}
