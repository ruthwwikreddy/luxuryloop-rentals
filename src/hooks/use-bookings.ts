
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BookingType } from '@/types/supabase';
import { useToast } from './use-toast';

export const useBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('public:bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
        console.log('Booking change received!', payload);
        fetchBookings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching bookings',
        description: 'Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: number, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating booking',
        description: 'Please try again later.',
      });
      return null;
    }
  };

  const addBooking = async (booking: Omit<BookingType, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error adding booking:', error);
      toast({
        variant: 'destructive',
        title: 'Error creating booking',
        description: 'Please try again later.',
      });
      return null;
    }
  };

  return {
    bookings,
    loading,
    updateBookingStatus,
    addBooking
  };
};
