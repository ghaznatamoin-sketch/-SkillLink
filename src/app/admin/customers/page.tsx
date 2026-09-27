'use client';

import React, { useState } from 'react';
import { Search, CheckCircle2 } from 'lucide-react';

const MOCK_CUSTOMERS = [
  {
    id: 'cust-amara',
    name: 'Amara Bello',
    email: 'amara.bello@example.com',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    bookingsCount: 4,
    totalSpent: 420,
    status: 'active',
    joinedDate: 'Jan 2023',
  },
  {
    id: 'cust-marcus',
    name: 'Marcus Chen',
    email: 'marcus.chen@example.com',
    phone: '+44 20 7946 0912',
    location: 'London, UK',
    bookingsCount: 6,
    totalSpent: 680,
    status: 'active',
    joinedDate: 'Feb 2023',
  },
  {
    id: 'cust-tariq',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.mansoor@example.com',
    phone: '+971 50 123 4567',
    location: 'Dubai, UAE',
    bookingsCount: 3,
    totalSpent: 350,
    status: 'active',
    joinedDate: 'May 2023',
  },
  {
    id: 'cust-sophie',
    name: 'Sophie Dubois',
    email: 'sophie.dubois@example.com',
    phone: '+1 416 555 0184',
    location: 'Toronto, Canada',
    bookingsCount: 5,
    totalSpent: 525,
    status: 'active',
    joinedDate: 'Jun 2023',
  },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Customer Directory ({MOCK_CUSTOMERS.length})
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Registered customer accounts, booking activity, and spend metrics worldwide.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 shadow-xl shadow-black/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-emerald-900/30 text-slate-400 uppercase tracking-wider text-[10px] bg-[#0c1712]">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Bookings</th>
                <th className="py-3.5 px-4">Total Spend</th>
                <th className="py-3.5 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/20">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#121f19]/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#121f19] border border-emerald-500/30 text-amber-300 font-bold flex items-center justify-center text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    <span className="block">{c.email}</span>
                    <span className="text-slate-500 text-[11px]">{c.phone}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{c.location}</td>
                  <td className="py-4 px-4 font-semibold text-slate-200">
                    {c.bookingsCount} orders
                  </td>
                  <td className="py-4 px-4 font-bold text-amber-300">
                    ${c.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Active
                    </span>
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

