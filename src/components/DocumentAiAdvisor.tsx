import React, { useState } from 'react';
import { Bot, Sparkles, Send, FileSearch, ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle, Loader2 } from 'lucide-react';
import { AiChatMessage } from '../types';
import { COUNTRIES } from '../data/countries';

interface DocumentAiAdvisorProps {
  initialOrigin?: string;
  initialDest?: string;
}

export const DocumentAiAdvisor: React.FC<DocumentAiAdvisorProps> = ({ initialOrigin = 'United Kingdom', initialDest = 'United Arab Emirates' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'scan'>('chat');

  // Chat state
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: `Hello! I am your Filewise AI Document Legalisation Specialist. Ask me anything about Hague Apostilles, Embassy attestation procedures, solicitor verification, or country-specific consular requirements worldwide.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);

  // Document scan state
  const [scanText, setScanText] = useState('');
  const [originCountry, setOriginCountry] = useState(initialOrigin);
  const [destCountry, setDestCountry] = useState(initialDest);
  const [loadingScan, setLoadingScan] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const sampleQuestions = [
    'Do I need Embassy attestation for a UK Degree used in UAE?',
    'Does Spain accept US Apostille without Embassy seal?',
    'Can a laminated birth certificate receive an official Apostille?',
    'What is the procedure for FBI Police clearance for Qatar visa?',
    'How long does Chinese Embassy attestation take in London?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || chatInput.trim();
    if (!messageText || loadingChat) return;

    const userMsg: AiChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setLoadingChat(true);

    try {
      const res = await fetch('/api/ai/advise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: messageText,
          originCountry,
          destinationCountry: destCountry
        })
      });
      const data = await res.json();

      const assistantMsg: AiChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.reply || 'I could not retrieve legalisation details at this time.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: AiChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Apologies, there was an issue communicating with the AI legalisation engine. Please check your network connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleRunScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanText.trim() || loadingScan) return;

    setLoadingScan(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/ai/scan-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: scanText,
          originCountry,
          destinationCountry: destCountry
        })
      });
      const data = await res.json();
      setScanResult(data.analysis);
    } catch (err) {
      console.error(err);
      alert('Failed to analyze document.');
    } finally {
      setLoadingScan(false);
    }
  };

  return (
    <section className="py-12 bg-slate-50 text-slate-900 min-h-[700px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold mb-3 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI-Powered Consular Intelligence</span>
          </div>
          <h2 className="text-3xl font-extrabold font-sans text-slate-900">
            Filewise AI Legalisation Advisor & Document Scanner
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Instant AI analysis for Hague Apostille eligibility, embassy procedures, and document verification rules.
          </p>
        </div>

        {/* Sub Tab Switcher */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-1 rounded-xl border border-slate-200 flex items-center gap-1 text-xs shadow-sm">
            <button
              onClick={() => setActiveSubTab('chat')}
              className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 ${
                activeSubTab === 'chat'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Legal Assistant</span>
            </button>

            <button
              onClick={() => setActiveSubTab('scan')}
              className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 ${
                activeSubTab === 'scan'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSearch className="w-4 h-4" />
              <span>AI Document Scan & Risk Checker</span>
            </button>
          </div>
        </div>

        {/* Sub Tab 1: AI Chat Assistant */}
        {activeSubTab === 'chat' && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[580px]">
            
            {/* Chat Messages Box */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 scrollbar-none bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white font-medium rounded-tr-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none space-y-2 shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loadingChat && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-white text-slate-600 text-xs px-4 py-3 rounded-2xl border border-slate-200 flex items-center gap-2 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                    <span>Analyzing consular treaties and embassy rules...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Sample Chips */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
              <span className="text-slate-400 shrink-0 font-medium">Try asking:</span>
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 px-3 py-1 rounded-full border border-slate-200 shrink-0 transition-colors font-medium shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask a question about Apostilles, embassy legalisation, notary stamps..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 placeholder-slate-400 font-medium"
                />

                <button
                  type="submit"
                  disabled={loadingChat || !chatInput.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl transition-all shadow-md shadow-blue-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        )}

        {/* Sub Tab 2: AI Document Scan & Risk Checker */}
        {activeSubTab === 'scan' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-sans">AI Document Eligibility & Rejection Risk Scan</h3>
                <p className="text-xs text-slate-500">Paste document text, certificate details, or OCR transcript for instant compliance evaluation.</p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <select
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 font-medium text-xs rounded-lg px-2.5 py-1.5"
                >
                  {COUNTRIES.map(c => (
                    <option key={`scan-org-${c.code}`} value={c.name}>{c.flag} Origin: {c.name}</option>
                  ))}
                </select>

                <select
                  value={destCountry}
                  onChange={(e) => setDestCountry(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 font-medium text-xs rounded-lg px-2.5 py-1.5"
                >
                  {COUNTRIES.map(c => (
                    <option key={`scan-dest-${c.code}`} value={c.name}>{c.flag} Target: {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <form onSubmit={handleRunScan} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Paste Document Text or Describe Certificate:
                </label>
                <textarea
                  rows={4}
                  value={scanText}
                  onChange={(e) => setScanText(e.target.value)}
                  placeholder="e.g. University of Manchester Bachelor of Science Degree certificate issued in 2022, signed by Vice Chancellor John Smith, laminated back, intended for Dubai Work Visa..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 rounded-xl p-3.5 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 placeholder-slate-400 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loadingScan || !scanText.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md shadow-blue-200 flex items-center gap-2 disabled:opacity-50"
              >
                {loadingScan ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Run AI Compliance Evaluation</span>
              </button>
            </form>

            {/* Scan Output Results */}
            {scanResult && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 text-xs">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{scanResult.documentName || 'Document Evaluated'}</h4>
                      <span className="text-[10px] text-blue-600 font-mono font-bold">Category: {scanResult.detectedCategory || 'PERSONAL'}</span>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                    scanResult.apostilleEligible ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {scanResult.apostilleEligible ? 'APOSTILLE ELIGIBLE' : 'EMBASSY ATTESTATION REQUIRED'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <strong className="text-slate-900 font-bold block text-blue-600">Prerequisites & Verification:</strong>
                    <p className="text-slate-700">
                      • Notary Public First: <strong>{scanResult.notaryRequired ? 'Yes (Required)' : 'No (Direct State Seal)'}</strong>
                    </p>
                    <p className="text-slate-700">
                      • Certified Translation Needed: <strong>{scanResult.requiresTranslation ? 'Yes' : 'No'}</strong>
                    </p>
                  </div>

                  {scanResult.riskFlags && scanResult.riskFlags.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-900 space-y-1">
                      <strong className="font-bold flex items-center gap-1 text-amber-900">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Rejection Risk Advisory:
                      </strong>
                      {scanResult.riskFlags.map((risk: string, idx: number) => (
                        <p key={idx} className="text-[11px]">• {risk}</p>
                      ))}
                    </div>
                  )}
                </div>

                {scanResult.nextActionSteps && scanResult.nextActionSteps.length > 0 && (
                  <div className="pt-2">
                    <strong className="text-slate-900 font-bold block text-blue-600 mb-1">Recommended Next Steps:</strong>
                    <ol className="list-decimal list-inside space-y-1 text-slate-700">
                      {scanResult.nextActionSteps.map((step: string, idx: number) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
