import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth-shell";
import { Field, Input, PrimaryButton } from "@/components/app-shell";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — VideoForge AI" }] }),
  component: () => (
    <AuthShell title="Forgot your password?" subtitle="We'll email you a reset link.">
      <form className="space-y-4">
        <Field label="Email">
          <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input type="email" placeholder="you@studio.com" className="!pl-10" /></div>
        </Field>
        <PrimaryButton className="w-full !h-12 !text-[14px]">Send reset link</PrimaryButton>
      </form>
      <div className="text-center text-[12.5px] text-muted-foreground mt-6"><Link to="/login" className="text-primary font-semibold hover:underline">← Back to sign in</Link></div>
    </AuthShell>
  ),
});


import { useState, useCallback } from 'react';

interface AsyncState<T> { data: T | null; loading: boolean; error: string | null; }

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null });
  const execute = useCallback(async (fn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (e) {
      const error = e instanceof Error ? e.message : 'Unknown error';
      setState({ data: null, loading: false, error });
      throw e;
    }
  }, []);
  return { ...state, execute };
}
