'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES_DATA } from '@/data/categories';
import { CategoryIcon } from '@/components/categories/CategoryIcon';
import { ServiceItemCard } from '@/components/categories/ServiceItem';
import { CardGlow } from '@/components/common/CardGlow';
import { Search, Layers, ArrowRight, Sparkles, Filter } from 'lucide-react';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Filter categories and their internal services
  const filteredCategories = CATEGORIES_DATA.filter((cat) => {
    if (selectedCategoryFilter !== 'all' && cat.slug !== selectedCategoryFilter) {
      return false;
    }
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const matchesCatName = cat.name.toLowerCase().includes(query);
    const matchesServiceName = cat.services.some((s) =>
      s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)
    );
    return matchesCatName || matchesServiceName;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Complete Marketplace Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            All 10 Categories & 71 Specialized Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Every service is independently selectable. Click on any specific service to find and book available specialists immediately.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search specific service (e.g. Plumber, CCTV)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
          />
        </div>
      </div>

      {/* Quick Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategoryFilter === 'all'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Categories (10)
        </button>

        {CATEGORIES_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryFilter(cat.slug)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategoryFilter === cat.slug
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <CategoryIcon name={cat.iconName} className="w-3.5 h-3.5" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Render Categorized Groups */}
      <div className="space-y-12">
        {filteredCategories.map((category) => {
          // If searching, also filter services inside category
          const visibleServices = category.services.filter((s) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
          });

          if (visibleServices.length === 0) return null;

          return (
            <div key={category.id} className="space-y-4">
              {/* Category Group Header */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
                    <CategoryIcon name={category.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {category.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      {visibleServices.length} {visibleServices.length === 1 ? 'service' : 'services'} available
                    </p>
                  </div>
                </div>

                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Category Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Individual Services Grid (Grouped 2 to 4 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {visibleServices.map((service) => (
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
          );
        })}
      </div>
    </div>
  );
}
