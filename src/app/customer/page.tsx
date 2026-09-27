'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import { StatWidget } from '@/components/dashboards/StatWidget';
import { StatusBadge } from '@/components/common/Badge';
import { CATEGORIES_DATA } from '@/data/categories';
import {
  Calendar,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Sparkles,
  MapPin,
  Plus,
} from 'lucide-react';

export default function CustomerOverviewPage() {
  const { user } = useAuth();
  const { bookings } = useMarketplace();

  // Filter bookings for this customer
  const myBookings = bookings.filter(
    (b) => b.customerId === user?.id || b.customerName === user?.name || user?.role === 'customer'
  );

  const activeBookings = myBookings.filter(
    (b) => b.status === 'requested' || b.status === 'accepted' || b.status === 'in_progress'
  );
  const completedBookings = myBookings.filter((b) => b.status === 'completed');
  const totalSpent = completedBookings.reduce(
    (acc, curr) => acc + curr.pricing.totalCustomerPayment,
    0
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0a1a14] to-charcoal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-black/40 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Customer Dashboard</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100">
            Welcome back, {user?.name || 'Customer'}!
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Manage your requested appointments, track active job progress, and connect with verified specialists.
          </p>
        </div>

        <Link
          href="/providers"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 border border-emerald-500/30 transition-all hover:scale-105 flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Book New Service</span>
        </Link>
      </div>

      {/* Metrics Row - 2 pairs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          label="Active Bookings"
          value={activeBookings.length}
          icon={Calendar}
          subtitle="In progress & scheduled"
        />
        <StatWidget
          label="Pending Requests"
          value={myBookings.filter((b) => b.status === 'requested').length}
          icon={Clock}
          subtitle="Awaiting pro confirmation"
        />
        <StatWidget
          label="Completed Services"
          value={completedBookings.length}
          icon={CheckCircle2}
          subtitle="All-time verified"
        />
        <StatWidget
          label="Total Investment"
          value={`$${totalSpent.toFixed(0)}`}
          icon={DollarSign}
          subtitle="Transparent spend"
        />
      </div>

      {/* Active & Recent Bookings List */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-100">
            Current & Recent Bookings ({myBookings.length})
          </h3>
          <Link
            href="/customer/bookings"
            className="text-xs font-semibold text-emerald-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {myBookings.length === 0 ? (
          <div className="p-8 text-center bg-[#121f19]/60 rounded-2xl border border-dashed border-emerald-900/40 space-y-3">
            <Calendar className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-400">You haven't requested any services yet.</p>
            <Link
              href="/providers"
              className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white text-xs font-semibold border border-emerald-500/30"
            >
              Browse Specialists
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-emerald-900/30">
            {myBookings.slice(0, 4).map((bk) => (
              <div
                key={bk.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-100 text-sm">
                      {bk.serviceName}
                    </h4>
                    <StatusBadge status={bk.status} />
                  </div>

                  <p className="text-xs text-slate-400">
                    Pro: <strong className="text-slate-200">{bk.providerName}</strong> · Scheduled for{' '}
                    <strong className="text-slate-200">{bk.date} ({bk.timeSlot})</strong>
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{bk.address.street}, {bk.address.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium block">Total Payment</span>
                    <span className="font-extrabold text-amber-300 text-sm">
                      ${bk.pricing.totalCustomerPayment.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href={`/customer/bookings/${bk.id}`}
                    className="px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-[#121f19] hover:bg-[#182922] text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                  >
                    <span>Details & Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Quick Categories - Paired 2x2 cards */}
      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
        <h3 className="text-base font-bold text-slate-100">
          Need another service?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES_DATA.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="p-4 rounded-2xl border border-emerald-900/40 bg-[#121f19]/70 hover:bg-[#182922] hover:border-emerald-500/40 transition-all text-center space-y-1.5 group shadow-sm"
            >
              <h5 className="font-bold text-xs text-slate-200 group-hover:text-emerald-300 transition-colors">
                {cat.name}
              </h5>
              <span className="text-[10px] text-slate-400 block font-medium">
                {cat.services.length} core services
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

