import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase";
import { CarType } from "@/types/supabase";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";

const FleetPage = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { toast } = useToast();

  // Fetch cars from Supabase
  useEffect(() => {
    fetchCars();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:cars')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, () => {
        fetchCars();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('name');

      if (error) {
        throw error;
      }

      setCars(data || []);
      setFilteredCars(data || []);

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(data?.map(car => car.category) || []));
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast({
        variant: "destructive",
        title: "Failed to load cars",
        description: "Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter cars when category or search query changes
  useEffect(() => {
    let result = cars;
    
    if (selectedCategory) {
      result = result.filter(car => car.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => 
        car.name.toLowerCase().includes(query) || 
        car.category.toLowerCase().includes(query) ||
        (car.description && car.description.toLowerCase().includes(query))
      );
    }
    
    setFilteredCars(result);
  }, [selectedCategory, searchQuery, cars]);

  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black">
        <div className="luxury-container">
          <div className="mb-12">
            <h1 className="section-title">Explore Our Luxury Fleet</h1>
            <p className="text-white/70">
              Experience the epitome of luxury with our exclusive collection of high-performance vehicles.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-white">Loading our luxury fleet...</p>
            </div>
          ) : (
            <>
              {/* Category Filters */}
              <div className="mb-8 flex flex-wrap gap-3">
                <button
                  className={`px-4 py-2 rounded-full text-sm ${
                    !selectedCategory
                      ? "bg-luxury-gold text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  onClick={() => setSelectedCategory("")}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm ${
                      selectedCategory === category
                        ? "bg-luxury-gold text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Search by name, category or description..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-luxury-gold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Fleet Grid */}
              {filteredCars.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white text-lg">No cars found matching your search criteria.</p>
                  <button
                    className="mt-4 text-luxury-gold underline"
                    onClick={() => {
                      setSelectedCategory("");
                      setSearchQuery("");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCars.map((car) => (
                    <Link to={`/car/${car.id}`} key={car.id} className="block">
                      <div className="glass-card rounded-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                        <div className="relative h-52">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-luxury-gold text-black px-3 py-1 rounded-full text-sm font-medium">
                              {car.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-white text-xl font-medium">{car.name}</h3>
                          <div className="flex justify-between items-end mt-4">
                            <div>
                              <p className="text-white/50">Starting at</p>
                              <p className="text-2xl font-bold gold-gradient-text">
                                ₹{car.price.toLocaleString()}
                                <span className="text-white/70 text-sm ml-1">
                                  {car.per_day ? "/day" : ""}
                                </span>
                              </p>
                            </div>
                            <button className="gold-border px-4 py-2 rounded-lg font-medium text-luxury-gold">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FleetPage;
