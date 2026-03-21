"use client";

import ErrorState from "@/components/shared/ErrorState";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ErrorState
        title="Failed to load workspace"
        message={error.message || "Something went wrong. Please try again."}
        onRetry={reset}
      />
    </div>
  );
}
