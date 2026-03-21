"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches errors thrown by Convex `useQuery` / `useMutation` hooks and any
 * other runtime errors inside workspace panels, preventing a full-page crash.
 */
export default class PanelErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ZestLearn] Panel error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            <p className="font-semibold">Something went wrong loading this panel.</p>
            <p className="mt-1 text-red-600/80">{this.state.error.message}</p>
            <button
              className="mt-3 text-xs underline underline-offset-2"
              onClick={() => this.setState({ error: null })}
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
