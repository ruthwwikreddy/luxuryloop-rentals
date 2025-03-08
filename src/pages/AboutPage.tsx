
import Layout from "@/components/Layout";
import { CheckCircle, Clock, MapPin, Shield, Star, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black">
        <div className="luxury-container">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="section-title">About LuxuryLoop</h1>
            <p className="text-white/70 max-w-3xl mx-auto mt-6 text-lg">
              India's premier peer-to-peer luxury car rental marketplace, connecting passionate 
              car owners with discerning enthusiasts who appreciate the extraordinary.
            </p>
          </div>
          
          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <h2 className="font-playfair text-3xl text-white mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-luxury-gold mb-8"></div>
              <p className="text-white/70 mb-6 leading-relaxed">
                LuxuryLoop was founded in 2021 by a team of automotive enthusiasts and tech innovators with a shared vision: 
                to transform how luxury vehicles are accessed and experienced in India.
              </p>
              <p className="text-white/70 mb-6 leading-relaxed">
                We recognized that many luxury car owners use their vehicles only occasionally, while many enthusiasts never 
                get the opportunity to experience these extraordinary machines. Our platform bridges this gap, creating a 
                community where passion for automotive excellence can be shared.
              </p>
              <p className="text-white/70 leading-relaxed">
                Today, LuxuryLoop operates in major metropolitan areas across India with plans for national expansion, 
                offering the most exclusive collection of luxury and exotic vehicles for daily rentals, weekend getaways, 
                special occasions, and corporate events.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden gold-border gold-glow">
              <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1766&auto=format&fit=crop" 
                alt="Luxury sports car" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Our Mission */}
          <div className="glass-card rounded-lg gold-border p-10 mb-20">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl text-white mb-4">Our Mission</h2>
              <div className="w-24 h-1 bg-luxury-gold mx-auto mb-8"></div>
              <p className="text-white/70 max-w-3xl mx-auto leading-relaxed">
                To democratize access to luxury experiences by creating a secure, trustworthy platform 
                that enables car enthusiasts to enjoy extraordinary vehicles while providing luxury car 
                owners with a safe way to share their passion and offset ownership costs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 mb-6">
                  <Star className="h-6 w-6 text-luxury-gold" />
                </div>
                <h3 className="font-playfair text-xl text-white mb-3">Excellence</h3>
                <p className="text-white/70">
                  We curate only the finest vehicles and deliver impeccable service at every touchpoint.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 mb-6">
                  <Shield className="h-6 w-6 text-luxury-gold" />
                </div>
                <h3 className="font-playfair text-xl text-white mb-3">Trust & Safety</h3>
                <p className="text-white/70">
                  We prioritize security with thorough verification, comprehensive insurance, and 24/7 support.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 mb-6">
                  <Users className="h-6 w-6 text-luxury-gold" />
                </div>
                <h3 className="font-playfair text-xl text-white mb-3">Community</h3>
                <p className="text-white/70">
                  We foster a passionate community of owners and enthusiasts united by automotive appreciation.
                </p>
              </div>
            </div>
          </div>
          
          {/* Our Achievements */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl text-white mb-4">Our Achievements</h2>
              <div className="w-24 h-1 bg-luxury-gold mx-auto mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card rounded-lg p-6 text-center">
                <div className="text-4xl font-bold gold-gradient-text mb-2">500+</div>
                <p className="text-white">Luxury Vehicles</p>
              </div>
              
              <div className="glass-card rounded-lg p-6 text-center">
                <div className="text-4xl font-bold gold-gradient-text mb-2">25,000+</div>
                <p className="text-white">Happy Customers</p>
              </div>
              
              <div className="glass-card rounded-lg p-6 text-center">
                <div className="text-4xl font-bold gold-gradient-text mb-2">12</div>
                <p className="text-white">Cities</p>
              </div>
              
              <div className="glass-card rounded-lg p-6 text-center">
                <div className="text-4xl font-bold gold-gradient-text mb-2">4.9/5</div>
                <p className="text-white">Customer Rating</p>
              </div>
            </div>
          </div>
          
          {/* Team */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl text-white mb-4">Leadership Team</h2>
              <div className="w-24 h-1 bg-luxury-gold mx-auto mb-8"></div>
              <p className="text-white/70 max-w-2xl mx-auto">
                Meet the passionate individuals driving LuxuryLoop's vision forward.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card rounded-lg overflow-hidden gold-border">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                    alt="CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-white mb-1">Vikram Malhotra</h3>
                  <p className="text-luxury-gold mb-4">Founder & CEO</p>
                  <p className="text-white/70">
                    Former automotive executive with 15+ years in luxury car industry and passionate car collector.
                  </p>
                </div>
              </div>
              
              <div className="glass-card rounded-lg overflow-hidden gold-border">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                    alt="COO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-white mb-1">Priya Sharma</h3>
                  <p className="text-luxury-gold mb-4">COO</p>
                  <p className="text-white/70">
                    Tech industry veteran with expertise in scaling marketplace platforms across APAC region.
                  </p>
                </div>
              </div>
              
              <div className="glass-card rounded-lg overflow-hidden gold-border">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop" 
                    alt="CTO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl text-white mb-1">Raj Patel</h3>
                  <p className="text-luxury-gold mb-4">CTO</p>
                  <p className="text-white/70">
                    Serial entrepreneur with multiple successful tech startups and automotive engineering background.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Why Choose Us */}
          <div>
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl text-white mb-4">Why Choose LuxuryLoop</h2>
              <div className="w-24 h-1 bg-luxury-gold mx-auto mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-lg p-6 flex items-start">
                <div className="p-3 rounded-full bg-luxury-gold/10 mr-4">
                  <CheckCircle className="h-6 w-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-white mb-2">Verified Owners</h3>
                  <p className="text-white/70">
                    Every car owner undergoes rigorous verification to ensure the highest quality service and vehicles.
                  </p>
                </div>
              </div>
              
              <div className="glass-card rounded-lg p-6 flex items-start">
                <div className="p-3 rounded-full bg-luxury-gold/10 mr-4">
                  <Shield className="h-6 w-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-white mb-2">Comprehensive Insurance</h3>
                  <p className="text-white/70">
                    All rentals include premium insurance coverage for peace of mind during your luxury experience.
                  </p>
                </div>
              </div>
              
              <div className="glass-card rounded-lg p-6 flex items-start">
                <div className="p-3 rounded-full bg-luxury-gold/10 mr-4">
                  <Clock className="h-6 w-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-white mb-2">24/7 Concierge Support</h3>
                  <p className="text-white/70">
                    Our dedicated team is available around the clock to assist with any requests or questions.
                  </p>
                </div>
              </div>
              
              <div className="glass-card rounded-lg p-6 flex items-start">
                <div className="p-3 rounded-full bg-luxury-gold/10 mr-4">
                  <MapPin className="h-6 w-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-white mb-2">Door-to-Door Delivery</h3>
                  <p className="text-white/70">
                    Experience premium service with vehicle delivery and pickup at your preferred location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
