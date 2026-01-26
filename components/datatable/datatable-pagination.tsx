import { Table } from '@tanstack/react-table';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;

  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  // Helper to generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      for (let i = 0; i < pageCount; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(0, pageIndex - 1);
      const endPage = Math.min(pageCount - 1, pageIndex + 1);

      if (startPage > 0) {
        pageNumbers.push(0);
        if (startPage > 1) pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < pageCount - 1) {
        if (endPage < pageCount - 2) pageNumbers.push('...');
        pageNumbers.push(pageCount - 1);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-2 space-y-4 md:space-y-0">
      {/* Left Side: Showing X to Y of Z */}
      <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
        {totalRows > 0 ? (
          <span>
            Showing{' '}
            <span className="font-medium text-foreground">{startRow}</span> to{' '}
            <span className="font-medium text-foreground">{endRow}</span> of{' '}
            <span className="font-medium text-foreground">{totalRows}</span>{' '}
            results
          </span>
        ) : (
          <span>No results found</span>
        )}
      </div>

      {/* Right Side: Pagination Controls & Rows Per Page */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Rows per page */}
        <div className="flex items-center text-sm font-medium text-muted-foreground">
          <span className="mr-2">Show</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-[70px] justify-between px-3 text-xs bg-background border-input shadow-sm hover:bg-accent hover:text-accent-foreground"
              >
                {pageSize}
                <ChevronDown className="h-3.5 w-3.5 opacity-50 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="center"
              className="min-w-18 p-1"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <DropdownMenuItem
                  key={size}
                  onClick={() => table.setPageSize(size)}
                  className={cn(
                    'flex cursor-pointer items-center justify-center py-1.5 text-xs font-medium rounded-sm focus:bg-accent focus:text-accent-foreground',
                    pageSize === size &&
                      'bg-accent/50 text-accent-foreground font-bold'
                  )}
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="ml-2">entries</span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-1.5">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="hidden md:flex items-center space-x-1">
            {getPageNumbers().map((page, index) =>
              page === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-muted-foreground text-xs select-none"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={pageIndex === page ? 'secondary' : 'ghost'}
                  size="sm"
                  className={cn(
                    'h-8 w-8 text-xs p-0 font-normal transition-colors',
                    pageIndex === page
                      ? 'bg-blue-600 text-primary-foreground shadow-sm hover:bg-blue-600'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                  onClick={() => table.setPageIndex(page as number)}
                >
                  {(page as number) + 1}
                </Button>
              )
            )}
          </div>

          <div className="md:hidden flex w-[60px] items-center justify-center text-sm font-medium">
            {pageIndex + 1} / {pageCount}
          </div>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
