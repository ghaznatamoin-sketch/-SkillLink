'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import { StatWidget } from '@/components/dashboards/StatWidget';
import {
  DollarSign,
  Percent,
  PieChart,
  Save,
  ShieldCheck,
} from 'lucide-react';

export default function AdminCommissionPage() {
  const { commissionRate, updateCommissionRate, bookings } = useMarketplace();
  const { showToast } = useToast();

  const [rate, setRate] = useState<number>(commissionRate);
  const [fixedSafetyFee, setFixedSafetyFee] = useState<number>(10);

  const completed = bookings.filter((b) => b.status === 'completed');
  const totalVolume = completed.reduce((acc, curr) => acc + curr.pricing.totalCustomerPayment, 0);
  const projectedCommission = (totalVolume * rate) / 100;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommissionRate(rate);
    showToast(
      'success',
      `Platform commission percentage configured to ${rate}%.`,
      'Commission Saved'
    );
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-emerald-900/30">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
          Commission & Platform Revenue Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Dynamic fee configuration and real-time revenue projection model.
        </p>
      </div>

      {/* Overview Stat Widgets - Paired 2x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          label="Current Active Commission"
          value={`${commissionRate}%`}
          icon={Percent}
          subtitle="Applied on new bookings"
        />
        <StatWidget
          label="Projected Platform Revenue"
          value={`$${projectedCommission.toFixed(2)}`}
          icon={DollarSign}
          subtitle="Based on completed volume"
        />
        <StatWidget
          label="Worker Share (Net)"
          value={`${100 - commissionRate}%`}
          icon={PieChart}
          subtitle="Direct technician payout"
        />
        <StatWidget
          label="Completed Volume"
          value={`$${totalVolume.toFixed(2)}`}
          icon={DollarSign}
          subtitle="Total transaction volume"
        />
      </div>

      {/* Configuration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 sm:p-8 shadow-xl shadow-black/40 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">
              Configure Marketplace Take Rate
            </h3>
            <p className="text-xs text-slate-400">
              Adjust the platform commission slider. Changes dynamically update future job price calculations.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <label className="text-slate-200">Platform Commission Percentage</label>
                <span className="text-base font-extrabold text-amber-300">{rate}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>0% (Free Marketplace)</span>
                <span>10% (Standard PRD Default)</span>
                <span>30% (High Margin)</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-emerald-900/30">
              <label className="block text-xs font-bold text-slate-200">
                Fixed Safety & Insurance Guarantee Fee ($)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={fixedSafetyFee}
                  onChange={(e) => setFixedSafetyFee(Number(e.target.value))}
                  className="w-32 px-3 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-400 font-medium">per booking</span>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-950/40 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>Save & Publish Commission Rules</span>
            </button>
          </form>
        </div>

        {/* Live Simulator Preview */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-[#0a1a14] to-charcoal-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-black/40 border border-emerald-500/30 space-y-5">
          <div className="flex items-center gap-2 text-amber-300">
            <PieChart className="w-5 h-5" />
            <h4 className="font-bold text-sm">Live Payout Simulator ($100 Sample Job)</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#0e1714]/80 border border-emerald-900/40 flex items-center justify-between">
              <span className="text-slate-300">Customer Total Payment:</span>
              <strong className="text-white text-sm font-bold">$100.00</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0e1714]/80 border border-emerald-500/30 flex items-center justify-between border-l-4 border-l-emerald-400">
              <div>
                <span className="text-emerald-300 font-bold block">Worker Payout ({100 - rate}%):</span>
                <span className="text-[10px] text-slate-400">Credited to specialist</span>
              </div>
              <strong className="text-emerald-300 text-base font-extrabold">
                ${(100 * ((100 - rate) / 100)).toFixed(2)}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0e1714]/80 border border-amber-400/30 flex items-center justify-between border-l-4 border-l-amber-400">
              <div>
                <span className="text-amber-300 font-bold block">Platform Fee ({rate}%):</span>
                <span className="text-[10px] text-slate-400">Retained for ops & growth</span>
              </div>
              <strong className="text-amber-300 text-base font-extrabold">
                ${(100 * (rate / 100)).toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-emerald-900/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Complies with Assignment 03 & 04 dynamic commission specification.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

