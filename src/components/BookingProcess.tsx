
import { CircleCheck, CarFront, Shield, Calendar, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: <CarFront className="h-12 w-12 text-luxury-gold" />,
    title: "Choose Your Dream Car",
    description: "Browse our exclusive collection of luxury vehicles and select the perfect car that matches your style and needs."
  },
  {
    icon: <Shield className="h-12 w-12 text-luxury-gold" />,
    title: "Verify & Prepay Securely",
    description: "Complete a simple verification process and secure your booking with our safe, encrypted payment system."
  },
  {
    icon: <CircleCheck className="h-12 w-12 text-luxury-gold" />,
    title: "Drive Luxury with Confidence",
    description: "Receive your car at your preferred location and enjoy an unparalleled driving experience with our premium support."
  }
];

const BookingProcess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState({
    date: "",
    category: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchParams.date) {
      toast({
        variant: "destructive",
        title: "Date is required",
        description: "Please select a date for your rental."
      });
      return;
    }
    
    // Navigate to fleet page with query parameters
    const queryParams = new URLSearchParams();
    if (searchParams.date) queryParams.set("date", searchParams.date);
    if (searchParams.category) queryParams.set("category", searchParams.category);
    
    navigate(`/fleet?${queryParams.toString()}`);
    
    toast({
      title: "Searching available cars",
      description: "Showing cars available on your selected date."
    });
  };

  return (
    <section id="booking" className="py-20 bg-luxury-darkgray">
      <div className="luxury-container">
        <div className="text-center mb-16">
          <h2 className="section-title">Booking Process</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Experience our seamless three-step luxury journey to get behind the wheel of your dream car.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold/30 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 inline-flex p-6 rounded-full bg-luxury-black gold-border gold-glow relative z-10">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-luxury-gold text-black flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>

                <div className="glass-card p-8 rounded-lg gold-border h-full">
                  <h3 className="font-playfair text-xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Ready to experience luxury on the road? Book your dream car now and elevate your journey.
          </p>
          <div className="glass-card p-8 rounded-lg gold-border inline-block">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold" />
                <input
                  type="date"
                  name="date"
                  value={searchParams.date}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-luxury-black border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                  placeholder="Select Date"
                />
              </div>
              <div>
                <select 
                  name="category"
                  value={searchParams.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-luxury-black border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold appearance-none"
                >
                  <option value="">Select Car Category</option>
                  <option value="Supercar">Supercar</option>
                  <option value="Luxury Sedan">Luxury Sedan</option>
                  <option value="Luxury SUV">Luxury SUV</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Sports Car">Sports Car</option>
                  <option value="Grand Tourer">Grand Tourer</option>
                </select>
              </div>
              <button type="submit" className="btn-luxury w-full flex items-center justify-center gap-2">
                <Search className="h-4 w-4" />
                Search Availability
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
