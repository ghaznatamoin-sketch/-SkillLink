'use client';

import React from 'react';
import { BookingPricing } from '@/types/booking';
import { Tag, HelpCircle, ShieldCheck, PieChart } from 'lucide-react';

interface PriceBreakdownProps {
  pricing: BookingPricing;
  showPlatformSplit?: boolean;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  pricing,
  showPlatformSplit = true,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-[#0e1714]/85 backdrop-blur-xl border border-emerald-500/20 shadow-xl shadow-black/40 space-y-4">
      <div className="flex items-center justify-between border-b border-emerald-900/30 pb-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-amber-400" />
          <h4 className="font-bold text-slate-100 text-xs sm:text-sm">
            Pricing & Marketplace Transparency
          </h4>
        </div>
        <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/30">
          Transparent Model
        </span>
      </div>

      {/* Primary Customer Line items */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-400">
          <span>Service Base Estimate</span>
          <span className="font-medium text-slate-100">
            ${pricing.baseAmount.toFixed(2)} {pricing.currency}
          </span>
        </div>

        {pricing.serviceFee && (
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1">
              Platform & Safety Guarantee Fee
              <span title="Covers insurance & verified technician screening" className="text-slate-500 cursor-help">
                <HelpCircle className="w-3 h-3" />
              </span>
            </span>
            <span className="font-medium text-slate-100">
              ${pricing.serviceFee.toFixed(2)} {pricing.currency}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-emerald-900/30 flex items-center justify-between font-bold text-sm text-slate-100">
          <span>Total Customer Payment</span>
          <span className="text-amber-400 text-base">
            ${pricing.totalCustomerPayment.toFixed(2)} {pricing.currency}
          </span>
        </div>
      </div>

      {/* Business Model Breakdown (Customer Payment -> Worker Earnings + Platform Commission) */}
      {showPlatformSplit && (
        <div className="pt-3 border-t border-dashed border-emerald-900/40 bg-[#121f19] p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200">
            <PieChart className="w-3.5 h-3.5 text-emerald-400" />
            <span>Marketplace Revenue Model (Real-time Split)</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-[#0e1714] border border-emerald-500/20">
              <span className="text-[10px] text-slate-400 font-medium block">Worker Direct Earnings (90%)</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                ${pricing.workerEarningsAmount.toFixed(2)}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#0e1714] border border-emerald-500/20">
              <span className="text-[10px] text-slate-400 font-medium block">
                Platform Commission ({pricing.platformCommissionPercent}%)
              </span>
              <span className="font-extrabold text-amber-300 text-sm">
                ${pricing.platformCommissionAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-tight pt-1">
            * Commission rates are dynamic and configured by platform administrators in Supabase.
          </p>
        </div>
      )}
    </div>
  );
};
