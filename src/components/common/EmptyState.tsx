'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon, Search, AlertCircle, CalendarX } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = CalendarX,
  title,
  description,
  actionLabel,
  actionHref,
  onActionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70">
      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-emerald-700 mb-4">
        <Icon className="w-7 h-7 stroke-[1.5]" />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onActionClick && !actionHref && (
        <button
          onClick={onActionClick}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
