import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, Globe, ShieldCheck, Copy, Check, ExternalLink, AlertOctagon } from 'lucide-react';
import { OFFICIAL_PERMATA_CONTACTS } from '../data/officialContacts';

export const OfficialDirectory: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'ALL', label: 'Semua Saluran' },
    { id: 'CALL_CENTER', label: 'Call Center 24h' },
    { id: 'WHATSAPP', label: 'WhatsApp Official' },
    { id: 'EMAIL_WEB', label: 'Email & Website' },
    { id: 'SOCIAL_MEDIA', label: 'Media Sosial' },
  ];

  const filteredContacts = selectedCategory === 'ALL'
    ? OFFICIAL_PERMATA_CONTACTS
    : OFFICIAL_PERMATA_CONTACTS.filter(c => c.category === selectedCategory);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Title */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-2xl text-white border border-emerald-800/50 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Direktori Saluran Komunikasi Terverifikasi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Kontak Resmi PermataTel & PermataBank
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Gunakan hanya saluran di bawah ini untuk menghubungi pihak bank. Jika Anda dihubungi selain dari saluran resmi di bawah, harap berhati-hati terhadap indikasi penipuan.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            {/* Verified Badge Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{contact.badgeText}</span>
                </span>
                <span className="text-[10px] text-slate-400">{contact.operatingHours}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-lg mb-1">
                {contact.title}
              </h3>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 my-3 flex items-center justify-between">
                <span className="font-mono font-bold text-lg text-emerald-950 truncate mr-2">
                  {contact.displayValue}
                </span>

                <button
                  onClick={() => handleCopy(contact.id, contact.value)}
                  className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
                  title="Salin Nomor/Alamat"
                >
                  {copiedId === contact.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {contact.description}
              </p>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {contact.actionUrl ? (
                <a
                  href={contact.actionUrl}
                  target={contact.actionUrl.startsWith('http') ? '_blank' : '_self'}
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow"
                >
                  <span>Hubungi Langsung</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-400">Resmi Terverifikasi</span>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Warning Alert Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 flex items-start space-x-4">
        <div className="p-3 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
          <AlertOctagon className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-amber-950">
          <h4 className="font-extrabold text-base text-amber-900">Perhatian Penting Mengenai Telepon / WhatsApp Masuk:</h4>
          <p className="leading-relaxed">
            PermataBank <strong>TIDAK PERNAH</strong> menanyakan Kode OTP, PIN ATM/Mobile Banking, Password, Tanggal Lahir, Nama Ibu Kandung, atau CVV/CVC di belakang kartu. Pihak bank juga <strong>TIDAK PERNAH</strong> meminta Anda mentransfer dana ke rekening mana pun untuk alasan penanganan masalah/investigasi!
          </p>
        </div>
      </div>

    </section>
  );
};
