import React from 'react';
import { Users, Clock, FileCheck, ArrowUpRight, BarChart3, Search, RefreshCw, Download, CheckCircle2, XCircle, MapPin } from 'lucide-react';

export default function Dashboard() {
  // Xogta Shaxda (Verification Queue)
  const queueData = [
    { type: 'Passport', id: '****-8821', date: 'Oct 24, 2023', status: 'In Review', statusColor: 'bg-blue-50 text-blue-600' },
    { type: 'National ID', id: '****-3312', date: 'Oct 23, 2023', status: 'Pending', statusColor: 'bg-amber-50 text-amber-600' },
    { type: 'Driving License', id: '****-0094', date: 'Oct 23, 2023', status: 'Ready', statusColor: 'bg-emerald-50 text-emerald-600' },
  ];

  // Xogta Isticmaalayaasha (User Directory)
  const users = [
    { name: 'Jane Doe', active: 'Active 2m ago', initial: 'JD', color: 'bg-teal-100 text-teal-700' },
    { name: 'Marcus Thorne', active: 'Admin Staff', initial: 'MT', color: 'bg-slate-100 text-slate-700', isAdmin: true },
    { name: 'Elena Lopez', active: 'Active 1h ago', initial: 'EL', color: 'bg-cyan-100 text-cyan-700' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. TOP TITLE WITH ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Oversight</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time monitoring and verification terminal.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export Logs
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#005f54] text-white rounded-lg text-xs font-semibold hover:bg-[#004d44] transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh View
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">12,482</h3>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100"></div>
        </div>

        {/* In Queue */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">In Queue</span>
            <span className="w-2 h-2 rounded-full bg-red-500 mt-1"></span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">156</h3>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100"></div>
        </div>

        {/* Verified Documents */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Documents</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Global</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">8,902</h3>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100"></div>
        </div>

        {/* Match Rate */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm relative overflow-hidden border-l-4 border-l-teal-600">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Match Rate</span>
            <span className="text-[10px] font-bold text-teal-600 uppercase">Optimal</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">74.2%</h3>
        </div>
      </div>

      {/* 3. CENTER SECTIONS (QUEUE & GRAPH PLACEHOLDER) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verification Queue Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Verification Queue</h3>
                <span className="text-[10px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded">New Requests</span>
              </div>
              <button className="text-[11px] font-bold text-teal-700 hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-5 py-3">Document Type</th>
                    <th className="px-5 py-3">ID Number</th>
                    <th className="px-5 py-3">Date Found</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-medium">
                  {queueData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 text-slate-900 font-semibold">{row.type}</td>
                      <td className="px-5 py-3.5 font-mono text-slate-500">{row.id}</td>
                      <td className="px-5 py-3.5 text-slate-400">{row.date}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-center items-center gap-2">
                          <button className="p-1 text-slate-400 hover:text-emerald-600 rounded hover:bg-emerald-50 transition-colors">
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Matches Over Time (Placeholder) */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Matches Over Time</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Monthly match conversion rate</p>
          </div>
          {/* Chart Graphic Simulation */}
          <div className="h-28 flex items-end justify-between gap-2 px-2 border-b border-slate-100 pb-1 mt-6">
            <div className="w-full bg-slate-100 h-[30%] rounded-t-sm hover:bg-teal-600 transition-colors cursor-pointer"></div>
            <div className="w-full bg-slate-100 h-[45%] rounded-t-sm hover:bg-teal-600 transition-colors cursor-pointer"></div>
            <div className="w-full bg-slate-100 h-[25%] rounded-t-sm hover:bg-teal-600 transition-colors cursor-pointer"></div>
            <div className="w-full bg-slate-100 h-[60%] rounded-t-sm hover:bg-teal-600 transition-colors cursor-pointer"></div>
            <div className="w-full bg-slate-100 h-[40%] rounded-t-sm hover:bg-teal-600 transition-colors cursor-pointer"></div>
            <div className="w-full bg-teal-600 h-[85%] rounded-t-sm"></div>
            <div className="w-full bg-slate-100 h-[50%] rounded-t-sm hover:bg-teal-600 transition-colors cursor-pointer"></div>
          </div>
          <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase mt-2 px-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM SECTIONS (USER DIRECTORY & HEATMAP) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Directory */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">User Directory</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Filter users..." 
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-slate-300"
              />
            </div>
            <div className="space-y-3 pt-1">
              {users.map((user, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center font-bold text-[11px]`}>
                      {user.initial}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 leading-none">{user.name}</h5>
                      <span className="text-[10px] text-slate-400 block mt-1">{user.active}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full text-center text-xs font-bold text-teal-700 pt-4 border-t border-slate-100 mt-4 hover:underline">
            Manage All Users
          </button>
        </div>

        {/* Regional Heatmap */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-1 z-10">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Regional Heatmap</h3>
            <p className="text-[11px] text-slate-400 max-w-sm">
              Discover density of lost documents across active sectors to optimize courier dispatch.
            </p>
          </div>
          
          {/* Radial Decorative Glow simulating Heatmap pattern */}
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-teal-50/60 to-transparent rounded-full -mr-16 -mb-16 pointer-events-none"></div>

          <div className="pt-8 z-10">
            <button className="inline-flex items-center justify-center px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-colors shadow-sm">
              Launch Geospatial View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}