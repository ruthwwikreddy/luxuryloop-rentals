
import { useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import { useRenters } from "@/hooks/use-renters";
import { Phone, Mail, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const RentersPage = () => {
  const { renters, loading, fetchRenters } = useRenters();
  
  // Memoize renters to prevent unnecessary re-renders
  const memoizedRenters = useMemo(() => renters, [renters]);
  
  useEffect(() => {
    // Refresh data when component mounts
    fetchRenters();
  }, [fetchRenters]);
  
  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black min-h-screen">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <h1 className="section-title">Our Trusted Car Renters</h1>
            <p className="text-white/70 max-w-2xl mx-auto mt-4">
              Meet our network of premium car providers and suppliers, each carefully selected to ensure
              you receive nothing but the finest luxury vehicles and service.
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="glass-card rounded-lg overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-24 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memoizedRenters.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-white/70">No car renters available at the moment. Please check back later.</p>
                </div>
              ) : (
                memoizedRenters.map((renter) => (
                  <div key={renter.id} className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 will-change-transform">
                    <div className="h-48 overflow-hidden relative">
                      {renter.image ? (
                        <img 
                          src={renter.image} 
                          alt={renter.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Image+Available";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-luxury-gold/20 to-black flex items-center justify-center">
                          <span className="font-playfair text-3xl text-luxury-gold">{renter.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <h2 className="font-playfair text-2xl text-white mb-3">{renter.name}</h2>
                      
                      {renter.description && (
                        <p className="text-white/70 mb-4 line-clamp-3">{renter.description}</p>
                      )}
                      
                      <div className="space-y-2 mt-4">
                        {renter.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-luxury-gold mr-2" />
                            <span className="text-white/70">{renter.phone}</span>
                          </div>
                        )}
                        
                        {renter.email && (
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-luxury-gold mr-2" />
                            <span className="text-white/70">{renter.email}</span>
                          </div>
                        )}
                        
                        {renter.address && (
                          <div className="flex">
                            <MapPin className="h-4 w-4 text-luxury-gold mr-2 mt-1 flex-shrink-0" />
                            <span className="text-white/70">{renter.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RentersPage;
