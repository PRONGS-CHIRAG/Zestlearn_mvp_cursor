import type { MemoryPattern } from "@/types/memory";

export function normalizePattern(
  raw: Partial<MemoryPattern> & { patternText: string; category: string }
): Omit<MemoryPattern, "id" | "createdAt"> {
  return {
    workspaceId: raw.workspaceId,
    scope: raw.scope ?? "workspace",
    category: raw.category.toLowerCase().replace(/\s+/g, "_"),
    functionArea: raw.functionArea ?? undefined,
    industry: raw.industry ?? "pharma/biotech",
    patternText: raw.patternText.trim(),
    confidenceScore: raw.confidenceScore,
    sourceType: raw.sourceType ?? "report",
  };
}
