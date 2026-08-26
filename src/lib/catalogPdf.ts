import jsPDF from "jspdf";
import { catalogCategories, totalCatalogItems } from "@/data/fullCatalog";

const MARGIN = 18;
const PAGE_WIDTH = 210; // A4 mm
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

/** Generates and triggers a download of the full product catalog as a PDF, built directly from the live catalog data. */
export function downloadCatalogPdf() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 0;

  const addFooter = () => {
    const page = doc.getNumberOfPages();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(140);
    doc.text("Yati International Inc. — Authorized Distributor: Parker Hannifin · NBC Bearing · Demech Chemical Products", MARGIN, PAGE_HEIGHT - 10);
    doc.text(String(page), PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 10, { align: "right" });
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - 20) {
      addFooter();
      doc.addPage();
      y = MARGIN;
    }
  };

  // Cover
  doc.setFillColor(15, 30, 48);
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");
  doc.setTextColor(255, 200, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DWG NO. YATI-2004  /  SCALE: PAN-INDIA", MARGIN, 40);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(30);
  doc.text("Complete Parts Index", MARGIN, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(220, 220, 220);
  doc.text(`${totalCatalogItems}+ genuine industrial parts across ${catalogCategories.length} categories`, MARGIN, 72);
  doc.setFontSize(11);
  doc.setTextColor(255, 200, 0);
  doc.text("Authorized Distributor", MARGIN, 90);
  doc.setTextColor(230, 230, 230);
  doc.text("Parker Hannifin Corporation  ·  NBC Bearing  ·  Demech Chemical Products", MARGIN, 97);
  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text(
    [
      "Yati International Inc.",
      "Shop No. S30-S31, Chambal Industrial Area, DCM Road,",
      "Opposite Multimetals Ltd, Kota - 324003 (Raj), India",
      "",
      "Phone: +91 94141 80022 / +91 0744 2480036 / +91 0744 2480037",
      "Email: sales@yatiindia.com",
      "Web: yatiinternational.in",
    ],
    MARGIN,
    250,
  );

  doc.addPage();
  y = MARGIN;

  catalogCategories.forEach((category, catIndex) => {
    ensureSpace(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text(`CAT/${String(catIndex + 1).padStart(2, "0")} — ${category.title}`, MARGIN, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`${category.brand}  ·  ${category.items.length} items`, MARGIN, y);
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 7;

    category.items.forEach((item) => {
      const descLines: string[] = doc.splitTextToSize(item.description, CONTENT_WIDTH);
      ensureSpace(6 + descLines.length * 4.2);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(20, 20, 20);
      doc.text(item.name, MARGIN, y);
      y += 4.6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(90, 90, 90);
      doc.text(descLines, MARGIN, y);
      y += descLines.length * 4.2 + 3;
    });

    y += 4;
  });

  addFooter();
  doc.save("Yati-International-Full-Catalog.pdf");
}
