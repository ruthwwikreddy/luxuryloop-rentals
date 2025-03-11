
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarWithAvailabilityProps {
  label: string;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  availableDates: Date[];
  className?: string;
  minDate?: Date;
}

const CalendarWithAvailability = ({
  label,
  selectedDate,
  onDateChange,
  availableDates,
  className,
  minDate
}: CalendarWithAvailabilityProps) => {
  const today = new Date();
  
  // Default minimum date is today if not specified
  const effectiveMinDate = minDate || today;
  
  // Function to determine if a date is disabled
  const isDateDisabled = (date: Date) => {
    // Check if date is before minimum date
    if (date < effectiveMinDate) return true;
    
    // Check if date is in available dates
    return !availableDates.some(
      availableDate => 
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );
  };

  return (
    <div className={className}>
      <label className="block text-white mb-2">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal border-luxury-gold/30 bg-luxury-black/50 hover:bg-luxury-black/70",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-luxury-gold" />
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-luxury-gold/30 bg-luxury-black/90">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            disabled={isDateDisabled}
            modifiers={{
              available: availableDates
            }}
            modifiersClassNames={{
              available: "border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold/20"
            }}
            className="pointer-events-auto"
            classNames={{
              day_today: "bg-luxury-gold/20 text-luxury-gold"
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarWithAvailability;
