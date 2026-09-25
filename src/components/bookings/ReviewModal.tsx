'use client';

import React, { useState } from 'react';
import { Booking } from '@/types/booking';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import { Star, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  const { addReview } = useMarketplace();
  const { showToast } = useToast();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('warning', 'Please provide a short description of your experience.');
      return;
    }

    setIsSubmitting(true);

    try {
      addReview({
        bookingId: booking.id,
        providerId: booking.providerId,
        customerId: booking.customerId,
        customerName: booking.customerName,
        rating,
        comment: comment.trim(),
        serviceName: booking.serviceName,
      });

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });

      showToast('success', 'Your review has been published!', 'Thank you!');
      onClose();
    } catch (err) {
      showToast('error', 'Could not submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close review modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Rate your service experience
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Service: <strong className="text-slate-700">{booking.serviceName}</strong> with{' '}
            <strong className="text-slate-700">{booking.providerName}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Selector */}
          <div className="flex flex-col items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Select Rating</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star;
                return (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1.5 transition-transform hover:scale-115 focus:outline-none"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        active
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-100 text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-bold text-amber-600">
              {rating === 5
                ? '5.0 — Excellent service'
                : rating === 4
                ? '4.0 — Good & professional'
                : rating === 3
                ? '3.0 — Satisfactory'
                : '2.0 — Needs improvement'}
            </span>
          </div>

          {/* Feedback textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Your Review / Feedback
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the punctuality, communication, and quality of work?"
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-md shadow-emerald-900/10 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
