"use client";

import CourierList from "@/components/couriers-list/courier-list-wrapper";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
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
                className="flex items-center gap-2 px-5 py-2.5 cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-2xl text-sm font-semibold transition-all text-slate-700 hover:text-rose-600"
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
