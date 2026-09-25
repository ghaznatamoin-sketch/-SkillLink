'use client';

import React from 'react';
import { JobStatus } from '@/types/booking';
import { Clock, CheckCircle2, PlayCircle, XCircle, Ban, AlertCircle } from 'lucide-react';

interface BadgeProps {
  status: JobStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, size = 'sm' }) => {
  const normalized = status.toLowerCase();

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 font-semibold gap-1.5',
    md: 'text-xs px-3 py-1 font-semibold gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 font-bold gap-2',
  }[size];

  switch (normalized) {
    case 'requested':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-50 text-amber-800 border border-amber-300/70 ${sizeClasses}`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Requested</span>
        </span>
      );
    case 'accepted':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-sky-50 text-sky-800 border border-sky-300/70 ${sizeClasses}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
          <span>Accepted</span>
        </span>
      );
    case 'in_progress':
    case 'in-progress':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300/70 ${sizeClasses}`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>In Progress</span>
        </span>
      );
    case 'completed':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold ${sizeClasses}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Completed</span>
        </span>
      );
    case 'rejected':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-50 text-rose-800 border border-rose-300/70 ${sizeClasses}`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>Rejected</span>
        </span>
      );
    case 'cancelled':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-300 ${sizeClasses}`}
        >
          <Ban className="w-3.5 h-3.5 text-slate-500" />
          <span>Cancelled</span>
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}
        >
          <span>{status}</span>
        </span>
      );
  }
};
