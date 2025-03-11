
import { useState, useEffect } from "react";
import { ArrowRight, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CarType } from "@/types/supabase";
import { useCars } from "@/hooks/use-cars";

interface RelatedCarsProps {
  currentCarId: number;
  category: string;
}

const RelatedCars = ({ currentCarId, category }: RelatedCarsProps) => {
  const [relatedCars, setRelatedCars] = useState<CarType[]>([]);
  const { cars } = useCars();
  
  useEffect(() => {
    // Filter cars by same category but exclude current car
    const filtered = cars
      .filter(car => car.category === category && car.id !== currentCarId)
      .slice(0, 3); // Limit to 3 related cars
      
    setRelatedCars(filtered);
  }, [cars, category, currentCarId]);
  
  if (relatedCars.length === 0) return null;
  
  return (
    <div className="glass-card rounded-lg gold-border p-8 mb-8">
      <h2 className="font-playfair text-2xl text-white flex items-center mb-6">
        <Car className="mr-2 h-6 w-6 text-luxury-gold" />
        Similar Vehicles
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCars.map((car) => (
          <Link to={`/car/${car.id}`} key={car.id} className="group">
            <div className="rounded-lg overflow-hidden gold-border hover:gold-glow transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-luxury-black to-transparent h-1/2" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium truncate group-hover:text-luxury-gold transition-colors">
                  {car.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-luxury-gold font-bold">₹{car.price.toLocaleString()}</span>
                  <span className="text-white/70 text-sm">{car.category}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link to="/fleet">
          <Button variant="outline" className="btn-outline-luxury">
            View All Vehicles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedCars;
