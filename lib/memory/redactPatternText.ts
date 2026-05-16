const EMAIL_RE = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
const PHONE_RE = /(\+?\d[\d\s\-().]{7,}\d)/g;
const ID_RE = /\b(?:ID|id|Id)[:\s#-]*[A-Z0-9]{4,}\b/g;
const FILE_PATH_RE = /(?:\/[A-Za-z0-9_.-]+){2,}/g;

const GENERIC_REPLACEMENTS: [RegExp, string][] = [
  [EMAIL_RE, "[email]"],
  [PHONE_RE, "[phone]"],
  [ID_RE, "[id]"],
  [FILE_PATH_RE, "[path]"],
];

/**
 * Strip PII and specifics from a pattern string before it enters shared memory.
 * For workspace-scoped patterns a lighter pass is applied;
 * for shared patterns more aggressive generalization runs.
 */
export function redactPatternText(
  text: string,
  scope: "workspace" | "shared"
): string {
  let cleaned = text;

  for (const [re, replacement] of GENERIC_REPLACEMENTS) {
    cleaned = cleaned.replace(re, replacement);
  }

  if (scope === "shared") {
    cleaned = cleaned
      .replace(/\b(?:Dr\.?\s+|Mr\.?\s+|Ms\.?\s+|Mrs\.?\s+)[A-Z][a-z]+(?:\s[A-Z][a-z]+)?/g, "[person]")
      .replace(/\b[A-Z][a-z]+(?:\s(?:Inc|LLC|Ltd|Corp|GmbH|Co|Pharma|Bio|Therapeutics|Sciences))\b\.?/gi, "[company]")
      .replace(/\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/g, "[date]");
  }

  return cleaned.trim();
}

/**
 * Decide whether a pattern derived from user data is safe for shared scope.
 * Returns "workspace" if the text looks too specific to promote.
 */
export function safeScope(
  requested: "workspace" | "shared",
  text: string
): "workspace" | "shared" {
  if (requested === "workspace") return "workspace";

  const specificity = [
    EMAIL_RE.test(text),
    PHONE_RE.test(text),
    ID_RE.test(text),
    text.length > 300,
  ].filter(Boolean).length;

  return specificity >= 1 ? "workspace" : "shared";
}
