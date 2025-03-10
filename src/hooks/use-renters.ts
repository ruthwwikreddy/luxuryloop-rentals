
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from './use-toast';

export interface RenterType {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  description: string | null;
  image: string | null;
  created_at: string | null;
}

export function useRenters() {
  const [renters, setRenters] = useState<RenterType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all renters
  const fetchRenters = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('car_renters')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      setRenters(data || []);
    } catch (error) {
      console.error('Error fetching renters:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to load renters',
        description: 'Please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a new renter
  const addRenter = async (renter: Omit<RenterType, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('car_renters')
        .insert([renter])
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      setRenters([...renters, data]);
      return data;
    } catch (error) {
      console.error('Error adding renter:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to add renter',
        description: 'Please try again later',
      });
      return null;
    }
  };

  // Update an existing renter
  const updateRenter = async (id: number, renter: Partial<RenterType>) => {
    try {
      const { data, error } = await supabase
        .from('car_renters')
        .update(renter)
        .eq('id', id)
        .select('*')
        .single();
      
      if (error) {
        throw error;
      }
      
      setRenters(renters.map(r => r.id === id ? data : r));
      return data;
    } catch (error) {
      console.error('Error updating renter:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to update renter',
        description: 'Please try again later',
      });
      return null;
    }
  };

  // Delete a renter
  const deleteRenter = async (id: number) => {
    try {
      const { error } = await supabase
        .from('car_renters')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setRenters(renters.filter(r => r.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting renter:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to delete renter',
        description: 'Please try again later',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchRenters();
  }, []);

  return {
    renters,
    loading,
    fetchRenters,
    addRenter,
    updateRenter,
    deleteRenter
  };
}
