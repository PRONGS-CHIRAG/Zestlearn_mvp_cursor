import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { validateEmail } from "@/lib/auth/validators";

function getConvex(): ConvexHttpClient {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
  return new ConvexHttpClient(url);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    const emailErr = validateEmail(String(email ?? ""));
    if (emailErr) {
      return NextResponse.json({ success: false, error: emailErr }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ success: false, error: "Password is required" }, { status: 400 });
    }

    const convex = getConvex();
    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await convex.query(api.auth.getUserByEmail, { email: normalizedEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    const workspace = await convex.query(api.auth.getUserWorkspace, {
      userId: user._id as Id<"users">,
    });

    if (!workspace) {
      return NextResponse.json(
        { success: false, error: "No workspace found for this account." },
        { status: 404 }
      );
    }

    await convex.mutation(api.auth.updateLastLogin, {
      userId: user._id as Id<"users">,
    });

    const token = await createSessionToken({
      userId: user._id,
      workspaceId: workspace._id,
      email: normalizedEmail,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      workspaceId: workspace._id,
    });
  } catch (error) {
    console.error("[login] error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Login failed" },
      { status: 500 }
    );
  }
}
