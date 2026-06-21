import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getNotifications, markAsRead, markAllAsRead } from '../services/notificationService';
import { formatDateTime } from '../utils/format';

export default function Notifications() {
  const { liveNotification, clearLiveNotification, setUnreadCount } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await getNotifications();
      setNotifications(data.data);
      setUnreadCount(data.unreadCount || 0);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (liveNotification) {
      setNotifications((prev) => [liveNotification, ...prev]);
      clearLiveNotification();
    }
  }, [liveNotification]);

  const handleMarkAll = async () => {
    await markAllAsRead();
    load();
  };

  const handleMarkRead = async (id) => {
    await markAsRead(id);
    load();
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-xs text-slate-400 mt-0.5">Stay updated on document status and matches.</p>
        </div>
        <button onClick={handleMarkAll} className="text-xs font-semibold border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg">Mark all as read</button>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-12">No notifications yet.</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n._id} className={`bg-white dark:bg-slate-800 p-4 rounded-xl border flex gap-3 ${!n.isRead ? 'border-l-4 border-l-[#005f54] border-slate-200 dark:border-slate-700' : 'border-slate-200 dark:border-slate-700'}`}>
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex-grow">
                <h3 className="text-sm font-bold">{n.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                <span className="text-[10px] text-slate-400 block mt-2 uppercase">{formatDateTime(n.createdAt)}</span>
              </div>
              {!n.isRead && (
                <button onClick={() => handleMarkRead(n._id)} className="text-[10px] text-[#005f54] font-bold hover:underline shrink-0">Mark read</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
