import type { MemoryPattern } from "@/types/memory";
import { normalizePattern } from "./normalizePattern";

/**
 * Normalize and save an array of raw patterns through a provided save function.
 * Returns the count of successfully saved patterns.
 */
export async function savePatterns(
  patterns: Omit<MemoryPattern, "id" | "createdAt">[],
  saveFn: (pattern: Omit<MemoryPattern, "id" | "createdAt">) => Promise<unknown>
): Promise<number> {
  let saved = 0;
  for (const raw of patterns) {
    const normalized = normalizePattern(raw);
    if (!normalized.patternText || normalized.patternText.length < 10) continue;
    await saveFn(normalized);
    saved++;
  }
  return saved;
}
