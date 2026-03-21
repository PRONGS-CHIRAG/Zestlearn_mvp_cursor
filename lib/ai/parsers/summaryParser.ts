// ---------------------------------------------------------------------------
// Parsers for AI summary and tag responses
// ---------------------------------------------------------------------------

export interface ParsedSummary {
  summary: string;
  tags: string[];
  keyFacts: string[];
}

const KNOWN_TAGS = new Set([
  "process",
  "compliance",
  "workflow",
  "data",
  "bottleneck",
  "systems",
  "documentation",
  "operations",
  "research",
]);

/**
 * Parse the structured JSON response from the summarize prompt.
 * Falls back gracefully if the model returns plain text instead of JSON.
 */
export function parseSummaryResponse(raw: string): ParsedSummary {
  const cleaned = raw
    .replace(/^```(?:json)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);

    const summary =
      typeof parsed.summary === "string" && parsed.summary.trim()
        ? parsed.summary.trim()
        : cleaned; // fall back to treating the whole response as summary

    const keyFacts = Array.isArray(parsed.keyFacts)
      ? parsed.keyFacts.filter((f: unknown): f is string => typeof f === "string")
      : [];

    const tags = Array.isArray(parsed.tags)
      ? parsed.tags
          .filter((t: unknown): t is string => typeof t === "string")
          .filter((t: string) => KNOWN_TAGS.has(t))
      : [];

    return { summary, keyFacts, tags };
  } catch {
    // Model returned plain text — treat it as the summary with no structure
    return { summary: cleaned || raw.trim(), keyFacts: [], tags: [] };
  }
}

/**
 * Parse a raw tag-only response (used by the legacy tagDocument helper).
 */
export function parseTagsResponse(raw: string): string[] {
  try {
    const cleaned = raw
      .replace(/^```(?:json)?\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      return parsed.filter((t): t is string => typeof t === "string");
    }
  } catch {
    // fall through to regex fallback
  }
  // Fallback: extract quoted strings
  const matches = raw.match(/"([^"]+)"/g);
  return matches ? matches.map((m) => m.replace(/"/g, "")) : [];
}
