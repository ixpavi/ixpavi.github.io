import indiaMapSvg from "@/assets/map/india-states.svg";

interface Marker {
  name: string;
  left: number; // % from left
  top: number; // % from top
  primary: boolean;
}

// Positions read off the source map's own state-label coordinates, so they
// line up with the real state locations rather than being guessed.
const markers: Marker[] = [
  { name: "Rajasthan", left: 16.76, top: 38.44, primary: true },
  { name: "Gujarat", left: 11.45, top: 49.46, primary: true },
  { name: "Madhya Pradesh", left: 32.09, top: 48.95, primary: true },
  { name: "Uttar Pradesh", left: 39.29, top: 35.61, primary: true },
  { name: "Maharashtra", left: 23.36, top: 60.57, primary: false },
  { name: "Karnataka", left: 23.13, top: 77.05, primary: false },
  { name: "Telangana", left: 30.28, top: 71.07, primary: false },
  { name: "Andhra Pradesh", left: 31.93, top: 75.73, primary: false },
];

/**
 * Regional presence map — outline-style India (state borders only, no
 * fills), matching the site's technical-drawing look, with yellow pins
 * marking where we've actually served. Map source: India-map-en.svg,
 * Rajeshodayanchal at Malayalam Wikipedia, CC BY-SA 3.0, via Wikimedia
 * Commons — recolored to line art (fills stripped, strokes lightened,
 * text labels hidden) for this use.
 */
const IndiaMap = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="relative w-full" style={{ aspectRatio: "1519 / 1773" }}>
        <img src={indiaMapSvg} alt="Map of India, states outlined" className="w-full h-full object-contain" />
        {markers.map((m) => (
          <div
            key={m.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${m.left}%`, top: `${m.top}%` }}
          >
            <span className="relative flex items-center justify-center">
              {m.primary && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-yellow/60 animate-ping-slow" />
              )}
              <span
                className={`relative rounded-full border border-blueprint-deep shadow ${
                  m.primary ? "w-3.5 h-3.5 bg-yellow" : "w-2.5 h-2.5 bg-yellow/50"
                }`}
              />
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-1 whitespace-nowrap mono-label text-[9px] text-blueprint-deep bg-yellow/95 px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {m.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-5 mt-4 mono-label text-[10px] text-white/55">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow" /> Core region
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow/50" /> Also served
        </span>
      </div>
    </div>
  );
};

export default IndiaMap;
