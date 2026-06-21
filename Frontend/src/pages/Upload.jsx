import React, { useEffect, useState } from 'react';
import { UploadCloud, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument, getDocumentTypes } from '../services/documentService';
import { resolveImageUrl } from '../utils/imageUrl';

export default function Upload() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    documentName: '',
    documentType: '',
    ownerName: '',
    documentNumber: '',
    locationFound: '',
    description: '',
  });

  useEffect(() => {
    getDocumentTypes().then(({ data }) => setTypes(data.data || [])).catch(() => {});
  }, []);

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);
    if (selected[0]) setPreview(URL.createObjectURL(selected[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) {
      setError('Please upload at least one image.');
      return;
    }
    setLoading(true);
    setError('');
    const fd = new FormData();
    fd.append('documentName', form.documentName);
    fd.append('documentType', form.documentType);
    fd.append('ownerName', form.ownerName);
    fd.append('documentNumber', form.documentNumber);
    fd.append('locationFound', form.locationFound);
    fd.append('description', form.description);
    files.forEach((f) => fd.append('images', f));
    try {
      await uploadDocument(fd);
      navigate('/dashboard/my-documents');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Found Document</h1>
          <p className="text-slate-400 text-sm mt-1">Submit details to help reunite it with its owner.</p>
        </div>
        {error && <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</div>}

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-base font-bold mb-4">1. Capture Document</h2>
          <label className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-10 text-center hover:border-[#005f54] cursor-pointer bg-slate-50/50 dark:bg-slate-700/30 block">
            <input type="file" accept="image/*,.pdf" multiple className="hidden" onChange={handleFiles} />
            <UploadCloud className="w-6 h-6 mx-auto mb-3 text-[#0d9488]" />
            <p className="text-sm font-semibold">Drag and drop or click to browse</p>
            <p className="text-[10px] text-slate-400 mt-4 uppercase">JPG, PNG, PDF (Max 10MB)</p>
            {files.length > 0 && <p className="text-xs text-teal-600 mt-2">{files.length} file(s) selected</p>}
          </label>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
          <h2 className="text-base font-bold">2. Document Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Name</label>
              <input required value={form.documentName} onChange={(e) => setForm({ ...form, documentName: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Type</label>
              <select required value={form.documentType} onChange={(e) => setForm({ ...form, documentType: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm">
                <option value="">Select Type</option>
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Owner Name (if visible)</label>
              <input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Number (Partial/Full)</label>
              <input value={form.documentNumber} onChange={(e) => setForm({ ...form, documentNumber: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Location Found</label>
              <input required value={form.locationFound} onChange={(e) => setForm({ ...form, locationFound: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Additional Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 rounded-lg text-sm resize-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-400 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-600" /> Sensitive data is masked for privacy.</p>
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#005f54] text-white font-medium text-sm rounded-xl hover:bg-[#004d44] disabled:opacity-60">
            {loading ? 'Submitting...' : <>Submit Record <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-4 h-fit">
        <p className="text-xs uppercase font-bold text-[#0d9488] text-left">Live Preview</p>
        <div className="h-56 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
          {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : (
            <div className="text-slate-400"><EyeOff className="w-8 h-8 mx-auto mb-2" /><p className="text-xs">No image uploaded yet</p></div>
          )}
        </div>
      </div>
    </form>
  );
}
