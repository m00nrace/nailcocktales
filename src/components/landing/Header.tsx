import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { Calendar, Search, Shield, Menu, X, Sparkles } from 'lucide-react';
import type { SalonConfig } from '../../types';

interface HeaderProps {
  onOpenBooking: (preselectedServiceId?: string) => void;
  onOpenTracking: () => void;
  onSwitchToAdmin: () => void;
  salonConfig: SalonConfig;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenTracking,
  onSwitchToAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 glass-panel shadow-glass border-b border-brand-teal/20'
          : 'py-4 bg-white/40 backdrop-blur-md border-b border-white/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <BrandLogo size="md" showSubtitle={true} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-700">
          <a
            href="#services"
            className="transition-colors hover:text-brand-teal flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-brand-teal" />
            <span>Price List</span>
          </a>
          <a
            href="#experience"
            className="transition-colors hover:text-brand-teal"
          >
            The Experience
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-brand-teal"
          >
            Location & Hours
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Track Booking Button */}
          <button
            onClick={onOpenTracking}
            className="px-3.5 py-2 rounded-xl text-sm font-medium text-brand-mocha hover:text-brand-teal bg-white/70 hover:bg-white border border-brand-mocha/20 hover:border-brand-teal/40 transition-all duration-200 flex items-center gap-2 shadow-sm"
          >
            <Search className="w-4 h-4 text-brand-teal" />
            <span>Track Booking</span>
          </button>

          {/* Book Appointment CTA */}
          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-teal to-[#029686] hover:from-[#009181] hover:to-[#007a6d] shadow-md hover:shadow-lg hover:shadow-brand-teal/20 transition-all duration-200 flex items-center gap-2 transform active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Now</span>
          </button>

          {/* Discreet Admin Login Access */}
          <button
            onClick={onSwitchToAdmin}
            title="Owner & Admin Management Portal"
            className="p-2.5 rounded-xl text-slate-500 hover:text-brand-teal hover:bg-white/80 border border-transparent hover:border-brand-teal/30 transition-all"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-brand-teal shadow-sm"
          >
            Book Now
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 bg-white/60 backdrop-blur-sm border border-white/80"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-brand-teal/20 px-5 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-brand-teal"
          >
            ✨ Services & Price List
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-brand-teal"
          >
            🌿 Spa Experience
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-700 hover:text-brand-teal"
          >
            📍 Contact & Socials
          </a>
          
          <div className="pt-2 border-t border-brand-teal/15 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-brand-mocha bg-white border border-brand-mocha/20 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-brand-teal" />
              <span>Track Your Booking Status</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSwitchToAdmin();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-slate-600 hover:text-brand-teal bg-white/40 border border-slate-200 flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-brand-teal" />
              <span>Owner & Admin Portal Sign-In</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
