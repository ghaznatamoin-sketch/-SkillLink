'use client';

import React from 'react';
import Image from 'next/image';
import { Review } from '@/types/review';
import { RatingStars } from '@/components/common/RatingStars';
import { ShieldCheck, MessageSquareQuote } from 'lucide-react';

export const ProviderReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
      {/* Reviewer Meta Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-100 flex-shrink-0 border border-emerald-200">
            {review.customerAvatarUrl ? (
              <Image
                src={review.customerAvatarUrl}
                alt={review.customerName}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-emerald-800 font-bold text-sm">
                {review.customerName.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                {review.customerName}
              </h5>
              <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60">
                <ShieldCheck className="w-3 h-3" />
                Verified Customer
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Service: <span className="text-slate-600 font-semibold">{review.serviceName}</span> · {review.date}
            </p>
          </div>
        </div>

        <RatingStars rating={review.rating} size="sm" showNumber={false} />
      </div>

      {/* Review Body */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
        "{review.comment}"
      </p>

      {/* Optional Provider Response */}
      {review.providerResponse && (
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 font-semibold text-[11px]">
            <span className="flex items-center gap-1 text-emerald-700">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              Provider Response
            </span>
            <span className="text-slate-400">{review.providerResponse.date}</span>
          </div>
          <p className="text-slate-600 italic">
            "{review.providerResponse.comment}"
          </p>
        </div>
      )}
    </div>
  );
};
