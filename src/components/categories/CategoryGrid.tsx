'use client';

import React from 'react';
import { Category } from '@/types/category';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: Category[];
  compact?: boolean;
  columns?: 2 | 3 | 4;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  compact = false,
  columns = 2,
}) => {
  // Always arrange in PAIRS (2 cards per row) on medium/large screens for visual balance
  const gridClasses = columns === 4 
    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6'
    : 'grid grid-cols-1 md:grid-cols-2 gap-6';

  return (
    <div className={gridClasses}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} compact={compact} />
      ))}
    </div>
  );
};
