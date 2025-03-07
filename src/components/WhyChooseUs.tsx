
import { Shield, CreditCard, Clock, Smile } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-10 w-10 text-luxury-gold" />,
    title: "100% Verified Customers",
    description: "Every renter is thoroughly verified for complete peace of mind and secure transactions."
  },
  {
    icon: <CreditCard className="h-10 w-10 text-luxury-gold" />,
    title: "Instant Payouts",
    description: "Car owners receive immediate payments once a booking is confirmed on our platform."
  },
  {
    icon: <Clock className="h-10 w-10 text-luxury-gold" />,
    title: "Prepaid Secure Bookings",
    description: "All bookings are prepaid, ensuring commitment and protecting both parties."
  },
  {
    icon: <Smile className="h-10 w-10 text-luxury-gold" />,
    title: "Zero Upfront Cost for Owners",
    description: "List your luxury vehicle with absolutely no initial cost. Earn as you go."
  }
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-luxury-darkgray">
      <div className="luxury-container">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Experience unmatched luxury car rental services with premium benefits that set us apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-lg gold-border transition-all duration-300 hover:gold-glow group hover:translate-y-[-5px]"
            >
              <div className="mb-6 inline-flex p-3 rounded-full bg-luxury-gold/10 group-hover:bg-luxury-gold/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-playfair text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 glass-card rounded-lg gold-border gold-glow">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="font-playfair text-2xl font-bold text-white mb-2">
                Exclusive Luxury Experience
              </h3>
              <p className="text-white/70 max-w-xl">
                Join over 500+ satisfied clients who have experienced our premium service and driven the car of their dreams.
              </p>
            </div>
            <div className="flex space-x-6">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold gold-gradient-text">1200+</p>
                <p className="text-white/70 text-sm">Successful Rentals</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold gold-gradient-text">98%</p>
                <p className="text-white/70 text-sm">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold gold-gradient-text">50+</p>
                <p className="text-white/70 text-sm">Luxury Models</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
