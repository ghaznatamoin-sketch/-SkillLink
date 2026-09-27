'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useMarketplace } from '@/context/MarketplaceContext';
import {
  Search,
  Menu,
  X,
  Bell,
  Sparkles,
  User,
  LogOut,
  LayoutDashboard,
  Calendar,
  Briefcase,
  Shield,
  Layers,
  Users
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, role, isAuthenticated, logout } = useAuth();
  const { notifications, markNotificationAsRead } = useMarketplace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getDashboardHref = () => {
    if (role === 'worker') return '/worker';
    if (role === 'admin') return '/admin';
    return '/customer';
  };

  const navLinks = [
    { href: '/categories', label: 'All Categories', icon: Layers },
    { href: '/providers', label: 'Find Providers', icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#080d0b]/90 backdrop-blur-md border-b border-emerald-900/30 shadow-lg shadow-black/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 via-emerald-900 to-[#041a12] flex items-center justify-center text-white font-bold shadow-md shadow-emerald-950/60 group-hover:scale-105 transition-transform border border-amber-500/30">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-extrabold text-slate-100 tracking-tight">Skill</span>
                  <span className="text-xl font-extrabold text-emerald-400 tracking-tight">Link</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium -mt-0.5">
                  Worldwide Services Marketplace
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 ml-4">
              {navLinks.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-950/90 text-emerald-300 font-semibold border border-emerald-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-[#111d18]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Search trigger & User Role Navigation */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/providers"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0e1714] hover:bg-[#14231e] text-slate-400 hover:text-slate-200 text-xs transition-colors border border-emerald-900/40"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span>Search services, skills, or cities...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-[#172721] border border-emerald-800/40 rounded text-slate-400 font-mono">
                /
              </kbd>
            </Link>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#111d18] transition-colors border border-transparent hover:border-emerald-900/40"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-[#080d0b]"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0e1714] rounded-2xl shadow-2xl border border-emerald-500/20 p-3 z-50 animate-fadeIn backdrop-blur-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-900/40 px-1">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Notifications</h4>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 font-semibold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-emerald-900/30 my-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 p-4 text-center">No notifications yet</p>
                    ) : (
                      notifications.slice(0, 5).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-2.5 rounded-lg text-xs cursor-pointer hover:bg-[#14231e] transition-colors ${
                            !notif.isRead ? 'bg-emerald-950/40' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-semibold text-slate-100">{notif.title}</span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                          </div>
                          <p className="text-slate-300 mt-0.5 line-clamp-2">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Authenticated / Guest State */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-emerald-900/40">
                <Link
                  href={getDashboardHref()}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-semibold shadow-md border border-emerald-500/30 transition-all hover:scale-[1.02]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
                  <span>
                    {role === 'customer'
                      ? 'My Bookings'
                      : role === 'worker'
                      ? 'Worker Dashboard'
                      : 'Admin Control'}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                  title="Sign Out (Switch to Guest)"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#14231e] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-md border border-emerald-500/30 transition-all"
                >
                  Join SkillLink
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:bg-[#14231e] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-900/40 bg-[#0c1411]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-slide-up">
          <div className="space-y-1">
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-emerald-950/60 hover:text-emerald-300"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>All 12 Categories</span>
            </Link>
            <Link
              href="/providers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-emerald-950/60 hover:text-emerald-300"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Search Providers</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-emerald-900/40">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  href={getDashboardHref()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white text-sm font-semibold shadow border border-emerald-500/30"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-300" />
                  <span>Open {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-xl text-center text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-rose-900/40"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-semibold rounded-xl border border-emerald-900/40 text-slate-300 hover:bg-[#14231e]"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center text-xs font-semibold rounded-xl bg-emerald-800 text-white shadow border border-emerald-500/30"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
