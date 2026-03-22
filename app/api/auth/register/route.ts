import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { hashPassword } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { validateEmail, validatePassword } from "@/lib/auth/validators";

function getConvex(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  return new ConvexHttpClient(url);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      email,
      password,
      companyName,
      companyType,
      companySize,
      department,
      role,
      aiMaturity,
      bottleneck,
      desiredOutcome,
      currentTools,
      dataAvailability,
    } = body as Record<string, string | number | undefined>;

    const emailErr = validateEmail(String(email ?? ""));
    if (emailErr) {
      return NextResponse.json({ success: false, error: emailErr }, { status: 400 });
    }
    const pwErr = validatePassword(String(password ?? ""));
    if (pwErr) {
      return NextResponse.json({ success: false, error: pwErr }, { status: 400 });
    }

    if (!companyName || !companyType || !companySize || !department || !role || !bottleneck || !desiredOutcome) {
      return NextResponse.json(
        { success: false, error: "All required assessment fields must be filled" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(String(password));
    const convex = getConvex();

    let result: { userId: string; workspaceId: string };
    try {
      result = await convex.mutation(api.auth.registerUser, {
        email: String(email).trim().toLowerCase(),
        passwordHash,
        companyName: String(companyName),
        companyType: String(companyType),
        companySize: String(companySize),
        department: String(department),
        role: String(role),
        aiMaturity: Number(aiMaturity) || 1,
        bottleneck: String(bottleneck),
        desiredOutcome: String(desiredOutcome),
        currentTools: currentTools ? String(currentTools) : undefined,
        dataAvailability: dataAvailability ? String(dataAvailability) : undefined,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("EMAIL_ALREADY_EXISTS")) {
        return NextResponse.json(
          { success: false, error: "An account with this email already exists. Please log in instead." },
          { status: 409 }
        );
      }
      throw err;
    }

    const token = await createSessionToken({
      userId: result.userId,
      workspaceId: result.workspaceId,
      email: String(email).trim().toLowerCase(),
    });
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      workspaceId: result.workspaceId,
    });
  } catch (error) {
    console.error("[register] error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Registration failed" },
      { status: 500 }
    );
  }
}
