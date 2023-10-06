import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth-shell";
import { Field, Input, PrimaryButton } from "@/components/app-shell";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — VideoForge AI" }] }),
  component: () => (
    <AuthShell title="Set a new password" subtitle="Pick something strong — at least 8 characters.">
      <form className="space-y-4">
        <Field label="New password"><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input type="password" placeholder="••••••••" className="!pl-10" /></div></Field>
        <Field label="Confirm password"><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input type="password" placeholder="••••••••" className="!pl-10" /></div></Field>
        <PrimaryButton className="w-full !h-12 !text-[14px]">Update password</PrimaryButton>
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
