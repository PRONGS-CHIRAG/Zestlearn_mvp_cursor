// ---------------------------------------------------------------------------
// Prompts for document summarization
// ---------------------------------------------------------------------------

export function buildSummarizeSystemPrompt(): string {
  return `You are a document analysis assistant specializing in pharma and biotech operations.
Your job is to extract structured, actionable context from internal business documents for use in AI consulting recommendations.

You MUST return valid JSON — no markdown, no prose outside the JSON structure.`;
}

export function buildSummarizeUserPrompt(text: string): string {
  return `Analyze the following internal document and return a JSON object with this exact structure:

{
  "summary": "<3–5 sentence paragraph describing the main process, key pain points, and relevance to AI improvement>",
  "keyFacts": [
    "<concise, specific fact 1>",
    "<concise, specific fact 2>",
    "..."
  ],
  "tags": ["<tag1>", "<tag2>"]
}

Rules:
- summary: 3–5 sentences max. Focus on: main process, inefficiencies, relevant tools/systems, and AI potential.
- keyFacts: 3–6 bullet-style facts. Prefer specifics (names of systems, departments, volumes, timelines).
- tags: 1–5 tags chosen ONLY from this list: process, compliance, workflow, data, bottleneck, systems, documentation, operations, research

Document:
${text}`.trim();
}

/** Legacy helper kept for backward compat with tagDocument.ts */
export function buildTaggingPrompt(summary: string): string {
  return `Given this document summary, classify it with up to 5 relevant tags from this list:
process, compliance, workflow, data, bottleneck, systems, documentation, operations, research

Return only a JSON array of tag strings. Example: ["process", "workflow", "bottleneck"]

Summary:
${summary}`.trim();
}
