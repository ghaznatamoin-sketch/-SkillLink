'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getServiceBySlug } from '@/data/categories';
import { useMarketplace } from '@/context/MarketplaceContext';
import { ProviderCard } from '@/components/providers/ProviderCard';
import { CategoryIcon } from '@/components/categories/CategoryIcon';
import { ArrowLeft, ChevronRight, ShieldCheck, Tag, Clock, Users } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceSlug = params.serviceSlug as string;
  const result = getServiceBySlug(serviceSlug);
  const { providers } = useMarketplace();

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Service not found</h2>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </Link>
      </div>
    );
  }

  const { service, category } = result;

  // Matching providers for this service
  const matchingProviders = providers.filter((p) =>
    p.servicesOffered.some(
      (s) =>
        s.serviceId.includes(service.slug) ||
        s.serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(service.slug)
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/categories" className="hover:text-emerald-700">Categories</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href={`/categories/${category.slug}`} className="hover:text-emerald-700">{category.name}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">{service.name}</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-emerald-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <CategoryIcon name={service.iconName || 'Tool'} className="w-4 h-4" />
            <span>{category.name} Sector</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {service.name} Specialists
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {service.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-emerald-400" />
              <span>Starting from <strong>${service.startingPrice}</strong>/{service.priceUnit}</span>
            </div>
            {service.estimatedDuration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Est: {service.estimatedDuration}</span>
              </div>
            )}
          </div>
        </div>

        <Link
          href={`/providers?service=${service.slug}`}
          className="px-5 py-3 rounded-xl bg-white text-emerald-950 font-bold text-xs shadow-md hover:bg-emerald-50 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Users className="w-4 h-4 text-emerald-700" />
          <span>Filter in Search</span>
        </Link>
      </div>

      {/* Providers for this service */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Available {service.name} Providers ({matchingProviders.length})
        </h3>

        {matchingProviders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-800 text-sm">No specific pro assigned to this demo filter</h4>
            <p className="text-xs text-slate-500">You can view all verified pros across all sectors in the provider directory.</p>
            <Link
              href="/providers"
              className="inline-block mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
            >
              Browse All Providers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                selectedServiceSlug={service.slug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
