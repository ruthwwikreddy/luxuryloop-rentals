import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CarRenterManagement from "@/components/CarRenterManagement";
import BookingManagement from "@/components/BookingManagement";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { LogOut, Car, Users, Calendar } from "lucide-react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("cars");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin-login");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        <div className="bg-luxury-black p-4 shadow-md flex justify-between items-center">
          <h1 className="font-playfair text-2xl text-white">Admin Dashboard</h1>
          <Button variant="outline" className="btn-outline-luxury" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="container mx-auto py-8 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="cars" className="flex items-center">
                <Car className="mr-2 h-4 w-4" />
                Car Management
              </TabsTrigger>
              <TabsTrigger value="renters" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Car Renters
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Bookings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cars">
              <Card className="p-6">
                {/* Car Management component will be added later */}
                <div className="text-center py-8">
                  <h2 className="text-2xl font-semibold mb-4">Car Management</h2>
                  <p className="text-gray-500">
                    This section is coming soon. You'll be able to manage your car fleet here.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="renters">
              <CarRenterManagement />
            </TabsContent>

            <TabsContent value="bookings">
              <BookingManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminPage;
