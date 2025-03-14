
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import CarRenterManagement from "@/components/CarRenterManagement";
import BookingManagement from "@/components/BookingManagement";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { LogOut, Car, Users, Calendar, LayoutDashboard } from "lucide-react";
import CarManagement from "@/components/CarManagement";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("cars");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/admin-login");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-luxury-black border-b border-luxury-gold/20 p-4 shadow-lg flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-6 w-6 text-luxury-gold" />
            <h1 className="font-playfair text-2xl md:text-3xl text-white">Admin <span className="text-luxury-gold">Dashboard</span></h1>
          </div>
          <Button 
            variant="outline" 
            className="border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10 transition-all" 
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="container mx-auto py-8 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800/50 p-1 gap-1">
              <TabsTrigger 
                value="cars" 
                className={`flex items-center justify-center py-3 transition-all ${
                  activeTab === "cars" 
                    ? "bg-luxury-gold text-black font-semibold" 
                    : "bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <Car className={`mr-2 h-5 w-5 ${activeTab === "cars" ? "text-black" : "text-luxury-gold"}`} />
                Car Management
              </TabsTrigger>
              <TabsTrigger 
                value="renters" 
                className={`flex items-center justify-center py-3 transition-all ${
                  activeTab === "renters" 
                    ? "bg-luxury-gold text-black font-semibold" 
                    : "bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <Users className={`mr-2 h-5 w-5 ${activeTab === "renters" ? "text-black" : "text-luxury-gold"}`} />
                Car Renters
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className={`flex items-center justify-center py-3 transition-all ${
                  activeTab === "bookings" 
                    ? "bg-luxury-gold text-black font-semibold" 
                    : "bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <Calendar className={`mr-2 h-5 w-5 ${activeTab === "bookings" ? "text-black" : "text-luxury-gold"}`} />
                Bookings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cars">
              <Card className="border-luxury-gold/20 bg-gray-800/50 backdrop-blur-sm shadow-xl p-6">
                <CarManagement />
              </Card>
            </TabsContent>

            <TabsContent value="renters">
              <Card className="border-luxury-gold/20 bg-gray-800/50 backdrop-blur-sm shadow-xl p-6">
                <CarRenterManagement />
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card className="border-luxury-gold/20 bg-gray-800/50 backdrop-blur-sm shadow-xl p-6">
                <BookingManagement />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AdminPage;
