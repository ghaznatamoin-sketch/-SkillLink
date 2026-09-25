'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useMarketplace } from '@/context/MarketplaceContext';
import { RatingStars } from '@/components/common/RatingStars';
import { ProviderReviewCard } from '@/components/providers/ProviderReviewCard';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  Star,
  CheckCircle2,
  Calendar,
  Languages,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Phone,
  MessageSquare,
  Sparkles,
  Tag,
} from 'lucide-react';

export default function ProviderProfilePage() {
  const params = useParams();
  const providerId = params.providerId as string;
  const { getProviderById, getReviewsByProviderId } = useMarketplace();

  const provider = getProviderById(providerId);
  const reviews = getReviewsByProviderId(providerId);

  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Provider not found</h2>
        <p className="text-sm text-slate-500">The requested service professional profile could not be located.</p>
        <Link
          href="/providers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Providers</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 pb-24 md:pb-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-emerald-700">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/providers" className="hover:text-emerald-700">Providers</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold">{provider.name}</span>
      </nav>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-md">
                <Image
                  src={provider.avatarUrl}
                  alt={provider.name}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              {provider.isAvailable && (
                <span
                  className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-200"
                  title="Available for immediate requests"
                />
              )}
            </div>

            {/* Provider Meta */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {provider.name}
                </h1>

                {provider.isVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Pro
                  </span>
                )}

                {provider.badge && (
                  <span className="text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                    {provider.badge}
                  </span>
                )}
              </div>

              <p className="text-sm font-medium text-slate-600">
                {provider.title}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={provider.rating} reviewCount={provider.reviewCount} size="md" />
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{provider.location.city}, {provider.location.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{provider.completedJobsCount} Completed Jobs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA Box (Desktop) */}
          <div className="hidden lg:flex flex-col items-end gap-3 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 min-w-56">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block text-right">Standard Rate</span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-2xl font-extrabold text-slate-900">${provider.hourlyRate}</span>
                <span className="text-xs text-slate-400 font-medium">USD / hr</span>
              </div>
            </div>

            <Link
              href={`/book/${provider.id}`}
              className="w-full py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 text-center transition-all hover:scale-105 flex items-center justify-center gap-1.5"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: About, Services Offered, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900">About the Specialist</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {provider.bio}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Experience</span>
                <strong className="text-slate-800 font-bold">{provider.experienceYears} Years</strong>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Response Time</span>
                <strong className="text-emerald-700 font-bold">{provider.responseTime}</strong>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Languages</span>
                <strong className="text-slate-800 font-bold">{provider.languages.join(', ')}</strong>
              </div>
            </div>
          </div>

          {/* Services Offered List */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Services Offered & Pricing
            </h3>

            <div className="divide-y divide-slate-100">
              {provider.servicesOffered.map((srv) => (
                <div key={srv.serviceId} className="py-3.5 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {srv.serviceName}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium block">
                      Category: {srv.categoryName}
                    </span>
                    {srv.description && (
                      <p className="text-xs text-slate-500 mt-1">{srv.description}</p>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="font-extrabold text-slate-900 text-sm">
                      ${srv.price}
                    </span>
                    <span className="text-xs text-slate-400 block font-medium">
                      /{srv.priceUnit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Specialties */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-slate-900">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {provider.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Verified Reviews ({reviews.length})
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{provider.rating.toFixed(2)} Overall Rating</span>
              </div>
            </div>

            {reviews.length === 0 ? (
              <p className="text-xs text-slate-400 p-6 bg-white rounded-2xl border border-slate-200 text-center">
                No reviews yet for this professional.
              </p>
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <ProviderReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Availability, Service Area & Fast Book */}
        <div className="space-y-6">
          {/* Availability Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Availability & Working Hours</span>
            </h4>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
              <span className="font-semibold text-slate-700 block">Weekly Schedule:</span>
              <p className="text-slate-600">{provider.availabilitySchedule}</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Instant Confirmation Enabled</span>
            </div>
          </div>

          {/* Service Area Coverage */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Service Area & Neighborhoods</span>
            </h4>

            <p className="text-xs text-slate-500">
              Serving within a <strong>{provider.location.serviceRadiusKm} km radius</strong> around {provider.location.city}:
            </p>

            <div className="flex flex-wrap gap-1.5">
              {provider.location.neighborhoods.map((n, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Book Action Widget */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 shadow-lg border border-emerald-500/20 space-y-4">
            <h4 className="text-sm font-bold">Ready to schedule service?</h4>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Submit your preferred date and time. No upfront hidden fee.
            </p>

            <Link
              href={`/book/${provider.id}`}
              className="w-full py-3 rounded-xl bg-white text-emerald-950 text-xs font-bold shadow-md hover:bg-emerald-50 text-center transition-all flex items-center justify-center gap-2"
            >
              <span>Book {provider.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Booking Footer Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-medium block">Starting from</span>
          <span className="text-base font-extrabold text-slate-900">${provider.hourlyRate}</span>
          <span className="text-xs text-slate-400 font-medium">/hr</span>
        </div>

        <Link
          href={`/book/${provider.id}`}
          className="py-2.5 px-6 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
        >
          <span>Request / Book</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
