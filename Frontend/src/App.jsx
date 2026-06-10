import Search from './pages/Search'; 
import UploadPage from './pages/Upload'; 
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Bell, User, ShieldAlert, Search as SearchIcon, 
  Upload, Menu, X, CheckCircle, Clock, ThumbsUp, FileUp, HelpCircle, 
  Layers, ShieldCheck, HeartHandshake 
} from 'lucide-react';

// Soo dejinta feylashaada gaarka ah (Haddii jidadku sax yihiin)
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import MyDocuments from './pages/MyDocuments';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Login from './pages/Login';

// ----------------------------------------------------------------------
// MAIN LAYOUT (Header & Footer)
// ----------------------------------------------------------------------
function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col font-sans antialiased text-slate-600">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-8 py-4 flex justify-between items-center max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="font-bold text-lg text-slate-950 tracking-tight">FoundLink</Link>
          
          {/* NAV LINKS (Halkan waxaa ku dhex jira links-ka Search, Upload, FAQ) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            
            {/* 1. Search Link */}
            <NavLink 
              to="/search" 
              className={({ isActive }) => 
                isActive 
                  ? "text-teal-700 border-b-2 border-teal-700 pb-1 font-bold" 
                  : "text-slate-500 hover:text-slate-900 transition-colors pb-1"
              }
            >
              Search
            </NavLink>

            {/* 2. Upload Link */}
           {/* 2. Upload Link ee ku dhex jira Header-ka sare */}
  <NavLink 
  to="/upload" 
  className={({ isActive }) => 
    isActive 
      ? "text-teal-700 border-b-2 border-teal-700 pb-1 font-bold" 
      : "text-slate-500 hover:text-slate-900 transition-colors pb-1"
  }
>
  Upload
</NavLink>

            {/* 3. FAQ Link */}
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                isActive 
                  ? "text-teal-700 border-b-2 border-teal-700 pb-1 font-bold" 
                  : "text-slate-500 hover:text-slate-900 transition-colors pb-1"
              }
            >
              FAQ
            </NavLink>

          </nav>
        </div>
        
        {/* Midigta Header-ka */}
        <div className="flex items-center gap-4">
          <button className="p-1 text-slate-400 hover:text-slate-600 relative">
            <Bell className="w-4 h-4" />
          </button>
          <Link to="/login" className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
            <User className="w-3.5 h-3.5 text-slate-600" />
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-[#fdfeff]">{children}</main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-8 px-8 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-bold text-slate-800 block">FoundLink</span>
            <p>© 2024 FoundLink. Secure Document Recovery System.</p>
          </div>
          <div className="flex gap-6 text-slate-500 font-semibold">
            <Link to="#" className="hover:text-slate-900">Privacy Policy</Link>
            <Link to="#" className="hover:text-slate-900">Terms of Service</Link>
            <Link to="#" className="hover:text-slate-900">Support</Link>
            <Link to="#" className="hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ----------------------------------------------------------------------
// HOME PAGE VIEW (Bogga Hore ee rasmiga ah)
// ----------------------------------------------------------------------
function HomePageView() {
  const stats = [
    { icon: CheckCircle, value: '10k+', label: 'Documents Recovered' },
    { icon: Clock, value: '24/7', label: 'Verification' },
    { icon: ThumbsUp, value: '98%', label: 'Success Rate' },
  ];

  const steps = [
    { icon: FileUp, title: 'Report', desc: 'Upload details of the lost or found document.' },
    { icon: SearchIcon, title: 'Match', desc: 'Our system identifies potential owners via secure links.' },
    { icon: ShieldCheck, title: 'Verify', desc: 'Government-grade identity verification ensures safety.' },
    { icon: HeartHandshake, title: 'Recover', desc: 'Secure handover coordinated via our courier partners.' },
  ];

  const recentDocs = [
    { type: 'Passport', name: 'M. Thompson', location: 'Heathrow Terminal 5', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=60' },
    { type: 'National ID', name: 'Sarah L. ***', location: 'Central Metro Station', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=60' },
    { type: 'Driver\'s License', name: 'J. Garcia', location: 'City Library Plaza', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&auto=format&fit=crop&q=60' },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-16">
        <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-100/70 p-10 md:p-14 text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight max-w-2xl mx-auto leading-tight">
            Securely Track and Recover Your Documents
          </h1>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            The global standard for verified lost & found logistics. We connect found vital documents with their rightful owners through secure government-grade verification.
          </p>

          {/* Search Bar Input */}
          <div className="max-w-xl mx-auto relative mt-4">
            <SearchIcon className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for your document..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-slate-300 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Two CTA Buttons */}
          <div className="pt-4 flex justify-center items-center gap-4">
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005f54] text-white rounded-lg text-xs font-bold hover:bg-[#004d44] transition-colors shadow-sm cursor-pointer"
            >
              <span className="text-sm">+</span> I Found a Document
            </Link>
            <Link 
              to="/search" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
            >
              <span className="text-sm">🔍</span> I Lost a Document
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-xl shadow-sm text-center space-y-2">
              <div className="w-9 h-9 rounded-full bg-teal-50 mx-auto flex items-center justify-center">
                <Icon className="w-4 h-4 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-[11px] font-medium text-slate-400">{stat.label}</p>
            </div>
          );
        })}
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="w-full bg-[#f8fafc] border-y border-slate-100 py-16 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">How it Works</h2>
            <p className="text-xs text-slate-400">Simple, secure, and transparent document recovery for everyone.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="space-y-3 max-w-[200px] mx-auto">
                  <div className="w-11 h-11 bg-cyan-100/80 text-cyan-700 rounded-full mx-auto flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{step.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. RECENTLY FOUND SECTION */}
      <section className="max-w-5xl mx-auto px-4 py-16 space-y-6">
        <div className="flex justify-between items-baseline">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Recently Found</h2>
            <p className="text-xs text-slate-400 mt-0.5">Verify if your document has been turned in.</p>
          </div>
          <Link to="/search" className="text-xs font-semibold text-slate-400 hover:text-slate-900 hover:underline">View All Items</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentDocs.map((doc, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-slate-200 transition-all">
              <div className="relative h-36 bg-slate-100">
                <img src={doc.img} alt={doc.type} className="w-full h-full object-cover filter brightness-[0.85] group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 right-3 bg-[#005f54] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Found</span>
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{doc.type}</span>
                <h4 className="text-sm font-bold text-slate-900 leading-none">{doc.name}</h4>
                <p className="text-[11px] text-slate-400 pt-1">📍 {doc.location}</p>
                <Link to="/login" className="w-full block text-center mt-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  Claim Document
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CAN'T FIND WHAT YOU'RE LOOKING FOR? */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-slate-900">Can't find what you're looking for?</h3>
            <p className="text-xs text-slate-400">Set up a smart notification. We'll alert you the moment a matching document is scanned into our secure registry.</p>
          </div>
          <Link to="/register" className="px-5 py-3 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors shadow-sm inline-flex items-center gap-2 shrink-0">
            🔔 Set Alert
          </Link>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------
// SEARCH VIEW
// ---------------------------------------------------------------------
function SearchView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Search System Directory</h2>
      <p className="text-xs text-slate-400">Geli nambarka warqada ama magaca si aad u baarato.</p>
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN ROUTER EXPORT
// ----------------------------------------------------------------------
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePageView /></MainLayout>} />
        <Route path="/search" element={<MainLayout><Search /></MainLayout>} />\
        <Route path="/upload" element={<MainLayout><UploadPage /></MainLayout>} />        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<MainLayout><div className="p-8 text-center text-sm font-medium">Dashboard Overview (Upload Section)</div></MainLayout>} />
        <Route path="/dashboard/documents" element={<MyDocuments />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/profile" element={<Profile />} />

        <Route path="*" element={<div className="p-8 text-center text-sm">404 — Page Not Found</div>} />
      </Routes>
    </Router>
  );
}