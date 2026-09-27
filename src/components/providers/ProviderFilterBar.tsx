'use client';

import React, { useState } from 'react';
import { CATEGORIES_DATA } from '@/data/categories';
import { Search, SlidersHorizontal, X, Check, ShieldCheck, Star } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  categorySlug: string;
  serviceSlug: string;
  country: string;
  minRating: number;
  maxPrice: number;
  verifiedOnly: boolean;
}

interface ProviderFilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const ProviderFilterBar: React.FC<ProviderFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const selectedCategory = CATEGORIES_DATA.find((c) => c.slug === filters.categorySlug);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      ...filters,
      categorySlug: e.target.value,
      serviceSlug: '', // Reset sub-service when category changes
    });
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, serviceSlug: e.target.value });
  };

  const activeChipsCount = [
    filters.categorySlug ? 1 : 0,
    filters.serviceSlug ? 1 : 0,
    filters.country ? 1 : 0,
    filters.minRating > 0 ? 1 : 0,
    filters.verifiedOnly ? 1 : 0,
    filters.searchQuery ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-4 shadow-xl shadow-black/40 mb-6 space-y-4">
      {/* Search and Primary Filters Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search provider name, skills, title, or service..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-amber-400/50 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Select (Desktop) */}
        <div className="hidden md:block w-52 flex-shrink-0">
          <select
            value={filters.categorySlug}
            onChange={handleCategoryChange}
            aria-label="Filter by Category"
            className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <option value="">All 12 Sectors</option>
            {CATEGORIES_DATA.map((c) => (
              <option key={c.id} value={c.slug} className="bg-[#0e1714] text-slate-200">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Specific Service Select (Desktop) */}
        {selectedCategory && (
          <div className="hidden md:block w-52 flex-shrink-0">
            <select
              value={filters.serviceSlug}
              onChange={handleServiceChange}
              aria-label="Filter by Specific Service"
              className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="">All {selectedCategory.name} Services</option>
              {selectedCategory.services.map((s) => (
                <option key={s.id} value={s.slug} className="bg-[#0e1714] text-slate-200">
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Mobile Filter Drawer Button */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="md:hidden flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs font-semibold text-slate-200 hover:bg-[#192b23]"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          <span>Filters {activeChipsCount > 0 && `(${activeChipsCount})`}</span>
        </button>
      </div>

      {/* Filter Row: Rating, Verified, and Clear actions */}
      <div className="hidden md:flex items-center justify-between gap-4 pt-2 border-t border-emerald-900/30 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-400">Quick Filters:</span>

          {/* Verified Toggle */}
          <button
            onClick={() => onFilterChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all font-medium ${
              filters.verifiedOnly
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                : 'text-slate-300 border-emerald-900/40 bg-[#121f19] hover:bg-[#192b23]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Pros Only</span>
          </button>

          {/* Minimum 4.5+ Rating */}
          <button
            onClick={() => onFilterChange({ ...filters, minRating: filters.minRating === 4.5 ? 0 : 4.5 })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all font-medium ${
              filters.minRating >= 4.5
                ? 'bg-amber-950/80 text-amber-300 border-amber-400/40'
                : 'text-slate-300 border-emerald-900/40 bg-[#121f19] hover:bg-[#192b23]'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Top Rated (4.5★+)</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium">
            Showing <strong className="text-slate-100 font-bold">{totalResults}</strong> providers
          </span>

          {activeChipsCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold hover:underline"
            >
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Applied Filter Chips */}
      {activeChipsCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Active filters:</span>

          {filters.categorySlug && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              Category: {selectedCategory?.name || filters.categorySlug}
              <button
                onClick={() => onFilterChange({ ...filters, categorySlug: '', serviceSlug: '' })}
                className="hover:text-amber-300"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.serviceSlug && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              Service: {filters.serviceSlug.replace('-', ' ')}
              <button
                onClick={() => onFilterChange({ ...filters, serviceSlug: '' })}
                className="hover:text-amber-300"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.verifiedOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              Verified
              <button
                onClick={() => onFilterChange({ ...filters, verifiedOnly: false })}
                className="hover:text-amber-300"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-400/40 text-xs font-semibold">
              ★ {filters.minRating}+
              <button
                onClick={() => onFilterChange({ ...filters, minRating: 0 })}
                className="hover:text-amber-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end md:hidden animate-fadeIn">
          <div className="bg-[#0c1411] border-t border-emerald-900/40 rounded-t-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40">
              <h3 className="font-bold text-slate-100 text-base">Filter Providers</h3>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
              <select
                value={filters.categorySlug}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-sm text-slate-200"
              >
                <option value="">All Categories</option>
                {CATEGORIES_DATA.map((c) => (
                  <option key={c.id} value={c.slug} className="bg-[#0e1714]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Service</label>
                <select
                  value={filters.serviceSlug}
                  onChange={handleServiceChange}
                  className="w-full px-3 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-sm text-slate-200"
                >
                  <option value="">All {selectedCategory.name} Services</option>
                  {selectedCategory.services.map((s) => (
                    <option key={s.id} value={s.slug} className="bg-[#0e1714]">
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) =>
                    onFilterChange({ ...filters, verifiedOnly: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-[#121f19] border-emerald-900/40"
                />
                <span className="text-xs font-semibold text-slate-300">Verified Providers Only</span>
              </label>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={onResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-emerald-900/40 text-xs font-semibold text-slate-300 hover:bg-[#121f19]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white text-xs font-semibold shadow border border-emerald-500/30"
              >
                Show {totalResults} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
