
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
  const [isOpen, setIsOpen] = useState(false);
  const [localSelectedDate, setLocalSelectedDate] = useState<Date | undefined>(selectedDate);
  
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

  const handleSelect = (date: Date | undefined) => {
    setLocalSelectedDate(date);
    onDateChange(date);
    setIsOpen(false);
  };

  // Update local state when prop changes
  React.useEffect(() => {
    setLocalSelectedDate(selectedDate);
  }, [selectedDate]);

  return (
    <div className={className}>
      <label className="block text-white mb-2">{label}</label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full pl-3 text-left font-normal border-luxury-gold/30 bg-luxury-black/50 hover:bg-luxury-black/70 transition-colors duration-200",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-luxury-gold" />
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 border-luxury-gold/30 bg-luxury-black/95 backdrop-blur-lg shadow-xl animate-in zoom-in-95 duration-100"
          sideOffset={5}
          align="start"
        >
          <Calendar
            mode="single"
            selected={localSelectedDate}
            onSelect={handleSelect}
            disabled={isDateDisabled}
            modifiers={{
              available: availableDates
            }}
            modifiersClassNames={{
              available: "border border-luxury-gold text-luxury-gold hover:bg-luxury-gold/20"
            }}
            className="bg-transparent"
            classNames={{
              day: cn(
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100 transition-colors duration-200",
                "hover:bg-luxury-gold/20 hover:text-luxury-gold focus:bg-luxury-gold/20 focus:text-luxury-gold"
              ),
              day_today: "bg-luxury-gold/20 text-luxury-gold font-semibold",
              day_selected: "bg-luxury-gold text-black hover:bg-luxury-gold/90",
              day_disabled: "text-muted-foreground opacity-30 hover:bg-transparent hover:text-muted-foreground"
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarWithAvailability;
