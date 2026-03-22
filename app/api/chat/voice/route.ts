import { NextRequest, NextResponse } from "next/server";
import {
  VoiceConfigError,
  VoiceGenerationError,
  generateSpeech,
} from "@/lib/voice/elevenlabs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TEXT_LENGTH = 4000;

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

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { success: false, error: "Text is too long for voice playback" },
        { status: 400 }
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
