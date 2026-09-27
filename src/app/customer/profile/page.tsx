'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { User, Mail, Phone, MapPin, ShieldCheck, Save } from 'lucide-react';

export default function CustomerProfilePage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || 'Amara Bello');
  const [email, setEmail] = useState(user?.email || 'amara.bello@example.com');
  const [phone, setPhone] = useState(user?.phone || '+234 801 234 5678');
  const [address, setAddress] = useState(user?.address || '14 Admiralty Way, Lekki Phase 1');
  const [location, setLocation] = useState(user?.location || 'Lagos, Nigeria');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('success', 'Customer profile details updated.', 'Saved!');
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-emerald-900/30">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
          Customer Profile & Address
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage your personal contact info and default service address.
        </p>
      </div>

      <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 sm:p-8 shadow-xl shadow-black/40 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-emerald-900/30">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 border border-emerald-500/30 text-white flex items-center justify-center text-xl font-bold overflow-hidden shadow-md">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-amber-300">{name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">{name}</h3>
              <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-medium bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/30 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                Verified Customer Account
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">City / Region</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">Default Service Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Apartment, Street, Area"
              className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 border border-emerald-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

