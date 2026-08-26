import { useEffect, useRef } from "react";

/**
 * Subtle 3D tilt-on-hover: the card leans toward the cursor within its own
 * bounds and lifts slightly, springing flat on leave. Scoped per-element
 * (not a page-wide cursor follower) and skipped for touch/reduced-motion.
 */
export function useTilt<T extends HTMLElement>(maxDeg = 6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (prefersReducedMotion || isTouch) return;

    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-py * maxDeg).toFixed(2)}deg) rotateY(${(px * maxDeg).toFixed(2)}deg) translateY(-2px)`;
    };

    const onLeave = () => {
      el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxDeg]);

  return ref;
}
