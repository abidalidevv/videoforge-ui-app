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


import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });
  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(data => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch(err => { if (!cancelled) setState({ data: null, loading: false, error: err.message }); });
    return () => { cancelled = true; };
  }, [url]);
  return state;
}
