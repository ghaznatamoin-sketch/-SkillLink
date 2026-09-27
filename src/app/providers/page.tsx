'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMarketplace } from '@/context/MarketplaceContext';
import { CATEGORIES_DATA } from '@/data/categories';
import { ProviderCard } from '@/components/providers/ProviderCard';
import {
  ProviderFilterBar,
  FilterState,
} from '@/components/providers/ProviderFilterBar';
import { EmptyState } from '@/components/common/EmptyState';
import { Users, Filter, Sparkles } from 'lucide-react';

function ProvidersContent() {
  const searchParams = useSearchParams();
  const { providers } = useMarketplace();

  const initialCategory = searchParams.get('category') || '';
  const initialService = searchParams.get('service') || '';
  const initialQuery = searchParams.get('q') || '';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialQuery,
    categorySlug: initialCategory,
    serviceSlug: initialService,
    country: '',
    minRating: 0,
    maxPrice: 500,
    verifiedOnly: false,
  });

  // Sync when searchParams change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categorySlug: searchParams.get('category') || prev.categorySlug,
      serviceSlug: searchParams.get('service') || prev.serviceSlug,
      searchQuery: searchParams.get('q') || prev.searchQuery,
    }));
  }, [searchParams]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      categorySlug: '',
      serviceSlug: '',
      country: '',
      minRating: 0,
      maxPrice: 500,
      verifiedOnly: false,
    });
  };

  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // 1. Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesSkills = p.skills.some((s) => s.toLowerCase().includes(q));
        const matchesCity = p.location.city.toLowerCase().includes(q);
        const matchesCountry = p.location.country.toLowerCase().includes(q);
        const matchesService = p.servicesOffered.some((s) =>
          s.serviceName.toLowerCase().includes(q)
        );

        if (!matchesName && !matchesTitle && !matchesSkills && !matchesCity && !matchesCountry && !matchesService) {
          return false;
        }
      }

      // 2. Category
      if (filters.categorySlug) {
        const cat = CATEGORIES_DATA.find((c) => c.slug === filters.categorySlug);
        if (cat) {
          const hasCategory = p.servicesOffered.some((s) => s.categoryId === cat.id);
          if (!hasCategory) return false;
        }
      }

      // 3. Service
      if (filters.serviceSlug) {
        const hasService = p.servicesOffered.some(
          (s) =>
            s.serviceId.toLowerCase().includes(filters.serviceSlug.toLowerCase()) ||
            s.serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(filters.serviceSlug.toLowerCase())
        );
        if (!hasService) return false;
      }

      // 4. Rating
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      // 5. Verified
      if (filters.verifiedOnly && !p.isVerified) {
        return false;
      }

      return true;
    });
  }, [providers, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>Worldwide Service Professionals</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Find & Book Verified Service Providers
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Compare customer ratings, service areas, hourly rates, and verified credentials across all 12 service sectors. Arranged in balanced pairs.
        </p>
      </div>

      {/* Filter Bar */}
      <ProviderFilterBar
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={handleResetFilters}
        totalResults={filteredProviders.length}
      />

      {/* Results Grid or Empty State in PAIRS (2 cards per row) */}
      {filteredProviders.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No providers found"
          description="We couldn't find any service professionals matching your active filter criteria. Try resetting filters or searching for another term."
          actionLabel="Reset All Filters"
          onActionClick={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              selectedServiceSlug={filters.serviceSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProvidersPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-sm text-slate-500">Loading providers...</div>}>
      <ProvidersContent />
    </Suspense>
  );
}
