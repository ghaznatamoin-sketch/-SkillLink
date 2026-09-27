'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getCategoryBySlug, CATEGORIES_DATA } from '@/data/categories';
import { CategoryIcon } from '@/components/categories/CategoryIcon';
import { ServiceItemCard } from '@/components/categories/ServiceItem';
import { ArrowLeft, ChevronRight, Layers, ShieldCheck } from 'lucide-react';

export default function CategoryDetailPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Sector not found</h2>
        <p className="text-sm text-slate-400">The requested service sector does not exist.</p>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white text-xs font-semibold border border-emerald-500/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Sectors</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <Link href="/" className="hover:text-amber-300">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href="/categories" className="hover:text-amber-300">Sectors</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-100 font-bold">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0d1e16] to-[#081510] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-amber-300 text-xs font-semibold border border-amber-400/40">
            <CategoryIcon name={category.iconName} className="w-4 h-4" />
            <span>Sector Overview · {category.services.length} Specialized Services</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {category.description}
          </p>
        </div>

        <Link
          href={`/providers?category=${category.slug}`}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs shadow-lg border border-emerald-400/40 transition-all flex items-center gap-2 flex-shrink-0 hover:scale-105"
        >
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>Browse All {category.name} Pros</span>
        </Link>
      </div>

      {/* Services Grid in PAIRS (2 cards per row) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100">
          Select a Service in {category.name}
        </h3>
        <p className="text-xs text-slate-400">
          Click any individual service to browse rated specialists ready to book. Arranged in balanced pairs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
          {category.services.map((service) => (
            <ServiceItemCard
              key={service.id}
              service={service}
              categoryName={category.name}
              categorySlug={category.slug}
              categoryAccentHex={category.accentHex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
