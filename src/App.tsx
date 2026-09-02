import { useState, useEffect } from 'react';
import { Header } from './components/landing/Header';
import { Hero } from './components/landing/Hero';
import { ServicesPriceList } from './components/landing/ServicesPriceList';
import { SpaExperience } from './components/landing/SpaExperience';
import { Footer } from './components/landing/Footer';
import { BookingModal } from './components/landing/BookingModal';
import { TrackBookingModal } from './components/landing/TrackBookingModal';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { storage } from './services/storage';
import type { Service, SalonConfig, AdminUser } from './types';

export function App() {
  const [view, setView] = useState<'landing' | 'admin-login' | 'admin-dashboard'>('landing');
  const [services, setServices] = useState<Service[]>(storage.getServices());
  const [salonConfig, setSalonConfig] = useState<SalonConfig>(storage.getSalonConfig());
  const [adminUser, setAdminUser] = useState<AdminUser | null>(storage.getAdminUser());

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  // Check URL hash for direct navigation, e.g. #admin or #book or #track
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#admin')) {
        const currentAdmin = storage.getAdminUser();
        if (currentAdmin) {
          setAdminUser(currentAdmin);
          setView('admin-dashboard');
        } else {
          setView('admin-login');
        }
      } else if (hash === '#book') {
        setView('landing');
        setIsBookingOpen(true);
      } else if (hash === '#track') {
        setView('landing');
        setIsTrackOpen(true);
      } else {
        setView('landing');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const refreshAppData = () => {
    setServices(storage.getServices());
    setSalonConfig(storage.getSalonConfig());
  };

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setView('admin-dashboard');
    window.location.hash = '#admin';
  };

  const handleLogout = () => {
    storage.logoutAdmin();
    setAdminUser(null);
    setView('admin-login');
  };

  const handleSwitchToLanding = () => {
    setView('landing');
    window.location.hash = '';
    refreshAppData();
  };

  const handleSwitchToAdmin = () => {
    const user = storage.getAdminUser();
    if (user) {
      setAdminUser(user);
      setView('admin-dashboard');
    } else {
      setView('admin-login');
    }
    window.location.hash = '#admin';
  };

  return (
    <div className="min-h-screen relative text-slate-800">
      {/* View routing */}
      {view === 'admin-login' ? (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={handleSwitchToLanding}
        />
      ) : view === 'admin-dashboard' && adminUser ? (
        <AdminDashboard
          user={adminUser}
          onLogout={handleLogout}
          onSwitchToLanding={handleSwitchToLanding}
        />
      ) : (
        /* Customer Landing Page View */
        <div className="flex flex-col min-h-screen">
          <Header
            salonConfig={salonConfig}
            onOpenBooking={handleOpenBooking}
            onOpenTracking={() => setIsTrackOpen(true)}
            onSwitchToAdmin={handleSwitchToAdmin}
          />

          <main className="flex-1">
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onOpenTracking={() => setIsTrackOpen(true)}
            />

            <ServicesPriceList
              services={services}
              onSelectServiceForBooking={handleOpenBooking}
            />

            <SpaExperience />
          </main>

          <Footer
            salonConfig={salonConfig}
            onSwitchToAdmin={handleSwitchToAdmin}
            onOpenBooking={() => handleOpenBooking()}
            onOpenTracking={() => setIsTrackOpen(true)}
          />

          {/* Customer Booking Modal (No login required) */}
          <BookingModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            services={services}
            preselectedServiceId={preselectedServiceId}
            onBookingSuccess={() => {
              refreshAppData();
            }}
          />

          {/* Customer Track Booking & Self-Cancellation Modal */}
          <TrackBookingModal
            isOpen={isTrackOpen}
            onClose={() => setIsTrackOpen(false)}
            onBookingCancelled={() => {
              refreshAppData();
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
