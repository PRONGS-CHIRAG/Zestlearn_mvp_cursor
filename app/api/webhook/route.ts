import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // TODO: implement n8n outgoing webhook handler
    // This route handles outgoing event notifications to n8n for:
    // - assessment_submitted
    // - report_generated
    // - workspace_created
    return NextResponse.json(
      { success: false, error: "Not implemented" },
      { status: 501 }
    );
  } catch (error) {
    console.error("[webhook] error:", error);
    return NextResponse.json(
      { success: false, error: "Webhook failed" },
      { status: 500 }
    );
  }
}
