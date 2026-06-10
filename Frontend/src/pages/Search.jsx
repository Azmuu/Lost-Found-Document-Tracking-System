import React from 'react';
import DocumentCard from '../components/DocumentCard';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Search() {
  return (
    <div className="max-w-[1250px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 bg-white p-6 rounded-xl border border-slate-200 self-start space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <SlidersHorizontal className="w-4 h-4 text-slate-800" />
          <h2 className="text-base font-bold text-slate-900">Filters</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Name</label>
            <input type="text" placeholder="e.g. Passport" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Document Type</label>
            <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white text-slate-600">
              <option>All Types</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">ID Number (Last 4 digits)</label>
            <input type="text" placeholder="####" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Found After</label>
            <input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 outline-none focus:bg-white text-slate-400" />
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <button className="w-full py-2.5 bg-[#005f54] text-white rounded-lg text-sm font-medium hover:bg-[#004d44] transition-colors">Apply Filters</button>
          <button className="w-full py-2.5 bg-transparent text-slate-700 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Reset</button>
        </div>
      </aside>

      {/* Grid Results Column */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">24</span> documents found matching your criteria</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Sort by:</span>
            <select className="bg-transparent text-slate-900 font-semibold outline-none cursor-pointer">
              <option>Most Recent</option>
            </select>
          </div>
        </div>

        {/* Dynamic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <DocumentCard type="European Union Passport" name="Central Library, London" idRef="****4921" bgClass="bg-gradient-to-br from-slate-800 to-slate-700" badge="Found" />
          <DocumentCard type="Driving License" name="City Metro Station" idRef="****8802" bgClass="bg-gradient-to-br from-slate-200 to-slate-300" badge="Verified" />
          <DocumentCard type="National ID Card" name="Skyview Shopping Mall" idRef="****1154" bgClass="bg-gradient-to-br from-slate-700 to-slate-800" badge="Found" />
          <DocumentCard type="Birth Certificate" name="Parks & Recreation Office" idRef="****3329" bgClass="bg-gradient-to-br from-slate-100 to-slate-200" badge="Found" />
        </div>

        {/* Pagination Bottom */}
        <div className="flex justify-between items-center pt-8 border-t border-slate-200">
          <p className="text-xs text-slate-400">Showing 1-12 of 24 results</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="px-3.5 py-1.5 bg-[#005f54] text-white text-xs font-bold rounded-lg">1</button>
            <button className="px-3.5 py-1.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50">2</button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}