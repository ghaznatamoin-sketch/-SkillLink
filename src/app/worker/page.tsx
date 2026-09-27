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
  ArrowRight,
  ShieldCheck,
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
      <div className="bg-gradient-to-r from-emerald-950 via-[#0a1a14] to-charcoal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-black/40 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Verified Service Professional</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
            Technician Portal — {user?.name || 'Rafael Costa'}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Manage incoming service requests, advance job milestones to completion, and monitor real-time earnings.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/worker/requests"
            className="px-4 py-2.5 rounded-xl bg-amber-950/90 hover:bg-amber-900 text-amber-300 border border-amber-400/40 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4 text-amber-300" />
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
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Incoming Job Requests ({pendingRequests.length})</span>
            </div>
            <Link
              href="/worker/requests"
              className="text-xs font-bold text-amber-300 hover:text-amber-200 transition-colors"
            >
              Manage in Requests &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#0e1714]/90 rounded-2xl border border-amber-500/30 p-4 shadow-md space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{req.serviceName}</h4>
                    <p className="text-xs text-slate-400">Customer: {req.customerName}</p>
                  </div>
                  <span className="text-sm font-extrabold text-amber-300">
                    +${req.pricing.workerEarningsAmount.toFixed(0)}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 bg-[#121f19] p-2.5 rounded-xl border border-emerald-900/30">
                  <strong>Date:</strong> {req.date} ({req.timeSlot}) · {req.address.city}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => updateBookingStatus(req.id, 'rejected', 'Declined by worker schedule')}
                    className="py-1.5 rounded-xl border border-rose-500/30 bg-rose-950/30 text-xs font-semibold text-rose-300 hover:bg-rose-900/40 transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => updateBookingStatus(req.id, 'accepted', 'Accepted by specialist')}
                    className="py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-semibold border border-emerald-500/30 shadow-md transition-all"
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
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100">
            Active Jobs ({activeJobs.length})
          </h3>
          <Link
            href="/worker/jobs"
            className="text-xs font-semibold text-emerald-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {activeJobs.length === 0 ? (
          <p className="text-xs text-slate-400 p-6 text-center bg-[#121f19]/60 rounded-2xl border border-dashed border-emerald-900/40">
            No active jobs in progress. Check incoming requests to accept new jobs.
          </p>
        ) : (
          <div className="divide-y divide-emerald-900/30">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-100 text-sm">{job.serviceName}</h4>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="text-xs text-slate-400">
                    Customer: <strong className="text-slate-200">{job.customerName}</strong> ({job.customerPhone})
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Location: {job.address.street}, {job.address.city}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {job.status === 'accepted' && (
                    <button
                      onClick={() => updateBookingStatus(job.id, 'in_progress', 'Technician arrived on site and commenced work')}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-semibold border border-emerald-500/30 shadow-md flex items-center gap-1.5 transition-all"
                    >
                      <PlayCircle className="w-3.5 h-3.5 text-amber-300" />
                      <span>Start Job (In Progress)</span>
                    </button>
                  )}

                  {job.status === 'in_progress' && (
                    <button
                      onClick={() => updateBookingStatus(job.id, 'completed', 'Service completed successfully')}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-semibold border border-emerald-500/30 shadow-md flex items-center gap-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
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

