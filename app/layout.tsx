import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZestLearn — AI Consultant Copilot for Pharma & Biotech",
  description:
    "Find the best AI pilot for your pharma or biotech team. ZestLearn analyzes your business context and generates a practical AI opportunity roadmap.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
