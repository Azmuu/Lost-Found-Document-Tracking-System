import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, Trash2, Plus } from 'lucide-react';
import { getMyDocuments, deleteDocument } from '../services/documentService';
import { getMyClaims, cancelClaim } from '../services/claimService';
import { formatDate, statusColor, statusLabel } from '../utils/format';

export default function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [docsRes, claimsRes] = await Promise.all([getMyDocuments(), getMyClaims()]);
      setDocuments(docsRes.data.data);
      setClaims(claimsRes.data.data);
    } catch {
      setDocuments([]);
      setClaims([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await deleteDocument(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed.');
    }
  };

  const handleCancelClaim = async (id) => {
    if (!window.confirm('Cancel this claim?')) return;
    try {
      await cancelClaim(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Cancel failed.');
    }
  };

  if (loading) return <p className="text-sm text-slate-400">Loading...</p>;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Documents</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage your reported findings and recovery claims.</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold">My Reported Documents</h2>
          <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{documents.length} Total</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div key={doc._id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 bg-teal-50 dark:bg-teal-900/30 rounded-lg flex items-center justify-center text-teal-600"><FileText className="w-4 h-4" /></div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${statusColor(doc.status)}`}>{statusLabel(doc.status)}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold">{doc.documentName}</h3>
                <p className="text-[11px] text-slate-400">📍 {doc.locationFound}</p>
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-700 text-slate-400">
                <button onClick={() => handleDelete(doc._id)} className="hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
          <Link to="/upload" className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#005f54] min-h-[160px]">
            <Plus className="w-4 h-4" />
            <span className="text-xs font-semibold">Report New Found Item</span>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold">My Claims</h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {claims.length === 0 ? (
            <p className="p-6 text-sm text-slate-400 text-center">No claims yet. Search for your lost document to submit a claim.</p>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-400 font-bold uppercase border-b border-slate-100 dark:border-slate-700">
                <tr>
                  <th className="p-4">Document</th>
                  <th className="p-4">Claim Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Reference</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {claims.map((claim) => (
                  <tr key={claim._id}>
                    <td className="p-4 font-bold">{claim.document?.documentName || '—'}</td>
                    <td className="p-4">{formatDate(claim.createdAt)}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${statusColor(claim.status)}`}>{statusLabel(claim.status)}</span></td>
                    <td className="p-4 font-mono text-slate-400">#{claim.referenceId}</td>
                    <td className="p-4 text-center">
                      {!['completed', 'cancelled'].includes(claim.status) && (
                        <button onClick={() => handleCancelClaim(claim._id)} className="text-red-500 hover:underline">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
