import { createFileRoute } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/security")({
  head: () => ({ meta: [{ title: "Security — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Security"]}
      title="Security"
      subtitle="Two-factor, sessions and audit log."
      description="Account protection controls — MFA, recovery codes and active session management — arrive once auth is enabled."
      icon={Shield}
    />
  ),
});


import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="form-group">
        <label htmlFor={inputId} className="form-label">{label}</label>
        <input ref={ref} id={inputId} className={`form-input ${error ? 'error' : ''}`} {...props} />
        {hint && !error && <p className="form-hint">{hint}</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';


import { useEffect } from 'react';

export function useDocumentTitle(title: string, suffix = ' | App'): void {
  useEffect(() => {
    const prev = document.title;
    document.title = title + suffix;
    return () => { document.title = prev; };
  }, [title, suffix]);
}
