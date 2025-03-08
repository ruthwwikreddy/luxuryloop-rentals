
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsPage = () => {
  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black">
        <div className="luxury-container">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-luxury-gold transition-colors mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="section-title">Terms & Conditions</h1>
            <p className="text-white/70 mt-4">
              Last updated: June 1, 2023
            </p>
          </div>
          
          <div className="glass-card rounded-lg gold-border p-8 mb-8">
            <div className="prose prose-lg prose-invert max-w-none">
              <h2 className="font-playfair text-2xl text-white mb-4">1. Introduction</h2>
              <p className="text-white/70 mb-4">
                Welcome to LuxuryLoop, India's premier peer-to-peer luxury car rental marketplace. These Terms and Conditions govern your use of our website, mobile application, and services. By accessing or using LuxuryLoop, you agree to be bound by these Terms.
              </p>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">2. Definitions</h2>
              <p className="text-white/70 mb-4">
                <strong className="text-white">"LuxuryLoop"</strong> refers to our company, website, mobile application, and services.
              </p>
              <p className="text-white/70 mb-4">
                <strong className="text-white">"User"</strong> refers to anyone who accesses or uses LuxuryLoop, including renters and car owners.
              </p>
              <p className="text-white/70 mb-4">
                <strong className="text-white">"Renter"</strong> refers to a User who rents a vehicle through LuxuryLoop.
              </p>
              <p className="text-white/70 mb-4">
                <strong className="text-white">"Owner"</strong> refers to a User who lists their vehicle for rent on LuxuryLoop.
              </p>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">3. Eligibility</h2>
              <p className="text-white/70 mb-4">
                To use LuxuryLoop services, you must:
              </p>
              <ul className="list-disc pl-5 text-white/70 mb-4 space-y-2">
                <li>Be at least 25 years of age.</li>
                <li>Possess a valid driver's license for at least 3 years.</li>
                <li>Meet our insurance partner's eligibility requirements.</li>
                <li>Have a valid credit card in your name.</li>
                <li>Pass our verification process.</li>
              </ul>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">4. Account Registration</h2>
              <p className="text-white/70 mb-4">
                Users must create an account to access LuxuryLoop services. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
              </p>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">5. Rental Terms</h2>
              <h3 className="font-playfair text-xl text-white mb-2">5.1 Booking and Payments</h3>
              <p className="text-white/70 mb-4">
                All bookings must be made through our platform. Payments are processed securely through our authorized payment processors. Rental rates include basic insurance coverage, but additional fees may apply for premium services, late returns, or damages.
              </p>
              
              <h3 className="font-playfair text-xl text-white mb-2">5.2 Security Deposits</h3>
              <p className="text-white/70 mb-4">
                A security deposit is required for all rentals. The amount varies depending on the vehicle. Deposits are refundable within 7 business days after the vehicle is returned without damage.
              </p>
              
              <h3 className="font-playfair text-xl text-white mb-2">5.3 Cancellation Policy</h3>
              <p className="text-white/70 mb-4">
                Cancellations made more than 72 hours before the rental period receive a full refund. Cancellations made between 72 and 24 hours before the rental period receive a 50% refund. Cancellations made less than 24 hours before the rental period are not eligible for a refund.
              </p>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">6. Renter Responsibilities</h2>
              <p className="text-white/70 mb-4">
                As a Renter, you agree to:
              </p>
              <ul className="list-disc pl-5 text-white/70 mb-4 space-y-2">
                <li>Use the vehicle only for lawful purposes and in accordance with these Terms.</li>
                <li>Not sublet or allow unauthorized drivers to operate the vehicle.</li>
                <li>Return the vehicle in the same condition as received, with the same amount of fuel.</li>
                <li>Report any accidents, damage, or mechanical issues immediately.</li>
                <li>Not use the vehicle for racing, off-roading, or towing.</li>
                <li>Not transport hazardous materials or use the vehicle for commercial purposes.</li>
                <li>Adhere to the mileage limitations specified in your rental agreement.</li>
              </ul>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">7. Owner Responsibilities</h2>
              <p className="text-white/70 mb-4">
                As an Owner, you agree to:
              </p>
              <ul className="list-disc pl-5 text-white/70 mb-4 space-y-2">
                <li>Provide accurate information about your vehicle.</li>
                <li>Ensure your vehicle is properly maintained, clean, and road-worthy.</li>
                <li>Have appropriate insurance coverage for rental purposes.</li>
                <li>Respond promptly to booking requests and communications.</li>
                <li>Honor confirmed bookings except in cases of emergency or vehicle damage.</li>
                <li>Provide all necessary vehicle documents and accessories.</li>
              </ul>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">8. Insurance and Liability</h2>
              <p className="text-white/70 mb-4">
                LuxuryLoop provides insurance coverage for all rentals, but certain conditions and limitations apply. Renters are responsible for the deductible amount in case of damage. Intentional damage or violations of these Terms may void insurance coverage.
              </p>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">9. Privacy Policy</h2>
              <p className="text-white/70 mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using LuxuryLoop, you consent to our data practices as described in our Privacy Policy.
              </p>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">10. Modifications to Terms</h2>
              <p className="text-white/70 mb-4">
                LuxuryLoop reserves the right to modify these Terms at any time. We will notify users of significant changes by email or through our platform. Your continued use of LuxuryLoop after such modifications constitutes your acceptance of the updated Terms.
              </p>
              
              <h2 className="font-playfair text-2xl text-white mb-4 mt-8">11. Contact Information</h2>
              <p className="text-white/70 mb-4">
                If you have any questions about these Terms, please contact us at legal@luxuryloop.in or call our customer service at +91-123-456-7890.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white/70 mb-6">
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
            <Link to="/">
              <Button className="btn-luxury">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
