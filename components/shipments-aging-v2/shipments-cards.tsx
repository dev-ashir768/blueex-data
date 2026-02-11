import { Package, Truck, Clock, Info, PackageOpen } from "lucide-react";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import { ReactNode } from "react";

interface ShipmentsCardProps {
  title: string;
  value: ReactNode;
  icon: LucideIcon;
  description?: string;
  loading?: boolean;
  error?: boolean;
}

const formatNumber = (value: string | number | undefined) => {
  if (value === undefined || value === null || value === "") return "0";
  const num =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  return isNaN(num) ? "0" : num.toLocaleString();
};

export function ShipmentsCard({
  title,
  value,
  icon: Icon,
  loading,
  error,
  description,
}: ShipmentsCardProps) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-4 relative overflow-hidden animate-pulse shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
          <div className="w-16 h-5 bg-slate-100 rounded-md" />
        </div>
        <div className="w-24 h-8 bg-slate-100 rounded-lg mb-2" />
        <div className="w-32 h-4 bg-slate-100 rounded-md" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <div className="text-red-500">
            Cannot Load {title}. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group bg-white border border-slate-200 hover:border-blue-300 py-5 rounded-2xl  relative overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/5 shadow-sm">
      {/* Decorative gradient blur */}
      <CardContent className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/3 rounded-full blur-2xl group-hover:bg-blue-500/6 transition-all" />

      <CardContent className="flex items-start justify-between px-4 relative z-10 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-500 text-[12px] font-bold mb-1 truncate">
            {title}
          </h3>
          <div className="text-xl sm:text-2xl font-medium text-slate-900 tracking-tight leading-tight">
            {value}
          </div>
        </div>
        {/* Top section: Info icon */}
        <div className="flex flex-col justify-center items-center relative z-10 min-h-[28px] gap-2">
          {description && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-black hover:text-black transition-colors p-1 cursor-pointer">
                  <Info size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-200">
                <p className="max-w-[200px] text-black text-xs">
                  {description}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
          <div className="shrink-0 w-9 h-9 bg-slate-50 border border-slate-100 rounded-[1.25rem] flex items-center justify-center text-blue-600 transition-all shadow-sm">
            <Icon size={20} />
          </div>
        </div>
      </CardContent>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
}

export interface CourierSummary {
  total_bookings: number;
  total_cod: string;
  total_inprocess: number;
  total_inprocess_cod: string;
  total_delivered_orders: number;
  total_delivered_cod: string;
  total_returned_orders: number;
  ageing_avg: number;
  courier_ageing_avg: number;
}

interface ShipmentsCardsProps {
  summary?: CourierSummary;
  loading?: boolean;
}

export default function ShipmentsCards({
  summary,
  loading,
}: ShipmentsCardsProps) {
  const cards = [
    {
      title: "Total COD",
      value: (
        <div className="flex flex-col gap-1">
          <div className="text-xl sm:text-2xl font-medium">
            PKR {formatNumber(summary?.total_cod)}
          </div>
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Total Booking: {formatNumber(summary?.total_bookings)}
          </div>
        </div>
      ),
      icon: Package,
      description: "Total Bookings and COD Value",
    },
    {
      title: "In-Process COD",
      value: (
        <div className="flex flex-col gap-1">
          <div className="text-xl sm:text-2xl font-medium">
            PKR {formatNumber(summary?.total_inprocess_cod)}
          </div>
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Total In-Process Orders: {formatNumber(summary?.total_inprocess)}
          </div>
        </div>
      ),
      icon: Truck,
      description: "Orders currently being processed and their COD value",
    },
    {
      title: "Amount Delivered",
      value: (
        <div className="flex flex-col gap-1">
          <div className="text-xl sm:text-2xl font-medium">
            PKR {formatNumber(summary?.total_delivered_cod)}
          </div>
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Delivered Orders: {formatNumber(summary?.total_delivered_orders)}
          </div>
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Returned Orders: {formatNumber(summary?.total_returned_orders)}
          </div>
        </div>
      ),
      icon: PackageOpen,
      description: "Completed deliveries and their collected COD amount",
    },
    // {
    //   title: "Returned Orders",
    //   value: formatNumber(summary?.total_returned_orders),
    //   icon: RotateCcw,
    //   description: "Total Returned Orders",
    // },
    {
      title: "Shipment Delivered to Payment by 3PL (Avg. Days)",
      value: formatNumber(summary?.courier_ageing_avg),
      icon: Clock,
      description: "Shipment Delivered to Payment by 3PL (Avg. Days)",
    },
    {
      title: "Shipment Delivered to Payment by Orio (Avg. Days)",
      value: formatNumber(summary?.ageing_avg),
      icon: Clock,
      description: "Shipment Delivered to Payment by Orio (Avg. Days)",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <ShipmentsCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          description={card.description}
          loading={loading}
        />
      ))}
    </div>
  );
}
