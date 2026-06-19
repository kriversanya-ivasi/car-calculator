import { useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "car-calc-form-v1:";

export function usePersistentState<T>(key: string, initial: T) {
  const storageKey = STORAGE_PREFIX + key;

  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;

    try {
      const raw = window.localStorage.getItem(storageKey);

      if (raw !== null) {
        return JSON.parse(raw) as T;
      }
    } catch {
      //
    }

    return initial;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify(value),
      );
    } catch {
      //
    }
  }, [storageKey, value]);

  return [value, setValue] as const;
}
