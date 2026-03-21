const MAX_LENGTH = 10_000;
const MIN_LENGTH = 5;

const LEAKAGE_PATTERNS = [
  /you are an ai/i,
  /as an ai language model/i,
  /i am a large language model/i,
  /\[SYSTEM\]/i,
  /\[INST\]/i,
  /<<SYS>>/i,
];

export interface ValidationResult {
  valid: boolean;
  sanitized: string;
  reason?: string;
}

export function validateChatResponse(raw: string): ValidationResult {
  if (!raw || raw.trim().length < MIN_LENGTH) {
    return {
      valid: false,
      sanitized:
        "The model returned an empty or unusable response. Please try again or switch models.",
      reason: "Response too short or empty",
    };
  }

  if (raw.length > MAX_LENGTH) {
    return {
      valid: true,
      sanitized: raw.slice(0, MAX_LENGTH) + "\n\n[Response truncated]",
      reason: "Truncated to length limit",
    };
  }

  for (const pattern of LEAKAGE_PATTERNS) {
    if (pattern.test(raw)) {
      const cleaned = raw.replace(pattern, "").trim();
      if (cleaned.length < MIN_LENGTH) {
        return {
          valid: false,
          sanitized:
            "The model produced an invalid response. Please try again.",
          reason: "System prompt leakage with no useful content",
        };
      }
      return { valid: true, sanitized: cleaned, reason: "Leakage removed" };
    }
  }

  return { valid: true, sanitized: raw.trim() };
}
