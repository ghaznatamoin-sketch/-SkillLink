'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { StatWidget } from '@/components/dashboards/StatWidget';
import { StatusBadge } from '@/components/common/Badge';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  DollarSign,
  Star,
  ArrowRight,
  ShieldCheck,
  Tag,
  AlertCircle,
  PlayCircle,
} from 'lucide-react';

export default function WorkerOverviewPage() {
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useMarketplace();

  // All bookings for this worker
  const workerBookings = bookings.filter(
    (b) => b.providerId === user?.id || user?.role === 'worker'
  );

  const pendingRequests = workerBookings.filter((b) => b.status === 'requested');
  const activeJobs = workerBookings.filter(
    (b) => b.status === 'accepted' || b.status === 'in_progress'
  );
  const completedJobs = workerBookings.filter((b) => b.status === 'completed');

  const totalEarnings = completedJobs.reduce(
    (acc, curr) => acc + curr.pricing.workerEarningsAmount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Worker Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Service Professional</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Technician Portal — {user?.name || 'Rafael Costa'}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Manage incoming service requests, advance job milestones to completion, and monitor real-time earnings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/worker/requests"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4" />
            <span>{pendingRequests.length} Pending Requests</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          label="Total Net Earnings"
          value={`$${totalEarnings.toFixed(0)}`}
          icon={DollarSign}
          subtitle="After 10% platform split"
        />
        <StatWidget
          label="Pending Requests"
          value={pendingRequests.length}
          icon={Clock}
          subtitle="Awaiting accept/reject"
        />
        <StatWidget
          label="Active Jobs"
          value={activeJobs.length}
          icon={Briefcase}
          subtitle="Accepted & In-progress"
        />
        <StatWidget
          label="Completed Jobs"
          value={completedJobs.length}
          icon={CheckCircle2}
          subtitle="Verified by customer"
        />
      </div>

      {/* Urgent Pending Requests Section */}
      {pendingRequests.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Incoming Job Requests ({pendingRequests.length})</span>
            </div>
            <Link
              href="/worker/requests"
              className="text-xs font-bold text-amber-800 hover:text-amber-950"
            >
              Manage in Requests &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-amber-200/80 p-4 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{req.serviceName}</h4>
                    <p className="text-xs text-slate-500">Customer: {req.customerName}</p>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-700">
                    +${req.pricing.workerEarningsAmount.toFixed(0)}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl">
                  <strong>Date:</strong> {req.date} ({req.timeSlot}) · {req.address.city}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => updateBookingStatus(req.id, 'rejected', 'Declined by worker schedule')}
                    className="py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => updateBookingStatus(req.id, 'accepted', 'Accepted by specialist')}
                    className="py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs"
                  >
                    Accept Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Jobs Grid */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            Active Jobs ({activeJobs.length})
          </h3>
          <Link
            href="/worker/jobs"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activeJobs.length === 0 ? (
          <p className="text-xs text-slate-400 p-6 text-center bg-slate-50 rounded-2xl">
            No active jobs in progress. Check incoming requests to accept new jobs.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{job.serviceName}</h4>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="text-xs text-slate-500">
                    Customer: <strong className="text-slate-700">{job.customerName}</strong> ({job.customerPhone})
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Location: {job.address.street}, {job.address.city}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {job.status === 'accepted' && (
                    <button
                      onClick={() => updateBookingStatus(job.id, 'in_progress', 'Technician arrived on site and commenced work')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Start Job (In Progress)</span>
                    </button>
                  )}

                  {job.status === 'in_progress' && (
                    <button
                      onClick={() => updateBookingStatus(job.id, 'completed', 'Service completed successfully')}
                      className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Completed</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
