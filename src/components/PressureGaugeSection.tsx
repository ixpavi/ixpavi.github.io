import { useRef, useState, useEffect } from "react";

const MIN_ANGLE = -120;
const MAX_ANGLE = 120;
const PUMP_STEP = 15; // % pressure added per click
const IDLE_REVERT_MS = 2200; // stop pumping, ease back to scroll-tracking
const RELIEF_HOLD_MS = 1000;

const RELIEF_MESSAGES = [
  "⚠ OVERPRESSURE — relief valve vented safely.",
  "PSI holding fine. Try that again, engineer.",
  "Seals rated for this. Nice reflexes.",
  "Relief valve cracked open at spec. All clear.",
];

type Mode = "scroll" | "pumping" | "relief";

/**
 * A working pressure-gauge SVG: at rest the needle tracks overall page-scroll
 * depth. Click it to pump — each click bumps the pressure up a notch with a
 * little kick; keep clicking and it climbs toward redline, shakes, vents
 * through the relief valve, then eases back to tracking scroll again.
 */
const PressureGaugeSection = () => {
  const [scrollPct, setScrollPct] = useState(0);
  const [mode, setMode] = useState<Mode>("scroll");
  const [pressure, setPressure] = useState(0);
  const [ventCount, setVentCount] = useState(0);
  const revertTimer = useRef<ReturnType<typeof setTimeout>>();
  const reliefTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPct(Math.min(100, Math.max(0, pct)));
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

  useEffect(
    () => () => {
      clearTimeout(revertTimer.current);
      clearTimeout(reliefTimer.current);
    },
    [],
  );

  const handleClick = () => {
    if (mode === "relief") return;

    clearTimeout(revertTimer.current);
    const next = mode === "pumping" ? pressure + PUMP_STEP : PUMP_STEP;

    if (next >= 100) {
      setPressure(100);
      setMode("relief");
      setVentCount((v) => v + 1);
      reliefTimer.current = setTimeout(() => {
        setMode("scroll");
        setPressure(0);
      }, RELIEF_HOLD_MS);
      return;
    }

    setPressure(next);
    setMode("pumping");
    // no more clicks for a while → gauge relaxes back to tracking scroll
    revertTimer.current = setTimeout(() => setMode("scroll"), IDLE_REVERT_MS);
  };

  const scrollAngle = MIN_ANGLE + (scrollPct / 100) * (MAX_ANGLE - MIN_ANGLE);
  const pumpAngle = MIN_ANGLE + (pressure / 100) * (MAX_ANGLE - MIN_ANGLE);
  const angle = mode === "scroll" ? scrollAngle : pumpAngle;
  const transition =
    mode === "pumping"
      ? "transform 260ms cubic-bezier(0.34, 1.56, 0.64, 1)"
      : mode === "relief"
        ? "transform 200ms ease-in"
        : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";

  const cx = 150;
  const cy = 150;
  const r = 110;
  const active = mode !== "scroll";
  const message = RELIEF_MESSAGES[(ventCount - 1 + RELIEF_MESSAGES.length) % RELIEF_MESSAGES.length];

  // Tick marks around the dial
  const ticks = Array.from({ length: 13 }, (_, i) => {
    const t = MIN_ANGLE + (i / 12) * (MAX_ANGLE - MIN_ANGLE);
    const rad = ((t - 90) * Math.PI) / 180;
    const major = i % 3 === 0;
    const r1 = major ? r - 16 : r - 10;
    return {
      x1: cx + r1 * Math.cos(rad),
      y1: cy + r1 * Math.sin(rad),
      x2: cx + (r - 2) * Math.cos(rad),
      y2: cy + (r - 2) * Math.sin(rad),
      major,
    };
  });

  // Relief-valve vent symbol, top-right of the bezel
  const ventX = cx + (r + 26) * Math.cos((-35 * Math.PI) / 180);
  const ventY = cy + (r + 26) * Math.sin((-35 * Math.PI) / 180);

  return (
    <section className="py-24 md:py-28 bg-blueprint-deep grid-blueprint section-animate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className={`relative ${mode === "relief" ? "animate-gauge-shake" : ""}`}>
              <svg
                viewBox="0 0 300 300"
                className="w-full max-w-[300px] h-auto cursor-pointer select-none overflow-visible active:scale-[0.97] transition-transform duration-150"
                role="img"
                aria-label="Working pressure gauge. It tracks how far you've scrolled — click repeatedly to pump the pressure up toward redline."
                onClick={handleClick}
              >
                {/* Colored zone arc */}
                <path d="M 45 232 A 110 110 0 1 1 255 232" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="14" />
                <path
                  d="M 189 238 A 110 110 0 0 1 255 232"
                  fill="none"
                  stroke="#e0483a"
                  strokeOpacity={active ? 0.95 : 0.55}
                  strokeWidth="14"
                  className="transition-[stroke-opacity] duration-300"
                />

                {/* Outer bezel — pulses when active */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r + 14}
                  fill="none"
                  stroke={active ? "#e0483a" : "white"}
                  strokeOpacity={active ? 0.6 : 0.35}
                  strokeWidth="1.5"
                  className="transition-[stroke,stroke-opacity] duration-300"
                />
                <circle cx={cx} cy={cy} r={r + 10} fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1" />

                {/* Ticks */}
                {ticks.map((t, i) => (
                  <line
                    key={i}
                    x1={t.x1}
                    y1={t.y1}
                    x2={t.x2}
                    y2={t.y2}
                    stroke="white"
                    strokeOpacity={t.major ? 0.7 : 0.35}
                    strokeWidth={t.major ? 2 : 1}
                  />
                ))}

                <text x={cx} y={cy - 40} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fill="#F5C518" fillOpacity="0.8">
                  SYSTEM PRESSURE
                </text>
                <text x={cx} y={cy + 46} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="white" fillOpacity="0.5">
                  {mode === "relief" ? "VENTING" : mode === "pumping" ? `${Math.round(pressure)}%` : `${Math.round(scrollPct)}%`}
                </text>

                {/* Relief valve vent symbol */}
                <g style={{ opacity: mode === "relief" ? 1 : 0, transition: "opacity 200ms ease-out" }}>
                  <circle cx={ventX} cy={ventY} r="5" fill="none" stroke="#e0483a" strokeWidth="1.5" />
                  {[0, 1, 2].map((i) => (
                    <line
                      key={i}
                      x1={ventX}
                      y1={ventY - 8}
                      x2={ventX + (i - 1) * 7}
                      y2={ventY - 20}
                      stroke="#e0483a"
                      strokeOpacity="0.7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className={mode === "relief" ? "animate-gauge-vent" : ""}
                      style={{ animationDelay: `${i * 90}ms` }}
                    />
                  ))}
                </g>

                {/* Needle — points straight up at rest, rotated by `angle` around the hub */}
                <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${cx}px ${cy}px`, transition }}>
                  <line
                    x1={cx}
                    y1={cy}
                    x2={cx}
                    y2={cy - (r - 24)}
                    stroke={active ? "#e0483a" : "#F5C518"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-[stroke] duration-300"
                  />
                </g>
                <circle cx={cx} cy={cy} r="6" fill="#F5C518" />
              </svg>

              {/* Status / relief message */}
              <div
                className={`pointer-events-none absolute left-1/2 -bottom-9 -translate-x-1/2 whitespace-nowrap mono-label text-[10px] text-yellow bg-blueprint-deep/95 border border-yellow/40 px-3 py-1.5 transition-all duration-300 ${
                  mode === "relief" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                {message}
              </div>
              {mode === "pumping" && (
                <div className="pointer-events-none absolute left-1/2 -bottom-7 -translate-x-1/2 whitespace-nowrap mono-label text-[9px] text-white/40 animate-fade-in">
                  keep clicking...
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="mono-label text-[11px] text-yellow/80 mb-4">Fig. 02 — Live Instrumentation</div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-6 leading-tight">
              Built to the same standard we supply
            </h2>
            <p className="text-white/70 leading-relaxed max-w-[480px] mb-4">
              At rest, this gauge tracks how far you've scrolled down the page. Click it to pump
              the pressure up manually — keep clicking and watch it climb toward redline, then
              vent through the relief valve.
            </p>
            <p className="mono-label text-[10px] text-white/40">Range: 0–100% · Click repeatedly to pump</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressureGaugeSection;
