import {
  Package,
  Banknote,
  CircleDollarSign,
  Truck,
  RotateCcw,
  Clock,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

interface CourierCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  loading?: boolean;
}

export function CourierCard({ title, value, icon: Icon, loading }: CourierCardProps) {
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

  return (
    <div className="group bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-4 relative overflow-hidden transition-all shadow-sm">
     

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
          <Icon size={24} />
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-slate-500 text-sm font-bold mb-1">{title}</h3>
        <p className="text-3xl font-medium text-slate-900 tracking-tight">
          {value}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export interface CourierSummary {
  total_bookings: number;
  total_cod: string;
  total_delivered_amount: string;
  delivered_orders: number;
  returned_orders: number;
  ageing_avg: number;
}

interface CourierCardsProps {
  summary?: CourierSummary;
  loading?: boolean;
}

export default function CourierCards({ summary, loading }: CourierCardsProps) {
  const cards = [
    {
      title: "Total Bookings",
      value: summary?.total_bookings ?? 0,
      icon: Package,
    },
    {
      title: "Total COD",
      value: summary?.total_cod ?? "0",
      icon: Banknote,
    },
    {
      title: "Delivered Amount",
      value: summary?.total_delivered_amount ?? "0",
      icon: CircleDollarSign,
    },
    {
      title: "Delivered Orders",
      value: summary?.delivered_orders ?? 0,
      icon: Truck,
    },
    {
      title: "Returned Orders",
      value: summary?.returned_orders ?? 0,
      icon: RotateCcw,
    },
    {
      title: "Avg Ageing",
      value: summary ? `${summary.ageing_avg}` : "0",
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <CourierCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          loading={loading}
        />
      ))}
    </div>
  );
}
