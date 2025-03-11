
import { useState } from "react";
import { Shield, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import CalendarWithAvailability from "@/components/common/CalendarWithAvailability";

interface RentalPolicyProps {
  availableDates: Date[];
}

const RentalPolicy = ({ availableDates }: RentalPolicyProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  return (
    <div className="glass-card rounded-lg gold-border p-8 mb-8">
      <h2 className="font-playfair text-2xl text-white flex items-center mb-6">
        <Shield className="mr-2 h-6 w-6 text-luxury-gold" />
        Rental Policy & Availability
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-white font-medium mb-4">Key Policies</h3>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-luxury-gold mr-2 flex-shrink-0 mt-0.5" />
              <span>Minimum rental period: 24 hours</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-luxury-gold mr-2 flex-shrink-0 mt-0.5" />
              <span>Security deposit required (refundable)</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-luxury-gold mr-2 flex-shrink-0 mt-0.5" />
              <span>Valid driver's license required</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-luxury-gold mr-2 flex-shrink-0 mt-0.5" />
              <span>Minimum age: 25 years</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-luxury-gold mr-2 flex-shrink-0 mt-0.5" />
              <span>Insurance included in rental price</span>
            </li>
            <li className="flex items-start">
              <AlertCircle className="h-5 w-5 text-luxury-gold mr-2 flex-shrink-0 mt-0.5" />
              <span>Fuel policy: Return with full tank</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white font-medium mb-4">Availability Calendar</h3>
          {availableDates.length > 0 ? (
            <div>
              <p className="text-white/70 mb-4">
                Calendar shows dates when this vehicle is available for rent.
              </p>
              <CalendarWithAvailability
                label="Check Availability"
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                availableDates={availableDates}
              />
              {selectedDate && (
                <p className="text-luxury-gold mt-3">
                  {format(selectedDate, "MMMM d, yyyy")} is available for booking!
                </p>
              )}
            </div>
          ) : (
            <div className="bg-luxury-black/50 rounded-lg p-6 border border-luxury-gold/20">
              <p className="text-white/70 text-center">
                No availability data for this vehicle. Please contact our concierge service.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalPolicy;
