import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIProvider } from "../index";

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI;
  private modelName: string;

  constructor(
    apiKey = process.env.GEMINI_API_KEY ?? "",
    model = "gemini-1.5-flash"
  ) {
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = model;
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
    const model = this.genAI.getGenerativeModel({
      model: this.modelName,
      systemInstruction: systemPrompt,
      generationConfig: { temperature },
    });

    const result = await model.generateContent(userPrompt);
    return result.response.text();
  }

  async generateStructured<T>({
    systemPrompt,
    userPrompt,
    temperature = 0.3,
  }: {
    systemPrompt: string;
    userPrompt: string;
    schemaHint: string;
    temperature?: number;
  }): Promise<T> {
    const fullSystem =
      systemPrompt +
      "\n\nYou MUST respond with valid JSON only. No markdown, no prose outside JSON.";

    const raw = await this.generateText({
      systemPrompt: fullSystem,
      userPrompt,
      temperature,
    });

    const cleaned = raw
      .replace(/^```(?:json)?\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();
    return JSON.parse(cleaned) as T;
  }
}
