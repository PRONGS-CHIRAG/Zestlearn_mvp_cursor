import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // TODO: implement document upload and processing pipeline
    // 1. Parse multipart form data (workspaceId + file)
    // 2. Validate file type and workspaceId
    // 3. Create document record in Convex
    // 4. Extract text from file
    // 5. Summarize text via LLM
    // 6. Generate tags
    // 7. Save results and update processing status
    return NextResponse.json(
      { success: false, error: "Not implemented" },
      { status: 501 }
    );
  } catch (error) {
    console.error("[upload] error:", error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
