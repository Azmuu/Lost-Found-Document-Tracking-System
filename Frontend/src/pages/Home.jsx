import React from 'react';
import SearchBar from '../components/SearchBar';
import DocumentCard from '../components/DocumentCard';
import { PlusCircle, FileText, CheckCircle2, Clock, ThumbsUp, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pb-1">
      {/* Hero Box */}
      <div className="max-w-[900px] mx-auto mt-12 mb-16 px-4">
        <div className="bg-white rounded-xl p-8 md:p-14 text-center border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900">
            Securely Track and Recover Your Documents
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-[600px] mx-auto mb-8 leading-relaxed">
            The global standard for verified lost & found logistics. We connect found vital documents with their rightful owners through secure government-grade verification.
          </p>
          
          <SearchBar placeholder="Search for your document..." />
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/upload" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#005f54] text-white text-sm font-medium rounded-lg hover:bg-[#004d44] transition-colors shadow-sm">
              <PlusCircle className="w-4 h-4" /> I Found a Document
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-slate-900 text-sm font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <FileText className="w-4 h-4" /> I Lost a Document
            </button>
          </div>
        </div>
      </div>

      {/* Mini Stats */}
      <div className="max-w-[1100px] mx-auto mb-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl text-center border border-slate-100 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-[#005f54] mx-auto mb-3" />
          <div className="text-2xl font-bold text-slate-900 mb-1">10k+</div>
          <div className="text-xs text-slate-400">Documents Recovered</div>
        </div>
        <div className="bg-white p-6 rounded-xl text-center border border-slate-100 shadow-sm">
          <Clock className="w-5 h-5 text-[#005f54] mx-auto mb-3" />
          <div className="text-2xl font-bold text-slate-900 mb-1">24/7</div>
          <div className="text-xs text-slate-400">Verification</div>
        </div>
        <div className="bg-white p-6 rounded-xl text-center border border-slate-100 shadow-sm">
          <ThumbsUp className="w-5 h-5 text-[#005f54] mx-auto mb-3" />
          <div className="text-2xl font-bold text-slate-900 mb-1">98%</div>
          <div className="text-xs text-slate-400">Success Rate</div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-slate-100 py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">How it Works</h2>
        <p className="text-slate-400 text-sm mb-12">Simple, secure, and transparent document recovery for everyone.</p>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { i: FileText, t: "Report", d: "Upload details of the lost or found document." },
            { i: CheckCircle2, t: "Match", d: "Our system identifies potential owners via secure links." },
            { i: CheckCircle2, t: "Verify", d: "Government-grade identity verification ensures safety." },
            { i: ThumbsUp, t: "Recover", d: "Secure handover coordinated via our courier partners." }
          ].map((s, idx) => (
            <div key={idx}>
              <div className="w-12 h-12 bg-[#99f6e4] text-[#0d9488] rounded-full flex items-center justify-center mx-auto mb-4">
                <s.i className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold mb-2">{s.t}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Found */}
      <div className="max-w-[1100px] mx-auto my-20 px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recently Found</h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1">Verify if your document has been turned in.</p>
          </div>
          <Link to="/search" className="text-slate-400 hover:text-slate-900 text-sm font-medium transition-colors">View All Items</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DocumentCard type="Passport" name="M. Thompson" location="Heathrow Terminal 5" bgClass="bg-gradient-to-br from-slate-800 to-slate-600" badge="Found" />
          <DocumentCard type="National ID" name="Sarah L. ***" location="Central Metro Station" bgClass="bg-gradient-to-br from-slate-200 to-slate-300" badge="Found" />
          <DocumentCard type="Driver's License" name="J. Garcia" location="City Library Plaza" bgClass="bg-gradient-to-br from-slate-300 to-slate-400" badge="Found" />
        </div>
      </div>

      {/* Smart Notification Banner */}
      <div className="max-w-[1100px] mx-auto mb-20 px-4">
        <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-1">Can't find what you're looking for?</h3>
            <p className="text-slate-400 text-sm">Set up a smart notification. We'll alert you the moment a matching document is scanned into our secure registry.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors">
            <Bell className="w-4 h-4" /> Set Alert
          </button>
        </div>
      </div>
    </div>
  );
}