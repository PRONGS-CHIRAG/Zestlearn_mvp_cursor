"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

let client: ConvexReactClient | null = null;

function getClient(): ConvexReactClient {
  if (!convexUrl) {
    throw new Error(
      "[ZestLearn] NEXT_PUBLIC_CONVEX_URL is not set.\n" +
        "Run `npx convex dev` first, then restart the Next.js dev server."
    );
  }
  if (!client) {
    client = new ConvexReactClient(convexUrl);
  }
  return client;
}

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => getClient(), []);
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
