import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Atom, FlaskConical, Flame, Droplet, Zap, Factory, Cog, Wrench, Building2 } from "lucide-react";

const industries = [
  { slug: "nuclear-power", code: "01", icon: Atom, name: "Nuclear Power", description: "Atomic energy stations and associated facilities" },
  { slug: "fertilizer-chemical", code: "02", icon: FlaskConical, name: "Fertilizer & Chemical", description: "Fertilizer and chemical manufacturing plants" },
  { slug: "thermal-power", code: "03", icon: Flame, name: "Thermal Power", description: "Thermal power generation facilities" },
  { slug: "oil-refining", code: "04", icon: Droplet, name: "Oil & Refining", description: "Refineries and petroleum-related facilities" },
  { slug: "gas-energy", code: "05", icon: Zap, name: "Gas & Energy", description: "Gas and energy-sector organizations" },
  { slug: "cement", code: "06", icon: Factory, name: "Cement", description: "Cement manufacturing plants" },
  { slug: "heavy-engineering", code: "07", icon: Cog, name: "Heavy Engineering", description: "Engineering and industrial equipment companies" },
  { slug: "manufacturing-precision-engineering", code: "08", icon: Wrench, name: "Manufacturing & Precision Engineering", description: "Manufacturing and precision-engineering organizations" },
  { slug: "industrial-infrastructure-maintenance", code: "09", icon: Building2, name: "Industrial Infrastructure & Maintenance", description: "Plant operations, machinery, and maintenance applications" },
];

const IndustriesSection = () => {
  return (
    <section id="industries" className="py-14 md:py-28 bg-background grid-paper section-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-10 md:mb-16">
          <div className="mono-label text-[11px] text-primary/70 mb-4">Sectors Served — 09</div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-5">
            Solutions for every industry
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Specialized industrial components and solutions tailored to the unique demands
            of each sector.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {industries.map((industry, index) => (
            <Link
              to={`/industries/${industry.slug}`}
              key={industry.name}
              className="stagger-item group relative bg-background p-6 pt-8 overflow-hidden hover:bg-card transition-colors duration-300"
              style={{ "--stagger-index": index } as CSSProperties}
            >
              <span className="absolute -top-2 -right-1 font-display font-semibold text-[64px] leading-none text-primary/[0.06] group-hover:text-primary/[0.1] transition-colors select-none">
                {industry.code}
              </span>
              <industry.icon className="relative w-6 h-6 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="relative text-base font-display font-semibold text-foreground group-hover:text-primary mb-2 transition-colors">
                {industry.name}
              </h3>
              <p className="relative text-muted-foreground text-sm leading-relaxed">
                {industry.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
