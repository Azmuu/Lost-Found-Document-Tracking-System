import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, Clock, TrendingUp, FileUp, Search, ShieldCheck,
  HeartHandshake, ArrowRight, MapPin, Sparkles, Lock, Bell,
} from 'lucide-react';
import { searchDocuments } from '../services/documentService';
import { resolveImageUrl } from '../utils/imageUrl';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentDocs, setRecentDocs] = useState([]);

  useEffect(() => {
    searchDocuments({ limit: 3, sort: 'recent' })
      .then(({ data }) => setRecentDocs(data.data || []))
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const stats = [
    { icon: CheckCircle2, value: '10k+', label: 'Documents Recovered', color: 'from-emerald-500 to-teal-600' },
    { icon: Clock, value: '24/7', label: 'Live Verification', color: 'from-cyan-500 to-blue-600' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate', color: 'from-violet-500 to-purple-600' },
  ];

  const steps = [
    { icon: FileUp, step: '01', title: 'Report', desc: 'Upload found document details and a secure photo.' },
    { icon: Search, step: '02', title: 'Match', desc: 'Our system compares records and alerts potential owners.' },
    { icon: ShieldCheck, step: '03', title: 'Verify', desc: 'Administrators verify authenticity before publishing.' },
    { icon: HeartHandshake, step: '04', title: 'Recover', desc: 'Owners claim and safely recover their documents.' },
  ];

  const features = [
    { icon: Lock, title: 'End-to-End Security', desc: 'Encrypted uploads & masked sensitive data' },
    { icon: Bell, title: 'Real-Time Alerts', desc: 'Instant notifications when matches are found' },
    { icon: ShieldCheck, title: 'Admin Verified', desc: 'Every record reviewed before going live' },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Hero */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/2 -left-32 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
            <div className="section-label mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              Trusted Document Recovery Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Securely Track &{' '}
              <span className="bg-gradient-to-r from-brand-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Recover Your Documents
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Connect people who find lost IDs, passports, and certificates with their rightful owners — through verified records and real-time notifications.
            </p>

            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-400 to-emerald-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
              <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-2xl shadow-card border border-slate-200/80 dark:border-slate-700 p-1.5">
                <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, type, or keywords..."
                  className="flex-1 px-3 py-3 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <button type="submit" className="btn-primary !rounded-xl !py-2.5 !px-5 shrink-0">
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/upload" className="btn-primary w-full sm:w-auto">
                <FileUp className="w-4 h-4" /> I Found a Document
              </Link>
              <Link to="/search" className="btn-secondary w-full sm:w-auto">
                <Search className="w-4 h-4" /> I Lost a Document
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-brand-600" />
                    <span>{f.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="stat-card text-center sm:text-left sm:flex sm:items-center sm:gap-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-soft shrink-0 mx-auto sm:mx-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white/70 dark:bg-slate-900/50 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="section-label">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Four secure steps from reporting a found document to safe recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="step-card group">
                  <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 tracking-widest">{step.step}</span>
                  <div className="w-14 h-14 mx-auto mt-4 mb-5 rounded-2xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-brand-800 transition-all duration-300">
                    <Icon className="w-6 h-6 text-brand-700 dark:text-brand-300 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recently Found */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label mb-3">Live Registry</span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-3">Recently Found</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Verified documents waiting to be claimed.</p>
          </div>
          <Link to="/search" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-400 hover:gap-2 transition-all">
            View all items <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentDocs.length === 0 ? (
            <div className="col-span-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-12 text-center">
              <FileUp className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">No verified documents yet.</p>
              <p className="text-sm text-slate-400 mt-1">Be the first to report a found item!</p>
              <Link to="/upload" className="btn-primary mt-6 inline-flex">Report Found Document</Link>
            </div>
          ) : (
            recentDocs.map((doc) => (
              <article
                key={doc._id}
                className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
                  {doc.images?.[0]?.url ? (
                    <img
                      src={resolveImageUrl(doc.images[0].url)}
                      alt={doc.documentName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShieldCheck className="w-12 h-12 text-slate-300" />
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-700 text-white shadow-soft">
                    Verified
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                    {doc.documentType}
                  </span>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{doc.documentName}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-brand-500" />
                    {doc.locationFound}
                  </p>
                  <Link
                    to="/search"
                    className="block w-full text-center py-2.5 mt-2 rounded-xl text-sm font-semibold border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950 transition-colors"
                  >
                    Claim Document
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-emerald-800 p-10 sm:p-14 text-center text-white shadow-glow">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0yNCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
          <div className="relative space-y-5 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-brand-100 text-sm sm:text-base leading-relaxed">
              Set up smart alerts — we&apos;ll notify you the moment a matching document is verified in our secure registry.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-800 font-bold text-sm hover:bg-brand-50 shadow-lg transition-colors">
              <Bell className="w-4 h-4" /> Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
