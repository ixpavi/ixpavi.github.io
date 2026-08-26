import { useEffect, useRef, useState, type CSSProperties } from "react";

const draw = (delay: number): CSSProperties => ({ "--draw-delay": `${delay}s` } as CSSProperties);

const MAX_EXTEND = 50; // viewBox units the rod can travel
const VIEWBOX_WIDTH = 600;
const EXTEND_THRESHOLD = 0.97;
const RETRACT_THRESHOLD = 0.03;

type FlowDirection = "extend" | "retract" | null;
type Message = "extended" | "home" | null;

/**
 * Interactive hydraulic cylinder — press and hold the rod's clevis handle
 * and drag it left/right to actually extend or retract the piston. Port A
 * lights up while extending (fluid pushing the piston out), Port B lights
 * up while retracting. Reach either end and it calls it out.
 */
const HydraulicSchematic = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragState = useRef({ dragging: false, startClientX: 0, startExtension: 0 });
  const lastExtensionRef = useRef(0);
  const hasMovedRef = useRef(false);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const [extension, setExtension] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [flowDirection, setFlowDirection] = useState<FlowDirection>(null);
  const [message, setMessage] = useState<Message>(null);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => () => clearTimeout(messageTimeoutRef.current), []);

  const clientXDeltaToViewBoxDelta = (deltaClientX: number) => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return deltaClientX * (VIEWBOX_WIDTH / rect.width);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    setHintDismissed(true);
    setDragging(true);
    dragState.current = { dragging: true, startClientX: e.clientX, startExtension: extension };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const deltaVB = clientXDeltaToViewBoxDelta(e.clientX - dragState.current.startClientX);
    const next = Math.min(1, Math.max(0, dragState.current.startExtension + deltaVB / MAX_EXTEND));

    if (next > lastExtensionRef.current + 0.001) setFlowDirection("extend");
    else if (next < lastExtensionRef.current - 0.001) setFlowDirection("retract");

    lastExtensionRef.current = next;
    if (next > 0.02) hasMovedRef.current = true;
    setExtension(next);
  };

  const endDrag = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    setDragging(false);
    setFlowDirection(null);

    clearTimeout(messageTimeoutRef.current);
    if (lastExtensionRef.current >= EXTEND_THRESHOLD) {
      setMessage("extended");
      messageTimeoutRef.current = setTimeout(() => setMessage(null), 2400);
    } else if (lastExtensionRef.current <= RETRACT_THRESHOLD && hasMovedRef.current) {
      setMessage("home");
      messageTimeoutRef.current = setTimeout(() => setMessage(null), 1800);
    }
  };

  const rodX = extension * MAX_EXTEND;
  const portAActive = flowDirection === "extend";
  const portBActive = flowDirection === "retract";

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox="0 0 600 320"
        className="w-full h-auto max-w-[560px] select-none touch-none"
        fill="none"
        role="img"
        aria-label="Interactive hydraulic cylinder. Press and hold the clevis handle at the rod end and drag left or right to extend or retract the piston."
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
        <text x="200" y="72" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="15" fill="#F5C518" fillOpacity="0.85">
          BORE ⌀63
        </text>

        {/* Cylinder barrel */}
        <rect
          className="draw-line"
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

        {/* Piston head + rod group — position driven directly by drag */}
        <g style={{ transform: `translateX(${rodX}px)`, transition: dragging ? "none" : "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          <rect x="228" y="112" width="16" height="96" fill="#F5C518" fillOpacity="0.9" />
          <line className="draw-line" x1="222" y1="112" x2="222" y2="208" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" pathLength={1} style={draw(0.4)} />
          <line className="draw-line" x1="250" y1="112" x2="250" y2="208" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" pathLength={1} style={draw(0.4)} />
          <rect className="draw-line" x="250" y="150" width="220" height="20" fill="white" fillOpacity="0.12" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" pathLength={1} style={draw(0.5)} />

          {/* Clevis handle — the actual drag grip. Generous invisible hit-area for touch. */}
          <circle cx="486" cy="160" r="30" fill="transparent" className="cursor-grab active:cursor-grabbing" style={{ pointerEvents: "all" }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={endDrag} onPointerCancel={endDrag} />
          <circle
            className={`draw-line transition-[stroke,filter] duration-200 ${dragging ? "stroke-yellow" : "stroke-white"}`}
            cx="486"
            cy="160"
            r="18"
            strokeOpacity={dragging ? 1 : 0.55}
            strokeWidth="1.5"
            pathLength={1}
            style={{ ...draw(0.7), pointerEvents: "none" }}
          />
          <circle cx="486" cy="160" r="6" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" style={{ pointerEvents: "none" }} />
          {!hintDismissed && (
            <circle cx="486" cy="160" r="24" stroke="#F5C518" strokeOpacity="0.5" strokeWidth="1.5" className="animate-ping-slow" style={{ pointerEvents: "none" }} />
          )}
        </g>

        {/* Ports — glow with active fluid flow direction */}
        <rect
          x="96"
          y="96"
          width="12"
          height="14"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          className={`transition-colors duration-200 ${portAActive ? "fill-yellow/60" : "fill-transparent"}`}
        />
        <line
          x1="102"
          y1="96"
          x2="102"
          y2="60"
          stroke={portAActive ? "#F5C518" : "white"}
          strokeOpacity={portAActive ? 0.9 : 0.3}
          strokeWidth={portAActive ? 2 : 1}
          strokeDasharray={portAActive ? "4 3" : undefined}
          className={portAActive ? "animate-flow" : ""}
        />
        <text x="102" y="50" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="14" fill={portAActive ? "#F5C518" : "white"} fillOpacity={portAActive ? 1 : 0.55}>
          PORT A
        </text>

        <rect
          x="292"
          y="210"
          width="12"
          height="14"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          className={`transition-colors duration-200 ${portBActive ? "fill-yellow/60" : "fill-transparent"}`}
        />
        <line
          x1="298"
          y1="224"
          x2="298"
          y2="255"
          stroke={portBActive ? "#F5C518" : "white"}
          strokeOpacity={portBActive ? 0.9 : 0.3}
          strokeWidth={portBActive ? 2 : 1}
          strokeDasharray={portBActive ? "4 3" : undefined}
          className={portBActive ? "animate-flow" : ""}
        />
        <text x="298" y="270" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="14" fill={portBActive ? "#F5C518" : "white"} fillOpacity={portBActive ? 1 : 0.55}>
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
        <text x="360" y="300" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="15" fill="#F5C518" fillOpacity="0.85">
          STROKE 250
        </text>
      </svg>

      {/* Live readout while dragging */}
      <div
        className={`pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 mono-label text-[10px] text-yellow bg-blueprint-deep/90 border border-yellow/40 px-3 py-1.5 transition-opacity duration-200 ${
          dragging ? "opacity-100" : "opacity-0"
        }`}
      >
        EXTENSION: {Math.round(extension * 100)}%
      </div>

      {/* Result message on release */}
      <div
        className={`pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 mono-label text-[10px] text-yellow bg-blueprint-deep/90 border border-yellow/40 px-3 py-1.5 transition-all duration-300 ${
          message ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        {message === "extended" ? "FULLY EXTENDED — nice work, engineer." : message === "home" ? "HOME POSITION." : ""}
      </div>

      {!hintDismissed && (
        <div className="pointer-events-none absolute left-1/2 -bottom-1 -translate-x-1/2 mono-label text-[9px] text-white/40">
          drag the rod end
        </div>
      )}
    </div>
  );
};

export default HydraulicSchematic;
