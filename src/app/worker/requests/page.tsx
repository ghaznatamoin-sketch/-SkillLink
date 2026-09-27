'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import { EmptyState } from '@/components/common/EmptyState';
import {
  Clock,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  User,
  Phone,
} from 'lucide-react';

export default function WorkerRequestsPage() {
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useMarketplace();
  const { showToast } = useToast();

  const requests = bookings.filter((b) => b.status === 'requested');

  const handleAccept = (id: string, customerName: string) => {
    updateBookingStatus(id, 'accepted', 'Job accepted by service technician');
    showToast('success', `You accepted the booking request from ${customerName}.`, 'Job Accepted!');
  };

  const handleReject = (id: string, customerName: string) => {
    updateBookingStatus(id, 'rejected', 'Service request declined due to schedule');
    showToast('info', `You declined the request from ${customerName}.`);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-emerald-900/30">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
          Incoming Job Requests ({requests.length})
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review customer service requests, check date/location, and accept to confirm appointment.
        </p>
      </div>

      {requests.length === 0 ? (
        <EmptyState
          icon={Clock}
          title="No pending requests right now"
          description="When customers book your services, they will appear here for you to accept or decline."
          actionLabel="View Active Jobs"
          actionHref="/worker/jobs"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-emerald-900/30">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 font-semibold block">
                      Request #{req.id.substring(0, 8)}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-100">
                      {req.serviceName}
                    </h3>
                    <span className="text-xs text-emerald-400 font-medium">
                      Category: {req.categoryName}
                    </span>
                  </div>

                  <div className="text-left sm:text-right bg-emerald-950/80 p-3 rounded-2xl border border-emerald-500/30">
                    <span className="text-[11px] text-slate-400 font-medium block">
                      Your Net Payout (90%)
                    </span>
                    <span className="text-xl font-extrabold text-amber-300">
                      ${req.pricing.workerEarningsAmount.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Total: ${req.pricing.totalCustomerPayment.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-3 text-xs">
                  <div className="space-y-2 p-3.5 rounded-2xl bg-[#121f19]/70 border border-emerald-900/40 text-slate-300">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span><strong>Customer:</strong> {req.customerName}</span>
                    </div>
                    {req.customerPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span><strong>Phone:</strong> {req.customerPhone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span><strong>Scheduled:</strong> {req.date} ({req.timeSlot})</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Address:</strong> {req.address.street}, {req.address.city}
                        {req.address.notes && (
                          <span className="text-slate-500 block text-[11px]">
                            Note: {req.address.notes}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problem Description */}
                <div className="p-3.5 rounded-2xl bg-[#121f19]/50 border border-emerald-900/30 text-xs text-slate-300">
                  <span className="font-bold text-slate-200 block mb-1">Problem Description:</span>
                  <p className="text-slate-400 leading-relaxed">{req.jobDescription}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-900/30">
                <button
                  onClick={() => handleReject(req.id, req.customerName)}
                  className="py-2.5 px-4 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Decline</span>
                </button>

                <button
                  onClick={() => handleAccept(req.id, req.customerName)}
                  className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold border border-emerald-500/30 shadow-md shadow-emerald-950/50 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Accept Job</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

