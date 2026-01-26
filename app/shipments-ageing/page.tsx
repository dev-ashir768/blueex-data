"use client";

import CourierList from "@/components/couriers-list/courier-list-wrapper";
import { logout } from "@/lib/auth";
import { BarChart3, LogOut } from "lucide-react";

export default function page() {
  return (
    <>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourierList />
      </div>
      
        
      
    </>
  );
}
