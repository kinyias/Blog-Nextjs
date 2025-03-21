'use client';

import { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';


interface CommentFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  dateRange: { from: Date | undefined; to: Date | undefined };
  onDateRangeChange: (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  selectedPostId: string | null;
  onPostChange: (postId: string | null) => void;
}

export function CommentFilters({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onPostChange,
}: CommentFiltersProps) {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>(dateRange);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (selectedDate: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    setDate(selectedDate);
    if (selectedDate.from && selectedDate.to) {
      onDateRangeChange(selectedDate);
      setIsCalendarOpen(false);
    }
  };

  const clearFilters = () => {
    onSearchChange('');
    onDateRangeChange({ from: undefined, to: undefined });
    setDate({ from: undefined, to: undefined });
    onPostChange(null);
  };

  return (
    <div className="p-4 border-b space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm bình luận..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[240px] justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                'Lọc theo ngày'
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="range"
              selected={date}
              onSelect={(range) => handleDateSelect({ from: range?.from, to: range?.to ?? undefined })}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          onClick={clearFilters}
          className="w-full md:w-auto"
        >
          Xoá lọc
        </Button>
      </div>
    </div>
  );
}
