import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50">
      {/* Bidix: Qaybta Madow/Buluugga ah */}
      <div className="lg:col-span-5 bg-[#0b1b2d] flex flex-col justify-center items-center p-8 text-center text-white relative overflow-hidden">
        <div className="max-w-sm space-y-8 z-10">
          {/* Mock Document Card */}
          <div className="bg-slate-300/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-[280px] mx-auto text-left relative">
            <div className="absolute -top-3 right-4 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
              <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span> End-to-End Encryption
            </div>
            <div className="w-full h-32 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-16 h-20 bg-slate-700 rounded border border-slate-600 p-2 space-y-1">
                <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                <div className="w-full h-1 bg-slate-500 rounded"></div>
                <div className="w-3/4 h-1 bg-slate-500 rounded"></div>
              </div>
            </div>
            <div className="h-2 w-3/4 bg-slate-500/50 rounded mb-2"></div>
            <div className="h-2 w-1/2 bg-slate-500/50 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 text-xs font-bold">✓</div>
              <div className="w-12 h-5 bg-teal-600 rounded-full"></div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Secure document recovery for everyone.</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join thousands of users who have successfully recovered lost credentials through our verified network.
            </p>
          </div>
        </div>
        {/* Qurxin gudaheeda ah */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Midig: Form-ka Diiwaangelinta */}
      <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10">
        {/* Header navigation */}
        <div className="flex justify-between items-center max-w-2xl w-full mx-auto">
          <div className="font-bold text-lg text-slate-900">FoundLink</div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <a href="#" className="hover:text-slate-900">FAQ</a>
            <a href="#" className="hover:text-slate-900">Support</a>
            <Link to="/login" className="text-[#005f54] hover:underline">Sign In</Link>
          </div>
        </div>

        {/* Card Box */}
        <div className="max-w-[460px] w-full mx-auto bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] my-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
            <p className="text-xs text-slate-400 mt-1">Fill in the details below to secure your identity.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/30 outline-none focus:bg-white focus:border-[#005f54]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email Address</label>
              <input type="email" placeholder="name@example.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/30 outline-none focus:bg-white focus:border-[#005f54]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/30 outline-none focus:bg-white focus:border-[#005f54]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50/30 outline-none focus:bg-white focus:border-[#005f54]" />
            </div>

            <div className="flex items-start gap-2.5 pt-2">
              <input type="checkbox" id="terms" className="mt-0.5 rounded border-slate-300 text-[#005f54] focus:ring-[#005f54]" />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                I agree to the <a href="#" className="text-[#005f54] font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-[#005f54] font-semibold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#005f54] text-white font-medium text-sm rounded-lg hover:bg-[#004d44] transition-colors mt-2">
              Complete Registration <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative flex py-4 items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider justify-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-3">Or Register With</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-700">
              <span className="font-bold text-red-500">G</span> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-700">
              <span className="font-bold text-teal-600">🪪</span> Passkey
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-xs text-slate-400 text-center">
          Already have an account? <Link to="/login" className="text-[#005f54] font-bold hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
}