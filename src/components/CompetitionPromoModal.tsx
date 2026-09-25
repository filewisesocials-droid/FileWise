import React, { useEffect, useRef } from 'react';
import { X, Trophy, Sparkles, ArrowRight, ShieldCheck, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CompetitionPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCompetition: () => void;
  onViewTerms: () => void;
}

export const CompetitionPromoModal: React.FC<CompetitionPromoModalProps> = ({
  isOpen,
  onClose,
  onViewCompetition,
  onViewTerms,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleCompetitionClick = () => {
    onClose();
    onViewCompetition();
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    onViewTerms();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="competition-promo-title"
          id="filewise-competition-dialog"
        >
          {/* Subtle Dark Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020509]/85 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card - Sized to fit comfortably in viewport without cutoffs */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-[490px] max-h-[min(92vh,720px)] my-auto bg-gradient-to-b from-[#091811] via-[#09131d] to-[#04080e] border border-[#c8a46b]/45 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_0_35px_rgba(180,131,50,0.25)] text-white overflow-hidden z-10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Rugby Gold Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#9a6d23] via-[#f7d58b] via-[#005a36] to-[#b48332] shrink-0" />

            {/* Clear Floating Top-Right Close (X) Button */}
            <motion.button
              ref={closeButtonRef}
              whileHover={{ scale: 1.08, backgroundColor: '#c8a46b' }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              id="close-competition-promo-btn"
              aria-label="Close promotional announcement"
              className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 hover:bg-[#c8a46b] text-white flex items-center justify-center border border-white/30 shadow-xl backdrop-blur-md transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#f5d799]"
            >
              <X className="w-4 h-4 transition-transform group-hover:rotate-90 text-white" />
            </motion.button>

            {/* Scrollable Container so entire ad fits seamlessly on small screens */}
            <div className="overflow-y-auto overscroll-contain flex-1">
              
              {/* Rugby Stadium Visual Header Banner */}
              <div className="relative h-32 sm:h-38 w-full overflow-hidden bg-[#040d08]">
                <img
                  src="/rugby-ball-stadium.jpg"
                  alt="Rugby ball on stadium pitch under floodlights"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-105"
                />
                
                {/* Stadium floodlight vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#091811] via-[#091811]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#091811]/90 via-transparent to-[#091811]/90" />

                {/* Rugby Ball SVG Badge & Upcoming Campaign Chip */}
                <div className="absolute bottom-2.5 left-4 right-4 flex items-end justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* Stylized Rugby Ball Icon Badge */}
                    <div className="w-8 h-8 rounded-lg bg-[#00482b]/90 border border-[#c8a46b]/60 flex items-center justify-center shadow-lg backdrop-blur-sm text-[#f5d799]">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                        <ellipse cx="12" cy="12" rx="9" ry="5" transform="rotate(-30 12 12)" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
                        <line x1="6" y1="8.5" x2="18" y2="15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="10" y1="9.5" x2="9" y2="11.5" stroke="currentColor" strokeWidth="1.2"/>
                        <line x1="12" y1="11" x2="11" y2="13" stroke="currentColor" strokeWidth="1.2"/>
                        <line x1="14" y1="12" x2="13" y2="14" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-[#b48332]/35 text-[#fce4a6] border border-[#c8a46b]/50 backdrop-blur-sm">
                        <Sparkles className="w-2.5 h-2.5 text-[#f5d799]" />
                        <span>Upcoming Campaign</span>
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-[#e2bd76] bg-black/60 px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">
                    01 OCT 2026 – 31 AUG 2027
                  </span>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="p-4 sm:p-5 pt-3 sm:pt-3 space-y-3.5 sm:space-y-4">

                {/* Campaign Title & Headline */}
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#d4af37] mb-1">
                    <span>FILEWISE RUGBY WORLD CUP 2027 VISA GIVEAWAY</span>
                  </div>
                  <h2 
                    id="competition-promo-title"
                    className="font-serif font-black text-xl sm:text-2xl text-white tracking-tight leading-tight"
                  >
                    APPLY FOR A VISA.<br />
                    <span className="bg-gradient-to-r from-[#ffe4a0] via-[#f7cb73] to-[#c8a46b] bg-clip-text text-transparent">
                      YOU COULD GET IT FOR FREE.
                    </span>
                  </h2>
                </div>

                {/* Prominent Prize Box with Rugby Gold Accent */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#00341f] via-[#09221b] to-[#111e2e] border border-[#c8a46b]/50 p-3 sm:p-3.5 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#b48332]/40 to-[#00482b]/60 border border-[#f5d799]/50 flex items-center justify-center shrink-0 text-[#fce4a6] shadow-sm">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffd57e]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f7d58b] flex items-center gap-1">
                        <span>ONE WINNER</span>
                        <span className="text-white/40">•</span>
                        <span className="text-[#a7f3d0] font-bold">100% REFUND</span>
                      </div>
                      <div className="font-extrabold text-sm sm:text-base text-white leading-snug">
                        100% REFUND OF ELIGIBLE FILEWISE VISA COSTS
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supporting Text */}
                <p className="text-xs sm:text-[13px] text-[#cbd5e1] leading-relaxed">
                  Apply for a qualifying visa through FileWise between <strong className="text-white font-semibold">01 October 2026</strong> and <strong className="text-white font-semibold">31 August 2027</strong> and automatically stand a chance to have your eligible FileWise visa costs refunded.
                </p>

                {/* Short explanation & Live draw note */}
                <div className="bg-[#050b12]/80 rounded-xl p-2.5 sm:p-3 border border-white/10 space-y-1.5 text-[11px] text-[#94a3b8]">
                  <p className="flex items-start gap-1.5 text-slate-200">
                    <span className="text-[#c8a46b] font-bold leading-none mt-0.5">•</span>
                    <span>Every qualifying paid FileWise visa application becomes an entry into the live draw.</span>
                  </p>
                  <p className="flex items-start gap-1.5 text-[#f5d799] font-medium">
                    <span className="text-[#c8a46b] font-bold leading-none mt-0.5">•</span>
                    <span><strong>Live Draw:</strong> 04 September 2027 at 18:00 (SAST) on TikTok &amp; YouTube.</span>
                  </p>
                </div>

                {/* Main Action Button */}
                <div className="pt-0.5">
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={handleCompetitionClick}
                    id="view-competition-promo-btn"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#b48332] via-[#d6b05e] to-[#9a6d23] hover:from-[#c8a46b] hover:to-[#b48332] text-[#120e06] font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-[0_4px_18px_rgba(180,131,50,0.35)] transition-all cursor-pointer"
                  >
                    <Trophy className="w-4 h-4 text-[#120e06]" />
                    <span>VIEW COMPETITION</span>
                    <ArrowRight className="w-4 h-4 text-[#120e06]" />
                  </motion.button>
                </div>

                {/* Footer / Terms Link & Disclaimers */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[10px] text-[#64748b] border-t border-white/10">
                  <a
                    href="#terms"
                    onClick={handleTermsClick}
                    className="hover:text-[#dfbe87] transition-colors underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Competition Terms &amp; Conditions: filewise.co.za</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <div className="flex items-center gap-1 text-[#475569]">
                    <ShieldCheck className="w-3 h-3 text-[#c8a46b]" />
                    <span>Subject to Official T&amp;Cs</span>
                  </div>
                </div>

                {/* Legal Safeguard Disclaimer */}
                <p className="text-[9px] text-[#475569] text-center leading-tight">
                  Independent consular assistance promoter. Not affiliated with, endorsed by, or an official partner of World Rugby or Rugby World Cup.
                </p>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
