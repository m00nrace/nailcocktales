import React, { useState } from 'react';
import type { Booking } from '../../types';
import { Search, Download, Clock, Phone, Eye } from 'lucide-react';

interface BookingsManagerProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  onInspectBooking: (ref: string) => void;
}

export const BookingsManager: React.FC<BookingsManagerProps> = ({
  bookings,
  onInspectBooking,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = bookings.filter(b => {
    const matchesSearch =
      b.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerPhone.includes(searchTerm) ||
      b.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.servicesSummary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['Reference', 'Customer Name', 'Phone', 'Email', 'Date', 'Time', 'Services', 'Total Price', 'Status', 'Cancellation Reason'];
    const rows = filtered.map(b => [
      b.referenceNumber,
      `"${b.customerName}"`,
      `"${b.customerPhone}"`,
      `"${b.customerEmail}"`,
      b.appointmentDate,
      b.appointmentTime,
      `"${b.servicesSummary}"`,
      b.totalPrice,
      b.status,
      `"${b.cancellationReason || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nailcocktales-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">Confirmed</span>;
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700">Pending</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700">Cancelled</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">Completed</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Customer Bookings Master List</h2>
          <p className="text-xs text-slate-500">
            Total of {bookings.length} reservations ({bookings.filter(b => b.status === 'confirmed').length} confirmed, {bookings.filter(b => b.status === 'cancelled').length} cancelled)
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm flex items-center gap-2 transition-all"
        >
          <Download className="w-3.5 h-3.5 text-brand-teal" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4 rounded-2xl border border-white/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search reference #, name, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl glass-input text-xs text-slate-800"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-brand-teal text-white shadow-sm'
                  : 'bg-white/70 text-slate-600 hover:bg-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl border border-white/80 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-brand-teal/10 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-brand-teal/20">
              <tr>
                <th className="py-3.5 px-4">Ref Code</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Schedule</th>
                <th className="py-3.5 px-4">Services</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 bg-white/40">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                    No reservations match your current filters.
                  </td>
                </tr>
              ) : (
                filtered.map(booking => (
                  <tr key={booking.id} className="hover:bg-white/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brand-mocha">
                      {booking.referenceNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-800">{booking.customerName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-brand-teal" /> {booking.customerPhone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{booking.appointmentDate}</div>
                      <div className="text-[11px] text-brand-teal font-medium flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {booking.appointmentTime}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="truncate font-medium text-slate-800">
                        {booking.servicesSummary}
                      </div>
                      {booking.cancellationReason && (
                        <div className="text-[10px] text-rose-600 truncate mt-0.5 font-medium">
                          Cancelled: "{booking.cancellationReason}"
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-extrabold text-brand-mocha">
                      ₱{booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {getBadge(booking.status)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onInspectBooking(booking.referenceNumber)}
                        className="p-1.5 rounded-lg text-brand-teal hover:bg-brand-teal/10 transition-colors inline-flex items-center gap-1 font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
