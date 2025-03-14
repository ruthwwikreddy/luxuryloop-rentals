
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const CarManagement = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-luxury-gold font-playfair text-2xl">Luxury Car Fleet</CardTitle>
          <CardDescription>
            Manage your luxury car inventory and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4 text-luxury-gold">Car Management Coming Soon</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              This section is under development. You'll soon be able to add, edit, and manage your entire luxury car fleet from this dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarManagement;
