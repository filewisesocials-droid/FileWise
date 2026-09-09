import React, { useState } from 'react';
import { FileText, Menu, X, Building2, Mail, ShieldCheck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: 'search' | 'inquiry' | 'tracking' | 'services' | 'faq' | 'about' | 'terms' | 'contact';
  setActiveTab: (tab: 'search' | 'inquiry' | 'tracking' | 'services' | 'faq' | 'about' | 'terms' | 'contact') => void;
  onOpenQuickTrack?: (trackId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fdfcf9]/95 backdrop-blur-md text-[#2b241d] border-b border-[#c8a46b]/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo & Subtitle */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => setActiveTab('search')}
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-white border-2 border-[#c8a46b]/60 shadow-xs flex items-center justify-center overflow-hidden shrink-0 p-1 group-hover:border-[#b48332] group-hover:shadow-md transition-all duration-300"
            >
              <img 
                src="/favicon-96x96.png" 
                alt="FileWise Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/favicon-32x32.png';
                }}
              />
            </motion.div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif font-extrabold text-2xl tracking-tight text-[#2b241d]">FileWise</span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-bold text-[#8a5716] bg-[#fbf4e8] border border-[#dfbe87] px-2.5 py-0.5 rounded-md shadow-2xs">
                  Official SA Agency
                </span>
              </div>
              <span className="text-[10px] font-medium text-[#7a6b5e] uppercase tracking-wider hidden sm:block">
                Visa Services &amp; South African Document Legalisation
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-[#b48332] text-white font-bold shadow-xs border border-[#9a6d23]'
                  : 'text-[#5c5044] hover:text-[#915e19] hover:bg-[#f6eee2] border border-transparent hover:border-[#c8a46b]/30'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Outbound Visas</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'services'
                  ? 'bg-[#b48332] text-white font-bold shadow-xs border border-[#9a6d23]'
                  : 'text-[#5c5044] hover:text-[#915e19] hover:bg-[#f6eee2] border border-transparent hover:border-[#c8a46b]/30'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>SA Document Legalisation</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-[#b48332] text-white font-bold shadow-xs border border-[#9a6d23]'
                  : 'text-[#5c5044] hover:text-[#915e19] hover:bg-[#f6eee2] border border-transparent hover:border-[#c8a46b]/30'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>About Us</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'contact'
                  ? 'bg-[#b48332] text-white font-bold shadow-xs border border-[#9a6d23]'
                  : 'text-[#5c5044] hover:text-[#915e19] hover:bg-[#f6eee2] border border-transparent hover:border-[#c8a46b]/30'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'terms'
                  ? 'bg-[#b48332] text-white font-bold shadow-xs border border-[#9a6d23]'
                  : 'text-[#5c5044] hover:text-[#915e19] hover:bg-[#f6eee2] border border-transparent hover:border-[#c8a46b]/30'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Terms</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab('inquiry')}
              className="ml-3 bg-[#b48332] hover:bg-[#9f7228] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm border border-[#9a6d23] flex items-center gap-2"
            >
              <span>Submit Inquiry</span>
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white hover:bg-[#f8f2e6] text-[#2b241d] transition-colors border border-[#c8a46b]/50 shadow-2xs"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-[#c8a46b]/30 bg-[#fdfcf9] px-4 pt-3 pb-6 space-y-2 shadow-lg overflow-hidden"
          >
            <button
              onClick={() => { setActiveTab('search'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === 'search' ? 'bg-[#b48332] text-white border-[#9a6d23]' : 'text-[#4c4035] hover:bg-[#f6eee2] border-transparent'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Outbound Visa Countries</span>
            </button>

            <button
              onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === 'services' ? 'bg-[#b48332] text-white border-[#9a6d23]' : 'text-[#4c4035] hover:bg-[#f6eee2] border-transparent'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>South African Document Legalisation</span>
            </button>

            <button
              onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === 'about' ? 'bg-[#b48332] text-white border-[#9a6d23]' : 'text-[#4c4035] hover:bg-[#f6eee2] border-transparent'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>About FileWise</span>
            </button>

            <button
              onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === 'contact' ? 'bg-[#b48332] text-white border-[#9a6d23]' : 'text-[#4c4035] hover:bg-[#f6eee2] border-transparent'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
            </button>

            <button
              onClick={() => { setActiveTab('terms'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                activeTab === 'terms' ? 'bg-[#b48332] text-white border-[#9a6d23]' : 'text-[#4c4035] hover:bg-[#f6eee2] border-transparent'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Terms &amp; Conditions</span>
            </button>

            <div className="pt-2">
              <button
                onClick={() => { setActiveTab('inquiry'); setMobileMenuOpen(false); }}
                className="w-full bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-sm py-3 rounded-xl shadow-sm border border-[#9a6d23] flex items-center justify-center gap-2"
              >
                <span>Submit General Inquiry</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

