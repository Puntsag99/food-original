"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";
import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function DateRangePicker() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className="w-[320px] h-9 rounded-full border border-solid">
      <div className="py-2 px-4 flex items-center gap-x-2">
        <CalendarDays className="w-4 h-4" />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 h-auto font-normal text-left"
            >
              {range?.from ? (
                range.to ? (
                  <>
                    {format(range.from, "LLL dd, y")} –{" "}
                    {format(range.to, "LLL dd, y")}
                  </>
                ) : (
                  format(range.from, "LLL dd, y")
                )
              ) : (
                "Pick a date range"
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
