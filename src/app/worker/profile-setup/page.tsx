'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { CATEGORIES_DATA } from '@/data/categories';
import {
  Tag,
  Wrench,
  MapPin,
  Clock,
  DollarSign,
  Save,
  Plus,
} from 'lucide-react';

export default function WorkerProfileSetupPage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'services' | 'skills' | 'location' | 'availability' | 'pricing'>('services');

  // Multi-field state
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'srv-ac-technician',
    'srv-refrigerator-repair',
  ]);
  const [skills, setSkills] = useState<string[]>([
    'Inverter Diagnostics',
    'R410A Refrigerant',
    'Ductless Splits',
    'Emergency Compressor Fix',
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [city, setCity] = useState('São Paulo');
  const [country, setCountry] = useState('Brazil');
  const [radiusKm, setRadiusKm] = useState<number>(25);
  const [schedule, setSchedule] = useState('Mon - Sat: 8:00 AM - 7:00 PM');
  const [bio, setBio] = useState(
    'Over 8 years of certified experience specializing in inverter AC diagnostics, compressor reconditioning, ductless split installations, and multi-zone climate control systems.'
  );

  const toggleService = (srvId: string) => {
    if (selectedServices.includes(srvId)) {
      setSelectedServices(selectedServices.filter((id) => id !== srvId));
    } else {
      setSelectedServices([...selectedServices, srvId]);
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Your worker profile, services, and rates have been updated.', 'Profile Saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Services & Profile Setup
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure the categories and services you offer, your coverage area, and hourly rates.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-950/40 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Save className="w-4 h-4 text-amber-300" />
          <span>Save All Settings</span>
        </button>
      </div>

      {/* Step Tabs Header */}
      <div className="flex items-center gap-2 overflow-x-auto bg-[#0e1714]/85 p-2 rounded-2xl border border-emerald-500/20 shadow-xl shadow-black/40 scrollbar-none">
        {[
          { key: 'services', label: '1. Services Offered', icon: Tag },
          { key: 'skills', label: '2. Skills & Bio', icon: Wrench },
          { key: 'location', label: '3. Service Area', icon: MapPin },
          { key: 'availability', label: '4. Availability', icon: Clock },
          { key: 'pricing', label: '5. Pricing', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-white border border-emerald-500/30 shadow-md'
                  : 'text-slate-400 hover:bg-[#121f19] hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Services Selection */}
      {activeTab === 'services' && (
        <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">
              Select Services You Provide ({selectedServices.length} selected)
            </h3>
            <p className="text-xs text-slate-400">
              Check all individual services that match your qualifications.
            </p>
          </div>

          <div className="space-y-6">
            {CATEGORIES_DATA.map((category) => (
              <div key={category.id} className="p-4 rounded-2xl bg-[#121f19]/70 border border-emerald-900/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {category.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                  {category.services.map((srv) => {
                    const isChecked = selectedServices.includes(srv.id);
                    return (
                      <label
                        key={srv.id}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-950/80 border-emerald-500 font-bold text-emerald-200 shadow-sm'
                            : 'bg-[#0a1410] border-emerald-900/30 text-slate-300 hover:bg-[#15231c]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleService(srv.id)}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                        />
                        <span className="truncate">{srv.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Skills & Bio */}
      {activeTab === 'skills' && (
        <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-6 max-w-3xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">Skills & Professional Bio</h3>
            <p className="text-xs text-slate-400">Showcase your specialties to customers.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">Professional Bio / Overview</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-emerald-900/40 bg-[#121f19] text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2">Specialized Skill Tags</label>
            <form onSubmit={handleAddSkill} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Add custom skill (e.g. Inverter Testing, 4K Wiring)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white text-xs font-bold border border-emerald-500/30 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>Add</span>
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-xs font-semibold text-emerald-300"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Location & Service Area */}
      {activeTab === 'location' && (
        <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">Service Coverage Area</h3>
            <p className="text-xs text-slate-400">Specify where you accept service visits.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">Operating City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Maximum Service Radius (km): <span className="text-amber-300 font-extrabold">{radiusKm} km</span>
            </label>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Tab 4: Availability */}
      {activeTab === 'availability' && (
        <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">Weekly Schedule & Working Hours</h3>
            <p className="text-xs text-slate-400">Customers can only book within these designated time windows.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">Availability String</label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="e.g. Mon - Sat: 8:00 AM - 7:00 PM"
              className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 font-medium"
            />
          </div>
        </div>
      )}

      {/* Tab 5: Pricing */}
      {activeTab === 'pricing' && (
        <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">Base Hourly Rate</h3>
            <p className="text-xs text-slate-400">Standard rate for customized jobs and diagnostic visits.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">Hourly Rate (USD)</label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-400">$</span>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-36 px-3.5 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-sm font-bold text-amber-300"
              />
              <span className="text-xs text-slate-400">USD / hour</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

