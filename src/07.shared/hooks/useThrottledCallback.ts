import { useCallback, useEffect, useRef } from "react";

/**
 * Throttle with a trailing call: the wrapped callback fires at most once per
 * `delayMs`, and the latest skipped invocation is always delivered afterwards
 * so the final value is never lost.
 */
export const useThrottledCallback = <A extends unknown[]>(
  callback: (...args: A) => void,
  delayMs: number,
) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  const lastCallAt = useRef(0);
  const trailing = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    if (trailing.current) {
      clearTimeout(trailing.current);
      trailing.current = null;
    }
  }, []);

  const throttled = useCallback(
    (...args: A) => {
      const elapsed = Date.now() - lastCallAt.current;
      cancel();

      if (elapsed >= delayMs) {
        lastCallAt.current = Date.now();
        callbackRef.current(...args);
        return;
      }

      trailing.current = setTimeout(() => {
        trailing.current = null;
        lastCallAt.current = Date.now();
        callbackRef.current(...args);
      }, delayMs - elapsed);
    },
    [delayMs, cancel],
  );

  useEffect(() => cancel, [cancel]);

  return { throttled, cancel };
};
