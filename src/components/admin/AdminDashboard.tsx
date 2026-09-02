import React, { useState, useEffect } from 'react';
import type { Service, Booking, SalonConfig, AdminNotification, AdminUser } from '../../types';
import { storage } from '../../services/storage';
import { BrandLogo } from '../common/BrandLogo';
import { CalendarView } from './CalendarView';
import { ServicesManager } from './ServicesManager';
import { SalonSettings } from './SalonSettings';
import { BookingsManager } from './BookingsManager';
import { NotificationDrawer } from './NotificationDrawer';
import {
  Calendar,
  Sparkles,
  Settings,
  ListOrdered,
  Bell,
  LogOut,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
  onSwitchToLanding: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onLogout,
  onSwitchToLanding,
}) => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'services' | 'bookings' | 'settings'>('calendar');
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [config, setConfig] = useState<SalonConfig>(storage.getSalonConfig());
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [selectedBookingForCalendar, setSelectedBookingForCalendar] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load initial data & trigger reminder check
  const refreshData = () => {
    setServices(storage.getServices());
    setBookings(storage.getBookings());
    setConfig(storage.getSalonConfig());
    const notifs = storage.checkAndTriggerUpcomingReminders();
    setNotifications(notifs);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.urgent && !n.read).length;

  // Stats
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookingsCount = bookings.filter(b => b.appointmentDate === todayStr && b.status !== 'cancelled').length;
  const cancellationCount = bookings.filter(b => b.status === 'cancelled').length;

  const handleCopyCustomerLink = () => {
    const url = `${window.location.origin}/#book`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Actions
  const handleSaveService = (service: Service) => {
    const updated = storage.saveService(service);
    setServices(updated);
  };

  const handleDeleteService = (id: string) => {
    const updated = storage.deleteService(id);
    setServices(updated);
  };

  const handleResetDefaultServices = () => {
    if (confirm('Reset services to factory defaults? Any custom added services will be cleared.')) {
      const updated = storage.resetDefaultServices();
      setServices(updated);
    }
  };

  const handleSaveConfig = (newConfig: SalonConfig) => {
    const updated = storage.saveSalonConfig(newConfig);
    setConfig(updated);
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    storage.updateBookingStatus(id, status);
    refreshData();
  };

  const handleSelectBookingFromNotif = (ref: string) => {
    setSelectedBookingForCalendar(ref);
    setActiveTab('calendar');
    setIsNotifDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F8F5] via-[#DDF4F0] to-[#EAF9F6] text-slate-800 flex flex-col">
      {/* Top Navbar */}
      <header className="glass-panel border-b border-brand-teal/20 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" showSubtitle={false} />
            <div className="hidden sm:block border-l border-brand-teal/20 pl-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-teal-dark block">
                Owner & Admin Portal
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {config.salonName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Copy Public Customer Link Button */}
            <button
              onClick={handleCopyCustomerLink}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/80 hover:bg-white text-slate-700 border border-brand-teal/20 shadow-xs transition-all"
              title="Copy Customer Landing Page Link to share with clients"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-brand-teal" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Customer Link'}</span>
            </button>

            {/* Visit Customer Landing Page */}
            <button
              onClick={onSwitchToLanding}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/80 hover:bg-white text-brand-teal border border-brand-teal/20 shadow-xs transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Landing Page</span>
            </button>

            {/* Notification Bell with Badge */}
            <button
              onClick={() => setIsNotifDrawerOpen(true)}
              className="relative p-2.5 rounded-xl glass-panel text-slate-700 hover:text-brand-teal hover:bg-white border border-brand-teal/20 transition-all"
              title="Open Notification Center"
            >
              <Bell className="w-5 h-5 text-brand-teal" />
              {unreadNotifCount > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full text-white text-[10px] font-bold flex items-center justify-center ${
                  urgentCount > 0 ? 'bg-rose-500 animate-pulse' : 'bg-brand-teal'
                }`}>
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Admin Profile & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-bold text-slate-800 leading-none">{user.name}</p>
                <span className="text-[10px] text-brand-teal font-semibold uppercase">{user.role}</span>
              </div>
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-brand-teal object-cover shadow-xs"
              />
              <button
                onClick={onLogout}
                title="Sign out"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/80 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-2xl bg-brand-teal/15 text-brand-teal">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Today's Bookings</span>
              <h3 className="text-2xl font-black text-slate-800">{todayBookingsCount}</h3>
            </div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/80 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">4h Urgent Alerts</span>
              <h3 className="text-2xl font-black text-amber-600">
                {notifications.filter(n => n.type === 'reminder-4h' && !n.read).length}
              </h3>
            </div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/80 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-2xl bg-brand-mocha/15 text-brand-mocha">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Confirmed Revenue</span>
              <h3 className="text-2xl font-black text-brand-mocha">₱{totalRevenue.toLocaleString()}</h3>
            </div>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-white/80 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cancellations</span>
              <h3 className="text-2xl font-black text-rose-600">{cancellationCount}</h3>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="glass-panel p-1.5 rounded-2xl border border-white/80 inline-flex items-center gap-1 shadow-xs max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'bg-brand-teal text-white shadow-sm'
                : 'text-slate-600 hover:text-brand-teal hover:bg-white/80'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointment Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'services'
                ? 'bg-brand-teal text-white shadow-sm'
                : 'text-slate-600 hover:text-brand-teal hover:bg-white/80'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Services & Pricing ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-brand-teal text-white shadow-sm'
                : 'text-slate-600 hover:text-brand-teal hover:bg-white/80'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>All Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-brand-teal text-white shadow-sm'
                : 'text-slate-600 hover:text-brand-teal hover:bg-white/80'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Salon & Socials Settings</span>
          </button>
        </div>

        {/* Active Tab Content */}
        <div>
          {activeTab === 'calendar' && (
            <CalendarView
              bookings={bookings}
              onUpdateStatus={handleUpdateBookingStatus}
              selectedBookingRef={selectedBookingForCalendar}
            />
          )}

          {activeTab === 'services' && (
            <ServicesManager
              services={services}
              onSaveService={handleSaveService}
              onDeleteService={handleDeleteService}
              onResetDefaults={handleResetDefaultServices}
            />
          )}

          {activeTab === 'bookings' && (
            <BookingsManager
              bookings={bookings}
              onUpdateStatus={handleUpdateBookingStatus}
              onInspectBooking={(ref) => {
                setSelectedBookingForCalendar(ref);
                setActiveTab('calendar');
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SalonSettings
              config={config}
              onSaveConfig={handleSaveConfig}
              onSwitchToLanding={onSwitchToLanding}
            />
          )}
        </div>
      </main>

      {/* Notification Drawer Component */}
      <NotificationDrawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        notifications={notifications}
        onMarkRead={(id) => {
          const updated = storage.markNotificationRead(id);
          setNotifications(updated);
        }}
        onMarkAllRead={() => {
          const updated = storage.markAllNotificationsRead();
          setNotifications(updated);
        }}
        onSelectBooking={handleSelectBookingFromNotif}
      />
    </div>
  );
};
