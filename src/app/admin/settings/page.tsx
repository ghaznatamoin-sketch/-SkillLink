'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { Settings, Save, Globe, Shield, Mail, Bell, Sparkles } from 'lucide-react';

export default function AdminSettingsPage() {
  const { showToast } = useToast();

  const [platformName, setPlatformName] = useState('SkillLink Global');
  const [supportEmail, setSupportEmail] = useState('support@skilllink.global');
  const [currency, setCurrency] = useState('USD');
  const [autoVerifyWorkers, setAutoVerifyWorkers] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('success', 'Platform settings saved successfully.', 'Settings Updated');
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-emerald-500/20">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-400" />
          <span>Platform Configuration & Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          General marketplace settings, worldwide localization, and security policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings Panel */}
        <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 sm:p-8 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-emerald-500/10">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">General & Regional</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Marketplace Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="USD" className="bg-[#0e1714] text-white">USD ($) — Global Default</option>
                <option value="EUR" className="bg-[#0e1714] text-white">EUR (€) — Eurozone</option>
                <option value="GBP" className="bg-[#0e1714] text-white">GBP (£) — United Kingdom</option>
                <option value="BRL" className="bg-[#0e1714] text-white">BRL (R$) — Brazil</option>
                <option value="NGN" className="bg-[#0e1714] text-white">NGN (₦) — Nigeria</option>
                <option value="AED" className="bg-[#0e1714] text-white">AED (د.إ) — UAE</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs shadow-lg shadow-black/30 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>{isSaving ? 'Saving...' : 'Save General Settings'}</span>
            </button>
          </form>
        </div>

        {/* Security & Automation Settings Panel */}
        <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 sm:p-8 shadow-xl shadow-black/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-emerald-500/10">
              <Shield className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Security & Verification Policies</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#080d0b]/80 border border-emerald-900/30">
                <label className="flex items-start gap-3.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoVerifyWorkers}
                    onChange={(e) => setAutoVerifyWorkers(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-emerald-800 text-emerald-600 focus:ring-emerald-500 bg-[#121f19]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Automatic Verification on Enrollment
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block leading-relaxed">
                      When disabled, new worker profiles require manual compliance review in the Workers portal before becoming bookable on the marketplace.
                    </span>
                  </div>
                </label>
              </div>

              <div className="p-4 rounded-2xl bg-[#080d0b]/80 border border-emerald-900/30">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Escrow Settlement Security</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Worker payouts are automatically held in escrow until booking completion is confirmed by the client or verified after the 48-hour dispute grace window.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-emerald-500/10 text-right">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-[#121f19] hover:bg-[#182821] text-emerald-300 font-semibold text-xs border border-emerald-500/30 transition-all"
            >
              Update Policy Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

