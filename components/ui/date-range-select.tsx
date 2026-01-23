"use client";

import * as React from "react";
import {
  subDays,
  format,
  startOfDay,
  endOfDay,
  subMonths,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { Calendar as ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DateRangeSelectProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
}

export function DateRangeSelect({
  date,
  setDate,
  className,
}: DateRangeSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date);

  // Reset temp date when calendar opens
  React.useEffect(() => {
    if (showCalendar) {
      setTempDate(date);
    }
  }, [showCalendar, date]);

  const handlePresetSelect = (preset: string) => {
    const today = new Date();
    let newDate: DateRange | undefined;

    switch (preset) {
      case "today":
        newDate = {
          from: startOfDay(today),
          to: endOfDay(today),
        };
        break;
      case "yesterday":
        const yesterday = subDays(today, 1);
        newDate = {
          from: startOfDay(yesterday),
          to: endOfDay(yesterday),
        };
        break;
      case "this_month":
        newDate = {
          from: startOfMonth(today),
          to: endOfMonth(today),
        };
        break;
      case "last_3_months":
        newDate = {
          from: startOfDay(subMonths(today, 3)),
          to: endOfDay(today),
        };
        break;
      case "last_month":
        const lastMonth = subMonths(today, 1);
        newDate = {
          from: startOfMonth(lastMonth),
          to: endOfMonth(lastMonth),
        };
        break;
      case "this_year":
        newDate = {
          from: startOfYear(today),
          to: endOfYear(today),
        };
        break;
      case "last_year":
        const lastYear = subYears(today, 1);
        newDate = {
          from: startOfYear(lastYear),
          to: endOfYear(lastYear),
        };
        break;
      case "custom":
        setOpen(false); // Close popover
        setShowCalendar(true); // Open dialog
        return;
    }

    if (newDate) {
      setDate(newDate);
      setOpen(false);
    }
  };

  const handleCalendarSelect = (range: DateRange | undefined) => {
    setTempDate(range);
  };

  const handleApplyCustom = () => {
    setDate(tempDate);
    setShowCalendar(false);
  };

  const selectedLabel = React.useMemo(() => {
    if (!date?.from) return "Select Date Range";

    if (date.to) {
      return `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`;
    }
    return format(date.from, "LLL dd, y");
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-between text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            {selectedLabel}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col p-1">
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => handlePresetSelect("today")}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => handlePresetSelect("yesterday")}
            >
              Yesterday
            </Button>
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => handlePresetSelect("this_month")}
            >
              This Month
            </Button>
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => handlePresetSelect("last_month")}
            >
              Last Month
            </Button>
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => handlePresetSelect("last_3_months")}
            >
              Last Three Months
            </Button>
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => handlePresetSelect("this_year")}
            >
              This Year
            </Button>
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => handlePresetSelect("last_year")}
            >
              Last Year
            </Button>
            <Button
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => handlePresetSelect("custom")}
            >
              Custom Range
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <div className="">
        <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
          <DialogContent className="max-w-auto w-auto p-0">
            <DialogHeader className="p-2">
              <DialogTitle className="mt-2">Custom Date Range</DialogTitle>
            </DialogHeader>
            <div className="p-2 border-b">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCalendar(false);
                  setOpen(true);
                }}
              >
                &larr; Back to presets
              </Button>
            </div>
            <div className="p-0">
              <Calendar
                mode="range"
                defaultMonth={tempDate?.from}
                selected={tempDate}
                onSelect={handleCalendarSelect}
                numberOfMonths={2}
              />
            </div>
            <div className="flex items-center justify-end gap-2 p-3 border-t">
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={() => setShowCalendar(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                size="sm"
                onClick={handleApplyCustom}
              >
                Apply
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
