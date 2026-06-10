import React from 'react';
import { Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function MainLayout({ children }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans antialiased">
      {/* HEADER GUUD */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 md:px-10 py-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          FoundLink
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link to="/search" className={`text-sm font-medium pb-1 transition-colors ${isActive('/search') ? 'text-slate-900 border-b-2 border-[#005f54]' : 'text-slate-500 hover:text-slate-900'}`}>
            Search
          </Link>
          <Link to="/upload" className={`text-sm font-medium pb-1 transition-colors ${isActive('/upload') ? 'text-slate-900 border-b-2 border-[#005f54]' : 'text-slate-500 hover:text-slate-900'}`}>
            Upload
          </Link>
          <Link to="/faq" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-5 text-slate-500 text-lg cursor-pointer">
          <Bell className="w-5 h-5 hover:text-slate-900 transition-colors" />
          <Link to="/login"><User className="w-5 h-5 hover:text-slate-900 transition-colors" /></Link>
        </div>
      </header>

      {/* MUUQAALKA BOGGA (Home, Search, ama Upload ayaa halkan soo fariisanaya) */}
      <div className="flex-1 w-full bg-[#f8fafc]">{children}</div>

      {/* FOOTER GUUD */}
      <footer className="bg-white border-t border-slate-200 px-6 md:px-14 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 w-full mt-auto">
        <div className="text-center md:text-left">
          <p className="font-bold text-slate-900 mb-1">FoundLink</p>
          <p>© 2024 FoundLink. Secure Document Recovery System.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}