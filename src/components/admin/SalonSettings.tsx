import React, { useState } from 'react';
import type { SalonConfig } from '../../types';
import { FacebookIcon, InstagramIcon, TikTokIcon } from '../common/SocialIcons';
import { Phone, Save, Copy, Check, ExternalLink, Bell, Sparkles } from 'lucide-react';

interface SalonSettingsProps {
  config: SalonConfig;
  onSaveConfig: (newConfig: SalonConfig) => void;
  onSwitchToLanding: () => void;
}

export const SalonSettings: React.FC<SalonSettingsProps> = ({
  config,
  onSaveConfig,
  onSwitchToLanding,
}) => {
  const [formData, setFormData] = useState<SalonConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Get current origin or fallback
  const landingPageUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/#book`
    : 'https://nailcocktales.com';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(landingPageUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Customer Landing Page Share Card */}
      <div className="glass-panel-teal p-6 rounded-3xl border border-brand-teal/30 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-teal-dark">
              Customer Booking Portal
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-0.5">
              Public Customer Landing Page Link
            </h3>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              Share this dedicated link with your clients via Instagram bio, Facebook, or SMS. Customers only see the booking form and cannot access admin settings.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-teal hover:bg-brand-teal-dark shadow-sm flex items-center gap-1.5 transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Customer Link'}</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToLanding}
              className="p-2.5 rounded-xl text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-sm transition-all"
              title="Preview Customer Landing Page"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 p-2.5 rounded-xl bg-white/70 border border-brand-teal/20 text-xs font-mono text-slate-600 break-all">
          {landingPageUrl}
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Salon Details */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-teal/20">
            <Sparkles className="w-5 h-5 text-brand-teal" />
            <h3 className="text-base font-bold text-slate-800">
              Salon Profile & Contact Info
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Salon Name
              </label>
              <input
                type="text"
                value={formData.salonName}
                onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Contact Phone Number(s)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Concierge Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Branch Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Operating Schedule & Business Hours
              </label>
              <input
                type="text"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links Configuration */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-teal/20">
            <div className="flex items-center gap-2">
              <InstagramIcon className="w-5 h-5 text-brand-coral" />
              <h3 className="text-base font-bold text-slate-800">
                Social Media Links (Landing Page Icons)
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">Configures live icons in footer</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <FacebookIcon className="w-4 h-4 text-blue-600" />
                <span>Facebook Page URL</span>
              </label>
              <input
                type="url"
                placeholder="https://facebook.com/NailCocktales"
                value={formData.socialLinks.facebook}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <InstagramIcon className="w-4 h-4 text-pink-600" />
                <span>Instagram Profile URL</span>
              </label>
              <input
                type="url"
                placeholder="https://instagram.com/NailCocktales"
                value={formData.socialLinks.instagram}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <TikTokIcon className="w-4 h-4 text-slate-800" />
                <span>TikTok Profile URL</span>
              </label>
              <input
                type="url"
                placeholder="https://tiktok.com/@nailcocktales"
                value={formData.socialLinks.tiktok}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, tiktok: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Number</span>
              </label>
              <input
                type="text"
                placeholder="+639175552625"
                value={formData.socialLinks.whatsapp || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  socialLinks: { ...formData.socialLinks, whatsapp: e.target.value }
                })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Automated Notification Settings */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/80 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-brand-teal/20">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-800">
              Automated Admin Reminders & Notifications
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-slate-200 cursor-pointer hover:bg-white transition-all">
              <input
                type="checkbox"
                checked={formData.reminderSettings.alert24h}
                onChange={(e) => setFormData({
                  ...formData,
                  reminderSettings: { ...formData.reminderSettings, alert24h: e.target.checked }
                })}
                className="mt-1 rounded text-brand-teal focus:ring-brand-teal"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  1 Day Before (24 Hours) Notification Alert
                </span>
                <span className="text-[11px] text-slate-500">
                  Automatically alert owner/staff 24 hours prior to scheduled client bookings so salon supplies and stations can be prepared.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/70 border border-slate-200 cursor-pointer hover:bg-white transition-all">
              <input
                type="checkbox"
                checked={formData.reminderSettings.alert4h}
                onChange={(e) => setFormData({
                  ...formData,
                  reminderSettings: { ...formData.reminderSettings, alert4h: e.target.checked }
                })}
                className="mt-1 rounded text-brand-teal focus:ring-brand-teal"
              />
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  4 Hours Before Urgent Notification Alert
                </span>
                <span className="text-[11px] text-slate-500">
                  Display high-priority alert badge 4 hours before customer arrival to confirm technician readiness.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Submit & Status Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Salon Settings saved successfully!</span>
            </div>
          ) : <div />}

          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-teal hover:bg-brand-teal-dark shadow-md flex items-center gap-2 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
