import React from 'react';
import { ArrowRight, Star, Award, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 lg:p-16 text-center">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest mb-6">
            Semester Genap 2025/2026
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Selamat Datang di Portal Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Teknik Grafika</span>
          </h1>
          
          <div className="prose prose-lg mx-auto text-slate-600 mb-8 leading-relaxed">
            <p className="font-medium text-xl text-slate-800 mb-4">
              Halo, para kreator muda Smaksaka!
            </p>
            <p>
              Selamat datang di ruang belajar digital khusus Konsentrasi Keahlian Teknik Grafika. 
              Website ini dirancang sebagai pusat sumber belajar, eksplorasi, dan pengembangan kompetensi kalian.
            </p>
            <p className="mt-4 italic text-slate-500">
              "Mari kita asah ketajaman desain dan presisi teknik produksi grafika untuk menghasilkan karya yang inspiratif dan bernilai tinggi."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button 
              onClick={() => navigate(PageRoute.TECHNIQUE)}
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3"
            >
              Mulai Belajar
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                 <span>M</span>
              </div>
              <span>Malabi Wibowo Susanto, S.Kom.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <Star size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Materi Interaktif</h3>
          <p className="text-slate-600">
            Pelajari konsep dasar hingga lanjutan dengan simulasi dan visualisasi yang menarik.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <Award size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Kompetensi Industri</h3>
          <p className="text-slate-600">
            Kurikulum disesuaikan dengan standar industri grafika modern dan kebutuhan pasar.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <Zap size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Integrasi AI</h3>
          <p className="text-slate-600">
            Memahami bagaimana Artificial Intelligence merevolusi dunia percetakan dan desain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;