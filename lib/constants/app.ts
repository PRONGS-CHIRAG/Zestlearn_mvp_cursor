export const APP_NAME = "ZestLearn";
export const APP_TAGLINE = "AI Consultant Copilot for Pharma & Biotech SMEs";

export const ROUTES = {
  landing: "/",
  assessment: "/assessment",
  workspace: (id: string) => `/workspace/${id}`,
  report: (id: string) => `/workspace/${id}/report`,
} as const;

export const DEMO_COMPANIES = ["HelixPharm Solutions AG", "NovaCura Biotech GmbH", "Rheonix Life Sciences GmbH"] as const;
