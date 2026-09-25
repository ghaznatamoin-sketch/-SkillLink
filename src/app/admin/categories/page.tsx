'use client';

import React, { useState } from 'react';
import { CATEGORIES_DATA } from '@/data/categories';
import { CategoryIcon } from '@/components/categories/CategoryIcon';
import { Tag, Search, CheckCircle2, Layers, Plus } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<string>(CATEGORIES_DATA[0].id);

  const selectedCategory = CATEGORIES_DATA.find((c) => c.id === selectedCatId) || CATEGORIES_DATA[0];

  const totalServices = CATEGORIES_DATA.reduce((acc, c) => acc + c.services.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Categories & Service Catalog ({CATEGORIES_DATA.length} Categories · {totalServices} Services)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Administer defined category groupings, individual services, starting prices, and icons.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Category Picker */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Category Sectors (10)
          </h3>

          <div className="bg-white rounded-3xl border border-slate-200/80 p-2 shadow-xs space-y-1">
            {CATEGORIES_DATA.map((cat) => {
              const isSelected = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all text-left ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CategoryIcon
                      name={cat.iconName}
                      className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`}
                    />
                    <span className="text-xs">{cat.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {cat.services.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Services in Selected Category */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center">
                  <CategoryIcon name={selectedCategory.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {selectedCategory.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedCategory.description}</p>
                </div>
              </div>
            </div>

            {/* Individual Services Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Service Name</th>
                    <th className="py-3 px-3">Slug / ID</th>
                    <th className="py-3 px-3">Base Price</th>
                    <th className="py-3 px-3">Est. Duration</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedCategory.services.map((srv) => (
                    <tr key={srv.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3">
                        <strong className="text-slate-900 font-bold block">{srv.name}</strong>
                        <span className="text-slate-400 text-[10px] line-clamp-1 max-w-xs">
                          {srv.description}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-slate-400">
                        {srv.slug}
                      </td>
                      <td className="py-3.5 px-3 font-bold text-slate-800">
                        ${srv.startingPrice} <span className="text-[10px] text-slate-400 font-normal">/{srv.priceUnit}</span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-500">
                        {srv.estimatedDuration || '1-2 hrs'}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          Enabled
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
