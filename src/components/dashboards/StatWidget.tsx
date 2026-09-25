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
  accentColor = 'rgba(16, 185, 129, 0.15)',
}) => {
  return (
    <CardGlow
      glowColor={accentColor}
      className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4">
        {/* Large Dashboard Number */}
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </div>

        <div className="flex items-center gap-2 mt-2">
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded ${
                isPositive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
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
