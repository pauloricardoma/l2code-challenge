import { useCallback, useRef } from "react";

export const useDebounce = <T>(callback: (value: T) => void, delay: number) => {
  const timeoutRef = useRef<number | null>(null);

  return useCallback((value: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => callback(value), delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
}
