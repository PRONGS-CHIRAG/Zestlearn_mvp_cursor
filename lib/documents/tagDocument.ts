import type { AIProvider } from "@/lib/ai";
import { buildTaggingPrompt } from "@/lib/ai/prompts/summarize";
import { parseTagsResponse } from "@/lib/ai/parsers/summaryParser";

const KNOWN_TAGS = [
  "process",
  "compliance",
  "workflow",
  "data",
  "bottleneck",
  "systems",
  "documentation",
  "operations",
  "research",
];

export async function tagDocument(
  summary: string,
  provider: AIProvider
): Promise<string[]> {
  try {
    const raw = await provider.generateText({
      systemPrompt: "Return only a JSON array of tag strings from the provided list.",
      userPrompt: buildTaggingPrompt(summary),
      temperature: 0.1,
    });
    const tags = parseTagsResponse(raw);
    return tags.filter((t) => KNOWN_TAGS.includes(t));
  } catch {
    return [];
  }
}
