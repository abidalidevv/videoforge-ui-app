import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Profile"]}
      title="Profile"
      subtitle="Public profile, avatar and bio."
      description="Personal profile management arrives in a later phase. Use Account for current workspace settings."
      icon={User}
    />
  ),
});


import { useEffect } from 'react';

export function useDocumentTitle(title: string, suffix = ' | App'): void {
  useEffect(() => {
    const prev = document.title;
    document.title = title + suffix;
    return () => { document.title = prev; };
  }, [title, suffix]);
}


import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert" className="error-boundary">
          <h2>Something went wrong</h2>
          <details><summary>Error details</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
