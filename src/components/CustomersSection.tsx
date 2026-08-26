const customers = [
  "Rajasthan Atomic Power Station (RAPS), Rawatbhata",
  "Narora Atomic Power Station (NAPS)",
  "Kakrapar Atomic Power Station (KAPS)",
  "Bharat Oman Refinery Ltd.",
  "Chambal Fertilisers and Chemicals Ltd.",
  "Shriram Fertilisers and Chemicals Ltd.",
  "ACC Lakheri",
  "ACC Kymore",
  "GAIL India Ltd.",
  "Hindustan Construction Company",
  "Heavy Water Plant, Kota",
  "Mangalam Cement Ltd.",
  "National Fertilizers Limited (NFL)",
  "Kota Super Thermal Power Station",
  "Chhabra Thermal Power Station",
  "Adani Thermal Power",
  "Kalisindh Super Thermal Power Station",
  "P.G. Foils Ltd.",
  "Vikram Cement Ltd.",
  "Avasarala Engineering Ltd.",
  "Chambal Power Ltd.",
  "Hero MotoCorp Ltd.",
  "MTAR Technologies",
  "Key Bouvet Engineering Ltd.",
];

const CustomersSection = () => {
  return (
    <section id="customers" className="py-24 md:py-28 bg-blueprint-deep grid-blueprint section-animate">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 max-w-5xl">
          {customers.map((name, i) => (
            <div
              key={name}
              className="flex items-baseline gap-3 py-3 border-b border-white/10"
            >
              <span className="mono-label text-[10px] text-yellow/50 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white/85 text-sm leading-snug">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomersSection;
