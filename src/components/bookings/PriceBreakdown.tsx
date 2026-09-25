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
    <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-emerald-700" />
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
            Pricing & Marketplace Transparency
          </h4>
        </div>
        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
          Transparent Model
        </span>
      </div>

      {/* Primary Customer Line items */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span>Service Base Estimate</span>
          <span className="font-medium text-slate-900">
            ${pricing.baseAmount.toFixed(2)} {pricing.currency}
          </span>
        </div>

        {pricing.serviceFee && (
          <div className="flex items-center justify-between text-slate-600">
            <span className="flex items-center gap-1">
              Platform & Safety Guarantee Fee
              <span title="Covers insurance & verified technician screening" className="text-slate-400 cursor-help">
                <HelpCircle className="w-3 h-3" />
              </span>
            </span>
            <span className="font-medium text-slate-900">
              ${pricing.serviceFee.toFixed(2)} {pricing.currency}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-bold text-sm text-slate-900">
          <span>Total Customer Payment</span>
          <span className="text-emerald-700 text-base">
            ${pricing.totalCustomerPayment.toFixed(2)} {pricing.currency}
          </span>
        </div>
      </div>

      {/* Business Model Breakdown (Customer Payment -> Worker Earnings + Platform Commission) */}
      {showPlatformSplit && (
        <div className="pt-3 border-t border-dashed border-slate-200 bg-slate-50/70 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
            <PieChart className="w-3.5 h-3.5 text-emerald-600" />
            <span>Marketplace Revenue Model (Sample Demonstration)</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 font-medium block">Worker Direct Earnings (90%)</span>
              <span className="font-extrabold text-emerald-700 text-sm">
                ${pricing.workerEarningsAmount.toFixed(2)}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 font-medium block">
                Platform Commission ({pricing.platformCommissionPercent}%)
              </span>
              <span className="font-extrabold text-slate-700 text-sm">
                ${pricing.platformCommissionAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 leading-tight pt-1">
            * Commission rates are dynamic and configured by platform administrators. Sample values for frontend demonstration.
          </p>
        </div>
      )}
    </div>
  );
};
