'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { UserRole } from '@/types/user';
import { Sparkles, ArrowRight, UserCheck, Wrench, Mail, Lock, User, Phone, MapPin } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { showToast } = useToast();

  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('warning', 'Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await signUp({
        fullName: name,
        email,
        password,
        role: selectedRole,
        phone,
        location: city && country ? `${city}, ${country}` : city || country || 'Global',
        address: city,
      });

      setIsLoading(false);

      if (res && !res.success) {
        showToast('error', res.error || 'Failed to create account.');
        return;
      }

      showToast(
        'success',
        `Account created successfully as ${selectedRole === 'worker' ? 'Service Professional' : 'Customer'}.`,
        'Welcome to SkillLink!'
      );

      if (selectedRole === 'worker') router.push('/worker/profile-setup');
      else router.push('/customer');
    } catch (err: any) {
      setIsLoading(false);
      showToast('error', err?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="max-w-lg w-full bg-[#0e1714]/90 backdrop-blur-xl rounded-3xl border border-emerald-500/25 p-6 sm:p-8 shadow-2xl shadow-black/60 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-900 to-[#041a12] flex items-center justify-center text-white mx-auto shadow-md border border-amber-500/30">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Create your SkillLink Account
          </h1>
          <p className="text-xs text-slate-400">
            Join the worldwide community for verified services and skilled technicians.
          </p>
        </div>

        {/* Role Selection Toggle (PAIRS: 2 cards) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">Choose your Account Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedRole('customer')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedRole === 'customer'
                  ? 'bg-emerald-950/80 border-amber-400/50 ring-2 ring-amber-400/20'
                  : 'bg-[#121f19] border-emerald-900/40 hover:bg-[#182a22]'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-900/80 text-amber-400 flex items-center justify-center mb-2 border border-emerald-500/30">
                <UserCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-100 text-xs sm:text-sm">I Need Services</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Find & book verified specialists worldwide</p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('worker')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedRole === 'worker'
                  ? 'bg-emerald-950/80 border-amber-400/50 ring-2 ring-amber-400/20'
                  : 'bg-[#121f19] border-emerald-900/40 hover:bg-[#182a22]'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-900/80 text-amber-400 flex items-center justify-center mb-2 border border-emerald-500/30">
                <Wrench className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-100 text-xs sm:text-sm">I Offer Services</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">List your skills, get booked & grow earnings</p>
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Amara Bello or Rafael Costa"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">City</label>
              <input
                type="text"
                placeholder="e.g. Lagos, São Paulo, London"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Country</label>
              <input
                type="text"
                placeholder="e.g. Nigeria, Brazil, UK"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 border border-emerald-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-emerald-900/30">
          <span>Already registered? </span>
          <Link href="/auth/login" className="font-bold text-amber-400 hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
