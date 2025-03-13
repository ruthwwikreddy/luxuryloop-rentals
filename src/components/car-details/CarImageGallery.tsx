
import React, { useState, useMemo } from "react";

interface CarImageGalleryProps {
  mainImage: string;
  images: string[];
  name: string;
}

const CarImageGallery = ({ mainImage, images, name }: CarImageGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Preload images to prevent flickering
  const preloadImages = useMemo(() => {
    return images?.map((src, index) => (
      <link key={index} rel="preload" href={src} as="image" />
    ));
  }, [images]);
  
  // Create an array of all images, using mainImage as fallback
  const allImages = useMemo(() => {
    return images?.length ? images : [mainImage];
  }, [images, mainImage]);
  
  const activeImage = useMemo(() => {
    return allImages[activeImageIndex] || mainImage;
  }, [allImages, activeImageIndex, mainImage]);
  
  return (
    <>
      {preloadImages}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="md:col-span-2 rounded-lg overflow-hidden gold-border">
          <img 
            src={activeImage} 
            alt={name} 
            className="w-full h-[400px] object-cover transition-opacity duration-200"
            loading="eager"
            fetchpriority="high"
            style={{ willChange: 'transform' }}
          />
        </div>
        <div className="flex flex-row md:flex-col gap-3">
          {allImages.map((image, index) => (
            <div 
              key={index}
              className={`rounded-lg overflow-hidden cursor-pointer border transition-all duration-200 ${
                activeImageIndex === index ? "border-luxury-gold" : "border-white/10"
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img 
                src={image} 
                alt={`${name} - view ${index + 1}`} 
                className="w-full h-[80px] object-cover"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default React.memo(CarImageGallery);
