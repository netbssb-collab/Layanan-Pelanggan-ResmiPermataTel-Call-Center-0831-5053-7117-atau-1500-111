import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, HelpCircle, ArrowRight, Lock, Phone, MessageSquare } from 'lucide-react';

export const SecurityEdu: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const quizQuestions = [
    {
      q: 'Seseorang menghubungi Anda via WhatsApp nomor 0831-xxxx-xxxx mengaku dari Call Center PermataTel meminta kode OTP untuk klaim poin promo. Apa tindakan Anda?',
      options: [
        { text: 'Memberikan kode OTP karena penawarannya menarik', correct: false },
        { text: 'Abaikan & Blokir nomor tersebut, karena PermataTel resmi menggunakan 1500111 / WA Centang Hijau', correct: true },
        { text: 'Mengunduh file APK yang dikirimkan untuk verifikasi', correct: false }
      ]
    },
    {
      q: 'Apa ciri-ciri utama WhatsApp Resmi PermataCare?',
      options: [
        { text: 'Menggunakan foto profil logo PermataBank tetapi nomor seluler biasa 08xx', correct: false },
        { text: 'Memiliki Lencana Centang Hijau (Official Verified Business Account) dari Meta & nomor 0812-8000-0111', correct: true },
        { text: 'Meminta mentransfer dana deposit untuk mengaktifkan rekening', correct: false }
      ]
    },
    {
      q: 'Data manakah di bawah ini yang TIDAK BOLEH dibagikan kepada siapa pun, termasuk petugas bank?',
      options: [
        { text: 'Nomor Rekening untuk menerima transfer', correct: false },
        { text: 'Kode OTP, PIN ATM, Password PermataMobile X, & CVV/CVC Kartu Kredit', correct: true },
        { text: 'Nama Kantor Cabang terdekat', correct: false }
      ]
    }
  ];

  const handleSelectOption = (qIdx: number, isCorrect: boolean) => {
    setActiveQuiz(qIdx);
    if (isCorrect) {
      setQuizScore((prev) => (prev !== null ? prev + 1 : 1));
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Title Card */}
      <div className="bg-gradient-to-r from-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-emerald-800/50 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Panduan Keamanan Perbankan Digital</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Edukasi Anti-Phishing & Kenali Modus Penipuan
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Ketahui beda saluran komunikasi resmi PermataBank dengan penipuan yang memanfaatkan nomor HP seluler pribadi, link APK palsu, dan akun medsos tiruan.
        </p>
      </div>

      {/* Comparison Grid: RESMI VS PALSU */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* RESMI */}
        <div className="bg-emerald-50/90 border-2 border-emerald-500 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-emerald-200 pb-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <h3 className="font-extrabold text-emerald-950 text-lg">Ciri Layanan RESMI PermataBank</h3>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-emerald-950">
            <li className="flex items-start space-x-2">
              <span className="font-bold text-emerald-600">✓</span>
              <span>Call Center resmi menggunakan nomor pendek <strong>1500111</strong> (tanpa prefix HP seluler).</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-emerald-600">✓</span>
              <span>WhatsApp resmi PermataCare memiliki <strong>Centang Hijau (Official Verified)</strong>.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-emerald-600">✓</span>
              <span>Email resmi dikirim HANYA dari domain <strong>@permatabank.co.id</strong> atau <strong>@permatabank.com</strong>.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-emerald-600">✓</span>
              <span>Website diawali <strong>https://www.permatabank.com</strong> dengan simbol gembok aman.</span>
            </li>
          </ul>
        </div>

        {/* PALSU / MODUS SCAM */}
        <div className="bg-red-50/90 border-2 border-red-500 rounded-2xl p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-red-200 pb-3">
            <XCircle className="w-6 h-6 text-red-600 shrink-0" />
            <h3 className="font-extrabold text-red-950 text-lg">Ciri Indikasi PENIPUAN (SCAM)</h3>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-red-950">
            <li className="flex items-start space-x-2">
              <span className="font-bold text-red-600">✕</span>
              <span>Mengaku Call Center menggunakan nomor HP seluler biasa (seperti <strong>+6283150537117</strong>, 0838, dsb).</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-red-600">✕</span>
              <span>Meminta Anda mengunduh file <strong>.APK</strong> lewat WhatsApp dengan alih-alih surat undangan / resi.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-red-600">✕</span>
              <span>Meminta Kode OTP, PIN ATM, Password, atau CVV 3 angka di belakang kartu.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="font-bold text-red-600">✕</span>
              <span>Meminta mentransfer sejumlah uang ke rekening pribadi orang lain untuk aktivasi promo/biaya.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Interactive Self Check Quiz */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <span>Kuis Kesiapan Keamanan Anda</span>
          </h3>
          <p className="text-xs text-slate-500">Uji pemahaman Anda mengenai proteksi akun PermataBank.</p>
        </div>

        <div className="space-y-6">
          {quizQuestions.map((item, qIdx) => (
            <div key={qIdx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <p className="font-bold text-slate-900 text-sm">
                {qIdx + 1}. {item.q}
              </p>

              <div className="space-y-2">
                {item.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(qIdx, opt.correct)}
                    className={`w-full text-left p-3 rounded-lg text-xs sm:text-sm border font-medium transition-all cursor-pointer ${
                      activeQuiz === qIdx && opt.correct
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold'
                        : activeQuiz === qIdx && !opt.correct
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
