import React from 'react';
import { FileText, Eye, Edit3, Trash2, Plus, CheckCircle, Clock } from 'lucide-react';

export default function MyDocuments() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Documents</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage your reported findings and track the status of your recovery claims in real-time.</p>
      </div>

      {/* Box 1: My Reported Documents */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" /> My Reported Documents
          </h2>
          <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">3 Documents Total</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600"><FileText className="w-4 h-4" /></div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">Verified</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">National ID Card</h3>
              <p className="text-[11px] text-slate-400">📍 Central Station, Plaza A</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-slate-400">
              <button className="hover:text-slate-800"><Eye className="w-3.5 h-3.5" /></button>
              <button className="hover:text-slate-800"><Edit3 className="w-3.5 h-3.5" /></button>
              <button className="hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-600">💳</div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Under Review</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Driver's License</h3>
              <p className="text-[11px] text-slate-400">📍 Blue Park, North Entrance</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-slate-400">
              <button className="hover:text-slate-800"><Eye className="w-3.5 h-3.5" /></button>
              <button className="hover:text-slate-800"><Edit3 className="w-3.5 h-3.5" /></button>
              <button className="hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Card 3 (Dotted Button) */}
          <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#005f54] group transition-colors h-40 bg-slate-50/30">
            <div className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 group-hover:bg-[#005f54] group-hover:text-white transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800">Report New Found Item</span>
          </button>
        </div>
      </div>

      {/* Box 2: My Claims */}
      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            🔍 My Claims
          </h2>
          <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Active Recovery Status</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-500">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="p-4">Document Name</th>
                  <th className="p-4">Claim Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Reference ID</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold flex items-center gap-3">
                    <span className="p-2 bg-teal-50 text-teal-600 rounded-lg">🪪</span> Passport (International)
                  </td>
                  <td className="p-4">Oct 12, 2023</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-[#005f54] text-white px-2 py-1 rounded-full text-[10px] font-semibold">
                      <CheckCircle className="w-3 h-3" /> Ready for Collection
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-400">#FL-990234</td>
                  <td className="p-4 text-center">
                    <button className="text-[#005f54] font-bold hover:underline mr-4">View Details</button>
                    <button className="text-slate-400 hover:text-slate-600">✕</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold flex items-center gap-3">
                    <span className="p-2 bg-teal-50 text-teal-600 rounded-lg">💼</span> Black Leather Wallet
                  </td>
                  <td className="p-4">Oct 14, 2023</td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-[10px] font-semibold">
                      Under Review
                    </span>
                  </td>
                  <td className="p-4 font-mono text-slate-400">#FL-990561</td>
                  <td className="p-4 text-center">
                    <button className="text-[#005f54] font-bold hover:underline mr-4">View Details</button>
                    <button className="text-slate-400 hover:text-slate-600">✕</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}