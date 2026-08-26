import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getIndustryBySlug, industries } from "@/data/industries";

const IndustryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug ?? "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!industry) {
    return <Navigate to="/404" replace />;
  }

  const index = industries.findIndex((i) => i.slug === industry.slug);
  const prev = industries[(index - 1 + industries.length) % industries.length];
  const next = industries[(index + 1) % industries.length];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[68px]">
        <div className="bg-blueprint-deep grid-blueprint">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <Link to="/#industries" className="mono-label text-[11px] text-yellow/80 hover:text-yellow inline-flex items-center gap-2 mb-6 py-2 -my-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
            <div className="mono-label text-[11px] text-yellow/70 mb-3">Sector {industry.code} of 09</div>
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-4 max-w-2xl">{industry.name}</h1>
            <p className="text-white/70 leading-relaxed max-w-2xl">{industry.summary}</p>
          </div>
        </div>

        <div className="bg-background grid-paper py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-8">{industry.description}</p>
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 bg-yellow text-blueprint-deep hover:bg-primary hover:text-primary-foreground transition-colors font-semibold mono-label text-xs px-6 py-3"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div>
                <h2 className="mono-label text-[11px] text-muted-foreground mb-4">What This Sector Needs</h2>
                <ul className="space-y-3">
                  {industry.needs.map((need) => (
                    <li key={need} className="flex items-start gap-3 text-foreground text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                      {need}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="container mx-auto px-4 grid grid-cols-2">
            <Link to={`/industries/${prev.slug}`} className="group flex flex-col items-start gap-1 py-6 pr-4 border-r border-border hover:bg-secondary transition-colors">
              <span className="mono-label text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
                <ArrowLeft className="w-3 h-3" /> {prev.code}
              </span>
              <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{prev.name}</span>
            </Link>
            <Link to={`/industries/${next.slug}`} className="group flex flex-col items-end gap-1 py-6 pl-4 text-right hover:bg-secondary transition-colors">
              <span className="mono-label text-[10px] text-muted-foreground/60 flex items-center gap-1.5">
                {next.code} <ArrowRight className="w-3 h-3" />
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

export default IndustryDetail;
