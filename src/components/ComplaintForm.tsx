import React, { useState, useEffect } from 'react';
import { FileText, Send, CheckCircle2, Search, Clock, ShieldAlert, Copy, Download, RefreshCw } from 'lucide-react';
import { TicketReport } from '../types';

interface ComplaintFormProps {
  prefillSuspectNumber?: string;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({ prefillSuspectNumber = '' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'create' | 'lookup'>('create');
  
  // Form states
  const [customerName, setCustomerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [accountOrCard, setAccountOrCard] = useState('');
  const [category, setCategory] = useState<TicketReport['category']>('SUSPICIOUS_WHATSAPP');
  const [suspectNumber, setSuspectNumber] = useState(prefillSuspectNumber);
  const [amountLost, setAmountLost] = useState('');
  const [chronology, setChronology] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<TicketReport | null>(null);

  // Lookup state
  const [searchTicketNo, setSearchTicketNo] = useState('');
  const [foundTicket, setFoundTicket] = useState<TicketReport | null>(null);
  const [lookupError, setLookupError] = useState('');

  // Local storage history
  const [myTickets, setMyTickets] = useState<TicketReport[]>([]);

  useEffect(() => {
    if (prefillSuspectNumber) {
      setSuspectNumber(prefillSuspectNumber);
    }
  }, [prefillSuspectNumber]);

  useEffect(() => {
    const saved = localStorage.getItem('permatatel_tickets');
    if (saved) {
      try {
        setMyTickets(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !contactPhone || !chronology) return;

    const ticketNo = `PRM-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: TicketReport = {
      id: Date.now().toString(),
      ticketNumber: ticketNo,
      createdAt: new Date().toLocaleString('id-ID'),
      customerName,
      contactPhone,
      accountOrCard: accountOrCard || 'Tidak Dicantumkan',
      category,
      priority: category === 'PHISHING_APK' || category === 'CARD_LOST_BLOCKED' ? 'TINGGI' : 'NORMAL',
      status: 'TERKIRIM',
      chronology,
      suspectNumber: suspectNumber || undefined,
      amountLost: amountLost || undefined,
      resolutionNotes: 'Laporan telah diterima oleh Tim Anti-Fraud & Customer Care PermataTel. Petugas akan menghubungi Anda dalam 1x24 jam.'
    };

    const updated = [newTicket, ...myTickets];
    setMyTickets(updated);
    localStorage.setItem('permatatel_tickets', JSON.stringify(updated));

    setSubmittedTicket(newTicket);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError('');
    setFoundTicket(null);

    const term = searchTicketNo.trim().toUpperCase();
    if (!term) return;

    const match = myTickets.find(t => t.ticketNumber.toUpperCase() === term);
    if (match) {
      setFoundTicket(match);
    } else {
      setLookupError(`Nomor Tiket Laporan "${term}" tidak ditemukan di perangkat ini.`);
    }
  };

  const copyTicketDetails = (t: TicketReport) => {
    const text = `--- LAPORAN PENGADUAN NASABAH PERMATATEL ---
No Tiket: ${t.ticketNumber}
Tanggal: ${t.createdAt}
Nama Pelapor: ${t.customerName}
Kontak: ${t.contactPhone}
Kategori: ${t.category}
Nomor Terduga Penipu: ${t.suspectNumber || '-'}
Kronologi: ${t.chronology}
Status: ${t.status}`;
    navigator.clipboard.writeText(text);
    alert('Detail Laporan berhasil disalin ke Clipboard!');
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Sub Tab Selection */}
      <div className="flex bg-slate-200 p-1.5 rounded-2xl max-w-md mx-auto text-sm font-bold">
        <button
          onClick={() => {
            setActiveSubTab('create');
            setSubmittedTicket(null);
          }}
          className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 ${
            activeSubTab === 'create' ? 'bg-emerald-600 text-white shadow' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Buat Laporan Pengaduan</span>
        </button>

        <button
          onClick={() => setActiveSubTab('lookup')}
          className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 ${
            activeSubTab === 'lookup' ? 'bg-emerald-600 text-white shadow' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Cek Status Tiket</span>
        </button>
      </div>

      {activeSubTab === 'create' ? (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          
          {submittedTicket ? (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-extrabold text-emerald-950">
                Laporan Pengaduan Berhasil Terkirim!
              </h3>

              <div className="bg-white p-4 rounded-xl border border-emerald-200 max-w-md mx-auto font-mono text-center space-y-1">
                <span className="text-xs text-slate-500 uppercase">Nomor Tiket Laporan Anda:</span>
                <p className="text-2xl font-bold text-emerald-700">{submittedTicket.ticketNumber}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto">
                {submittedTicket.resolutionNotes} Silakan simpan Nomor Tiket di atas untuk memantau status perkembangan.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => copyTicketDetails(submittedTicket)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>Salin Ringkasan Laporan</span>
                </button>

                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Buat Laporan Baru</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-900">Formulir Pengaduan Insiden & Anti-Fraud</h2>
                <p className="text-xs text-slate-500">
                  Isi data di bawah untuk melaporkan indikasi penipuan, kendala transaksi, atau gangguan aplikasi.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nama Lengkap Pelapor <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor HP Aktif yang Bisa Dihubungi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Kategori Pengaduan <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="SUSPICIOUS_WHATSAPP">Penipuan WhatsApp / Telepon Mengaku Permata</option>
                      <option value="PHISHING_APK">Modus Undangan APK / Link Phishing</option>
                      <option value="CARD_LOST_BLOCKED">Kartu Kredit / Debit Hilang & Blokir</option>
                      <option value="UNKNOWN_TRANSACTION">Transaksi Mencurigakan / Unfamiliar</option>
                      <option value="APP_ISSUE">Kendala PermataMobile X / PermataNet</option>
                      <option value="GENERAL_INQUIRY">Pertanyaan & Pengaduan Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor HP/WA Terduga Penipu (Jika ada)
                    </label>
                    <input
                      type="text"
                      value={suspectNumber}
                      onChange={(e) => setSuspectNumber(e.target.value)}
                      placeholder="Contoh: +6283150537117"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor Rekening / Kartu Permata (Opsional)
                    </label>
                    <input
                      type="text"
                      value={accountOrCard}
                      onChange={(e) => setAccountOrCard(e.target.value)}
                      placeholder="Dapat disamarkan e.g. 1200xxxx789"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimasi kerugian dana (Jika ada)
                    </label>
                    <input
                      type="text"
                      value={amountLost}
                      onChange={(e) => setAmountLost(e.target.value)}
                      placeholder="Contoh: Rp 500.000"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Detail Kronologi Kejadian <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={chronology}
                    onChange={(e) => setChronology(e.target.value)}
                    placeholder="Jelaskan secara rinci waktu kejadian, isi pesan yang diterima, dan tindakan yang telah dilakukan..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Laporan Ke PermataTel Customer Care</span>
                  </button>
                </div>

              </form>
            </>
          )}

        </div>
      ) : (
        /* Status Lookup Tab */
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Pemeriksaan Status Tiket Pengaduan</h2>
            <p className="text-xs text-slate-500">
              Masukkan Nomor Tiket (Contoh: PRM-20260724-8931) untuk melihat perkembangan investigasi.
            </p>
          </div>

          <form onSubmit={handleLookup} className="flex gap-2">
            <input
              type="text"
              value={searchTicketNo}
              onChange={(e) => setSearchTicketNo(e.target.value)}
              placeholder="Masukkan Nomor Tiket e.g. PRM-20260724-xxxx"
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center space-x-2 shadow cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Cek Status</span>
            </button>
          </form>

          {lookupError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {lookupError}
            </div>
          )}

          {foundTicket && (
            <div className="bg-slate-50 border border-slate-300 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs text-slate-500">Nomor Tiket:</span>
                  <p className="text-lg font-bold font-mono text-emerald-800">{foundTicket.ticketNumber}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs">
                  {foundTicket.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Tanggal Buat:</span>
                  <p className="font-semibold">{foundTicket.createdAt}</p>
                </div>
                <div>
                  <span className="text-slate-500">Pelapor:</span>
                  <p className="font-semibold">{foundTicket.customerName}</p>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs">
                <span className="font-bold text-slate-700 block mb-1">Catatan Penanganan Customer Care:</span>
                <p className="text-slate-600">{foundTicket.resolutionNotes}</p>
              </div>
            </div>
          )}

          {/* List of Previous Local Tickets */}
          {myTickets.length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Riwayat Tiket Laporan Di Perangkat Ini:</h3>
              <div className="space-y-2">
                {myTickets.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSearchTicketNo(t.ticketNumber);
                      setFoundTicket(t);
                    }}
                    className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-mono font-bold text-emerald-900">{t.ticketNumber}</p>
                      <p className="text-slate-500 text-[11px]">{t.createdAt} - {t.customerName}</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded text-[11px]">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </section>
  );
};
