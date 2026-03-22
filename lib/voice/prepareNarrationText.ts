const MAX_NARRATION_LENGTH = 2200;

/**
 * Convert markdown-heavy assistant output into a more natural spoken script.
 * This keeps the rendered markdown untouched while giving ElevenLabs cleaner text.
 */
export function prepareNarrationText(content: string): string {
  const normalized = content
    .replace(/\r\n/g, "\n")
    .replace(/```[\s\S]*?```/g, " Code example omitted. ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-*]\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const chunks = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("• ")) {
        return `${line.slice(2)}.`;
      }
      return line;
    });

  const spoken = chunks.join(" ");
  const withPauses = spoken
    .replace(/\s{2,}/g, " ")
    .replace(/:\s+/g, ". ")
    .replace(/;\s+/g, ". ")
    .trim();

  if (withPauses.length <= MAX_NARRATION_LENGTH) {
    return withPauses;
  }

  return `${withPauses.slice(0, MAX_NARRATION_LENGTH).trimEnd()}...`;
}
