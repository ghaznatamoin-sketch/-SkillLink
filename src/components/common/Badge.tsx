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
          className={`inline-flex items-center rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/30 ${sizeClasses}`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>Requested</span>
        </span>
      );
    case 'accepted':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-sky-950/70 text-sky-300 border border-sky-500/30 ${sizeClasses}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Accepted</span>
        </span>
      );
    case 'in_progress':
    case 'in-progress':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 ${sizeClasses}`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>In Progress</span>
        </span>
      );
    case 'completed':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-400/50 font-bold shadow-xs shadow-emerald-950/40 ${sizeClasses}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Completed</span>
        </span>
      );
    case 'rejected':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-950/70 text-rose-300 border border-rose-500/30 ${sizeClasses}`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Rejected</span>
        </span>
      );
    case 'cancelled':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-[#16211c] text-slate-400 border border-slate-700/50 ${sizeClasses}`}
        >
          <Ban className="w-3.5 h-3.5 text-slate-500" />
          <span>Cancelled</span>
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center rounded-full bg-[#16211c] text-slate-300 border border-emerald-900/40 ${sizeClasses}`}
        >
          <span>{status}</span>
        </span>
      );
  }
};
