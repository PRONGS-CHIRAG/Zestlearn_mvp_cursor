import type { AIProvider } from "../index";

export class FeatherlessProvider implements AIProvider {
  private apiKey: string;

  constructor(apiKey = process.env.FEATHERLESS_API_KEY ?? "") {
    this.apiKey = apiKey;
  }

  async generateText({
    systemPrompt,
    userPrompt,
    temperature = 0.7,
  }: {
    systemPrompt: string;
    userPrompt: string;
    temperature?: number;
  }): Promise<string> {
    // TODO: implement Featherless.ai API call (OpenAI-compatible endpoint)
    throw new Error("FeatherlessProvider.generateText not implemented");
  }

  async generateStructured<T>({
    systemPrompt,
    userPrompt,
    schemaHint,
    temperature = 0.3,
  }: {
    systemPrompt: string;
    userPrompt: string;
    schemaHint: string;
    temperature?: number;
  }): Promise<T> {
    throw new Error("FeatherlessProvider.generateStructured not implemented");
  }
}
