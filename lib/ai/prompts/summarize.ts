export function buildSummarizeSystemPrompt(): string {
  return `You are a document analysis assistant. Your job is to extract structured context from internal business documents for use in AI consulting recommendations.`;
}

export function buildSummarizeUserPrompt(text: string): string {
  return `
Summarize the following internal document for use in AI opportunity analysis. 

Focus on identifying:
- The main business process or workflow described
- Key pain points or inefficiencies mentioned
- Relevant systems or tools currently in use
- Any data or documentation types involved
- Potential areas where AI could add value

Keep the summary concise (3–5 paragraphs maximum).

Document:
${text}
`.trim();
}

export function buildTaggingPrompt(summary: string): string {
  return `
Given this document summary, classify it with up to 5 relevant tags from this list:
process, compliance, workflow, data, bottleneck, systems, documentation, operations, research

Return only a JSON array of tag strings. Example: ["process", "workflow", "bottleneck"]

Summary:
${summary}
`.trim();
}
