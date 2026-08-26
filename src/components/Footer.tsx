import { useState, useRef } from "react";
import { Linkedin } from "lucide-react";
import yatiMark from "@/assets/yati-mark-transparent.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [spinning, setSpinning] = useState(false);
  const [clicks, setClicks] = useState(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  const fields = [
    { label: "Company", value: "Yati International Inc." },
    { label: "Location", value: "Kota, Rajasthan, India" },
    { label: "Established", value: "2004" },
    { label: "Authorized", value: "Parker Hannifin · NBC Bearing · Demech" },
  ];

  const handleLogoClick = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 700);

    const next = clicks + 1;
    setClicks(next);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setClicks(0), 1500);
  };

  return (
    <footer className="bg-blueprint-deep border-t border-white/10">
      <div className="container mx-auto px-4 py-10">
        {/* Title block */}
        <div className="flex items-center gap-3 mb-8 relative">
          <button
            type="button"
            onClick={handleLogoClick}
            aria-label="Yati International logo"
            className="cursor-pointer"
          >
            <img
              src={yatiMark}
              alt="Yati International"
              className={`h-8 w-8 object-contain brightness-0 invert transition-transform ${spinning ? "duration-700 ease-out" : ""}`}
              style={{ transform: spinning ? "rotate(360deg)" : "rotate(0deg)" }}
            />
          </button>
          <span className="font-display font-semibold text-white text-lg">Yati International Inc.</span>
          {clicks >= 5 && (
            <span className="mono-label text-[10px] text-yellow ml-2 animate-fade-in">
              torque spec: nominal. thanks for clicking. 🔩
            </span>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {fields.map((field) => (
            <div key={field.label} className="border-r border-b border-white/10 px-5 py-4">
              <div className="mono-label text-[10px] text-yellow/70 mb-1.5">{field.label}</div>
              <div className="text-white/85 text-sm">{field.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
          <p className="text-white/55 text-xs mono-label">
            © {currentYear} Yati International Inc. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/company/yati-international-inc/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center border border-white/15 hover:border-yellow hover:bg-yellow/10 hover:scale-110 active:scale-95 transition-all group"
          >
            <Linkedin className="w-4 h-4 text-white/70 group-hover:text-yellow" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
