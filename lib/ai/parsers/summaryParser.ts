export interface ParsedSummary {
  summary: string;
  tags: string[];
}

export function parseSummaryResponse(raw: string): ParsedSummary {
  // Summary is expected as plain text
  return { summary: raw.trim(), tags: [] };
}

export function parseTagsResponse(raw: string): string[] {
  try {
    const cleaned = raw.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
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
