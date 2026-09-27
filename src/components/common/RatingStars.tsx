'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number; // e.g. 4.9
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showNumber = true,
}) => {
  const iconSize = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-semibold',
  }[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = rating >= starIndex;
          const isPartial = !isFilled && rating >= starIndex - 0.75;
          return (
            <Star
              key={starIndex}
              className={`${iconSize} ${
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : isPartial
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-slate-200 text-slate-300'
              }`}
            />
          );
        })}
      </div>

      {showNumber && (
        <span className={`font-bold text-slate-100 ${textSize}`}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-xs text-slate-400 font-normal">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
