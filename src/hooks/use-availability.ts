
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AvailableDateType } from '@/types/supabase';
import { useToast } from './use-toast';

export const useAvailability = () => {
  const [availabilities, setAvailabilities] = useState<Record<number, Date[]>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAvailability();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('public:available_dates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'available_dates' }, (payload) => {
        console.log('Availability change received!', payload);
        fetchAvailability();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('available_dates')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        throw error;
      }

      // Group by car_id
      const availabilityMap: Record<number, Date[]> = {};
      (data || []).forEach((avail: AvailableDateType) => {
        if (!availabilityMap[avail.car_id]) {
          availabilityMap[avail.car_id] = [];
        }
        availabilityMap[avail.car_id].push(new Date(avail.date));
      });

      setAvailabilities(availabilityMap);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching availability data',
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleDateAvailability = async (carId: number, date: Date) => {
    try {
      // Format date to ISO string (YYYY-MM-DD)
      const formattedDate = date.toISOString().split('T')[0];

      // Check if date already exists for this car
      const { data: existingDate, error: checkError } = await supabase
        .from('available_dates')
        .select('*')
        .eq('car_id', carId)
        .eq('date', formattedDate);

      if (checkError) {
        throw checkError;
      }

      if (existingDate && existingDate.length > 0) {
        // Date exists, delete it
        const { error: deleteError } = await supabase
          .from('available_dates')
          .delete()
          .eq('car_id', carId)
          .eq('date', formattedDate);

        if (deleteError) {
          throw deleteError;
        }
      } else {
        // Date doesn't exist, add it
        const { error: insertError } = await supabase
          .from('available_dates')
          .insert([{ car_id: carId, date: formattedDate }]);

        if (insertError) {
          throw insertError;
        }
      }

      return true;
    } catch (error) {
      console.error('Error toggling date availability:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating availability',
        description: 'Please try again later.',
      });
      return false;
    }
  };

  const getAvailableDatesForCar = (carId: number): Date[] => {
    return availabilities[carId] || [];
  };

  return {
    availabilities,
    loading,
    toggleDateAvailability,
    getAvailableDatesForCar
  };
};
