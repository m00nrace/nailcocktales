import React from 'react';
import type { SalonConfig } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { FacebookIcon, InstagramIcon, TikTokIcon } from '../common/SocialIcons';
import { Phone, Mail, MapPin, Clock, Shield, MessageCircle } from 'lucide-react';

interface FooterProps {
  salonConfig: SalonConfig;
  onSwitchToAdmin: () => void;
  onOpenBooking: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  salonConfig,
  onSwitchToAdmin,
  onOpenBooking,
  onOpenTracking,
}) => {
  return (
    <footer id="contact" className="relative pt-16 pb-12 mt-20 border-t border-brand-teal/20 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <BrandLogo size="md" showSubtitle={true} showScriptPriceList={false} />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
              {salonConfig.tagline || 'Sip, Relax & Pamper in Cocktail-Themed Luxury. Hand & Foot Spa sanctuary crafted for your rejuvenation.'}
            </p>

            {/* Social Media Icons (Configured dynamically in Admin) */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-brand-mocha block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {salonConfig.socialLinks.facebook && (
                  <a
                    href={salonConfig.socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="p-2.5 rounded-xl glass-panel text-slate-700 hover:text-brand-teal hover:bg-white hover:scale-110 transition-all border border-brand-teal/20 shadow-xs"
                  >
                    <FacebookIcon className="w-4 h-4 text-blue-600" />
                  </a>
                )}

                {salonConfig.socialLinks.instagram && (
                  <a
                    href={salonConfig.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="p-2.5 rounded-xl glass-panel text-slate-700 hover:text-brand-coral hover:bg-white hover:scale-110 transition-all border border-brand-teal/20 shadow-xs"
                  >
                    <InstagramIcon className="w-4 h-4 text-pink-600" />
                  </a>
                )}

                {salonConfig.socialLinks.tiktok && (
                  <a
                    href={salonConfig.socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok"
                    className="p-2.5 rounded-xl glass-panel text-slate-700 hover:text-slate-900 hover:bg-white hover:scale-110 transition-all border border-brand-teal/20 shadow-xs"
                  >
                    <TikTokIcon className="w-4 h-4" />
                  </a>
                )}

                {salonConfig.socialLinks.whatsapp && (
                  <a
                    href={`https://wa.me/${salonConfig.socialLinks.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="p-2.5 rounded-xl glass-panel text-slate-700 hover:text-emerald-600 hover:bg-white hover:scale-110 transition-all border border-brand-teal/20 shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              <li>
                <a href="#services" className="hover:text-brand-teal transition-colors">
                  Services & Price List
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-brand-teal transition-colors">
                  The Spa Lounge Experience
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-brand-teal transition-colors">
                  Book An Appointment
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-brand-teal transition-colors text-brand-mocha font-bold">
                  Track My Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Salon Hours & Booking Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Operating Hours
            </h4>
            <div className="glass-panel p-3.5 rounded-2xl space-y-2 text-xs text-slate-600 border border-white/80">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800">Salon Schedule</p>
                  <p className="text-slate-600 mt-0.5">{salonConfig.businessHours}</p>
                </div>
              </div>
              <p className="text-[11px] text-brand-teal-dark font-medium pt-1 border-t border-slate-200">
                Walk-ins welcome based on therapist availability. Online booking guarantees your seat.
              </p>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Salon Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <span>{salonConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                <span>{salonConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                <span className="truncate">{salonConfig.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Access */}
        <div className="mt-12 pt-6 border-t border-brand-teal/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NailCocktales Hand and Foot Spa. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">|</span>
            <button
              onClick={onSwitchToAdmin}
              className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-brand-teal transition-colors py-1 px-2.5 rounded-lg hover:bg-white/60"
            >
              <Shield className="w-3.5 h-3.5 text-brand-teal" />
              <span>Owner & Admin Portal Sign-In</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
