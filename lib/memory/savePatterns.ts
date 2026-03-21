// TODO: wire to Convex mutation via server action or API route
// This is a placeholder that will call convex/memory.ts saveMemoryPattern

import type { MemoryPattern } from "@/types/memory";
import { normalizePattern } from "./normalizePattern";

export async function savePatterns(
  patterns: Omit<MemoryPattern, "id" | "createdAt">[],
  saveFn: (pattern: Omit<MemoryPattern, "id" | "createdAt">) => Promise<void>
): Promise<void> {
  for (const raw of patterns) {
    const normalized = normalizePattern(raw);
    await saveFn(normalized);
  }
}
