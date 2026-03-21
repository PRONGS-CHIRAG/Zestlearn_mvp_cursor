export interface ModelConfig {
  id: string;
  label: string;
  provider: "gemini" | "featherless";
  modelName: string;
  description: string;
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    provider: "gemini",
    modelName: "gemini-2.5-flash",
    description: "Google's fast, high-quality model",
  },
  {
    id: "qwen3-30b",
    label: "Qwen 3 30B (MoE)",
    provider: "featherless",
    modelName: "Qwen/Qwen3-30B-A3B",
    description: "Fast reasoning with mixture-of-experts",
  },
  {
    id: "llama-3.3-70b",
    label: "Llama 3.3 70B",
    provider: "featherless",
    modelName: "meta-llama/Llama-3.3-70B-Instruct",
    description: "Strong general-purpose from Meta",
  },
  {
    id: "mistral-small-24b",
    label: "Mistral Small 24B",
    provider: "featherless",
    modelName: "mistralai/Mistral-Small-24B-Instruct-2501",
    description: "Efficient instruction-following",
  },
  {
    id: "deepseek-r1-8b",
    label: "DeepSeek R1 8B",
    provider: "featherless",
    modelName: "deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
    description: "Compact reasoning model",
  },
  {
    id: "gemma-3-27b",
    label: "Gemma 3 27B",
    provider: "featherless",
    modelName: "google/gemma-3-27b-it",
    description: "Google's open-weight model",
  },
];

export function getModelById(id: string): ModelConfig | undefined {
  return AVAILABLE_MODELS.find((m) => m.id === id);
}
