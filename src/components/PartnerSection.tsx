
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Mehta",
    role: "Ferrari 488 Owner",
    text: "LuxuryLoop has transformed my Ferrari from a weekend indulgence to a profitable asset. The platform handles everything seamlessly, and I'm impressed with the quality of clients.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Bentley Continental Owner",
    text: "Listing my Bentley was the best decision I made. The verification process ensures only qualified drivers, and payments are always on time. Truly a premium service for premium cars.",
    rating: 5
  },
  {
    name: "Vikram Singh",
    role: "Rolls-Royce Ghost Owner",
    text: "As someone who values discretion and professionalism, LuxuryLoop exceeds expectations. My Rolls-Royce is handled with the respect it deserves, and the returns are substantial.",
    rating: 5
  }
];

const PartnerSection = () => {
  return (
    <section id="partner" className="py-20 bg-luxury-black">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="section-title">Partner With Us</h2>
            <p className="text-white/70 mb-8">
              Join India's most exclusive network of luxury car owners and transform your prestigious vehicle into a lucrative asset with zero upfront costs.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-luxury-gold flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-2">
                    Exclusive Marketplace
                  </h3>
                  <p className="text-white/70">
                    List your luxury vehicle on India's premier P2P platform catering exclusively to high-net-worth individuals.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-luxury-gold flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-2">
                    Premium Earnings
                  </h3>
                  <p className="text-white/70">
                    Earn substantially more than traditional rental agencies with our competitive commission structure.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-luxury-gold flex items-center justify-center text-black font-bold text-sm mr-4 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-semibold text-white mb-2">
                    Complete Peace of Mind
                  </h3>
                  <p className="text-white/70">
                    Benefit from our comprehensive insurance coverage, thorough renter verification, and 24/7 concierge support.
                  </p>
                </div>
              </div>
            </div>

            <Button className="btn-luxury text-lg px-8 py-6 group">
              Join the Inner Circle
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="glass-card rounded-lg gold-border p-8">
            <h3 className="font-playfair text-2xl font-bold text-white mb-6 text-center">
              Success Stories
            </h3>

            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-luxury-darkgray p-6 rounded-lg gold-border"
                >
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-luxury-gold text-luxury-gold" />
                    ))}
                  </div>
                  <p className="text-white/80 italic mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-playfair text-white font-semibold">{testimonial.name}</p>
                    <p className="text-luxury-gold text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
