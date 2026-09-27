'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Provider } from '@/types/provider';
import { CardGlow } from '@/components/common/CardGlow';
import { RatingStars } from '@/components/common/RatingStars';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  selectedServiceSlug?: string;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  selectedServiceSlug,
}) => {
  return (
    <CardGlow
      glowColor="rgba(16, 185, 129, 0.18)"
      className="bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-5 shadow-xl shadow-black/40 hover:border-amber-400/50 hover:bg-[#121f1a] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Avatar, Details & Verification */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#16241e] border-2 border-emerald-500/30 shadow-md">
              <Image
                src={provider.avatarUrl}
                alt={provider.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            {provider.isAvailable && (
              <span
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0e1714]"
                title="Available for booking"
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={`/providers/${provider.id}`}
                className="font-bold text-slate-100 text-sm hover:text-amber-300 transition-colors truncate"
              >
                {provider.name}
              </Link>

              {provider.isVerified && (
                <span
                  className="inline-flex items-center text-amber-400"
                  title="Verified Professional"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                </span>
              )}

              {provider.badge && (
                <span className="text-[10px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded-md">
                  {provider.badge}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 truncate font-medium mt-0.5">
              {provider.title}
            </p>

            <div className="mt-1">
              <RatingStars
                rating={provider.rating}
                reviewCount={provider.reviewCount}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Location & Experience meta row */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-[#121f19] p-2.5 rounded-xl border border-emerald-900/40 mb-3.5">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">
              {provider.location.city}, {provider.location.country}
            </span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Briefcase className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>{provider.experienceYears}y exp · {provider.completedJobsCount} jobs</span>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {provider.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30"
            >
              {skill}
            </span>
          ))}
          {provider.skills.length > 3 && (
            <span className="text-[10px] text-slate-400 px-1 py-0.5 font-medium">
              +{provider.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Pricing and Action Buttons */}
      <div className="pt-3 border-t border-emerald-900/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Starting rate</span>
            <span className="text-sm font-extrabold text-slate-100">
              ${provider.hourlyRate}
            </span>
            <span className="text-xs text-slate-400 font-medium">/hr</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-medium block">Response time</span>
            <span className="text-xs font-semibold text-emerald-400">
              {provider.responseTime}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/providers/${provider.id}`}
            className="py-2 text-center text-xs font-semibold rounded-xl border border-emerald-900/40 bg-[#121f19] text-slate-300 hover:bg-[#192b23] hover:text-white transition-colors"
          >
            View Profile
          </Link>

          <Link
            href={`/book/${provider.id}${selectedServiceSlug ? `?service=${selectedServiceSlug}` : ''}`}
            className="py-2 text-center text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-md border border-emerald-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-1"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3 h-3 text-amber-300" />
          </Link>
        </div>
      </div>
    </CardGlow>
  );
};
