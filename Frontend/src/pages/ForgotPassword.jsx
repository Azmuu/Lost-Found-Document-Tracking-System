import React from 'react';
import { RefreshCw, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4">
      {/* Top Brand Name */}
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">FoundLink</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secure Document Recovery</p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[440px] mx-auto bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] text-center space-y-6">
        <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <RefreshCw className="w-5 h-5" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Forgot Password</h2>
          <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
            Enter your email to receive a reset link. We'll help you get back to tracking your documents.
          </p>
        </div>

        <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input type="email" placeholder="citizen@agency.gov" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/30 outline-none focus:bg-white focus:border-[#005f54]" />
            </div>
          </div>

          <button className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#005f54] text-white font-medium text-sm rounded-lg hover:bg-[#004d44] transition-colors">
            Send Recovery Link <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2">
          <Link to="/login" className="text-xs font-bold text-[#005f54] hover:underline">
            Back to login
          </Link>
        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="max-w-2xl w-full mx-auto flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2 border-t border-slate-200/60 pt-6">
        <span>© 2024 FoundLink. Secure Document Recovery System.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>
    </div>
  );
}