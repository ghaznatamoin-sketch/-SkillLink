'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AdminComplaintsPage() {
  const { complaints, resolveComplaint } = useMarketplace();
  const { showToast } = useToast();

  const [resolutionText, setResolutionText] = useState<Record<string, string>>({});

  const handleResolve = (id: string) => {
    const text = resolutionText[id] || 'Resolved by administrative mediation';
    resolveComplaint(id, text);
    showToast('success', 'Complaint ticket marked as resolved.', 'Dispute Resolved');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-emerald-900/30">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
          Dispute & Complaint Resolution ({complaints.length})
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Handle customer and worker feedback, mediate on-site delays, and issue resolutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complaints.map((comp) => {
          const isResolved = comp.status === 'resolved';
          return (
            <div
              key={comp.id}
              className={`p-6 rounded-3xl border shadow-xl shadow-black/40 flex flex-col justify-between space-y-4 transition-all ${
                isResolved
                  ? 'bg-[#0e1714]/85 backdrop-blur-xl border-emerald-500/20 opacity-90'
                  : 'bg-[#141d18]/90 border-amber-500/30'
              }`}
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-emerald-900/30">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isResolved
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-400/30'
                      }`}
                    >
                      {isResolved ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-300" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">{comp.subject}</h3>
                      <span className="text-[11px] text-slate-400">
                        By <strong className="text-slate-200">{comp.complainantName}</strong> ({comp.complainantRole}) re: <strong className="text-slate-200">{comp.targetName}</strong>
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold self-start ${
                      isResolved
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-400/30'
                    }`}
                  >
                    {comp.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-[#121f19]/70 p-3.5 rounded-2xl border border-emerald-900/30 italic">
                  "{comp.description}"
                </p>

                {comp.resolution && (
                  <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300">
                    <strong className="block text-[11px] text-emerald-400 uppercase">
                      Admin Resolution:
                    </strong>
                    <span>{comp.resolution}</span>
                  </div>
                )}
              </div>

              {!isResolved && (
                <div className="flex items-center gap-2 pt-2 border-t border-emerald-900/30">
                  <input
                    type="text"
                    placeholder="Enter resolution notes / credit..."
                    value={resolutionText[comp.id] || ''}
                    onChange={(e) =>
                      setResolutionText({ ...resolutionText, [comp.id]: e.target.value })
                    }
                    className="flex-1 px-3.5 py-2 rounded-xl border border-emerald-900/40 text-xs text-slate-100 bg-[#121f19] placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleResolve(comp.id)}
                    className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold border border-emerald-500/30 shadow-md whitespace-nowrap"
                  >
                    Resolve Dispute
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

