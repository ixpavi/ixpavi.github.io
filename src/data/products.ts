import hydraulicsImg from "@/assets/products/hydraulic-systems.jpg";
import filtrationImg from "@/assets/products/filtration.jpg";
import valvesImg from "@/assets/products/valves-fittings.jpg";
import hosesImg from "@/assets/products/hoses-tubing.jpg";
import sealsImg from "@/assets/products/seals-orings.avif";
import pumpsImg from "@/assets/products/pumps-motors.jpg";
import pneumaticCylindersImg from "@/assets/products/pneumatic-components.jpg";
import emiShieldingImg from "@/assets/products/seals-shielding.jpg";
import coatingsFlooringImg from "@/assets/products/coatings-flooring.jpg";

export interface Product {
  slug: string;
  code: string;
  title: string;
  description: string;
  detail: string;
  applications: string[];
  brand: string;
  alt: string;
  image: string;
}

export const products: Product[] = [
  {
    slug: "hydraulic-systems",
    code: "CAT/01",
    title: "Hydraulic Systems",
    description: "Cylinders, pumps, motors, and complete hydraulic solutions",
    detail:
      "Complete hydraulic power transmission components — cylinders, pumps, and motors — for applications where precise, high-force motion control is required.",
    applications: ["Mobile & industrial machinery", "Power plant auxiliary systems", "Material handling equipment"],
    brand: "Parker Hannifin",
    alt: "Parker Hannifin Hydraulic Systems, Cylinders, Pumps, and Motors",
    image: hydraulicsImg,
  },
  {
    slug: "filtration",
    code: "CAT/02",
    title: "Filtration",
    description: "Industrial filters for hydraulic, air, and fuel applications",
    detail:
      "Filtration components that protect hydraulic, pneumatic, and fuel systems from contamination — extending equipment life and reducing unplanned downtime.",
    applications: ["Hydraulic fluid filtration", "Compressed air treatment", "Fuel & lubrication systems"],
    brand: "Parker Hannifin",
    alt: "Industrial Filtration Systems for Hydraulic, Air, and Fuel Applications",
    image: filtrationImg,
  },
  {
    slug: "valves-fittings",
    code: "CAT/03",
    title: "Valves & Fittings",
    description: "Precision valves, connectors, and fluid control components",
    detail:
      "Precision valves and fluid connectors for directing, regulating, and isolating flow across hydraulic and pneumatic circuits.",
    applications: ["Flow & pressure control", "Process piping", "Instrumentation systems"],
    brand: "Parker Hannifin",
    alt: "Precision Industrial Valves, Fittings, Connectors, and Fluid Control Components",
    image: valvesImg,
  },
  {
    slug: "hoses-tubing",
    code: "CAT/04",
    title: "Hoses & Tubing",
    description: "Industrial hoses, tubes, and fluid conveyance systems",
    detail:
      "Industrial hoses and tubing rated for hydraulic and pneumatic pressure, conveying fluids and gases safely between components.",
    applications: ["Hydraulic power circuits", "Pneumatic control lines", "Fluid transfer systems"],
    brand: "Parker Hannifin",
    alt: "Industrial Hoses, Tubing, and Fluid Conveyance Systems",
    image: hosesImg,
  },
  {
    slug: "seals-orings",
    code: "CAT/05",
    title: "Seals & O-Rings",
    description: "Precision sealing solutions for all applications",
    detail:
      "Precision seals and O-rings that maintain pressure integrity and prevent leakage across hydraulic, pneumatic, and process equipment.",
    applications: ["Cylinder & pump sealing", "Static & dynamic sealing", "Process equipment"],
    brand: "Parker Hannifin",
    alt: "Precision Industrial Seals, O-Rings, and Sealing Solutions",
    image: sealsImg,
  },
  {
    slug: "pumps-motors",
    code: "CAT/06",
    title: "Pumps & Motors",
    description: "High-performance pumps and hydraulic motors",
    detail:
      "Hydraulic pumps and motors that convert mechanical and fluid power for driving equipment across industrial and mobile applications.",
    applications: ["Mobile equipment drives", "Industrial power units", "Process pumping systems"],
    brand: "Parker Hannifin",
    alt: "High-Performance Hydraulic Pumps and Motors",
    image: pumpsImg,
  },
  {
    slug: "pneumatic-components",
    code: "CAT/07",
    title: "Pneumatic Components",
    description: "Pneumatic cylinders, actuators, and control components",
    detail:
      "Pneumatic cylinders, actuators, and control components for compressed-air-driven motion and automation.",
    applications: ["Automation & motion control", "Process actuation", "Plant air systems"],
    brand: "Parker Hannifin",
    alt: "Industrial Pneumatic Cylinders, Actuators, and Control Components",
    image: pneumaticCylindersImg,
  },
  {
    slug: "seals-shielding",
    code: "CAT/08",
    title: "Seals & Bearing Isolators",
    description: "Precision seals and bearing isolators",
    detail:
      "Bearing isolators and precision seals that protect rotating equipment in demanding environments.",
    applications: ["Rotating equipment protection", "Motors & gearboxes"],
    brand: "Parker Hannifin",
    alt: "Precision Seals and Bearing Isolators",
    image: emiShieldingImg,
  },
  {
    slug: "coatings-flooring",
    code: "CAT/09",
    title: "Industrial Coatings & Flooring",
    description: "High-build specialty coatings, wear-resistant products, and flooring systems from Demech",
    detail:
      "High-build specialty coatings and flooring systems from Demech Chemical, engineered for wear resistance and long-term protection of industrial surfaces.",
    applications: ["Warehouse & plant flooring", "Equipment protective coatings", "Wear & abrasion resistance"],
    brand: "Demech Chemical Products",
    alt: "Industrial Epoxy Coated Warehouse Flooring",
    image: coatingsFlooringImg,
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
