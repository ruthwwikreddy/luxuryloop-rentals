
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
import { Loader2 } from "lucide-react";

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
      {loading ? (
        <div className="glass-card p-6 rounded-lg text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-luxury-gold mb-4" />
          <p className="text-white">Loading booking options...</p>
        </div>
      ) : featuredCar ? (
        <BookingProcess car={featuredCar} />
      ) : (
        <div className="glass-card p-6 rounded-lg text-center">
          <p className="text-white">No vehicles available for booking at this time.</p>
        </div>
      )}
      <PartnerSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
