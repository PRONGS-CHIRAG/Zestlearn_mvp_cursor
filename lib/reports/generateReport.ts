import type { AIProvider } from "@/lib/ai";
import type { OpportunityReport } from "@/types/report";
import { buildReportSystemPrompt, buildReportUserPrompt } from "@/lib/ai/prompts/report";
import { parseReportJson } from "@/lib/ai/parsers/reportParser";

export async function generateReport(
  context: string,
  provider: AIProvider
): Promise<OpportunityReport> {
  const raw = await provider.generateText({
    systemPrompt: buildReportSystemPrompt(),
    userPrompt: buildReportUserPrompt(context),
    temperature: 0.4,
  });

  return parseReportJson(raw);
}
