import React from 'react';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[80vh]">
      <div className="w-full max-w-[440px] bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center gap-1.5 text-[#005f54] font-bold text-sm bg-teal-50 px-3 py-1 rounded-full mx-auto">
            <ShieldCheck className="w-4 h-4" /> FoundLink
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-xs text-slate-400">Secure access to your document recovery dashboard.</p>
        </div>

        <form className="space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" placeholder="name@example.com" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#005f54]" />
            </div>
          </div>
          <div>
           <div className="flex justify-between items-center mb-2">
  <label className="text-xs font-semibold text-slate-700">Password</label>
  
  {/* Halkan waa Link-ga saxda ah ee hadda shaqaynaya ee image_fe7ada.png */}
  <Link 
    to="/forgot-password" 
    className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors cursor-pointer"
  >
    Forgot password?
  </Link>
</div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#005f54]" />
            </div>
          </div>
          <Link to="/admin" className="w-full block text-center py-2.5 bg-[#005f54] text-white font-medium text-sm rounded-lg hover:bg-[#004d44] transition-colors pt-3">
            Sign In
          </Link>
        </form>

        <div className="relative flex py-2 items-center text-xs text-slate-400 uppercase tracking-wider justify-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4">Or continue with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50">
            <span className="w-4 h-4 bg-blue-100 text-blue-600 font-bold rounded-sm text-[10px] flex items-center justify-center">G</span> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50">
            <span className="w-4 h-4 bg-zinc-100 text-zinc-900 font-bold rounded-sm text-[10px] flex items-center justify-center">ID</span> ID.me
          </button>
        </div>

        <p className="text-xs text-slate-400">Don't have an account? <Link to="/register" className="text-[#005f54] font-bold hover:underline">Register Now</Link></p>
      </div>
    </div>
  );
}