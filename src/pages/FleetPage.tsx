
import Layout from "@/components/Layout";
import { useState } from "react";
import { luxuryCars, CarType } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Heart, Share2, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

const FleetPage = () => {
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>(luxuryCars);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(carId => carId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  const filterByCategory = (category: string) => {
    setActiveFilter(category);
    if (category === "all") {
      setFilteredCars(luxuryCars);
    } else {
      setFilteredCars(luxuryCars.filter(car => car.category === category));
    }
  };
  
  // Get unique categories
  const categories = ["all", ...Array.from(new Set(luxuryCars.map(car => car.category)))];
  
  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h1 className="section-title">Our Exclusive Fleet</h1>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Browse our extensive collection of luxury and exotic vehicles. Find the perfect car for your special occasion or extraordinary journey.
            </p>
            
            {/* Search & Filter Bar */}
            <div className="glass-card p-4 rounded-lg mb-10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/70" />
                  <input 
                    type="text" 
                    placeholder="Search by name, brand or category..."
                    className="w-full pl-10 pr-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="btn-outline-luxury flex-shrink-0">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === category
                      ? "bg-luxury-gold text-black"
                      : "bg-luxury-gold/10 text-white hover:bg-luxury-gold/20"
                  }`}
                  onClick={() => filterByCategory(category)}
                >
                  {category === "all" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Car Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
              <div 
                key={car.id}
                className="glass-card rounded-lg overflow-hidden gold-border transition-all duration-500 ease-in-out hover:gold-glow transform hover:-translate-y-2"
                onMouseEnter={() => setHoveredCar(car.id)}
                onMouseLeave={() => setHoveredCar(null)}
              >
                <div className="relative h-48 overflow-hidden">
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
                  <h3 className="font-playfair text-xl font-bold text-white mb-2">{car.name}</h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-luxury-gold mr-1" />
                      <span className="text-white/70 text-sm">Multiple Locations</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <ul className="flex flex-wrap gap-2">
                      {car.specs.slice(0, 2).map((spec, index) => (
                        <li key={index} className="text-white/70 text-sm bg-luxury-gold/10 px-3 py-1 rounded-full hover:bg-luxury-gold/20 transition-colors">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold gold-gradient-text">₹{car.price.toLocaleString()}</span>
                      <span className="text-white/70 ml-1">{car.perDay ? '/day' : ''}</span>
                    </div>
                    <Link to={`/car/${car.id}`}>
                      <Button variant="outline" className="btn-outline-luxury group">
                        Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FleetPage;
