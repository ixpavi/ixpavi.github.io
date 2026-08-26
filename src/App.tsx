import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FullCatalog from "./pages/FullCatalog";
import CatalogDetail from "./pages/CatalogDetail";
import BrandDetail from "./pages/BrandDetail";
import IndustryDetail from "./pages/IndustryDetail";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import EasterEggs from "./components/EasterEggs";
import ScrollProgress from "./components/ScrollProgress";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <EasterEggs />
      <ScrollProgress />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
