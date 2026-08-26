export interface Industry {
  slug: string;
  code: string;
  name: string;
  summary: string;
  description: string;
  needs: string[];
}

export const industries: Industry[] = [
  {
    slug: "nuclear-power",
    code: "01",
    name: "Nuclear Power",
    summary: "Atomic energy stations and associated facilities",
    description:
      "Atomic energy stations demand components certified to the tightest tolerances, where a single point of failure has consequences far beyond downtime. We've supplied hydraulic and sealing components to Rajasthan Atomic Power Station, Narora Atomic Power Station, and Kakrapar Atomic Power Station, and to the Heavy Water Plant in Kota.",
    needs: ["Certified hydraulic cylinders and valves for critical systems", "High-integrity seals and O-rings", "EMI shielding for control electronics", "Traceable, authorized-channel sourcing"],
  },
  {
    slug: "fertilizer-chemical",
    code: "02",
    name: "Fertilizer & Chemical",
    summary: "Fertilizer and chemical manufacturing plants",
    description:
      "Fertilizer and chemical plants run corrosive processes around the clock, where filtration, sealing, and coating failures translate directly into lost production. We've supplied Chambal Fertilisers and Chemicals, Shriram Fertilisers and Chemicals, and National Fertilizers Limited.",
    needs: ["Chemical-resistant coatings and linings", "Filtration for corrosive process fluids", "Pump and valve components rated for aggressive media", "Tank rehabilitation and protection systems"],
  },
  {
    slug: "thermal-power",
    code: "03",
    name: "Thermal Power",
    summary: "Thermal power generation facilities",
    description:
      "Thermal power stations run continuous, high-load hydraulic and pneumatic systems where reliability directly affects grid supply. We've supplied Kota Super Thermal Power Station, Chhabra Thermal Power Station, Adani Thermal Power, and Kalisindh Super Thermal Power Station.",
    needs: ["Heavy-duty hydraulic cylinders for ash-handling and coal systems", "High-pressure filtration", "Bearings for turbine and conveyor systems", "FGD lining for flue gas desulphurisation units"],
  },
  {
    slug: "oil-refining",
    code: "04",
    name: "Oil & Refining",
    summary: "Refineries and petroleum-related facilities",
    description:
      "Refineries run continuous, hazardous processes where hydraulic, sealing, and coating components must hold up under sustained pressure and chemical exposure. We've supplied Bharat Oman Refinery Ltd.",
    needs: ["Process-rated valves and fittings", "Chemical-resistant sealing solutions", "Protective coatings for structural steel and tanks", "Fluid conveyance hoses rated for petroleum products"],
  },
  {
    slug: "gas-energy",
    code: "05",
    name: "Gas & Energy",
    summary: "Gas and energy-sector organizations",
    description:
      "Gas transmission and energy infrastructure depend on components engineered for continuous, unattended operation across long distances. We've supplied GAIL India Ltd.",
    needs: ["Pipe linings, strengthening and repair systems", "Precision valves for flow control", "Industrial bearings for compressor and pumping stations", "Corrosion-resistant coatings"],
  },
  {
    slug: "cement",
    code: "06",
    name: "Cement",
    summary: "Cement manufacturing plants",
    description:
      "Cement plants run abrasive, high-wear equipment continuously, where bearing and coating failures are among the most common causes of unplanned downtime. We've supplied ACC Lakheri, ACC Kymore, Mangalam Cement, and Vikram Cement.",
    needs: ["Heavy-duty bearings for kilns and crushers", "Crusher and backing compounds", "Wear and abrasion-resistant coatings", "Conveyor and rubber liner repair systems"],
  },
  {
    slug: "heavy-engineering",
    code: "07",
    name: "Heavy Engineering",
    summary: "Engineering and industrial equipment companies",
    description:
      "Heavy engineering companies build and maintain the equipment that other industries depend on, requiring a broad, dependable component supply chain. We've supplied Hindustan Construction Company and Avasarala Engineering Ltd.",
    needs: ["Full-range hydraulic and pneumatic components", "Custom cylinder configurations", "Bearing and sealing solutions across equipment lines", "Technical guidance for component matching"],
  },
  {
    slug: "manufacturing-precision-engineering",
    code: "08",
    name: "Manufacturing & Precision Engineering",
    summary: "Manufacturing and precision-engineering organizations",
    description:
      "Precision manufacturers need components that perform to exact specification, run after run. We've supplied Hero MotoCorp Ltd., MTAR Technologies, and Key Bouvet Engineering Ltd.",
    needs: ["Precision pneumatic actuators and cylinders", "Compact hydraulic components for tight envelopes", "Precision bearings for automated machinery", "Consistent, quality-assured supply"],
  },
  {
    slug: "industrial-infrastructure-maintenance",
    code: "09",
    name: "Industrial Infrastructure & Maintenance",
    summary: "Plant operations, machinery, and maintenance applications",
    description:
      "Every plant depends on maintenance teams keeping machinery running — and that means fast access to genuine spare parts, seals, and repair compounds. We support plant operations and maintenance teams across all the sectors we serve, including P.G. Foils Ltd. and Chambal Power Ltd.",
    needs: ["MRO coatings and repair compounds", "Spare seals, O-rings, and filtration elements", "Pump and heat exchanger repair systems", "Responsive, locally-stocked supply"],
  },
];

export const getIndustryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
