'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { Sparkles, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      showToast('success', `Reset link sent to ${email}`, 'Check your email');
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xl shadow-emerald-950/5 space-y-6">
        <div className="text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white mx-auto shadow-md">
            <Sparkles className="w-6 h-6 text-mint-300" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-slate-500">
            Enter the email associated with your account and we'll send instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">Reset link dispatched</h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              We have sent password recovery instructions to <strong>{email}</strong>. Please check your inbox.
            </p>
            <Link
              href="/auth/login"
              className="inline-block mt-2 py-2 px-4 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Sending...' : 'Send Reset Instructions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
