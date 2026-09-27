'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProviderReviewCard } from '@/components/providers/ProviderReviewCard';
import { Star } from 'lucide-react';

export default function WorkerReviewsPage() {
  const { reviews } = useMarketplace();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Customer Reviews & Reputation ({reviews.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real feedback and ratings submitted by clients after completed service visits.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-950/80 border border-amber-400/40 text-amber-300 text-xs font-bold shadow-sm">
          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span>4.92 / 5.0 Average Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <ProviderReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

