import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy } from "lucide-react";
import { ComingSoonPage } from "@/components/shared";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help — VideoForge AI" }] }),
  component: () => (
    <ComingSoonPage
      crumb={["General", "Help"]}
      title="Help & Documentation"
      subtitle="Guides, tutorials and shortcuts."
      description="A searchable knowledge base, video walkthroughs and a keyboard-shortcut cheatsheet — arriving in a future release."
      icon={LifeBuoy}
    />
  ),
});


import { useEffect, useRef, RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  handler: () => void
): RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [handler]);
  return ref;
}


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
