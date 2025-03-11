
import { useState } from "react";
import { Calendar, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { CarType } from "@/types/supabase";
import { useAvailability } from "@/hooks/use-availability";

interface BookingFormProps {
  car: CarType;
  carId: number;
}

const BookingForm = ({ car, carId }: BookingFormProps) => {
  const [isBooking, setIsBooking] = useState(false);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();
  const { getAvailableDatesForCar, isDateAvailable } = useAvailability();
  
  const availableDates = getAvailableDatesForCar(carId);

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
    if (pickupDate > returnDate) {
      toast({
        variant: "destructive",
        title: "Invalid date range",
        description: "Return date must be after pickup date.",
      });
      return;
    }
    
    // Format dates to string for checking availability
    const pickupDateStr = pickupDate.toISOString().split('T')[0];
    const returnDateStr = returnDate.toISOString().split('T')[0];
    
    // Check if the dates are available
    if (!isDateAvailable(carId, pickupDateStr) || !isDateAvailable(carId, returnDateStr)) {
      toast({
        variant: "destructive",
        title: "Date not available",
        description: "One or both of your selected dates aren't available. Please select from available dates only.",
      });
      return;
    }
    
    setIsBooking(true);
    
    try {
      // Create a booking in Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          car_id: carId,
          car_name: car.name,
          customer_name: 'Guest User', 
          customer_email: 'guest@example.com',
          customer_phone: '+1234567890',
          start_date: pickupDateStr,
          end_date: returnDateStr,
          status: 'pending'
        }]);
        
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

  return (
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal border-luxury-gold/30 bg-luxury-black/50 hover:bg-luxury-black/70",
                    !pickupDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 text-luxury-gold" />
                  {pickupDate ? format(pickupDate, "MMMM d, yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  modifiers={{
                    available: availableDates
                  }}
                  modifiersClassNames={{
                    available: "border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold/20"
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-white mb-2">Return Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal border-luxury-gold/30 bg-luxury-black/50 hover:bg-luxury-black/70",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 text-luxury-gold" />
                  {returnDate ? format(returnDate, "MMMM d, yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  modifiers={{
                    available: availableDates
                  }}
                  modifiersClassNames={{
                    available: "border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold/20"
                  }}
                />
              </PopoverContent>
            </Popover>
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
          disabled={isBooking || availableDates.length === 0}
        >
          {isBooking ? "Processing..." : (availableDates.length === 0 ? "No Available Dates" : "Book Now")}
          {!isBooking && availableDates.length > 0 && (
            <ArrowLeft className="ml-2 h-5 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
        
        <p className="text-white/70 text-sm text-center mt-4">
          No payment charged yet. You'll pay when you pick up the car.
        </p>
      </div>
    </div>
  );
};

export default BookingForm;
