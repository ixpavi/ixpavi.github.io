import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the element matching the URL hash once it's mounted.
 * Needed because navigating here from another route (e.g. Header's "/#brands"
 * links) lands on this page before the hash target exists in the DOM, so the
 * browser's native hash-jump silently does nothing.
 *
 * Uses instant scroll — a `smooth` scrollIntoView called from this effect
 * gets silently reset back to the top shortly after (observed consistently
 * across the client-side route transition; instant does not).
 */
export function useHashScroll() {
  const { hash, pathname } = useLocation();
  const lastHandled = useRef<string | null>(null);

  useEffect(() => {
    if (!hash) return;
    const key = `${pathname}${hash}`;
    if (lastHandled.current === key) return;
    lastHandled.current = key;

    const id = hash.replace("#", "");
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
      } else if (attempts < 20) {
        attempts += 1;
        requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
  }, [hash, pathname]);
}
