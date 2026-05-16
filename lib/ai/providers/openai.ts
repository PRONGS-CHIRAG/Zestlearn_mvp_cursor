import OpenAI from "openai";
import type { AIProvider } from "../index";

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private modelName: string;

  constructor(
    apiKey = process.env.OPENAI_API_KEY ?? "",
    model = "gpt-4o-mini"
  ) {
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set");
    }

    this.client = new OpenAI({ apiKey });
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
    const completion = await this.client.chat.completions.create({
      model: this.modelName,
      temperature,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("OpenAI returned empty response");
    }

    return content;
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
    const fullSystem = [
      systemPrompt,
      "",
      "Return valid JSON only.",
      "Your response must match this schema exactly:",
      schemaHint,
    ].join("\n");

    const completion = await this.client.chat.completions.create({
      model: this.modelName,
      temperature,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: fullSystem },
        { role: "user", content: userPrompt },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("OpenAI returned empty structured response");
    }

    return JSON.parse(content) as T;
  }
}
