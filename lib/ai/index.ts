export interface AIProvider {
  generateText(input: {
    systemPrompt: string;
    userPrompt: string;
    temperature?: number;
  }): Promise<string>;

  generateStructured<T>(input: {
    systemPrompt: string;
    userPrompt: string;
    schemaHint: string;
    temperature?: number;
  }): Promise<T>;
}

export { GeminiProvider } from "./providers/gemini";
export { OpenAIProvider } from "./providers/openai";
export { FeatherlessProvider } from "./providers/featherless";
