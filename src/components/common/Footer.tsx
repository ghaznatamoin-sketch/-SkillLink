'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Globe, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050907] text-slate-400 text-sm border-t border-emerald-900/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marketplace Trust Badges Banner - Arranged in pairs / 4 balanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 border-b border-emerald-900/30">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0c1411]/80 border border-emerald-500/15">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm">Vetted & Verified Providers</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every service professional passes identity checks and background verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0c1411]/80 border border-emerald-500/15">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm">Worldwide Coverage</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Connecting customers and certified workers in over 40+ countries and major hubs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0c1411]/80 border border-emerald-500/15">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm">Transparent Fair Pricing</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Clear price breakdown between customer payment, worker earnings, and fee.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#0c1411]/80 border border-emerald-500/15">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-100 text-sm">Guaranteed Quality</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Real customer ratings and reviews back every booking across 12 core sectors.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-700 via-emerald-900 to-[#041a12] flex items-center justify-center text-white font-bold border border-amber-500/30 shadow-md shadow-emerald-950/60">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-xl font-bold text-slate-100 tracking-tight">
                Skill<span className="text-emerald-400">Link</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              SkillLink is a worldwide marketplace connecting homeowners and businesses with vetted tradespeople, technicians, and specialized professionals across 12 core service sectors.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>12 Core Service Sectors · 79 Specialized Services</span>
            </div>
          </div>

          {/* Categories Col 1 */}
          <div>
            <h5 className="font-semibold text-slate-100 text-xs uppercase tracking-wider mb-3">Service Sectors</h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_DATA.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-emerald-300 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Col 2 */}
          <div>
            <h5 className="font-semibold text-slate-100 text-xs uppercase tracking-wider mb-3">More Sectors</h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_DATA.slice(6, 12).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-emerald-300 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Roles */}
          <div>
            <h5 className="font-semibold text-slate-100 text-xs uppercase tracking-wider mb-3">Portals</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/customer" className="hover:text-emerald-300 transition-colors">
                  Customer Hub
                </Link>
              </li>
              <li>
                <Link href="/worker" className="hover:text-emerald-300 transition-colors">
                  Worker Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-300 transition-colors">
                  Platform Admin
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-amber-400 transition-colors">
                  Join as Professional
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkillLink. Worldwide On-Demand Services Marketplace.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Next.js 15 · Supabase PostgreSQL · Dark Business Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
