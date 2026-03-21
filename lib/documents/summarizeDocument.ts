import type { AIProvider } from "@/lib/ai";
import { buildSummarizeSystemPrompt, buildSummarizeUserPrompt } from "@/lib/ai/prompts/summarize";
import { parseSummaryResponse } from "@/lib/ai/parsers/summaryParser";
import { tagDocument } from "./tagDocument";

export interface DocumentSummaryResult {
  summary: string;
  tags: string[];
}

export async function summarizeDocument(
  text: string,
  provider: AIProvider
): Promise<DocumentSummaryResult> {
  if (!text.trim()) {
    return { summary: "No content to summarize.", tags: [] };
  }

  const truncatedText = text.slice(0, 8000);

  const raw = await provider.generateText({
    systemPrompt: buildSummarizeSystemPrompt(),
    userPrompt: buildSummarizeUserPrompt(truncatedText),
    temperature: 0.3,
  });

  const { summary } = parseSummaryResponse(raw);
  const tags = await tagDocument(summary, provider);

  return { summary, tags };
}
