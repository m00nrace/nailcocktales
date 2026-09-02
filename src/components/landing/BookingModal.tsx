import React, { useState, useEffect } from 'react';
import type { Service, Booking } from '../../types';
import { storage } from '../../services/storage';
import { X, Calendar, Clock, User, Phone, Mail, Check, Sparkles, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  preselectedServiceId?: string;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  preselectedServiceId,
  onBookingSuccess,
}) => {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('11:00');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Default to tomorrow or today
  useEffect(() => {
    if (isOpen) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setAppointmentDate(tomorrow.toISOString().split('T')[0]);

      if (preselectedServiceId && services.some(s => s.id === preselectedServiceId)) {
        setSelectedServiceIds([preselectedServiceId]);
      } else if (services.length > 0 && selectedServiceIds.length === 0) {
        setSelectedServiceIds([services[0].id]);
      }
      setConfirmedBooking(null);
      setErrorMsg('');
    }
  }, [isOpen, preselectedServiceId, services]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServiceIds.includes(id)) {
      if (selectedServiceIds.length > 1) {
        setSelectedServiceIds(selectedServiceIds.filter(item => item !== id));
      }
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  const selectedServices = services.filter(s => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const availableTimeSlots = [
    '10:00', '11:00', '12:00', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServiceIds.length === 0) {
      setErrorMsg('Please select at least one spa service.');
      return;
    }
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg('Please enter your contact mobile number.');
      return;
    }
    if (!customerEmail.trim()) {
      setErrorMsg('Please enter your email address for your confirmation.');
      return;
    }

    const servicesSummary = selectedServices.map(s => s.name).join(' + ');

    const newBooking = storage.createBooking({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      serviceIds: selectedServiceIds,
      servicesSummary,
      totalPrice,
      appointmentDate,
      appointmentTime,
      specialRequests: specialRequests.trim() || undefined,
    });

    setConfirmedBooking(newBooking);
    onBookingSuccess(newBooking);

    // Launch celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A896', '#5C3D2E', '#FF4D6D', '#B8EADF'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleCopyRef = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/90 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-teal/20 flex items-center justify-between bg-white/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-teal/15 text-brand-teal">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                {confirmedBooking ? 'Booking Confirmed!' : 'Book Your Pampering'}
              </h3>
              <p className="text-xs text-slate-500">
                {confirmedBooking ? 'Your appointment is safely reserved' : 'Fast & easy — no customer account required'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-brand-teal">Reservation Complete</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
                We Can't Wait to Pamper You!
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-800">{confirmedBooking.customerName}</span>! Your appointment has been successfully recorded.
              </p>
            </div>

            {/* Prominent Unique Reference Code Box */}
            <div className="glass-panel-teal p-6 rounded-2xl max-w-md mx-auto border border-brand-teal/30 shadow-md">
              <div className="text-xs uppercase font-bold text-brand-teal-dark tracking-wider mb-1">
                Your Unique Booking Reference Number
              </div>
              <div className="text-3xl sm:text-4xl font-black text-brand-mocha tracking-wider my-2 font-mono">
                {confirmedBooking.referenceNumber}
              </div>

              <button
                onClick={handleCopyRef}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-slate-700 hover:text-brand-teal shadow-sm border border-brand-teal/20 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-brand-teal" />}
                <span>{copied ? 'Reference Code Copied!' : 'Copy Reference Code'}</span>
              </button>
            </div>

            {/* Appointment Details Summary Card */}
            <div className="glass-panel p-5 rounded-2xl text-left max-w-md mx-auto space-y-3 text-sm border border-white/80">
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-teal" /> Date:</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.appointmentDate}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-teal" /> Time:</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.appointmentTime}</span>
              </div>
              <div className="flex justify-between items-start text-slate-600 pt-2 border-t border-slate-200">
                <span>Selected Services:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[220px]">
                  {confirmedBooking.servicesSummary}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-800 pt-2 border-t border-slate-200 font-bold">
                <span>Total Amount:</span>
                <span className="text-brand-teal text-base">₱{confirmedBooking.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Helpful Notice */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs text-amber-900 max-w-md mx-auto text-left flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Need to modify or cancel?</strong> Simply visit our website anytime, click <strong>Track Booking</strong>, and enter your reference code <strong>{confirmedBooking.referenceNumber}</strong>.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold text-white bg-brand-teal hover:bg-brand-teal-dark shadow-md transition-all"
              >
                Close & Return to Home
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Select Services */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Spa Service(s) <span className="text-brand-teal font-normal">(choose one or more)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
                {services.map(service => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-brand-teal/15 border-brand-teal shadow-sm'
                          : 'bg-white/60 border-slate-200 hover:bg-white/90'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-brand-teal border-brand-teal text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-slate-800 truncate">{service.name}</p>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-brand-teal" /> {service.durationMinutes}m
                          </p>
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-brand-mocha shrink-0">
                        ₱{service.price}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Service Total preview */}
              <div className="mt-3 px-4 py-2.5 rounded-xl glass-panel flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  {selectedServices.length} service(s) selected (~{totalDuration} mins)
                </span>
                <span className="font-extrabold text-slate-800 text-sm">
                  Total: <span className="text-brand-teal">₱{totalPrice.toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  2. Choose Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  3. Preferred Time
                </label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-slate-800 font-medium"
                >
                  {availableTimeSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {slot} ({parseInt(slot) < 12 ? 'AM' : 'PM'})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Customer Information (No login required!) */}
            <div className="space-y-3 pt-2 border-t border-brand-teal/15">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                4. Customer Details <span className="text-slate-500 font-normal">(No password or account required)</span>
              </label>

              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name (e.g. Maria Santos)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      placeholder="Contact / Mobile Number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-slate-800"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder="Special requests or therapist preference (optional, e.g. celebrating anniversary, light pressure, etc.)"
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl glass-input text-xs text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-teal to-[#018b7c] hover:from-[#008f7f] hover:to-[#007468] shadow-lg hover:shadow-xl hover:shadow-brand-teal/20 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm & Get Booking Reference Code</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
