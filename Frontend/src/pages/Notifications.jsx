import React from 'react';
import { Bell, ShieldCheck, CheckCircle2, FileUp, Info, HelpCircle, Truck } from 'lucide-react';

export default function Notifications() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-xs text-slate-400 mt-0.5">Stay updated on your document status and potential matches detected by our secure recovery network.</p>
        </div>
        <button className="text-xs font-semibold text-slate-400 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg bg-white shadow-sm">Mark all as read</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Alerts & Updates */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">✦ Match Alerts</h2>
          
          {/* Big Green Alert Box */}
          <div className="bg-white rounded-xl border-l-4 border-[#005f54] border-y border-r border-slate-200 p-6 flex gap-4 shadow-sm">
            <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0">🔍</div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800">Potential Match Identified</h3>
                <span className="text-[9px] bg-teal-600 text-white font-bold px-1.5 py-0.5 rounded">NEW MATCH</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                A potential match for your <span className="font-semibold text-slate-800">National ID</span> has been found! Our biometric matching algorithm flagged a document uploaded in the Central District 2 hours ago.
              </p>
              <div className="flex gap-2 pt-1">
                <button className="px-4 py-1.5 bg-[#005f54] text-white text-xs font-bold rounded-md hover:bg-[#004d44]">Verify Now</button>
                <button className="px-4 py-1.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-md hover:bg-slate-50">Dismiss</button>
              </div>
            </div>
          </div>

          {/* Simple Update 1 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-500">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="flex-grow">
              <p className="text-slate-700">Account security update: Two-factor authentication enabled successfully.</p>
              <span className="text-[10px] text-slate-400 block mt-1 uppercase">YESTERDAY, 14:20</span>
            </div>
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
          </div>

          {/* Simple Update 2 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div className="flex-grow">
              <p className="text-slate-700">Your support ticket #8921 has received a new response from our agent.</p>
              <span className="text-[10px] text-slate-400 block mt-1 uppercase">2 DAYS AGO</span>
            </div>
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
          </div>
        </div>

        {/* Right: Activity Timeline */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">🔄 Activity Timeline</h2>
          
          <div className="bg-white rounded-xl border border-slate-200 p-5 relative space-y-6">
            {/* Timeline line structure */}
            <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-slate-100"></div>

            {/* Point 1 */}
            <div className="flex items-start gap-3 relative text-xs">
              <div className="w-4 h-4 rounded-full bg-teal-50 border-2 border-teal-600 flex items-center justify-center text-teal-600 z-10 p-0.5 mt-0.5"><Truck className="w-2.5 h-2.5" /></div>
              <div>
                <h4 className="font-bold text-[#005f54]">Courier Dispatched</h4>
                <p className="text-slate-500 text-[11px] mt-0.5">Your recovered Passport is on its way to your registered address.</p>
                <span className="text-[10px] text-slate-400 block mt-1">Just Now</span>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex items-start gap-3 relative text-xs">
              <div className="w-4 h-4 rounded-full bg-teal-50 border-2 border-teal-600 flex items-center justify-center text-teal-600 z-10 p-0.5 mt-0.5"><CheckCircle2 className="w-2.5 h-2.5" /></div>
              <div>
                <h4 className="font-bold text-slate-800">Verification Successful</h4>
                <p className="text-slate-500 text-[11px] mt-0.5">Biometric and record verification for 'Lost Wallet - Brown' completed.</p>
                <span className="text-[10px] text-slate-400 block mt-1">3 hours ago</span>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex items-start gap-3 relative text-xs">
              <div className="w-4 h-4 rounded-full bg-slate-100 border-2 border-slate-400 flex items-center justify-center text-slate-500 z-10 p-0.5 mt-0.5"><FileUp className="w-2.5 h-2.5" /></div>
              <div>
                <h4 className="font-bold text-slate-800">Document Uploaded</h4>
                <p className="text-slate-500 text-[11px] mt-0.5">New record 'Lost Passport - J. Doe' added to our tracking system.</p>
                <span className="text-[10px] text-slate-400 block mt-1">Oct 24, 09:12 AM</span>
              </div>
            </div>

            <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 flex items-center justify-center gap-2 pt-2.5">
              ✓ 2 Records Cleared <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Security Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden flex items-center md:h-28 mt-6">
        <div className="z-10 space-y-1">
          <h3 className="text-sm font-bold tracking-tight">Your Security is Our Priority</h3>
          <p className="text-xs text-slate-400">Utilizing end-to-end encryption for all document recovery communications.</p>
        </div>
        {/* Abstract Background Design for banner */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 font-mono text-[7px] overflow-hidden hidden md:block select-none leading-none pointer-events-none p-2 text-teal-400">
          0101010101010010101010101011110101010<br/>0101010101010101010101010101010101010<br/>1101010101010101010101010101010101010
        </div>
      </div>
    </div>
  );
}