'use client';

import React from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { StatWidget } from '@/components/dashboards/StatWidget';
import { BarChart3, TrendingUp, Users, Calendar, ArrowUpRight, DollarSign } from 'lucide-react';

export default function AdminReportsPage() {
  const { bookings, providers, reviews } = useMarketplace();

  const totalVolume = bookings.reduce((acc, curr) => acc + curr.pricing.totalCustomerPayment, 0);
  const avgOrderValue = totalVolume / (bookings.length || 1);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Marketplace Analytics & Reports
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          High-level reporting across bookings, regional demand, and category revenue share.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
      </div>

      {/* Category Performance Bar Visualization */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Booking Volume by Category Share
        </h3>

        <div className="space-y-3 pt-2">
          {[
            { name: 'Electrical & Appliances', percent: 38, count: '14 jobs', color: 'bg-amber-500' },
            { name: 'Home & Repair', percent: 28, count: '10 jobs', color: 'bg-cyan-500' },
            { name: 'Cleaning & Sanitation', percent: 18, count: '6 jobs', color: 'bg-sky-500' },
            { name: 'Computer & Tech', percent: 10, count: '4 jobs', color: 'bg-purple-500' },
            { name: 'Professional Services', percent: 6, count: '2 jobs', color: 'bg-blue-500' },
          ].map((cat, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{cat.name}</span>
                <span>{cat.count} ({cat.percent}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full transition-all duration-500`}
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
