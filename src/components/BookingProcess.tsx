
import { CircleCheck, CarFront, Shield, Calendar } from "lucide-react";

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 bg-luxury-black border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                  placeholder="Select Date"
                />
              </div>
              <div>
                <select className="w-full px-4 py-3 bg-luxury-black border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold appearance-none">
                  <option value="">Select Car Category</option>
                  <option value="supercar">Supercar</option>
                  <option value="luxury">Luxury Sedan</option>
                  <option value="suv">Luxury SUV</option>
                  <option value="convertible">Convertible</option>
                </select>
              </div>
              <button className="btn-luxury w-full">Search Availability</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
