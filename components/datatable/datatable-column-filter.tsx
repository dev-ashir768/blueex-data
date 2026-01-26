import { useState, useMemo } from 'react';
import { Table as ReactTable, Column } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, Search, X } from 'lucide-react';

interface ColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
  table: ReactTable<TData>;
}

export function ColumnFilter<TData, TValue>({
  column,
  table,
}: ColumnFilterProps<TData, TValue>) {
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Unique Values nikalo (PreFiltered data se taaki options gayab na ho)
  // Extract flatRows to a variable to satisfy linter complexity warning
  const flatRows = table.getPreFilteredRowModel().flatRows;

  const uniqueValues = useMemo(() => {
    const values = Array.from(
      new Set(flatRows.map((row) => row.getValue(column.id)))
    ).filter(Boolean);
    return values as string[];
  }, [flatRows, column.id]);

  // 2. Options ko Search Term ke hisaab se filter karo
  const filteredOptions = uniqueValues.filter((value) =>
    String(value).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Current Selected Values
  const selectedValues = (column.getFilterValue() as string[]) || [];
  const filterCount = selectedValues.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 relative cursor-pointer ${
            filterCount > 0 ? 'bg-primary/10 text-primary' : ''
          }`}
        >
          <Filter className="h-3.5 w-3.5" />
          {filterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white font-medium">
              {filterCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[220px] p-0">
        <div className="p-2 border-b space-y-2">
          {/* Search Input inside Dropdown */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Search options..."
              className="h-8 pl-8 text-xs border-0 bg-slate-50 focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Options List */}
        <div className="max-h-[200px] overflow-y-auto p-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <div
                  key={option}
                  className="flex items-center space-x-2 px-2 py-1.5 hover:bg-slate-100 rounded-sm cursor-pointer text-xs"
                  onClick={() => {
                    const current = selectedValues;
                    const next = current.includes(option)
                      ? current.filter((v) => v !== option)
                      : [...current, option];
                    // Update the filter
                    column.setFilterValue(next.length ? next : undefined);
                  }}
                >
                  <Checkbox checked={isSelected} className="h-3.5 w-3.5" />
                  <span className="truncate">{option}</span>
                </div>
              );
            })
          ) : (
            <div className="px-2 py-2 text-xs text-slate-500 text-center">
              No options found
            </div>
          )}
        </div>

        {/* Clear Filter Button */}
        {selectedValues.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs h-7 justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => column.setFilterValue(undefined)}
              >
                Clear Filters
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
