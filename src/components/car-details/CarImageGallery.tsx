
import { useState } from "react";

interface CarImageGalleryProps {
  mainImage: string;
  images: string[];
  name: string;
}

const CarImageGallery = ({ mainImage, images, name }: CarImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
      <div className="md:col-span-2 rounded-lg overflow-hidden gold-border">
        <img 
          src={images?.[activeImageIndex] || mainImage} 
          alt={name} 
          className="w-full h-[400px] object-cover"
        />
      </div>
      <div className="flex flex-row md:flex-col gap-3">
        {images?.map((image, index) => (
          <div 
            key={index}
            className={`rounded-lg overflow-hidden cursor-pointer border transition-all ${
              activeImageIndex === index ? "border-luxury-gold" : "border-white/10"
            }`}
            onClick={() => setActiveImageIndex(index)}
          >
            <img 
              src={image} 
              alt={`${name} - view ${index + 1}`} 
              className="w-full h-[80px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarImageGallery;
