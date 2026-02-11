"use client";

import KPICard from "@/components/KPICard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LogOut, Truck, PackageCheck, Timer, Banknote } from "lucide-react";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useDashboardCardsData from "@/hooks/useDashboardCardsData";

export default function Home() {
  const { data, isLoading, isError } = useDashboardCardsData();

  // const formatCurrency = (num: string | number) => {
  //   return new Intl.NumberFormat("PKR", {
  //     style: "currency",
  //     currency: "PKR",
  //     maximumFractionDigits: 0,
  //   }).format(Number(num));
  // };

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
                    <span className="text-md">{"PKR " + data.total_cod}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600 text-xs font-semibold uppercase tracking-normal">
                      Total Orders:
                    </span>
                    <span className=" text-xs font-semibold uppercase tracking-wider">
                      {Number(data.total_orders).toLocaleString()}
                    </span>
                  </div>
                </div>
              }
              icon={Truck}
              loading={isLoading}
              error={isError}
            />

            <KPICard
              title="Total Outstanding COD"
              description="Total COD amount still pending for delivered orders."
              value={
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-md">
                      {"PKR " + data.delivered_cod}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600 text-xs font-semibold uppercase tracking-normal">
                      Total DVT & RT Orders:
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {Number(data.dv_rt_orders).toLocaleString()}
                    </span>
                  </div>
                </div>
              }
              icon={PackageCheck}
              loading={isLoading}
              error={isError}
            />

            <KPICard
              title="Total In Process COD"
              description="Total COD value of orders currently in process."
              value={
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-md">
                      {"PKR " + data.inprocess_cod}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600 text-xs font-semibold uppercase tracking-normal">
                      Total In Process Orders:
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {Number(data.inprocess_orders).toLocaleString()}
                    </span>
                  </div>
                </div>
              }
              icon={Timer}
              loading={isLoading}
              error={isError}
            />
            <KPICard
              title="Payable COD"
              description="Total COD amount ready for payment to the customer."
              value={
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-md">{"PKR " + data.payable_cod}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600 text-xs font-semibold uppercase tracking-normal">
                      Total Payable Orders:
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {Number(data.payable_orders).toLocaleString()}
                    </span>
                  </div>
                </div>
              }
              icon={Banknote}
              loading={isLoading}
              error={isError}
            />
          </div>
        </TooltipProvider>
      </main>
    </div>
  );
}
