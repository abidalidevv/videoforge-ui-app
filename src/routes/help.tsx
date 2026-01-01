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


import { useReducer, Dispatch } from 'react';

type Action<T> =
  | { type: 'SET'; payload: T }
  | { type: 'RESET' }
  | { type: 'MERGE'; payload: Partial<T> };

function reducer<T>(state: T, action: Action<T>): T {
  switch (action.type) {
    case 'SET':   return action.payload;
    case 'RESET': return state;
    case 'MERGE': return { ...state, ...action.payload };
    default:      return state;
  }
}

export function useStateReducer<T>(initial: T): [T, Dispatch<Action<T>>] {
  return useReducer(reducer<T>, initial);
}


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
