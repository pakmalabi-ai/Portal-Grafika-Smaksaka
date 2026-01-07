import React from 'react';
import { Construction } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Placeholder: React.FC = () => {
  const location = useLocation();
  
  // Extract page name from path
  const pageName = location.pathname.replace('/', '').replace('-', ' ').toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
      <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6 text-slate-400">
        <Construction size={40} />
      </div>
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Halaman {pageName}</h2>
      <p className="text-slate-500 max-w-md">
        Halaman ini belum tersedia. Materi untuk halaman ini akan ditambahkan pada pembaruan berikutnya.
      </p>
      <div className="mt-8 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-400">
        Status: Waiting for Instructor Input
      </div>
    </div>
  );
};

export default Placeholder;