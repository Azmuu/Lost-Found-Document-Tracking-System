import React, { useEffect, useState } from 'react';
import { getAllClaims, updateClaimStatus } from '../../services/adminService';
import { formatDate, statusColor, statusLabel } from '../../utils/format';

const STATUS_OPTIONS = ['pending', 'under_review', 'approved', 'ready_for_collection', 'rejected', 'completed'];

export default function AdminClaims() {
  const [claims, setClaims] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAllClaims({ status: statusFilter || undefined })
      .then(({ data }) => setClaims(data.data))
      .catch(() => setClaims([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, status) => {
    const notes = window.prompt('Verification notes (optional):') || '';
    try {
      await updateClaimStatus(id, { status, verificationNotes: notes });
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Claims</h1>
          <p className="text-xs text-slate-400">Approve or reject document recovery claims.</p>
        </div>
        <div className="flex gap-2">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-xs">
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
          </select>
          <button onClick={load} className="px-4 py-2 bg-[#005f54] text-white rounded-lg text-xs font-bold">Filter</button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-slate-400">Loading...</p>
      ) : (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50 dark:bg-slate-700/50 font-bold uppercase text-slate-400 border-b">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Document</th>
                <th className="p-4">Claimant</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {claims.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-400">No claims found.</td></tr>
              ) : claims.map((claim) => (
                <tr key={claim._id}>
                  <td className="p-4 font-mono">#{claim.referenceId}</td>
                  <td className="p-4 font-semibold">{claim.document?.documentName || '—'}</td>
                  <td className="p-4">{claim.claimant?.name || claim.claimant?.email || '—'}</td>
                  <td className="p-4 text-slate-400">{formatDate(claim.createdAt)}</td>
                  <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColor(claim.status)}`}>{statusLabel(claim.status)}</span></td>
                  <td className="p-4 text-center space-x-1">
                    <button onClick={() => handleStatusChange(claim._id, 'approved')} className="text-[10px] font-bold text-emerald-600 hover:underline">Approve</button>
                    <button onClick={() => handleStatusChange(claim._id, 'ready_for_collection')} className="text-[10px] font-bold text-teal-600 hover:underline">Ready</button>
                    <button onClick={() => handleStatusChange(claim._id, 'rejected')} className="text-[10px] font-bold text-red-600 hover:underline">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
