import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { getDashboardStats, getVerificationQueue, verifyDocument, rejectDocument } from '../../services/adminService';
import { formatDate, statusColor, statusLabel } from '../../utils/format';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [statsRes, queueRes] = await Promise.all([
        getDashboardStats(),
        getVerificationQueue({ limit: 5 }),
      ]);
      setStats(statsRes.data.data);
      setQueue(queueRes.data.data);
    } catch {
      setStats(null);
      setQueue([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleVerify = async (id) => {
    await verifyDocument(id);
    load();
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Rejection reason:') || 'Did not meet requirements.';
    await rejectDocument(id, reason);
    load();
  };

  if (loading) return <p className="text-sm text-slate-400">Loading dashboard...</p>;

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers ?? 0 },
    { label: 'In Queue', value: stats?.pendingDocuments ?? 0, alert: true },
    { label: 'Verified Documents', value: stats?.verifiedDocuments ?? 0 },
    { label: 'Match Rate', value: `${stats?.matchRate ?? 0}%` },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Oversight</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time monitoring and verification terminal.</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 px-4 py-2 bg-[#005f54] text-white rounded-lg text-xs font-semibold">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
            <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
            {card.alert && (stats?.pendingDocuments > 0) && <span className="text-[10px] text-red-500 font-bold">Needs attention</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider">Verification Queue</h3>
            <Link to="/admin/verification" className="text-[11px] font-bold text-teal-700 hover:underline">View All</Link>
          </div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-[10px] font-bold text-slate-400 uppercase">
              <tr>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {queue.length === 0 ? (
                <tr><td colSpan={5} className="p-6 text-center text-slate-400">Queue is empty.</td></tr>
              ) : queue.map((row) => (
                <tr key={row._id}>
                  <td className="px-5 py-3.5 font-semibold">{row.documentType}</td>
                  <td className="px-5 py-3.5">{row.documentName}</td>
                  <td className="px-5 py-3.5 text-slate-400">{formatDate(row.dateFound)}</td>
                  <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColor(row.status)}`}>{statusLabel(row.status)}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleVerify(row._id)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle2 className="w-4 h-4" /></button>
                      <button onClick={() => handleReject(row._id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><XCircle className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider">Documents by Type</h3>
          <div className="mt-4 space-y-2">
            {(stats?.documentsByType || []).map((item) => (
              <div key={item._id} className="flex justify-between text-xs">
                <span>{item._id}</span>
                <span className="font-bold">{item.count}</span>
              </div>
            ))}
            {(!stats?.documentsByType || stats.documentsByType.length === 0) && (
              <p className="text-xs text-slate-400">No data yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/users" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md">
          <h3 className="font-bold text-sm">Manage Users</h3>
          <p className="text-xs text-slate-400 mt-1">{stats?.totalUsers ?? 0} registered users</p>
        </Link>
        <Link to="/admin/documents" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md">
          <h3 className="font-bold text-sm">Manage Documents</h3>
          <p className="text-xs text-slate-400 mt-1">{stats?.verifiedDocuments ?? 0} verified</p>
        </Link>
        <Link to="/admin/activity" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md">
          <h3 className="font-bold text-sm">Activity Logs</h3>
          <p className="text-xs text-slate-400 mt-1">View system audit trail</p>
        </Link>
      </div>
    </div>
  );
}
