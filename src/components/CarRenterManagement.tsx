
import { useState } from 'react';
import { useCarRenters, CarRenterType } from '@/hooks/use-car-renters';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PenLine, Trash, Star, Plus, X } from 'lucide-react';

const CarRenterManagement = () => {
  const { carRenters, loading, addCarRenter, updateCarRenter, deleteCarRenter } = useCarRenters();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingRenter, setEditingRenter] = useState<CarRenterType | null>(null);
  const [newRenter, setNewRenter] = useState<Partial<CarRenterType>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    image: "",
    rating: 0,
    review_count: 0,
    verification: "",
    member_since: "",
    specialties: [],
    featured_cars: []
  });

  // For handling arrays (specialties, featured_cars)
  const [specialty, setSpecialty] = useState("");
  const [featuredCar, setFeaturedCar] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "rating" || name === "review_count") {
      setNewRenter({ ...newRenter, [name]: Number(value) });
    } else {
      setNewRenter({ ...newRenter, [name]: value });
    }
  };

  const addSpecialty = () => {
    if (specialty.trim() && newRenter.specialties) {
      setNewRenter({ 
        ...newRenter, 
        specialties: [...(newRenter.specialties || []), specialty.trim()] 
      });
      setSpecialty("");
    }
  };

  const removeSpecialty = (index: number) => {
    if (newRenter.specialties) {
      const updatedSpecialties = [...newRenter.specialties];
      updatedSpecialties.splice(index, 1);
      setNewRenter({ ...newRenter, specialties: updatedSpecialties });
    }
  };

  const addFeaturedCar = () => {
    if (featuredCar.trim() && newRenter.featured_cars) {
      setNewRenter({ 
        ...newRenter, 
        featured_cars: [...(newRenter.featured_cars || []), featuredCar.trim()] 
      });
      setFeaturedCar("");
    }
  };

  const removeFeaturedCar = (index: number) => {
    if (newRenter.featured_cars) {
      const updatedFeaturedCars = [...newRenter.featured_cars];
      updatedFeaturedCars.splice(index, 1);
      setNewRenter({ ...newRenter, featured_cars: updatedFeaturedCars });
    }
  };

  const resetForm = () => {
    setNewRenter({
      name: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      image: "",
      rating: 0,
      review_count: 0,
      verification: "",
      member_since: "",
      specialties: [],
      featured_cars: []
    });
    setEditingRenter(null);
    setShowForm(false);
  };

  const handleEditRenter = (renter: CarRenterType) => {
    setEditingRenter(renter);
    setNewRenter({...renter});
    setShowForm(true);
  };

  const handleDeleteRenter = async (renterId: number) => {
    if (window.confirm("Are you sure you want to delete this car renter?")) {
      const success = await deleteCarRenter(renterId);
      
      if (success) {
        toast({
          title: "Car renter deleted",
          description: "The car renter has been removed from the system"
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRenter.name) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please provide at least a name for the car renter"
      });
      return;
    }
    
    try {
      if (editingRenter && editingRenter.id) {
        const updatedRenter = await updateCarRenter(editingRenter.id, newRenter);
        
        if (updatedRenter) {
          toast({
            title: "Car renter updated",
            description: `${newRenter.name} has been updated`
          });
          resetForm();
        }
      } else {
        const renterToAdd = newRenter as Omit<CarRenterType, 'id' | 'created_at'>;
        const addedRenter = await addCarRenter(renterToAdd);
        
        if (addedRenter) {
          toast({
            title: "Car renter added successfully",
            description: `${newRenter.name} has been added to the system`
          });
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving car renter:", error);
      toast({
        variant: "destructive",
        title: "Error saving car renter",
        description: "An error occurred while saving the car renter"
      });
    }
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-playfair text-2xl text-white">Car Renter Management</h2>
        <Button 
          className="btn-luxury" 
          onClick={() => {
            setEditingRenter(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "Add New Car Renter"}
        </Button>
      </div>

      {showForm && (
        <div className="glass-card p-6 rounded-lg mb-8 bg-luxury-black/50">
          <h3 className="font-playfair text-xl text-white mb-4">
            {editingRenter ? `Edit ${editingRenter.name}` : "Add New Car Renter"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Car Renter Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newRenter.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Luxury Cars Mumbai"
                    className="input-luxury mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newRenter.email || ""}
                    onChange={handleInputChange}
                    placeholder="e.g. info@example.com"
                    className="input-luxury mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newRenter.phone || ""}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 9876543210"
                    className="input-luxury mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={newRenter.address || ""}
                    onChange={handleInputChange}
                    placeholder="e.g. Worli, Mumbai, Maharashtra"
                    className="input-luxury mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="image" className="text-white">Profile Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={newRenter.image || ""}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="input-luxury mt-1"
                  />
                </div>

                {newRenter.image && (
                  <div className="mt-2 relative rounded-md overflow-hidden h-32 w-32">
                    <img 
                      src={newRenter.image} 
                      alt="Renter profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={newRenter.description || ""}
                    onChange={handleInputChange}
                    placeholder="Describe the car renter..."
                    className="input-luxury mt-1 w-full"
                    rows={4}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating" className="text-white">Rating (0-5)</Label>
                    <div className="flex items-center">
                      <Input
                        id="rating"
                        name="rating"
                        type="number"
                        value={newRenter.rating || 0}
                        onChange={handleInputChange}
                        className="input-luxury mt-1"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                      <Star className="ml-2 h-5 w-5 text-luxury-gold" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="review_count" className="text-white">Number of Reviews</Label>
                    <Input
                      id="review_count"
                      name="review_count"
                      type="number"
                      value={newRenter.review_count || 0}
                      onChange={handleInputChange}
                      className="input-luxury mt-1"
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="verification" className="text-white">Verification Status</Label>
                    <Input
                      id="verification"
                      name="verification"
                      value={newRenter.verification || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. Identity Verified"
                      className="input-luxury mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="member_since" className="text-white">Member Since</Label>
                    <Input
                      id="member_since"
                      name="member_since"
                      value={newRenter.member_since || ""}
                      onChange={handleInputChange}
                      placeholder="e.g. 2019"
                      className="input-luxury mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-white mb-2 block">Specialties</Label>
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    placeholder="e.g. Wedding Cars"
                    className="input-luxury flex-grow"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="btn-outline-luxury"
                    onClick={addSpecialty}
                    disabled={!specialty.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 mt-2 max-h-32 overflow-y-auto pr-2">
                  {newRenter.specialties && newRenter.specialties.map((spec, index) => (
                    <div key={index} className="flex items-center justify-between bg-luxury-gold/10 p-2 rounded-md">
                      <span className="text-white">{spec}</span>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-500"
                        onClick={() => removeSpecialty(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-white mb-2 block">Featured Cars</Label>
                <div className="flex items-center space-x-2 mb-2">
                  <Input
                    value={featuredCar}
                    onChange={(e) => setFeaturedCar(e.target.value)}
                    placeholder="e.g. Lamborghini Aventador"
                    className="input-luxury flex-grow"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="btn-outline-luxury"
                    onClick={addFeaturedCar}
                    disabled={!featuredCar.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 mt-2 max-h-32 overflow-y-auto pr-2">
                  {newRenter.featured_cars && newRenter.featured_cars.map((car, index) => (
                    <div key={index} className="flex items-center justify-between bg-luxury-gold/10 p-2 rounded-md">
                      <span className="text-white">{car}</span>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-500"
                        onClick={() => removeFeaturedCar(index)}
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
                {editingRenter ? "Update Car Renter" : "Add Car Renter"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Renter List */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-white">Loading car renters...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-luxury-gold/20">
                <th className="text-left py-3 px-4 text-luxury-gold">ID</th>
                <th className="text-left py-3 px-4 text-luxury-gold">Image</th>
                <th className="text-left py-3 px-4 text-luxury-gold">Name</th>
                <th className="text-left py-3 px-4 text-luxury-gold">Contact</th>
                <th className="text-left py-3 px-4 text-luxury-gold">Rating</th>
                <th className="text-left py-3 px-4 text-luxury-gold">Location</th>
                <th className="text-right py-3 px-4 text-luxury-gold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {carRenters.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-white/70">
                    No car renters found. Add some to get started.
                  </td>
                </tr>
              ) : (
                carRenters.map((renter) => (
                  <tr key={renter.id} className="border-b border-luxury-gold/10 hover:bg-luxury-gold/5">
                    <td className="py-3 px-4 text-white">{renter.id}</td>
                    <td className="py-3 px-4">
                      {renter.image ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img 
                            src={renter.image} 
                            alt={renter.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/48x48?text=No+Image";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center">
                          <span className="text-white/70">{renter.name.charAt(0)}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-white">{renter.name}</td>
                    <td className="py-3 px-4 text-white/70">
                      {renter.email && <div>{renter.email}</div>}
                      {renter.phone && <div>{renter.phone}</div>}
                    </td>
                    <td className="py-3 px-4">
                      {renter.rating ? (
                        <div className="flex items-center">
                          <span className="text-luxury-gold font-medium">{renter.rating}</span>
                          <Star className="h-4 w-4 text-luxury-gold fill-luxury-gold ml-1" />
                          <span className="text-white/50 text-sm ml-1">({renter.review_count || 0})</span>
                        </div>
                      ) : (
                        <span className="text-white/50">No rating</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-white/70">
                      {renter.address || "No address set"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-luxury-gold/10 border-luxury-gold/30 hover:bg-luxury-gold/20"
                          onClick={() => handleEditRenter(renter)}
                        >
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400"
                          onClick={() => handleDeleteRenter(renter.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CarRenterManagement;
