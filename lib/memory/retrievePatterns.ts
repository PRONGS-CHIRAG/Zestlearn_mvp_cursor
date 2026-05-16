import type { MemoryPattern } from "@/types/memory";

/**
 * Score and rank patterns for inclusion in AI prompts.
 * Workspace patterns rank higher; recent and high-confidence patterns rank higher.
 */
export function rankPatterns(
  patterns: MemoryPattern[],
  workspaceId?: string,
  limit = 10
): MemoryPattern[] {
  const scored = patterns.map((p) => {
    let score = 0;

    if (p.scope === "workspace" && p.workspaceId === workspaceId) score += 30;
    else if (p.scope === "workspace") score += 10;
    else score += 5;

    if (p.confidenceScore) score += p.confidenceScore / 10;

    if (p.createdAt) {
      const ageHours = (Date.now() - p.createdAt) / (1000 * 60 * 60);
      if (ageHours < 24) score += 15;
      else if (ageHours < 168) score += 8;
    }

    if (p.sourceType === "report") score += 10;
    else if (p.sourceType === "chat") score += 5;

    return { pattern: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const unique: MemoryPattern[] = [];
  for (const { pattern } of scored) {
    const key = pattern.patternText.toLowerCase().slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(pattern);
    if (unique.length >= limit) break;
  }

  return unique;
}

export function filterRelevantPatterns(
  patterns: MemoryPattern[],
  workspaceId: string,
  limit = 10
): MemoryPattern[] {
  return rankPatterns(
    patterns.filter((p) => p.scope === "shared" || p.workspaceId === workspaceId),
    workspaceId,
    limit
  );
}

export function formatPatternsForPrompt(patterns: MemoryPattern[]): string {
  if (!patterns.length) return "";
  return patterns
    .map((p) => `- [${p.category}] ${p.patternText}`)
    .join("\n");
}
