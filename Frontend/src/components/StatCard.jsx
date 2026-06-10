import React from 'react';

export default function StatCard({ icon: Icon, number, label, extra }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] relative">
      <div className="flex justify-between items-start mb-2">
        <Icon className="w-5 h-5 text-[#005f54]" />
        {extra && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{extra}</span>}
      </div>
      <div className="text-xs text-slate-400 uppercase font-medium tracking-wider mb-1">{label}</div>
      <div className="text-3xl font-bold text-slate-900">{number}</div>
    </div>
  );
}