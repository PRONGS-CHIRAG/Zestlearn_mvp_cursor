import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // TODO: implement consultant chat backend
    // 1. Validate request (workspaceId + message)
    // 2. Store user message in Convex
    // 3. Fetch workspace profile, assessment, recent messages, doc summaries, memory patterns
    // 4. Build compact chat context
    // 5. Call Gemini provider
    // 6. Store assistant reply
    // 7. Return reply and context usage metadata
    return NextResponse.json(
      { success: false, error: "Not implemented" },
      { status: 501 }
    );
  } catch (error) {
    console.error("[chat] error:", error);
    return NextResponse.json(
      { success: false, error: "Chat failed" },
      { status: 500 }
    );
  }
}
