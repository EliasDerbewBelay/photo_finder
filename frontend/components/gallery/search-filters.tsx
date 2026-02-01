"use client";

import { SearchParams } from "@/types/photo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

interface SearchFiltersProps {
  filters: SearchParams;
  onFilterChange: (filters: Partial<SearchParams>) => void;
  onClear: () => void;
}

export default function SearchFilters({
  filters,
  onFilterChange,
  onClear,
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Advanced Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <Label>Date Taken</Label>
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.date_from
                    ? format(new Date(filters.date_from), "PPP")
                    : "From"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    filters.date_from ? new Date(filters.date_from) : undefined
                  }
                  onSelect={(date) =>
                    onFilterChange({
                      date_from: date?.toISOString().split("T")[0],
                    })
                  }
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.date_to
                    ? format(new Date(filters.date_to), "PPP")
                    : "To"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={
                    filters.date_to ? new Date(filters.date_to) : undefined
                  }
                  onSelect={(date) =>
                    onFilterChange({
                      date_to: date?.toISOString().split("T")[0],
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="City, country, or landmark"
            value={filters.location || ""}
            onChange={(e) => onFilterChange({ location: e.target.value })}
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label>Tags</Label>
          <Input
            placeholder="nature, portrait, vacation, etc."
            value={filters.tags?.join(", ") || ""}
            onChange={(e) =>
              onFilterChange({
                tags: e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag),
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
