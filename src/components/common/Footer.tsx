'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Globe, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { CATEGORIES_DATA } from '@/data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-emerald-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Marketplace Trust Badges Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Vetted & Verified Providers</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Every service professional passes identity checks and background verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Worldwide Coverage</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Connecting customers and certified workers in over 40+ countries and major metropolitan areas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Transparent Fair Pricing</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                No hidden costs. Clear pricing breakdown between customer payment, worker earnings, and platform commission.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4 text-mint-300" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Skill<span className="text-emerald-400">Link</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              SkillLink is a worldwide marketplace connecting homeowners and businesses with vetted tradespeople, technicians, and specialized professionals.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>MVP Release 1.0 — 10 Defined Categories</span>
            </div>
          </div>

          {/* Categories Col 1 */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Popular Categories</h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_DATA.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Col 2 */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">More Categories</h5>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_DATA.slice(5, 10).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Roles */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Portals</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/customer" className="hover:text-emerald-400 transition-colors">
                  Customer Hub
                </Link>
              </li>
              <li>
                <Link href="/worker" className="hover:text-emerald-400 transition-colors">
                  Worker Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors">
                  Platform Admin
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-emerald-400 transition-colors">
                  Join as Professional
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SkillLink. Built for academic and product verification.</p>
          <div className="flex items-center gap-6">
            <span>Next.js 15 · React · TypeScript · Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
