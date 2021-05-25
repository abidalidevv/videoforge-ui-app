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


import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]) as T;
}


import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]) as T;
}


import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}
