
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Car, User, Menu, X } from "lucide-react";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-luxury-black/80 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="luxury-container flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-luxury-gold" />
          <span className="font-playfair text-xl md:text-2xl font-bold gold-gradient-text">LuxuryLoop</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#why-choose-us" className="text-white hover:text-luxury-gold transition-colors">Why Choose Us</a>
          <a href="#exclusive-fleet" className="text-white hover:text-luxury-gold transition-colors">Exclusive Fleet</a>
          <a href="#booking" className="text-white hover:text-luxury-gold transition-colors">Booking</a>
          <a href="#partner" className="text-white hover:text-luxury-gold transition-colors">Partner With Us</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="btn-outline-luxury">
            <User className="h-4 w-4 mr-2" />
            Log In
          </Button>
          <Button className="btn-luxury animate-pulse-glow">
            Join Now
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-luxury-gold" />
          ) : (
            <Menu className="h-6 w-6 text-luxury-gold" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-luxury-black/95 backdrop-blur-md">
          <div className="luxury-container py-4 flex flex-col space-y-4">
            <a 
              href="#why-choose-us" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Choose Us
            </a>
            <a 
              href="#exclusive-fleet" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Exclusive Fleet
            </a>
            <a 
              href="#booking" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Booking
            </a>
            <a 
              href="#partner" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Partner With Us
            </a>
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" className="w-full btn-outline-luxury">
                <User className="h-4 w-4 mr-2" />
                Log In
              </Button>
              <Button className="w-full btn-luxury">
                Join Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
