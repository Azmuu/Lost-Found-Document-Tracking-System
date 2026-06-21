import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { getVerificationQueue, verifyDocument, rejectDocument } from '../../services/adminService';
import { formatDate, statusColor, statusLabel } from '../../utils/format';

export default function AdminVerification() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getVerificationQueue()
      .then(({ data }) => setDocuments(data.data))
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleVerify = async (id) => {
    try {
      await verifyDocument(id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed.');
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Rejection reason:') || 'Did not meet verification requirements.';
    try {
      await rejectDocument(id, reason);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Verification Queue</h1>
        <p className="text-xs text-slate-400">Review and approve uploaded documents.</p>
      </div>
      {loading ? <p className="text-sm text-slate-400">Loading...</p> : (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-400 font-bold uppercase border-b">
              <tr>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">ID Ref</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {documents.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-slate-400">No documents in queue.</td></tr>
              ) : documents.map((doc) => (
                <tr key={doc._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                  <td className="px-5 py-3.5 font-semibold">{doc.documentType}</td>
                  <td className="px-5 py-3.5">{doc.documentName}</td>
                  <td className="px-5 py-3.5 font-mono">{doc.idNumberMasked}</td>
                  <td className="px-5 py-3.5 text-slate-400">{formatDate(doc.dateFound)}</td>
                  <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColor(doc.status)}`}>{statusLabel(doc.status)}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleVerify(doc._id)} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle2 className="w-4 h-4" /></button>
                      <button onClick={() => handleReject(doc._id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><XCircle className="w-4 h-4" /></button>
                    </div>
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
