import { useState, useRef, type CSSProperties } from "react";

const draw = (delay: number): CSSProperties => ({ "--draw-delay": `${delay}s` } as CSSProperties);

const EASTER_EGG_CLICKS = 5;

const HydraulicSchematic = () => {
  const [clicks, setClicks] = useState(0);
  const [pressurized, setPressurized] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = () => {
    if (pressurized) return;
    const next = clicks + 1;
    setClicks(next);
    if (next >= EASTER_EGG_CLICKS) {
      setPressurized(true);
      setClicks(0);
      timeoutRef.current = setTimeout(() => setPressurized(false), 2600);
    }
  };

  return (
    <div className="relative">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto max-w-[560px] cursor-pointer select-none"
        fill="none"
        role="img"
        aria-label="Technical cross-section diagram of a hydraulic cylinder. Click it a few times."
        onClick={handleClick}
      >
        {/* Centerline */}
        <line x1="20" y1="160" x2="580" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="10 4 2 4" />

        {/* Bore dimension line */}
        <g stroke="#F5C518" strokeOpacity="0.75" strokeWidth="1">
          <line className="draw-line" x1="60" y1="78" x2="60" y2="98" pathLength={1} style={draw(0.9)} />
          <line className="draw-line" x1="340" y1="78" x2="340" y2="98" pathLength={1} style={draw(0.9)} />
          <line className="draw-line" x1="60" y1="86" x2="340" y2="86" pathLength={1} style={draw(1)} />
          <path d="M60 86 l8 -3 v6 z" fill="#F5C518" fillOpacity="0.75" stroke="none" />
          <path d="M340 86 l-8 -3 v6 z" fill="#F5C518" fillOpacity="0.75" stroke="none" />
        </g>
        <text x="200" y="72" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="#F5C518" fillOpacity="0.85">
          BORE ⌀63
        </text>

        {/* Cylinder barrel */}
        <rect
          className={`draw-line transition-[stroke-opacity] duration-500 ${pressurized ? "stroke-yellow" : ""}`}
          x="60"
          y="110"
          width="280"
          height="100"
          rx="3"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          pathLength={1}
          style={draw(0.1)}
        />
        {/* Flanges */}
        <rect className="draw-line" x="48" y="96" width="14" height="128" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" pathLength={1} style={draw(0.2)} />
        <rect className="draw-line" x="338" y="96" width="14" height="128" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" pathLength={1} style={draw(0.2)} />

        {/* Piston head + rod group — drives out on pressurize */}
        <g className="transition-transform duration-700 ease-out" style={{ transform: pressurized ? "translateX(28px)" : "translateX(0)" }}>
          <rect x="228" y="112" width="16" height="96" fill="#F5C518" fillOpacity="0.9" />
          <line className="draw-line" x1="222" y1="112" x2="222" y2="208" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" pathLength={1} style={draw(0.4)} />
          <line className="draw-line" x1="250" y1="112" x2="250" y2="208" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" pathLength={1} style={draw(0.4)} />
          <rect className="draw-line" x="250" y="150" width="220" height="20" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" pathLength={1} style={draw(0.5)} />
          <circle className="draw-line" cx="486" cy="160" r="18" stroke="white" strokeOpacity="0.55" strokeWidth="1.5" pathLength={1} style={draw(0.7)} />
          <circle className="draw-line" cx="486" cy="160" r="6" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" pathLength={1} style={draw(0.8)} />
        </g>

        {/* Ports — glow when pressurized */}
        <rect x="96" y="96" width="12" height="14" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" className={pressurized ? "fill-yellow/40 transition-colors duration-300" : "transition-colors duration-300"} />
        <line x1="102" y1="96" x2="102" y2="60" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        <text x="102" y="50" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fill="white" fillOpacity="0.55">
          PORT A
        </text>

        <rect x="292" y="210" width="12" height="14" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="298" y1="224" x2="298" y2="255" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
        <text x="298" y="270" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fill="white" fillOpacity="0.55">
          PORT B
        </text>

        {/* Stroke dimension line */}
        <g stroke="#F5C518" strokeOpacity="0.75" strokeWidth="1">
          <line className="draw-line" x1="250" y1="242" x2="250" y2="262" pathLength={1} style={draw(1.1)} />
          <line className="draw-line" x1="470" y1="242" x2="470" y2="262" pathLength={1} style={draw(1.1)} />
          <line className="draw-line" x1="250" y1="252" x2="470" y2="252" pathLength={1} style={draw(1.2)} />
          <path d="M250 252 l8 -3 v6 z" fill="#F5C518" fillOpacity="0.75" stroke="none" />
          <path d="M470 252 l-8 -3 v6 z" fill="#F5C518" fillOpacity="0.75" stroke="none" />
        </g>
        <text x="360" y="280" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="#F5C518" fillOpacity="0.85">
          STROKE 250
        </text>
      </svg>

      {/* Easter egg caption */}
      <div
        className={`pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 mono-label text-[10px] text-yellow bg-blueprint-deep/90 border border-yellow/40 px-3 py-1.5 transition-all duration-300 ${
          pressurized ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        MAX PRESSURE — nice work, engineer.
      </div>
      {clicks > 0 && !pressurized && (
        <div className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 mono-label text-[9px] text-white/40">
          {EASTER_EGG_CLICKS - clicks} more...
        </div>
      )}
    </div>
  );
};

export default HydraulicSchematic;
