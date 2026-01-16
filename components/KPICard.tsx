import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  loading?: boolean;
}

export default function KPICard({
  title,
  value,
  icon: Icon,
  loading,
}: KPICardProps) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden animate-pulse shadow-sm">
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
    <div className="group bg-white border border-slate-200 hover:border-blue-300 rounded-3xl p-6 relative overflow-hidden transition-all hover:shadow-xl hover:shadow-blue-500/5 shadow-sm">
      {/* Decorative gradient blur */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/3 rounded-full blur-2xl group-hover:bg-blue-500/6 transition-all" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
          <Icon size={24} />
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-slate-500 text-sm font-bold mb-1">{title}</h3>
        <p className="text-3xl font-black text-slate-900 tracking-tight">
          {value}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
