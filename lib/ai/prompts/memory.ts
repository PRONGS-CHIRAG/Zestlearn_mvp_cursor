export function buildMemoryExtractionSystemPrompt(): string {
  return `You are extracting reusable patterns from an AI opportunity report. Return ONLY a JSON array of pattern objects. No extra text.`;
}

export function buildMemoryExtractionUserPrompt(reportJson: string): string {
  return `
From this AI opportunity report, extract 2–4 short reusable patterns that could help other pharma/biotech teams.

Examples of good patterns:
- "Documentation-heavy pharma operations teams often benefit most from document summarization and triage copilots as a first AI pilot."
- "Teams with low AI maturity should start with human-in-the-loop copilots rather than full automation."
- "R&D knowledge fragmentation is frequently addressed with internal semantic search before more advanced AI systems."

Return a JSON array of objects with this shape:
[{ "category": "string", "patternText": "string", "functionArea": "string or null", "industry": "pharma/biotech" }]

Report:
${reportJson}
`.trim();
}
