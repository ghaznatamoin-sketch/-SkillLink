'use client';

import React from 'react';

export const ProviderCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#0e1714] rounded-2xl border border-emerald-900/30 p-5 shadow-sm animate-pulse space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#172721] flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#172721] rounded w-3/4" />
          <div className="h-3 bg-[#172721] rounded w-1/2" />
          <div className="h-3 bg-[#172721] rounded w-1/3" />
        </div>
      </div>
      <div className="space-y-1.5 pt-2">
        <div className="h-3 bg-[#172721] rounded w-full" />
        <div className="h-3 bg-[#172721] rounded w-4/5" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-6 bg-[#172721] rounded-full w-16" />
        <div className="h-6 bg-[#172721] rounded-full w-20" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-emerald-900/30">
        <div className="h-5 bg-[#172721] rounded w-20" />
        <div className="h-8 bg-[#172721] rounded-xl w-24" />
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC<{ cols?: number }> = ({ cols = 5 }) => {
  return (
    <tr className="animate-pulse border-b border-emerald-900/30">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <div className="h-4 bg-[#172721] rounded w-4/5" />
        </td>
      ))}
    </tr>
  );
};
