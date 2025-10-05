import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Billing"]}
      title="Billing"
      subtitle="Invoices, payment methods and renewals."
      description="Manage your subscription, view past invoices and update your payment method. This area unlocks once your workspace is connected to the rendering backend."
      icon={CreditCard}
    />
  ),
});


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
