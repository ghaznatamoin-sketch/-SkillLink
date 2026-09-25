'use client';

import React from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { ProviderReviewCard } from '@/components/providers/ProviderReviewCard';
import { Star, MessageSquareQuote, ArrowRight } from 'lucide-react';

export default function CustomerReviewsPage() {
  const { user } = useAuth();
  const { reviews } = useMarketplace();

  // Reviews authored by this customer
  const myReviews = reviews.filter(
    (r) => r.customerId === user?.id || r.customerName === user?.name || user?.role === 'customer'
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          My Ratings & Feedback
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Reviews and feedback you have submitted for completed services.
        </p>
      </div>

      {myReviews.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-3">
          <Star className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">No reviews submitted yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Once a service is completed, you can share your rating and comments to help other community members.
          </p>
          <Link
            href="/customer/bookings"
            className="inline-block mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
          >
            Check Completed Bookings
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myReviews.map((review) => (
            <ProviderReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
