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
  columns = 4,
}) => {
  const gridClasses = {
    2: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',
    3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
    4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6',
  }[columns];

  return (
    <div className={gridClasses}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} compact={compact} />
      ))}
    </div>
  );
};
