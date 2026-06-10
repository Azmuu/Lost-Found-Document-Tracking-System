import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Bell, User, ShieldAlert, PlusCircle, Search, Upload, Menu, X } from 'lucide-react';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'My Documents', path: '/admin/documents', icon: FileText },
    { name: 'Notifications', path: '/admin/verification', icon: Bell },
    { name: 'Profile', path: '/admin/users', icon: User },
    { name: 'Admin Panel', path: '/admin', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans antialiased">
      {/* TOP NAV */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <button className="lg:hidden text-slate-500 p-1 hover:bg-slate-100 rounded" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="font-bold text-xl text-slate-900 tracking-tight">FoundLink</Link>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-slate-500">
          <Link to="/search" className="flex items-center gap-1 hover:text-slate-900"><Search className="w-4 h-4" /> Search</Link>
          <Link to="/upload" className="flex items-center gap-1 text-[#005f54] border-b-2 border-[#005f54] pb-0.5"><Upload className="w-4 h-4" /> Upload</Link>
          <Link to="/faq" className="hover:text-slate-900 hidden sm:block">FAQ</Link>
          <button className="relative p-1 text-slate-400 hover:text-slate-600">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-teal-800 text-white font-bold rounded-full flex items-center justify-center text-[11px]">JD</div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* SIDEBAR COMPONENT */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 p-4 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-65px)] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="space-y-6">
            <div className="flex justify-between items-center lg:hidden">
              <span className="font-bold text-xs text-slate-400 uppercase tracking-wider">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-slate-100 rounded text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100">
              <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-[#0d9488] font-bold text-xs">JD</div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-none">Welcome back</h4>
                <p className="text-[10px] text-slate-400 mt-1">Document Tracker</p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.name} to={item.path} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${isActive(item.path) ? 'bg-teal-50 text-[#005f54]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#005f54] text-white text-xs font-bold rounded-lg hover:bg-[#004d44] transition-colors shadow-sm">
              <PlusCircle className="w-4 h-4" /> Report Found Item
            </button>
          </div>
        </aside>

        {mobileMenuOpen && (
          <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"></div>
        )}

        {/* ADMIN INNER BOGGA */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-[calc(100vh-65px)]">{children}</main>
      </div>

      <footer className="bg-white border-t border-slate-200 px-6 py-6 text-center text-xs text-slate-400 w-full mt-auto">
        © 2024 FoundLink. Secure Document Recovery System.
      </footer>
    </div>
  );
}