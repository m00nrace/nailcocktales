export type ServiceCategory = 
  | 'hand-spa' 
  | 'foot-spa' 
  | 'packages' 
  | 'nail-art' 
  | 'enhancements';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  durationMinutes: number;
  imageUrl: string;
  featured?: boolean;
  popular?: boolean;
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  referenceNumber: string; // e.g. NC-729143
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceIds: string[];
  servicesSummary: string;
  totalPrice: number;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm format, e.g. 14:00
  specialRequests?: string;
  status: BookingStatus;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  notified24h?: boolean;
  notified4h?: boolean;
}

export interface SalonSocialLinks {
  facebook: string;
  instagram: string;
  tiktok: string;
  whatsapp?: string;
  twitter?: string;
}

export interface SalonConfig {
  salonName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  socialLinks: SalonSocialLinks;
  reminderSettings: {
    alert24h: boolean;
    alert4h: boolean;
  };
}

export type NotificationType = 'cancellation' | 'reminder-24h' | 'reminder-4h' | 'new-booking';

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  bookingReference: string;
  bookingId: string;
  createdAt: string;
  read: boolean;
  urgent: boolean;
}

export interface AdminUser {
  email: string;
  name: string;
  avatarUrl: string;
  role: 'owner' | 'admin';
}
