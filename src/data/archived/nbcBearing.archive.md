# Archived — NBC Bearing

**Status:** Removed from the live site on 2026-08-29 at the user's request ("remove
nbc bearing fully from the website because we have removed so remove nbc"). NBC
Bearing is no longer an authorized distributorship — pulled from the brand list,
catalog, footer, hero copy, About page/timeline, homepage products grid, and all
meta descriptions. Do NOT re-add any of this to the live site unless the user
explicitly asks for it back.

Below is everything as it stood at the time of removal, so it can be restored
quickly if asked.

## Brand entry (was in src/data/brands.ts)

```ts
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
```

## Homepage brand card (was in src/components/BrandsSection.tsx)

```ts
import nbcLogo from "@/assets/brands/nbc-logo.png";

{
  slug: "nbc-bearing",
  name: "NBC Bearing",
  note: "Part of the CK Birla Group",
  products: "All types of industrial bearings",
  logo: nbcLogo,
},
```

## Homepage products grid entry (was in src/data/products.ts)

```ts
import bearingsImg from "@/assets/products/bearings.jpg";

{
  slug: "bearings",
  code: "CAT/09",
  title: "Bearings",
  description: "Full range of industrial bearings, supplied via NBC Bearing",
  detail:
    "The full NBC Bearing range — ball, roller, and specialty bearings — for rotating machinery across automotive, railway, and industrial applications.",
  applications: ["Rotating machinery", "Motors & gearboxes", "Conveyor & material handling systems"],
  brand: "NBC Bearing",
  alt: "Sealed Industrial Ball Bearings",
  image: bearingsImg,
},
```
(coatings-flooring was renumbered from CAT/10 to CAT/09 after this was removed.)

## Full catalog category (was in src/data/fullCatalog.ts)

Imports:
```ts
import bearingsImg from "@/assets/products/bearings.jpg"; // still used elsewhere? check before restoring
import nbcBallBearings from "@/assets/products/nbc/ball-bearings.png";
import nbcThrustBall from "@/assets/products/nbc/thrust-ball.png";
import nbcCylindricalRoller from "@/assets/products/nbc/cylindrical-roller.png";
import nbcTaperRoller from "@/assets/products/nbc/taper-roller.png";
import nbcWheelHub from "@/assets/products/nbc/wheel-hub.png";
import nbcClutchRelease from "@/assets/products/nbc/clutch-release.png";
```

Category object:
```ts
{
  slug: "bearings",
  title: "Bearings",
  brand: "NBC Bearing",
  image: bearingsImg,
  intro:
    "India's leading bearing manufacturer since 1946 — deep groove, angular contact, thrust, self-aligning and specialty bearings across a portfolio from 6 mm bore to 2,000 mm outer diameter.",
  items: [
    { name: "Deep Groove Ball Bearings", description: "General-purpose ball bearings for radial and moderate axial loads across motors, gearboxes and general machinery.", image: nbcBallBearings },
    { name: "Angular Contact Ball Bearings", description: "Ball bearings designed to handle combined radial and axial loads in one direction, for pumps and precision spindles.", image: nbcBallBearings },
    { name: "Thrust Ball Bearings", description: "Bearings designed specifically for axial load support in vertical-shaft applications.", image: nbcThrustBall },
    { name: "Self-Aligning Ball Bearings", description: "Ball bearings that accommodate shaft misalignment and deflection in demanding mounting conditions.", image: nbcBallBearings },
    { name: "Cylindrical Roller Bearings", description: "High radial-load-capacity roller bearings for heavy machinery, motors and gearboxes.", image: nbcCylindricalRoller },
    { name: "Taper Roller Bearings", description: "Bearings supporting combined radial and axial loads, widely used in automotive wheel hubs and industrial gearboxes.", image: nbcTaperRoller },
    { name: "Spherical Roller Bearings", description: "Self-aligning roller bearings for heavy radial loads with shaft misalignment tolerance, used in mills and crushers." },
    { name: "Needle Roller Bearings", description: "Compact roller bearings with a thin cross-section for high radial load capacity in limited space." },
    { name: "Railway Bearings (incl. Insulated Traction Motor Bearings)", description: "Bearings engineered for railway axle and traction-motor duty, including electrically insulated variants." },
    { name: "Wheel Hub Bearing Units", description: "Preset, pre-lubricated hub bearing assemblies for automotive and light-commercial-vehicle wheel ends.", image: nbcWheelHub },
    { name: "Clutch Release Bearings", description: "Bearings engineered for the clutch-release mechanism in manual-transmission vehicles.", image: nbcClutchRelease },
  ],
},
```

(All image files themselves were left in place on disk — `src/assets/brands/nbc-logo.png`,
`src/assets/products/bearings.jpg`, and `src/assets/products/nbc/*` — not deleted, just
unreferenced.)

## Other places NBC Bearing was mentioned (text trimmed, not archived verbatim — just search "NBC" in git history at this commit to see exact prior wording)

- Footer "Authorized" field: was "Parker Hannifin · NBC Bearing · Demech Chemical Products"
- Hero section copy and stat "3 Authorized Brands" (now "2")
- About section / About page copy, timeline "2020s" entry, and stat "3 Authorized Brands" (now "2")
- Industry detail page meta description
- Full catalog page meta title/description
- catalogPdf.ts cover page and footer text
- index.html meta description, keywords, og/twitter tags
- public/sitemap.xml `/brands/nbc-bearing` entry
