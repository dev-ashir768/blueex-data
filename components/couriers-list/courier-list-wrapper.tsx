"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import {
  getShipmentsAgeing,
  ShipmentAgeingItem,
  ShipmentsAgeingPayload,
} from "@/helperfunctions/courierlistFunction";
import CourierListDatatable from "./courier-datatable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Filter } from "lucide-react";

import { startOfDay, endOfDay, format, subMonths } from "date-fns";
import { DateRangeSelect } from "@/components/ui/date-range-select";
import CourierCards from "./courier-cards";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formSchema, FormValueType } from "@/schemas/shipmentSchemas";

const today = new Date();

const DEFAULT_FILTERS = {
  dateRange: {
    from: startOfDay(subMonths(today, 2)),
    to: endOfDay(today),
  },
  courier_id: "37",
  status_type: "1" as const,
};

export default function CourierList() {
  const [open, setOpen] = useState(false);
  // const cacheRef = useRef<Map<string, any>>(new Map());

  const form = useForm<FormValueType>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FILTERS,
  });

  // const { data, isPending, isError, mutate, reset } = useMutation({
  //   mutationKey: ["shipments-ageing", form.getValues()],
  //   mutationFn: async (payload: ShipmentsAgeingPayload) => {
  //     const response = await getShipmentsAgeing(payload);
  //     return response.payload;
  //   },
  // });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["shipments-ageing", form.getValues()],
    queryFn: async () => {
      const response = await getShipmentsAgeing({
        start_date: format(form.getValues().dateRange.from, "yyyy-MM-dd"),
        end_date: format(form.getValues().dateRange.to, "yyyy-MM-dd"),
        courier_id: parseInt(form.getValues().courier_id),
        customers_acno: ["OR-01362", "OR-01914", "OR-01886"],
        status_type: form.getValues().status_type,
      });
      return response.payload;
    },
    gcTime: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });

  const renderContent = () => {
    if (!data) {
      <div className="flex flex-col items-center justify-center h-[400px] text-slate-500">
        <Filter className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-lg font-medium">No filters applied</p>
        <p className="text-sm">Please apply filters to view shipment data.</p>
      </div>;
    }

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-500">Loading data...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center p-4 min-h-[400px] text-2xl">
          <p>No data found</p>
        </div>
      );
    }

    return (
      <CourierListDatatable data={data?.details || []} columns={columns} />
    );
  };

  // const { data, isPending, isError, mutate, reset } = useMutation({
  //   mutationKey: ["shipments-ageing", form.getValues()],
  //   mutationFn: async (payload: ShipmentsAgeingPayload) => {
  //     const cacheKey = JSON.stringify(payload);

  //     if (cacheRef.current.has(cacheKey)) {
  //       return cacheRef.current.get(cacheKey);
  //     }

  //     const response = await getShipmentsAgeing(payload);
  //     cacheRef.current.set(cacheKey, response.payload);
  //     return response.payload;
  //   },
  // });

  function onSubmit(values: FormValueType) {
    const payload: ShipmentsAgeingPayload = {
      start_date: format(values.dateRange.from, "yyyy-MM-dd"),
      end_date: format(values.dateRange.to, "yyyy-MM-dd"),
      courier_id: parseInt(values.courier_id),
      customers_acno: ["OR-01362", "OR-01914", "OR-01886"],
      status_type: values.status_type,
    };
    console.log(payload);
    setOpen(false);
  }

  const columns: ColumnDef<ShipmentAgeingItem>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "acno",
      header: "ACNO",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "order_ref",
      header: "Order Ref",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "courier_name",
      header: "Courier",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "consigment_no",
      header: "CN",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "payment_type",
      header: "Payment Type",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "order_amount",
      header: "COD",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "booking_date",
      header: "Booking Date",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <span>
          {row.original.booking_date == "-"
            ? "-"
            : format(row.original.booking_date, "dd-MMM-yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "last_mile_status",
      header: "Last Mile Status",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const status = row.getValue("last_mile_status") as string;
        const normalizedStatus = status?.toLowerCase();

        const isDelivered = normalizedStatus === "delivered";
        const isReturnToShipper = normalizedStatus === "return to shipper";
        const isOther = !isDelivered && !isReturnToShipper;

        return (
          <Badge
            variant={
              isDelivered
                ? "default"
                : isReturnToShipper
                  ? "destructive"
                  : "secondary"
            }
            className={cn(
              "capitalize",
              isDelivered && "bg-green-500 hover:bg-green-500",
              isReturnToShipper && "bg-red-500 hover:bg-red-500",
              isOther && "bg-yellow-400 hover:bg-yellow-400 text-white",
            )}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "last_mile_status_date",
      header: "Last Mile Status Date",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <span>
          {row.original.last_mile_status_date == "-"
            ? "-"
            : format(row.original.last_mile_status_date, "dd-MMM-yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "invoice_no",
      header: "3PL Invoice No",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    {
      accessorKey: "tpl_invoice_settle_date",
      header: "3PL Invoice Date",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <span>
          {row.original.tpl_invoice_settle_date == "-"
            ? "-"
            : format(row.original.tpl_invoice_settle_date, "dd-MMM-yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "tpl_invoice_receiving_date",
      header: "Orio Receiving Date",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <span>
          {row.original.tpl_invoice_receiving_date == "-"
            ? "-"
            : format(row.original.tpl_invoice_receiving_date, "dd-MMM-yyyy")}
        </span>
      ),
    },

    {
      accessorKey: "statement_id",
      header: "Orio Invoice No",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
      cell: ({ row }) => {
        const value = row.getValue("statement_id");
        return `#${value}`;
      },
    },
    {
      accessorKey: "statement_date",
      header: "Orio Invoice Date",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <span>
          {row.original.statement_date == "-"
            ? "-"
            : format(row.original.statement_date, "dd-MMM-yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "mark_payment_paid_date",
      header: "3PL Delivered To Payment By Orio",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
      cell: ({ row }) => (
        <span>
          {row.original.mark_payment_paid_date == "-"
            ? "-"
            : format(row.original.mark_payment_paid_date, "dd-MMM-yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "ageing_days",
      header: "Ageing Days",
      enableColumnFilter: false,
      filterFn: "arrIncludesSome",
    },
    // {
    //   accessorKey: "sales_person_name",
    //   header: ({ column, table }) => (
    //     <DatatableColumnHeader column={column} title="Sales Person" table={table} />
    //   ),
    // },
  ];

  return (
    <div className="space-y-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Shipments Aging</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Apply Filter</DialogTitle>
              <DialogDescription>
                Select date range and courier details to view shipments.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="dateRange"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date Range</FormLabel>
                        <DateRangeSelect
                          date={field.value}
                          setDate={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="courier_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Courier</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a courier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="3">Leopards</SelectItem>
                            <SelectItem value="12">PostEx Partner</SelectItem>
                            <SelectItem value="18">PostEx</SelectItem>
                            <SelectItem value="24">Do Deliver</SelectItem>
                            <SelectItem value="37">Tranzo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">
                              Delivered / Returned
                            </SelectItem>
                            <SelectItem value="2">
                              Except Delivered / Returned
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      className="cursor-pointer"
                      type="button"
                      variant="outline"
                      onClick={() => {
                        form.reset({
                          dateRange: {
                            from: undefined,
                            to: undefined,
                          },
                          courier_id: "37",
                          status_type: "1",
                        });
                        setOpen(true);
                      }}
                    >
                      Reset Filters
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                      Apply Filters
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <CourierCards summary={data?.summary} loading={isLoading} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        {renderContent()}
      </div>
    </div>
  );
}
