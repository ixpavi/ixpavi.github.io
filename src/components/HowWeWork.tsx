import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

const steps = [
  { code: "01", title: "Inquiry", description: "Tell us the component, spec, or application you need." },
  { code: "02", title: "Quote", description: "We confirm availability and pricing, backed by the authorized channel." },
  { code: "03", title: "Order", description: "Purchase order confirmed, genuine stock sourced or arranged." },
  { code: "04", title: "Delivery", description: "Delivered to your plant, with technical support if you need it." },
];

const SEGMENTS = steps.length - 1;

/** Process shown as one connected flow line that fills step by step as the section scrolls through the viewport. */
const HowWeWork = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts filling when the first node is 3/4 down the screen; a short
      // (desktop) row still gets a reasonable scroll distance to fill over.
      const distance = Math.max(rect.height, vh * 0.35);
      const p = (vh * 0.75 - rect.top) / distance;
      setProgress(Math.min(1, Math.max(0, p)));
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
    <section className="py-14 md:py-28 bg-background grid-paper">
      <div className="container mx-auto px-4">
        <div className="mono-label text-[11px] text-primary/70 mb-4">Process — Inquiry to Delivery</div>
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-10 md:mb-16">
          How we work
        </h2>

        <ol ref={listRef} className="grid md:grid-cols-4">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const reached = progress > 0 && progress >= index / SEGMENTS;
            const segmentFill = Math.min(1, Math.max(0, progress * SEGMENTS - index));
            return (
              <li key={step.code} className="relative pl-14 pb-10 last:pb-0 md:pl-0 md:pb-0 md:pr-8">
                {/* Connector to the next step: grey track with a yellow fill on top */}
                {!isLast && (
                  <>
                    <span className="md:hidden absolute left-[17px] top-9 bottom-0 w-px bg-primary/30" />
                    <span
                      className="md:hidden absolute left-[16px] top-9 bottom-0 w-[3px] bg-yellow origin-top [transform:scaleY(var(--fill))]"
                      style={{ "--fill": segmentFill } as CSSProperties}
                    />
                    <ChevronDown className="md:hidden absolute left-[10px] bottom-0 w-4 h-4 text-primary/60" strokeWidth={1.5} />
                    <span className="hidden md:block absolute top-[17px] left-9 right-0 h-px bg-primary/30" />
                    <span
                      className="hidden md:block absolute top-[16px] left-9 right-0 h-[3px] bg-yellow origin-left [transform:scaleX(var(--fill))]"
                      style={{ "--fill": segmentFill } as CSSProperties}
                    />
                    <ChevronRight className="hidden md:block absolute top-[9px] right-0 w-4 h-4 text-primary/60" strokeWidth={1.5} />
                  </>
                )}

                {/* Node */}
                <span
                  className={`absolute left-0 top-0 md:static z-10 flex items-center justify-center w-9 h-9 border-2 border-primary mono-label text-[11px] font-semibold transition-colors duration-300 ${
                    reached ? "bg-yellow text-blueprint-deep" : "bg-background text-primary"
                  }`}
                >
                  {step.code}
                </span>

                <h3 className="text-lg font-display font-semibold text-foreground md:mt-6 mb-2 pt-1 md:pt-0">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowWeWork;
