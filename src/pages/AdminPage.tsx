
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CarType, luxuryCars } from "@/types/car";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import AuthGuard from "@/components/AuthGuard";
import {
  Car,
  Upload,
  X,
  Plus,
  Check,
  CalendarRange,
  ClipboardList,
  Settings,
  LogOut,
  Edit,
  Trash,
  PenLine
} from "lucide-react";

// Mock booking request data
interface BookingRequest {
  id: number;
  carId: number;
  carName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: Date;
  endDate: Date;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const mockBookingRequests: BookingRequest[] = [
  {
    id: 1,
    carId: 1,
    carName: "Lamborghini Aventador",
    customerName: "Raj Patel",
    customerEmail: "raj.patel@example.com",
    customerPhone: "+91 98765 43210",
    startDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    endDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    status: "pending",
    createdAt: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    id: 2,
    carId: 3,
    carName: "Ferrari 488 Spider",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@example.com",
    customerPhone: "+91 87654 32109",
    startDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
    endDate: new Date(Date.now() + 86400000 * 10), // 10 days from now
    status: "approved",
    createdAt: new Date(Date.now() - 86400000 * 2) // 2 days ago
  },
  {
    id: 3,
    carId: 5,
    carName: "Aston Martin DBS",
    customerName: "Vikram Singh",
    customerEmail: "vikram.singh@example.com",
    customerPhone: "+91 76543 21098",
    startDate: new Date(Date.now() + 86400000 * 14), // 14 days from now
    endDate: new Date(Date.now() + 86400000 * 16), // 16 days from now
    status: "rejected",
    createdAt: new Date(Date.now() - 86400000 * 3) // 3 days ago
  }
];

// Car availability interface
interface CarAvailability {
  carId: number;
  dates: Date[];
}

const AdminPage = () => {
  const { toast } = useToast();
  const [cars, setCars] = useState<CarType[]>(luxuryCars);
  const [bookings, setBookings] = useState<BookingRequest[]>(mockBookingRequests);
  const [availabilities, setAvailabilities] = useState<CarAvailability[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [newCar, setNewCar] = useState<Partial<CarType>>({
    id: luxuryCars.length + 1,
    name: "",
    category: "",
    price: 0,
    perDay: true,
    image: "",
    images: [],
    specs: [],
    description: "",
    features: [],
    locations: []
  });
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [spec, setSpec] = useState("");
  const [feature, setFeature] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Initialize availabilities from car data
  useEffect(() => {
    const initialAvailabilities: CarAvailability[] = cars.map(car => ({
      carId: car.id,
      dates: car.availableDates ? 
        car.availableDates.map(dateStr => new Date(dateStr)) : 
        // Default to next 30 days available
        Array.from({ length: 30 }, (_, i) => new Date(Date.now() + 86400000 * (i + 1)))
    }));
    
    setAvailabilities(initialAvailabilities);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "price") {
      setNewCar({ ...newCar, [name]: Number(value) });
    } else if (name === "perDay") {
      setNewCar({ ...newCar, [name]: value === "true" });
    } else {
      setNewCar({ ...newCar, [name]: value });
    }
  };

  // Functions for managing specs, features, locations, images
  const addSpec = () => {
    if (spec.trim() && newCar.specs) {
      setNewCar({ ...newCar, specs: [...newCar.specs, spec.trim()] });
      setSpec("");
    }
  };

  const removeSpec = (index: number) => {
    if (newCar.specs) {
      const updatedSpecs = [...newCar.specs];
      updatedSpecs.splice(index, 1);
      setNewCar({ ...newCar, specs: updatedSpecs });
    }
  };

  const addFeature = () => {
    if (feature.trim() && newCar.features) {
      setNewCar({ ...newCar, features: [...(newCar.features || []), feature.trim()] });
      setFeature("");
    }
  };

  const removeFeature = (index: number) => {
    if (newCar.features) {
      const updatedFeatures = [...newCar.features];
      updatedFeatures.splice(index, 1);
      setNewCar({ ...newCar, features: updatedFeatures });
    }
  };

  const addLocation = () => {
    if (location.trim() && newCar.locations) {
      setNewCar({ ...newCar, locations: [...(newCar.locations || []), location.trim()] });
      setLocation("");
    }
  };

  const removeLocation = (index: number) => {
    if (newCar.locations) {
      const updatedLocations = [...newCar.locations];
      updatedLocations.splice(index, 1);
      setNewCar({ ...newCar, locations: updatedLocations });
    }
  };

  const addImage = () => {
    if (imageUrl.trim() && newCar.images) {
      setNewCar({ ...newCar, images: [...(newCar.images || []), imageUrl.trim()] });
      setImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    if (newCar.images) {
      const updatedImages = [...newCar.images];
      updatedImages.splice(index, 1);
      setNewCar({ ...newCar, images: updatedImages });
    }
  };

  const setMainImage = (image: string) => {
    setNewCar({ ...newCar, image });
  };

  const handleEditCar = (car: CarType) => {
    setEditingCar(car);
    setNewCar({...car});
    setShowForm(true);
  };

  const handleDeleteCar = (carId: number) => {
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    
    toast({
      title: "Car deleted",
      description: "The car has been removed from the fleet"
    });
  };

  const resetForm = () => {
    setNewCar({
      id: cars.length + 1,
      name: "",
      category: "",
      price: 0,
      perDay: true,
      image: "",
      images: [],
      specs: [],
      description: "",
      features: [],
      locations: []
    });
    setEditingCar(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!newCar.name || !newCar.category || !newCar.price || !newCar.image || !newCar.specs?.length) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please fill in all required fields"
      });
      return;
    }
    
    // If no main image is set, use the first image from the gallery
    if (!newCar.image && newCar.images && newCar.images.length > 0) {
      newCar.image = newCar.images[0];
    }
    
    if (editingCar) {
      // Update existing car
      const updatedCars = cars.map(car => 
        car.id === editingCar.id ? newCar as CarType : car
      );
      setCars(updatedCars);
      
      toast({
        title: "Car updated",
        description: `${newCar.name} has been updated`
      });
    } else {
      // Add new car to the list
      const updatedCars = [...cars, newCar as CarType];
      setCars(updatedCars);
      
      toast({
        title: "Car added successfully",
        description: `${newCar.name} has been added to the fleet`
      });
    }
    
    // Reset form
    resetForm();
  };

  const handleBookingStatusChange = (bookingId: number, newStatus: "pending" | "approved" | "rejected") => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? {...booking, status: newStatus} : booking
    );
    
    setBookings(updatedBookings);
    
    toast({
      title: `Booking ${newStatus}`,
      description: `Booking #${bookingId} has been ${newStatus}`
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !selectedCarId) return;
    
    // Find the availability entry for this car
    const carAvailabilityIndex = availabilities.findIndex(a => a.carId === selectedCarId);
    
    if (carAvailabilityIndex >= 0) {
      const carAvailability = availabilities[carAvailabilityIndex];
      
      // Check if date is already in the array
      const dateExists = carAvailability.dates.some(d => 
        d.getFullYear() === date.getFullYear() && 
        d.getMonth() === date.getMonth() && 
        d.getDate() === date.getDate()
      );
      
      let newDates;
      if (dateExists) {
        // Remove the date
        newDates = carAvailability.dates.filter(d => 
          !(d.getFullYear() === date.getFullYear() && 
            d.getMonth() === date.getMonth() && 
            d.getDate() === date.getDate())
        );
      } else {
        // Add the date
        newDates = [...carAvailability.dates, new Date(date)];
      }
      
      // Update the availability
      const newAvailabilities = [...availabilities];
      newAvailabilities[carAvailabilityIndex] = {
        ...carAvailability,
        dates: newDates
      };
      
      setAvailabilities(newAvailabilities);
      setSelectedDates(newDates);
      
      toast({
        title: dateExists ? "Date removed" : "Date added",
        description: `${date.toLocaleDateString()} has been ${dateExists ? 'removed from' : 'added to'} the availability`
      });
    }
  };

  const handleSelectCar = (carId: number) => {
    setSelectedCarId(carId);
    
    // Find dates for this car
    const carAvailability = availabilities.find(a => a.carId === carId);
    if (carAvailability) {
      setSelectedDates(carAvailability.dates);
    } else {
      setSelectedDates([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    window.location.href = "/admin-login";
  };

  return (
    <AuthGuard>
      <Layout>
        <div className="pt-32 pb-20 bg-luxury-black min-h-screen">
          <div className="luxury-container">
            <div className="flex items-center justify-between mb-8">
              <h1 className="section-title flex items-center">
                <Settings className="h-8 w-8 mr-3 text-luxury-gold" />
                Admin Dashboard
              </h1>
              <div className="flex space-x-3">
                <Button 
                  className="btn-luxury" 
                  onClick={() => {
                    setEditingCar(null);
                    setShowForm(!showForm);
                  }}
                >
                  {showForm ? "Cancel" : "Add New Car"}
                </Button>
                <Button 
                  variant="outline" 
                  className="btn-outline-luxury"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
            
            {showForm ? (
              <div className="glass-card p-6 rounded-lg mb-8">
                <h2 className="font-playfair text-2xl text-white mb-4">
                  {editingCar ? `Edit ${editingCar.name}` : "Add New Car"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white mb-2">Car Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={newCar.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Lamborghini Aventador"
                          className="input-luxury w-full"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white mb-2">Category *</label>
                        <select
                          name="category"
                          value={newCar.category}
                          onChange={handleInputChange}
                          className="input-luxury w-full appearance-none"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="Supercar">Supercar</option>
                          <option value="Luxury Sedan">Luxury Sedan</option>
                          <option value="Convertible">Convertible</option>
                          <option value="Grand Tourer">Grand Tourer</option>
                          <option value="Sports Car">Sports Car</option>
                          <option value="Luxury SUV">Luxury SUV</option>
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white mb-2">Price (₹) *</label>
                          <input
                            type="number"
                            name="price"
                            value={newCar.price}
                            onChange={handleInputChange}
                            placeholder="e.g. 50000"
                            className="input-luxury w-full"
                            min="0"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-white mb-2">Pricing Type</label>
                          <select
                            name="perDay"
                            value={newCar.perDay?.toString()}
                            onChange={handleInputChange}
                            className="input-luxury w-full appearance-none"
                          >
                            <option value="true">Per Day</option>
                            <option value="false">Fixed Price</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white mb-2">Description</label>
                        <textarea
                          name="description"
                          value={newCar.description}
                          onChange={handleInputChange}
                          placeholder="Describe the car..."
                          className="input-luxury w-full"
                          rows={4}
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white mb-2">Main Image URL *</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            name="image"
                            value={newCar.image}
                            onChange={handleInputChange}
                            placeholder="https://example.com/image.jpg"
                            className="input-luxury flex-grow"
                            required
                          />
                          {newCar.image && (
                            <Button 
                              variant="outline" 
                              className="btn-outline-luxury"
                              type="button"
                              onClick={() => setNewCar({ ...newCar, image: "" })}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {newCar.image && (
                          <div className="mt-2 relative rounded-md overflow-hidden h-32">
                            <img 
                              src={newCar.image} 
                              alt="Main car image" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                              }}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-white mb-2">Additional Images</label>
                        <div className="flex items-center space-x-2 mb-2">
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="input-luxury flex-grow"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="btn-outline-luxury"
                            onClick={addImage}
                            disabled={!imageUrl.trim()}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {newCar.images && newCar.images.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {newCar.images.map((img, index) => (
                              <div key={index} className="relative rounded-md overflow-hidden group">
                                <img 
                                  src={img} 
                                  alt={`Car preview ${index + 1}`} 
                                  className="w-full h-20 object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                  <button
                                    type="button"
                                    className="p-1 bg-luxury-gold text-black rounded-full"
                                    onClick={() => setMainImage(img)}
                                    title="Set as main image"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button
                                    type="button"
                                    className="p-1 bg-red-500 text-white rounded-full"
                                    onClick={() => removeImage(index)}
                                    title="Remove image"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div>
                      <label className="block text-white mb-2">Specifications *</label>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={spec}
                          onChange={(e) => setSpec(e.target.value)}
                          placeholder="e.g. 700+ HP"
                          className="input-luxury flex-grow"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="btn-outline-luxury"
                          onClick={addSpec}
                          disabled={!spec.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 mt-2 max-h-32 overflow-y-auto pr-2">
                        {newCar.specs && newCar.specs.map((spec, index) => (
                          <div key={index} className="flex items-center justify-between bg-luxury-gold/10 p-2 rounded-md">
                            <span className="text-white">{spec}</span>
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-500"
                              onClick={() => removeSpec(index)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Features</label>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => setFeature(e.target.value)}
                          placeholder="e.g. Carbon fiber body"
                          className="input-luxury flex-grow"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="btn-outline-luxury"
                          onClick={addFeature}
                          disabled={!feature.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 mt-2 max-h-32 overflow-y-auto pr-2">
                        {newCar.features && newCar.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between bg-luxury-gold/10 p-2 rounded-md">
                            <span className="text-white">{feature}</span>
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-500"
                              onClick={() => removeFeature(index)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Available Locations</label>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="e.g. Mumbai"
                          className="input-luxury flex-grow"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="btn-outline-luxury"
                          onClick={addLocation}
                          disabled={!location.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 mt-2 max-h-32 overflow-y-auto pr-2">
                        {newCar.locations && newCar.locations.map((location, index) => (
                          <div key={index} className="flex items-center justify-between bg-luxury-gold/10 p-2 rounded-md">
                            <span className="text-white">{location}</span>
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-500"
                              onClick={() => removeLocation(index)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-luxury-gold/20">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="btn-outline-luxury"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="btn-luxury">
                      <Car className="h-4 w-4 mr-2" />
                      {editingCar ? "Update Car" : "Add Car to Fleet"}
                    </Button>
                  </div>
                </form>
              </div>
            ) : null}

            <Tabs defaultValue="fleet" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-luxury-black border border-luxury-gold/20">
                <TabsTrigger value="fleet" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black">
                  <Car className="h-4 w-4 mr-2" />
                  Fleet Management
                </TabsTrigger>
                <TabsTrigger value="bookings" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Booking Requests
                </TabsTrigger>
                <TabsTrigger value="availability" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-black">
                  <CalendarRange className="h-4 w-4 mr-2" />
                  Car Availability
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="fleet">
                <div className="glass-card p-6 rounded-lg">
                  <h2 className="font-playfair text-2xl text-white mb-6">Fleet Management</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-luxury-gold/20">
                          <th className="text-left py-3 px-4 text-luxury-gold">ID</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Image</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Name</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Category</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Price</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Locations</th>
                          <th className="text-right py-3 px-4 text-luxury-gold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cars.map((car) => (
                          <tr key={car.id} className="border-b border-luxury-gold/10 hover:bg-luxury-gold/5">
                            <td className="py-3 px-4 text-white">{car.id}</td>
                            <td className="py-3 px-4">
                              <div className="w-16 h-12 rounded overflow-hidden">
                                <img 
                                  src={car.image} 
                                  alt={car.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
                                  }}
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4 text-white">{car.name}</td>
                            <td className="py-3 px-4 text-white/70">{car.category}</td>
                            <td className="py-3 px-4">
                              <span className="gold-gradient-text font-bold">₹{car.price.toLocaleString()}</span>
                              <span className="text-white/50 text-sm ml-1">{car.perDay ? '/day' : ''}</span>
                            </td>
                            <td className="py-3 px-4 text-white/70">
                              {car.locations?.join(", ") || "Multiple Locations"}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-luxury-gold/10 border-luxury-gold/30 hover:bg-luxury-gold/20"
                                  onClick={() => handleEditCar(car)}
                                >
                                  <PenLine className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400"
                                  onClick={() => handleDeleteCar(car.id)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="bookings">
                <div className="glass-card p-6 rounded-lg">
                  <h2 className="font-playfair text-2xl text-white mb-6">Booking Requests</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-luxury-gold/20">
                          <th className="text-left py-3 px-4 text-luxury-gold">ID</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Car</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Customer</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Contact</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Dates</th>
                          <th className="text-left py-3 px-4 text-luxury-gold">Status</th>
                          <th className="text-right py-3 px-4 text-luxury-gold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="border-b border-luxury-gold/10 hover:bg-luxury-gold/5">
                            <td className="py-3 px-4 text-white">{booking.id}</td>
                            <td className="py-3 px-4 text-white">{booking.carName}</td>
                            <td className="py-3 px-4 text-white">{booking.customerName}</td>
                            <td className="py-3 px-4 text-white/70">
                              <div>{booking.customerEmail}</div>
                              <div>{booking.customerPhone}</div>
                            </td>
                            <td className="py-3 px-4 text-white/70">
                              <div>{booking.startDate.toLocaleDateString()}</div>
                              <div>to {booking.endDate.toLocaleDateString()}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-sm ${
                                booking.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                booking.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex justify-end space-x-2">
                                {booking.status !== 'approved' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-400"
                                    onClick={() => handleBookingStatusChange(booking.id, 'approved')}
                                  >
                                    Approve
                                  </Button>
                                )}
                                {booking.status !== 'rejected' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400"
                                    onClick={() => handleBookingStatusChange(booking.id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                )}
                                {booking.status !== 'pending' && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20 text-yellow-400"
                                    onClick={() => handleBookingStatusChange(booking.id, 'pending')}
                                  >
                                    Pending
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="availability">
                <div className="glass-card p-6 rounded-lg">
                  <h2 className="font-playfair text-2xl text-white mb-6">Car Availability Management</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <h3 className="text-xl text-white mb-4">Select Car</h3>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                        {cars.map((car) => (
                          <div 
                            key={car.id}
                            className={`flex items-center border ${selectedCarId === car.id ? 
                              'border-luxury-gold bg-luxury-gold/10' : 'border-white/10'} 
                              rounded-md p-3 cursor-pointer hover:bg-luxury-gold/5 transition-colors`}
                            onClick={() => handleSelectCar(car.id)}
                          >
                            <div className="w-12 h-10 rounded overflow-hidden mr-3">
                              <img 
                                src={car.image} 
                                alt={car.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
                                }}
                              />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{car.name}</h4>
                              <p className="text-white/70 text-sm">{car.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <h3 className="text-xl text-white mb-4">
                        {selectedCarId ? 
                          `Manage Availability: ${cars.find(c => c.id === selectedCarId)?.name}` : 
                          'Select a car to manage availability'}
                      </h3>
                      
                      {selectedCarId ? (
                        <div className="bg-white/5 p-4 rounded-lg">
                          <p className="text-white/70 mb-4">
                            Click on dates to toggle availability. Available dates are highlighted.
                          </p>
                          <div className="rounded-md overflow-hidden">
                            <Calendar
                              mode="multiple"
                              selected={selectedDates}
                              onSelect={(date) => handleDateSelect(date)}
                              className="bg-white border rounded-lg pointer-events-auto"
                              disabled={{
                                before: new Date(),
                              }}
                            />
                          </div>
                          <div className="flex items-center justify-between mt-4 text-white/70 text-sm">
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-luxury-gold mr-2"></div>
                              <span>Available dates</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 rounded-full bg-white/20 mr-2"></div>
                              <span>Unavailable dates</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[400px] bg-white/5 rounded-lg">
                          <div className="text-center">
                            <CalendarRange className="h-10 w-10 text-white/30 mx-auto mb-3" />
                            <p className="text-white/50">Select a car from the list to manage its availability</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Layout>
    </AuthGuard>
  );
};

export default AdminPage;
