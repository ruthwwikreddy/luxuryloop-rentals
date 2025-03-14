
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BookingType } from '@/types/supabase';
import { useToast } from './use-toast';

export const useBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Cast status to the expected type
      const typedData = (data || []).map(booking => ({
        ...booking,
        status: booking.status as "pending" | "approved" | "rejected"
      })) as BookingType[];

      setBookings(typedData);
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
  }, [toast]);

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
  }, [fetchBookings]);

  const updateBookingStatus = useCallback(async (id: number, status: 'pending' | 'approved' | 'rejected') => {
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

      // Cast the status to ensure it matches the expected type
      const typedData = {
        ...data,
        status: data.status as "pending" | "approved" | "rejected"
      } as BookingType;

      setBookings(prevBookings => 
        prevBookings.map(booking => booking.id === id ? typedData : booking)
      );
      
      toast({
        title: "Success",
        description: `Booking status updated to ${status}`,
      });
      
      return typedData;
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast({
        variant: 'destructive',
        title: 'Error updating booking',
        description: 'Please try again later.',
      });
      return null;
    }
  }, [toast]);

  const deleteBooking = useCallback(async (id: number) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setBookings(prevBookings => 
        prevBookings.filter(booking => booking.id !== id)
      );
      
      toast({
        title: "Booking Deleted",
        description: "The booking has been successfully deleted."
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast({
        variant: 'destructive',
        title: 'Error deleting booking',
        description: 'Please try again later.',
      });
      return false;
    }
  }, [toast]);

  const addBooking = useCallback(async (booking: Omit<BookingType, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Cast the status to ensure it matches the expected type
      const typedData = {
        ...data,
        status: data.status as "pending" | "approved" | "rejected"
      } as BookingType;

      setBookings(prevBookings => [typedData, ...prevBookings]);
      
      toast({
        title: "Booking Created",
        description: "New booking has been successfully created."
      });
      
      return typedData;
    } catch (error) {
      console.error('Error adding booking:', error);
      toast({
        variant: 'destructive',
        title: 'Error creating booking',
        description: 'Please try again later.',
      });
      return null;
    }
  }, [toast]);

  return {
    bookings,
    loading,
    fetchBookings,
    updateBookingStatus,
    deleteBooking,
    addBooking
  };
};
