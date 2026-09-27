'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { CardGlow } from '@/components/common/CardGlow';

interface StatWidgetProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  accentColor?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  label,
  value,
  icon: Icon,
  change,
  isPositive = true,
  subtitle,
  accentColor = 'rgba(16, 185, 129, 0.2)',
}) => {
  return (
    <CardGlow
      glowColor={accentColor}
      className="bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-5 shadow-xl shadow-black/40 hover:border-amber-400/40 hover:bg-[#121f1a] transition-all duration-300 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-slate-400">{label}</span>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-950 to-[#07130e] text-amber-400 border border-emerald-500/30 flex items-center justify-center shadow-md">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        {/* Large Dashboard Number */}
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          {value}
        </div>

        <div className="flex items-center gap-2 mt-2">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                isPositive
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-950/80 text-rose-300 border-rose-500/30'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-400" />
              )}
              {change}
            </span>
          )}

          {subtitle && (
            <span className="text-[11px] text-slate-400 font-medium truncate">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </CardGlow>
  );
};
