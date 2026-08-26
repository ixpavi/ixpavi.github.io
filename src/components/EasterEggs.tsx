import { useEffect, useRef, useState } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const YATI = ["y", "a", "t", "i"];
const TORQUE = ["t", "o", "r", "q", "u", "e"];

interface Bolt {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  size: number;
}

interface Wrench {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
}

const EasterEggs = () => {
  const [active, setActive] = useState(false);
  const [bolts, setBolts] = useState<Bolt[]>([]);
  const [stamp, setStamp] = useState(false);
  const [wrenches, setWrenches] = useState<Wrench[]>([]);
  const [torqueValue, setTorqueValue] = useState<number | null>(null);

  useEffect(() => {
    let progress = 0;
    let yatiProgress = 0;
    let torqueProgress = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI[progress];
      if (key === expected) {
        progress += 1;
        if (progress === KONAMI.length) {
          progress = 0;
          triggerEasterEgg();
        }
      } else {
        progress = key === KONAMI[0] ? 1 : 0;
      }

      const yatiExpected = YATI[yatiProgress];
      if (key === yatiExpected) {
        yatiProgress += 1;
        if (yatiProgress === YATI.length) {
          yatiProgress = 0;
          setStamp(true);
          window.setTimeout(() => setStamp(false), 2200);
        }
      } else {
        yatiProgress = key === YATI[0] ? 1 : 0;
      }

      const torqueExpected = TORQUE[torqueProgress];
      if (key === torqueExpected) {
        torqueProgress += 1;
        if (torqueProgress === TORQUE.length) {
          torqueProgress = 0;
          triggerTorque();
        }
      } else {
        torqueProgress = key === TORQUE[0] ? 1 : 0;
      }
    };

    const triggerTorque = () => {
      const newWrenches: Wrench[] = Array.from({ length: 16 }, (_, i) => ({
        id: Date.now() + i,
        left: 10 + Math.random() * 80,
        delay: Math.random() * 0.4,
        duration: 1.6 + Math.random() * 1,
        rotate: 180 + Math.random() * 360,
      }));
      setWrenches(newWrenches);
      setTorqueValue(120 + Math.floor(Math.random() * 90));
      window.setTimeout(() => setTorqueValue(null), 2400);
      window.setTimeout(() => setWrenches([]), 3000);
    };

    const triggerEasterEgg = () => {
      const newBolts: Bolt[] = Array.from({ length: 28 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 2.2 + Math.random() * 1.4,
        rotate: Math.random() * 360,
        size: 14 + Math.random() * 14,
      }));
      setBolts(newBolts);
      setActive(true);
      window.setTimeout(() => setActive(false), 3600);
      window.setTimeout(() => setBolts([]), 4200);
    };

    // Mobile virtual keyboards frequently don't fire usable `keydown` events
    // (swipe/predictive typing especially) — as a fallback, also check text
    // actually entered into any on-page form field, which does reliably fire
    // `input` events on touch devices.
    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | null;
      const value = target?.value;
      if (typeof value !== "string") return;
      const lower = value.toLowerCase();
      if (lower.endsWith(YATI.join(""))) {
        setStamp(true);
        window.setTimeout(() => setStamp(false), 2200);
      } else if (lower.endsWith(TORQUE.join(""))) {
        triggerTorque();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("input", onInput);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("input", onInput);
    };
  }, []);

  if (!active && bolts.length === 0 && !stamp && wrenches.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden" aria-hidden="true">
      {wrenches.map((w) => (
        <span
          key={w.id}
          className="absolute bottom-[-40px] text-2xl"
          style={{
            left: `${w.left}%`,
            animation: `wrenchRise ${w.duration}s ease-out ${w.delay}s forwards`,
            transform: `rotate(${w.rotate}deg)`,
          }}
        >
          🔧
        </span>
      ))}
      {torqueValue !== null && (
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-blueprint-deep border border-yellow/50 px-6 py-4 text-center"
          style={{ animation: "stampIn 2.4s ease-out forwards" }}
        >
          <div className="mono-label text-[11px] text-yellow mb-1">TORQUE APPLIED: {torqueValue} N·m</div>
          <div className="text-white font-display font-semibold">Spec within tolerance. 🔧</div>
        </div>
      )}
      {stamp && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-yellow text-yellow px-8 py-4 rotate-[-8deg]"
          style={{ animation: "stampIn 2.2s ease-out forwards" }}
        >
          <div className="font-display font-bold text-2xl md:text-4xl tracking-widest">YATI INTERNATIONAL</div>
          <div className="mono-label text-[11px] md:text-xs text-center mt-1">Authorized Distributor · Est. 2004</div>
        </div>
      )}
      {bolts.map((bolt) => (
        <span
          key={bolt.id}
          className="absolute top-[-40px] text-yellow"
          style={{
            left: `${bolt.left}%`,
            fontSize: `${bolt.size}px`,
            animation: `eastereggFall ${bolt.duration}s ease-in ${bolt.delay}s forwards`,
            transform: `rotate(${bolt.rotate}deg)`,
          }}
        >
          ⚙️
        </span>
      ))}
      <div
        className={`absolute left-1/2 top-20 -translate-x-1/2 bg-blueprint-deep border border-yellow/50 px-6 py-4 text-center transition-all duration-500 ${
          active ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="mono-label text-[11px] text-yellow mb-1">TORQUE SPEC: MAXIMUM</div>
        <div className="text-white font-display font-semibold">You found the easter egg, engineer. 🔧</div>
      </div>
    </div>
  );
};

export default EasterEggs;
