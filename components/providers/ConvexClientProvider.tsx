"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error(
    "[ZestLearn] NEXT_PUBLIC_CONVEX_URL is not set.\n" +
    "Run `npx convex dev` first, then restart the Next.js dev server."
  );
}

// Initialize once at module level — safe to do because the URL is guaranteed above.
const convex = new ConvexReactClient(convexUrl);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
