import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, Atom, Users, MapPinned } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedStat from "@/components/AnimatedStat";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const values = [
  { code: "01", icon: ShieldCheck, title: "Authorized Supply", description: "Genuine Parker Hannifin, NBC Bearing, and Demech products, sourced only through official channels." },
  { code: "02", icon: Atom, title: "Critical-Environment Experience", description: "Trusted by nuclear, thermal power, and fertilizer plants where reliability isn't optional." },
  { code: "03", icon: Users, title: "Long-Term Relationships", description: "Many customer relationships span well over a decade, built on consistent, dependable supply." },
  { code: "04", icon: MapPinned, title: "Regional Reach", description: "Serving industrial plants across Rajasthan, Madhya Pradesh, Uttar Pradesh, and Gujarat." },
];

const timeline = [
  { year: "2004", label: "Founded", description: "Yati International Inc. established in Kota, Rajasthan by Rajiv Kumar Sharma, becoming an authorized distributor for Parker Hannifin and beginning supply to nuclear and thermal power stations, where component reliability is non-negotiable." },
  { year: "2010s", label: "Major Clients", description: "Grew into many of our largest long-term customer relationships — including thermal power stations, cement manufacturers, and heavy engineering companies across the region." },
  { year: "2020s", label: "Portfolio Expansion", description: "Added NBC Bearing and Demech Chemical Products to the distributorship, broadening into bearings and industrial coatings." },
  { year: "Today", label: "Regional Partner", description: "Supplying plants across Rajasthan, Madhya Pradesh, Uttar Pradesh, and Gujarat from our base in Kota." },
];

const AboutPage = () => {
  useDocumentMeta(
    "About Yati International | Authorized Parker Hannifin Distributor Since 2004",
    "Since 2004, Yati International has been an authorized Parker Hannifin, NBC Bearing and Demech distributor, supplying engineers and industrial plants across Rajasthan, Madhya Pradesh, Uttar Pradesh and Gujarat.",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[68px]">
        <div className="bg-blueprint-deep grid-blueprint">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <Link to="/" className="mono-label text-[11px] text-yellow/80 hover:text-yellow inline-flex items-center gap-2 mb-6 py-2 -my-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="mono-label text-[11px] text-yellow/70 mb-3">About — Est. 2004</div>
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-4 max-w-2xl">
              Your Trusted Industrial Partner Since 2004
            </h1>
            <p className="text-white/70 leading-relaxed max-w-2xl">
              Two decades supplying genuine industrial components to India's most demanding plants.
            </p>
          </div>
        </div>

        <div className="bg-background grid-paper py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
              <div>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Since 2004, Yati International Inc. has supplied industrial components to plants
                  and organizations across Rajasthan, Madhya Pradesh, Uttar Pradesh, and Gujarat —
                  including nuclear power stations, thermal power plants, refineries, fertilizer
                  and cement manufacturers, and heavy engineering companies.
                </p>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Founded by Rajiv Kumar Sharma as an authorized distributor for Parker Hannifin in
                  2004, we added NBC Bearing and Demech Chemical Products to the distributorship in
                  the 2020s. We provide genuine components backed by manufacturer support —
                  hydraulics, pneumatics, filtration, bearings, and industrial coatings — with
                  technical guidance to match the right product to your application.
                </p>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  We don't just supply parts — we understand the environments they run in. Many of
                  our customer relationships span well over a decade, built on consistent availability
                  and straight technical advice rather than a hard sell.
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
                  <div>
                    <div className="text-3xl font-display font-semibold text-primary"><AnimatedStat value="3" /></div>
                    <div className="mono-label text-[10px] text-muted-foreground mt-1">Authorized Brands</div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value) => (
                  <div key={value.title} className="plate p-6 card-shadow hover:card-shadow-hover transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <value.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                      <span className="mono-label text-[10px] text-muted-foreground/60">Plate {value.code}</span>
                    </div>
                    <h3 className="text-base font-display font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <div className="mono-label text-[11px] text-primary/70 mb-4">Company History</div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-12">Two decades on the ground</h2>
              <div className="relative border-l border-border pl-8 space-y-12">
                {timeline.map((item) => (
                  <div key={item.year} className="relative">
                    <span className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                    <div className="mono-label text-[11px] text-primary mb-1">{item.year}</div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-1">{item.label}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 flex justify-center">
              <Link
                to="/#contact"
                className="group inline-flex items-center gap-3 bg-yellow text-blueprint-deep hover:bg-primary hover:text-primary-foreground transition-colors font-semibold mono-label text-xs px-8 py-4"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
