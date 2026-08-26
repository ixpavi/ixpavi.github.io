interface PanelScrewProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  rotation: number;
  onTurn: () => void;
}

const positionClasses: Record<PanelScrewProps["position"], string> = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
};

/** An interactive slotted screw — click it to give it a quarter-turn. */
const PanelScrew = ({ position, rotation, onTurn }: PanelScrewProps) => {
  return (
    <button
      type="button"
      aria-label="Panel screw"
      title="Careful, that's holding the plate on"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onTurn();
      }}
      className={`absolute ${positionClasses[position]} z-10 w-4 h-4 flex items-center justify-center rounded-full bg-blueprint-deep/10 hover:bg-blueprint-deep/25 active:scale-90 transition-colors cursor-pointer`}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.25s ease-out" }}
      >
        <circle cx="5" cy="5" r="4.5" fill="none" stroke="currentColor" className="text-blueprint-deep/40" strokeWidth="1" />
        <line x1="2" y1="5" x2="8" y2="5" stroke="currentColor" className="text-blueprint-deep/60" strokeWidth="1.2" />
      </svg>
    </button>
  );
};

export default PanelScrew;
