
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CarType, luxuryCars } from "@/types/car";
import { useToast } from "@/hooks/use-toast";
import { Car, Upload, X, Plus, Check } from "lucide-react";

const AdminPage = () => {
  const { toast } = useToast();
  const [cars, setCars] = useState<CarType[]>(luxuryCars);
  const [showForm, setShowForm] = useState(false);
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
  const [spec, setSpec] = useState("");
  const [feature, setFeature] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

  const resetForm = () => {
    setNewCar({
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
    
    // Add new car to the list
    const updatedCars = [...cars, newCar as CarType];
    setCars(updatedCars);
    
    toast({
      title: "Car added successfully",
      description: `${newCar.name} has been added to the fleet`
    });
    
    // In a real app, we would send the data to an API
    console.log("New car added:", newCar);
    
    // Reset form
    resetForm();
  };

  return (
    <Layout>
      <div className="pt-32 pb-20 bg-luxury-black">
        <div className="luxury-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="section-title">Admin Dashboard</h1>
            <Button 
              className="btn-luxury" 
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "Add New Car"}
            </Button>
          </div>
          
          {showForm ? (
            <div className="glass-card p-6 rounded-lg mb-8">
              <h2 className="font-playfair text-2xl text-white mb-4">Add New Car</h2>
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
                    Add Car to Fleet
                  </Button>
                </div>
              </form>
            </div>
          ) : null}
          
          <div className="glass-card p-6 rounded-lg">
            <h2 className="font-playfair text-2xl text-white mb-6">Current Fleet</h2>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
