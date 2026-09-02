import React, { useState } from 'react';
import type { Booking } from '../../types';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Phone, Mail } from 'lucide-react';

interface CalendarViewProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  selectedBookingRef?: string | null;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  bookings,
  onUpdateStatus,
  selectedBookingRef,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  // If a booking was selected from notifications, open it
  React.useEffect(() => {
    if (selectedBookingRef) {
      const b = bookings.find(item => item.referenceNumber === selectedBookingRef);
      if (b) {
        setActiveBooking(b);
        setSelectedDay(b.appointmentDate);
      }
    }
  }, [selectedBookingRef, bookings]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today.toISOString().split('T')[0]);
  };

  // Generate calendar day cells
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Filter bookings for the selected day
  const dayBookings = bookings.filter(b => b.appointmentDate === selectedDay);

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">Confirmed</span>;
      case 'pending':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">Pending</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">Cancelled</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">Completed</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-teal/15 text-brand-teal">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {monthNames[month]} {year}
            </h2>
            <p className="text-xs text-slate-500">
              Review and manage upcoming client reservations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-brand-teal bg-brand-teal/10 hover:bg-brand-teal hover:text-white transition-all"
          >
            Today
          </button>
          <div className="flex items-center glass-panel rounded-xl border border-slate-200">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-white text-slate-600 hover:text-brand-teal rounded-l-xl transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold px-2 text-slate-600">
              {monthNames[month].substring(0, 3)}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-white text-slate-600 hover:text-brand-teal rounded-r-xl transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Month Grid */}
        <div className="lg:col-span-2 glass-panel p-5 sm:p-6 rounded-3xl border border-white/80">
          {/* Day of Week headers */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] uppercase tracking-wider text-slate-400 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-20 sm:h-24 rounded-2xl bg-slate-50/40 opacity-40" />;
              }

              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDay === dateStr;
              const isToday = new Date().toISOString().split('T')[0] === dateStr;

              // Find bookings for this day
              const dayItems = bookings.filter(b => b.appointmentDate === dateStr);
              const confirmedCount = dayItems.filter(b => b.status === 'confirmed').length;
              const pendingCount = dayItems.filter(b => b.status === 'pending').length;
              const cancelledCount = dayItems.filter(b => b.status === 'cancelled').length;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(dateStr)}
                  className={`h-20 sm:h-24 p-1.5 sm:p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-teal/15 border-brand-teal shadow-md ring-2 ring-brand-teal/20'
                      : isToday
                      ? 'bg-amber-500/10 border-amber-400/50'
                      : 'bg-white/60 border-slate-200/70 hover:bg-white hover:border-brand-teal/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      isSelected ? 'text-brand-teal-dark font-extrabold' : isToday ? 'text-amber-700' : 'text-slate-700'
                    }`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                  </div>

                  {/* Day badges */}
                  <div className="space-y-1">
                    {confirmedCount > 0 && (
                      <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 truncate">
                        {confirmedCount} {confirmedCount === 1 ? 'appmt' : 'appmts'}
                      </div>
                    )}
                    {pendingCount > 0 && (
                      <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800 truncate">
                        {pendingCount} pend
                      </div>
                    )}
                    {cancelledCount > 0 && (
                      <div className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-100 text-rose-800 truncate">
                        {cancelledCount} canc
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Day Agenda & Details */}
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-teal/15 mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-mocha">
                  Agenda for {selectedDay}
                </h3>
                <p className="text-xs text-slate-500">
                  {dayBookings.length} total scheduled appointment(s)
                </p>
              </div>
            </div>

            {dayBookings.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-bold text-slate-600">No Appointments on this Date</p>
                <p className="text-[11px] text-slate-400">Available for walk-ins or new bookings.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {dayBookings.map(booking => (
                  <div
                    key={booking.id}
                    onClick={() => setActiveBooking(booking)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeBooking?.id === booking.id
                        ? 'bg-brand-teal/15 border-brand-teal shadow-sm'
                        : 'bg-white/70 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold text-brand-teal flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {booking.appointmentTime}
                      </span>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="text-xs font-bold text-slate-800">
                      {booking.customerName}
                    </div>
                    <div className="text-[11px] text-slate-600 truncate mt-0.5">
                      {booking.servicesSummary}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{booking.referenceNumber}</span>
                      <span className="text-brand-mocha font-bold">₱{booking.totalPrice}</span>
                    </div>

                    {booking.status === 'cancelled' && (
                      <div className="mt-2 p-1.5 rounded-lg bg-rose-50 text-[10px] text-rose-700 font-medium">
                        Cancelled: "{booking.cancellationReason || 'No reason provided'}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Detail Inspector Modal */}
      {activeBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-white/90 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-brand-teal/20">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-teal">
                  Booking Inspector
                </span>
                <h3 className="text-xl font-extrabold font-mono text-brand-mocha">
                  {activeBooking.referenceNumber}
                </h3>
              </div>
              <div>{getStatusBadge(activeBooking.status)}</div>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/70 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Customer Name</span>
                  <span className="text-sm font-bold text-slate-800">{activeBooking.customerName}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/70 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Schedule</span>
                  <span className="text-sm font-bold text-slate-800">
                    {activeBooking.appointmentDate} @ {activeBooking.appointmentTime}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/70 border border-slate-200 space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Info</span>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-brand-teal" />
                  <a href={`tel:${activeBooking.customerPhone}`} className="hover:underline font-semibold">
                    {activeBooking.customerPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-brand-teal" />
                  <a href={`mailto:${activeBooking.customerEmail}`} className="hover:underline">
                    {activeBooking.customerEmail}
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/70 border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Reserved Services</span>
                <span className="text-xs font-semibold text-slate-800">{activeBooking.servicesSummary}</span>
                <div className="text-sm font-extrabold text-brand-teal mt-1">
                  Total: ₱{activeBooking.totalPrice.toLocaleString()}
                </div>
              </div>

              {activeBooking.specialRequests && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                  <span className="font-bold">Customer Note: </span>
                  {activeBooking.specialRequests}
                </div>
              )}

              {activeBooking.status === 'cancelled' && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                  <span className="font-bold">Cancellation Notice: </span>
                  "{activeBooking.cancellationReason || 'No reason provided'}"
                  {activeBooking.cancelledAt && (
                    <div className="text-[10px] text-rose-500 mt-1">
                      Cancelled on: {new Date(activeBooking.cancelledAt).toLocaleString()}
                    </div>
                  )}
                </div>
              )}

              {/* Status Updater Actions */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">
                  Update Appointment Status
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onUpdateStatus(activeBooking.id, 'confirmed');
                      setActiveBooking({ ...activeBooking, status: 'confirmed' });
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                  >
                    Mark Confirmed
                  </button>
                  <button
                    onClick={() => {
                      onUpdateStatus(activeBooking.id, 'completed');
                      setActiveBooking({ ...activeBooking, status: 'completed' });
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => {
                      onUpdateStatus(activeBooking.id, 'cancelled');
                      setActiveBooking({ ...activeBooking, status: 'cancelled' });
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-100 hover:bg-rose-200"
                  >
                    Mark Cancelled
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveBooking(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
