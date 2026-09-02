import React, { useState } from 'react';
import type { Service } from '../../types';
import { Clock, Sparkles, Heart, ArrowRight } from 'lucide-react';

interface ServicesPriceListProps {
  services: Service[];
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesPriceList: React.FC<ServicesPriceListProps> = ({
  services,
  onSelectServiceForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hand-spa', label: 'Hand Spa & Manicure' },
    { id: 'foot-spa', label: 'Foot Spa & Pedicure' },
    { id: 'packages', label: 'Signature Cocktale Packages' },
    { id: 'enhancements', label: 'Gel & Enhancements' },
    { id: 'nail-art', label: 'Nail Art' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="services" className="py-20 relative scroll-mt-20">
      {/* Background glow elements */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#B8EADF]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Matching the Uploaded Image */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Cocktale Menu</span>
          </div>

          {/* Script "Price List" matching image */}
          <div className="relative inline-block my-2">
            <span className="font-script-lux text-5xl sm:text-6xl md:text-7xl text-[#5C3D2E] block drop-shadow-sm font-normal">
              Price List
            </span>
          </div>

          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Every service is blended to perfection with organic scrubs, soothing soaks, and hospital-sanitized tools.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-teal text-white shadow-md shadow-brand-teal/25 scale-105'
                      : 'glass-panel text-slate-700 hover:text-brand-teal hover:bg-white/90 border border-white/80'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map(service => {
            const isFav = favorites.includes(service.id);
            return (
              <div
                key={service.id}
                className="glass-panel glass-card-hover rounded-3xl overflow-hidden flex flex-col border border-white/80 relative group"
              >
                {/* Service Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback image in case custom URL is broken
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Badges on image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {service.popular && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-brand-coral text-white shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Popular
                      </span>
                    )}
                    {service.featured && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-brand-teal text-white shadow-sm">
                        Signature
                      </span>
                    )}
                  </div>

                  {/* Favorite / Heart toggle */}
                  <button
                    onClick={(e) => toggleFavorite(service.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:text-brand-coral transition-colors shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-brand-coral text-brand-coral' : ''}`} />
                  </button>

                  {/* Price Tag pinned to bottom right of photo */}
                  <div className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl glass-panel-dark text-white font-extrabold text-lg shadow-lg flex items-baseline gap-1">
                    <span className="text-xs text-brand-teal font-normal">PHP</span>
                    <span>₱{service.price.toLocaleString()}</span>
                  </div>

                  {/* Duration Tag pinned to bottom left of photo */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md text-white/90 text-xs font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-teal-light" />
                    <span>{service.durationMinutes} mins</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-teal transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-teal/15 flex items-center justify-between">
                    <div className="text-xs text-slate-500 font-medium">
                      Immediate slot confirmation
                    </div>

                    <button
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-brand-teal to-[#018b7c] hover:from-[#008f7f] hover:to-[#007468] shadow-md hover:shadow-brand-teal/20 transition-all duration-200 flex items-center gap-1.5 transform active:scale-95"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Notice */}
        <div className="mt-16 glass-panel p-6 sm:p-8 rounded-3xl border border-brand-teal/20 text-center max-w-2xl mx-auto shadow-glass">
          <h4 className="text-lg font-bold text-slate-800">
            Looking for group pamper parties or custom nail art?
          </h4>
          <p className="text-sm text-slate-600 mt-1">
            We host bridal showers, birthdays, and corporate retreats. Simply book an appointment or give us a quick call.
          </p>
        </div>
      </div>
    </section>
  );
};
