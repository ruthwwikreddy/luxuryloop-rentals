
import { CircleCheck } from "lucide-react";
import { format } from "date-fns";

interface RentalPolicyProps {
  availableDates: Date[];
}

const RentalPolicy = ({ availableDates }: RentalPolicyProps) => {
  return (
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
      
      {/* Available Dates */}
      <div className="mt-6">
        <h3 className="text-luxury-gold text-lg mb-3">Available Dates</h3>
        <div className="bg-luxury-black/50 p-4 rounded-lg">
          {availableDates.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {availableDates.map((date, index) => (
                <span key={index} className="bg-luxury-gold/20 text-luxury-gold px-3 py-1 rounded-full text-sm">
                  {format(date, 'MMMM d, yyyy')}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-white/70">No dates currently available. Please check back later or contact us.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalPolicy;
