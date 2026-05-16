import type { AIProvider } from "../index";

const BASE_URL = "https://api.featherless.ai/v1";

export class FeatherlessProvider implements AIProvider {
  private apiKey: string;
  private modelName: string;

  constructor(apiKey: string, modelName: string) {
    if (!apiKey) throw new Error("FEATHERLESS_API_KEY is not set");
    this.apiKey = apiKey;
    this.modelName = modelName;
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
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "X-Title": "ZestLearn",
      },
      body: JSON.stringify({
        model: this.modelName,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature,
        max_tokens: 2048,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(
        `Featherless API error ${res.status}: ${body.slice(0, 200)}`
      );
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Featherless returned empty response");
    }
    return content;
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
