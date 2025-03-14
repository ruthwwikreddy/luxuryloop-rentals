
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, CheckCircle, CircleCheck, Loader2 } from "lucide-react";
import { addDays, format, isBefore, isAfter, isEqual } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { CarType } from "@/types/supabase";

interface BookingProcessProps {
  car: CarType;
}

const BookingProcess = ({ car }: BookingProcessProps) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectionType, setSelectionType] = useState<'start' | 'end'>('start');
  
  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('available_dates')
          .select('date')
          .eq('car_id', car.id);
        
        if (error) {
          throw error;
        }
        
        const dates = (data || []).map(item => new Date(item.date));
        setAvailableDates(dates);
      } catch (error) {
        console.error('Error fetching available dates:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch available dates for this car"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvailableDates();
  }, [car.id, toast]);
  
  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.getFullYear() === date.getFullYear() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getDate() === date.getDate()
    );
  };
  
  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return (
      (isAfter(date, startDate) || isEqual(date, startDate)) && 
      (isBefore(date, endDate) || isEqual(date, endDate))
    );
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (selectionType === 'start') {
      setStartDate(date);
      setSelectionType('end');
    } else {
      if (startDate && isBefore(date, startDate)) {
        toast({
          variant: "destructive",
          title: "Invalid selection",
          description: "End date cannot be before start date"
        });
        return;
      }
      setEndDate(date);
      setSelectionType('start');
      setShowCalendar(false);
      setStep(2);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "Date selection required",
        description: "Please select both start and end dates"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Check if dates are still available
      const startDateStr = format(startDate, 'yyyy-MM-dd');
      const endDateStr = format(endDate, 'yyyy-MM-dd');
      
      const { data: existingBookings, error: checkError } = await supabase
        .from('bookings')
        .select('id')
        .eq('car_id', car.id)
        .or(`start_date.eq.${startDateStr},end_date.eq.${endDateStr}`);
      
      if (checkError) {
        throw checkError;
      }
      
      if (existingBookings && existingBookings.length > 0) {
        toast({
          variant: "destructive",
          title: "Dates no longer available",
          description: "Someone just booked these dates. Please select different dates."
        });
        setStep(1);
        return;
      }
      
      // Insert booking
      const { error } = await supabase
        .from('bookings')
        .insert({
          car_id: car.id,
          car_name: car.name,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          start_date: startDateStr,
          end_date: endDateStr,
          status: 'pending'
        });
      
      if (error) {
        throw error;
      }
      
      setBookingConfirmed(true);
      setStep(3);
      
      toast({
        title: "Booking request submitted",
        description: "We will contact you shortly to confirm your booking"
      });
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem submitting your booking request"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-playfair text-2xl text-white mb-2">Select Rental Dates</h3>
              <p className="text-white/70">Choose your preferred rental dates from the available calendar</p>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center btn-outline-luxury"
                  onClick={() => {
                    setShowCalendar(!showCalendar);
                    setSelectionType('start');
                  }}
                >
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-luxury-gold" />
                    <span>{startDate ? `Start: ${format(startDate, 'PPP')}` : 'Select start date'}</span>
                  </div>
                  <div className="ml-auto">
                    {endDate ? `End: ${format(endDate, 'PPP')}` : ''}
                  </div>
                </Button>
                
                {showCalendar && (
                  <div className="border rounded-md shadow-md mt-2 bg-white">
                    <div className="p-2 bg-luxury-gold text-black">
                      <p className="text-center font-medium">
                        {selectionType === 'start' ? 'Select Start Date' : 'Select End Date'}
                      </p>
                      {startDate && selectionType === 'end' && (
                        <p className="text-center text-sm">Start Date: {format(startDate, 'PPP')}</p>
                      )}
                    </div>
                    <Calendar
                      mode="single"
                      selected={selectionType === 'start' ? startDate : endDate}
                      onSelect={handleDateSelect}
                      className="rounded-md border"
                      disabled={[
                        { before: new Date() },
                        (date) => !isDateAvailable(date)
                      ]}
                      modifiers={{
                        selected: (date) => isDateInRange(date),
                        range_start: (date) => startDate ? isEqual(date, startDate) : false,
                        range_end: (date) => endDate ? isEqual(date, endDate) : false
                      }}
                      modifiersClassNames={{
                        selected: "bg-luxury-gold text-black",
                        range_start: "rounded-l-md bg-luxury-gold text-black",
                        range_end: "rounded-r-md bg-luxury-gold text-black"
                      }}
                    />
                    <div className="p-2 flex justify-between text-sm">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-luxury-gold mr-1"></div>
                        <span>Available</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-gray-200 mr-1"></div>
                        <span>Unavailable</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                className="btn-outline-luxury"
                onClick={() => {
                  // Reset the dates and calendar selection
                  setStartDate(undefined);
                  setEndDate(undefined);
                  setShowCalendar(true);
                  setSelectionType('start');
                }}
              >
                Reset
              </Button>
              
              <Button 
                className="btn-luxury"
                onClick={() => {
                  if (!startDate || !endDate) {
                    toast({
                      variant: "destructive",
                      title: "Date selection required",
                      description: "Please select both start and end dates"
                    });
                    return;
                  }
                  setStep(2);
                }}
                disabled={!startDate || !endDate}
              >
                Continue
              </Button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="font-playfair text-2xl text-white mb-2">Your Information</h3>
              <p className="text-white/70">Please provide your contact details to complete the booking request</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  className="input-luxury mt-1"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="input-luxury mt-1"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  className="input-luxury mt-1"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="bg-luxury-gold/10 p-4 rounded-md space-y-2">
                <h4 className="font-medium text-white">Booking Summary</h4>
                <div className="flex justify-between">
                  <span className="text-white/70">Vehicle:</span>
                  <span className="text-white font-medium">{car.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Dates:</span>
                  <span className="text-white font-medium">
                    {startDate && endDate ? `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}` : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Total Days:</span>
                  <span className="text-white font-medium">
                    {startDate && endDate ? 
                      Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 
                      0
                    }
                  </span>
                </div>
                <div className="flex justify-between border-t border-luxury-gold/20 mt-2 pt-2">
                  <span className="text-white/70">Total Amount:</span>
                  <span className="gold-gradient-text font-medium text-lg">
                    ₹{car.per_day && startDate && endDate ? 
                      (car.price * (Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1)).toLocaleString() : 
                      car.price.toLocaleString()
                    }
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="btn-outline-luxury"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                
                <Button 
                  type="submit"
                  className="btn-luxury"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    'Submit Booking Request'
                  )}
                </Button>
              </div>
            </form>
          </div>
        );
        
      case 3:
        return (
          <div className="text-center space-y-6 py-6">
            <CircleCheck className="h-16 w-16 text-green-500 mx-auto" />
            
            <div>
              <h3 className="font-playfair text-2xl text-white mb-2">Booking Request Received!</h3>
              <p className="text-white/70">
                Thank you for your booking request for {car.name}. Our team will review your request
                and contact you shortly to confirm your booking.
              </p>
            </div>
            
            <div className="bg-luxury-gold/10 p-4 rounded-md space-y-2 max-w-sm mx-auto text-left">
              <h4 className="font-medium text-white text-center">Booking Details</h4>
              <div className="flex justify-between">
                <span className="text-white/70">Name:</span>
                <span className="text-white font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Dates:</span>
                <span className="text-white font-medium">
                  {startDate && endDate ? `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}` : 'Not selected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Status:</span>
                <span className="text-yellow-400 font-medium">Pending confirmation</span>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-white/70 mb-4">What happens next?</p>
              <ol className="space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-start">
                  <div className="bg-luxury-gold text-black h-6 w-6 flex items-center justify-center rounded-full mr-2 mt-0.5">1</div>
                  <div className="text-white/70">Our team will verify the availability and prepare your car.</div>
                </li>
                <li className="flex items-start">
                  <div className="bg-luxury-gold text-black h-6 w-6 flex items-center justify-center rounded-full mr-2 mt-0.5">2</div>
                  <div className="text-white/70">You'll receive a confirmation email with payment instructions.</div>
                </li>
                <li className="flex items-start">
                  <div className="bg-luxury-gold text-black h-6 w-6 flex items-center justify-center rounded-full mr-2 mt-0.5">3</div>
                  <div className="text-white/70">Our concierge will contact you to arrange delivery or pickup.</div>
                </li>
              </ol>
            </div>
            
            <Button 
              className="btn-luxury mt-4"
              onClick={() => window.location.href = '/fleet'}
            >
              Explore More Cars
            </Button>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-playfair text-2xl text-white">Book Your Experience</h2>
        
        {/* Step indicator */}
        <div className="flex items-center">
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? 'bg-luxury-gold text-black' : 'bg-white/20 text-white/70'}`}>
            1
          </div>
          <div className={`h-1 w-10 ${step > 1 ? 'bg-luxury-gold' : 'bg-white/20'}`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? 'bg-luxury-gold text-black' : 'bg-white/20 text-white/70'}`}>
            2
          </div>
          <div className={`h-1 w-10 ${step > 2 ? 'bg-luxury-gold' : 'bg-white/20'}`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 3 ? 'bg-luxury-gold text-black' : 'bg-white/20 text-white/70'}`}>
            3
          </div>
        </div>
      </div>
      
      {loading && step === 1 ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-luxury-gold mb-4" />
          <p className="text-white">Loading available dates...</p>
        </div>
      ) : (
        renderStep()
      )}
    </div>
  );
};

export default BookingProcess;
