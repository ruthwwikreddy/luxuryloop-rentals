
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExclusiveFleet from "@/components/ExclusiveFleet";
import BookingProcess from "@/components/BookingProcess";
import PartnerSection from "@/components/PartnerSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-luxury-black text-white overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <WhyChooseUs />
      <ExclusiveFleet />
      <BookingProcess />
      <PartnerSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
