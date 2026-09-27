'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { UserRole } from '@/types/user';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, UserCheck, Wrench, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('amara.bello@example.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [isLoading, setIsLoading] = useState(false);

  const handleRolePreset = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'customer') {
      setEmail('amara.bello@example.com');
    } else if (role === 'worker') {
      setEmail('rafael.costa@skilllink.pro');
    } else if (role === 'admin') {
      setEmail('admin@skilllink.global');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('warning', 'Please enter your email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(email, selectedRole, password);
      setIsLoading(false);
      if (res && !res.success) {
        showToast('error', res.error || 'Failed to sign in. Please check your credentials.');
        return;
      }
      showToast('success', `Signed in successfully as ${selectedRole.toUpperCase()}.`, 'Welcome Back!');

      if (selectedRole === 'worker') router.push('/worker');
      else if (selectedRole === 'admin') router.push('/admin');
      else router.push('/customer');
    } catch (err: any) {
      setIsLoading(false);
      showToast('error', err?.message || 'Sign in error');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await login(email, selectedRole);
      setIsLoading(false);
      showToast('success', `Google OAuth authorized as ${selectedRole.toUpperCase()}.`, 'Connected!');

      if (selectedRole === 'worker') router.push('/worker');
      else if (selectedRole === 'admin') router.push('/admin');
      else router.push('/customer');
    } catch (err: any) {
      setIsLoading(false);
      showToast('error', err?.message || 'OAuth error');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-[#0e1714]/90 backdrop-blur-xl rounded-3xl border border-emerald-500/25 p-6 sm:p-8 shadow-2xl shadow-black/60 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-900 to-[#041a12] flex items-center justify-center text-white mx-auto shadow-md border border-amber-500/30">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Log in to SkillLink
          </h1>
          <p className="text-xs text-slate-400">
            Access your bookings, job requests, or platform controls.
          </p>
        </div>

        {/* Role Fast Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-300">Select Account Role</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'customer' as UserRole, label: 'Customer', icon: UserCheck },
              { role: 'worker' as UserRole, label: 'Worker', icon: Wrench },
              { role: 'admin' as UserRole, label: 'Admin', icon: Shield },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = selectedRole === item.role;
              return (
                <button
                  type="button"
                  key={item.role}
                  onClick={() => handleRolePreset(item.role)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 border transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-800 to-emerald-700 text-amber-300 border-amber-400/50 ring-2 ring-amber-400/20 font-bold shadow-md'
                      : 'border-emerald-900/40 bg-[#121f19] text-slate-300 hover:bg-[#182a22]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Google OAuth button (mock) */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-xl border border-emerald-900/40 bg-[#121f19] hover:bg-[#182a22] text-slate-200 text-xs font-semibold flex items-center justify-center gap-2.5 shadow-md transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-emerald-900/40" />
          <span className="bg-[#0e1714] px-3 text-[11px] text-slate-400 font-medium absolute">or email</span>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-300">Password</label>
              <Link href="/auth/forgot-password" className="text-[11px] font-semibold text-amber-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
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
            <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-emerald-900/30">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/auth/register" className="font-bold text-amber-400 hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
