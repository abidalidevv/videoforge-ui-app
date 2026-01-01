import { createFileRoute } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/usage")({
  head: () => ({ meta: [{ title: "Usage — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Usage"]}
      title="Usage & Quota"
      subtitle="Track render minutes, API calls and storage."
      description="Realtime usage dashboards arrive in a future release once metering is wired to the rendering backend."
      icon={Gauge}
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
