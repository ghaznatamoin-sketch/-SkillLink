'use client';

import React from 'react';
import Link from 'next/link';
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
  DollarSign,
  FileText,
  User,
  Phone,
  ShieldCheck,
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
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Incoming Job Requests ({requests.length})
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
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
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold block">
                    Request #{req.id}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {req.serviceName}
                  </h3>
                  <span className="text-xs text-emerald-700 font-medium">
                    Category: {req.categoryName}
                  </span>
                </div>

                <div className="text-left sm:text-right bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Your Net Payout (90%)
                  </span>
                  <span className="text-xl font-extrabold text-emerald-800">
                    ${req.pricing.workerEarningsAmount.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Total Customer: ${req.pricing.totalCustomerPayment.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Customer:</strong> {req.customerName}</span>
                  </div>
                  {req.customerPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span><strong>Phone:</strong> {req.customerPhone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span><strong>Scheduled:</strong> {req.date} ({req.timeSlot})</span>
                  </div>
                </div>

                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Address:</strong> {req.address.street}, {req.address.city}
                      {req.address.notes && (
                        <span className="text-slate-400 block text-[11px]">
                          Note: {req.address.notes}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 text-xs">
                <span className="font-bold text-slate-800 block mb-1">Customer Problem Description:</span>
                <p className="text-slate-600 leading-relaxed">{req.jobDescription}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleReject(req.id, req.customerName)}
                  className="py-2.5 px-5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Decline Request</span>
                </button>

                <button
                  onClick={() => handleAccept(req.id, req.customerName)}
                  className="py-2.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-all hover:scale-105 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept & Confirm Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
