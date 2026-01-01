import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };


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


import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  return useCallback((...args: Parameters<T>) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  }, [fn, delay]) as T;
}
