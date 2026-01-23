import type { Column, ColumnDef, FilterFn, Table } from "@tanstack/react-table";

export type FilterType = "multiselect" | "none";

export interface FilterOption {
  label: string;
  value: string;
}

export interface ColumnMeta {
  filterType?: FilterType;
  filterOptions?: FilterOption[];
  filterPlaceholder?: string;
}

export interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  table: Table<TData>;
  title: string;
}

declare module "@tanstack/react-table" {
  interface FilterFns {
    multiSelect: FilterFn<string>;
  }
}

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  excludeExportColumns?: string[];
  exportFilename?: string;
  enableExport?: boolean;
  enableGlobalFilter?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  showExport?: boolean;
  enablePaginationFooter?: boolean;
};
