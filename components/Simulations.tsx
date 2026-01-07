import React, { useState } from 'react';
import { Printer, Box, Image, Layers, ArrowRight, CheckCircle2, RotateCw, HelpCircle, XCircle, RefreshCw } from 'lucide-react';
import { MachineType } from '../types';

// --- Printing Machine Selector Simulation ---
export const PrintingMachineSelector: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('offset');

  const machines: MachineType[] = [
    {
      id: 'offset',
      name: 'Offset Printing',
      description: 'Menggunakan plat sebagai acuan cetak. Tinta ditransfer dari plat ke blanket karet, lalu ke kertas.',
      bestFor: 'Produksi massal (>1000 eksemplar), biaya per unit sangat murah.',
      products: ['Buku Paket', 'Koran', 'Kalender Massal'],
      iconName: 'layers'
    },
    {
      id: 'digital',
      name: 'Digital Printing',
      description: 'Tanpa plat, mencetak langsung dari file komputer. Proses sangat cepat (On-Demand).',
      bestFor: 'Cetak satuan atau jumlah sedikit, kebutuhan mendesak.',
      products: ['Banner', 'Stiker Satuan', 'Kartu Nama'],
      iconName: 'printer'
    },
    {
      id: 'screen',
      name: 'Screen Printing (Sablon)',
      description: 'Menggunakan kassa/screen dengan teknik menyapu tinta secara manual atau semi-otomatis.',
      bestFor: 'Media tidak datar atau bertekstur kasar, efek khusus.',
      products: ['Kaos', 'Tas Kain', 'Undangan Mewah'],
      iconName: 'image'
    },
    {
      id: 'flexo',
      name: 'Flexografi / Gravure',
      description: 'Menggunakan silinder berputar (rotary). Sangat cepat untuk media fleksibel.',
      bestFor: 'Industri kemasan (packaging) skala besar.',
      products: ['Kemasan Snack', 'Label Botol', 'Plastik'],
      iconName: 'box'
    }
  ];

  const getIcon = (name: string) => {
    switch(name) {
      case 'printer': return <Printer />;
      case 'box': return <Box />;
      case 'image': return <Image />;
      default: return <Layers />;
    }
  };

  const activeMachine = machines.find(m => m.id === selectedId) || machines[0];

  return (
    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <RotateCw className="text-primary-600" />
        Simulasi Pemilihan Mesin
      </h3>
      <p className="text-slate-600 mb-6 text-sm">Klik pada jenis mesin untuk melihat karakteristik dan penggunaannya.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
        {machines.map((machine) => (
          <button
            key={machine.id}
            onClick={() => setSelectedId(machine.id)}
            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center gap-2 ${
              selectedId === machine.id
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {getIcon(machine.iconName)}
            {machine.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm transition-all duration-300">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-slate-900 mb-2">{activeMachine.name}</h4>
            <p className="text-slate-600 mb-4 leading-relaxed">{activeMachine.description}</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-100">
              <span className="font-semibold text-blue-800 block mb-1">Karakteristik Utama:</span>
              <p className="text-blue-700 text-sm">{activeMachine.bestFor}</p>
            </div>
          </div>
          <div className="md:w-1/3 bg-slate-50 rounded-lg p-4 border border-slate-100">
            <h5 className="font-semibold text-slate-700 mb-3 border-b pb-2">Contoh Produk:</h5>
            <ul className="space-y-2">
              {activeMachine.products.map((prod, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  {prod}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Workflow Stepper Simulation ---
export const WorkflowStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "Pre-Press",
      subtitle: "Persiapan adalah Kunci",
      details: [
        "Layouting: Menyusun tata letak desain.",
        "Pre-flight: Cek CMYK, resolusi 300 DPI, font embed.",
        "Imposition: Mengatur urutan halaman.",
        "Output: Pembuatan Plat (Offset) atau RIP (Digital)."
      ],
      color: "bg-blue-500"
    },
    {
      title: "Press",
      subtitle: "Eksekusi Presisi",
      details: [
        "Penyetelan register warna agar presisi.",
        "Transfer tinta ke media cetak.",
        "Quality Control berkala saat mesin jalan.",
        "Kecepatan produksi stabil."
      ],
      color: "bg-indigo-500"
    },
    {
      title: "Post-Press",
      subtitle: "Sentuhan Akhir",
      details: [
        "Cutting: Potong sesuai ukuran (Guillotine).",
        "Laminating: Doff/Glossy agar awet.",
        "Binding: Jilid lem panas, kawat, atau spiral.",
        "Die-cutting: Potong bentuk khusus."
      ],
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stepper Header */}
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`relative z-10 flex flex-col items-center group focus:outline-none`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 border-4 ${
              activeStep === idx 
                ? `${step.color} border-white shadow-lg scale-110` 
                : idx < activeStep 
                  ? 'bg-slate-700 border-white' 
                  : 'bg-slate-300 border-white'
            }`}>
              {idx + 1}
            </div>
            <span className={`mt-2 text-xs font-bold uppercase transition-colors ${
              activeStep === idx ? 'text-slate-900' : 'text-slate-400'
            }`}>
              {step.title}
            </span>
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden relative">
        <div className={`h-1 w-full ${steps[activeStep].color}`}></div>
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{steps[activeStep].title}</h3>
              <p className="text-lg text-primary-600 font-medium italic">"{steps[activeStep].subtitle}"</p>
            </div>
            <div className={`p-3 rounded-full ${steps[activeStep].color} bg-opacity-10`}>
              <Layers className={`text-slate-700`} size={24} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {steps[activeStep].details.map((detail, idx) => (
               <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                 <div className={`mt-1 min-w-[6px] h-[6px] rounded-full ${steps[activeStep].color}`}></div>
                 <p className="text-slate-700 text-sm">{detail}</p>
               </div>
             ))}
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 flex justify-between border-t border-slate-100">
          <button 
            disabled={activeStep === 0}
            onClick={() => setActiveStep(prev => prev - 1)}
            className="text-sm font-medium text-slate-500 disabled:opacity-30 hover:text-slate-900 px-4 py-2"
          >
            &larr; Sebelumnya
          </button>
          <button 
            disabled={activeStep === steps.length - 1}
            onClick={() => setActiveStep(prev => prev + 1)}
            className="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Selanjutnya <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Production Quiz ---
export const ProductionQuiz: React.FC = () => {
  // Questions data
  const questions = [
    {
      id: 1,
      question: "Klien membutuhkan 5.000 lembar brosur full color dengan biaya per unit termurah. Mesin apa yang paling tepat?",
      options: ["Digital Printing", "Offset Printing", "Screen Printing (Sablon)", "Plotter"],
      correct: 1, // Index of Offset Printing
      explanation: "Offset Printing sangat efisien untuk cetakan jumlah banyak (>1000) karena biaya per unit turun drastis dibandingkan Digital."
    },
    {
      id: 2,
      question: "Dalam tahap Pre-Press, apa istilah untuk proses menyusun tata letak halaman agar sesuai saat dilipat?",
      options: ["Color Separation", "Imposition", "Laminating", "Scanning"],
      correct: 1,
      explanation: "Imposition adalah teknik pengaturan tata letak halaman pada lembar cetak (plat) agar urutan halaman benar setelah dilipat dan dipotong."
    },
    {
      id: 3,
      question: "Format mode warna apa yang WAJIB digunakan untuk file siap cetak?",
      options: ["RGB", "CMYK", "Grayscale", "Lab Color"],
      correct: 1,
      explanation: "Mesin cetak menggunakan 4 tinta dasar: Cyan, Magenta, Yellow, Black (CMYK). RGB hanya untuk tampilan layar."
    },
    {
      id: 4,
      question: "Manakah yang BUKAN termasuk proses Post-Press (Finishing)?",
      options: ["Jilid (Binding)", "Laminating", "CTP (Computer to Plate)", "Die-Cutting"],
      correct: 2,
      explanation: "CTP (Computer to Plate) adalah bagian dari proses Pre-Press, yaitu output desain digital ke plat cetak."
    }
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);
    if (index === questions[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-lg">
        <div className="w-20 h-20 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Kuis Selesai!</h3>
        <p className="text-slate-600 mb-6">Kamu telah menyelesaikan kuis pemahaman teknik dasar.</p>
        
        <div className="text-4xl font-extrabold text-primary-600 mb-2">{score} / {questions.length}</div>
        <p className="text-sm text-slate-500 mb-8">Jawaban Benar</p>

        <button 
          onClick={resetQuiz}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium"
        >
          <RefreshCw size={18} />
          Ulangi Kuis
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-primary-600" />
          <span className="font-bold text-slate-700">Kuis Pemahaman</span>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
          Soal {currentQ + 1} dari {questions.length}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-6 leading-relaxed">
          {q.question}
        </h4>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let stateClass = "border-slate-200 hover:bg-slate-50 hover:border-slate-300";
            if (isAnswered) {
              if (idx === q.correct) stateClass = "bg-emerald-50 border-emerald-500 text-emerald-700";
              else if (idx === selectedOpt) stateClass = "bg-red-50 border-red-500 text-red-700";
              else stateClass = "opacity-50 border-slate-100";
            } else if (selectedOpt === idx) {
              stateClass = "bg-primary-50 border-primary-500";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex justify-between items-center ${stateClass}`}
              >
                <span className="font-medium">{opt}</span>
                {isAnswered && idx === q.correct && <CheckCircle2 size={20} className="text-emerald-500" />}
                {isAnswered && idx === selectedOpt && idx !== q.correct && <XCircle size={20} className="text-red-500" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className={`p-4 rounded-xl ${selectedOpt === q.correct ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}>
              <div className="flex items-center gap-2 mb-1">
                {selectedOpt === q.correct 
                  ? <span className="text-emerald-700 font-bold flex items-center gap-1"><CheckCircle2 size={16}/> Benar!</span> 
                  : <span className="text-red-700 font-bold flex items-center gap-1"><XCircle size={16}/> Kurang Tepat</span>
                }
              </div>
              <p className="text-sm text-slate-700">{q.explanation}</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                onClick={nextQuestion}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/20 transition-all flex items-center gap-2"
              >
                {currentQ === questions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};