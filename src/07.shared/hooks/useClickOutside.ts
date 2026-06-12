import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  onOutside: () => void,
  enabled = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (target && ref.current && !ref.current.contains(target)) {
        onOutside();
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, onOutside, enabled]);
};
