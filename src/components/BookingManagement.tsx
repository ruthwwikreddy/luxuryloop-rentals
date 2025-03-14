
import { useState } from 'react';
import { useBookings } from '@/hooks/use-bookings';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search,
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Trash,
  Loader2,
  CalendarDays,
  User,
  Car,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookingType } from '@/types/supabase';

const BookingManagement = () => {
  const { bookings, loading, updateBookingStatus, deleteBooking } = useBookings();
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean, id: number | null }>({ open: false, id: null });
  const [processing, setProcessing] = useState<{ [key: number]: boolean }>({});
  const [viewingBooking, setViewingBooking] = useState<BookingType | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredBookings = bookings.filter(booking => 
    booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.car_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = async (id: number, status: 'pending' | 'approved' | 'rejected') => {
    setProcessing(prev => ({ ...prev, [id]: true }));
    await updateBookingStatus(id, status);
    setProcessing(prev => ({ ...prev, [id]: false }));
  };

  const handleDeleteConfirm = async () => {
    if (confirmDelete.id !== null) {
      setProcessing(prev => ({ ...prev, [confirmDelete.id!]: true }));
      await deleteBooking(confirmDelete.id);
      setConfirmDelete({ open: false, id: null });
      setProcessing(prev => ({ ...prev, [confirmDelete.id!]: false }));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="hover:bg-red-600">Rejected</Badge>;
      case 'pending':
      default:
        return <Badge variant="secondary" className="bg-yellow-500/80 hover:bg-yellow-500 text-white">Pending</Badge>;
    }
  };

  const viewBookingDetails = (booking: BookingType) => {
    setViewingBooking(booking);
    setShowDetails(true);
  };

  return (
    <div className="space-y-4">
      <Card className="border-luxury-gold/20 bg-gray-800/30 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-luxury-gold font-playfair text-2xl flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            Booking Management
          </CardTitle>
          <CardDescription>
            View and manage customer bookings for your luxury car fleet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                className="pl-10 py-6 bg-gray-700/50 border-gray-600 text-white focus:border-luxury-gold focus:ring-luxury-gold/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Filter className="h-4 w-4" />
              <span>Total bookings: {bookings.length}</span>
              <span className="mx-2">•</span>
              <span>Filtered: {filteredBookings.length}</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 animate-spin text-luxury-gold mb-4" />
                <p className="text-luxury-gold">Loading booking data...</p>
              </div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <CalendarDays className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-medium mb-2">No Bookings Found</h3>
              <p>{searchTerm ? 'No bookings match your search criteria' : 'There are no bookings in the system yet'}</p>
            </div>
          ) : (
            <div className="rounded-md border border-gray-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-800">
                  <TableRow className="border-b border-gray-700 hover:bg-gray-800/80">
                    <TableHead className="text-gray-300">Customer</TableHead>
                    <TableHead className="text-gray-300">Car</TableHead>
                    <TableHead className="text-gray-300">Dates</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-right text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow 
                      key={booking.id} 
                      className="border-b border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors"
                      onClick={() => viewBookingDetails(booking)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="bg-luxury-gold/20 p-2 rounded-full">
                            <User className="h-4 w-4 text-luxury-gold" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{booking.customer_name}</div>
                            <div className="text-sm text-gray-400">{booking.customer_email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="bg-luxury-gold/20 p-2 rounded-full">
                            <Car className="h-4 w-4 text-luxury-gold" />
                          </div>
                          <div className="text-gray-300">{booking.car_name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm space-y-1">
                          <div className="bg-gray-700 text-white px-2 py-1 rounded text-xs inline-block w-fit">
                            {format(new Date(booking.start_date), 'MMM d, yyyy')}
                          </div>
                          <div className="text-gray-400 text-xs">to</div>
                          <div className="bg-gray-700 text-white px-2 py-1 rounded text-xs inline-block w-fit">
                            {format(new Date(booking.end_date), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(booking.status)}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        {processing[booking.id] ? (
                          <Loader2 className="h-4 w-4 animate-spin ml-auto" />
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="border-gray-700 bg-gray-800 text-gray-200">
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(booking.id, 'approved')}
                                disabled={booking.status === 'approved'}
                                className="hover:bg-green-900/50 focus:bg-green-900/50 cursor-pointer"
                              >
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(booking.id, 'rejected')}
                                disabled={booking.status === 'rejected'}
                                className="hover:bg-red-900/50 focus:bg-red-900/50 cursor-pointer"
                              >
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleStatusChange(booking.id, 'pending')}
                                disabled={booking.status === 'pending'}
                                className="hover:bg-yellow-900/50 focus:bg-yellow-900/50 cursor-pointer"
                              >
                                <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                                Mark as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => setConfirmDelete({ open: true, id: booking.id })}
                                className="hover:bg-red-900/50 focus:bg-red-900/50 text-red-400 focus:text-red-400 cursor-pointer"
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={confirmDelete.open} onOpenChange={(open) => setConfirmDelete({ ...confirmDelete, open })}>
        <DialogContent className="bg-gray-800 text-white border-luxury-gold/30">
          <DialogHeader>
            <DialogTitle className="text-luxury-gold">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => setConfirmDelete({ open: false, id: null })}
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-gray-800 text-white border-luxury-gold/30 max-w-md">
          {viewingBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="text-luxury-gold font-playfair text-xl">Booking Details</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Complete information for this booking
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-luxury-gold mb-2 flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">Name:</div>
                    <div className="text-white font-medium">{viewingBooking.customer_name}</div>
                    
                    <div className="text-gray-400">Email:</div>
                    <div className="text-white">{viewingBooking.customer_email}</div>
                    
                    <div className="text-gray-400">Phone:</div>
                    <div className="text-white">{viewingBooking.customer_phone}</div>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-luxury-gold mb-2 flex items-center">
                    <Car className="mr-2 h-4 w-4" />
                    Car Details
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">Car:</div>
                    <div className="text-white font-medium">{viewingBooking.car_name}</div>
                    
                    <div className="text-gray-400">Car ID:</div>
                    <div className="text-white">{viewingBooking.car_id}</div>
                  </div>
                </div>
                
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-luxury-gold mb-2 flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Booking Dates
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">Start Date:</div>
                    <div className="text-white">{format(new Date(viewingBooking.start_date), 'MMM d, yyyy')}</div>
                    
                    <div className="text-gray-400">End Date:</div>
                    <div className="text-white">{format(new Date(viewingBooking.end_date), 'MMM d, yyyy')}</div>
                    
                    <div className="text-gray-400">Total Days:</div>
                    <div className="text-white">
                      {Math.ceil((new Date(viewingBooking.end_date).getTime() - new Date(viewingBooking.start_date).getTime()) / (1000 * 60 * 60 * 24)) + 1}
                    </div>
                    
                    <div className="text-gray-400">Status:</div>
                    <div>{getStatusBadge(viewingBooking.status)}</div>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col space-y-2 sm:space-y-0">
                <div className="flex gap-2 w-full">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => {
                      handleStatusChange(viewingBooking.id, 'approved');
                      setShowDetails(false);
                    }}
                    disabled={viewingBooking.status === 'approved'}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      handleStatusChange(viewingBooking.id, 'rejected');
                      setShowDetails(false);
                    }}
                    disabled={viewingBooking.status === 'rejected'}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
