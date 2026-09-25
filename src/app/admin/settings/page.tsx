'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { Settings, Save, Globe, Shield, Mail, Bell } from 'lucide-react';

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
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Platform Configuration & Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          General marketplace settings, worldwide localization, and security policies.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs max-w-2xl">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Marketplace Name</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
              >
                <option value="USD">USD ($) — Global Default</option>
                <option value="EUR">EUR (€) — Eurozone</option>
                <option value="GBP">GBP (£) — United Kingdom</option>
                <option value="BRL">BRL (R$) — Brazil</option>
                <option value="NGN">NGN (₦) — Nigeria</option>
                <option value="AED">AED (د.إ) — UAE</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoVerifyWorkers}
                onChange={(e) => setAutoVerifyWorkers(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Automatic Verification on Enrollment
                </span>
                <span className="text-[11px] text-slate-400">
                  When disabled, new worker profiles require manual review in the Workers portal.
                </span>
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="py-3 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
