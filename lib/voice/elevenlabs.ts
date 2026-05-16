import { prepareNarrationText } from "./prepareNarrationText";

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
export const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const DEFAULT_MODEL_ID = "eleven_multilingual_v2";

export const AVAILABLE_ELEVENLABS_VOICES = [
  { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel" },
  { id: "AZnzlk1XvdvUeBnXmlld", label: "Domi" },
  { id: "EXAVITQu4vr4xnSDxMaL", label: "Bella" },
  { id: "ErXwobaYiN019PkySvjV", label: "Antoni" },
] as const;

export class VoiceConfigError extends Error {}
export class VoiceGenerationError extends Error {}

export interface VoiceGenerationOptions {
  text: string;
  voiceId?: string;
}

export interface VoiceGenerationResult {
  audio: Uint8Array;
  contentType: string;
  textUsed: string;
}

function getApiKey(): string {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    throw new VoiceConfigError("ELEVENLABS_API_KEY is not configured");
  }
  return key;
}

export async function generateSpeech({
  text,
  voiceId = DEFAULT_VOICE_ID,
}: VoiceGenerationOptions): Promise<VoiceGenerationResult> {
  const narration = prepareNarrationText(text);
  if (!narration) {
    throw new VoiceGenerationError("No voice-safe text could be generated");
  }

  const response = await fetch(`${ELEVENLABS_API_URL}/${voiceId}`, {
    method: "POST",
    headers: {
      Accept: "audio/mpeg",
      "Content-Type": "application/json",
      "xi-api-key": getApiKey(),
    },
    body: JSON.stringify({
      model_id: DEFAULT_MODEL_ID,
      text: narration,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.8,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new VoiceGenerationError(
      errorText || `ElevenLabs request failed with ${response.status}`
    );
  }

  const contentType = response.headers.get("content-type") || "audio/mpeg";
  const buffer = await response.arrayBuffer();
  if (!buffer.byteLength) {
    throw new VoiceGenerationError("ElevenLabs returned empty audio");
  }

  return {
    audio: new Uint8Array(buffer),
    contentType,
    textUsed: narration,
  };
}
