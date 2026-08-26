import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import BrandsSection from "@/components/BrandsSection";
import AboutSection from "@/components/AboutSection";
import PressureGaugeSection from "@/components/PressureGaugeSection";
import IndustriesSection from "@/components/IndustriesSection";
import CustomersSection from "@/components/CustomersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import HowWeWork from "@/components/HowWeWork";
import IndiaMap from "@/components/IndiaMap";

const Index = () => {
  useScrollReveal();
  useHashScroll();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <BrandsSection />
        <AboutSection />
        <HowWeWork />
        <PressureGaugeSection />
        <IndustriesSection />
        <CustomersSection />
        <section className="py-10 md:py-20 bg-blueprint-deep grid-blueprint">
          <div className="container mx-auto px-4">
            <div className="mono-label text-[11px] text-yellow/80 mb-4 text-center">Regional Presence</div>
            <IndiaMap />
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
