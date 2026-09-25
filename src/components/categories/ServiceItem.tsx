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
        glowColor="rgba(16, 185, 129, 0.15)"
        className="h-full bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-all">
              <CategoryIcon name={service.iconName || 'Tool'} className="w-5 h-5" />
            </div>

            {service.popular && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1">
            {service.name}
          </h4>

          {categoryName && (
            <p className="text-[11px] text-slate-400 font-medium mb-2">
              {categoryName}
            </p>
          )}

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {service.description}
          </p>
        </div>

        <div>
          {/* Price and Estimated Duration */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 mb-3">
            <div className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-slate-800">
                From ${service.startingPrice}
              </span>
              <span className="text-slate-400">/{service.priceUnit}</span>
            </div>

            {service.estimatedDuration && (
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{service.estimatedDuration}</span>
              </div>
            )}
          </div>

          <div className="w-full py-2 rounded-xl bg-slate-50 group-hover:bg-emerald-600 text-slate-700 group-hover:text-white text-xs font-semibold text-center transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs">
            <span>Find Providers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </CardGlow>
    </Link>
  );
};
