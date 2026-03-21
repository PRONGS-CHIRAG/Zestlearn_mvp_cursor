import type { MemoryPattern } from "@/types/memory";

interface ChatMessage {
  role: string;
  content: string;
}

const DECISION_SIGNALS = [
  "should start with",
  "recommend",
  "best approach",
  "first step",
  "priority",
  "suggest",
  "key takeaway",
  "important to note",
  "in your case",
  "based on your",
];

const RISK_SIGNALS = [
  "risk",
  "concern",
  "challenge",
  "barrier",
  "blocker",
  "obstacle",
  "compliance",
  "regulatory",
  "limitation",
];

/**
 * Extract meaningful patterns from recent chat history.
 * Only targets substantive assistant turns that contain decision/risk language.
 */
export function extractPatternsFromChat(
  messages: ChatMessage[],
  workspaceId?: string
): Omit<MemoryPattern, "id" | "createdAt">[] {
  const patterns: Omit<MemoryPattern, "id" | "createdAt">[] = [];

  const assistantTurns = messages.filter(
    (m) => m.role === "assistant" && m.content.length > 100
  );

  for (const msg of assistantTurns.slice(-5)) {
    const lower = msg.content.toLowerCase();

    const isDecision = DECISION_SIGNALS.some((s) => lower.includes(s));
    const isRisk = RISK_SIGNALS.some((s) => lower.includes(s));

    if (!isDecision && !isRisk) continue;

    const sentences = msg.content
      .split(/[.!?]\s+/)
      .filter((s) => s.length > 30 && s.length < 200);

    for (const sentence of sentences.slice(0, 2)) {
      const matchedDecision = DECISION_SIGNALS.some((s) =>
        sentence.toLowerCase().includes(s)
      );
      const matchedRisk = RISK_SIGNALS.some((s) =>
        sentence.toLowerCase().includes(s)
      );

      if (!matchedDecision && !matchedRisk) continue;

      patterns.push({
        workspaceId,
        scope: "workspace",
        category: matchedRisk ? "risk" : "decision",
        patternText: sentence.trim(),
        sourceType: "chat",
        industry: "pharma/biotech",
        confidenceScore: 65,
      });
    }
  }

  return patterns.slice(0, 5);
}
