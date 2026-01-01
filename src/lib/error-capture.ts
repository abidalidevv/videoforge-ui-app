// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}


type EventMap = Record<string, unknown>;

class TypedEventEmitter<T extends EventMap> {
  private listeners = new Map<keyof T, Set<Function>>();
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(listener);
  }
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    this.listeners.get(event)?.delete(listener);
  }
  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners.get(event)?.forEach(l => l(data));
  }
}


const createStore = <T extends object>(initialState: T) => {
  let state = { ...initialState };
  const subscribers = new Set<(state: T) => void>();
  return {
    getState: () => state,
    setState: (partial: Partial<T>) => {
      state = { ...state, ...partial };
      subscribers.forEach(fn => fn(state));
    },
    subscribe: (fn: (state: T) => void) => {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
  };
};


type KeyOf<T> = keyof T;
type ValueOf<T> = T[keyof T];
type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
