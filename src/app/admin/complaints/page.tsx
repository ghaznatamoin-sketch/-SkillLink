'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useToast } from '@/context/ToastContext';
import { AlertTriangle, CheckCircle2, Clock, MessageSquare, ShieldAlert } from 'lucide-react';

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
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Dispute & Complaint Resolution ({complaints.length})
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Handle customer and worker feedback, mediate on-site delays, and issue resolutions.
        </p>
      </div>

      <div className="space-y-4">
        {complaints.map((comp) => {
          const isResolved = comp.status === 'resolved';
          return (
            <div
              key={comp.id}
              className={`p-6 rounded-3xl border shadow-xs space-y-4 transition-all ${
                isResolved
                  ? 'bg-white border-slate-200/80 opacity-90'
                  : 'bg-amber-50/50 border-amber-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isResolved ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{comp.subject}</h3>
                    <span className="text-[11px] text-slate-400">
                      Filed by <strong>{comp.complainantName}</strong> ({comp.complainantRole}) regarding <strong>{comp.targetName}</strong>
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold self-start ${
                    isResolved
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {comp.status.toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-slate-100">
                "{comp.description}"
              </p>

              {comp.resolution && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <strong className="block text-[11px] text-emerald-800 uppercase">
                    Admin Resolution:
                  </strong>
                  <span>{comp.resolution}</span>
                </div>
              )}

              {!isResolved && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Enter resolution notes / credit / penalty..."
                    value={resolutionText[comp.id] || ''}
                    onChange={(e) =>
                      setResolutionText({ ...resolutionText, [comp.id]: e.target.value })
                    }
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white"
                  />
                  <button
                    onClick={() => handleResolve(comp.id)}
                    className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs whitespace-nowrap"
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
