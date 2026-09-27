'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { StatusBadge } from '@/components/common/Badge';
import { Search, Download } from 'lucide-react';

export default function AdminBookingsPage() {
  const { bookings } = useMarketplace();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        b.serviceName.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.providerName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            All Platform Bookings ({bookings.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete transaction ledger with customer fees, technician payouts, and platform commission.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl border border-emerald-500/30 bg-[#121f19] text-slate-200 hover:text-white hover:bg-[#182922] text-xs font-semibold flex items-center gap-1.5 self-start shadow-sm transition-colors">
          <Download className="w-3.5 h-3.5 text-amber-300" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-4 shadow-xl shadow-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { key: 'all', label: 'All Statuses' },
            { key: 'requested', label: 'Requested' },
            { key: 'accepted', label: 'Accepted' },
            { key: 'in_progress', label: 'In Progress' },
            { key: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === tab.key
                  ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white border border-emerald-500/30 shadow-md'
                  : 'text-slate-400 hover:bg-[#121f19] hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search booking, pro, or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-xl shadow-black/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-900/30 text-slate-400 uppercase tracking-wider text-[10px] bg-[#0c1712]">
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Technician</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Customer Gross</th>
                <th className="py-3.5 px-4">Worker Pay</th>
                <th className="py-3.5 px-4 font-bold text-amber-300">Platform Comm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/20">
              {filtered.map((bk) => (
                <tr key={bk.id} className="hover:bg-[#121f19]/60 transition-colors">
                  <td className="py-4 px-4 font-mono text-amber-400">#{bk.id.substring(0, 8)}</td>
                  <td className="py-4 px-4">
                    <strong className="text-slate-100 font-bold block">{bk.serviceName}</strong>
                    <span className="text-[10px] text-slate-400">{bk.categoryName}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-medium">{bk.customerName}</td>
                  <td className="py-4 px-4 text-slate-300 font-medium">{bk.providerName}</td>
                  <td className="py-4 px-4 text-slate-400">{bk.date}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={bk.status} />
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-200">
                    ${bk.pricing.totalCustomerPayment.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    ${bk.pricing.workerEarningsAmount.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 font-extrabold text-amber-300">
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

