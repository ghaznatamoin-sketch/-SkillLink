'use client';

import React from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { ProviderReviewCard } from '@/components/providers/ProviderReviewCard';
import { Star } from 'lucide-react';

export default function CustomerReviewsPage() {
  const { user } = useAuth();
  const { reviews } = useMarketplace();

  // Reviews authored by this customer
  const myReviews = reviews.filter(
    (r) => r.customerId === user?.id || r.customerName === user?.name || user?.role === 'customer'
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-emerald-900/30">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
          My Ratings & Feedback
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Reviews and feedback you have submitted for completed services.
        </p>
      </div>

      {myReviews.length === 0 ? (
        <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl p-12 text-center border border-emerald-500/20 shadow-xl shadow-black/40 space-y-3">
          <Star className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="font-bold text-slate-100 text-sm">No reviews submitted yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Once a service is completed, you can share your rating and comments to help other community members.
          </p>
          <Link
            href="/customer/bookings"
            className="inline-block mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-semibold border border-emerald-500/30 shadow-md"
          >
            Check Completed Bookings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myReviews.map((review) => (
            <ProviderReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

