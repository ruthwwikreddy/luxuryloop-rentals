
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExclusiveFleet from "@/components/ExclusiveFleet";
import BookingProcess from "@/components/BookingProcess";
import PartnerSection from "@/components/PartnerSection";
import ContactSection from "@/components/ContactSection";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CarType } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [featuredCar, setFeaturedCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedCar = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('id', { ascending: true })
          .limit(1)
          .single();
        
        if (error) {
          throw error;
        }
        
        setFeaturedCar(data);
      } catch (error) {
        console.error('Error fetching featured car:', error);
        toast({
          title: "Error",
          description: "Failed to load featured car. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedCar();
  }, [toast]);

  return (
    <Layout>
      <HeroSection />
      <WhyChooseUs />
      <ExclusiveFleet />
      {featuredCar && <BookingProcess car={featuredCar} />}
      <PartnerSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
