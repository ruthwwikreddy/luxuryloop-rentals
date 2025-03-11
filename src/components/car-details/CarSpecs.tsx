
import { CircleCheck, ChevronRight } from "lucide-react";

interface CarSpecsProps {
  description: string | null;
  specs: string[];
  features: string[];
}

const CarSpecs = ({ description, specs, features }: CarSpecsProps) => {
  return (
    <div className="glass-card rounded-lg gold-border p-8 mb-8">
      <h2 className="font-playfair text-2xl text-white mb-4">About this Model</h2>
      <p className="text-white/70 mb-6 leading-relaxed">
        {description}
      </p>
      
      {/* Specs */}
      <div className="mb-8">
        <h3 className="font-playfair text-xl text-white mb-4">Performance & Specifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="bg-luxury-gold/10 rounded-lg p-4 flex items-center">
              <CircleCheck className="h-5 w-5 text-luxury-gold mr-3" />
              <span className="text-white">{spec}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Features */}
      <div>
        <h3 className="font-playfair text-xl text-white mb-4">Luxury Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features?.map((feature, index) => (
            <div key={index} className="flex items-center">
              <ChevronRight className="h-5 w-5 text-luxury-gold mr-2" />
              <span className="text-white/70">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarSpecs;
