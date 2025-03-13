
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAvailability } from "@/hooks/use-availability";
import { useCars } from "@/hooks/use-cars";
import { CarType } from "@/types/supabase";
import CarHeader from "@/components/car-details/CarHeader";
import CarImageGallery from "@/components/car-details/CarImageGallery";
import CarSpecs from "@/components/car-details/CarSpecs";
import RentalPolicy from "@/components/car-details/RentalPolicy";
import BookingForm from "@/components/car-details/BookingForm";
import ReviewsSection from "@/components/car-details/ReviewsSection";
import RelatedCars from "@/components/car-details/RelatedCars";
import VideoGallery from "@/components/car-details/VideoGallery";
import { Skeleton } from "@/components/ui/skeleton";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchCarById } = useCars();
  const { getAvailableDatesForCar } = useAvailability();
  
  const carId = useMemo(() => id ? parseInt(id) : 0, [id]);
  const availableDates = useMemo(() => getAvailableDatesForCar(carId), [getAvailableDatesForCar, carId]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        const carData = await fetchCarById(id);
        if (carData) {
          // Add mock reviews and videos for demonstration if not present
          if (!carData.reviews) {
            carData.reviews = [
              {
                id: 1,
                name: "Rajesh Kumar",
                rating: 5,
                comment: "Exceptional luxury experience! The car was immaculate and performed flawlessly during my business trip.",
                date: "2023-08-15"
              },
              {
                id: 2,
                name: "Priya Singh",
                rating: 4,
                comment: "Very satisfied with the service. The car was delivered on time and in perfect condition.",
                date: "2023-07-22"
              },
              {
                id: 3,
                name: "Amit Patel",
                rating: 5,
                comment: "Outstanding vehicle and customer service. Made my anniversary special!",
                date: "2023-06-10"
              },
              {
                id: 4,
                name: "Neha Sharma",
                rating: 4,
                comment: "Great experience overall. The car was a head-turner everywhere I went.",
                date: "2023-05-18"
              }
            ];
          }
          
          if (!carData.videos) {
            carData.videos = [
              "https://www.youtube.com/embed/jfKfPfyJRdk",
              "https://www.youtube.com/embed/5qap5aO4i9A"
            ];
          }
          
          setCar(carData);
        } else {
          // Redirect to 404 page if car not found
          window.location.href = "/not-found";
        }
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, fetchCarById]);
  
  if (loading) {
    return (
      <Layout>
        <div className="pt-32 pb-20 bg-luxury-black">
          <div className="luxury-container">
            <div className="mb-10">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            
            <Skeleton className="w-full h-96 mb-10 rounded-xl" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-[500px] w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!car) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white">Car not found</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black">
        <div className="luxury-container">
          <CarHeader
            name={car.name}
            category={car.category}
            locations={car.locations}
          />
          
          <CarImageGallery 
            mainImage={car.image} 
            images={car.images} 
            name={car.name} 
          />
          
          {/* Video Gallery - Show only if videos exist */}
          {car.videos && car.videos.length > 0 && (
            <VideoGallery videos={car.videos} name={car.name} />
          )}
          
          {/* Car Details & Booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Car Details */}
            <div className="lg:col-span-2">
              <CarSpecs 
                description={car.description}
                specs={car.specs}
                features={car.features}
              />
              
              <RentalPolicy availableDates={availableDates} />
              
              {/* Reviews Section */}
              <ReviewsSection reviews={car.reviews} />
            </div>
            
            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <BookingForm car={car} carId={carId} />
            </div>
          </div>
          
          {/* Related Cars Section */}
          <RelatedCars currentCarId={carId} category={car.category} />
        </div>
      </div>
    </Layout>
  );
};

export default CarDetailsPage;
