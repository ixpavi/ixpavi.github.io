import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedStat from "@/components/AnimatedStat";
import ValuesSpecSheet from "@/components/ValuesSpecSheet";

const AboutSection = () => {
  return (
    <section id="about" className="py-14 md:py-28 bg-background grid-paper section-animate">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
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
              Founded as an authorized distributor for Parker Hannifin in 2004, we added Demech
              Chemical Products to the distributorship in the 2020s. We provide genuine components
              backed by manufacturer support — hydraulics, pneumatics, filtration, and industrial
              coatings — with technical guidance to match the right product to your application.
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

          {/* Right Content — values as a spec-sheet table */}
          <ValuesSpecSheet />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
