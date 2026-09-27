'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { StatWidget } from '@/components/dashboards/StatWidget';
import {
  DollarSign,
  PieChart,
  TrendingUp,
  Download,
} from 'lucide-react';

export default function WorkerEarningsPage() {
  const { bookings, commissionRate } = useMarketplace();

  const completedJobs = bookings.filter((b) => b.status === 'completed');

  const totalGrossCustomerPaid = completedJobs.reduce(
    (acc, curr) => acc + curr.pricing.totalCustomerPayment,
    0
  );
  const totalWorkerNet = completedJobs.reduce(
    (acc, curr) => acc + curr.pricing.workerEarningsAmount,
    0
  );
  const totalPlatformCommission = completedJobs.reduce(
    (acc, curr) => acc + curr.pricing.platformCommissionAmount,
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Earnings & Revenue Transparency
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent breakdown of your net payouts, customer gross totals, and platform commission.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl border border-emerald-500/30 bg-[#121f19] text-slate-200 hover:text-white hover:bg-[#182922] text-xs font-semibold flex items-center gap-1.5 self-start shadow-sm transition-colors">
          <Download className="w-3.5 h-3.5 text-amber-300" />
          <span>Export Statement</span>
        </button>
      </div>

      {/* Metrics Row - Paired 2x2 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          label="Your Net Earnings (90%)"
          value={`$${totalWorkerNet.toFixed(2)}`}
          icon={DollarSign}
          change="+18.4%"
          isPositive={true}
          subtitle="Direct technician payout"
        />
        <StatWidget
          label="Gross Customer Total"
          value={`$${totalGrossCustomerPaid.toFixed(2)}`}
          icon={TrendingUp}
          subtitle="Customer total payments"
        />
        <StatWidget
          label={`Platform Fee (${commissionRate}%)`}
          value={`$${totalPlatformCommission.toFixed(2)}`}
          icon={PieChart}
          subtitle="Platform & insurance fee"
        />
        <StatWidget
          label="Settled Completed Jobs"
          value={completedJobs.length}
          icon={DollarSign}
          subtitle="All payouts processed"
        />
      </div>

      {/* Business Model Explanation Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0a1a14] to-charcoal-950 text-white border border-emerald-500/30 shadow-xl shadow-black/40 space-y-4">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-amber-300" />
          <h3 className="font-bold text-sm text-slate-100">How SkillLink Marketplace Commission Works</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          SkillLink operates a 100% transparent fee model. When a customer makes a payment for a completed job, you retain the vast majority of the funds directly ({100 - commissionRate}%), with a dynamic platform fee ({commissionRate}%) supporting marketing, server infrastructure, customer discovery, and dispute resolution.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#0e1714]/80 border border-emerald-900/40">
            <span className="text-[10px] text-slate-400 font-medium block">1. Customer Payment</span>
            <span className="font-bold text-slate-100 text-sm">$100.00 (Example)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0e1714]/80 border border-emerald-500/30">
            <span className="text-[10px] text-slate-400 font-medium block">2. Worker Direct Payout</span>
            <span className="font-bold text-amber-300 text-sm">$90.00 (90%)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0e1714]/80 border border-emerald-900/40">
            <span className="text-[10px] text-slate-400 font-medium block">3. Platform Commission</span>
            <span className="font-bold text-emerald-400 text-sm">$10.00 (10%)</span>
          </div>
        </div>
      </div>

      {/* Payout History Table */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
        <h3 className="text-base font-bold text-slate-100">
          Completed Service Payouts ({completedJobs.length})
        </h3>

        {completedJobs.length === 0 ? (
          <p className="text-xs text-slate-400 p-6 text-center bg-[#121f19]/60 rounded-2xl border border-dashed border-emerald-900/40">
            No completed payouts recorded yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-emerald-900/30 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Job ID</th>
                  <th className="py-3 px-3">Service & Customer</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Gross Customer</th>
                  <th className="py-3 px-3">Platform Fee</th>
                  <th className="py-3 px-3 font-bold text-amber-300">Your Net Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/20">
                {completedJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-[#121f19]/60 transition-colors">
                    <td className="py-3.5 px-3 font-mono text-amber-400">#{job.id.substring(0, 8)}</td>
                    <td className="py-3.5 px-3">
                      <strong className="text-slate-100 font-bold block">{job.serviceName}</strong>
                      <span className="text-slate-400 text-[11px]">{job.customerName}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300">{job.date}</td>
                    <td className="py-3.5 px-3 text-slate-300">
                      ${job.pricing.totalCustomerPayment.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-slate-400">
                      -${job.pricing.platformCommissionAmount.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 font-extrabold text-amber-300 text-sm">
                      +${job.pricing.workerEarningsAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

