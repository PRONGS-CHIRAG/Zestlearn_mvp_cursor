import type { MemoryPattern } from "@/types/memory";
import { redactPatternText, safeScope } from "./redactPatternText";

/**
 * Normalize and privacy-filter a raw pattern before persistence.
 * - Trims and lowercases category
 * - Runs PII redaction appropriate for the scope
 * - Downgrades from shared -> workspace if the text is too specific
 * - Clamps confidence score to 0-100
 */
export function normalizePattern(
  raw: Partial<MemoryPattern> & { patternText: string; category: string }
): Omit<MemoryPattern, "id" | "createdAt"> {
  const requestedScope = raw.scope ?? "workspace";
  const resolvedScope = safeScope(requestedScope, raw.patternText);
  const cleaned = redactPatternText(raw.patternText.trim(), resolvedScope);

  return {
    workspaceId: resolvedScope === "shared" ? undefined : raw.workspaceId,
    scope: resolvedScope,
    category: raw.category.toLowerCase().replace(/\s+/g, "_"),
    functionArea: raw.functionArea ?? undefined,
    industry: raw.industry ?? "pharma/biotech",
    patternText: cleaned,
    confidenceScore: raw.confidenceScore
      ? Math.max(0, Math.min(100, raw.confidenceScore))
      : undefined,
    sourceType: raw.sourceType ?? "report",
  };
}
