"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import KPICard from "@/components/KPICard";
import {
  BarChart3,
  LogOut,
  Truck,
  PackageCheck,
  Timer,
  Banknote,
} from "lucide-react";
import { logout } from "@/lib/auth";

export default function Home() {
  const { totals, isLoading } = useDashboardData();

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                DataPortal
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-2xl text-sm font-semibold transition-all text-slate-700 hover:text-rose-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">
            Internal Dashboard
          </h1>
          <p className="text-slate-500 font-medium">
            Real-time performance metrics and data insights from Orio API.
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            title="Total Arrival COD"
            value={formatCurrency(totals.total_arrival_cod)}
            icon={Truck}
            loading={isLoading}
          />
          <KPICard
            title="Arrival Delivered COD"
            value={formatCurrency(totals.arrival_dv_cod)}
            icon={PackageCheck}
            loading={isLoading}
          />
          <KPICard
            title="Arrival Not Delivered COD"
            value={formatCurrency(totals.arrival_not_dv_cod)}
            icon={Timer}
            loading={isLoading}
          />
          <KPICard
            title="Arrival Payable COD"
            value={formatCurrency(totals.arrival_payable_cod)}
            icon={Banknote}
            loading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}
