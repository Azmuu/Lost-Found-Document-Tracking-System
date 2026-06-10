import React from 'react';
import { ShieldCheck, User, Download, Check, AlertTriangle } from 'lucide-react';

export default function Profile() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage your identity, security protocols, and track your document recovery history within the FoundLink ecosystem.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg bg-white hover:bg-slate-50">Discard</button>
          <button className="px-4 py-1.5 bg-[#005f54] text-white text-xs font-semibold rounded-lg hover:bg-[#004d44]">Save Changes</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            👤 Personal Information
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center space-y-1.5">
              <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                {/* Fallback silhouette icon if img isn't available */}
                <User className="w-8 h-8 text-slate-400" />
              </div>
              <button className="text-[10px] text-slate-400 font-bold hover:underline block">Click to<br/>update photo</button>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                <input type="text" defaultValue="Alexander Sterling" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium outline-none bg-slate-50/50" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
                <input type="email" defaultValue="a.sterling@foundlink.org" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium outline-none bg-slate-50/50" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone Number</label>
                <input type="text" defaultValue="+1 (555) 234-8901" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium outline-none bg-slate-50/50" />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Primary Location</label>
                <input type="text" defaultValue="Washington, D.C." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-medium outline-none bg-slate-50/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security Toggles */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              🛡️ Security
            </h2>
            <div className="flex justify-between items-center text-xs">
              <div>
                <h4 className="font-bold text-slate-800">Two-Factor Auth</h4>
                <p className="text-[10px] text-slate-400">Recommended for security</p>
              </div>
              {/* Custom Switch toggle */}
              <div className="w-8 h-4 bg-[#005f54] rounded-full p-0.5 cursor-pointer flex justify-end">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            <button className="w-full py-2 px-3 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex justify-between items-center">
              Change Password <span>→</span>
            </button>
            <button className="w-full py-2 px-3 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 flex justify-between items-center">
              Managed Devices <span>📱</span>
            </button>
          </div>

          {/* Verification Badge */}
          <div className="bg-[#0b1b2d] text-white p-5 rounded-xl space-y-1.5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Verified Entity</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your account is currently verified against the National Document Registry. You have full access to recovery tools.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section: Activity History */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            ⏱ Log Activity History
          </h2>
          <button className="text-xs font-semibold text-[#005f54] hover:underline flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Export Log
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-500">
            <thead className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="p-3">Action</th>
                <th className="p-3">Device / IP</th>
                <th className="p-3">Location</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/30">
                <td className="p-3 font-semibold text-slate-800 flex items-center gap-2">
                  <span className="text-slate-400">→</span> Account Login
                </td>
                <td className="p-3 font-mono text-[11px]">MacBook Pro (192.168.1.4)</td>
                <td className="p-3">Washington, D.C.</td>
                <td className="p-3">Oct 24, 2023 • 09:14 AM</td>
                <td className="p-3 text-right"><span className="bg-emerald-50 text-emerald-600 font-bold text-[9px] px-1.5 py-0.5 rounded">SUCCESS</span></td>
              </tr>
              <tr className="hover:bg-slate-50/30">
                <td className="p-3 font-semibold text-slate-800 flex items-center gap-2">
                  <span className="text-slate-400">📄</span> Document Recovery Initialized
                </td>
                <td className="p-3 font-mono text-[11px]">Chrome Browser</td>
                <td className="p-3">Virginia, USA</td>
                <td className="p-3">Oct 23, 2023 • 04:32 PM</td>
                <td className="p-3 text-right"><span className="bg-teal-50 text-teal-600 font-bold text-[9px] px-1.5 py-0.5 rounded">COMPLETED</span></td>
              </tr>
              <tr className="hover:bg-slate-50/30">
                <td className="p-3 font-semibold text-slate-800 flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Failed Login Attempt
                </td>
                <td className="p-3 font-mono text-[11px]">Unknown Device (203.0.113.1)</td>
                <td className="p-3">Kyiv, Ukraine</td>
                <td className="p-3">Oct 20, 2023 • 11:02 PM</td>
                <td className="p-3 text-right"><span className="bg-red-50 text-red-600 font-bold text-[9px] px-1.5 py-0.5 rounded">BLOCKED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}