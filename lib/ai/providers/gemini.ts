import type { AIProvider } from "../index";

export class GeminiProvider implements AIProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey = process.env.GEMINI_API_KEY ?? "", model = "gemini-1.5-flash") {
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
    this.apiKey = apiKey;
    this.model = model;
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
    // TODO: implement Gemini API call using @google/generative-ai
    // const { GoogleGenerativeAI } = await import("@google/generative-ai");
    // const genAI = new GoogleGenerativeAI(this.apiKey);
    // const model = genAI.getGenerativeModel({ model: this.model });
    // ...
    throw new Error("GeminiProvider.generateText not implemented");
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
    // TODO: implement structured JSON output via Gemini
    // Request strict JSON output and parse the response
    throw new Error("GeminiProvider.generateStructured not implemented");
  }
}
