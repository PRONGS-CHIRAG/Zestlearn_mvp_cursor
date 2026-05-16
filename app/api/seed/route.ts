import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { SEED_MEMORY_PATTERNS } from "@/lib/constants/prompts";

export async function POST() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    return NextResponse.json({ error: "NEXT_PUBLIC_CONVEX_URL not set" }, { status: 500 });
  }

  const convex = new ConvexHttpClient(url);

  try {
    const ids = await convex.mutation(api.memory.seedSharedPatterns, {
      patterns: SEED_MEMORY_PATTERNS.map((p) => ({
        category: p.category,
        patternText: p.patternText,
        industry: p.industry,
      })),
    });

    return NextResponse.json({
      success: true,
      seeded: ids.length,
    });
  } catch (error) {
    console.error("[seed] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
