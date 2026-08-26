import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import heroMotocorp from "@/assets/customers/hero-motocorp.png";
import npcil from "@/assets/customers/npcil.png";
import rvunl from "@/assets/customers/rvunl.webp";
import acc from "@/assets/customers/acc.png";
import gail from "@/assets/customers/gail.svg";
import chambalFertilisers from "@/assets/customers/chambal-fertilisers.png";
import hcc from "@/assets/customers/hcc.svg";
import nfl from "@/assets/customers/nfl.svg";
import adaniPower from "@/assets/customers/adani-power.png";
import mtar from "@/assets/customers/mtar.jpg";
import mangalamCement from "@/assets/customers/mangalam-cement.png";
import pgFoils from "@/assets/customers/pg-foils.jpg";
import avasarala from "@/assets/customers/avasarala.jpg";
import daeHeavyWater from "@/assets/customers/dae-heavy-water.png";
import ultratech from "@/assets/customers/ultratech.svg";
import bharatPetroleum from "@/assets/customers/bharat-petroleum.svg";
import dcmShriram from "@/assets/customers/dcm-shriram.png";
import kayBouvet from "@/assets/customers/kay-bouvet.jpg";

interface Customer {
  name: string;
  logo?: string;
}

const customers: Customer[] = [
  { name: "Rajasthan Atomic Power Station (RAPS), Rawatbhata", logo: npcil },
  { name: "Narora Atomic Power Station (NAPS)", logo: npcil },
  { name: "Kakrapar Atomic Power Station (KAPS)", logo: npcil },
  { name: "Bharat Oman Refinery Ltd.", logo: bharatPetroleum },
  { name: "Chambal Fertilisers and Chemicals Ltd.", logo: chambalFertilisers },
  { name: "Shriram Fertilisers and Chemicals Ltd.", logo: dcmShriram },
  { name: "ACC Lakheri", logo: acc },
  { name: "ACC Kymore", logo: acc },
  { name: "GAIL India Ltd.", logo: gail },
  { name: "Hindustan Construction Company", logo: hcc },
  { name: "Heavy Water Plant, Kota", logo: daeHeavyWater },
  { name: "Mangalam Cement Ltd.", logo: mangalamCement },
  { name: "National Fertilizers Limited (NFL)", logo: nfl },
  { name: "Kota Super Thermal Power Station", logo: rvunl },
  { name: "Chhabra Thermal Power Station", logo: rvunl },
  { name: "Adani Thermal Power", logo: adaniPower },
  { name: "Kalisindh Super Thermal Power Station", logo: rvunl },
  { name: "P.G. Foils Ltd.", logo: pgFoils },
  { name: "Vikram Cement Ltd.", logo: ultratech },
  { name: "Avasarala Engineering Ltd.", logo: avasarala },
  { name: "Chambal Power Ltd." },
  { name: "Hero MotoCorp Ltd.", logo: heroMotocorp },
  { name: "MTAR Technologies", logo: mtar },
  { name: "Kay Bouvet Engineering Ltd.", logo: kayBouvet },
];

const CustomersSection = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 480, behavior: "smooth" });
  };

  return (
    <section id="clients" className="py-14 md:py-28 bg-blueprint-deep grid-blueprint section-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-14">
          <div className="mono-label text-[11px] text-yellow/80 mb-4">Supply Register</div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-5">
            Organizations we've supplied
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Over two decades, we've supplied industrial components to power stations, refineries,
            fertilizer plants, cement manufacturers, and engineering companies across India.
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {customers.map((customer) => (
              <div
                key={customer.name}
                className="snap-start shrink-0 w-[220px] sm:w-[240px] bg-white h-40 flex flex-col items-center justify-center gap-3 p-5 border border-white/10"
              >
                {customer.logo ? (
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-14 max-w-[85%] object-contain"
                  />
                ) : (
                  <div className="font-display font-semibold text-blueprint-deep text-center text-sm leading-snug">
                    {customer.name}
                  </div>
                )}
                {customer.logo && (
                  <div className="text-blueprint-deep font-semibold text-[11px] text-center leading-snug line-clamp-2">
                    {customer.name}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-blueprint-deep border border-yellow/40 text-yellow hover:bg-yellow hover:text-blueprint-deep active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-blueprint-deep border border-yellow/40 text-yellow hover:bg-yellow hover:text-blueprint-deep active:scale-95 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomersSection;
