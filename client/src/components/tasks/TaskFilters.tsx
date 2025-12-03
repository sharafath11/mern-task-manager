"use client";

import React, { useEffect, useRef, useState } from "react";
import { debounce } from "@/utils/debounce";
import { ITaskFiltersProps } from "@/types/propsType";
import { ITaskQueryParams } from "@/types/taskQuery";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ChevronLeft, ChevronRight, Filter, SortAsc } from "lucide-react";
import { Label } from "@/components/ui/label";

const TaskFilters: React.FC<ITaskFiltersProps> = ({
  onSearch,
  search,
  status,
  onStatus,
  sortBy,
  onSort,
  page,
  totalPages,
  onPageChange,
}) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const debouncedUpdate = useRef(
    debounce((value: string) => {
      onSearch(value);
      setIsTyping(false);
    }, 400)
  ).current;

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    setIsTyping(true);
    debouncedUpdate(value);
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="task-search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Tasks
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="task-search"
              type="text"
              value={localSearch}
              placeholder="Search by title, description..."
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />
            {isTyping && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="h-2 w-2 animate-ping rounded-full bg-blue-500" />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            {isTyping ? "Typing..." : "Search will trigger after typing stops"}
          </p>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sort-by" className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              Sort By
            </Label>
            <Select
              value={sortBy}
              onValueChange={(value: string | undefined) => onSort(value as ITaskQueryParams["sort"])}
            >
              <SelectTrigger id="sort-by" className="w-full">
                <SelectValue placeholder="Select sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date_desc">Newest First</SelectItem>
                <SelectItem value="date_asc">Oldest First</SelectItem>
                <SelectItem value="title_asc">Title A → Z</SelectItem>
                <SelectItem value="title_desc">Title Z → A</SelectItem>
                <SelectItem value="priority_desc">Priority High → Low</SelectItem>
                <SelectItem value="priority_asc">Priority Low → High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status-filter" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Status
            </Label>
            <Select
              value={status}
              onValueChange={(value: string | undefined) => onStatus(value as ITaskQueryParams["status"])}
            >
              <SelectTrigger id="status-filter" className="w-full">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    className="h-8 w-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskFilters;