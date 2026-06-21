import React from 'react';
import { MapPin } from 'lucide-react';
import { resolveImageUrl } from '../utils/imageUrl';

export default function DocumentCard({ document, onClaim, type, name, location, bgClass, badge, idRef }) {
  const doc = document || {};
  const docType = doc.documentType || type;
  const docName = doc.documentName || name;
  const docLocation = doc.locationFound || location;
  const docBadge = doc.status === 'verified' ? 'Verified' : badge || 'Found';
  const docIdRef = doc.idNumberMasked || idRef;
  const imageUrl = doc.images?.[0]?.url ? resolveImageUrl(doc.images[0].url) : null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
      <div className={`h-44 relative ${!imageUrl ? (bgClass || 'bg-gradient-to-br from-slate-700 to-slate-800') : ''}`}>
        {imageUrl && <img src={imageUrl} alt={docName} className="w-full h-full object-cover" />}
        <span className={`absolute top-4 right-4 text-[11px] font-semibold px-2.5 py-1 rounded-full ${docBadge === 'Verified' ? 'bg-cyan-600 text-white' : 'bg-[#0f766e] text-white'}`}>{docBadge}</span>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-[#0d9488] font-semibold flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></span> {docType}
          </div>
          <h3 className="text-lg font-bold mb-1">{docName}</h3>
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
            <MapPin className="w-3.5 h-3.5" /> {docLocation}
          </div>
          {docIdRef && (
            <div className="bg-slate-50 dark:bg-slate-700 text-[11px] p-2 rounded border border-slate-100 dark:border-slate-600 flex justify-between text-slate-500 mb-4">
              <span>ID Ref:</span>
              <span className="font-mono font-semibold">{docIdRef}</span>
            </div>
          )}
        </div>
        <button onClick={onClaim} className="w-full py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          Claim Item
        </button>
      </div>
    </div>
  );
}
