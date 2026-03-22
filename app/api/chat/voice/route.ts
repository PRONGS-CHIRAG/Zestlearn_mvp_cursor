import { NextRequest, NextResponse } from "next/server";
import {
  VoiceConfigError,
  VoiceGenerationError,
  generateSpeech,
} from "@/lib/voice/elevenlabs";
import { prepareNarrationText, MAX_NARRATION_LENGTH } from "@/lib/voice/prepareNarrationText";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Generous raw payload ceiling to prevent abuse — not the real voice limit.
const MAX_RAW_PAYLOAD = 50_000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, voiceId } = body as {
      text?: string;
      voiceId?: string;
    };

    if (!text?.trim()) {
      return NextResponse.json(
        { success: false, error: "text is required" },
        { status: 400 }
      );
    }

    if (text.length > MAX_RAW_PAYLOAD) {
      return NextResponse.json(
        { success: false, error: "Payload too large" },
        { status: 413 }
      );
    }

    // Clean and truncate the text before sending to ElevenLabs.
    const narration = prepareNarrationText(text.trim());

    if (!narration) {
      return NextResponse.json(
        { success: false, error: "No speakable text could be extracted from this reply." },
        { status: 422 }
      );
    }

    const result = await generateSpeech({
      text: text.trim(),
      voiceId,
    });

    const audioBytes = Uint8Array.from(result.audio);
    const audioBlob = new Blob([audioBytes], {
      type: result.contentType,
    });

    return new NextResponse(audioBlob, {
      status: 200,
      headers: {
        "Content-Type": result.contentType,
        "Cache-Control": "no-store",
        "X-Narration-Length": String(narration.length),
        "X-Narration-Max": String(MAX_NARRATION_LENGTH),
        "X-Narration-Truncated": String(narration.length >= MAX_NARRATION_LENGTH),
      },
    });
  } catch (error) {
    console.error("[chat voice] error:", error);

    if (error instanceof VoiceConfigError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 503 }
      );
    }

    if (error instanceof VoiceGenerationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Voice request failed",
      },
      { status: 500 }
    );
  }
}
