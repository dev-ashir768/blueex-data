import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Download, SlidersHorizontal, Search, X } from 'lucide-react';
import { Table as ReactTable } from '@tanstack/react-table';
import { exportTableData } from '@/lib/utils';

interface DataTableToolbarProps<TData> {
  table: ReactTable<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filter records..."
          className="h-9 w-full sm:w-[300px] pl-9 pr-8 bg-background"
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        {globalFilter && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setGlobalFilter('')}
                className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear search</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 ml-auto sm:ml-0 gap-2 text-xs font-medium border shadow-sm"
                >
                  <Download className="h-4 w-4 opacity-70" />
                  <span className="hidden sm:inline-block">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                  onClick={() =>
                    exportTableData(table.getFilteredRowModel().rows, 'csv')
                  }
                  className="gap-2 cursor-pointer"
                >
                  Download CSV
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    exportTableData(table.getFilteredRowModel().rows, 'excel')
                  }
                  className="gap-2 cursor-pointer"
                >
                  Download Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>Export</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 text-xs font-medium border shadow-sm"
                >
                  <SlidersHorizontal className="h-4 w-4 opacity-70" />
                  <span className="hidden sm:inline-block">View</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                  {table
                    .getAllColumns()
                    .filter((c) => c.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize cursor-pointer"
                          checked={column.getIsVisible()}
                          onCheckedChange={(v) => column.toggleVisibility(!!v)}
                        >
                          {column.id.replace(/_/g, ' ')}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            <p>View Columns</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
