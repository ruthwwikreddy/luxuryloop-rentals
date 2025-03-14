
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Star, Filter, Search, ChevronDown, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCarRenters, CarRenterType } from "@/hooks/use-car-renters";

const RentersPage = () => {
  const { toast } = useToast();
  const { carRenters, loading } = useCarRenters();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRenter, setActiveRenter] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    rentalDates: {
      start: "",
      end: ""
    }
  });
  
  const filteredRenters = carRenters.filter(renter => 
    renter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (renter.address && renter.address.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
      setContactForm({
        ...contactForm,
        rentalDates: {
          ...contactForm.rentalDates,
          [name === "startDate" ? "start" : "end"]: value
        }
      });
    } else {
      setContactForm({ ...contactForm, [name]: value });
    }
  };
  
  const handleSubmit = (e: React.FormEvent, renterId: number) => {
    e.preventDefault();
    
    // In a real application, you would send this data to your backend
    console.log("Contact form submitted:", { renterId, ...contactForm });
    
    toast({
      title: "Message sent successfully",
      description: "The car renter will contact you shortly."
    });
    
    // Reset form
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      rentalDates: {
        start: "",
        end: ""
      }
    });
    
    setShowContactForm(false);
  };
  
  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black">
        <div className="luxury-container">
          <div className="mb-12 text-center">
            <h1 className="section-title">Authorized Car Renters</h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Connect directly with our network of verified luxury car renters across India. Each partner is carefully vetted to ensure exceptional service quality.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="glass-card rounded-lg p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or location..."
                    className="w-full pl-10 pr-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-md text-white focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <Button variant="outline" className="btn-outline-luxury flex gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              // Loading skeletons
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="glass-card rounded-lg gold-border overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="h-8 w-48 bg-luxury-gold/10 rounded animate-pulse"></div>
                          <div className="h-8 w-24 bg-luxury-gold/10 rounded animate-pulse"></div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <div className="h-6 w-36 bg-luxury-gold/10 rounded animate-pulse"></div>
                          <div className="h-6 w-36 bg-luxury-gold/10 rounded animate-pulse"></div>
                        </div>
                        <div className="h-24 bg-luxury-gold/10 rounded animate-pulse"></div>
                        <div className="space-y-2">
                          <div className="h-6 w-28 bg-luxury-gold/10 rounded animate-pulse"></div>
                          <div className="flex flex-wrap gap-2">
                            {Array(3).fill(0).map((_, i) => (
                              <div key={i} className="h-8 w-28 bg-luxury-gold/10 rounded-full animate-pulse"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="md:w-1/3 glass-card rounded-lg p-6 bg-luxury-black/50 space-y-4">
                        <div className="h-6 w-36 bg-luxury-gold/10 rounded animate-pulse"></div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-luxury-gold/10 mr-4"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-16 bg-luxury-gold/10 rounded animate-pulse"></div>
                              <div className="h-6 w-32 bg-luxury-gold/10 rounded animate-pulse"></div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-luxury-gold/10 mr-4"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-16 bg-luxury-gold/10 rounded animate-pulse"></div>
                              <div className="h-6 w-40 bg-luxury-gold/10 rounded animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-10 w-full bg-luxury-gold/10 rounded animate-pulse"></div>
                          <div className="h-10 w-full bg-luxury-gold/10 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : filteredRenters.length > 0 ? (
              filteredRenters.map((renter) => (
                <div key={renter.id} className="glass-card rounded-lg gold-border overflow-hidden hover:gold-glow transition-all duration-300">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3">
                        <div className="flex items-start justify-between mb-4">
                          <h2 className="font-playfair text-2xl font-bold text-white">{renter.name}</h2>
                          {renter.rating && (
                            <div className="flex items-center bg-luxury-gold/10 px-3 py-1 rounded-full">
                              <Star className="h-4 w-4 text-luxury-gold fill-luxury-gold mr-1" />
                              <span className="text-white font-medium">{renter.rating}</span>
                              <span className="text-white/50 text-sm ml-1">({renter.review_count || 0})</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          {renter.address && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-luxury-gold mr-1" />
                              <span className="text-white/70">{renter.address}</span>
                            </div>
                          )}
                          {renter.verification && (
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-luxury-gold mr-1" />
                              <span className="text-white/70">{renter.verification}</span>
                            </div>
                          )}
                          {renter.member_since && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-luxury-gold mr-1" />
                              <span className="text-white/70">Member since {renter.member_since}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-white/70 mb-4">
                          {renter.description || "No description available."}
                        </p>
                        
                        {renter.specialties && renter.specialties.length > 0 && (
                          <div className="mb-4">
                            <h3 className="text-white text-lg mb-2">Specialties</h3>
                            <div className="flex flex-wrap gap-2">
                              {renter.specialties.map((specialty, index) => (
                                <span key={index} className="bg-luxury-gold/10 text-white/90 px-3 py-1 rounded-full text-sm">
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {renter.featured_cars && renter.featured_cars.length > 0 && (
                          <div className="mb-4">
                            <h3 className="text-white text-lg mb-2">Featured Cars</h3>
                            <div className="flex flex-wrap gap-2">
                              {renter.featured_cars.map((car, index) => (
                                <span key={index} className="bg-luxury-black text-white/90 border border-luxury-gold/20 px-3 py-1 rounded-full text-sm">
                                  {car}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:w-1/3 glass-card rounded-lg p-6 bg-luxury-black/50">
                        <h3 className="text-white text-lg font-medium mb-4">Contact Information</h3>
                        
                        <div className="space-y-4 mb-6">
                          {renter.phone && (
                            <div className="flex items-center hover-lift">
                              <div className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center mr-4">
                                <Phone className="h-5 w-5 text-luxury-gold" />
                              </div>
                              <div>
                                <p className="text-white text-sm">Phone</p>
                                <p className="text-luxury-gold">{renter.phone}</p>
                              </div>
                            </div>
                          )}
                          
                          {renter.email && (
                            <div className="flex items-center hover-lift">
                              <div className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center mr-4">
                                <Mail className="h-5 w-5 text-luxury-gold" />
                              </div>
                              <div>
                                <p className="text-white text-sm">Email</p>
                                <p className="text-luxury-gold">{renter.email}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Button 
                            className="btn-luxury w-full" 
                            onClick={() => {
                              setActiveRenter(renter.id);
                              setShowContactForm(true);
                            }}
                          >
                            Send Inquiry
                          </Button>
                          <Button variant="outline" className="btn-outline-luxury w-full">
                            View All Cars
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Form */}
                  {showContactForm && activeRenter === renter.id && (
                    <div className="p-6 border-t border-luxury-gold/20">
                      <h3 className="font-playfair text-xl text-white mb-4">Send an Inquiry to {renter.name}</h3>
                      <form onSubmit={(e) => handleSubmit(e, renter.id)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-white mb-2">Your Name*</label>
                            <input
                              type="text"
                              name="name"
                              value={contactForm.name}
                              onChange={handleInputChange}
                              placeholder="Enter your name"
                              className="input-luxury w-full"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white mb-2">Email Address*</label>
                            <input
                              type="email"
                              name="email"
                              value={contactForm.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email"
                              className="input-luxury w-full"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-white mb-2">Phone Number*</label>
                            <input
                              type="text"
                              name="phone"
                              value={contactForm.phone}
                              onChange={handleInputChange}
                              placeholder="Enter your phone number"
                              className="input-luxury w-full"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white mb-2">Start Date</label>
                              <input
                                type="date"
                                name="startDate"
                                value={contactForm.rentalDates.start}
                                onChange={handleInputChange}
                                className="input-luxury w-full"
                              />
                            </div>
                            <div>
                              <label className="block text-white mb-2">End Date</label>
                              <input
                                type="date"
                                name="endDate"
                                value={contactForm.rentalDates.end}
                                onChange={handleInputChange}
                                className="input-luxury w-full"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-white mb-2">Your Message*</label>
                          <textarea
                            name="message"
                            value={contactForm.message}
                            onChange={handleInputChange}
                            placeholder="Describe your requirements, including which cars you're interested in"
                            className="input-luxury w-full resize-none"
                            rows={9}
                            required
                          ></textarea>
                          
                          <div className="mt-4 flex justify-between">
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="btn-outline-luxury"
                              onClick={() => setShowContactForm(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" className="btn-luxury">
                              Send Message
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center p-12 glass-card rounded-lg">
                <p className="text-white text-lg mb-2">No renters found matching your search.</p>
                <p className="text-white/70">Try a different search term or browse all renters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RentersPage;
