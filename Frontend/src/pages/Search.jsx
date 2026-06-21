import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import DocumentCard from '../components/DocumentCard';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { searchDocuments, getDocumentTypes } from '../services/documentService';
import { createClaim } from '../services/claimService';
import { useAuth } from '../context/AuthContext';

export default function Search() {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [documents, setDocuments] = useState([]);
  const [types, setTypes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    documentName: '',
    ownerName: '',
    documentType: '',
    idLast4: '',
    foundAfter: '',
    sort: 'recent',
  });
  const [matchMessage, setMatchMessage] = useState('');

  const fetchDocuments = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await searchDocuments({ ...filters, page, limit: 12 });
      setDocuments(data.data);
      setPagination(data.pagination);
      setMatchMessage(data.message || '');
    } catch {
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocumentTypes().then(({ data }) => setTypes(data.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    fetchDocuments(1);
  }, []);

  const applyFilters = (e) => {
    e?.preventDefault();
    fetchDocuments(1);
  };

  const handleClaim = async (docId) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    const message = window.prompt('Optional message for your claim:') || '';
    try {
      await createClaim(docId, message);
      alert('Claim submitted successfully! Check your dashboard for updates.');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit claim.');
    }
  };

  return (
    <div className="max-w-[1250px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-64 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 self-start space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-700">
          <SlidersHorizontal className="w-4 h-4" />
          <h2 className="text-base font-bold">Filters</h2>
        </div>
        <form onSubmit={applyFilters} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Keywords</label>
            <input type="text" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} placeholder="Search..." className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Owner Name</label>
            <input type="text" value={filters.ownerName} onChange={(e) => setFilters({ ...filters, ownerName: e.target.value })} placeholder="e.g. John Doe" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Name</label>
            <input type="text" value={filters.documentName} onChange={(e) => setFilters({ ...filters, documentName: e.target.value })} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Type</label>
            <select value={filters.documentType} onChange={(e) => setFilters({ ...filters, documentType: e.target.value })} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm">
              <option value="">All Types</option>
              {types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">ID Number (Last 4)</label>
            <input type="text" maxLength={4} value={filters.idLast4} onChange={(e) => setFilters({ ...filters, idLast4: e.target.value })} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Found After</label>
            <input type="date" value={filters.foundAfter} onChange={(e) => setFilters({ ...filters, foundAfter: e.target.value })} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
          </div>
          <button type="submit" className="w-full py-2.5 bg-[#005f54] text-white rounded-lg text-sm font-medium">Apply Filters</button>
          <button type="button" onClick={() => { setFilters({ q: '', documentName: '', ownerName: '', documentType: '', idLast4: '', foundAfter: '', sort: 'recent' }); setMatchMessage(''); setTimeout(() => fetchDocuments(1), 0); }} className="w-full py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium">Reset</button>
        </form>
      </aside>

      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-bold">{pagination.total}</span> documents found
            {matchMessage && isAuthenticated && pagination.total > 0 && (
              <span className="block text-xs text-teal-600 mt-1">Match alert sent to your notifications.</span>
            )}
          </p>
          <select value={filters.sort} onChange={(e) => { setFilters({ ...filters, sort: e.target.value }); setTimeout(() => fetchDocuments(1), 0); }} className="bg-transparent text-sm font-semibold outline-none">
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-sm text-slate-400 py-12">Searching...</p>
        ) : documents.length === 0 ? (
          <p className="text-center text-sm text-slate-400 py-12">No documents match your criteria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <DocumentCard key={doc._id} document={doc} onClaim={() => handleClaim(doc._id)} />
            ))}
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-400">Page {pagination.page} of {pagination.pages}</p>
            <div className="flex gap-2">
              <button disabled={pagination.page <= 1} onClick={() => fetchDocuments(pagination.page - 1)} className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button>
              <button disabled={pagination.page >= pagination.pages} onClick={() => fetchDocuments(pagination.page + 1)} className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-40"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
