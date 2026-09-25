'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProviderReviewCard } from '@/components/providers/ProviderReviewCard';
import { Star, ShieldCheck, MessageSquareQuote } from 'lucide-react';

export default function WorkerReviewsPage() {
  const { reviews } = useMarketplace();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Reviews & Reputation ({reviews.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real feedback and ratings submitted by clients after completed service visits.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>4.92 / 5.0 Average Rating</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <ProviderReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
