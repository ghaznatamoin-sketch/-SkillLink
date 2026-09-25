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
  Phone,
  Search,
  ArrowRight,
  Filter,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Active & Completed Jobs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Advance job stages, record on-site completion, and track history.
          </p>
        </div>

        <Link
          href="/worker/requests"
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
        >
          <span>Check Requests Queue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tabs & Search Filter */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
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
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
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
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      {workerJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs matching this filter"
          description="You can switch tabs to view upcoming accepted jobs or completed job history."
          actionLabel="View All Jobs"
          onActionClick={() => setFilter('all')}
        />
      ) : (
        <div className="space-y-4">
          {workerJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono font-semibold text-slate-400">
                      #{job.id}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {job.serviceName}
                    </h3>
                    <StatusBadge status={job.status} />
                  </div>

                  <p className="text-xs text-slate-500">
                    Customer: <strong className="text-slate-800 font-semibold">{job.customerName}</strong>
                    {job.customerPhone && ` (${job.customerPhone})`} · {job.categoryName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] text-slate-400 font-medium block">Net Payout</span>
                  <span className="text-lg font-extrabold text-emerald-800">
                    ${job.pricing.workerEarningsAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Schedule and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span><strong>Schedule:</strong> {job.date} · {job.timeSlot}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="truncate"><strong>Location:</strong> {job.address.street}, {job.address.city}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Description:</strong> {job.jobDescription}
              </p>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3 pt-2 flex-wrap border-t border-slate-100">
                <span className="text-[11px] text-slate-400">
                  Last updated: {new Date().toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  {job.status === 'accepted' && (
                    <button
                      onClick={() => handleStatusChange(job.id, 'in_progress')}
                      className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 hover:scale-105"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>Start Job (In Progress)</span>
                    </button>
                  )}

                  {job.status === 'in_progress' && (
                    <button
                      onClick={() => handleStatusChange(job.id, 'completed')}
                      className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 hover:scale-105"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark as Completed</span>
                    </button>
                  )}

                  {job.status === 'completed' && (
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Service Verified & Done</span>
                    </span>
                  )}

                  <Link
                    href="/worker/messages"
                    className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Chat Customer
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
