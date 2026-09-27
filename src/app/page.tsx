'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CATEGORIES_DATA } from '@/data/categories';
import { INITIAL_PROVIDERS_DATA } from '@/data/providers';
import { CategoryGrid } from '@/components/categories/CategoryGrid';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { HeroNetworkVisual } from '@/components/common/HeroNetworkVisual';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  Users,
  Briefcase,
  Layers,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append('q', searchQuery.trim());
    if (selectedCategorySlug) params.append('category', selectedCategorySlug);
    router.push(`/providers?${params.toString()}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#06140e] via-[#080d0b] to-[#080d0b] border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Col: Messaging & Search */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-lg shadow-black/40">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Worldwide Marketplace · 12 Verified Service Sectors</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.15]">
                Hire trusted pros for{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                  home, repair, wellness & events
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Connect directly with verified electricians, AC technicians, plumbers, fitness trainers, event planners, and specialized craftsmen worldwide. Transparent pricing and real ratings.
              </p>

              {/* Hero Search Box */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-[#0e1714]/90 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-emerald-500/30 shadow-2xl shadow-black/60 flex flex-col sm:flex-row items-center gap-2 max-w-2xl"
              >
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="What service do you need? (e.g. AC Repair, Personal Trainer, Plumber)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none bg-transparent"
                  />
                </div>

                <div className="w-full sm:w-48 flex-shrink-0 border-t sm:border-t-0 sm:border-l border-emerald-900/40 pt-2 sm:pt-0 sm:pl-2">
                  <select
                    value={selectedCategorySlug}
                    onChange={(e) => setSelectedCategorySlug(e.target.value)}
                    className="w-full py-2 px-2 text-xs text-slate-200 focus:outline-none bg-[#0e1714] font-medium rounded-lg"
                  >
                    <option value="" className="bg-[#0e1714]">All 12 Sectors</option>
                    {CATEGORIES_DATA.map((cat) => (
                      <option key={cat.id} value={cat.slug} className="bg-[#0e1714]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-950/50 border border-emerald-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 flex-shrink-0"
                >
                  <span>Search Pros</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </form>

              {/* Popular Quick Search Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
                <span className="font-semibold text-slate-300">Popular:</span>
                {[
                  { label: 'AC Technician', slug: 'ac-technician' },
                  { label: 'Electrician', slug: 'electrician' },
                  { label: 'Personal Trainer', slug: 'personal-trainer' },
                  { label: 'Event Planner', slug: 'event-planner' },
                  { label: 'Deep Cleaning', slug: 'deep-cleaning' },
                  { label: 'Plumber', slug: 'plumber' },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/providers?service=${item.slug}`}
                    className="px-2.5 py-1 rounded-lg bg-[#111c17] border border-emerald-900/40 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 transition-colors font-medium text-[11px]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Col: Hero Interactive Visual */}
            <div className="lg:col-span-5">
              <HeroNetworkVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR / ALL CATEGORIES SECTION (PAIRS: 2 cards per row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Explore Sectors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              All 12 Core Service Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Every sector contains distinct, selectable individual services with verified specialists. Arranged in balanced pairs.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Full Service Catalog (79 Services)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 12 Categories Grid in balanced PAIRS (2 cards per row = 6 rows) */}
        <CategoryGrid categories={CATEGORIES_DATA} columns={2} />
      </section>

      {/* 3. HOW SKILLLINK WORKS (Arranged in PAIRS: 2 cards per row) */}
      <section className="bg-[#050907] border-y border-emerald-900/30 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Simple & Reliable Flow
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mt-1">
              How SkillLink Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From discovery to completed service in four transparent steps.
            </p>
          </div>

          {/* 4 Steps arranged in balanced PAIRS (2x2 grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                step: '01',
                title: 'Choose Service',
                desc: 'Browse our categorized directory of 79 specialized services across 12 sectors with clear starting pricing.',
                icon: Layers,
              },
              {
                step: '02',
                title: 'Compare Verified Pros',
                desc: 'Review verified qualifications, star ratings, service areas, and real customer feedback.',
                icon: ShieldCheck,
              },
              {
                step: '03',
                title: 'Book Appointment',
                desc: 'Pick your preferred date and time. Worker receives instant request to accept and confirm.',
                icon: Clock,
              },
              {
                step: '04',
                title: 'Service & Review',
                desc: 'Track live progress from accepted to completed. Transparent revenue split and verified reviews.',
                icon: Star,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0e1714]/85 border border-emerald-500/20 backdrop-blur-md relative hover:border-amber-400/40 transition-all duration-300 shadow-xl shadow-black/40"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-950 to-[#07130e] text-amber-400 flex items-center justify-center border border-emerald-500/30 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-extrabold text-emerald-500/30">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED VERIFIED PROVIDERS (Arranged in PAIRS: 2 cards per row) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top Rated Pros</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Featured Specialists Worldwide
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Certified professionals with proven track records and top customer ratings.
            </p>
          </div>

          <Link
            href="/providers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Providers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Providers Grid in balanced PAIRS (2 cards per row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_PROVIDERS_DATA.slice(0, 6).map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0d1e16] to-[#081510] text-white p-8 sm:p-12 shadow-2xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100">
              Are you a skilled technician or professional?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join SkillLink worldwide across 12 core service sectors. Build your digital reputation, set your own service area and rates, and receive high-intent booking requests.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/auth/register"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-xs sm:text-sm text-center shadow-lg border border-emerald-400/40 transition-all hover:scale-105"
            >
              Join as Professional Pro
            </Link>
            <Link
              href="/worker"
              className="px-6 py-3.5 rounded-2xl bg-[#080d0b] border border-amber-400/40 text-amber-300 font-bold text-xs sm:text-sm text-center hover:bg-[#121f19] transition-all"
            >
              Provider Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
