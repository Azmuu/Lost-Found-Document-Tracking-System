import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Bell, User, Upload, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, unreadCount } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
    { name: 'My Documents', path: '/dashboard/my-documents', icon: FileText },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-1" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="font-bold text-xl tracking-tight">FoundLink</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/upload" className="text-xs font-semibold text-[#005f54] hover:underline hidden sm:block">Upload</Link>
          <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 text-[#005f54] dark:text-teal-300 font-bold rounded-full flex items-center justify-center text-[11px]">
            {initials || 'U'}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4 flex flex-col justify-between transform transition-transform lg:translate-x-0 lg:static lg:h-[calc(100vh-65px)] ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="space-y-6">
            <div className="flex justify-between lg:hidden">
              <span className="text-xs font-bold text-slate-400 uppercase">Menu</span>
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-600">
              <h4 className="text-xs font-bold">Welcome, {user?.name?.split(' ')[0]}</h4>
              <p className="text-[10px] text-slate-400">{user?.email}</p>
            </div>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold ${isActive(item.path) ? 'bg-teal-50 dark:bg-teal-900/30 text-[#005f54] dark:text-teal-300' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                    {item.path.includes('notifications') && unreadCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-[9px] px-1.5 rounded-full">{unreadCount}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-700">
            <Link to="/upload" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#005f54] text-white text-xs font-bold rounded-lg">
              <Upload className="w-4 h-4" /> Report Found Item
            </Link>
            <button
              onClick={() => { logout(); navigate('/login'); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-500 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {mobileOpen && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
