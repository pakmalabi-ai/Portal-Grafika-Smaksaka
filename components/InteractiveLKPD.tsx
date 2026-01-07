import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Award,
  BookOpen,
  MessageSquare,
  Printer,
  MousePointer2,
  User,
  Download,
  Save
} from 'lucide-react';

export const InteractiveLKPD: React.FC = () => {
  // State for Student Info
  const [studentInfo, setStudentInfo] = useState({ name: '', class: 'XI TG' });
  
  // Navigation State
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  
  // Form Data States
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [caseStudyAnswer, setCaseStudyAnswer] = useState('');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [workflowPlan, setWorkflowPlan] = useState({ 
    product: '', 
    method: '', 
    prePress: '',
    press: '',
    postPress: ''
  });

  const totalSteps = 4;

  // --- Effects ---

  // 1. Calculate Progress
  useEffect(() => {
    const currentProgress = (activeStep / totalSteps) * 100;
    setProgress(currentProgress);
  }, [activeStep]);

  // 2. Load data from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('lkpd_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.studentInfo) setStudentInfo(parsed.studentInfo);
        if (parsed.aiAnalysis) setAiAnalysis(parsed.aiAnalysis);
        if (parsed.caseStudyAnswer) setCaseStudyAnswer(parsed.caseStudyAnswer);
        if (parsed.selectedTools) setSelectedTools(parsed.selectedTools);
        if (parsed.workflowPlan) setWorkflowPlan(parsed.workflowPlan);
      } catch (e) {
        console.error("Gagal memuat data tersimpan:", e);
      }
    }
  }, []);

  // 3. Auto-save data to LocalStorage on change
  useEffect(() => {
    const dataToSave = {
      studentInfo,
      aiAnalysis,
      caseStudyAnswer,
      selectedTools,
      workflowPlan,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem('lkpd_data', JSON.stringify(dataToSave));
  }, [studentInfo, aiAnalysis, caseStudyAnswer, selectedTools, workflowPlan]);

  // --- Handlers ---

  const toolsList = [
    { id: 'ctp', name: 'Computer to Plate (CTP)', category: 'Pre-Press' },
    { id: 'offset', name: 'Mesin Cetak Offset', category: 'Press' },
    { id: 'guillotine', name: 'Mesin Potong (Guillotine)', category: 'Post-Press' },
    { id: 'lamination', name: 'Mesin Laminasi', category: 'Post-Press' },
    { id: 'digital', name: 'Digital Press Machine', category: 'Press' },
  ];

  const toggleTool = (id: string) => {
    if (selectedTools.includes(id)) {
      setSelectedTools(selectedTools.filter(t => t !== id));
    } else {
      setSelectedTools([...selectedTools, id]);
    }
  };

  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Pop-up diblokir! Izinkan pop-up untuk mencetak.");
      return;
    }

    const toolNames = selectedTools.map(tId => {
      const tool = toolsList.find(t => t.id === tId);
      return tool ? tool.name : tId;
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>LKPD - ${studentInfo.name}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; mx-auto; }
          .header { border-bottom: 3px solid #4f46e5; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #4f46e5; margin: 0; font-size: 24px; }
          .header p { margin: 5px 0 0; color: #64748b; font-size: 14px; }
          
          .info-box { background: #f1f5f9; padding: 15px; border-radius: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 30px; border: 1px solid #cbd5e1; }
          .info-item label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; display: block; }
          .info-item span { font-weight: bold; font-size: 16px; }

          h2 { font-size: 18px; border-left: 5px solid #4f46e5; padding-left: 10px; margin-top: 30px; background: #eef2ff; padding-top: 5px; padding-bottom: 5px; }
          
          .answer-section { margin-bottom: 20px; padding-left: 15px; }
          .answer-box { background: #fff; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; }
          .answer-box ul { margin: 5px 0; padding-left: 20px; }
          
          .workflow-grid { display: grid; gap: 10px; }
          .workflow-item { background: #f8fafc; padding: 10px; border: 1px dashed #cbd5e1; border-radius: 5px; }
          .workflow-label { font-weight: bold; color: #4f46e5; font-size: 12px; display: block; margin-bottom: 5px; }

          .footer { margin-top: 50px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Lembar Kerja Peserta Didik (LKPD)</h1>
          <p>Teknik Grafika - SMK Negeri 1 Kaligondang</p>
        </div>

        <div class="info-box">
          <div class="info-item">
            <label>Nama Siswa</label>
            <span>${studentInfo.name || '(Belum diisi)'}</span>
          </div>
          <div class="info-item">
            <label>Kelas</label>
            <span>${studentInfo.class}</span>
          </div>
          <div class="info-item">
            <label>Tanggal Pengerjaan</label>
            <span>${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <h2>Aktivitas 1: Analisis AI (Offset vs Digital)</h2>
        <div class="answer-section">
          <div class="answer-box">${aiAnalysis ? aiAnalysis.replace(/\n/g, '<br/>') : '<em style="color:#94a3b8">Jawaban belum diisi</em>'}</div>
        </div>

        <h2>Aktivitas 2: Inventaris Alat & Studi Kasus</h2>
        <div class="answer-section">
          <div class="answer-box">
            <strong>Alat Post-Press Terpilih:</strong>
            <ul>
              ${toolNames.length > 0 ? toolNames.map(n => `<li>${n}</li>`).join('') : '<li>Tidak ada alat dipilih</li>'}
            </ul>
            <hr style="border:0; border-top:1px dashed #e2e8f0; margin:15px 0"/>
            <strong>Analisis Kasus (Die-cutting vs Guillotine):</strong>
            <p>${caseStudyAnswer ? caseStudyAnswer.replace(/\n/g, '<br/>') : '<em style="color:#94a3b8">Jawaban belum diisi</em>'}</p>
          </div>
        </div>

        <h2>Aktivitas 3: Rencana Produksi</h2>
        <div class="answer-section">
          <div class="info-box" style="margin-bottom:15px; border: 1px solid #e2e8f0; background: #fff;">
             <div class="info-item"><label>Produk</label><span>${workflowPlan.product || '-'}</span></div>
             <div class="info-item"><label>Metode</label><span>${workflowPlan.method || '-'}</span></div>
          </div>
          <div class="workflow-grid">
            <div class="workflow-item">
              <span class="workflow-label">PRE-PRESS</span>
              ${workflowPlan.prePress || '-'}
            </div>
            <div class="workflow-item">
              <span class="workflow-label">PRESS</span>
              ${workflowPlan.press || '-'}
            </div>
            <div class="workflow-item">
              <span class="workflow-label">POST-PRESS</span>
              ${workflowPlan.postPress || '-'}
            </div>
          </div>
        </div>

        <div class="footer">
          Dokumen ini digenerate secara otomatis melalui Portal Digital Teknik Grafika.<br/>
          Guru Pengampu: Malabi Wibowo Susanto, S.Kom.
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleDownloadData = () => {
    const data = {
      meta: {
        title: "LKPD Teknik Grafika",
        school: "SMK Negeri 1 Kaligondang",
        date: new Date().toLocaleDateString('id-ID')
      },
      student: studentInfo,
      answers: {
        activity1_aiAnalysis: aiAnalysis,
        activity2_tools: selectedTools,
        activity2_caseStudy: caseStudyAnswer,
        activity3_workflow: workflowPlan
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LKPD_${studentInfo.name.replace(/\s+/g, '_')}_XI_TG.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Data berhasil diunduh! Silakan kirim file JSON ini kepada Guru.");
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden" id="lkpd-section">
      {/* Header & Identity */}
      <div className="bg-primary-700 text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ClipboardCheck className="text-primary-200" /> LKPD Digital
            </h2>
            <p className="text-primary-200 text-sm">Lembar Kerja Peserta Didik Interaktif</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] bg-white/10 px-2 py-1 rounded text-emerald-300">
               <Save size={10} /> Auto-save aktif
            </span>
            <span className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium border border-white/20">
              SMK Negeri 1 Kaligondang
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 bg-primary-800/50 p-4 rounded-xl border border-primary-600/50">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-primary-200 flex items-center gap-1">
              <User size={10} /> Nama Siswa
            </label>
            <input 
              type="text" 
              placeholder="Ketik Nama Lengkap..."
              className="bg-transparent border-b border-primary-400 focus:outline-none focus:border-white py-1 text-sm text-white placeholder-primary-400/50 transition-all w-full"
              value={studentInfo.name}
              onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-primary-200">Kelas</label>
            <select 
              className="bg-transparent border-b border-primary-400 focus:outline-none py-1 text-sm text-white w-full [&>option]:text-slate-900"
              value={studentInfo.class}
              onChange={(e) => setStudentInfo({...studentInfo, class: e.target.value})}
            >
              <option>XI TG</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-100">
        <div 
          className="h-full bg-emerald-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="p-6 md:p-8">
        
        {/* STEP 1: MINDFUL OBSERVATION & AI EXPLORATION */}
        {activeStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <Search size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Aktivitas 1: Detektif Grafika & Eksplorasi AI</h3>
                <p className="text-sm text-slate-500">Menganalisis definisi dan jenis produk secara kritis.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-amber-900 italic">
                  <strong>Mindful Task:</strong> Amati satu benda cetak di dekatmu (Buku, Stiker, atau Label Botol). Perhatikan kualitas gambarnya, kehalusan permukaannya, dan warnanya.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-2">Tugas Mandiri (TP.1):</label>
                <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  Gunakan AI (seperti ChatGPT/Gemini) untuk meriset hal berikut: <br/>
                  <em className="text-slate-800 font-medium">"Jelaskan perbedaan utama produk cetak offset dan digital dari sisi biaya dan kualitas untuk skala industri."</em>
                </p>
                <textarea 
                  className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all min-h-[150px] text-sm"
                  placeholder="Ketikkan analisis hasil temuanmu di sini..."
                  value={aiAnalysis}
                  onChange={(e) => setAiAnalysis(e.target.value)}
                ></textarea>
                <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                  <CheckCircle size={12} /> Analisis dengan bahasa sendiri, hindari copas mentah dari AI.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: MEANINGFUL TOOL IDENTIFICATION */}
        {activeStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <Settings size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Aktivitas 2: Inventaris Alat Produksi</h3>
                <p className="text-sm text-slate-500">Mengidentifikasi komponen dan alat sesuai fungsinya.</p>
              </div>
            </div>

            <p className="mb-4 font-semibold text-slate-700">Pilihlah alat yang termasuk dalam kategori <span className="text-primary-600">Post-Press (Finishing)</span>:</p>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {toolsList.map(tool => (
                <div 
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center group ${
                    selectedTools.includes(tool.id) 
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' 
                    : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="font-bold block text-sm group-hover:text-blue-700">{tool.name}</span>
                    <span className="text-[10px] opacity-70 uppercase tracking-tighter font-bold">{tool.category}</span>
                  </div>
                  {selectedTools.includes(tool.id) ? (
                    <CheckCircle size={20} className="text-blue-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-blue-300"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-5 bg-blue-900 text-white rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
              <h4 className="font-bold mb-2 flex items-center gap-2 text-blue-100 relative z-10">
                <MessageSquare size={18} /> Kasus Nyata (Meaningful)
              </h4>
              <p className="text-sm leading-relaxed text-blue-50 relative z-10 mb-3">
                Sebuah percetakan di Kaligondang menerima pesanan 500 pack Dus Snack. Mengapa Mesin Die-cutting lebih dibutuhkan daripada Mesin Potong Guillotine biasa untuk proyek ini? Jelaskan singkat.
              </p>
              <textarea 
                className="w-full p-3 bg-blue-800/50 border border-blue-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-400 placeholder-blue-300/50 relative z-10" 
                rows={3} 
                placeholder="Tuliskan jawaban analisismu di sini..."
                value={caseStudyAnswer}
                onChange={(e) => setCaseStudyAnswer(e.target.value)}
              ></textarea>
            </div>
          </div>
        )}

        {/* STEP 3: JOYFUL PRODUCTION PLANNING */}
        {activeStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Aktivitas 3: Menjadi Manager Produksi</h3>
                <p className="text-sm text-slate-500">Melaksanakan simulasi alur kerja produksi.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Nama Produk</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Katalog Sekolah"
                    className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all text-sm"
                    value={workflowPlan.product}
                    onChange={(e) => setWorkflowPlan({...workflowPlan, product: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Metode Cetak</label>
                  <select 
                    className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all text-sm"
                    value={workflowPlan.method}
                    onChange={(e) => setWorkflowPlan({...workflowPlan, method: e.target.value})}
                  >
                    <option value="">-- Pilih Metode --</option>
                    <option>Digital Printing</option>
                    <option>Offset Printing</option>
                    <option>Sablon / Screen Printing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Rancang Alur Produksimu (TP.3):</label>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 p-3 flex text-[10px] font-bold text-slate-500 tracking-wider">
                    <div className="w-1/4">TAHAP</div>
                    <div className="w-3/4 pl-2">DETAIL AKTIVITAS & PENANGGUNG JAWAB</div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="flex p-3 bg-white">
                      <div className="w-1/4 text-xs font-bold text-purple-700 pt-2">PRE-PRESS</div>
                      <textarea 
                        className="w-3/4 text-sm p-2 bg-slate-50 rounded border border-transparent focus:border-purple-200 focus:bg-white focus:outline-none transition-all" 
                        rows={2} 
                        placeholder="Desain, CTP, dll..."
                        value={workflowPlan.prePress}
                        onChange={(e) => setWorkflowPlan({...workflowPlan, prePress: e.target.value})}
                      ></textarea>
                    </div>
                    <div className="flex p-3 bg-white">
                      <div className="w-1/4 text-xs font-bold text-indigo-700 pt-2">PRESS</div>
                      <textarea 
                        className="w-3/4 text-sm p-2 bg-slate-50 rounded border border-transparent focus:border-indigo-200 focus:bg-white focus:outline-none transition-all" 
                        rows={2} 
                        placeholder="Proses cetak..."
                        value={workflowPlan.press}
                        onChange={(e) => setWorkflowPlan({...workflowPlan, press: e.target.value})}
                      ></textarea>
                    </div>
                    <div className="flex p-3 bg-white">
                      <div className="w-1/4 text-xs font-bold text-blue-700 pt-2">POST-PRESS</div>
                      <textarea 
                        className="w-3/4 text-sm p-2 bg-slate-50 rounded border border-transparent focus:border-blue-200 focus:bg-white focus:outline-none transition-all" 
                        rows={2} 
                        placeholder="Finishing..."
                        value={workflowPlan.postPress}
                        onChange={(e) => setWorkflowPlan({...workflowPlan, postPress: e.target.value})}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: REFLECTION & SUBMIT */}
        {activeStep === 4 && (
          <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-6">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Award size={48} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Luar Biasa, {studentInfo.name.split(' ')[0] || 'Sobat Grafika'}!</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">Kamu telah menyelesaikan seluruh rangkaian eksplorasi Deep Learning hari ini.</p>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 max-w-sm mx-auto mb-8">
              <h4 className="font-bold text-sm mb-4 text-slate-700">Refleksi Akhir</h4>
              <div className="flex justify-center gap-4 mb-4">
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:scale-110 transition-all text-2xl shadow-sm">😞</button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-amber-50 hover:border-amber-200 hover:scale-110 transition-all text-2xl shadow-sm">😐</button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 hover:scale-110 transition-all text-2xl shadow-sm">😊</button>
              </div>
              <p className="text-[10px] text-slate-400 italic">"Pilihlah perasaanmu setelah menyelesaikan modul ini."</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={handlePrintPDF}
                className="px-6 py-3 border-2 border-primary-600 text-primary-700 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-50 transition-all"
              >
                <Printer size={18} /> Simpan PDF
              </button>
              <button 
                onClick={handleDownloadData}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:-translate-y-1 transition-all flex items-center gap-2"
              >
                <Download size={18} /> Download LKPD
              </button>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
          <button 
            disabled={activeStep === 1}
            onClick={() => setActiveStep(activeStep - 1)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeStep === 1 
              ? 'text-slate-300 cursor-not-allowed' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            ← Kembali
          </button>
          
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(num => (
              <div 
                key={num} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === num ? 'w-8 bg-primary-600' : 'bg-slate-200'}`}
              ></div>
            ))}
          </div>

          {activeStep < totalSteps && (
            <button 
              onClick={() => setActiveStep(activeStep + 1)}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-primary-700 hover:shadow-lg transition-all flex items-center gap-2 group"
            >
              Lanjutkan 
              <MousePointer2 size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};