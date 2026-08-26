import { Link } from "react-router-dom";
import { ShieldCheck, Atom, Users, MapPinned, ArrowRight, type LucideIcon } from "lucide-react";
import AnimatedStat from "@/components/AnimatedStat";
import { useTilt } from "@/hooks/use-tilt";

const values = [
  {
    code: "01",
    icon: ShieldCheck,
    title: "Authorized Supply",
    description: "Genuine Parker Hannifin, NBC Bearing, and Demech products, sourced only through official channels.",
  },
  {
    code: "02",
    icon: Atom,
    title: "Critical-Environment Experience",
    description: "Trusted by nuclear, thermal power, and fertilizer plants where reliability isn't optional.",
  },
  {
    code: "03",
    icon: Users,
    title: "Long-Term Relationships",
    description: "Many customer relationships span well over a decade, built on consistent, dependable supply.",
  },
  {
    code: "04",
    icon: MapPinned,
    title: "Regional Reach",
    description: "Serving industrial plants across Rajasthan, Madhya Pradesh, Uttar Pradesh, and Gujarat.",
  },
];

interface ValueCardProps {
  code: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValueCard = ({ code, icon: Icon, title, description }: ValueCardProps) => {
  const tiltRef = useTilt<HTMLDivElement>(5);
  return (
    <div ref={tiltRef} className="plate p-6 card-shadow hover:card-shadow-hover transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
        <span className="mono-label text-[10px] text-muted-foreground/60">Plate {code}</span>
      </div>
      <h3 className="text-base font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-28 bg-background grid-paper section-animate">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <div className="mono-label text-[11px] text-primary/70 mb-4">About — Est. 2004</div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-6 leading-tight">
              Your Trusted Industrial Partner Since 2004
            </h2>
            <p className="text-muted-foreground mb-5 leading-relaxed">
              Since 2004, Yati International Inc. has supplied industrial components to plants
              and organizations across Rajasthan, Madhya Pradesh, Uttar Pradesh, and Gujarat —
              including nuclear power stations, thermal power plants, refineries, fertilizer
              and cement manufacturers, and heavy engineering companies.
            </p>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              As an authorized distributor for Parker Hannifin since 2004, alongside NBC Bearing
              and Demech Chemical Products, we provide genuine components backed by manufacturer
              support — hydraulics, pneumatics, filtration, bearings, and industrial coatings —
              with technical guidance to match the right product to your application.
            </p>

            <div className="dim-line mb-8" />

            <div className="flex flex-wrap gap-10">
              <div>
                <div className="text-3xl font-display font-semibold text-primary"><AnimatedStat value="20+" /></div>
                <div className="mono-label text-[10px] text-muted-foreground mt-1">Years in Business</div>
              </div>
              <div>
                <div className="text-3xl font-display font-semibold text-primary"><AnimatedStat value="2004" /></div>
                <div className="mono-label text-[10px] text-muted-foreground mt-1">Parker Authorized Since</div>
              </div>
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 mt-10 mono-label text-xs text-primary hover:text-foreground transition-colors py-2 -my-2"
            >
              Our Full Story
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Content — Spec-plate values grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
