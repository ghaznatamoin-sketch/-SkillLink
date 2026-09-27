'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { StatusBadge } from '@/components/common/Badge';
import { EmptyState } from '@/components/common/EmptyState';
import { ReviewModal } from '@/components/bookings/ReviewModal';
import { Booking } from '@/types/booking';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Star,
  Search,
  CheckCircle2,
} from 'lucide-react';

export default function CustomerBookingsPage() {
  const { user } = useAuth();
  const { bookings } = useMarketplace();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReviewBooking, setActiveReviewBooking] = useState<Booking | null>(null);

  // Filter bookings
  const myBookings = bookings.filter((b) => {
    // Status filter
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchService = b.serviceName.toLowerCase().includes(q);
      const matchProvider = b.providerName.toLowerCase().includes(q);
      const matchCity = b.address.city.toLowerCase().includes(q);
      if (!matchService && !matchProvider && !matchCity) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            My Service Bookings
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track status, review completed jobs, and manage appointments.
          </p>
        </div>

        <Link
          href="/providers"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs shadow-md border border-emerald-500/30 transition-all text-center flex items-center justify-center gap-1.5"
        >
          <span>Find New Pro</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-4 shadow-xl shadow-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { key: 'all', label: 'All Bookings' },
            { key: 'requested', label: 'Requested' },
            { key: 'accepted', label: 'Accepted' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === tab.key
                  ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white border border-emerald-500/30 shadow-md'
                  : 'text-slate-400 hover:bg-[#121f19] hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by pro or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Bookings List - Paired 2-cards per row */}
      {myBookings.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No bookings match your filter"
          description="Try changing your status tab or search keyword to see other past and upcoming service requests."
          actionLabel="Clear Filter"
          onActionClick={() => {
            setStatusFilter('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myBookings.map((bk) => (
            <div
              key={bk.id}
              className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-5 sm:p-6 shadow-xl shadow-black/40 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-emerald-900/30">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-semibold text-amber-400">
                        #{bk.id.substring(0, 8)}
                      </span>
                      <StatusBadge status={bk.status} />
                    </div>
                    <h3 className="font-bold text-slate-100 text-base">
                      {bk.serviceName}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Specialist:{' '}
                      <strong className="text-slate-200 font-semibold">{bk.providerName}</strong> ·{' '}
                      {bk.categoryName}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[11px] text-slate-400 font-medium block">Total Price</span>
                    <span className="text-base font-extrabold text-amber-300">
                      ${bk.pricing.totalCustomerPayment.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Schedule and Address Details */}
                <div className="space-y-2 text-xs text-slate-300 bg-[#121f19]/70 p-3.5 rounded-2xl border border-emerald-900/30">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>
                      <strong>Date:</strong> {bk.date} ({bk.timeSlot})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">
                      <strong>Address:</strong> {bk.address.street}, {bk.address.city}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-emerald-900/30 flex-wrap">
                <span className="text-[11px] text-slate-400 font-medium">
                  {new Date(bk.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  {bk.status === 'completed' && !bk.hasReviewed && (
                    <button
                      onClick={() => setActiveReviewBooking(bk)}
                      className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-400/40 text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>Review</span>
                    </button>
                  )}

                  {bk.status === 'completed' && bk.hasReviewed && (
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Reviewed</span>
                    </span>
                  )}

                  <Link
                    href={`/customer/bookings/${bk.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-semibold border border-emerald-500/30 shadow-sm flex items-center gap-1 transition-all"
                  >
                    <span>Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal Trigger */}
      {activeReviewBooking && (
        <ReviewModal
          booking={activeReviewBooking}
          isOpen={true}
          onClose={() => setActiveReviewBooking(null)}
        />
      )}
    </div>
  );
}

