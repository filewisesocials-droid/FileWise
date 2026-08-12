import React, { useState } from 'react';
import { FileText, Menu, X, Building2, Mail, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'search' | 'inquiry' | 'tracking' | 'services' | 'faq' | 'about' | 'terms' | 'contact';
  setActiveTab: (tab: 'search' | 'inquiry' | 'tracking' | 'services' | 'faq' | 'about' | 'terms' | 'contact') => void;
  onOpenQuickTrack?: (trackId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Favicon + FileWise Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('search')}
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 shadow-xs flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 group-hover:border-blue-300 transition-all p-0.5 relative">
              <img 
                src="/favicon-96x96.png" 
                alt="FileWise Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/favicon-32x32.png';
                }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-blue-950 font-sans">FileWise</span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span>Active Portal</span>
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest hidden sm:block">Visa &amp; Legalisation</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Country Lookup</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'services'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Services</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>About Us</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'contact'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'terms'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-bold'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Terms</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiry')}
              className="ml-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-500/25 hover:shadow-md hover:shadow-blue-500/30 flex items-center gap-2 group"
            >
              <span>Start Visa / Attestation Inquiry</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <button
            onClick={() => { setActiveTab('search'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'search' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Country Lookup &amp; Requirement Checker</span>
          </button>

          <button
            onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'services' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Our Services &amp; Legalisation</span>
          </button>

          <button
            onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>About FileWise</span>
          </button>

          <button
            onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'contact' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Us</span>
          </button>

          <button
            onClick={() => { setActiveTab('terms'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'terms' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Terms &amp; Conditions</span>
          </button>

          <div className="pt-2">
            <button
              onClick={() => { setActiveTab('inquiry'); setMobileMenuOpen(false); }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Get Free Quote / Inquiry</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
