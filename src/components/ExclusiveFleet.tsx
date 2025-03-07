
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

const luxuryCars = [
  {
    id: 1,
    name: "Lamborghini Aventador",
    category: "Supercar",
    price: 50000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1770&auto=format&fit=crop",
    specs: ["700+ HP", "0-100 km/h: 2.9s", "Top Speed: 350 km/h"]
  },
  {
    id: 2,
    name: "Rolls-Royce Phantom",
    category: "Luxury Sedan",
    price: 35000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1631295387882-d88acfaa7473?q=80&w=1770&auto=format&fit=crop",
    specs: ["V12 Engine", "Handcrafted Interior", "Starlight Headliner"]
  },
  {
    id: 3,
    name: "Ferrari 488 Spider",
    category: "Convertible",
    price: 45000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1770&auto=format&fit=crop",
    specs: ["670 HP", "0-100 km/h: 3.0s", "Twin-Turbo V8"]
  },
  {
    id: 4,
    name: "Bentley Continental GT",
    category: "Grand Tourer",
    price: 30000,
    perDay: true,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1770&auto=format&fit=crop",
    specs: ["W12 Engine", "Hand-stitched Leather", "All-Wheel Drive"]
  }
];

const ExclusiveFleet = () => {
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);
  
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
          {luxuryCars.map((car) => (
            <div 
              key={car.id}
              className="glass-card rounded-lg overflow-hidden gold-border transition-all duration-500 ease-in-out"
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
              </div>

              <div className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-white mb-2">{car.name}</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-luxury-gold mr-1" />
                    <span className="text-white/70 text-sm">Multiple Locations</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-luxury-gold mr-1" />
                    <span className="text-white/70 text-sm">Available Now</span>
                  </div>
                </div>

                <div className="mb-4">
                  <ul className="flex flex-wrap gap-2">
                    {car.specs.map((spec, index) => (
                      <li key={index} className="text-white/70 text-sm bg-luxury-gold/10 px-3 py-1 rounded-full">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold gold-gradient-text">₹{car.price.toLocaleString()}</span>
                    <span className="text-white/70 ml-1">{car.perDay ? '/day' : ''}</span>
                  </div>
                  <Button className="btn-luxury">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="btn-outline-luxury">
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveFleet;
