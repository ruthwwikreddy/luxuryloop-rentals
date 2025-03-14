
import { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CarRenterType {
  id: number;
  name: string;
  rating?: number;
  review_count?: number;
  phone?: string;
  email?: string;
  address?: string;
  description?: string;
  specialties?: string[];
  verification?: string;
  member_since?: string;
  featured_cars?: string[];
  image?: string;
  created_at?: string;
}

export const useCarRenters = () => {
  const [carRenters, setCarRenters] = useState<CarRenterType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCarRenters = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('car_renters')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setCarRenters(data || []);
    } catch (error) {
      console.error('Error fetching car renters:', error);
      toast({
        title: "Error",
        description: "Failed to load car renters. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addCarRenter = useCallback(async (carRenter: Omit<CarRenterType, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('car_renters')
        .insert([carRenter])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      setCarRenters(prevRenters => [...prevRenters, data]);
      return data;
    } catch (error) {
      console.error('Error adding car renter:', error);
      toast({
        title: "Error",
        description: "Failed to add car renter. Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  const updateCarRenter = useCallback(async (id: number, updates: Partial<CarRenterType>) => {
    try {
      const { data, error } = await supabase
        .from('car_renters')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      setCarRenters(prevRenters => 
        prevRenters.map(renter => renter.id === id ? data : renter)
      );
      
      return data;
    } catch (error) {
      console.error('Error updating car renter:', error);
      toast({
        title: "Error",
        description: "Failed to update car renter. Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  }, [toast]);

  const deleteCarRenter = useCallback(async (id: number) => {
    try {
      const { error } = await supabase
        .from('car_renters')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setCarRenters(prevRenters => 
        prevRenters.filter(renter => renter.id !== id)
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting car renter:', error);
      toast({
        title: "Error",
        description: "Failed to delete car renter. Please try again later.",
        variant: "destructive"
      });
      return false;
    }
  }, [toast]);

  useEffect(() => {
    fetchCarRenters();
  }, [fetchCarRenters]);

  return {
    carRenters,
    loading,
    fetchCarRenters,
    addCarRenter,
    updateCarRenter,
    deleteCarRenter
  };
};
