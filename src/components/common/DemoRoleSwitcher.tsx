'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/user';
import { ShieldCheck, UserCheck, Wrench, Eye, ArrowRight } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, switchRole, user } = useAuth();

  const roles: { key: UserRole; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { key: 'customer', label: 'Customer View', icon: UserCheck, desc: 'Amara Bello (Lagos)' },
    { key: 'worker', label: 'Worker View', icon: Wrench, desc: 'Rafael Costa (São Paulo)' },
    { key: 'admin', label: 'Admin View', icon: ShieldCheck, desc: 'Meera Nair (Platform Admin)' },
    { key: 'guest', label: 'Guest / Public', icon: Eye, desc: 'Logged Out' },
  ];

  return (
    <div className="bg-[#050907] border-b border-emerald-900/30 text-xs text-slate-300 py-1.5 px-4 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 font-medium border border-emerald-500/30 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            MVP Interactive Platform
          </span>
          <span className="hidden sm:inline text-slate-400">
            Simulate roles:
          </span>
        </div>

        {/* Role Toggle Buttons */}
        <div className="flex items-center gap-1 bg-[#0d1612] p-0.5 rounded-lg border border-emerald-900/40">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = role === r.key;
            return (
              <button
                key={r.key}
                onClick={() => switchRole(r.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-amber-300 shadow-sm border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#15231c]'
                }`}
                title={r.desc}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{r.label}</span>
                <span className="md:hidden">{r.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Role Quick Navigation Link */}
        <div className="hidden lg:flex items-center gap-3 text-slate-400">
          {role === 'customer' && (
            <Link
              href="/customer"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Customer Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          {role === 'worker' && (
            <Link
              href="/worker"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Worker Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          {role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Admin Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
