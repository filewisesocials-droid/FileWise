import React, { useState } from 'react';
import { ShieldCheck, Search, FileText, Calculator, Truck, Bot, Menu, X, Globe, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'calculator' | 'ai' | 'tracking' | 'services' | 'faq';
  setActiveTab: (tab: 'search' | 'calculator' | 'ai' | 'tracking' | 'services' | 'faq') => void;
  onOpenQuickTrack?: (trackId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenQuickTrack }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickTrackInput, setQuickTrackInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      if (onOpenQuickTrack) {
        onOpenQuickTrack(quickTrackInput.trim());
      }
      setActiveTab('tracking');
      setQuickTrackInput('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 text-slate-900 shadow-sm">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-xs py-1.5 px-4 font-medium text-center flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-blue-100 shrink-0" />
        <span>Official Hague Apostille & Global Embassy Legalisation Network • Express 24h & 48h Courier Processing Available</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('search')}
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:bg-blue-700 transition-colors">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-blue-900 font-sans">Filewise</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded border border-blue-200">LEGALISATION</span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-wide">Global Document Attestation & Apostille</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'search'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200/80 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Country Search</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'calculator'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200/80 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Instant Quote</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ai'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200/80 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <Bot className="w-4 h-4 text-blue-600" />
              <span>AI Advisor & Scanner</span>
            </button>

            <button
              onClick={() => setActiveTab('tracking')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'tracking'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200/80 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Track Order</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'services'
                  ? 'bg-blue-50 text-blue-600 border border-blue-200/80 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Services</span>
            </button>
          </nav>

          {/* Quick Track Input + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <form onSubmit={handleTrackSubmit} className="relative">
              <input
                type="text"
                placeholder="Track ref e.g. FW-98214"
                value={quickTrackInput}
                onChange={(e) => setQuickTrackInput(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 w-44 placeholder-slate-400 font-mono transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 p-1 text-slate-400 hover:text-blue-600"
                title="Search tracking code"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              onClick={() => setActiveTab('calculator')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-200 transition-all flex items-center gap-1.5"
            >
              <span>Get Apostille Quote</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => { setActiveTab('search'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'search' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span>Country Search & Requirements</span>
          </button>

          <button
            onClick={() => { setActiveTab('calculator'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'calculator' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Instant Cost Estimator</span>
          </button>

          <button
            onClick={() => { setActiveTab('ai'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'ai' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bot className="w-4 h-4 text-blue-600" />
            <span>AI Legalisation Advisor</span>
          </button>

          <button
            onClick={() => { setActiveTab('tracking'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'tracking' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Truck className="w-4 h-4 text-blue-600" />
            <span>Track Application Status</span>
          </button>

          <button
            onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'services' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Legalisation Services</span>
          </button>

          <form onSubmit={handleTrackSubmit} className="pt-2 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Track ref e.g. FW-98214"
              value={quickTrackInput}
              onChange={(e) => setQuickTrackInput(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              Track
            </button>
          </form>
        </div>
      )}
    </header>
  );
};
