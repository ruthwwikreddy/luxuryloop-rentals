
import { Heart, MapPin, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CarHeaderProps {
  name: string;
  category: string;
  locations: string[];
}

const CarHeader = ({ name, category, locations }: CarHeaderProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast({
        title: "Added to favorites",
        description: `${name} has been added to your favorites.`,
      });
    }
  };

  return (
    <div className="mb-8">
      <Link to="/fleet" className="inline-flex items-center text-white/70 hover:text-luxury-gold transition-colors mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Fleet
      </Link>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="section-title mb-2">{name}</h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              isFavorite 
                ? "bg-red-500/20 border border-red-500/50" 
                : "bg-luxury-gold/10 border border-luxury-gold/30"
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-luxury-gold"}`} />
            <span className={isFavorite ? "text-red-500" : "text-luxury-gold"}>
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </span>
          </button>
          <button className="bg-luxury-gold/10 border border-luxury-gold/30 p-2 rounded-full">
            <Share2 className="h-5 w-5 text-luxury-gold" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <span className="bg-luxury-gold text-black px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </span>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-luxury-gold mr-1" />
          <span className="text-white/70 text-sm">
            {locations?.join(", ") || "Multiple Locations"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarHeader;
