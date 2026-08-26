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
        <PressureGaugeSection />
        <IndustriesSection />
        <CustomersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
