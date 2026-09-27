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
  // Glow tint maps according to design system (subtle, dark emerald/gold ambiance)
  const currentGlow = 'rgba(16, 185, 129, 0.2)';

  if (compact) {
    return (
      <Link href={`/categories/${category.slug}`} className="group block h-full">
        <CardGlow
          glowColor={currentGlow}
          className="h-full bg-[#0d1612]/90 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-4 shadow-lg shadow-black/40 hover:border-amber-400/50 hover:bg-[#121f1a] transition-all duration-300 flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-950 to-[#07130e] border border-emerald-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-400/50 transition-all shadow-md">
              <CategoryIcon name={category.iconName} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-sm group-hover:text-amber-300 transition-colors">
                {category.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">
                {category.services.length} services · {category.totalProvidersCount}+ pros
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
        </CardGlow>
      </Link>
    );
  }

  return (
    <Link href={`/categories/${category.slug}`} className="group block h-full">
      <CardGlow
        glowColor={currentGlow}
        className="h-full bg-[#0e1714]/85 backdrop-blur-xl rounded-2xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 hover:border-amber-400/50 hover:bg-[#121f1a] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          {/* Header with Icon and Badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#0a1812] to-[#04100c] border border-emerald-500/30 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 group-hover:border-amber-400/50 transition-all duration-300">
              <CategoryIcon name={category.iconName} className="w-6 h-6 text-amber-300" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
              {category.services.length} Services
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-300 transition-colors mb-2">
            {category.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-5">
            {category.description}
          </p>
        </div>

        {/* Quick popular services preview chips */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {category.services.slice(0, 3).map((srv) => (
              <span
                key={srv.id}
                className="text-[11px] font-medium bg-[#13221b] text-slate-300 px-2.5 py-1 rounded-lg border border-emerald-900/40 group-hover:border-emerald-500/30 group-hover:text-emerald-200 transition-colors"
              >
                {srv.name}
              </span>
            ))}
            {category.services.length > 3 && (
              <span className="text-[11px] text-slate-400 font-medium px-1.5 py-1">
                +{category.services.length - 3} more
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
            <span>Explore {category.services.length} Specialized Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </CardGlow>
    </Link>
  );
};
