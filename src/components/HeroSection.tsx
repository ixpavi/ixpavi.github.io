import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import HydraulicSchematic from "@/components/HydraulicSchematic";
import AnimatedStat from "@/components/AnimatedStat";
import { useMagnetic } from "@/hooks/use-magnetic";

const stats = [
  { value: "20+", label: "Years in Business" },
  { value: "2004", label: "Parker Authorized Since" },
  { value: "9", label: "Industries Served" },
  { value: "3", label: "Authorized Brands" },
];

const HeroSection = () => {
  const schematicRef = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useMagnetic<HTMLAnchorElement>(0.2);
  const secondaryCtaRef = useMagnetic<HTMLAnchorElement>(0.2);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (schematicRef.current) {
          const offset = Math.min(window.scrollY, 600) * 0.12;
          schematicRef.current.style.transform = `translateY(${offset}px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative bg-blueprint-deep grid-blueprint overflow-hidden pt-[68px]">
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Left — copy */}
          <div>
            <div className="mono-label text-[11px] text-yellow/90 mb-6 flex flex-wrap gap-x-6 gap-y-1 animate-fade-in">
              <span>Dwg No. Yati&#8209;2004</span>
              <span className="text-white/30">/</span>
              <span>Rev. 2026</span>
              <span className="text-white/30">/</span>
              <span>Scale: Pan&#8209;India</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-6 leading-[1.1] animate-slide-up">
              Industrial supply you can{" "}
              <span className="inline-block bg-yellow text-blueprint-deep px-2 whitespace-nowrap">
                depend on
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-white/70 mb-10 max-w-[520px] leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.15s" }}
            >
              Authorized distributor for Parker Hannifin, NBC Bearing, and Demech Chemical
              Products — supplying hydraulics, pneumatics, filtration, bearings, and industrial
              coatings to nuclear, power, cement, fertilizer, and heavy engineering plants
              across India since 2004.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button
                size="xl"
                className="bg-yellow text-blueprint-deep hover:bg-white rounded-none font-semibold mono-label text-xs"
                asChild
              >
                <a href="#products" ref={primaryCtaRef} className="transition-transform duration-300 ease-out">
                  Explore Catalog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="rounded-none border-white/25 text-white bg-transparent hover:bg-white/10 hover:text-white mono-label text-xs"
                asChild
              >
                <a href="#contact" ref={secondaryCtaRef} className="transition-transform duration-300 ease-out">Contact Sales</a>
              </Button>
            </div>
          </div>

          {/* Right — technical schematic, the real subject of the business */}
          <div ref={schematicRef} className="hidden lg:block animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <HydraulicSchematic />
          </div>
        </div>

        {/* Dimension-line stat strip */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.45s" }}>
          <div className="dim-line dim-line-light mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-display font-semibold text-yellow mb-1">
                  <AnimatedStat value={stat.value} />
                </div>
                <div className="mono-label text-[10px] text-white/65 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
