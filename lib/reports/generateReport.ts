import type { AIProvider } from "@/lib/ai";
import type { OpportunityReport } from "@/types/report";
import {
  buildReportSystemPrompt,
  buildReportUserPrompt,
  REPORT_JSON_SCHEMA,
} from "@/lib/ai/prompts/report";
import { parseReportJson } from "@/lib/ai/parsers/reportParser";

export async function generateReport(
  context: string,
  provider: AIProvider
): Promise<OpportunityReport> {
  const structured = await provider.generateStructured<Record<string, unknown>>({
    systemPrompt: buildReportSystemPrompt(),
    userPrompt: buildReportUserPrompt(context),
    schemaHint: REPORT_JSON_SCHEMA,
    temperature: 0.4,
  });

  return parseReportJson(JSON.stringify(structured));
}
