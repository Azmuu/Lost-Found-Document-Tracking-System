import React from 'react';
import { Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 md:px-10 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
        FoundLink
      </Link>
      <nav className="hidden md:flex gap-8">
        <Link to="/search" className={`text-sm font-medium pb-1 transition-colors ${isActive('/search') ? 'text-slate-900 border-b-2 border-[#005f54]' : 'text-slate-500 hover:text-slate-900'}`}>Search</Link>
        <Link to="/upload" className={`text-sm font-medium pb-1 transition-colors ${isActive('/upload') ? 'text-slate-900 border-b-2 border-[#005f54]' : 'text-slate-500 hover:text-slate-900'}`}>Upload</Link>
        <Link to="/faq" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">FAQ</Link>
      </nav>
      <div className="flex items-center gap-5 text-slate-500 text-lg cursor-pointer">
        <Bell className="w-5 h-5 hover:text-slate-900 transition-colors" />
        <Link to="/login"><User className="w-5 h-5 hover:text-slate-900 transition-colors" /></Link>
      </div>
    </header>
  );
}