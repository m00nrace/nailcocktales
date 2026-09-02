import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { Calendar, Search, Sparkles, CheckCircle2, Clock, Star, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenTracking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenTracking }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Decorative ambient blurred orbs & floating bubbles */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-[#B8EADF]/40 rounded-full blur-2xl pointer-events-none -z-10 animate-float-medium" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-brand-mocha/5 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Floating cocktail bubbles */}
      <div className="absolute top-24 left-[15%] w-4 h-4 rounded-full bg-brand-teal/30 blur-[1px] animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-40 right-[20%] w-6 h-6 rounded-full bg-brand-teal/20 blur-[1px] animate-bounce" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-16 left-[25%] w-3 h-3 rounded-full bg-brand-teal/40 blur-[0.5px] animate-bounce" style={{ animationDuration: '5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-subtle text-xs font-semibold text-brand-teal-dark mb-6 shadow-sm border border-brand-teal/20 animate-in fade-in zoom-in duration-500">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal animate-spin" style={{ animationDuration: '10s' }} />
            <span>Welcome to NailCocktales Hand & Foot Spa</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-coral" />
            <span className="text-slate-600 font-normal">Instant Booking • No Sign-In Needed</span>
          </div>

          {/* Main Brand Presentation Matching Image */}
          <div className="my-4 py-3 flex justify-center">
            <BrandLogo size="xl" showSubtitle={true} showScriptPriceList={false} />
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-[1.15] mt-4 mb-6">
            Sip, Relax & Pamper in{' '}
            <span className="bg-gradient-to-r from-brand-teal via-[#008f7f] to-brand-mocha bg-clip-text text-transparent">
              Cocktail-Themed Luxury
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Immerse yourself in refreshing scrubs, therapeutic massages, and chic nail couture.
            Book your session in seconds, receive your unique reference code, and track or manage your appointment anytime.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-teal to-[#018b7c] hover:from-[#008f7f] hover:to-[#007468] shadow-lg hover:shadow-xl hover:shadow-brand-teal/25 transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:scale-95"
            >
              <Calendar className="w-5 h-5" />
              <span>Book An Appointment</span>
            </button>

            <button
              onClick={onOpenTracking}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-base font-semibold text-brand-mocha hover:text-brand-teal glass-panel hover:bg-white border border-brand-mocha/20 hover:border-brand-teal/40 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm"
            >
              <Search className="w-5 h-5 text-brand-teal" />
              <span>Track My Booking</span>
            </button>
          </div>

          {/* Trust Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl text-left flex items-start gap-3 border border-white/80">
              <div className="p-2 rounded-xl bg-brand-teal/10 text-brand-teal shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">No Log-In</h4>
                <p className="text-xs text-slate-500 mt-0.5">Quick booking with name & contact</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-left flex items-start gap-3 border border-white/80">
              <div className="p-2 rounded-xl bg-brand-mocha/10 text-brand-mocha shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Booking Ref</h4>
                <p className="text-xs text-slate-500 mt-0.5">Instant unique tracking number</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-left flex items-start gap-3 border border-white/80">
              <div className="p-2 rounded-xl bg-brand-teal/10 text-brand-teal shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Easy Cancel</h4>
                <p className="text-xs text-slate-500 mt-0.5">Cancel or reschedule easily online</p>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-left flex items-start gap-3 border border-white/80">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Top Rated</h4>
                <p className="text-xs text-slate-500 mt-0.5">Certified therapists & nail artists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
