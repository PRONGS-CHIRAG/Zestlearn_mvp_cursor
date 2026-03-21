"use client";

import { useState, useCallback } from "react";
import type { ReportRecord } from "@/types/report";

export function useReport(workspaceId: string) {
  const [report, setReport] = useState<ReportRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      const data = await res.json();
      if (data.success && data.report) {
        setReport(data.report);
      } else {
        setError(data.error ?? "Report generation failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  return { report, loading, error, generateReport };
}
