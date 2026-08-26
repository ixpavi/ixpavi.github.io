import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, LayoutGrid, List } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { catalogCategories, totalCatalogItems } from "@/data/fullCatalog";
import { useDocumentMeta } from "@/hooks/use-document-meta";

const brands = Array.from(new Set(catalogCategories.map((c) => c.brand)));
const SITE_ORIGIN = "https://yatiinternational.in";

type ViewMode = "grid" | "list";
const VIEW_MODE_KEY = "yati-catalog-view";

const FullCatalog = () => {
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "grid";
    return (localStorage.getItem(VIEW_MODE_KEY) as ViewMode) || "grid";
  });

  // Product structured data so search engines can surface individual items,
  // not just the page as a whole.
  const productListJsonLd = useMemo(() => {
    let position = 0;
    const itemListElement = catalogCategories.flatMap((category) =>
      category.items.map((item) => {
        position += 1;
        const image = item.image ?? category.image;
        return {
          "@type": "ListItem",
          position,
          item: {
            "@type": "Product",
            name: item.name,
            description: item.description,
            image: image.startsWith("http") ? image : `${SITE_ORIGIN}${image}`,
            brand: { "@type": "Brand", name: category.brand },
            category: category.title,
          },
        };
      }),
    );
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Yati International Full Catalog",
      numberOfItems: itemListElement.length,
      itemListElement,
    };
  }, []);

  useDocumentMeta(
    "Full Product Catalog | Parker Hannifin, NBC Bearing & Demech Distributor – Yati International",
    `${totalCatalogItems}+ genuine industrial parts across hydraulics, pneumatics, filtration, valves, bearings and industrial coatings — authorized Parker Hannifin, NBC Bearing and Demech distributor in India.`,
  );

  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleCategories =
    activeBrand === "All" ? catalogCategories : catalogCategories.filter((c) => c.brand === activeBrand);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }} />
      <Header />
      <main className="pt-[68px]">
        {/* Header strip */}
        <div className="bg-blueprint-deep grid-blueprint">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <Link
              to="/#products"
              className="mono-label text-[11px] text-yellow/80 hover:text-yellow inline-flex items-center gap-2 mb-6 py-2 -my-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="mono-label text-[11px] text-yellow/70 mb-3">Full Catalog</div>
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-4">
              Complete Parts Index
            </h1>
            <p className="text-white/70 leading-relaxed max-w-2xl">
              {totalCatalogItems}+ named products across {brands.length} supplier brands, organized by category.
              Every listing below reflects components genuinely available through Yati International's supplier
              network — request a quote for current pricing and lead time.
            </p>
          </div>
        </div>

        {/* Brand filter + view toggle */}
        <div className="border-b border-border bg-background sticky top-[68px] z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 overflow-x-auto py-3 -mx-1 px-1">
                {["All", ...brands].map((b) => (
                  <button
                    key={b}
                    onClick={() => setActiveBrand(b)}
                    className={`mono-label text-[11px] px-3 py-2 whitespace-nowrap transition-colors ${
                      activeBrand === b
                        ? "bg-yellow text-blueprint-deep font-semibold"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              {/* Grid / list view toggle */}
              <div className="flex items-center shrink-0 border border-border">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                  className={`w-9 h-9 flex items-center justify-center transition-colors ${
                    viewMode === "grid" ? "bg-yellow text-blueprint-deep" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                  className={`w-9 h-9 flex items-center justify-center border-l border-border transition-colors ${
                    viewMode === "list" ? "bg-yellow text-blueprint-deep" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category sections */}
        <div className="bg-background grid-paper">
          <div className="container mx-auto px-4 py-14 md:py-16">
            {visibleCategories.map((category, catIndex) => (
              <section key={category.slug} id={category.slug} className="mb-16 last:mb-0 scroll-mt-32">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 pb-6 border-b-2 border-foreground">
                  <div>
                    <div className="mono-label text-[11px] text-primary/70 mb-2">
                      CAT/{String(catIndex + 1).padStart(2, "0")} · {category.brand}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-3">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">{category.intro}</p>
                  </div>
                  <div className="mono-label text-[11px] text-muted-foreground shrink-0">
                    {category.items.length} items
                  </div>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
                    {category.items.map((item) => (
                      <div key={item.name} className="group bg-card hover:bg-secondary transition-colors">
                        <div className="aspect-[4/3] overflow-hidden bg-white">
                          <img
                            src={item.image ?? category.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-display font-semibold text-foreground text-sm mb-2 leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-px bg-border border border-border">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="group bg-card hover:bg-secondary transition-colors flex items-center gap-4 p-3"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden bg-white">
                          <img
                            src={item.image ?? category.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display font-semibold text-foreground text-sm mb-1 leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blueprint-deep grid-blueprint py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
              Don't see what you need?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              This index reflects our core supplier ranges — our full sourcing network extends further.
              Tell us your requirement and we'll confirm availability.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-yellow text-blueprint-deep hover:bg-white transition-colors font-semibold mono-label text-xs px-6 py-3"
            >
              Request a Quote
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FullCatalog;
