import { LucideIcon, Info } from "lucide-react";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "./ui/card";

interface KPICardProps {
  title: string;
  value: ReactNode;
  icon: LucideIcon;
  loading?: boolean;
  error?: boolean;
  description?: string;
}

export default function KPICard({
  title,
  value,
  icon: Icon,
  loading,
  error,
  description,
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
          {/* Main content section: Title/Value left, Icon right */}

          
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
