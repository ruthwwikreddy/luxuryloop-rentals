
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-luxury-darkgray relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      
      <div className="luxury-container relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="section-title">Shape the Future of Luxury Mobility</h2>
          <p className="text-white/70">
            Connect with us for exclusive partnerships, investment opportunities, and special inquiries. We're expanding across India's major metropolises.
          </p>
        </div>

        <div className="glass-card rounded-lg gold-border p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                Exclusive Partnerships & Inquiries
              </h3>
              <p className="text-white/70 mb-6">
                For high-value partnerships, fleet onboarding, and strategic collaborations, connect directly with our founder.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium">WhatsApp / Call</p>
                    <p className="text-luxury-gold">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-luxury-gold">hemant@luxuryloop.in</p>
                  </div>
                </div>
              </div>

              <div className="space-x-4">
                <Button variant="outline" className="btn-outline-luxury">
                  Investor Relations
                </Button>
                <Button className="btn-luxury">
                  Schedule a Call
                </Button>
              </div>
            </div>

            <div className="bg-luxury-black p-6 rounded-lg gold-border">
              <h4 className="font-playfair text-xl font-semibold text-white mb-4">
                Quick Inquiry
              </h4>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-3 bg-luxury-darkgray border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 bg-luxury-darkgray border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 bg-luxury-darkgray border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold appearance-none">
                    <option value="">Select Inquiry Type</option>
                    <option value="investor">Investor Relations</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="media">Media Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full px-4 py-3 bg-luxury-darkgray border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                  ></textarea>
                </div>
                <Button className="btn-luxury w-full">
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
