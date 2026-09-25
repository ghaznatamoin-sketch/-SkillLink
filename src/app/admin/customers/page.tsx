'use client';

import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Directory ({MOCK_CUSTOMERS.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
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
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50">
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Bookings</th>
                <th className="py-3.5 px-4">Total Spend</th>
                <th className="py-3.5 px-4">Account Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    <span className="block">{c.email}</span>
                    <span className="text-slate-400 text-[11px]">{c.phone}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{c.location}</td>
                  <td className="py-4 px-4 font-semibold text-slate-800">
                    {c.bookingsCount} orders
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-700">
                    ${c.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
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
