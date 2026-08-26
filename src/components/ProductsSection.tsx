import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { catalogCategories, totalCatalogItems } from "@/data/fullCatalog";

const brands = Array.from(new Set(catalogCategories.map((c) => c.brand)));

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 md:py-28 bg-secondary section-animate">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
          <div className="max-w-xl">
            <div className="mono-label text-[11px] text-primary/70 mb-4">Catalog</div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
              Industrial Components &amp; Solutions
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A comprehensive range of industrial components from world-leading manufacturers,
              supplied with technical guidance for your application.
            </p>
          </div>
          <div className="mono-label text-[11px] text-muted-foreground shrink-0">
            {totalCatalogItems}+ products &middot; {catalogCategories.length} categories
          </div>
        </div>

        {/* Brand index — dimension-line strip */}
        <div className="border-t border-border">
          {brands.map((brand, index) => {
            const categories = catalogCategories.filter((c) => c.brand === brand);
            const itemCount = categories.reduce((sum, c) => sum + c.items.length, 0);
            return (
              <div
                key={brand}
                className="stagger-item group grid grid-cols-[1fr_auto] sm:grid-cols-[240px_1fr_auto] items-center gap-4 sm:gap-6 py-6 border-b border-border hover:bg-card transition-colors"
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <h3 className="font-display font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{brand}</h3>
                <p className="hidden sm:block text-muted-foreground text-sm truncate">
                  {categories.map((c) => c.title).join(" · ")}
                </p>
                <span className="mono-label text-[11px] text-primary shrink-0">{itemCount} items</span>
              </div>
            );
          })}
        </div>

        {/* CTA to full catalog */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/catalog"
            className="group inline-flex items-center gap-3 bg-yellow text-blueprint-deep hover:bg-primary hover:text-primary-foreground transition-colors font-semibold mono-label text-xs px-8 py-4"
          >
            View Full Product Catalog
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
