import React from 'react';
import { ShieldAlert, CheckCircle, PhoneCall, MessageSquare, AlertOctagon, HelpCircle } from 'lucide-react';

interface HeroBannerProps {
  setActiveTab: (tab: string) => void;
  onVerifySampleNumber?: (num: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ setActiveTab, onVerifySampleNumber }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white border-b border-emerald-800/40 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f392b15_1px,transparent_1px),linear-gradient(to_bottom,#0f392b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        
        {/* Banner Alert Pill */}
        <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-medium mb-4">
          <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Waspada Penipuan WhatsApp/Telepon Mengaku PermataTel (+6283150537117, dsb.)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Title & Text */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Portal Resmi Layanan Pelanggan <br />
              <span className="text-emerald-400">PermataTel & Verifikasi Anti-Penipuan</span>
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Verifikasi keaslian kontak yang menghubungi Anda, akses nomor resmi <strong className="text-white">Call Center 1500111</strong>, lapor indikasi modus penipuan, dan minta bantuan AI resmi PermataCare yang terintegrasi dengan Google Search data real-time.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => {
                  setActiveTab('verify');
                  if (onVerifySampleNumber) onVerifySampleNumber('+6283150537117');
                }}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span>Cek Nomor +6283150537117</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('verify');
                  if (onVerifySampleNumber) onVerifySampleNumber('1500111');
                }}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-200 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cek Nomor Official 1500111</span>
              </button>

              <button
                onClick={() => setActiveTab('ai-chat')}
                className="bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-200 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                <span>Tanya AI PermataCare</span>
              </button>
            </div>
          </div>

          {/* Official Call Center Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-emerald-800/60 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Kontak Resmi Utama</span>
                </div>
                <span className="text-[11px] text-slate-400">Bebas Akses 24/7</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/50">
                  <div>
                    <p className="text-xs text-emerald-300 font-medium">PermataTel Call Center</p>
                    <p className="text-xl font-extrabold text-white">1500111</p>
                  </div>
                  <a
                    href="tel:1500111"
                    className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 transition-colors shadow"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Panggil</span>
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <p className="text-xs text-slate-300 font-medium">WhatsApp PermataCare</p>
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1 rounded">Centang Hijau</span>
                    </div>
                    <p className="text-base font-bold text-white">0812-8000-0111</p>
                  </div>
                  <a
                    href="https://wa.me/6281280000111"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    Chat WA
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-amber-200/90 flex items-start space-x-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>PermataBank <strong>TIDAK PERNAH</strong> memakai nomor seluler HP pribadi (seperti 0831/08xx) untuk menghubungi Anda meminta OTP atau PIN!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
