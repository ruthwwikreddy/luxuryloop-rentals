
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Heart, Share2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CarType } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";

const ExclusiveFleet = () => {
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [featuredCars, setFeaturedCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('id', { ascending: true })
          .limit(4);
        
        if (error) {
          throw error;
        }
        
        setFeaturedCars(data || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
        toast({
          title: "Error",
          description: "Failed to load featured cars. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, [toast]);
  
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(carId => carId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  return (
    <section id="exclusive-fleet" className="py-20 bg-luxury-black">
      <div className="luxury-container">
        <div className="text-center mb-16">
          <h2 className="section-title">Exclusive Fleet</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover our handpicked collection of the world's most prestigious automobiles, ready for your next extraordinary journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {loading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="glass-card rounded-lg overflow-hidden gold-border">
                <div className="h-64 bg-luxury-gold/10 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-7 bg-luxury-gold/10 rounded animate-pulse"></div>
                  <div className="flex space-x-4">
                    <div className="h-5 w-28 bg-luxury-gold/10 rounded animate-pulse"></div>
                    <div className="h-5 w-28 bg-luxury-gold/10 rounded animate-pulse"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="h-6 w-20 bg-luxury-gold/10 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="h-8 w-24 bg-luxury-gold/10 rounded animate-pulse"></div>
                    <div className="h-10 w-28 bg-luxury-gold/10 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))
          ) : featuredCars.length === 0 ? (
            <div className="col-span-2 text-center py-10">
              <p className="text-white/70">No cars found in our fleet. Check back soon!</p>
            </div>
          ) : (
            featuredCars.map((car) => (
              <div 
                key={car.id}
                className="glass-card rounded-lg overflow-hidden gold-border transition-all duration-500 ease-in-out hover:gold-glow transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredCar(car.id)}
                onMouseLeave={() => setHoveredCar(null)}
              >
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
                    style={{
                      backgroundImage: `url(${car.image})`,
                      transform: hoveredCar === car.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute top-4 left-4 bg-luxury-gold text-black px-3 py-1 rounded-full text-sm font-medium">
                    {car.category}
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button 
                      className="bg-luxury-black/50 hover:bg-luxury-black p-2 rounded-full transition-colors duration-300"
                      onClick={() => toggleFavorite(car.id)}
                    >
                      <Heart 
                        className={`h-5 w-5 ${favorites.includes(car.id) ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                      />
                    </button>
                    <button className="bg-luxury-black/50 hover:bg-luxury-black p-2 rounded-full transition-colors duration-300">
                      <Share2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-white mb-2">{car.name}</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-luxury-gold mr-1" />
                      <span className="text-white/70 text-sm">
                        {car.locations && car.locations.length > 0 
                          ? car.locations.join(', ') 
                          : 'Multiple Locations'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-luxury-gold mr-1" />
                      <span className="text-white/70 text-sm">Available Now</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <ul className="flex flex-wrap gap-2">
                      {car.specs && car.specs.map((spec, index) => (
                        <li key={index} className="text-white/70 text-sm bg-luxury-gold/10 px-3 py-1 rounded-full hover:bg-luxury-gold/20 transition-colors">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold gold-gradient-text">₹{car.price.toLocaleString()}</span>
                      <span className="text-white/70 ml-1">{car.per_day ? '/day' : ''}</span>
                    </div>
                    <Link to={`/car/${car.id}`}>
                      <Button className="btn-luxury group">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Link to="/fleet">
            <Button variant="outline" className="btn-outline-luxury hover-lift">
              View All Vehicles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveFleet;
