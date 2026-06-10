import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 px-6 md:px-14 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 w-full mt-auto">
      <div className="text-center md:text-left">
        <p className="font-bold text-slate-900 mb-1">FoundLink</p>
        <p>© 2026 FoundLink. Secure Document Recovery System.</p>
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
        <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
      </div>
    </footer>
  );
}