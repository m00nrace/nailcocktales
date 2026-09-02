import type { Service, Booking, SalonConfig, AdminNotification, AdminUser } from '../types';

const STORAGE_KEYS = {
  SERVICES: 'nc_services',
  BOOKINGS: 'nc_bookings',
  CONFIG: 'nc_salon_config',
  NOTIFICATIONS: 'nc_notifications',
  ADMIN_USER: 'nc_admin_user',
};

// Curated high quality default spa imagery
const DEFAULT_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Cosmopolitan Classic Manicure',
    category: 'hand-spa',
    description: 'Nail shaping, gentle cuticle care, light hand massage, and long-lasting glossy polish finish.',
    price: 380,
    durationMinutes: 45,
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: true,
  },
  {
    id: 'srv-2',
    name: 'Margarita Citrus Hand Spa & Scrub',
    category: 'hand-spa',
    description: 'Refreshing citrus botanical salt scrub, deep moisturizing mask, warm towel wrap, and rejuvenating hand reflexology.',
    price: 550,
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf7851c8528b?auto=format&fit=crop&w=800&q=80',
    featured: false,
    popular: true,
  },
  {
    id: 'srv-3',
    name: 'Mojito Peppermint Pedicure',
    category: 'foot-spa',
    description: 'Invigorating mint foot soak, exfoliating pumice treatment, nail shaping, cuticle therapy, and foot massage.',
    price: 480,
    durationMinutes: 50,
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: true,
  },
  {
    id: 'srv-4',
    name: 'Piña Colada Deluxe Foot Spa & Scrub',
    category: 'foot-spa',
    description: 'Coconut-infused milk soak, intensive dead-skin removal, tropical scrub, detoxifying clay wrap, and soothing calves massage.',
    price: 680,
    durationMinutes: 70,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: false,
  },
  {
    id: 'srv-5',
    name: 'Signature NailCocktales Royal Pamper Duo',
    category: 'packages',
    description: 'The premier salon experience: Complete Hand & Foot Spa with warm paraffin treatment, gel polish for hands & feet, and complimentary spa mocktail.',
    price: 1350,
    durationMinutes: 120,
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    featured: true,
    popular: true,
  },
  {
    id: 'srv-6',
    name: 'Sangria Luxury Gel Polish Overlay',
    category: 'enhancements',
    description: 'High-shine, zero-dry-time chip resistant gel polish cured under LED, fortified with keratin base coat.',
    price: 750,
    durationMinutes: 50,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    featured: false,
    popular: true,
  },
  {
    id: 'srv-7',
    name: 'Cocktail Ombré & French Nail Art',
    category: 'nail-art',
    description: 'Delicate gradient ombré, elegant French tip designs, chrome glaze, or hand-painted accent art on all nails.',
    price: 450,
    durationMinutes: 40,
    imageUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
    featured: false,
    popular: false,
  },
  {
    id: 'srv-8',
    name: 'Warm Velvet Paraffin Hand Treatment',
    category: 'hand-spa',
    description: 'Deep therapeutic warm peach paraffin wax wrap to soothe joints, soften calluses, and deeply hydrate skin.',
    price: 390,
    durationMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    featured: false,
    popular: false,
  }
];

const DEFAULT_CONFIG: SalonConfig = {
  salonName: 'NailCocktales Hand and Foot Spa',
  tagline: 'Sip, Relax & Pamper in Cocktail-Themed Luxury',
  phone: '+63 (02) 8876-5432 / +63 917 555 2625',
  email: 'concierge@nailcocktales.com',
  address: '2nd Floor, Grand Atrium, Tomas Morato Ave, Quezon City, Metro Manila',
  businessHours: 'Monday to Sunday: 10:00 AM - 9:00 PM',
  socialLinks: {
    facebook: 'https://facebook.com/NailCocktalesOfficial',
    instagram: 'https://instagram.com/NailCocktalesSpa',
    tiktok: 'https://tiktok.com/@nailcocktales',
    whatsapp: '+639175552625',
  },
  reminderSettings: {
    alert24h: true,
    alert4h: true,
  },
};

// Seed sample bookings relative to current time for realistic demonstration
const generateInitialBookings = (): Booking[] => {
  const now = new Date();
  
  // Today + 2 hours (Urgent 4h reminder demo)
  const todayIn2Hours = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const todayStr = todayIn2Hours.toISOString().split('T')[0];
  const timeStr4h = `${String(todayIn2Hours.getHours()).padStart(2, '0')}:00`;

  // Tomorrow (24h reminder demo)
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Day after tomorrow
  const in3Days = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const in3DaysStr = in3Days.toISOString().split('T')[0];

  return [
    {
      id: 'b-101',
      referenceNumber: 'NC-892410',
      customerName: 'Patricia Danielle Cruz',
      customerPhone: '+63 917 894 1234',
      customerEmail: 'patricia.cruz@gmail.com',
      serviceIds: ['srv-5'],
      servicesSummary: 'Signature NailCocktales Royal Pamper Duo',
      totalPrice: 1350,
      appointmentDate: todayStr,
      appointmentTime: timeStr4h,
      specialRequests: 'Prefers lavender scented scrub and quiet relaxing vibe.',
      status: 'confirmed',
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'b-102',
      referenceNumber: 'NC-451298',
      customerName: 'Camille Bianca Reyes',
      customerPhone: '+63 928 345 6789',
      customerEmail: 'bianca.reyes@yahoo.com',
      serviceIds: ['srv-3', 'srv-6'],
      servicesSummary: 'Mojito Peppermint Pedicure + Sangria Luxury Gel Polish Overlay',
      totalPrice: 1230,
      appointmentDate: tomorrowStr,
      appointmentTime: '15:30',
      specialRequests: 'Celebrating birthday, would love nail art accent if time permits!',
      status: 'confirmed',
      createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'b-103',
      referenceNumber: 'NC-673109',
      customerName: 'Alyssa Marie Mendoza',
      customerPhone: '+63 919 444 8821',
      customerEmail: 'alyssa.mendoza@gmail.com',
      serviceIds: ['srv-1', 'srv-4'],
      servicesSummary: 'Cosmopolitan Classic Manicure + Piña Colada Deluxe Foot Spa',
      totalPrice: 1060,
      appointmentDate: in3DaysStr,
      appointmentTime: '11:00',
      status: 'pending',
      createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'b-104',
      referenceNumber: 'NC-182736',
      customerName: 'Stephanie Grace Tan',
      customerPhone: '+63 915 222 7654',
      customerEmail: 'stephanie.tan@gmail.com',
      serviceIds: ['srv-2'],
      servicesSummary: 'Margarita Citrus Hand Spa & Scrub',
      totalPrice: 550,
      appointmentDate: todayStr,
      appointmentTime: '17:00',
      status: 'cancelled',
      cancellationReason: 'Emergency family commitment came up suddenly. Will reschedule next week.',
      cancelledAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      createdAt: new Date(now.getTime() - 20 * 60 * 60 * 1000).toISOString(),
    }
  ];
};

export const storage = {
  // Services
  getServices: (): Service[] => {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_SERVICES;
    }
  },

  saveService: (service: Service): Service[] => {
    const services = storage.getServices();
    const existingIndex = services.findIndex(s => s.id === service.id);
    let updated: Service[];
    if (existingIndex >= 0) {
      updated = [...services];
      updated[existingIndex] = service;
    } else {
      updated = [service, ...services];
    }
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
    return updated;
  },

  deleteService: (id: string): Service[] => {
    const services = storage.getServices();
    const updated = services.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
    return updated;
  },

  resetDefaultServices: (): Service[] => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
    return DEFAULT_SERVICES;
  },

  // Bookings
  getBookings: (): Booking[] => {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      const initial = generateInitialBookings();
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  getBookingByReference: (ref: string): Booking | null => {
    const cleanRef = ref.trim().toUpperCase();
    const bookings = storage.getBookings();
    return bookings.find(b => b.referenceNumber.toUpperCase() === cleanRef) || null;
  },

  createBooking: (data: Omit<Booking, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Booking => {
    const bookings = storage.getBookings();
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const referenceNumber = `NC-${randomSuffix}`;
    const newBooking: Booking = {
      ...data,
      id: `b-${Date.now()}`,
      referenceNumber,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    const updated = [newBooking, ...bookings];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));

    // Emit notification
    storage.addNotification({
      type: 'new-booking',
      title: 'New Spa Appointment Booked',
      message: `${newBooking.customerName} has booked ${newBooking.servicesSummary} for ${newBooking.appointmentDate} at ${newBooking.appointmentTime}.`,
      bookingReference: newBooking.referenceNumber,
      bookingId: newBooking.id,
      urgent: false,
    });

    return newBooking;
  },

  cancelBooking: (referenceNumber: string, reason: string): Booking | null => {
    const bookings = storage.getBookings();
    const cleanRef = referenceNumber.trim().toUpperCase();
    const index = bookings.findIndex(b => b.referenceNumber.toUpperCase() === cleanRef);
    if (index === -1) return null;

    const target = bookings[index];
    const updatedBooking: Booking = {
      ...target,
      status: 'cancelled',
      cancellationReason: reason || 'Customer requested cancellation online.',
      cancelledAt: new Date().toISOString(),
    };

    const updatedList = [...bookings];
    updatedList[index] = updatedBooking;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedList));

    // Create high-priority cancellation notification for Admin/Owner
    storage.addNotification({
      type: 'cancellation',
      title: `Booking Cancelled: ${updatedBooking.customerName}`,
      message: `Customer cancelled appointment [${updatedBooking.referenceNumber}] scheduled for ${updatedBooking.appointmentDate} at ${updatedBooking.appointmentTime}. Reason: "${updatedBooking.cancellationReason}"`,
      bookingReference: updatedBooking.referenceNumber,
      bookingId: updatedBooking.id,
      urgent: true,
    });

    return updatedBooking;
  },

  updateBookingStatus: (id: string, status: Booking['status']): Booking | null => {
    const bookings = storage.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return null;

    const updatedBooking: Booking = {
      ...bookings[index],
      status,
    };
    const updatedList = [...bookings];
    updatedList[index] = updatedBooking;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updatedList));
    return updatedBooking;
  },

  // Salon Configuration
  getSalonConfig: (): SalonConfig => {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_CONFIG));
      return DEFAULT_CONFIG;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_CONFIG;
    }
  },

  saveSalonConfig: (config: SalonConfig): SalonConfig => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    return config;
  },

  // Notifications
  getNotifications: (): AdminNotification[] => {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      // Create initial seed notifications for demo
      const initial: AdminNotification[] = [
        {
          id: 'notif-1',
          type: 'reminder-4h',
          title: 'Upcoming in 2 Hours!',
          message: 'Patricia Danielle Cruz has a booking for Signature Royal Pamper Duo today at ' +
            `${new Date(Date.now() + 2 * 3600000).getHours()}:00.`,
          bookingReference: 'NC-892410',
          bookingId: 'b-101',
          createdAt: new Date().toISOString(),
          read: false,
          urgent: true,
        },
        {
          id: 'notif-2',
          type: 'reminder-24h',
          title: '1 Day Before: Tomorrow Appointment',
          message: 'Camille Bianca Reyes is booked tomorrow at 15:30 (Mojito Pedicure + Gel Overlay).',
          bookingReference: 'NC-451298',
          bookingId: 'b-102',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          read: false,
          urgent: false,
        },
        {
          id: 'notif-3',
          type: 'cancellation',
          title: 'Customer Cancellation Notice',
          message: 'Stephanie Grace Tan cancelled booking NC-182736. Reason: "Emergency family commitment".',
          bookingReference: 'NC-182736',
          bookingId: 'b-104',
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          read: false,
          urgent: true,
        }
      ];
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  addNotification: (item: Omit<AdminNotification, 'id' | 'createdAt' | 'read'>): AdminNotification => {
    const notifs = storage.getNotifications();
    const newNotif: AdminNotification = {
      ...item,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated = [newNotif, ...notifs];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return newNotif;
  },

  markNotificationRead: (id: string) => {
    const notifs = storage.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  },

  markAllNotificationsRead: () => {
    const notifs = storage.getNotifications();
    const updated = notifs.map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  },

  // Check upcoming bookings to automatically generate 24h & 4h alerts
  checkAndTriggerUpcomingReminders: (): AdminNotification[] => {
    const bookings = storage.getBookings();
    const config = storage.getSalonConfig();
    const now = new Date();
    const nowMs = now.getTime();

    let notifs = storage.getNotifications();
    let hasChanges = false;

    bookings.forEach(booking => {
      if (booking.status !== 'confirmed') return;

      const [hours, minutes] = booking.appointmentTime.split(':').map(Number);
      const appDate = new Date(booking.appointmentDate);
      appDate.setHours(hours || 10, minutes || 0, 0, 0);

      const diffMs = appDate.getTime() - nowMs;
      const diffHours = diffMs / (1000 * 60 * 60);

      // 4 Hours Reminder Trigger (0 to 4 hours in the future)
      if (config.reminderSettings.alert4h && diffHours > 0 && diffHours <= 4) {
        const alreadyExists = notifs.some(n => n.bookingId === booking.id && n.type === 'reminder-4h');
        if (!alreadyExists) {
          const newNotif: AdminNotification = {
            id: `notif-4h-${booking.id}`,
            type: 'reminder-4h',
            title: `⏰ Urgent Reminder: Appointment in ${Math.round(diffHours)}h!`,
            message: `${booking.customerName} is arriving today at ${booking.appointmentTime} for ${booking.servicesSummary}. Phone: ${booking.customerPhone}`,
            bookingReference: booking.referenceNumber,
            bookingId: booking.id,
            createdAt: new Date().toISOString(),
            read: false,
            urgent: true,
          };
          notifs = [newNotif, ...notifs];
          hasChanges = true;
        }
      }

      // 1 Day Before (24h) Reminder Trigger (18 to 26 hours in the future)
      if (config.reminderSettings.alert24h && diffHours > 4 && diffHours <= 26) {
        const alreadyExists = notifs.some(n => n.bookingId === booking.id && n.type === 'reminder-24h');
        if (!alreadyExists) {
          const newNotif: AdminNotification = {
            id: `notif-24h-${booking.id}`,
            type: 'reminder-24h',
            title: `📅 1-Day Reminder: Appointment Tomorrow`,
            message: `${booking.customerName} has an appointment tomorrow (${booking.appointmentDate}) at ${booking.appointmentTime}. Total: ₱${booking.totalPrice.toLocaleString()}`,
            bookingReference: booking.referenceNumber,
            bookingId: booking.id,
            createdAt: new Date().toISOString(),
            read: false,
            urgent: false,
          };
          notifs = [newNotif, ...notifs];
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    }

    return notifs;
  },

  // Auth
  getAdminUser: (): AdminUser | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setAdminUser: (user: AdminUser) => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(user));
  },

  logoutAdmin: () => {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
  }
};
