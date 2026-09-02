import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { storage } from '../../services/storage';
import type { AdminUser } from '../../types';
import { Shield, Lock, Mail, ArrowLeft, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToLanding: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToLanding,
}) => {
  const [email, setEmail] = useState('owner@nailcocktales.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const user: AdminUser = {
        email: email.trim(),
        name: email.split('@')[0].toUpperCase(),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'owner',
      };
      storage.setAdminUser(user);
      setIsLoading(false);
      onLoginSuccess(user);
    }, 400);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const user: AdminUser = {
        email: 'owner.nailcocktales@gmail.com',
        name: 'NailCocktales Owner',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        role: 'owner',
      };
      storage.setAdminUser(user);
      setIsLoading(false);
      onLoginSuccess(user);
    }, 450);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B8EADF]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Back to Landing Page Link */}
      <button
        onClick={onBackToLanding}
        className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-slate-700 hover:text-brand-teal hover:bg-white text-xs font-semibold shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Customer Landing Page</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-white/90 shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <BrandLogo size="md" showSubtitle={true} showScriptPriceList={false} />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-[11px] font-bold uppercase tracking-wider mt-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Owner & Admin Management Portal</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 mt-2">
            Salon Staff Sign-In
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access appointment calendar, notifications, services & settings
          </p>
        </div>

        {/* Google Sign-in Option */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {/* Google G Logo */}
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
            <span>Sign in with Google Account</span>
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white/80 px-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider relative">
              or use staff email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin / Owner Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="owner@nailcocktales.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-teal to-[#018b7c] hover:from-[#008f7f] hover:to-[#007468] shadow-md hover:shadow-brand-teal/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Access Management Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="p-3 rounded-xl bg-brand-teal/10 border border-brand-teal/20 text-center text-[11px] text-brand-teal-dark">
            <strong>Quick Demo Access:</strong> Use prefilled credentials or click Google Sign In for instant access.
          </div>
        </div>
      </div>
    </div>
  );
};
