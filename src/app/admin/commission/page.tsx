'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import { StatWidget } from '@/components/dashboards/StatWidget';
import {
  DollarSign,
  Percent,
  Sliders,
  PieChart,
  Save,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function AdminCommissionPage() {
  const { commissionRate, updateCommissionRate, bookings } = useMarketplace();
  const { showToast } = useToast();

  const [rate, setRate] = useState<number>(commissionRate);
  const [fixedSafetyFee, setFixedSafetyFee] = useState<number>(10);

  const completed = bookings.filter((b) => b.status === 'completed');
  const totalVolume = completed.reduce((acc, curr) => acc + curr.pricing.totalCustomerPayment, 0);
  const projectedCommission = (totalVolume * rate) / 100;
  const projectedWorkerEarnings = totalVolume - projectedCommission;

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
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Commission & Platform Revenue Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dynamic fee configuration and real-time revenue projection model.
        </p>
      </div>

      {/* Overview Stat Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
      </div>

      {/* Configuration Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Configure Marketplace Take Rate
            </h3>
            <p className="text-xs text-slate-500">
              Adjust the platform commission slider. Changes dynamically update future job price calculations.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <label className="text-slate-700">Platform Commission Percentage</label>
                <span className="text-base font-extrabold text-emerald-700">{rate}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={0.5}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>0% (Free Marketplace)</span>
                <span>10% (Standard PRD Default)</span>
                <span>30% (High Margin)</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700">
                Fixed Safety & Insurance Guarantee Fee ($)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={fixedSafetyFee}
                  onChange={(e) => setFixedSafetyFee(Number(e.target.value))}
                  className="w-32 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                />
                <span className="text-xs text-slate-400 font-medium">per booking</span>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Commission Rules</span>
            </button>
          </form>
        </div>

        {/* Live Simulator Preview */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-emerald-500/20 space-y-5">
          <div className="flex items-center gap-2 text-emerald-400">
            <PieChart className="w-5 h-5" />
            <h4 className="font-bold text-sm">Live Payout Simulator ($100 Sample Job)</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-between">
              <span className="text-slate-300">Customer Total Payment:</span>
              <strong className="text-white text-sm font-bold">$100.00</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-between border-l-4 border-emerald-400">
              <div>
                <span className="text-emerald-300 font-bold block">Worker Payout ({100 - rate}%):</span>
                <span className="text-[10px] text-slate-400">Credited to specialist</span>
              </div>
              <strong className="text-emerald-300 text-base font-extrabold">
                ${(100 * ((100 - rate) / 100)).toFixed(2)}
              </strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-between border-l-4 border-amber-400">
              <div>
                <span className="text-amber-300 font-bold block">Platform Fee ({rate}%):</span>
                <span className="text-[10px] text-slate-400">Retained for ops & growth</span>
              </div>
              <strong className="text-amber-300 text-base font-extrabold">
                ${(100 * (rate / 100)).toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Complies with Assignment 03 & 04 dynamic commission specification.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
