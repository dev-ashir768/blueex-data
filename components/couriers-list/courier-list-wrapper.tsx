"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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

import { endOfDay, format, startOfDay, subMonths } from "date-fns";
import { DateRangeSelect } from "@/components/ui/date-range-select";
import DatatableColumnHeader from "../datatable/datatable-column-header";
import CourierCards from "./courier-cards";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
// import { DateRange } from "react-day-picker";

// Define schema
const formSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  courier_id: z.string().min(1, "Courier is required"),
  status_type: z.enum(["1", "2"], {
    message: "Status type is required",
  }),
});

const today = new Date();

export default function CourierList() {
  const [formData, setFormData] = useState<ShipmentsAgeingPayload | null>(null);
  const [open, setOpen] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateRange: {
        from: startOfDay(subMonths(today, 2)),
        to: endOfDay(today),
      },
      courier_id: "37",
      status_type: "1",
    },
  });

  const { data, isPending, isError, mutate } = useMutation({
    mutationFn: async (payload: ShipmentsAgeingPayload) => {
      const response = await getShipmentsAgeing(payload);
      return response.payload;
    },
  });

  // if(isError){
  //   return <div className="text-center p-4">No data found.</div>;
  // }

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: ShipmentsAgeingPayload = {
      start_date: format(values.dateRange.from, "yyyy-MM-dd"),
      end_date: format(values.dateRange.to, "yyyy-MM-dd"),
      courier_id: parseInt(values.courier_id),
      customers_acno: ["OR-01362", "OR-01914", "OR-01886"],
      status_type: values.status_type,
    };
    setFormData(payload);
    mutate(payload);
    setOpen(false); // Close sheet on submit
  }

  console.log(data);

  const columns: ColumnDef<ShipmentAgeingItem>[] = [
    {
      accessorKey: "id",
      header: ({ column, table }) => (
        <DatatableColumnHeader column={column} title="Order ID" table={table} />
      ),
    },

    {
      accessorKey: "acno",
      header: ({ column, table }) => (
        <DatatableColumnHeader column={column} title="ACNO" table={table} />
      ),
    },
    {
      accessorKey: "order_ref",
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Order Ref"
          table={table}
        />
      ),
    },
    {
      accessorKey: "consigment_no",
      header: ({ column, table }) => (
        <DatatableColumnHeader column={column} title="CN" table={table} />
      ),
    },
    {
      accessorKey: "courier_name",
      header: ({ column, table }) => (
        <DatatableColumnHeader column={column} title="Courier" table={table} />
      ),
    },
    {
      accessorKey: "payment_type",
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Payment Type"
          table={table}
        />
      ),
    },
    {
      accessorKey: "order_amount",
      header: ({ column, table }) => (
        <DatatableColumnHeader column={column} title="COD" table={table} />
      ),
    },
    {
      accessorKey: "last_mile_status",
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Last Mile Status"
          table={table}
        />
      ),
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
      accessorKey: "booking_date",
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Booking Date"
          table={table}
        />
      ),
      cell: ({ row }) => (
        <span>
          {row.original.booking_date == "-"
            ? "-"
            : format(row.original.booking_date, "dd-MMM-yyyy")}
        </span>
      ),
    },
    {
      accessorKey: "last_mile_status_date",
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Last Mile Status Date"
          table={table}
        />
      ),
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
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Invoice No"
          table={table}
        />
      ),
    },
    {
      accessorKey: "tpl_invoice_settle_date",
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="3PL Invoice Date"
          table={table}
        />
      ),
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
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Receiving Date"
          table={table}
        />
      ),
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
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Statement ID"
          table={table}
        />
      ),
    },
    {
      accessorKey: "statement_date",
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Statement Date"
          table={table}
        />
      ),
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
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Payment Paid Date"
          table={table}
        />
      ),
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
      header: ({ column, table }) => (
        <DatatableColumnHeader
          column={column}
          title="Aging Days"
          table={table}
        />
      ),
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
        <h2 className="text-2xl font-bold text-slate-800">Shipments Ageing</h2>
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
            <div className="py-6">
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
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
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

      <CourierCards summary={data?.summary} loading={isPending} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        {!formData ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-500">
            <Filter className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-lg font-medium">No filters applied</p>
            <p className="text-sm">
              Please apply filters to view shipment data.
            </p>
          </div>
        ) : isPending ? (
          <div className="flex flex-col items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-500">Loading data...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center p-4 min-h-[400px] text-2xl">
            <p>No data found</p>
          </div>
        ) : (
          <CourierListDatatable data={data?.details || []} columns={columns} />
        )}
      </div>
    </div>
  );
}
