import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe, Search, RefreshCw, ShieldCheck, Sparkles, ExternalLink, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';

export const AIChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Halo! Saya **PermataCare AI Assistant** yang didukung **Google Search Grounding** real-time. 

Saya siap membantu Anda dengan:
- Informasi nomor kontak & Call Center resmi PermataTel (**1500111**)
- Verifikasi modus penipuan WhatsApp / telepon mengatasnamakan PermataBank
- Panduan darurat blokir kartu kredit/debit yang hilang
- Informasi produk perbankan, lokasi cabang, & fitur terbaru PermataMobile X

Apa yang ingin Anda tanyakan hari ini?`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    'Berapa nomor Call Center resmi PermataTel?',
    'Apakah nomor WA +6283150537117 nomor resmi PermataBank?',
    'Bagaimana cara blokir kartu debit/kredit Permata yang hilang?',
    'Apa saja modus penipuan WhatsApp mengatasnamakan PermataBank?',
    'Bagaimana cara aktivasi PermataMobile X di HP baru?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply,
          groundingSources: data.groundingSources,
          searchQueries: data.searchQueries,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errData = await response.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: errData.fallbackReply || errData.error || 'Maaf, terjadi masalah koneksi ke server AI.',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Maaf, terjadi gangguan koneksi. Untuk informasi resmi darurat, silakan hubungi **PermataTel 1500111**.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (content: string) => {
    // Simple text renderer converting bold (**text**) and linebreaks
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // replace **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="min-h-[1.2rem] my-0.5">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      
      {/* Header Info */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-emerald-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold">Asisten AI PermataCare</h2>
              <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                <Globe className="w-3 h-3 inline" />
                <span>Google Search Grounded</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Jawaban diperbarui secara live menggunakan Google Search data resmi.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'welcome-reset',
                sender: 'assistant',
                text: 'Sesi obrolan telah diperbarui. Silakan ajukan pertanyaan seputar layanan PermataTel!',
                timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              }
            ]);
          }}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Preset Questions Chips */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-600 flex items-center space-x-1">
          <Search className="w-3.5 h-3.5 text-emerald-600" />
          <span>Rekomendasi Pertanyaan Sering Diajukan:</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={loading}
              className="text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 px-3 py-2 rounded-xl text-left shadow-sm transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[560px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {renderFormattedText(msg.text)}

                  {/* Grounding Search Queries Tags */}
                  {msg.searchQueries && msg.searchQueries.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                      <Search className="w-3 h-3 text-emerald-600" />
                      <span className="font-semibold">Pencarian Terverifikasi:</span>
                      {msg.searchQueries.map((sq, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-mono">
                          {sq}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Grounding Sources Links */}
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-600 flex items-center space-x-1">
                        <Globe className="w-3 h-3 text-emerald-600 inline" />
                        <span>Sumber Informasi Google Search:</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.groundingSources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] px-2.5 py-1 rounded-lg flex items-center space-x-1 transition-colors"
                          >
                            <span className="truncate max-w-[200px] font-medium">{src.title}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <span className={`text-[10px] text-slate-400 block px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-500 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce delay-200" />
                <span className="ml-2 font-medium">Asisten AI sedang mencari data Google resmi...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tuliskan pertanyaan seputar PermataTel atau modus penipuan..."
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="mt-2 text-center text-[10px] text-slate-400">
            AI Assistant terhubung langsung dengan Google Search Grounding untuk akurasi data perbankan Permata.
          </div>
        </div>

      </div>

    </section>
  );
};
