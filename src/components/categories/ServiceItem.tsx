'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceItem } from '@/types/category';
import { CategoryIcon } from '@/components/categories/CategoryIcon';
import { CardGlow } from '@/components/common/CardGlow';
import { ArrowRight, Clock, Tag } from 'lucide-react';

interface ServiceItemCardProps {
  service: ServiceItem;
  categoryName?: string;
  categorySlug?: string;
  categoryAccentHex?: string;
}

export const ServiceItemCard: React.FC<ServiceItemCardProps> = ({
  service,
  categoryName,
  categoryAccentHex = '#10b981',
}) => {
  return (
    <Link href={`/providers?service=${service.slug}`} className="group block h-full">
      <CardGlow
        glowColor="rgba(16, 185, 129, 0.18)"
        className="h-full bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-5 shadow-lg shadow-black/40 hover:border-amber-400/40 hover:bg-[#121f1a] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-950 to-[#07130e] border border-emerald-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-all">
              <CategoryIcon name={service.iconName || 'Tool'} className="w-5 h-5" />
            </div>

            {service.popular && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/80 border border-amber-400/40 px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-1">
            {service.name}
          </h4>

          {categoryName && (
            <p className="text-[11px] text-emerald-400 font-medium mb-2">
              {categoryName}
            </p>
          )}

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {service.description}
          </p>
        </div>

        <div>
          {/* Price and Estimated Duration */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-emerald-900/30 mb-3">
            <div className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-100">
                From ${service.startingPrice}
              </span>
              <span className="text-slate-400">/{service.priceUnit}</span>
            </div>

            {service.estimatedDuration && (
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{service.estimatedDuration}</span>
              </div>
            )}
          </div>

          <div className="w-full py-2 rounded-xl bg-[#14231e] group-hover:bg-gradient-to-r group-hover:from-emerald-800 group-hover:to-emerald-700 text-slate-300 group-hover:text-white border border-emerald-900/40 group-hover:border-emerald-500/30 text-xs font-semibold text-center transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md">
            <span>Find Providers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </CardGlow>
    </Link>
  );
};
