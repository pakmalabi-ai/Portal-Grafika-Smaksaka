import React, { useState } from 'react';
import { Eye, BookOpen, BrainCircuit, Lightbulb, Gamepad2, GraduationCap, ClipboardList } from 'lucide-react';
import { PrintingMachineSelector, WorkflowStepper, ProductionQuiz } from '../components/Simulations';
import { InteractiveLKPD } from '../components/InteractiveLKPD';

const TechniqueBasics: React.FC = () => {
  const [mindfulnessActive, setMindfulnessActive] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Teknik Dasar Proses Produksi Grafika
        </h1>
        <p className="text-slate-500">Materi Kelas XI • Bab 1 s.d Bab 4</p>
      </div>

      {/* BAB 1: Filosofi */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
            <Eye size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Bab 1: Filosofi & Dunia Percetakan</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mindfulness Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-10 -mt-10 opacity-50"></div>
             <h3 className="text-lg font-bold text-slate-900 mb-2">1.1 Menyadari Kehadiran Grafika (Mindful)</h3>
             <p className="text-slate-600 text-sm mb-4">
               Sebelum masuk ke teknis, mari berhenti sejenak. Perhatikan label botol, cover buku, hingga poster dinding.
             </p>
             
             {!mindfulnessActive ? (
               <button 
                onClick={() => setMindfulnessActive(true)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors"
               >
                 Mulai Aktivitas Mindfulness
               </button>
             ) : (
               <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 animate-in fade-in duration-500">
                 <p className="text-emerald-800 text-sm italic">
                   "Pejamkan mata, sentuh tekstur kertas buku atau plastik kemasan. Rasakan permukaannya. Bayangkan ide desainer berubah menjadi fisik di tanganmu. Inilah keajaiban grafika."
                 </p>
                 <button 
                  onClick={() => setMindfulnessActive(false)} 
                  className="mt-3 text-xs text-emerald-600 font-bold hover:underline"
                 >
                   Selesai
                 </button>
               </div>
             )}
          </div>

          {/* Definition Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">1.2 Definisi Percetakan</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-500">Konsep Dasar</span>
                <span className="font-medium text-slate-900">Produksi Massal (Tinta + Media + Acuan)</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600">
                <strong>Tugas Eksplorasi AI:</strong> Buka ChatGPT, tanya: 
                <em className="block mt-1 text-slate-800">"Bagaimana penemuan mesin cetak Gutenberg mengubah peradaban manusia vs revolusi digital saat ini?"</em>
              </div>
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">1.3 Klasifikasi Produk Grafika</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               {t: 'Komersial', d: 'Promosi (Brosur)', c: 'bg-blue-50 text-blue-700'},
               {t: 'Penerbitan', d: 'Informasi (Buku)', c: 'bg-orange-50 text-orange-700'},
               {t: 'Kemasan', d: 'Proteksi (Dus)', c: 'bg-green-50 text-green-700'},
               {t: 'Khusus', d: 'Sablon/E-money', c: 'bg-purple-50 text-purple-700'},
             ].map((item, i) => (
               <div key={i} className={`p-4 rounded-xl ${item.c} text-center`}>
                 <div className="font-bold text-sm mb-1">{item.t}</div>
                 <div className="text-xs opacity-80">{item.d}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* BAB 2: Komponen & Perangkat */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
            <BrainCircuit size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Bab 2: Komponen & Perangkat</h2>
        </div>

        <div className="bg-indigo-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden mb-6">
           <div className="relative z-10">
             <h3 className="text-xl font-bold mb-2">2.1 Pre-Press Digital & AI</h3>
             <p className="text-indigo-200 mb-4 text-sm max-w-lg">Bukan hanya Adobe Creative Suite, kita menggunakan asisten cerdas:</p>
             <ul className="space-y-2 text-sm">
               <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-400 rounded-full"></div>AI Upscaling: Memperbesar gambar pecah.</li>
               <li className="flex items-center gap-2"><div className="w-2 h-2 bg-indigo-400 rounded-full"></div>AI Color Matching: Sinkronisasi warna layar vs cetak.</li>
             </ul>
           </div>
           <BrainCircuit className="absolute -bottom-4 -right-4 text-indigo-800 w-40 h-40 opacity-50" />
        </div>

        {/* INTERACTIVE SIMULATION 1 */}
        <PrintingMachineSelector />
        
        <div className="bg-slate-100 p-4 rounded-xl text-center text-sm text-slate-600">
          <strong>2.3 Bahan Baku:</strong> Kertas (HVS, Art Paper, Ivory) & Tinta (Water-based, Oil-based, UV).
        </div>
      </section>

      {/* BAB 3: Workflow */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-pink-100 text-pink-700 rounded-lg">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Bab 3: Alur Kerja (Workflow)</h2>
        </div>
        
        {/* INTERACTIVE SIMULATION 2 */}
        <WorkflowStepper />
      </section>

      {/* BAB 4 & Reflection */}
      <section className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
              <Lightbulb size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Bab 4: Integrasi AI</h2>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600">1.</span>
                  <span><strong>Predictive Maintenance:</strong> AI prediksi kerusakan mesin.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600">2.</span>
                  <span><strong>Automated Pre-flight:</strong> Skrip AI perbaiki dokumen otomatis.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-amber-600">3.</span>
                  <span><strong>Generative Design:</strong> Variasi desain kemasan instan.</span>
                </li>
              </ul>
          </div>
        </div>

        {/* LKPD SECTION */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 text-primary-700 rounded-lg">
              <ClipboardList size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Lembar Kerja Peserta Didik (LKPD)</h2>
          </div>
          <InteractiveLKPD />
        </div>

        {/* QUIZ SECTION */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
           <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Uji Pemahaman</h2>
          </div>
          <ProductionQuiz />
        </div>

        {/* REFLECTION */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
           <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 text-red-700 rounded-lg">
              <Gamepad2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Refleksi (Joyful Learning)</h2>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border border-red-100">
             <h4 className="font-bold text-slate-800 mb-2 text-sm">Studi Kasus Cepat:</h4>
             <p className="text-xs text-slate-600 mb-3">
               Klien ingin cetak 10 poster untuk besok pagi. Belum punya desain.
             </p>
             <div className="space-y-2">
               <div className="bg-white p-2 rounded text-xs border border-red-100">
                 <span className="text-red-600 font-bold">Kritis:</span> Gunakan Digital Printing (Cepat & Sedikit).
               </div>
               <div className="bg-white p-2 rounded text-xs border border-red-100">
                 <span className="text-red-600 font-bold">Kreatif:</span> Gunakan Generative AI untuk buat desain kilat.
               </div>
             </div>
          </div>
        </div>
        
        <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl text-center italic font-serif">
          "Hasil cetakan yang baik bukan hanya tentang mesin yang mahal, tapi tentang ketelitian rasa dan dedikasi seorang teknisi dalam menjaga kualitas setiap lembar yang keluar."
        </div>
      </section>

    </div>
  );
};

export default TechniqueBasics;