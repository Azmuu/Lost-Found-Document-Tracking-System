import React from 'react';
import { MapPin } from 'lucide-react';

export default function DocumentCard({ type, name, location, bgClass, badge, idRef }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className={`h-44 relative ${bgClass}`}>
        {badge && <span className={`absolute top-4 right-4 text-[11px] font-semibold px-2.5 py-1 rounded-full ${badge === 'Verified' ? 'bg-cyan-600 text-white' : 'bg-[#0f766e] text-white'}`}>{badge}</span>}
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-[#0d9488] font-semibold flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></span> {type}
          </div>
          <h3 className="text-lg font-bold mb-1 text-slate-900">{name}</h3>
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
            <MapPin className="w-3.5 h-3.5" /> {location}
          </div>
          {idRef && (
            <div className="bg-slate-50 text-[11px] p-2 rounded border border-slate-100 flex justify-between text-slate-500 mb-4">
              <span>ID Ref:</span>
              <span className="font-mono font-semibold">{idRef}</span>
            </div>
          )}
        </div>
        <button className="w-full py-2.5 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors mt-auto">
          {badge === 'Verified' || idRef ? 'Claim Item' : 'Claim Document'}
        </button>
      </div>
    </div>
  );
}