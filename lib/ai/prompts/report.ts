export function buildReportSystemPrompt(): string {
  return `You are an AI transformation consultant generating a structured opportunity report for a pharma or biotech SME. Return ONLY valid JSON matching the schema exactly. No markdown fences, no extra text.`;
}

export const REPORT_JSON_SCHEMA = `{
  "problem_summary": "string",
  "current_pain_points": ["string"],
  "recommended_use_cases": [
    {
      "title": "string",
      "description": "string",
      "business_value": "string",
      "difficulty": "low | medium | high",
      "data_requirements": ["string"],
      "risks": ["string"],
      "priority_score": 0
    }
  ],
  "best_first_pilot": {
    "title": "string",
    "why_this_first": "string",
    "success_metrics": ["string"]
  },
  "roadmap_30_60_90": {
    "days_30": ["string"],
    "days_60": ["string"],
    "days_90": ["string"]
  },
  "open_questions": ["string"]
}`;

export function buildReportUserPrompt(context: string): string {
  return `
Based on the following company context, generate a structured AI opportunity assessment report.

${context}

Return a single JSON object exactly matching this schema:
${REPORT_JSON_SCHEMA}

Requirements:
- Recommend 2–4 realistic AI use cases specific to this pharma/biotech context.
- Prioritize low-risk, high-value pilots for a team at this AI maturity level.
- Be specific about data requirements and risks.
- The best_first_pilot should be realistic and actionable within 90 days.
- Return ONLY valid JSON. No markdown, no extra text.
`.trim();
}
