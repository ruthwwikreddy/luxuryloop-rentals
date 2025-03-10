
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

  const addCar = async (car: Omit<CarType, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .insert([car])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error adding car:', error);
      toast({
        variant: 'destructive',
        title: 'Error adding car',
        description: 'Please try again later.',
      });
      return null;
    }
  };

  const updateCar = async (id: number, car: Partial<CarType>) => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .update(car)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating car:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating car',
        description: 'Please try again later.',
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

  return {
    cars,
    loading,
    addCar,
    updateCar,
    deleteCar
  };
};
