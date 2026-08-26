import type { CSSProperties } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import parkerDistributor from "@/assets/parker-distributor.png";
import nbcLogo from "@/assets/brands/nbc-logo.png";
import demechLogo from "@/assets/brands/demech-logo.png";

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

const BrandsSection = () => {
  return (
    <section id="brands" className="py-24 md:py-28 bg-blueprint-deep grid-blueprint section-animate">
      <div className="container mx-auto px-4">
        <div className="mono-label text-[11px] text-yellow/80 mb-4">Authorized Distributor</div>
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-16 max-w-xl">
          Genuine products, direct from three manufacturers
        </h2>

        {/* Featured Partner — Parker, as a nameplate bolted to the panel */}
        <Link
          to="/brands/parker-hannifin"
          className="group relative block bg-white p-8 md:p-10 mb-8 max-w-[640px] hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-blueprint-deep/20" />
          <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-blueprint-deep/20" />
          <span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-blueprint-deep/20" />
          <span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-blueprint-deep/20" />
          <div className="flex flex-col gap-5 px-2">
            <img src={parkerDistributor} alt="Parker Authorized Distributor" className="h-14 w-auto object-contain object-left" />
            <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              Parker Hannifin Corporation
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Authorized distributor of Parker Hannifin since 2004, supplying Seals &amp; Shielding,
              Bearing Isolators, Filtration, Pneumatic Products, Fluid Connectors, and Hose Pipes
              across India's industrial sector.
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              {["Genuine Products", "Authorized Since 2004", "Technical Support"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-foreground text-xs mono-label">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* Other authorized brands */}
        <div className="grid md:grid-cols-2 gap-4">
          {otherBrands.map((brand, index) => (
            <Link
              to={`/brands/${brand.slug}`}
              key={brand.name}
              className="stagger-item group relative block bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
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
