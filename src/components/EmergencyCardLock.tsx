import React from 'react';
import { Lock, PhoneCall, AlertTriangle, ShieldOff, Smartphone, CreditCard, ChevronRight } from 'lucide-react';

export const EmergencyCardLock: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-900 rounded-2xl p-6 sm:p-8 text-white border border-red-800/60 shadow-xl space-y-4">
        <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>Tindakan Darurat 24 Jam</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Layanan Blokir Kartu & Pengamanan Akun
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Jika kartu ATM/Kredit Anda hilang, terlanjur mengunduh file APK mencurigakan, atau memberikan kode OTP kepada pihak tidak dikenal, segera lakukan tindakan penyelamatan dana di bawah ini.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href="tel:1500111"
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm flex items-center space-x-2 shadow-lg transition-all"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Panggil PermataTel 1500111 Sekarang</span>
          </a>
        </div>
      </div>

      {/* Emergency Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Option 1: Mobile Banking Self Lock */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Blokir Lewat PermataMobile X</h3>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Langkah Mandiri Tercepat
              </span>
            </div>
          </div>

          <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-decimal list-inside bg-slate-50 p-4 rounded-xl border border-slate-200">
            <li>Buka aplikasi <strong>PermataMobile X</strong> di Smartphone Anda.</li>
            <li>Login menggunakan User ID & Password/Biometrik.</li>
            <li>Pilih menu <strong>Pengaturan (Settings)</strong> atau <strong>Kartu Saya</strong>.</li>
            <li>Pilih Kartu Debit / Kartu Kredit yang ingin diamankan.</li>
            <li>Aktifkan fitur <strong>"Blokir Kartu Sementara"</strong> atau <strong>"Blokir Permanen"</strong>.</li>
          </ol>
        </div>

        {/* Option 2: Telephone Call Center Emergency */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 text-red-800 rounded-xl">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Hubungi PermataTel 1500111</h3>
              <span className="text-xs text-red-700 font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                Bantuan Petugas 24 Jam
              </span>
            </div>
          </div>

          <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-decimal list-inside bg-slate-50 p-4 rounded-xl border border-slate-200">
            <li>Hubungi nomor bebas pulsa/kuota lokal: <strong>1500111</strong>.</li>
            <li>Tekan tombol IVR Layanan Darurat Blokir Kartu.</li>
            <li>Sampaikan kepada petugas bahwa Anda mengalami kehilangan kartu atau indikasi penipuan.</li>
            <li>Petugas akan melakukan verifikasi identitas dan langsung memblokir akun Anda.</li>
          </ol>
        </div>

      </div>

      {/* Action If APK Malware Was Installed */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500 text-white rounded-xl">
            <ShieldOff className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-amber-950 text-lg">Tindakan Jika Terlanjur Mengunduh File APK / Link Phishing</h3>
            <p className="text-xs text-amber-800">Ikuti instruksi penanganan malware untuk mencegah peretasan SMS OTP.</p>
          </div>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
          <li className="flex items-start space-x-2 bg-white/80 p-3 rounded-xl border border-amber-200">
            <span className="font-bold text-amber-600">1.</span>
            <span><strong>Matikan Koneksi Internet:</strong> Segera aktifkan Mode Pesawat (Airplane Mode) atau matikan WiFi & Data Seluler untuk memutus transmisi malware.</span>
          </li>
          <li className="flex items-start space-x-2 bg-white/80 p-3 rounded-xl border border-amber-200">
            <span className="font-bold text-amber-600">2.</span>
            <span><strong>Copot Aplikasi (Uninstall):</strong> Cari file aplikasi asing di Pengaturan HP &gt; Aplikasi &gt; Hapus Instalasi.</span>
          </li>
          <li className="flex items-start space-x-2 bg-white/80 p-3 rounded-xl border border-amber-200">
            <span className="font-bold text-amber-600">3.</span>
            <span><strong>Ganti Password Dari Perangkat Lain:</strong> Buka PermataMobile X dari HP lain yang aman, lalu segera ganti Password dan PIN Transaksi Anda.</span>
          </li>
        </ul>
      </div>

    </section>
  );
};
