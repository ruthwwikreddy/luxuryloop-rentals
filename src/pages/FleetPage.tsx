
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { luxuryCars, CarType } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Heart, Share2, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FleetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hoveredCar, setHoveredCar] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>(luxuryCars);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  
  // Get query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get("date");
    const categoryParam = queryParams.get("category");
    
    if (dateParam) {
      setDateFilter(dateParam);
    }
    
    if (categoryParam && categoryParam !== "all") {
      setActiveFilter(categoryParam);
      filterCars(categoryParam, searchQuery, dateParam || "");
    } else {
      filterCars("all", searchQuery, dateParam || "");
    }
  }, [location.search]);
  
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(carId => carId !== id));
      toast({
        title: "Removed from favorites",
        description: "This car has been removed from your favorites."
      });
    } else {
      setFavorites([...favorites, id]);
      toast({
        title: "Added to favorites",
        description: "This car has been added to your favorites."
      });
    }
  };
  
  const shareCar = (car: CarType) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this ${car.name}`,
        text: `I found this amazing ${car.name} on LuxuryLoop!`,
        url: window.location.origin + `/car/${car.id}`
      })
      .then(() => console.log('Share successful'))
      .catch((error) => console.log('Share failed', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.origin + `/car/${car.id}`);
      toast({
        title: "Link copied",
        description: "Car link has been copied to clipboard."
      });
    }
  };
  
  const filterCars = (category: string, query: string, date: string) => {
    setActiveFilter(category);
    
    let tempFilteredCars = luxuryCars;
    
    // Filter by category
    if (category !== "all") {
      tempFilteredCars = tempFilteredCars.filter(car => car.category === category);
    }
    
    // Filter by search query
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      tempFilteredCars = tempFilteredCars.filter(car => 
        car.name.toLowerCase().includes(lowerCaseQuery) ||
        car.category.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Filter by date (in a real app, this would check availability)
    if (date) {
      // For demo purposes, we'll just show a toast notification
      if (tempFilteredCars.length > 0) {
        toast({
          title: "Showing available cars",
          description: `Showing cars available on ${new Date(date).toLocaleDateString()}`
        });
      }
    }
    
    setFilteredCars(tempFilteredCars);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterCars(activeFilter, query, dateFilter);
  };
  
  const handleCategoryFilter = (category: string) => {
    // Update URL with new query params
    const params = new URLSearchParams(location.search);
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    navigate(`${location.pathname}?${params.toString()}`);
    
    filterCars(category, searchQuery, dateFilter);
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
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search by name, brand or category..."
                    className="w-full pl-10 pr-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                
                {dateFilter && (
                  <div className="flex items-center bg-luxury-gold/10 px-4 py-2 rounded-md">
                    <Calendar className="h-4 w-4 text-luxury-gold mr-2" />
                    <span className="text-white">
                      {new Date(dateFilter).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <button 
                      className="ml-2 text-luxury-gold hover:text-white transition-colors"
                      onClick={() => {
                        setDateFilter("");
                        const params = new URLSearchParams(location.search);
                        params.delete("date");
                        navigate(`${location.pathname}?${params.toString()}`);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
                
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
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category === "all" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Car Grid */}
          {filteredCars.length > 0 ? (
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
                      <button 
                        className="bg-luxury-black/50 hover:bg-luxury-black p-2 rounded-full transition-colors duration-300"
                        onClick={() => shareCar(car)}
                      >
                        <Share2 className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-white mb-2">{car.name}</h3>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-luxury-gold mr-1" />
                        <span className="text-white/70 text-sm">
                          {car.locations?.join(", ") || "Multiple Locations"}
                        </span>
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
          ) : (
            <div className="glass-card p-12 rounded-lg text-center">
              <h2 className="text-2xl font-playfair text-white mb-4">No cars found</h2>
              <p className="text-white/70 mb-6">
                We couldn't find any cars matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <Button 
                className="btn-luxury" 
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                  setDateFilter("");
                  setFilteredCars(luxuryCars);
                  navigate("/fleet");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FleetPage;
