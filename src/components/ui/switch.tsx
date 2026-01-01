import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };


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
