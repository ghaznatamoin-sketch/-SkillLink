'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMarketplace } from '@/context/MarketplaceContext';
import { BookingStatusTimeline } from '@/components/bookings/BookingStatusTimeline';
import { PriceBreakdown } from '@/components/bookings/PriceBreakdown';
import { ReviewModal } from '@/components/bookings/ReviewModal';
import { StatusBadge } from '@/components/common/Badge';
import {
  Calendar,
  MapPin,
  FileText,
  ShieldCheck,
  Star,
  ArrowLeft,
  MessageSquare,
} from 'lucide-react';

export default function CustomerBookingDetailPage() {
  const params = useParams();
  const bookingId = params.id as string;
  const { getBookingById } = useMarketplace();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const booking = getBookingById(bookingId);

  if (!booking) {
    return (
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl p-12 text-center border border-emerald-500/20 shadow-xl shadow-black/40 space-y-4">
        <h2 className="text-xl font-bold text-slate-100">Booking not found</h2>
        <p className="text-xs text-slate-400">Could not locate booking record #{bookingId}.</p>
        <Link
          href="/customer/bookings"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white text-xs font-semibold border border-emerald-500/30"
        >
          <ArrowLeft className="w-4 h-4 text-amber-300" />
          <span>Back to My Bookings</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Header */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div className="flex items-center gap-3">
          <Link
            href="/customer/bookings"
            className="p-2.5 rounded-xl bg-[#0e1714] border border-emerald-500/20 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors shadow-sm"
            title="Back to all bookings"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
                Booking #{booking.id.substring(0, 8)}
              </h1>
              <StatusBadge status={booking.status} />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Service: <strong className="text-slate-200">{booking.serviceName}</strong> with{' '}
              <strong className="text-slate-200">{booking.providerName}</strong>
            </p>
          </div>
        </div>

        {booking.status === 'completed' && !booking.hasReviewed && (
          <button
            onClick={() => setReviewModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-950/90 hover:bg-amber-900 text-amber-300 border border-amber-400/40 text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Leave Review</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Live Timeline & Appointment Summary */}
        <div className="lg:col-span-7 space-y-6">
          {/* Real-time Timeline */}
          <BookingStatusTimeline
            timeline={booking.timeline}
            currentStatus={booking.status}
          />

          {/* Appointment & Location Details */}
          <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
            <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider">
              Appointment & Address Details
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#121f19]/70 border border-emerald-900/40">
                <Calendar className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-200 block">Scheduled Date & Time</span>
                  <span className="text-slate-400">{booking.date} · {booking.timeSlot}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#121f19]/70 border border-emerald-900/40">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-200 block">Service Location</span>
                  <span className="text-slate-400">
                    {booking.address.street}, {booking.address.city}, {booking.address.country}
                  </span>
                  {booking.address.notes && (
                    <span className="text-slate-500 block text-[11px] mt-0.5">
                      Notes: {booking.address.notes}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#121f19]/70 border border-emerald-900/40">
                <FileText className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-200 block">Job Description</span>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">{booking.jobDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Worker Contact & Price Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          {/* Worker Card */}
          <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
            <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider">
              Assigned Specialist
            </h4>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#121f19] overflow-hidden border border-emerald-500/30 flex-shrink-0">
                {booking.providerAvatarUrl ? (
                  <img
                    src={booking.providerAvatarUrl}
                    alt={booking.providerName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-amber-300">
                    {booking.providerName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h5 className="font-bold text-slate-100 text-sm truncate">
                    {booking.providerName}
                  </h5>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                </div>
                <p className="text-xs text-slate-400 font-medium truncate">
                  {booking.categoryName} Specialist
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/customer/messages"
                className="py-2.5 px-3 rounded-xl border border-emerald-500/30 bg-[#121f19] text-slate-200 text-xs font-semibold hover:bg-[#182922] transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                <span>Message Pro</span>
              </Link>

              <Link
                href={`/providers/${booking.providerId}`}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-semibold text-center border border-emerald-500/30 shadow-sm transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* Pricing Model Split */}
          <PriceBreakdown pricing={booking.pricing} showPlatformSplit={true} />
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <ReviewModal
          booking={booking}
          isOpen={true}
          onClose={() => setReviewModalOpen(false)}
        />
      )}
    </div>
  );
}

