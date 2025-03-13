
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Heart, Share2, Shield, ChevronRight, CircleCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { CarType } from "@/types/supabase";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarType | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    fetchCarDetails();
    
    // Subscribe to real-time changes for the car
    const carChannel = supabase
      .channel('car-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars', filter: `id=eq.${id}` }, () => {
        fetchCarDetails();
      })
      .subscribe();
      
    // Subscribe to real-time changes for available dates
    const availabilityChannel = supabase
      .channel('availability-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'available_dates', filter: `car_id=eq.${id}` }, () => {
        fetchAvailableDates();
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(carChannel);
      supabase.removeChannel(availabilityChannel);
    };
  }, [id]);
  
  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setCar(data);
        fetchAvailableDates();
      } else {
        // Redirect to 404 page if car not found
        window.location.href = "/not-found";
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
      toast({
        variant: "destructive",
        title: "Error loading car details",
        description: "Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchAvailableDates = async () => {
    try {
      const { data, error } = await supabase
        .from('available_dates')
        .select('date')
        .eq('car_id', id);
        
      if (error) {
        throw error;
      }
      
      const dates = data.map(item => new Date(item.date));
      setAvailableDates(dates);
    } catch (error) {
      console.error('Error fetching available dates:', error);
    }
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast({
        title: "Added to favorites",
        description: `${car?.name} has been added to your favorites.`,
      });
    }
  };
  
  const handleBookNow = async () => {
    if (!pickupDate || !returnDate) {
      toast({
        variant: "destructive",
        title: "Please select dates",
        description: "Pickup and return dates are required.",
      });
      return;
    }
    
    // Check if selected dates are available
    const startDate = new Date(pickupDate);
    const endDate = new Date(returnDate);
    
    if (startDate > endDate) {
      toast({
        variant: "destructive",
        title: "Invalid date range",
        description: "Return date must be after pickup date.",
      });
      return;
    }
    
    // Simple validation of dates against available dates
    const isAvailable = availableDates.some(date => 
      date.toISOString().split('T')[0] === pickupDate ||
      date.toISOString().split('T')[0] === returnDate
    );
    
    if (!isAvailable) {
      toast({
        variant: "destructive",
        title: "Date not available",
        description: "Please select from available dates only.",
      });
      return;
    }
    
    setIsBooking(true);
    
    try {
      // Create a booking
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          car_id: Number(id),
          car_name: car?.name || '',
          customer_name: 'Guest User', // In a real app, would be from a form or logged-in user
          customer_email: 'guest@example.com', // In a real app, would be from a form or logged-in user 
          customer_phone: '+1234567890', // In a real app, would be from a form
          start_date: pickupDate,
          end_date: returnDate,
          status: 'pending'
        }])
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Booking successful!",
        description: "Check your email for booking details.",
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        variant: "destructive",
        title: "Booking error",
        description: "Could not process your booking. Please try again.",
      });
    } finally {
      setIsBooking(false);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </Layout>
    );
  }
  
  if (!car) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white">Car not found</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black">
        <div className="luxury-container">
          <div className="mb-8">
            <Link to="/fleet" className="inline-flex items-center text-white/70 hover:text-luxury-gold transition-colors mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fleet
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h1 className="section-title mb-2">{car.name}</h1>
              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleFavorite}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    isFavorite 
                      ? "bg-red-500/20 border border-red-500/50" 
                      : "bg-luxury-gold/10 border border-luxury-gold/30"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-luxury-gold"}`} />
                  <span className={isFavorite ? "text-red-500" : "text-luxury-gold"}>
                    {isFavorite ? "Favorited" : "Add to Favorites"}
                  </span>
                </button>
                <button className="bg-luxury-gold/10 border border-luxury-gold/30 p-2 rounded-full">
                  <Share2 className="h-5 w-5 text-luxury-gold" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-luxury-gold text-black px-3 py-1 rounded-full text-sm font-medium">
                {car.category}
              </span>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-luxury-gold mr-1" />
                <span className="text-white/70 text-sm">
                  {car.locations?.join(", ") || "Multiple Locations"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="md:col-span-2 rounded-lg overflow-hidden gold-border">
              <img 
                src={car.images?.[activeImageIndex] || car.image} 
                alt={car.name} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="flex flex-row md:flex-col gap-3">
              {car.images?.map((image, index) => (
                <div 
                  key={index}
                  className={`rounded-lg overflow-hidden cursor-pointer border transition-all ${
                    activeImageIndex === index ? "border-luxury-gold" : "border-white/10"
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${car.name} - view ${index + 1}`} 
                    className="w-full h-[80px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Car Details & Booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Car Details */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-lg gold-border p-8 mb-8">
                <h2 className="font-playfair text-2xl text-white mb-4">About this {car.name}</h2>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {car.description}
                </p>
                
                {/* Specs */}
                <div className="mb-8">
                  <h3 className="font-playfair text-xl text-white mb-4">Performance & Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {car.specs.map((spec, index) => (
                      <div key={index} className="bg-luxury-gold/10 rounded-lg p-4 flex items-center">
                        <CircleCheck className="h-5 w-5 text-luxury-gold mr-3" />
                        <span className="text-white">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Features */}
                <div>
                  <h3 className="font-playfair text-xl text-white mb-4">Luxury Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {car.features?.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <ChevronRight className="h-5 w-5 text-luxury-gold mr-2" />
                        <span className="text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Rental Policy */}
              <div className="glass-card rounded-lg gold-border p-8">
                <h2 className="font-playfair text-2xl text-white mb-4">Rental Policy</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-luxury-gold text-lg mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CircleCheck className="h-5 w-5 text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Age 25+ with valid driver's license</span>
                      </li>
                      <li className="flex items-start">
                        <CircleCheck className="h-5 w-5 text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Security deposit required</span>
                      </li>
                      <li className="flex items-start">
                        <CircleCheck className="h-5 w-5 text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Insurance verification</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-luxury-gold text-lg mb-3">Includes</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CircleCheck className="h-5 w-5 text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                        <span className="text-white/70">300 km per day (₹150/additional km)</span>
                      </li>
                      <li className="flex items-start">
                        <CircleCheck className="h-5 w-5 text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                        <span className="text-white/70">24/7 roadside assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CircleCheck className="h-5 w-5 text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                        <span className="text-white/70">Comprehensive insurance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-lg gold-border p-6 sticky top-24">
                <div className="mb-6">
                  <h2 className="font-playfair text-2xl text-white mb-2">Book this {car.name}</h2>
                  <p className="text-white/70">
                    Experience the extraordinary - reserve your luxury ride now.
                  </p>
                </div>
                
                <div className="mb-6 flex items-center">
                  <div>
                    <span className="text-3xl font-bold gold-gradient-text">₹{car.price.toLocaleString()}</span>
                    <span className="text-white/70 ml-1">{car.per_day ? '/day' : ''}</span>
                  </div>
                  <div className="ml-auto">
                    <Shield className="h-5 w-5 text-luxury-gold" />
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-white mb-2">Pickup Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/70" />
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Return Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/70" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                        min={pickupDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Pickup Location</label>
                    <select className="w-full px-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold appearance-none">
                      {car.locations?.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Button 
                  className="btn-luxury w-full justify-center group"
                  onClick={handleBookNow}
                  disabled={isBooking}
                >
                  {isBooking ? "Processing..." : "Book Now"}
                  {!isBooking && (
                    <ArrowLeft className="ml-2 h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
                
                <p className="text-white/50 text-sm text-center mt-4">
                  No payment charged yet. You'll pay when you pick up the car.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetailsPage;
