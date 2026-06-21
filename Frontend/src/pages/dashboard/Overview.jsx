import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Bell, Search, Upload } from 'lucide-react';
import { getMyDocuments } from '../../services/documentService';
import { getMyClaims } from '../../services/claimService';
import { getNotifications } from '../../services/notificationService';
import { useAuth } from '../../context/AuthContext';

export default function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ documents: 0, claims: 0, unread: 0, pending: 0 });

  useEffect(() => {
    Promise.all([getMyDocuments(), getMyClaims(), getNotifications({ unreadOnly: true })])
      .then(([docs, claims, notifs]) => {
        const pending = docs.data.data.filter((d) => ['pending', 'in_review'].includes(d.status)).length;
        setStats({
          documents: docs.data.data.length,
          claims: claims.data.data.length,
          unread: notifs.data.unreadCount || 0,
          pending,
        });
      })
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'My Uploads', value: stats.documents, icon: FileText, path: '/dashboard/my-documents', color: 'text-teal-600' },
    { label: 'Active Claims', value: stats.claims, icon: Search, path: '/dashboard/my-documents', color: 'text-blue-600' },
    { label: 'Pending Review', value: stats.pending, icon: Upload, path: '/dashboard/my-documents', color: 'text-amber-600' },
    { label: 'Unread Alerts', value: stats.unread, icon: Bell, path: '/dashboard/notifications', color: 'text-red-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(' ')[0]}</h1>
        <p className="text-xs text-slate-400 mt-1">Your document recovery dashboard overview.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} to={card.path} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{card.label}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
            </Link>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/upload" className="bg-[#005f54] text-white p-6 rounded-xl hover:bg-[#004d44]">
          <h3 className="font-bold">Report Found Document</h3>
          <p className="text-xs text-teal-100 mt-1">Upload a document you found to help reunite it with its owner.</p>
        </Link>
        <Link to="/search" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl hover:shadow-md">
          <h3 className="font-bold">Search Lost Documents</h3>
          <p className="text-xs text-slate-400 mt-1">Look for your lost ID, passport, or certificate.</p>
        </Link>
      </div>
    </div>
  );
}
