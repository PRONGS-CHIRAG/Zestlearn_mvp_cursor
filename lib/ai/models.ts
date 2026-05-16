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
    description: "Google's fast model",
  },
  {
    id: "qwen25-7b",
    label: "Qwen 2.5 7B",
    provider: "featherless",
    modelName: "Qwen/Qwen2.5-7B-Instruct",
    description: "Fast instruct model",
  },
  {
    id: "qwen3-8b",
    label: "Qwen 3 8B",
    provider: "featherless",
    modelName: "Qwen/Qwen3-8B",
    description: "Latest Qwen generation",
  },
  {
    id: "qwen3-4b-inst",
    label: "Qwen 3 4B Inst",
    provider: "featherless",
    modelName: "Qwen/Qwen3-4B-Instruct-2507",
    description: "Lightweight & quick",
  },
  {
    id: "mistral-7b",
    label: "Mistral 7B v0.2",
    provider: "featherless",
    modelName: "mistralai/Mistral-7B-Instruct-v0.2",
    description: "Reliable instruct model",
  },
  {
    id: "qwen3-14b",
    label: "Qwen 3 14B",
    provider: "featherless",
    modelName: "Qwen/Qwen3-14B",
    description: "Balanced speed & quality",
  },
];

export function getModelById(id: string): ModelConfig | undefined {
  return AVAILABLE_MODELS.find((m) => m.id === id);
}
