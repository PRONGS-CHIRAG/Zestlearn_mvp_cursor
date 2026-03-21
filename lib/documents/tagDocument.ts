import type { AIProvider } from "@/lib/ai";
import { buildTaggingPrompt } from "@/lib/ai/prompts/summarize";
import { parseTagsResponse } from "@/lib/ai/parsers/summaryParser";

// ---------------------------------------------------------------------------
// Tag taxonomy
// ---------------------------------------------------------------------------

export const DOCUMENT_TAGS = [
  "process",
  "compliance",
  "workflow",
  "data",
  "bottleneck",
  "systems",
  "documentation",
  "operations",
  "research",
] as const;

export type DocumentTag = (typeof DOCUMENT_TAGS)[number];

// ---------------------------------------------------------------------------
// Rule-based keyword map
// Each tag maps to keyword groups. A match on ANY word in a group scores 1
// point for that tag. Multiple groups matched = higher confidence.
// ---------------------------------------------------------------------------

const TAG_RULES: Record<DocumentTag, readonly string[][]> = {
  process: [
    ["process", "procedure", "protocol", "sop", "step", "stage", "pipeline"],
    ["review", "approval", "sign-off", "submission", "handover", "handoff"],
    ["intake", "initiation", "execution", "closure"],
  ],
  compliance: [
    ["compliance", "regulatory", "regulation", "gdp", "gmp", "gcp", "ich"],
    ["audit", "inspection", "deviation", "capa", "corrective", "preventive"],
    ["fda", "ema", "iso", "validation", "qualified", "qualified person"],
    ["risk", "adverse", "pharmacovigilance", "safety"],
  ],
  workflow: [
    ["workflow", "flow", "routing", "assignment", "queue", "handoff"],
    ["approval chain", "escalation", "notification", "trigger", "automation"],
    ["manual", "semi-manual", "step-by-step", "task", "checklist"],
  ],
  data: [
    ["data", "dataset", "database", "record", "entry", "input"],
    ["spreadsheet", "excel", "csv", "report", "log", "extract"],
    ["metadata", "structured", "unstructured", "quality", "accuracy"],
    ["erp", "lims", "edms", "dms", "eqms"],
  ],
  bottleneck: [
    ["bottleneck", "delay", "backlog", "slowdown", "latency", "wait"],
    ["inefficiency", "inefficient", "manual effort", "rework", "error-prone"],
    ["overload", "capacity", "constraint", "throughput", "cycle time"],
  ],
  systems: [
    ["system", "software", "platform", "tool", "application", "solution"],
    ["erp", "lims", "sap", "oracle", "salesforce", "sharepoint", "confluence"],
    ["integration", "api", "interface", "connector", "legacy", "infrastructure"],
    ["it", "digital", "enterprise", "cloud", "on-premise"],
  ],
  documentation: [
    ["document", "documentation", "template", "form", "record", "filing"],
    ["version", "revision", "draft", "final", "controlled", "archive"],
    ["sop", "policy", "guideline", "instruction", "specification", "protocol"],
    ["signature", "approval", "change control", "change request"],
  ],
  operations: [
    ["operation", "operational", "ops", "production", "manufacturing"],
    ["supply chain", "procurement", "logistics", "inventory", "warehouse"],
    ["quality", "qa", "qc", "quality control", "release", "batch"],
    ["scheduling", "resource", "capacity", "planning", "forecasting"],
  ],
  research: [
    ["research", "r&d", "study", "trial", "experiment", "clinical"],
    ["hypothesis", "findings", "analysis", "results", "data collection"],
    ["preclinical", "phase i", "phase ii", "phase iii", "investigator"],
    ["biomarker", "endpoint", "protocol", "cohort", "patient"],
  ],
};

// ---------------------------------------------------------------------------
// Rule-based tagger
// ---------------------------------------------------------------------------

/**
 * Score a document against all tag rules.
 * Returns tags where at least one keyword group matched.
 */
function ruleBasedTag(text: string): DocumentTag[] {
  const lower = text.toLowerCase();

  const scores: Partial<Record<DocumentTag, number>> = {};

  for (const [tag, groups] of Object.entries(TAG_RULES) as Array<[DocumentTag, readonly string[][]]>) {
    for (const group of groups) {
      if (group.some((kw) => lower.includes(kw))) {
        scores[tag] = (scores[tag] ?? 0) + 1;
      }
    }
  }

  // Sort by score descending, return top 5 tags that matched at least once
  return (Object.entries(scores) as [DocumentTag, number][])
    .filter(([, score]) => score > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag);
}

// ---------------------------------------------------------------------------
// Public function
// ---------------------------------------------------------------------------

/**
 * Classify a document summary into tags.
 *
 * Strategy (MVP-friendly):
 *  1. Rule-based tagging runs immediately — always produces a result, zero cost.
 *  2. If an AI provider is supplied, the AI runs as an enhancer to fill gaps
 *     the rules might miss (e.g. nuanced compliance references).
 *  3. Results are merged: rule tags + AI tags, deduplicated, capped at 5.
 *  4. If AI fails, rule-based result is returned as-is — never throws.
 *
 * @param summary   Document summary text (plain text, not JSON).
 * @param provider  Optional AI provider. Omit to use rule-based only.
 */
export async function tagDocument(
  summary: string,
  provider?: AIProvider
): Promise<DocumentTag[]> {
  if (!summary.trim()) return [];

  // Step 1: rule-based (synchronous, always runs)
  const ruleTags = ruleBasedTag(summary);

  // Step 2: AI enhancement (optional, non-fatal)
  if (provider) {
    try {
      const raw = await provider.generateText({
        systemPrompt:
          "You are a document classifier. Return only a JSON array of tag strings from the provided list. No prose.",
        userPrompt: buildTaggingPrompt(summary),
        temperature: 0.1,
      });

      const aiTags = parseTagsResponse(raw).filter((t): t is DocumentTag =>
        (DOCUMENT_TAGS as readonly string[]).includes(t)
      );

      // Merge: keep rule tags, append AI-only tags that rules missed
      const merged = [...ruleTags];
      for (const tag of aiTags) {
        if (!merged.includes(tag)) merged.push(tag);
      }

      return merged.slice(0, 5);
    } catch {
      // AI failed — rule-based result is sufficient for MVP
    }
  }

  return ruleTags;
}
