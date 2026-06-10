import React from 'react';
import { UploadCloud, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Upload() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Upload Found Document</h1>
          <p className="text-slate-400 text-sm mt-1">Submit details of a recovered document to help reunite it with its owner.</p>
        </div>

        {/* Box 1: Capture */}
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-[#005f54] text-white flex items-center justify-center text-xs font-bold">1</span>
            <h2 className="text-base font-bold text-slate-900">Capture Document</h2>
          </div>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-[#005f54] transition-colors cursor-pointer bg-slate-50/50">
            <div className="w-12 h-12 bg-teal-50 text-[#0d9488] rounded-full flex items-center justify-center mx-auto mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">Drag and drop images here</p>
            <p className="text-xs text-slate-400 mt-1">or click to browse from files</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-4">Supported: JPG, PNG, PDF (Max 10MB)</p>
          </div>
        </div>

        {/* Box 2: Details Form */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-6 rounded-full bg-[#005f54] text-white flex items-center justify-center text-xs font-bold">2</span>
            <h2 className="text-base font-bold text-slate-900">Document Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Name</label>
              <input type="text" placeholder="e.g. Passport, Driver's License" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white focus:border-[#005f54]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Type</label>
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white focus:border-[#005f54] text-slate-500">
                <option>Select Type</option>
                <option>Passport</option>
                <option>National ID</option>
                <option>Driver's License</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">ID Number (Partial/Full)</label>
              <input type="text" placeholder="Only visible to verified owners" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white focus:border-[#005f54]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Location Found</label>
              <input type="text" placeholder="City, Station or Landmark" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white focus:border-[#005f54]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Additional Description</label>
            <textarea rows="3" placeholder="Mention distinguishing features without revealing sensitive data..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white focus:border-[#005f54] resize-none"></textarea>
          </div>
        </div>

        {/* Footer actions of form */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-400 flex items-center gap-2 max-w-[400px]">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" /> Privacy Notice: Your upload is encrypted. Sensitive data is redacted and only shared with verified owners.
          </p>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#005f54] text-white font-medium text-sm rounded-xl hover:bg-[#004d44] transition-colors">
            Submit Record <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right Column (Live Preview & Tip) */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-4">
          <p className="text-xs uppercase font-bold tracking-wider text-[#0d9488] text-left">Live Preview</p>
          <div className="h-56 bg-slate-100 rounded-lg flex flex-col items-center justify-center text-slate-400 border border-slate-200">
            <EyeOff className="w-8 h-8 mb-2" />
            <p className="text-xs font-medium max-w-[180px]">No image uploaded yet. A preview will appear here.</p>
          </div>
          <div className="bg-teal-50/60 p-4 rounded-lg text-left border border-teal-100/50">
            <p className="text-xs uppercase font-bold tracking-wider text-[#0d9488] mb-1">Quick Tip</p>
            <p className="text-xs text-slate-600 leading-relaxed">Ensure the document is well-lit and all four corners are visible for faster AI processing and verification.</p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl space-y-2 relative overflow-hidden">
          <h3 className="text-base font-bold">Secure Link</h3>
          <p className="text-xs text-slate-400 leading-relaxed">FoundLink uses 256-bit encryption for all document transmissions. Your identity as a finder is protected.</p>
        </div>
      </div>
    </div>
  );
}