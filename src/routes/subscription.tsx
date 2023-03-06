import { createFileRoute } from "@tanstack/react-router";
import { Receipt } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Subscription — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["Account", "Subscription"]}
      title="Subscription"
      subtitle="Plan, seats and renewal preferences."
      description="Upgrade or change your VideoForge plan. Available once your workspace is connected to the rendering backend."
      icon={Receipt}
    />
  ),
});


import { useState, useCallback } from 'react';

interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

export function useToggle(initial = false): UseToggleReturn {
  const [value, setValue] = useState(initial);
  const toggle   = useCallback(() => setValue(v => !v), []);
  const setTrue  = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}
