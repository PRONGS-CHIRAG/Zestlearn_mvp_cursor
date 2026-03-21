export const AI_MATURITY_LABELS: Record<number, string> = {
  1: "No AI usage yet",
  2: "Exploring options",
  3: "Some pilots underway",
  4: "AI in production for 1+ use cases",
  5: "AI-first culture",
};

export const PROCESSING_STATUS_LABELS = {
  uploaded: "Uploaded",
  processing: "Processing…",
  done: "Ready",
  error: "Error",
} as const;

export const PROMPT_STARTERS = [
  "Find AI use cases for my team",
  "What should we pilot first?",
  "Assess feasibility and risks",
  "Draft a stakeholder summary",
] as const;
