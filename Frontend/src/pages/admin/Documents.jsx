import React, { useEffect, useState } from 'react';
import { getAllDocuments, verifyDocument, rejectDocument, updatePrivacySettings } from '../../services/adminService';
import { formatDate, statusColor, statusLabel } from '../../utils/format';

export default function AdminDocuments() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const load = () => {
    getAllDocuments({ search, status: statusFilter || undefined })
      .then(({ data }) => setDocuments(data.data))
      .catch(() => setDocuments([]));
  };

  useEffect(() => { load(); }, []);

  const togglePrivacy = async (doc) => {
    await updatePrivacySettings({ documentId: doc._id, isPublic: !doc.isPublic });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Documents</h1>
          <p className="text-xs text-slate-400">Search, filter, and manage all document records.</p>
        </div>
        <div className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-xs" />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-xs">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
            <option value="claimed">Claimed</option>
          </select>
          <button onClick={load} className="px-4 py-2 bg-[#005f54] text-white rounded-lg text-xs font-bold">Search</button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead className="bg-slate-50 dark:bg-slate-700/50 font-bold uppercase text-slate-400 border-b">
            <tr>
              <th className="p-4">Reference</th>
              <th className="p-4">Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Public</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {documents.map((doc) => (
              <tr key={doc._id}>
                <td className="p-4 font-mono">{doc.referenceId}</td>
                <td className="p-4 font-semibold">{doc.documentName}</td>
                <td className="p-4">{doc.documentType}</td>
                <td className="p-4">{doc.locationFound}</td>
                <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColor(doc.status)}`}>{statusLabel(doc.status)}</span></td>
                <td className="p-4">
                  <button onClick={() => togglePrivacy(doc)} className={`text-[10px] font-bold px-2 py-0.5 rounded ${doc.isPublic ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {doc.isPublic ? 'Public' : 'Hidden'}
                  </button>
                </td>
                <td className="p-4 text-slate-400">{formatDate(doc.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
