import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, AlertOctagon, Phone, ArrowRight, CheckCircle2, Copy, AlertTriangle, FileText, Lock, MessageSquare } from 'lucide-react';
import { VerificationResult } from '../types';

interface NumberVerifierProps {
  initialNumber?: string;
  onReportClick?: (prefillNumber: string) => void;
  onEmergencyClick?: () => void;
}

export const NumberVerifier: React.FC<NumberVerifierProps> = ({
  initialNumber = '',
  onReportClick,
  onEmergencyClick,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialNumber);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleNumbers = [
    { label: 'Nomor Dalam Pesan User (+6283150537117)', value: '+6283150537117', type: 'scam' },
    { label: 'PermataTel Call Center Official (1500111)', value: '1500111', type: 'official' },
    { label: 'WhatsApp PermataCare Centang Hijau', value: '0812-8000-0111', type: 'official' },
    { label: 'PermataTel Priority (1500100)', value: '1500100', type: 'official' },
    { label: 'Nomor WA Seluler Lain (08381234xxxx)', value: '083812345678', type: 'scam' }
  ];

  useEffect(() => {
    if (initialNumber) {
      setPhoneNumber(initialNumber);
      handleVerify(initialNumber);
    }
  }, [initialNumber]);

  const handleVerify = async (numberToTest?: string) => {
    const target = numberToTest || phoneNumber;
    if (!target.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/verify-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: target }),
      });
      if (response.ok) {
        const data: VerificationResult = await response.json();
        setResult(data);
      } else {
        // Fallback local verification if server error
        const localMod = await import('../data/officialContacts');
        setResult(localMod.verifyContactNumber(target));
      }
    } catch (err) {
      console.error('Verification error:', err);
      const localMod = await import('../data/officialContacts');
      setResult(localMod.verifyContactNumber(target));
    } finally {
      setLoading(false);
    }
  };

  const copyResultText = () => {
    if (!result) return;
    const text = `[Pemeriksaan Keamanan PermataTel]\nNomor: ${result.phoneNumber}\nStatus: ${result.status}\nTingkat Risiko: ${result.riskLevel}\n${result.description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Search & Verification Input Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-emerald-100 rounded-xl text-emerald-800">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Cek Nomor Telepon / WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Periksa apakah nomor yang menghubungi Anda adalah Call Center Resmi PermataTel atau potensi modus penipuan.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Phone className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Masukkan nomor telepon / WhatsApp (Contoh: +6283150537117 atau 1500111)"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm sm:text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !phoneNumber.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer min-w-[140px]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Verifikasi Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Sample Number Chips */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-500 mb-2">Uji Coba Contoh Nomor:</p>
            <div className="flex flex-wrap gap-2">
              {sampleNumbers.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPhoneNumber(s.value);
                    handleVerify(s.value);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    s.type === 'scam'
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {/* Verification Result Display */}
      {result && (
        <div
          className={`rounded-2xl border-2 p-6 sm:p-8 shadow-xl transition-all space-y-6 ${
            result.riskLevel === 'BAHAYA'
              ? 'bg-red-50/90 border-red-500/80 text-red-950'
              : result.riskLevel === 'AMANKAN'
              ? 'bg-emerald-50/90 border-emerald-500/80 text-emerald-950'
              : 'bg-amber-50/90 border-amber-500/80 text-amber-950'
          }`}
        >
          {/* Result Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/10 pb-5">
            <div className="flex items-start space-x-3">
              {result.riskLevel === 'BAHAYA' ? (
                <div className="p-3 bg-red-600 text-white rounded-2xl shadow-md">
                  <AlertOctagon className="w-8 h-8" />
                </div>
              ) : result.riskLevel === 'AMANKAN' ? (
                <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              ) : (
                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md">
                  <AlertTriangle className="w-8 h-8" />
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      result.riskLevel === 'BAHAYA'
                        ? 'bg-red-600 text-white'
                        : result.riskLevel === 'AMANKAN'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    STATUS: {result.riskLevel}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Diperiksa pada: {new Date(result.analyzedAt).toLocaleTimeString('id-ID')}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold mt-1">
                  {result.channelName}
                </h3>
                <p className="text-sm font-mono text-slate-700">Nomor Diuji: <strong>{result.phoneNumber}</strong></p>
              </div>
            </div>

            <button
              onClick={copyResultText}
              className="bg-white/80 hover:bg-white text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Tersalin!' : 'Salin Hasil'}</span>
            </button>
          </div>

          {/* Detailed Explanation */}
          <div className="bg-white/90 rounded-xl p-5 border border-black/5 shadow-inner space-y-3">
            <h4 className="font-bold text-sm text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Hasil Evaluasi Keamanan PermataTel</span>
            </h4>
            <p className="text-sm leading-relaxed text-slate-800">
              {result.description}
            </p>

            {result.officialAlternative && (
              <div className="p-3 bg-emerald-100/80 border border-emerald-300 rounded-lg text-xs text-emerald-900 font-medium">
                <strong>Kontak Resmi Yang Benar:</strong> {result.officialAlternative}
              </div>
            )}
          </div>

          {/* Safety Recommendations List */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Panduan Keselamatan & Tindakan Penting:</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              {result.safetyRecommendations.map((rec, i) => (
                <li key={i} className="flex items-start space-x-2 bg-white/60 p-2.5 rounded-lg border border-black/5">
                  <span className="font-bold text-slate-500">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            {result.riskLevel === 'BAHAYA' && (
              <>
                <button
                  onClick={() => onReportClick && onReportClick(result.phoneNumber)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Laporkan Nomor Ini Ke Anti-Fraud Permata</span>
                </button>

                <button
                  onClick={() => onEmergencyClick && onEmergencyClick()}
                  className="bg-slate-900 hover:bg-black text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>Petunjuk Blokir Rekening / Kartu</span>
                </button>
              </>
            )}

            <a
              href="tel:1500111"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Panggil PermataTel 1500111</span>
            </a>
          </div>

        </div>
      )}

      {/* General Safety Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">1</div>
          <h4 className="font-bold text-slate-900 text-sm">Nomor Seluler = Penipuan</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            PermataBank TIDAK PERNAH memakai WhatsApp seluler biasa (seperti 0831, 0838, dsb) untuk layanan call center resmi.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">2</div>
          <h4 className="font-bold text-slate-900 text-sm">Waspada File APK / PDF Phishing</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Jangan pernah membuka file `.apk` bertema "Surat Undangan", "Resi Paket", atau "Katalog Undian" dari WhatsApp.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">3</div>
          <h4 className="font-bold text-slate-900 text-sm">Kerahasiaan OTP & PIN</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Petugas bank resmi TIDAK AKAN PERNAH meminta Kode OTP, Password PermataMobile X, atau PIN ATM Anda.
          </p>
        </div>
      </div>

    </section>
  );
};
