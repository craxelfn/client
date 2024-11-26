"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

interface TimeSlot {
  time: string;
  selected: boolean;
}

const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { time: "09:00", selected: false },
  { time: "10:00", selected: false },
  { time: "11:00", selected: false },
  { time: "12:00", selected: false },
  { time: "14:00", selected: false },
  { time: "15:00", selected: false },
  { time: "16:00", selected: false },
  { time: "17:00", selected: false },
];

export function QuickSchedule() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>(DEFAULT_TIME_SLOTS);

  const toggleTimeSlot = (index: number) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index].selected = !newTimeSlots[index].selected;
    setTimeSlots(newTimeSlots);
  };

  const resetTimeSlots = () => {
    setTimeSlots(DEFAULT_TIME_SLOTS.map(slot => ({ ...slot, selected: false })));
    toast.success("Time slots have been reset");
  };

  const saveSchedule = () => {
    toast.success("Schedule saved successfully");
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-6 pb-2">
        <h2 className="text-2xl font-semibold tracking-tight">Quick Schedule</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={resetTimeSlots}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            size="sm"
            className="gap-2"
            onClick={saveSchedule}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 p-6">
        <div className="col-span-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
            classNames={{
              months: "space-y-4",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: cn(
                "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
                "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              ),
              day: cn(
                "h-8 w-8 p-0 font-normal",
                "hover:bg-accent hover:text-accent-foreground"
              ),
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_hidden: "invisible",
            }}
          />
        </div>
        <div className="col-span-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              {date ? format(date, "MMMM d, yyyy") : "Select a date"}
            </h3>
            <ScrollArea className="h-[280px] pr-4">
              <div className="space-y-2">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={slot.time}
                    variant={slot.selected ? "default" : "outline"}
                    className={cn(
                      "w-full justify-start",
                      slot.selected && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => toggleTimeSlot(index)}
                  >
                    <Badge
                      variant={slot.selected ? "secondary" : "outline"}
                      className="mr-2"
                    >
                      {slot.time}
                    </Badge>
                    {slot.selected ? "Available" : "Unavailable"}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}