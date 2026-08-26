# Archived — EMI Shielding / Parker Chomerics category

**Status:** Removed from the live site on 2026-08-26 at the user's request. We are
not currently confirmed to sell/distribute Parker Chomerics EMI shielding products
— this was pulled from the catalog, brand list, and industry copy until that's
verified. Do NOT re-add any of this to the live site unless the user explicitly
asks for it back.

Below is the exact catalog category object and its image imports as they were in
`src/data/fullCatalog.ts` at the time of removal, so it can be restored quickly if
asked.

## Imports (were in fullCatalog.ts)

```ts
import emiSheetStock from "@/assets/products/parker/emi/sheet-stock.jpg";
import emiSolidOShape from "@/assets/products/parker/emi/solid-o-shape.jpg";
import emiWaveguide from "@/assets/products/parker/emi/waveguide.jpg";
import emiInterfacial from "@/assets/products/parker/emi/interfacial.jpg";
import emiDSubminiature from "@/assets/products/parker/emi/d-subminiature.jpg";
import emiJamNut from "@/assets/products/parker/emi/jam-nut.jpg";
import emiChoSeal1212 from "@/assets/products/parker/emi/cho-seal-1212.jpg";
import emiChoSeal1221 from "@/assets/products/parker/emi/cho-seal-1221.jpg";
```

(The image files themselves were left in place at `src/assets/products/parker/emi/` —
not deleted from disk, just unreferenced.)

## Catalog category object

```ts
{
  slug: "emi-shielding-seals",
  title: "EMI Shielding",
  brand: "Parker Chomerics",
  image: emiSheetStock,
  intro:
    "Parker Chomerics keeps high-powered electronics performing at their best with a broad line of EMI shielding solutions, including gaskets and conductive adhesives.",
  items: [
    { name: "Conductive Elastomer Sheet Stock Gaskets", description: "CHO-SEAL® electrically conductive elastomer gasket sheets that can be cut to size to make precision parts or quantities.", image: emiSheetStock },
    { name: "Solid-O Shape Conductive Elastomer Extruded Gaskets", description: "Electrically conductive elastomer extruded gaskets available in various CHO-SEAL® materials.", image: emiSolidOShape },
    { name: "Hollow-O Shape Conductive Elastomer Extruded Gaskets", description: "Electrically conductive elastomer extruded gaskets available in various CHO-SEAL® materials." },
    { name: "Solid-D Shape Conductive Extruded Elastomer Gaskets", description: "Electrically conductive elastomer extruded gaskets available in various CHO-SEAL® elastomer materials." },
    { name: "Hollow-D Shape Conductive Extruded Elastomer Gaskets", description: "Electrically conductive elastomer extruded gaskets available in various CHO-SEAL® elastomer materials." },
    { name: "Channel Shape Conductive Elastomer Extruded Gaskets", description: "Electrically conductive elastomer extruded gaskets available in various CHO-SEAL® elastomer materials." },
    { name: "Rectangular Strip Conductive Elastomer Extruded Gaskets", description: "Electrically conductive elastomer extruded gaskets available in various CHO-SEAL® elastomer materials." },
    { name: "P-Shape Conductive Elastomer Extruded Gaskets", description: "Electrically conductive elastomer extruded gaskets available in various CHO-SEAL® elastomer materials." },
    { name: "Conductive Elastomer Co-Extruded Gaskets with Weather Seal", description: "CHO-SEAL® co-extruded and co-molded dual gaskets containing both conductive and non-conductive elements for environmental sealing and corrosion protection." },
    { name: "Conductive Elastomer Jam Nut EMI Seals", description: "Available in various CHO-SEAL conductive elastomer materials, providing a moisture and pressure seal with EMI shielding; interchangeable with standard Mil Spec sizing.", image: emiJamNut },
    { name: "Conductive Elastomer D-Subminiature Gaskets", description: "Constructed from CHO-SEAL® conductive elastomer to provide EMI shielding and environmental sealing between connector flanges and mating surfaces.", image: emiDSubminiature },
    { name: "Conductive Elastomer Waveguide Gaskets", description: "CHO-SEAL® conductive waveguide EMI gasket materials providing effective shielding and pressure sealing for choke, cover and contact flanges.", image: emiWaveguide },
    { name: "Conductive Elastomer Interfacial Gaskets", description: "Interfacial elastomer EMI seals provide an EMI shield and environmental seal at the intersection of two housing faces for a secure mating joint.", image: emiInterfacial },
    { name: "Conductive Elastomer Mounting Flange Gaskets", description: "Used between connector flanges and mounting bulkheads to provide an environmental seal and EMI shield." },
    { name: "Molded In-Place Cover Seals", description: "CHO-SEAL® molded-in-place gaskets formed onto covers, permitting an optimum seal profile that eliminates the need for adhesive and maximizes shielding effectiveness." },
    { name: "Conductive Elastomer Molded Reinforced Seals", description: "CHO-SEAL® reinforced conductive/non-conductive elastomer seals with a corrosion-resistant base, reinforced with woven or knitted fabric or wire mesh." },
    { name: "O-Ring Shape Conductive Elastomer Molded Gaskets", description: "Electrically conductive elastomer molded gaskets available in various CHO-SEAL® elastomer materials." },
    { name: "D-Ring Shape Conductive Elastomer Molded Gaskets", description: "Electrically conductive elastomer molded gaskets available in various CHO-SEAL® elastomer materials." },
    { name: "CHO-SEAL 1212 Conductive Elastomer Gasket", description: "Silver-plated copper filler in silicone binder. 120 dB typical shielding, hard (80 Shore A) material for waveguide, choke, cover and grooved flanges.", image: emiChoSeal1212 },
    { name: "CHO-SEAL 1215 Conductive Elastomer Gasket", description: "Silver-plated copper filler in silicone binder. 105–120 dB shielding, resists highest EMP-induced current; military gasket of choice in non-corrosive environments." },
    { name: "CHO-SEAL 1217 Conductive Elastomer Gasket", description: "Silver-plated copper filler in fluorosilicone binder. 105–120 dB shielding with excellent processing for molding and extrusion." },
    { name: "CHO-SEAL 1221 Conductive Elastomer Gasket", description: "Silver filler in fluorosilicone binder. >120 dB shielding — highest shielding effectiveness and through-conductivity performance; also available fabric-reinforced.", image: emiChoSeal1221 },
  ],
},
```

## Other places EMI/Chomerics text was trimmed from (2026-08-26)

- `src/data/brands.ts` — Parker's `description` mentioned "EMI shielding and precision seals (Chomerics)"; `categories` list had "EMI Shielding & Precision Seals".
- `src/data/industries.ts` — one industry's `needs` list had "EMI shielding for control electronics".
- `src/data/products.ts` — the legacy `seals-shielding` (CAT/08) category description mentioned "EMI/RFI shielding components"; trimmed to just bearing isolators & precision seals wording (that card itself was NOT deleted, since bearing isolators/seals may still be a real Parker offering — only the EMI/RFI-specific wording was removed).

## To restore

Re-add the imports + category object above back into `src/data/fullCatalog.ts` (imports near the other `parker/emi/...` area, category object in the `catalogCategories` array), and reverse the small text trims listed above.
