
import { useEffect, useState } from "react";
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

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState<CarType | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchCarById } = useCars();
  const { getAvailableDatesForCar } = useAvailability();
  
  const carId = id ? parseInt(id) : 0;
  const availableDates = getAvailableDatesForCar(carId);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        const carData = await fetchCarById(id);
        if (carData) {
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
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-white">Loading...</p>
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
            </div>
            
            {/* Right Column - Booking Form */}
            <BookingForm car={car} carId={carId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetailsPage;
