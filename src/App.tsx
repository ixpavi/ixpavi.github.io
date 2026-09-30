import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EasterEggs from "./components/EasterEggs";
import ScrollProgress from "./components/ScrollProgress";

// Code-split every route except the homepage, so a first-time visitor
// only downloads the JS the homepage actually needs (e.g. the catalog
// page's PDF-export dependency never loads unless someone visits /catalog).
const FullCatalog = lazy(() => import("./pages/FullCatalog"));
const CatalogDetail = lazy(() => import("./pages/CatalogDetail"));
const BrandDetail = lazy(() => import("./pages/BrandDetail"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-6 h-6 text-primary animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <EasterEggs />
      <ScrollProgress />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<FullCatalog />} />
            <Route path="/catalog/:slug" element={<CatalogDetail />} />
            <Route path="/brands/:slug" element={<BrandDetail />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/about" element={<AboutPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
