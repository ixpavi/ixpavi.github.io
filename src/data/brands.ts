export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  since: string;
  summary: string;
  description: string[];
  highlights: string[];
  categories: string[];
}

export const brands: Brand[] = [
  {
    slug: "parker-hannifin",
    name: "Parker Hannifin Corporation",
    tagline: "Motion & control technologies",
    since: "Authorized since 2004",
    summary:
      "Authorized distributor of Parker Hannifin since 2004, supplying hydraulics, pneumatics, filtration, and seals across India's industrial sector.",
    description: [
      "Parker Hannifin is one of the world's largest motion and control technology companies, engineering precision components for industries where failure isn't an option — from power generation to aerospace.",
      "Yati International has been an authorized distributor of Parker Hannifin since 2004, sourcing genuine components through official channels and backing every supply with manufacturer-grade technical guidance.",
      "Our Parker range spans hydraulic cylinders, pumps and motors, filtration and fluid purification, directional and proportional valves, pneumatic components, hoses and tubing, and O-ring sealing solutions.",
    ],
    highlights: ["Genuine Products", "Authorized Since 2004", "Technical Support", "Manufacturer-Backed Warranty"],
    categories: [
      "Hydraulic Cylinders",
      "Hydraulic Pumps & Motors",
      "Hydraulic Filters & Fluid Purification",
      "Hydraulic Valves",
      "Pneumatic Components",
      "Hoses & Tubing",
      "O-Rings & Sealing",
    ],
  },
  {
    slug: "nbc-bearing",
    name: "NBC Bearing",
    tagline: "Part of the CK Birla Group",
    since: "India's leading bearing manufacturer since 1946",
    summary: "All types of industrial bearings — deep groove, angular contact, thrust, taper, and specialty bearings.",
    description: [
      "NBC Bearing is the brand of National Engineering Industries Ltd. (NEI), India's leading bearing manufacturer and exporter since 1946, and part of the CK Birla Group.",
      "NBC is the only bearing manufacturer in the world to win both the Deming Application Award and the Deming Grand Prize for Total Quality Management — a mark of manufacturing discipline that carries through to every bearing that ships.",
      "Yati International supplies the full NBC range for rotating machinery, motors, gearboxes, railway axles, and automotive wheel ends across the industrial plants we serve.",
    ],
    highlights: ["Est. 1946", "Deming Grand Prize Winner", "Part of CK Birla Group", "3,100+ Bearing Variants"],
    categories: ["Deep Groove & Angular Contact Ball Bearings", "Cylindrical & Taper Roller Bearings", "Spherical & Needle Roller Bearings", "Railway & Traction Motor Bearings", "Wheel Hub Bearing Units", "Clutch Release Bearings"],
  },
  {
    slug: "demech-chemical",
    name: "Demech Chemical Products Pvt. Ltd.",
    tagline: "Industrial coatings & flooring",
    since: "Specialty coating systems",
    summary: "High-build specialty coatings, wear & abrasion-resistant products, and flooring systems.",
    description: [
      "Demech Chemical offers a wide range of high-build epoxy coatings, glass flake coatings, chemical-resistant coatings, and floor coatings engineered for the toughest industrial environments.",
      "Their product line is built around 100% solids, solvent-free compound systems — chosen for equipment protection in cement plants, fertilizer units, and process industries where downtime is expensive.",
      "Yati International supplies Demech's coating and lining systems alongside application-specific solutions for tank rehabilitation, pipe lining, pump repair, and structural protection.",
    ],
    highlights: ["100% Solids Systems", "Solvent-Free Compounds", "Wear & Abrasion Resistant", "Chemical Process Grade"],
    categories: ["Glass Flake & Ceramic Coatings", "Polyurethane & Protective Coatings", "Chemical Resistant Coatings", "Floor Coatings", "Crusher & Backing Compounds", "FGD Lining Systems"],
  },
];

export const getBrandBySlug = (slug: string) => brands.find((b) => b.slug === slug);
