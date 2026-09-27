'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { StatWidget } from '@/components/dashboards/StatWidget';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminReportsPage() {
  const { bookings, reviews } = useMarketplace();

  const totalVolume = bookings.reduce((acc, curr) => acc + curr.pricing.totalCustomerPayment, 0);
  const avgOrderValue = totalVolume / (bookings.length || 1);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-emerald-900/30">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
          Marketplace Analytics & Reports
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          High-level reporting across bookings, regional demand, and category revenue share.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          label="Total GMV Volume"
          value={`$${totalVolume.toFixed(2)}`}
          icon={TrendingUp}
          change="+32%"
          subtitle="Monthly GMV growth"
        />
        <StatWidget
          label="Average Order Value"
          value={`$${avgOrderValue.toFixed(2)}`}
          icon={DollarSign}
          subtitle="Per scheduled booking"
        />
        <StatWidget
          label="Total Reviews Logged"
          value={reviews.length}
          icon={BarChart3}
          subtitle="Customer ratings"
        />
        <StatWidget
          label="Settled Bookings"
          value={bookings.length}
          icon={DollarSign}
          subtitle="All transactions"
        />
      </div>

      {/* Category Performance Bar Visualization */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
        <h3 className="text-base font-bold text-slate-100">
          Booking Volume by Category Share
        </h3>

        <div className="space-y-4 pt-2">
          {[
            { name: 'Electrical & Appliances', percent: 38, count: '14 jobs', color: 'bg-amber-400' },
            { name: 'Home & Repair', percent: 28, count: '10 jobs', color: 'bg-emerald-500' },
            { name: 'Cleaning & Sanitation', percent: 18, count: '6 jobs', color: 'bg-teal-400' },
            { name: 'Computer & Tech', percent: 10, count: '4 jobs', color: 'bg-amber-500' },
            { name: 'Professional Services', percent: 6, count: '2 jobs', color: 'bg-emerald-600' },
          ].map((cat, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>{cat.name}</span>
                <span className="text-amber-300">{cat.count} ({cat.percent}%)</span>
              </div>
              <div className="w-full bg-[#121f19] h-2.5 rounded-full overflow-hidden border border-emerald-900/30">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-500 shadow-sm`}
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

