import React, { useState } from 'react';
import type { AdminNotification } from '../../types';
import { Bell, X, CheckCheck, Clock, AlertTriangle, Calendar, Sparkles, ArrowRight } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AdminNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onSelectBooking: (bookingRef: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkRead,
  onMarkAllRead,
  onSelectBooking,
}) => {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'unread'>('all');

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'urgent') return n.urgent;
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'reminder-4h':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'reminder-24h':
        return <Calendar className="w-5 h-5 text-brand-teal" />;
      case 'cancellation':
        return <AlertTriangle className="w-5 h-5 text-rose-600" />;
      case 'new-booking':
        return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md h-full glass-panel-teal bg-white/95 border-l border-brand-teal/30 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-brand-teal/20 flex items-center justify-between bg-white/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-teal/15 text-brand-teal relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Notification Center</h3>
              <p className="text-xs text-slate-500">
                {unreadCount} unread • 24h & 4h booking reminders & cancellations
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

        {/* Filter Pills & Mark All Read */}
        <div className="px-5 py-3 border-b border-brand-teal/10 flex items-center justify-between bg-white/40 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filter === 'all' ? 'bg-brand-teal text-white' : 'text-slate-600 hover:bg-white'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('urgent')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filter === 'urgent' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-white'
              }`}
            >
              Urgent / 4h
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filter === 'unread' ? 'bg-brand-mocha text-white' : 'text-slate-600 hover:bg-white'
              }`}
            >
              Unread
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-brand-teal hover:text-brand-teal-dark font-semibold flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">No Notifications</h4>
              <p className="text-xs text-slate-500">
                You're all caught up with upcoming appointments and cancellations!
              </p>
            </div>
          ) : (
            filteredNotifs.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  if (!n.read) onMarkRead(n.id);
                  if (n.bookingReference) onSelectBooking(n.bookingReference);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                  !n.read
                    ? n.urgent
                      ? 'bg-rose-50/90 border-rose-200 shadow-sm'
                      : 'bg-white border-brand-teal/30 shadow-sm'
                    : 'bg-white/60 border-slate-200 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Unread dot */}
                {!n.read && (
                  <span className={`absolute top-4 right-4 w-2.5 h-2.5 rounded-full ${
                    n.urgent ? 'bg-rose-500 animate-pulse' : 'bg-brand-teal'
                  }`} />
                )}

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    n.type === 'cancellation'
                      ? 'bg-rose-100'
                      : n.type === 'reminder-4h'
                      ? 'bg-amber-100'
                      : n.type === 'reminder-24h'
                      ? 'bg-teal-100'
                      : 'bg-emerald-100'
                  }`}>
                    {getIcon(n.type)}
                  </div>

                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs font-bold ${
                        n.urgent ? 'text-rose-900' : 'text-slate-800'
                      }`}>
                        {n.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {n.message}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Ref: <strong className="font-mono text-slate-600">{n.bookingReference}</strong></span>
                      <span className="text-brand-teal group-hover:underline flex items-center gap-0.5 font-medium">
                        View appointment <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-brand-teal/15 bg-white/70 text-center text-xs text-slate-500">
          Automated reminder triggers: <strong>24h Before</strong> & <strong>4h Before</strong> appointment times.
        </div>
      </div>
    </div>
  );
};
