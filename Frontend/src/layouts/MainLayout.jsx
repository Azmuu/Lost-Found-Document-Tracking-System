import React from 'react';
import { Bell, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin, unreadCount } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/search', label: 'Search' },
    { to: '/upload', label: 'Upload' },
    ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard', match: '/dashboard' }] : []),
    ...(isAdmin ? [{ to: '/admin', label: 'Admin', match: '/admin' }] : []),
  ];

  const linkClass = (path, match) => {
    const active = match ? location.pathname.startsWith(match) : isActive(path);
    return active
      ? 'text-brand-700 dark:text-brand-300 font-semibold'
      : 'text-slate-600 dark:text-slate-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors';
  };

  return (
    <div className="min-h-screen flex flex-col hero-mesh">
      <header className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Found<span className="text-brand-600 dark:text-brand-400">Link</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <Link key={item.to} to={item.to} className={`text-sm ${linkClass(item.to, item.match)}`}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard/notifications" className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 text-brand-800 dark:text-brand-200 font-bold text-sm flex items-center justify-center"
                  >
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </Link>
                  <button onClick={handleLogout} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors" title="Sign out">
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <Link to="/login" className="btn-primary !py-2 !px-5 !text-xs">
                  Sign In
                </Link>
              )}
              <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium ${linkClass(item.to, item.match)}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 w-full"><Outlet /></main>

      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">FoundLink</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Secure document recovery platform connecting finders with rightful owners worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Platform</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/search" className="hover:text-brand-600 transition-colors">Search Documents</Link></li>
                <li><Link to="/upload" className="hover:text-brand-600 transition-colors">Report Found Item</Link></li>
                <li><Link to="/register" className="hover:text-brand-600 transition-colors">Create Account</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><a href="#" className="hover:text-brand-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand-600 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} FoundLink. Secure Document Recovery System.
          </div>
        </div>
      </footer>
    </div>
  );
}
