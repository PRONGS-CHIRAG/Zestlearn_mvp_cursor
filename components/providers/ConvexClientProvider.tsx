"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Initialize once at module level (not inside component) as Convex recommends.
// Guard against missing URL so the app renders without Convex during local dev
// before `npx convex dev` has been run.
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    // Convex not yet initialized — render children so the UI works standalone
    return <>{children}</>;
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
