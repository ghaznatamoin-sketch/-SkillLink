'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '@/types/category';
import { CardGlow } from '@/components/common/CardGlow';
import { CategoryIcon } from '@/components/categories/CategoryIcon';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  compact?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, compact = false }) => {
  // Glow tint maps according to design system (subtle, low saturation)
  const glowStyles: Record<string, string> = {
    cyan: 'rgba(6, 182, 212, 0.18)',
    amber: 'rgba(245, 158, 11, 0.18)',
    purple: 'rgba(139, 92, 246, 0.18)',
    emerald: 'rgba(16, 185, 129, 0.18)',
    sky: 'rgba(2, 132, 199, 0.18)',
    rose: 'rgba(244, 63, 94, 0.18)',
    pink: 'rgba(236, 72, 153, 0.18)',
    indigo: 'rgba(99, 102, 241, 0.18)',
    teal: 'rgba(20, 184, 166, 0.18)',
    blue: 'rgba(59, 130, 246, 0.18)',
    violet: 'rgba(139, 92, 246, 0.18)',
    fuchsia: 'rgba(217, 70, 239, 0.18)',
    lime: 'rgba(132, 204, 22, 0.18)',
    orange: 'rgba(249, 115, 22, 0.18)',
  };

  const accentBg: Record<string, string> = {
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200/80 group-hover:bg-cyan-600 group-hover:text-white',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80 group-hover:bg-purple-600 group-hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white',
    sky: 'bg-sky-50 text-sky-700 border-sky-200/80 group-hover:bg-sky-600 group-hover:text-white',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/80 group-hover:bg-rose-600 group-hover:text-white',
    pink: 'bg-pink-50 text-pink-700 border-pink-200/80 group-hover:bg-pink-600 group-hover:text-white',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white',
    teal: 'bg-teal-50 text-teal-700 border-teal-200/80 group-hover:bg-teal-600 group-hover:text-white',
    blue: 'bg-blue-50 text-blue-700 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white',
    violet: 'bg-violet-50 text-violet-700 border-violet-200/80 group-hover:bg-violet-600 group-hover:text-white',
    fuchsia: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200/80 group-hover:bg-fuchsia-600 group-hover:text-white',
    lime: 'bg-lime-50 text-lime-700 border-lime-200/80 group-hover:bg-lime-600 group-hover:text-white',
    orange: 'bg-orange-50 text-orange-700 border-orange-200/80 group-hover:bg-orange-600 group-hover:text-white',
  };

  const currentGlow = glowStyles[category.accentColor] || 'rgba(16, 185, 129, 0.15)';
  const currentIconBadge = accentBg[category.accentColor] || 'bg-emerald-50 text-emerald-700 border-emerald-200';

  if (compact) {
    return (
      <Link href={`/categories/${category.slug}`} className="group block h-full">
        <CardGlow
          glowColor={currentGlow}
          className="h-full bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${currentIconBadge}`}>
              <CategoryIcon name={category.iconName} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-800 transition-colors">
                {category.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">
                {category.services.length} services · {category.totalProvidersCount}+ pros
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </CardGlow>
      </Link>
    );
  }

  return (
    <Link href={`/categories/${category.slug}`} className="group block h-full">
      <CardGlow
        glowColor={currentGlow}
        className="h-full bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-lg hover:border-emerald-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
      >
        <div>
          {/* Header with Icon and Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-all duration-300 ${currentIconBadge}`}>
              <CategoryIcon name={category.iconName} className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
              {category.services.length} Services
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-1.5">
            {category.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {category.description}
          </p>
        </div>

        {/* Quick popular services preview chips */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {category.services.slice(0, 3).map((srv) => (
              <span
                key={srv.id}
                className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors"
              >
                {srv.name}
              </span>
            ))}
            {category.services.length > 3 && (
              <span className="text-[10px] text-slate-400 font-medium px-1 py-0.5">
                +{category.services.length - 3} more
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
            <span>Explore Services</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </CardGlow>
    </Link>
  );
};
