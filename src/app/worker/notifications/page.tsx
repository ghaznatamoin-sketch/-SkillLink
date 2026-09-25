'use client';

import React from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/context/MarketplaceContext';
import { Bell, ArrowRight } from 'lucide-react';

export default function WorkerNotificationsPage() {
  const { notifications, markNotificationAsRead } = useMarketplace();

  const workerNotifs = notifications.filter(
    (n) => n.userRole === 'worker' || n.userRole === 'admin'
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Worker Alerts & Requests
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time updates regarding new job requests, accepted bookings, and earnings.
          </p>
        </div>

        <button
          onClick={() => workerNotifs.forEach((n) => markNotificationAsRead(n.id))}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {workerNotifs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No notifications available.
          </div>
        ) : (
          workerNotifs.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                !notif.isRead ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 block">
                    {notif.timestamp}
                  </span>
                </div>
              </div>

              {notif.linkUrl && (
                <Link
                  href={notif.linkUrl}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold whitespace-nowrap flex items-center gap-1"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
