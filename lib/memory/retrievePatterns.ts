import type { MemoryPattern } from "@/types/memory";

export function filterRelevantPatterns(
  patterns: MemoryPattern[],
  workspaceId: string,
  limit = 10
): MemoryPattern[] {
  return patterns
    .filter((p) => p.scope === "shared" || p.workspaceId === workspaceId)
    .slice(0, limit);
}

export function formatPatternsForPrompt(patterns: MemoryPattern[]): string {
  if (!patterns.length) return "";
  return patterns
    .map((p) => `- [${p.category}] ${p.patternText}`)
    .join("\n");
}
