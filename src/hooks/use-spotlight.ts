import { useEffect, useRef } from "react";

/**
 * Cursor-tracked "spotlight" glow: sets --spotlight-x/--spotlight-y CSS vars
 * on the element as the mouse moves over it, for a radial-gradient highlight
 * that follows the cursor. Pair with the `.spotlight-card` utility class.
 * Scoped per-element (not a page-wide cursor follower); skipped for touch.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return ref;
}
