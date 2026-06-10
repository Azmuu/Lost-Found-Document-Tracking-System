import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder }) {
  return (
    <div className="relative max-w-[600px] mx-auto">
      <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
      <input 
        type="text" 
        placeholder={placeholder || "Search for your document..."} 
        className="w-full pl-14 pr-6 py-4 border border-slate-200 rounded-full text-sm outline-none bg-white focus:border-[#005f54] transition-colors shadow-sm"
      />
    </div>
  );
}