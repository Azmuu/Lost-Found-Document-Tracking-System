import React from 'react';
import { LayoutDashboard, FileText, Bell, User, ShieldAlert, PlusCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: FileText, label: 'My Documents', path: '/admin/documents' },
    { icon: Bell, label: 'Notifications', path: '/admin/verification' },
    { icon: User, label: 'Profile', path: '/admin/users' },
    { icon: ShieldAlert, label: 'Admin Panel', path: '/admin' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 flex flex-col justify-between sticky top-[73px]">
      <div className="space-y-6">
        {/* User Profile Summary */}
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100">
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-[#0d9488] font-bold text-sm">JD</div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">Welcome back</h4>
            <p className="text-xs text-slate-400">Document Tracker</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path) && item.label === 'Admin Panel'
                  ? 'bg-teal-50 border-l-4 border-[#005f54] text-[#005f54]'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#005f54] text-white text-sm font-medium rounded-lg hover:bg-[#004d44] transition-colors shadow-sm">
        <PlusCircle className="w-4 h-4" /> Report Found Item
      </button>
    </aside>
  );
}