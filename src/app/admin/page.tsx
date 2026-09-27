'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import { StatWidget } from '@/components/dashboards/StatWidget';
import { StatusBadge } from '@/components/common/Badge';
import {
  ShieldCheck,
  DollarSign,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Percent,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const { bookings, providers, complaints, commissionRate, updateCommissionRate } = useMarketplace();
  const { showToast } = useToast();

  const [inputCommission, setInputCommission] = useState(commissionRate.toString());

  const totalGrossVolume = bookings.reduce(
    (acc, curr) => acc + curr.pricing.totalCustomerPayment,
    0
  );
  const totalPlatformRevenue = bookings.reduce(
    (acc, curr) => acc + curr.pricing.platformCommissionAmount,
    0
  );
  const totalWorkersCount = providers.length;
  const verifiedWorkersCount = providers.filter((p) => p.isVerified).length;
  const pendingComplaints = complaints.filter((c) => c.status !== 'resolved').length;

  const handleUpdateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(inputCommission);
    if (isNaN(val) || val < 0 || val > 50) {
      showToast('warning', 'Please enter a valid commission rate between 0% and 50%.');
      return;
    }
    updateCommissionRate(val);
    showToast('success', `Platform commission rate updated to ${val}%.`, 'Settings Saved');
  };

  return (
    <div className="space-y-6">
      {/* Admin Protected Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0a1a14] to-charcoal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-black/40 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Platform Owner & Administrator Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
            SkillLink Marketplace Health
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Monitor worldwide booking volume, manage verified technician credentials, and configure marketplace commission.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/admin/commission"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs shadow-md border border-emerald-500/30 transition-all"
          >
            Commission Settings ({commissionRate}%)
          </Link>
        </div>
      </div>

      {/* Metric Cards Row - 2 pairs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          label="Total Gross Volume"
          value={`$${totalGrossVolume.toFixed(2)}`}
          icon={TrendingUp}
          change="+24.8%"
          subtitle="All transactions processed"
        />
        <StatWidget
          label="Platform Revenue"
          value={`$${totalPlatformRevenue.toFixed(2)}`}
          icon={DollarSign}
          change={`@ ${commissionRate}% rate`}
          subtitle="Net platform commission"
        />
        <StatWidget
          label="Active Specialists"
          value={`${verifiedWorkersCount} / ${totalWorkersCount}`}
          icon={Briefcase}
          subtitle="Verified / Total enrolled"
        />
        <StatWidget
          label="Open Complaints"
          value={pendingComplaints}
          icon={AlertTriangle}
          isPositive={pendingComplaints === 0}
          subtitle="Customer dispute tickets"
        />
      </div>

      {/* Quick Commission Adjust Widget */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-lg">
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-amber-300" />
            <h3 className="font-bold text-slate-100 text-sm">
              Dynamic Platform Commission Rate
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            As outlined in the PRD, commission is fully configurable rather than hardcoded into business logic. Adjusting this modifies splits on all new bookings.
          </p>
        </div>

        <form onSubmit={handleUpdateCommission} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-28">
            <input
              type="number"
              min="0"
              max="50"
              step="0.5"
              value={inputCommission}
              onChange={(e) => setInputCommission(e.target.value)}
              className="w-full px-3 py-2 text-sm font-bold text-amber-300 rounded-xl border border-emerald-900/40 bg-[#121f19] focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-7"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
              %
            </span>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs border border-emerald-500/30 shadow-md transition-all whitespace-nowrap"
          >
            Apply Rate
          </button>
        </form>
      </div>

      {/* Platform Global Bookings Table */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100">
            Live Platform Bookings Audit ({bookings.length})
          </h3>
          <Link
            href="/admin/bookings"
            className="text-xs font-semibold text-emerald-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Full Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-900/30 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Booking ID</th>
                <th className="py-3 px-3">Service & Category</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Specialist</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Customer Total</th>
                <th className="py-3 px-3 font-bold text-amber-300">Platform Comm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/20">
              {bookings.map((bk) => (
                <tr key={bk.id} className="hover:bg-[#121f19]/60 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-amber-400">#{bk.id.substring(0, 8)}</td>
                  <td className="py-3.5 px-3">
                    <strong className="text-slate-100 font-bold block">{bk.serviceName}</strong>
                    <span className="text-slate-400 text-[10px]">{bk.categoryName}</span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-300">{bk.customerName}</td>
                  <td className="py-3.5 px-3 font-medium text-slate-300">{bk.providerName}</td>
                  <td className="py-3.5 px-3">
                    <StatusBadge status={bk.status} />
                  </td>
                  <td className="py-3.5 px-3 font-bold text-slate-200">
                    ${bk.pricing.totalCustomerPayment.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-amber-300">
                    +${bk.pricing.platformCommissionAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

