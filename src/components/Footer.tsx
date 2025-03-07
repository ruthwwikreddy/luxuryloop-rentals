
import { Car, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-luxury-black pt-16 pb-8">
      <div className="luxury-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-luxury-gold/20">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-8 w-8 text-luxury-gold" />
              <span className="font-playfair text-xl font-bold gold-gradient-text">LuxuryLoop</span>
            </div>
            <p className="text-white/70 mb-6">
              India's first Peer-to-Peer Luxury Car Rental Marketplace, connecting elite car owners with discerning drivers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center hover:bg-luxury-gold/20 transition-colors">
                <Facebook className="h-5 w-5 text-luxury-gold" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center hover:bg-luxury-gold/20 transition-colors">
                <Instagram className="h-5 w-5 text-luxury-gold" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center hover:bg-luxury-gold/20 transition-colors">
                <Twitter className="h-5 w-5 text-luxury-gold" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-luxury-gold/10 flex items-center justify-center hover:bg-luxury-gold/20 transition-colors">
                <Linkedin className="h-5 w-5 text-luxury-gold" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-luxury-gold transition-colors">About Us</a>
              </li>
              <li>
                <a href="#why-choose-us" className="text-white/70 hover:text-luxury-gold transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#exclusive-fleet" className="text-white/70 hover:text-luxury-gold transition-colors">Our Fleet</a>
              </li>
              <li>
                <a href="#booking" className="text-white/70 hover:text-luxury-gold transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#partner" className="text-white/70 hover:text-luxury-gold transition-colors">Partner With Us</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold text-white mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-luxury-gold transition-colors">Luxury Car Rentals</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-luxury-gold transition-colors">Supercar Experience</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-luxury-gold transition-colors">Chauffeur Services</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-luxury-gold transition-colors">Corporate Packages</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-luxury-gold transition-colors">Event & Wedding Cars</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold text-white mb-6">Locations</h3>
            <ul className="space-y-3">
              <li className="text-white/70">Mumbai</li>
              <li className="text-white/70">Delhi NCR</li>
              <li className="text-white/70">Bangalore</li>
              <li className="text-white/70">Hyderabad</li>
              <li className="text-white/70">Coming Soon: Chennai, Pune, Goa</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {currentYear} LuxuryLoop Rentals. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 text-sm hover:text-luxury-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 text-sm hover:text-luxury-gold transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/50 text-sm hover:text-luxury-gold transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
