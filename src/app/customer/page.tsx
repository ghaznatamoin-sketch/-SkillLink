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
  MessageSquare,
  ShieldCheck,
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
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-semibold bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-mint-300" />
            <span>Customer Dashboard</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Customer'}!
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Manage your requested appointments, track active job progress, and connect with verified specialists.
          </p>
        </div>

        <Link
          href="/providers"
          className="px-5 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs shadow-md hover:bg-emerald-50 transition-all hover:scale-105 flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-emerald-700" />
          <span>Book New Service</span>
        </Link>
      </div>

      {/* Metrics Row */}
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
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            Current & Recent Bookings ({myBookings.length})
          </h3>
          <Link
            href="/customer/bookings"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {myBookings.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-500">You haven't requested any services yet.</p>
            <Link
              href="/providers"
              className="inline-block px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
            >
              Browse Specialists
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {myBookings.slice(0, 4).map((bk) => (
              <div
                key={bk.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {bk.serviceName}
                    </h4>
                    <StatusBadge status={bk.status} />
                  </div>

                  <p className="text-xs text-slate-500">
                    Pro: <strong className="text-slate-700">{bk.providerName}</strong> · Scheduled for{' '}
                    <strong className="text-slate-700">{bk.date} ({bk.timeSlot})</strong>
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{bk.address.street}, {bk.address.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium block">Total Payment</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      ${bk.pricing.totalCustomerPayment.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href={`/customer/bookings/${bk.id}`}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Details & Timeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Quick Categories */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Need another service?
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES_DATA.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-center space-y-1 group"
            >
              <h5 className="font-bold text-xs text-slate-800 group-hover:text-emerald-800">
                {cat.name}
              </h5>
              <span className="text-[10px] text-slate-400 block font-medium">
                {cat.services.length} services
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
