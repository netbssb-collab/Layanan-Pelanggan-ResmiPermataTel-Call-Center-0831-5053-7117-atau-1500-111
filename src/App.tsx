/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { NumberVerifier } from './components/NumberVerifier';
import { AIChatAssistant } from './components/AIChatAssistant';
import { OfficialDirectory } from './components/OfficialDirectory';
import { ComplaintForm } from './components/ComplaintForm';
import { EmergencyCardLock } from './components/EmergencyCardLock';
import { SecurityEdu } from './components/SecurityEdu';
import { PhoneCall, ShieldAlert, HeartHandshake, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('verify');
  const [sampleNumberToVerify, setSampleNumberToVerify] = useState<string>('');
  const [reportPrefillNumber, setReportPrefillNumber] = useState<string>('');

  const handleVerifySampleNumber = (num: string) => {
    setSampleNumberToVerify(num);
    setActiveTab('verify');
  };

  const handleReportFromVerifier = (num: string) => {
    setReportPrefillNumber(num);
    setActiveTab('report');
  };

  const handleEmergencyFromVerifier = () => {
    setActiveTab('emergency');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      
      <div>
        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Hero Banner */}
        <HeroBanner
          setActiveTab={setActiveTab}
          onVerifySampleNumber={handleVerifySampleNumber}
        />

        {/* Main Content Area Based on Active Tab */}
        <main className="transition-all duration-300">
          {activeTab === 'verify' && (
            <NumberVerifier
              initialNumber={sampleNumberToVerify}
              onReportClick={handleReportFromVerifier}
              onEmergencyClick={handleEmergencyFromVerifier}
            />
          )}

          {activeTab === 'ai-chat' && <AIChatAssistant />}

          {activeTab === 'directory' && <OfficialDirectory />}

          {activeTab === 'report' && (
            <ComplaintForm prefillSuspectNumber={reportPrefillNumber} />
          )}

          {activeTab === 'emergency' && <EmergencyCardLock />}

          {activeTab === 'security' && <SecurityEdu />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-emerald-950 text-slate-300 border-t border-emerald-900 mt-16 py-10 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-emerald-900">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-white">Permata<span className="text-emerald-400">Tel</span></span>
                <span className="bg-emerald-800/80 text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded">RESMI</span>
              </div>
              <p className="text-slate-400">Portal Resmi Layanan Pelanggan & Anti-Penipuan PermataBank</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Call Center: <strong>1500111</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: <strong>0812-8000-0111</strong></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-400 text-[11px] leading-relaxed">
            <p>
              <strong>Disclaimer Keamanan:</strong> PT Bank Permata Tbk terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK) serta merupakan peserta penjaminan Lembaga Penjamin Simpanan (LPS). PermataBank tidak pernah meminta data rahasia seperti Kode OTP, PIN, Password, atau CVV/CVC melalui telepon seluler pribadi (+62831... / 08xx) atau WhatsApp biasa.
            </p>
            <p className="md:text-right">
              © 2026 PT Bank Permata Tbk. Seluruh Hak Cipta Dilindungi. <br />
              Layanan Pelanggan 24 Jam PermataTel: 1500111 | Email: care@permatabank.co.id
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
