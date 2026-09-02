import React from 'react';
import { GlassWater, Sparkles, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export const SpaExperience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Showcase with Glass Overlay */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="NailCocktales Spa Lounge"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            {/* Floating Glassmorphic Highlight Card */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 glass-panel p-5 rounded-2xl max-w-xs border border-white/90 shadow-glass-lg animate-float-medium">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-brand-teal text-white">
                  <GlassWater className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Signature Cocktales</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Complimentary handcrafted spa mocktail with every royal package.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The NailCocktales Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Where Pampering Meets the Vibe of a{' '}
              <span className="text-brand-teal">Chic Lounge</span>
            </h2>

            <p className="text-slate-600 leading-relaxed text-base">
              At NailCocktales, we reimagined the traditional nail salon into an elevated sanctuary.
              Sip on refreshing mocktails, recline in plush leather massage thrones, and let our skilled technicians treat your hands and feet with meticulous care.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-panel p-4 rounded-2xl border border-white/70">
                <div className="p-2 w-fit rounded-xl bg-brand-teal/15 text-brand-teal mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">100% Autoclaved Tools</h4>
                <p className="text-xs text-slate-500 mt-1">Medical-grade sterilization for every customer with single-use buffers.</p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/70">
                <div className="p-2 w-fit rounded-xl bg-brand-mocha/15 text-brand-mocha mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Organic Scrubs & Oils</h4>
                <p className="text-xs text-slate-500 mt-1">Cruelty-free, vegan botanical formulas packed with vitamins and antioxidants.</p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/70">
                <div className="p-2 w-fit rounded-xl bg-amber-500/15 text-amber-600 mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Certified Nail Artists</h4>
                <p className="text-xs text-slate-500 mt-1">Master technicians skilled in Japanese gel art and Russian manicure techniques.</p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/70">
                <div className="p-2 w-fit rounded-xl bg-brand-coral/15 text-brand-coral mb-3">
                  <GlassWater className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Sensory Cocktales Bar</h4>
                <p className="text-xs text-slate-500 mt-1">Select your aromatherapy scent: Mint Mojito, Pina Colada, or Citrus Margarita.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
