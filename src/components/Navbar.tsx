import React from 'react';
import { PhoneCall, ShieldAlert, CheckCircle2, MessageSquare, AlertTriangle, FileText, Lock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/50 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('verify')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">Permata<span className="text-emerald-400">Tel</span></span>
                <span className="text-[10px] font-semibold bg-emerald-800/80 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-600/40">RESMI</span>
              </div>
              <p className="text-xs text-emerald-200/80 hidden sm:block">Portal Layanan Pelanggan & Verifikasi Anti-Penipuan PermataBank</p>
            </div>
          </div>

          {/* Quick Emergency Action Hotline */}
          <div className="hidden lg:flex items-center space-x-3 bg-emerald-900/60 border border-emerald-700/50 px-4 py-2 rounded-xl">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-xs">
              <span className="text-emerald-300 block font-medium">PermataTel Call Center 24 Jam</span>
              <a href="tel:1500111" className="font-bold text-base text-white hover:text-emerald-300 transition-colors flex items-center space-x-1">
                <PhoneCall className="w-4 h-4 text-emerald-400 inline mr-1" />
                1500111
              </a>
            </div>
          </div>

          {/* Emergency Call Button Mobile */}
          <div className="lg:hidden flex items-center space-x-2">
            <a
              href="tel:1500111"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-3 py-2 rounded-lg text-xs flex items-center space-x-1 shadow-md transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1500111</span>
            </a>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto pb-3 pt-1 scrollbar-none text-xs sm:text-sm font-medium border-t border-emerald-900/40">
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'verify'
                ? 'bg-emerald-500 text-emerald-950 font-bold shadow'
                : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Cek / Verifikasi Nomor</span>
            <span className="bg-red-500/20 text-red-300 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1 border border-red-500/30">Penting</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-chat')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'ai-chat'
                ? 'bg-emerald-500 text-emerald-950 font-bold shadow'
                : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tanya AI Search Grounding</span>
            <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-semibold px-1.5 py-0.5 rounded">Live AI</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'directory'
                ? 'bg-emerald-500 text-emerald-950 font-bold shadow'
                : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Kontak & Saluran Resmi</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'report'
                ? 'bg-emerald-500 text-emerald-950 font-bold shadow'
                : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Lapor Pengaduan / Penipuan</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'emergency'
                ? 'bg-red-600 text-white font-bold shadow'
                : 'text-red-200 hover:bg-red-950/60 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-red-400" />
            <span>Darurat & Blokir Kartu</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'security'
                ? 'bg-emerald-500 text-emerald-950 font-bold shadow'
                : 'text-emerald-100 hover:bg-emerald-900/50 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Edukasi Anti-Phishing</span>
          </button>
        </div>

      </div>
    </header>
  );
};
