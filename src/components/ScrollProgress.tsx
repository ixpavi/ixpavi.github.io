import { useEffect, useState } from "react";

/** A thin "pressure gauge" fill bar under the header, tracking scroll depth. */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-[68px] left-0 right-0 z-40 h-[5px] bg-white/5 pointer-events-none overflow-visible">
      {/* Ruler tick marks, like a retractable tape measure */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 8px, transparent 8px, transparent 9px, transparent 9px, transparent 40px)",
        }}
      />
      <div
        className="h-full bg-yellow relative"
        style={{ width: `${progress}%` }}
      >
        {/* Tape-measure blade tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-yellow border border-blueprint-deep rotate-45" />
      </div>
    </div>
  );
};

export default ScrollProgress;
