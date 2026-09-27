'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  MapPin,
  Star,
} from 'lucide-react';

export default function AdminWorkersPage() {
  const { providers, toggleWorkerVerification } = useMarketplace();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');

  const filteredProviders = providers.filter((p) => {
    if (filterVerified === 'verified' && !p.isVerified) return false;
    if (filterVerified === 'unverified' && p.isVerified) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.location.country.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleToggle = (id: string, name: string, currentVerified: boolean) => {
    toggleWorkerVerification(id);
    showToast(
      'success',
      `${name} verification status updated to ${!currentVerified ? 'VERIFIED' : 'UNVERIFIED'}.`,
      'Verification Updated'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Worker Verification & Accounts ({providers.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit technician licenses, verify identity credentials, and manage provider status.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-4 shadow-xl shadow-black/40 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { key: 'all', label: 'All Providers' },
            { key: 'verified', label: 'Verified Pros' },
            { key: 'unverified', label: 'Pending / Unverified' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterVerified(tab.key as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterVerified === tab.key
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
            placeholder="Search technician name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Workers Table */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-xl shadow-black/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-900/30 text-slate-400 uppercase tracking-wider text-[10px] bg-[#0c1712]">
                <th className="py-3.5 px-4">Technician</th>
                <th className="py-3.5 px-4">Primary Services</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Rating / Jobs</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/20">
              {filteredProviders.map((p) => (
                <tr key={p.id} className="hover:bg-[#121f19]/60 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#121f19] flex-shrink-0 border border-emerald-500/30">
                        <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <strong className="text-slate-100 font-bold block">{p.name}</strong>
                        <span className="text-slate-400 text-[11px] truncate block max-w-xs">
                          {p.title}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.servicesOffered.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[10px] font-medium"
                        >
                          {s.serviceName}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{p.location.city}, {p.location.country}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-amber-300 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>{p.rating.toFixed(2)}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      {p.completedJobsCount} jobs completed
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    {p.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-300 bg-amber-950/80 border border-amber-400/40 px-2.5 py-1 rounded-full text-[11px] font-bold">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Unverified
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleToggle(p.id, p.name, p.isVerified)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        p.isVerified
                          ? 'border-rose-500/30 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40'
                          : 'bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white border border-emerald-500/30 shadow-md'
                      }`}
                    >
                      {p.isVerified ? 'Revoke Badge' : 'Grant Verified Badge'}
                    </button>
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

