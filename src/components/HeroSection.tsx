
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add a small delay to ensure smooth animation on load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("why-choose-us");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/80 to-transparent z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1770&auto=format&fit=crop"
        >
          <source
            src="https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8f963368f67e4&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 flex flex-col justify-center items-center h-full text-center px-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-7xl font-bold mb-6 max-w-4xl mx-auto">
          <span className="block text-white mb-2 transition-transform duration-700 delay-100 transform translate-y-0 opacity-100">Drive Prestige.</span>
          <span className="block gold-gradient-text animate-shine transition-transform duration-700 delay-300 transform translate-y-0 opacity-100">Rent Luxury.</span>
          <span className="block text-white mt-2 transition-transform duration-700 delay-500 transform translate-y-0 opacity-100">Own the Experience.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-700">
          India's first Peer-to-Peer Luxury Car Rental Marketplace. Experience the extraordinary with handpicked elite vehicles.
        </p>
        
        <Button className="btn-luxury text-lg px-8 py-6 group hover-scale transition-all duration-300 delay-1000 hover:gold-glow">
          Explore Now
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <button 
            onClick={scrollToNextSection}
            className="animate-bounce hover:text-luxury-gold transition-colors duration-300 p-2 rounded-full hover:bg-luxury-gold/10"
          >
            <ChevronDown className="text-luxury-gold h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
