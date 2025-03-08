
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Car, Menu, X, Lock } from "lucide-react";
import { Link } from "react-router-dom";

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
        <Link to="/" className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-luxury-gold" />
          <span className="font-playfair text-xl md:text-2xl font-bold gold-gradient-text">LuxuryLoop</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/fleet" className="text-white hover:text-luxury-gold transition-colors">Our Fleet</Link>
          <Link to="/renters" className="text-white hover:text-luxury-gold transition-colors">Car Renters</Link>
          <Link to="/about" className="text-white hover:text-luxury-gold transition-colors">About Us</Link>
          <a href="/#why-choose-us" className="text-white hover:text-luxury-gold transition-colors">Why Choose Us</a>
          <a href="/#booking" className="text-white hover:text-luxury-gold transition-colors">Booking</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/admin-login">
            <Button variant="outline" className="btn-outline-luxury">
              <Lock className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
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
            <Link 
              to="/fleet" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Fleet
            </Link>
            <Link 
              to="/renters" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Car Renters
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <a 
              href="/#why-choose-us" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Choose Us
            </a>
            <a 
              href="/#booking" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Booking
            </a>
            <Link 
              to="/terms" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Terms & Conditions
            </Link>
            <Link 
              to="/admin-login" 
              className="text-white hover:text-luxury-gold py-2 transition-colors border-b border-luxury-gold/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
