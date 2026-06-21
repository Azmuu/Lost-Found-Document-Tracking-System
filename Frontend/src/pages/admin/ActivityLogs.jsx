import React, { useEffect, useState } from 'react';
import { getActivityLogs } from '../../services/adminService';
import { formatDateTime } from '../../utils/format';

export default function AdminActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [actionFilter, setActionFilter] = useState('');

  const load = () => {
    getActivityLogs({ action: actionFilter || undefined, limit: 50 })
      .then(({ data }) => setLogs(data.data))
      .catch(() => setLogs([]));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold">Activity Logs</h1>
          <p className="text-xs text-slate-400">System-wide audit trail of user and admin actions.</p>
        </div>
        <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-xs">
          <option value="">All Actions</option>
          <option value="login">Login</option>
          <option value="document_upload">Document Upload</option>
          <option value="document_verify">Document Verify</option>
          <option value="claim_create">Claim Create</option>
          <option value="failed_login">Failed Login</option>
        </select>
        <button onClick={load} className="px-4 py-2 bg-[#005f54] text-white rounded-lg text-xs font-bold">Filter</button>
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[600px]">
          <thead className="bg-slate-50 dark:bg-slate-700/50 font-bold uppercase text-slate-400 border-b">
            <tr>
              <th className="p-4">Action</th>
              <th className="p-4">User</th>
              <th className="p-4">Description</th>
              <th className="p-4">IP</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {logs.map((log) => (
              <tr key={log._id}>
                <td className="p-4 font-semibold">{log.action.replace(/_/g, ' ')}</td>
                <td className="p-4">{log.user?.name || log.user?.email || '—'}</td>
                <td className="p-4 text-slate-500">{log.description || '—'}</td>
                <td className="p-4 font-mono text-[11px]">{log.ipAddress || '—'}</td>
                <td className="p-4 text-slate-400">{formatDateTime(log.createdAt)}</td>
                <td className="p-4"><span className="bg-emerald-50 text-emerald-600 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">{log.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
