'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import { StatusBadge } from '@/components/common/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import {
  Briefcase,
  Calendar,
  MapPin,
  PlayCircle,
  CheckCircle2,
  Search,
  ArrowRight,
} from 'lucide-react';

export default function WorkerJobsPage() {
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useMarketplace();
  const { showToast } = useToast();

  const [filter, setFilter] = useState<'all' | 'accepted' | 'in_progress' | 'completed'>('all');
  const [search, setSearch] = useState('');

  const workerJobs = bookings.filter((b) => {
    if (b.status === 'requested' || b.status === 'rejected' || b.status === 'cancelled') {
      return false; // only show confirmed jobs here
    }
    if (filter !== 'all' && b.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        b.serviceName.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.address.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = (id: string, newStatus: 'in_progress' | 'completed') => {
    const note =
      newStatus === 'in_progress'
        ? 'Technician arrived on site and started diagnosis/work'
        : 'Service completed and tested with customer';

    updateBookingStatus(id, newStatus, note);
    showToast(
      'success',
      `Job status updated to ${newStatus.replace('_', ' ').toUpperCase()}.`,
      'Status Updated'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Active & Completed Jobs
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Advance job stages, record on-site completion, and track history.
          </p>
        </div>

        <Link
          href="/worker/requests"
          className="px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-[#121f19] text-slate-200 hover:text-white hover:bg-[#182922] text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <span>Check Requests Queue</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </Link>
      </div>

      {/* Tabs & Search Filter */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-4 shadow-xl shadow-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { key: 'all', label: 'All Jobs' },
            { key: 'accepted', label: 'Accepted (Upcoming)' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white border border-emerald-500/30 shadow-md'
                  : 'text-slate-400 hover:bg-[#121f19] hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search job or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Jobs Grid - Paired 2-cards per row */}
      {workerJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs matching this filter"
          description="You can switch tabs to view upcoming accepted jobs or completed job history."
          actionLabel="View All Jobs"
          onActionClick={() => setFilter('all')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workerJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-emerald-900/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-semibold text-amber-400">
                        #{job.id.substring(0, 8)}
                      </span>
                      <StatusBadge status={job.status} />
                    </div>
                    <h3 className="font-bold text-slate-100 text-base">
                      {job.serviceName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Customer: <strong className="text-slate-200 font-semibold">{job.customerName}</strong>
                      {job.customerPhone && ` (${job.customerPhone})`} · {job.categoryName}
                    </p>
                  </div>

                  <div className="text-left sm:text-right flex-shrink-0">
                    <span className="text-[11px] text-slate-400 font-medium block">Net Payout</span>
                    <span className="text-base font-extrabold text-amber-300">
                      ${job.pricing.workerEarningsAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Schedule and Location */}
                <div className="space-y-2 text-xs text-slate-300 bg-[#121f19]/70 p-3.5 rounded-2xl border border-emerald-900/30">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span><strong>Schedule:</strong> {job.date} · {job.timeSlot}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="truncate"><strong>Location:</strong> {job.address.street}, {job.address.city}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed bg-[#121f19]/40 p-3 rounded-xl">
                  <strong className="text-slate-300">Description:</strong> {job.jobDescription}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-emerald-900/30 flex-wrap">
                <span className="text-[11px] text-slate-400">
                  {new Date().toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  {job.status === 'accepted' && (
                    <button
                      onClick={() => handleStatusChange(job.id, 'in_progress')}
                      className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold border border-emerald-500/30 shadow-md transition-all flex items-center gap-1.5"
                    >
                      <PlayCircle className="w-4 h-4 text-amber-300" />
                      <span>Start Job</span>
                    </button>
                  )}

                  {job.status === 'in_progress' && (
                    <button
                      onClick={() => handleStatusChange(job.id, 'completed')}
                      className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold border border-emerald-500/30 shadow-md transition-all flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-300" />
                      <span>Complete</span>
                    </button>
                  )}

                  {job.status === 'completed' && (
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified & Done</span>
                    </span>
                  )}

                  <Link
                    href="/worker/messages"
                    className="py-1.5 px-3 rounded-xl border border-emerald-500/30 bg-[#121f19] text-slate-300 hover:text-white hover:bg-[#182922] text-xs font-semibold transition-colors"
                  >
                    Chat
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

