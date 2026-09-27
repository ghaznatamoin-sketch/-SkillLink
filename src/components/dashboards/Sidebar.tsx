'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
  Bell,
  Star,
  User,
  Settings,
  DollarSign,
  Briefcase,
  Users,
  ShieldCheck,
  Tag,
  AlertTriangle,
  BarChart3,
  LogOut,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

interface SidebarProps {
  role: 'customer' | 'worker' | 'admin';
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  count?: number;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { notifications, chatThreads, bookings } = useMarketplace();

  const unreadNotifs = notifications.filter((n) => !n.isRead && (n.userRole === role || role === 'admin')).length;
  const pendingRequests = bookings.filter((b) => b.status === 'requested').length;

  const customerNav: NavItem[] = [
    { href: '/customer', label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: '/customer/bookings', label: 'My Bookings', icon: Calendar },
    { href: '/customer/messages', label: 'Messages', icon: MessageSquare },
    { href: '/customer/notifications', label: 'Notifications', icon: Bell, count: unreadNotifs },
    { href: '/customer/reviews', label: 'My Reviews', icon: Star },
    { href: '/customer/profile', label: 'Profile & Address', icon: User },
  ];

  const workerNav: NavItem[] = [
    { href: '/worker', label: 'Worker Overview', icon: LayoutDashboard, exact: true },
    { href: '/worker/requests', label: 'Job Requests', icon: Clock, count: pendingRequests },
    { href: '/worker/jobs', label: 'Active & Completed', icon: Briefcase },
    { href: '/worker/profile-setup', label: 'Services & Skills', icon: Tag },
    { href: '/worker/earnings', label: 'Earnings & Payouts', icon: DollarSign },
    { href: '/worker/reviews', label: 'Client Reviews', icon: Star },
    { href: '/worker/messages', label: 'Messages', icon: MessageSquare },
    { href: '/worker/notifications', label: 'Notifications', icon: Bell, count: unreadNotifs },
  ];

  const adminNav: NavItem[] = [
    { href: '/admin', label: 'Admin Overview', icon: LayoutDashboard, exact: true },
    { href: '/admin/workers', label: 'Workers & Verification', icon: ShieldCheck },
    { href: '/admin/customers', label: 'Customers Directory', icon: Users },
    { href: '/admin/categories', label: 'Categories & Catalog', icon: Tag },
    { href: '/admin/bookings', label: 'All Platform Bookings', icon: Calendar },
    { href: '/admin/commission', label: 'Commission & Revenue', icon: DollarSign },
    { href: '/admin/complaints', label: 'Disputes & Complaints', icon: AlertTriangle },
    { href: '/admin/reports', label: 'Analytics Reports', icon: BarChart3 },
    { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
  ];

  const currentNav: NavItem[] = role === 'admin' ? adminNav : role === 'worker' ? workerNav : customerNav;

  const roleTitle = {
    customer: 'Customer Hub',
    worker: 'Worker Portal',
    admin: 'Admin Control',
  }[role];

  return (
    <aside className="w-full lg:w-64 bg-[#080d0b] border-r border-emerald-900/30 p-4 sm:p-5 flex flex-col justify-between h-auto lg:min-h-[calc(100vh-6.5rem)]">
      <div>
        {/* Role Header Badge */}
        <div className="p-3 rounded-2xl bg-[#0e1714] border border-emerald-500/20 mb-6 flex items-center gap-3 shadow-md">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 via-emerald-900 to-[#041a12] text-white flex items-center justify-center font-bold text-sm shadow-md border border-amber-500/30">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover rounded-xl" />
            ) : (
              user?.name.charAt(0) || 'U'
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-slate-100 text-xs truncate">{user?.name || 'User'}</h4>
            <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-400/30 inline-block">
              {roleTitle}
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {currentNav.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-amber-300 shadow-md border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-[#121f19]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer quick link */}
      <div className="pt-6 border-t border-emerald-900/30 mt-6">
        <Link
          href="/providers"
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-emerald-900/40 bg-[#0e1714] text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#121f19] transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Browse Public Services</span>
        </Link>
      </div>
    </aside>
  );
};
