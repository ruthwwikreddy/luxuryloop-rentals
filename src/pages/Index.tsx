
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExclusiveFleet from "@/components/ExclusiveFleet";
import BookingProcess from "@/components/BookingProcess";
import PartnerSection from "@/components/PartnerSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <WhyChooseUs />
      <ExclusiveFleet />
      <BookingProcess />
      <PartnerSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
