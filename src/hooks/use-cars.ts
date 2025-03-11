
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { CarType } from '@/types/supabase';
import { useToast } from './use-toast';

export const useCars = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('public:cars')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, (payload) => {
        console.log('Change received!', payload);
        fetchCars();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching cars',
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCarById = async (id: number | string): Promise<CarType | null> => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching car by ID:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching car details',
        description: 'Please try again later.',
      });
      return null;
    }
  };

  const addCar = async (car: Omit<CarType, 'id'>) => {
    try {
      // Validate main image URL
      if (!isValidUrl(car.image)) {
        throw new Error('Invalid main image URL');
      }

      // Validate additional image URLs
      if (car.images && car.images.some(url => !isValidUrl(url))) {
        throw new Error('One or more additional image URLs are invalid');
      }

      const { data, error } = await supabase
        .from('cars')
        .insert([car])
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Car added successfully',
        description: `${car.name} has been added to the fleet`,
      });
      return data;
    } catch (error) {
      console.error('Error adding car:', error);
      toast({
        variant: 'destructive',
        title: 'Error adding car',
        description: error.message || 'Please try again later.',
      });
      return null;
    }
  };

  const updateCar = async (id: number, car: Partial<CarType>) => {
    try {
      // Validate main image URL if provided
      if (car.image && !isValidUrl(car.image)) {
        throw new Error('Invalid main image URL');
      }

      // Validate additional image URLs if provided
      if (car.images && car.images.some(url => !isValidUrl(url))) {
        throw new Error('One or more additional image URLs are invalid');
      }

      const { data, error } = await supabase
        .from('cars')
        .update(car)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Car updated successfully',
        description: `${car.name || 'Car'} has been updated`,
      });
      return data;
    } catch (error) {
      console.error('Error updating car:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating car',
        description: error.message || 'Please try again later.',
      });
      return null;
    }
  };

  const deleteCar = async (id: number) => {
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error deleting car:', error);
      toast({
        variant: 'destructive',
        title: 'Error deleting car',
        description: 'Please try again later.',
      });
      return false;
    }
  };

  // Helper function to validate URLs
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return {
    cars,
    loading,
    fetchCars,
    fetchCarById,
    addCar,
    updateCar,
    deleteCar
  };
};
