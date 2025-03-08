
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    inquiryType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || !formState.inquiryType || !formState.message) {
      toast({
        variant: "destructive",
        title: "Form incomplete",
        description: "Please fill in all required fields before submitting."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible."
      });
      
      setFormState({
        name: "",
        email: "",
        inquiryType: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-luxury-darkgray relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      
      <div className="luxury-container relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="section-title">Shape the Future of Luxury Mobility</h2>
          <p className="text-white/70">
            Connect with us for exclusive partnerships, investment opportunities, and special inquiries. We're expanding across India's major metropolises.
          </p>
        </div>

        <div className="glass-card rounded-lg gold-border p-8 md:p-12 max-w-4xl mx-auto hover:gold-glow transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                Exclusive Partnerships & Inquiries
              </h3>
              <p className="text-white/70 mb-6">
                For high-value partnerships, fleet onboarding, and strategic collaborations, connect directly with our founder.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center hover-lift p-2 rounded-lg hover:bg-luxury-gold/5 transition-all duration-300">
                  <div className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-luxury-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium">WhatsApp / Call</p>
                    <p className="text-luxury-gold">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center hover-lift p-2 rounded-lg hover:bg-luxury-gold/5 transition-all duration-300">
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
                <Button 
                  variant="outline" 
                  className="btn-outline-luxury hover-lift"
                  onClick={() => {
                    setFormState({
                      ...formState,
                      inquiryType: "investor"
                    });
                    document.getElementById("inquiry-type")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Investor Relations
                </Button>
                <Button 
                  className="btn-luxury hover-scale"
                  onClick={() => {
                    window.open("https://calendly.com/luxuryloop/call", "_blank");
                    toast({
                      title: "Opening scheduler",
                      description: "You're being redirected to our scheduling page."
                    });
                  }}
                >
                  Schedule a Call
                </Button>
              </div>
            </div>

            <div className="bg-luxury-black p-6 rounded-lg gold-border hover:gold-glow transition-all duration-300">
              <h4 className="font-playfair text-xl font-semibold text-white mb-4">
                Quick Inquiry
              </h4>
              {formSuccess ? (
                <div className="bg-luxury-gold/20 p-4 rounded-lg border border-luxury-gold text-center">
                  <p className="text-white font-medium mb-2">Thank you for your inquiry!</p>
                  <p className="text-white/80">Our team will contact you shortly.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input 
                      type="text" 
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Your Name" 
                      required
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <input 
                      type="email"
                      name="email" 
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="Email Address" 
                      required
                      className="input-luxury"
                    />
                  </div>
                  <div>
                    <select 
                      id="inquiry-type"
                      name="inquiryType"
                      value={formState.inquiryType}
                      onChange={handleInputChange}
                      required
                      className="input-luxury appearance-none"
                    >
                      <option value="">Select Inquiry Type</option>
                      <option value="investor">Investor Relations</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="media">Media Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <textarea 
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Your Message" 
                      rows={4}
                      required
                      className="input-luxury resize-none"
                    ></textarea>
                  </div>
                  <Button 
                    className="btn-luxury w-full group" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Submit Inquiry
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
