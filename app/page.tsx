"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import KPICard from "@/components/KPICard";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  LogOut,
  Truck,
  PackageCheck,
  Timer,
  Banknote,
} from "lucide-react";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { totals, isLoading } = useDashboardData();

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("PKR", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <span>
                <Link href="/">
                  <Image
                    src="/orio-logo.svg"
                    alt="Orio Logo"
                    width={100}
                    height={100}
                  />
                </Link>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={logout}
                className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-2xl text-sm font-semibold transition-all text-slate-700 hover:text-rose-600"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TooltipProvider>
          <div className="flex items-center justify-between">
            <div className="mb-10">
              <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900">
                Internal Dashboard
              </h1>
              <p className="text-slate-500 font-medium">
                Real-time performance metrics and data insights from Orio API.
              </p>
            </div>
            <Button
              onClick={() => router.push("/shipments-aging")}
              variant="default"
              className="bg-blue-600 hover:bg-blue-600 cursor-pointer"
            >
              Shipments Aging
            </Button>
          </div>

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <KPICard
              title="Total COD"
              description="Combined total Cash on Delivery value and total number of orders."
              value={
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-md">
                      {formatCurrency(totals.total_cod)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600 text-xs font-semibold uppercase tracking-wider">
                      Total Orders:
                    </span>
                    <span className=" text-xs font-semibold uppercase tracking-wider">
                      {totals.total_orders.toLocaleString()}
                    </span>
                  </div>
                </div>
              }
              icon={Truck}
              loading={isLoading}
            />
            <KPICard
              title="Total Orders Delivered"
              description="Total number of orders successfully delivered to customers."
              value={totals.dv_rt_orders.toLocaleString()}
              icon={Truck}
              loading={isLoading}
            />
            <KPICard
              title="Total Outstanding COD"
              description="Total COD amount still pending for delivered orders."
              value={formatCurrency(totals.delivered_cod)}
              icon={PackageCheck}
              loading={isLoading}
            />
            <KPICard
              title="Total In Process Orders"
              description="Number of orders currently in the fulfillment pipeline."
              value={totals.inprocess_orders.toLocaleString()}
              icon={Truck}
              loading={isLoading}
            />
            <KPICard
              title="Total In Process COD"
              description="Total COD value of orders currently in process."
              value={formatCurrency(totals.inprocess_cod)}
              icon={Timer}
              loading={isLoading}
            />
            {/* <KPICard
            // title="Arrival Not Delivered COD"
            title="Total Outstanding COD"
            value={formatCurrency(totals.dv_outstanding_cod)}
            icon={Timer}
            loading={isLoading}
          /> */}
            <KPICard
              title="Total Payable Orders"
              description="Total number of orders that have been processed and are ready for payment."
              value={totals.payable_orders.toLocaleString()}
              icon={Truck}
              loading={isLoading}
            />
            <KPICard
              title="Payable COD"
              description="Total COD amount ready for payment to the customer."
              value={formatCurrency(totals.payable_cod)}
              icon={Banknote}
              loading={isLoading}
            />
          </div>
        </TooltipProvider>
      </main>
    </div>
  );
}
