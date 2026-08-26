import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductBySlug, products } from "@/data/products";

const CatalogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const index = products.findIndex((p) => p.slug === product.slug);
  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[68px]">
        {/* Breadcrumb strip */}
        <div className="bg-blueprint-deep grid-blueprint">
          <div className="container mx-auto px-4 py-6">
            <Link
              to="/#products"
              className="mono-label text-[11px] text-yellow/80 hover:text-yellow inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Catalog
            </Link>
          </div>
        </div>

        {/* Spec sheet */}
        <div className="bg-background grid-paper py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="aspect-[4/3] overflow-hidden border border-border">
                <img src={product.image} alt={product.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="mono-label text-[11px] text-primary/70 mb-4">{product.code}</div>
                <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
                  {product.title}
                </h1>
                <div className="mono-label text-xs text-primary mb-6">Supplied via {product.brand}</div>
                <p className="text-muted-foreground leading-relaxed mb-8">{product.detail}</p>

                <div className="dim-line mb-8" />

                <h2 className="mono-label text-[11px] text-muted-foreground mb-4">Typical Applications</h2>
                <ul className="space-y-3 mb-10">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-start gap-3 text-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                      {app}
                    </li>
                  ))}
                </ul>

                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-yellow text-blueprint-deep hover:bg-primary hover:text-primary-foreground transition-colors font-semibold mono-label text-xs px-6 py-3"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Prev / next index navigation */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 grid grid-cols-2">
            <Link
              to={`/catalog/${prev.slug}`}
              className="group flex flex-col items-start gap-1 py-6 pr-4 border-r border-border hover:bg-secondary transition-colors"
            >
              <span className="mono-label text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
                <ArrowLeft className="w-3 h-3" /> {prev.code}
              </span>
              <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {prev.title}
              </span>
            </Link>
            <Link
              to={`/catalog/${next.slug}`}
              className="group flex flex-col items-end gap-1 py-6 pl-4 text-right hover:bg-secondary transition-colors"
            >
              <span className="mono-label text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
                {next.code} <ArrowRight className="w-3 h-3" />
              </span>
              <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {next.title}
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogDetail;
