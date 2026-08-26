import { useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import parkerDistributor from "@/assets/parker-distributor.png";
import nbcLogo from "@/assets/brands/nbc-logo.png";
import demechLogo from "@/assets/brands/demech-logo.png";
import { useSpotlight } from "@/hooks/use-spotlight";
import PanelScrew from "@/components/PanelScrew";

const LOOSEN_THRESHOLD = 8;
const SCREW_POSITIONS = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;

const otherBrands = [
  {
    slug: "nbc-bearing",
    name: "NBC Bearing",
    note: "Part of the CK Birla Group",
    products: "All types of industrial bearings",
    logo: nbcLogo,
  },
  {
    slug: "demech-chemical",
    name: "Demech Chemical Products Pvt. Ltd.",
    note: "Industrial coatings & flooring",
    products: "High-build specialty coatings, wear & abrasion-resistant products, flooring systems",
    logo: demechLogo,
  },
];

interface OtherBrand {
  slug: string;
  name: string;
  note: string;
  products: string;
  logo: string;
}

const BrandCard = ({ brand, index }: { brand: OtherBrand; index: number }) => {
  const spotlightRef = useSpotlight<HTMLAnchorElement>();
  return (
    <Link
      ref={spotlightRef}
      to={`/brands/${brand.slug}`}
      className="spotlight-card stagger-item group relative block bg-white p-6 hover:shadow-xl transition-shadow"
      style={{ "--stagger-index": index } as CSSProperties}
    >
      <span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-blueprint-deep/20" />
      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blueprint-deep/20" />
      <span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-blueprint-deep/20" />
      <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-blueprint-deep/20" />
      <div className="px-2">
        <img src={brand.logo} alt={brand.name} className="h-9 w-auto object-contain object-left mb-4" />
        <span className="text-foreground font-display font-semibold text-lg group-hover:text-primary transition-colors">
          {brand.name}
        </span>
        <div className="text-xs mono-label text-primary mt-1 mb-2">{brand.note}</div>
        <p className="text-muted-foreground text-sm leading-relaxed">{brand.products}</p>
      </div>
    </Link>
  );
};

const BrandsSection = () => {
  const featuredSpotlightRef = useSpotlight<HTMLAnchorElement>();
  const [screwRotations, setScrewRotations] = useState([0, 0, 0, 0]);
  const [loose, setLoose] = useState(false);
  const [retightened, setRetightened] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();
  const retightenTimer = useRef<ReturnType<typeof setTimeout>>();

  const handleTurn = (index: number) => {
    if (loose) return;
    setScrewRotations((prev) => {
      const next = [...prev];
      next[index] += 90;
      const totalTurns = next.reduce((sum, deg) => sum + deg / 90, 0);
      if (totalTurns >= LOOSEN_THRESHOLD) {
        setLoose(true);
        clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => {
          setLoose(false);
          setScrewRotations([0, 0, 0, 0]);
          setRetightened(true);
          clearTimeout(retightenTimer.current);
          retightenTimer.current = setTimeout(() => setRetightened(false), 1400);
        }, 2600);
      }
      return next;
    });
  };

  return (
    <section id="brands" className="py-14 md:py-28 bg-blueprint-deep grid-blueprint section-animate">
      <div className="container mx-auto px-4">
        <div className="mono-label text-[11px] text-yellow/80 mb-4">Authorized Distributor</div>
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-10 md:mb-16 max-w-xl">
          Genuine products, direct from three manufacturers
        </h2>

        {/* Featured Partner — Parker, as a nameplate bolted to the panel.
            It stays pinned (no hover lift) — the corner screws are the
            interactive element instead of the whole plate moving. */}
        <Link
          ref={featuredSpotlightRef}
          to="/brands/parker-hannifin"
          onClick={(e) => {
            if (loose) e.preventDefault();
          }}
          aria-disabled={loose}
          className={`spotlight-card group relative block bg-white p-8 md:p-10 mb-8 max-w-[640px] transition-transform ${
            loose ? "animate-plate-wobble cursor-default" : ""
          }`}
        >
          {SCREW_POSITIONS.map((position, index) => (
            <PanelScrew key={position} position={position} rotation={screwRotations[index]} onTurn={() => handleTurn(index)} />
          ))}
          <div
            className={`pointer-events-none absolute left-1/2 -bottom-9 -translate-x-1/2 whitespace-nowrap mono-label text-[10px] text-yellow bg-blueprint-deep/95 border border-yellow/40 px-3 py-1.5 transition-all duration-300 ${
              loose || retightened ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {loose ? "Bolted for a reason. Nice try, engineer. 🔩" : "Re-tightened. Back to spec. ✓"}
          </div>
          <div className="flex flex-col gap-5 px-2">
            <img src={parkerDistributor} alt="Parker Authorized Distributor" className="h-14 w-auto object-contain object-left" />
            <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              Parker Hannifin Corporation
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Authorized distributor of Parker Hannifin since 2004, supplying Seals,
              Bearing Isolators, Filtration, Pneumatic Products, Fluid Connectors, and Hose Pipes
              across India's industrial sector.
            </p>
          </div>
        </Link>

        {/* Other authorized brands */}
        <div className="grid md:grid-cols-2 gap-4">
          {otherBrands.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand} index={index} />
          ))}
        </div>
        <p className="mono-label text-[10px] text-white/55 mt-6">
          Additional authorized brands may be added as new distributorships are confirmed
        </p>
      </div>
    </section>
  );
};

export default BrandsSection;
