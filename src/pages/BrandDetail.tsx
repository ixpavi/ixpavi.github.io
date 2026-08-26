import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBrandBySlug, brands } from "@/data/brands";

const BrandDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = getBrandBySlug(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!brand) {
    return <Navigate to="/404" replace />;
  }

  const index = brands.findIndex((b) => b.slug === brand.slug);
  const prev = brands[(index - 1 + brands.length) % brands.length];
  const next = brands[(index + 1) % brands.length];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[68px]">
        <div className="bg-blueprint-deep grid-blueprint">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <Link to="/#brands" className="mono-label text-[11px] text-yellow/80 hover:text-yellow inline-flex items-center gap-2 mb-6 py-2 -my-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="mono-label text-[11px] text-yellow/70 mb-3">{brand.since}</div>
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-4 max-w-2xl">{brand.name}</h1>
            <p className="text-white/70 leading-relaxed max-w-2xl">{brand.tagline}</p>
          </div>
        </div>

        <div className="bg-background grid-paper py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
              <div>
                {brand.description.map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-5">
                    {para}
                  </p>
                ))}

                <div className="dim-line my-8" />

                <div className="flex flex-wrap gap-4">
                  {brand.highlights.map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-foreground text-xs mono-label">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mono-label text-[11px] text-muted-foreground mb-4">Product Categories</h2>
                <div className="border-t border-border">
                  {brand.categories.map((cat) => (
                    <div key={cat} className="py-3.5 border-b border-border text-foreground text-sm">
                      {cat}
                    </div>
                  ))}
                </div>
                <Link
                  to="/catalog"
                  className="mt-8 inline-flex items-center gap-2 bg-yellow text-blueprint-deep hover:bg-primary hover:text-primary-foreground transition-colors font-semibold mono-label text-xs px-6 py-3"
                >
                  Browse Full Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="container mx-auto px-4 grid grid-cols-2">
            <Link to={`/brands/${prev.slug}`} className="group flex flex-col items-start gap-1 py-6 pr-4 border-r border-border hover:bg-secondary transition-colors">
              <span className="mono-label text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{prev.name}</span>
            </Link>
            <Link to={`/brands/${next.slug}`} className="group flex flex-col items-end gap-1 py-6 pl-4 text-right hover:bg-secondary transition-colors">
              <span className="mono-label text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{next.name}</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrandDetail;
