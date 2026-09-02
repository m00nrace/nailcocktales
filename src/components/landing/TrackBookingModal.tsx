import React, { useState } from 'react';
import type { Booking } from '../../types';
import { storage } from '../../services/storage';
import { X, Search, Calendar, Clock, User, Phone, Mail, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface TrackBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCancelled?: () => void;
}

export const TrackBookingModal: React.FC<TrackBookingModalProps> = ({
  isOpen,
  onClose,
  onBookingCancelled,
}) => {
  const [referenceInput, setReferenceInput] = useState('');
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Cancellation State
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (refToSearch?: string) => {
    const targetRef = refToSearch || referenceInput;
    if (!targetRef.trim()) return;

    const found = storage.getBookingByReference(targetRef);
    setSearchedBooking(found);
    setHasSearched(true);
    setIsCancelling(false);
    setCancelSuccessMsg('');
  };

  const handleQuickSample = (ref: string) => {
    setReferenceInput(ref);
    handleSearch(ref);
  };

  const handleConfirmCancel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedBooking) return;

    const updated = storage.cancelBooking(
      searchedBooking.referenceNumber,
      cancelReason.trim() || 'Customer opted to cancel via self-service portal.'
    );

    if (updated) {
      setSearchedBooking(updated);
      setIsCancelling(false);
      setCancelSuccessMsg('Your appointment has been successfully cancelled. The salon has been notified.');
      if (onBookingCancelled) {
        onBookingCancelled();
      }
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700 border border-amber-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Awaiting Confirmation
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-300 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" /> Completed
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-white/90 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-brand-teal/20 flex items-center justify-between bg-white/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-mocha/10 text-brand-mocha">
              <Search className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Track My Booking</h3>
              <p className="text-xs text-slate-500">
                Check appointment status or cancel reservation
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

        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Reference Number Search Bar */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Enter Your Booking Reference Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="e.g. NC-892410"
                  value={referenceInput}
                  onChange={(e) => setReferenceInput(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-3 rounded-xl glass-input text-base font-mono font-bold tracking-wider text-brand-mocha uppercase"
                />
              </div>
              <button
                type="button"
                onClick={() => handleSearch()}
                className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-brand-teal hover:bg-brand-teal-dark shadow-md transition-all flex items-center gap-2 shrink-0"
              >
                <span>Lookup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Demo Reference Pill suggestions */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span>Quick test:</span>
              <button
                type="button"
                onClick={() => handleQuickSample('NC-892410')}
                className="px-2 py-0.5 rounded-lg bg-white/80 border border-slate-200 text-brand-teal hover:border-brand-teal font-mono font-semibold"
              >
                NC-892410
              </button>
              <button
                type="button"
                onClick={() => handleQuickSample('NC-451298')}
                className="px-2 py-0.5 rounded-lg bg-white/80 border border-slate-200 text-brand-teal hover:border-brand-teal font-mono font-semibold"
              >
                NC-451298
              </button>
            </div>
          </div>

          {/* Cancellation Success Message */}
          {cancelSuccessMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{cancelSuccessMsg}</span>
            </div>
          )}

          {/* Search Result */}
          {hasSearched && (
            searchedBooking ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* Result Card */}
                <div className="glass-panel-teal p-5 rounded-2xl border border-brand-teal/30 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                        Reference Number
                      </span>
                      <h4 className="text-2xl font-black font-mono text-brand-mocha">
                        {searchedBooking.referenceNumber}
                      </h4>
                    </div>

                    <div>{getStatusBadge(searchedBooking.status)}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-brand-teal/20 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <User className="w-4 h-4 text-brand-teal shrink-0" />
                      <span className="font-semibold">{searchedBooking.customerName}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="w-4 h-4 text-brand-teal shrink-0" />
                      <span>{searchedBooking.appointmentDate} at {searchedBooking.appointmentTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                      <span>{searchedBooking.customerPhone}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-700">
                      <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                      <span className="truncate">{searchedBooking.customerEmail}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-brand-teal/20 text-xs space-y-1.5">
                    <div className="flex justify-between items-start text-slate-700">
                      <span className="text-slate-500">Reserved Services:</span>
                      <span className="font-bold text-slate-800 text-right max-w-[260px]">
                        {searchedBooking.servicesSummary}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-800 font-bold pt-1">
                      <span>Total Price:</span>
                      <span className="text-brand-teal text-sm">₱{searchedBooking.totalPrice.toLocaleString()}</span>
                    </div>

                    {searchedBooking.specialRequests && (
                      <div className="pt-2 text-slate-600 bg-white/60 p-2 rounded-xl text-[11px]">
                        <span className="font-semibold text-slate-700">Requests: </span>
                        {searchedBooking.specialRequests}
                      </div>
                    )}

                    {searchedBooking.cancellationReason && (
                      <div className="mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px]">
                        <strong>Cancellation Reason: </strong>
                        {searchedBooking.cancellationReason}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cancel Booking Feature */}
                {searchedBooking.status !== 'cancelled' && searchedBooking.status !== 'completed' && (
                  <div>
                    {!isCancelling ? (
                      <div className="p-4 rounded-2xl bg-white/60 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">Change of plans?</h5>
                          <p className="text-[11px] text-slate-500">You can cancel your appointment anytime before arrival.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsCancelling(true)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-300 transition-all shrink-0"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleConfirmCancel} className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-3 animate-in fade-in">
                        <div className="flex items-center gap-2 text-rose-800 text-xs font-bold">
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                          <span>Cancel Appointment Confirmation</span>
                        </div>

                        <p className="text-[11px] text-rose-700 leading-relaxed">
                          Are you sure you want to cancel this appointment for {searchedBooking.appointmentDate}? Our team will immediately be notified.
                        </p>

                        <div>
                          <label className="block text-[11px] font-semibold text-rose-900 mb-1">
                            Reason for cancellation (optional):
                          </label>
                          <textarea
                            rows={2}
                            placeholder="e.g. Change of schedule, feeling under the weather, etc."
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-rose-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setIsCancelling(false)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white/80"
                          >
                            Keep Booking
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm"
                          >
                            Confirm Cancellation
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-700">No Booking Found</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  We couldn't find an appointment matching "{referenceInput}". Please double check your code or contact our salon directly.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
