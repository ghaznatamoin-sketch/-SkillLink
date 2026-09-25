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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm mb-6 space-y-4">
      {/* Search and Primary Filters Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search provider name, skills, title, or service..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Select (Desktop) */}
        <div className="hidden md:block w-48 flex-shrink-0">
          <select
            value={filters.categorySlug}
            onChange={handleCategoryChange}
            aria-label="Filter by Category"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
          >
            <option value="">All Categories (10)</option>
            {CATEGORIES_DATA.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Specific Service Select (Desktop) */}
        {selectedCategory && (
          <div className="hidden md:block w-48 flex-shrink-0">
            <select
              value={filters.serviceSlug}
              onChange={handleServiceChange}
              aria-label="Filter by Specific Service"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
            >
              <option value="">All {selectedCategory.name} Services</option>
              {selectedCategory.services.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Mobile Filter Drawer Button */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="md:hidden flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
          <span>Filters {activeChipsCount > 0 && `(${activeChipsCount})`}</span>
        </button>
      </div>

      {/* Filter Row: Rating, Verified, and Clear actions */}
      <div className="hidden md:flex items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-500">Quick Filters:</span>

          {/* Verified Toggle */}
          <button
            onClick={() => onFilterChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all font-medium ${
              filters.verifiedOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Pros Only</span>
          </button>

          {/* Minimum 4.5+ Rating */}
          <button
            onClick={() => onFilterChange({ ...filters, minRating: filters.minRating === 4.5 ? 0 : 4.5 })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all font-medium ${
              filters.minRating >= 4.5
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Top Rated (4.5★+)</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-medium">
            Showing <strong className="text-slate-800 font-bold">{totalResults}</strong> providers
          </span>

          {activeChipsCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline"
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
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              Category: {selectedCategory?.name || filters.categorySlug}
              <button
                onClick={() => onFilterChange({ ...filters, categorySlug: '', serviceSlug: '' })}
                className="hover:text-emerald-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.serviceSlug && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              Service: {filters.serviceSlug.replace('-', ' ')}
              <button
                onClick={() => onFilterChange({ ...filters, serviceSlug: '' })}
                className="hover:text-emerald-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.verifiedOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              Verified
              <button
                onClick={() => onFilterChange({ ...filters, verifiedOnly: false })}
                className="hover:text-emerald-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
              ★ {filters.minRating}+
              <button
                onClick={() => onFilterChange({ ...filters, minRating: 0 })}
                className="hover:text-amber-950"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end md:hidden animate-fadeIn">
          <div className="bg-white rounded-t-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Filter Providers</h3>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={filters.categorySlug}
                onChange={handleCategoryChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              >
                <option value="">All Categories</option>
                {CATEGORIES_DATA.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service</label>
                <select
                  value={filters.serviceSlug}
                  onChange={handleServiceChange}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
                >
                  <option value="">All {selectedCategory.name} Services</option>
                  {selectedCategory.services.map((s) => (
                    <option key={s.id} value={s.slug}>
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
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs font-semibold text-slate-700">Verified Providers Only</span>
              </label>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                onClick={onResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
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
