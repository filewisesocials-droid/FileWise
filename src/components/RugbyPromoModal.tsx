import React, { useEffect, useRef } from 'react';
import { X, Plane, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RugbyPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartInquiry: (countryCode?: string) => void;
}

export const RugbyPromoModal: React.FC<RugbyPromoModalProps> = ({
  isOpen,
  onClose,
  onStartInquiry,
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

  const handleInquiryClick = (countryCode: string = 'NZ') => {
    onClose();
    onStartInquiry(countryCode);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello FileWise! I'm planning to travel from South Africa to support the Springboks in New Zealand / Australia and would like assistance with my tourist visa applications."
    );
    window.open(`https://wa.me/27502154465?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-modal-title"
          id="rugby-promo-dialog"
        >
          {/* Subtle Dark Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#040811]/85 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Card - Scaled to fit entirely in viewport */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="relative w-auto max-w-[92vw] sm:max-w-[440px] md:max-w-[460px] max-h-[94vh] flex flex-col bg-[#0b121e] border border-[#00a3e0]/40 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,163,224,0.3)] text-white overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Obvious Floating Top-Right Close (X) Button */}
            <motion.button
              ref={closeButtonRef}
              whileHover={{ scale: 1.1, backgroundColor: '#00a3e0' }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              id="close-rugby-promo-btn"
              aria-label="Close promotional announcement"
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 hover:bg-[#00a3e0] text-white flex items-center justify-center border border-white/30 shadow-xl backdrop-blur-md transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#00a3e0]"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90" />
            </motion.button>

            {/* Poster Image Container - Constrained to 68vh so the entire ad fits on screen without scroll */}
            <div 
              onClick={() => handleInquiryClick('NZ')}
              className="relative flex-1 min-h-0 bg-[#070c14] flex items-center justify-center overflow-hidden cursor-pointer group"
              title="Click to enquire for Rugby Tour Visas"
            >
              <img
                src="/rugby-promo-poster.jpg"
                alt="FileWise Visa Assistance - Big Games. Bigger Trips. Rugby Tour to New Zealand & Australia"
                className="max-h-[66vh] sm:max-h-[70vh] w-auto h-auto max-w-full object-contain block mx-auto select-none transition-transform duration-300 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('file_000000006a34820b8462b1a6331da5f2.png')) {
                    target.src = '/file_000000006a34820b8462b1a6331da5f2.png';
                  }
                }}
              />
            </div>

            {/* Compact Action Bar - Fits cleanly below the poster */}
            <div className="p-3 sm:p-3.5 bg-gradient-to-b from-[#0e1726] to-[#080d16] border-t border-[#00a3e0]/25 space-y-2">
              
              {/* Quick Tagline */}
              <div className="flex items-center justify-between gap-2 px-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00a3e0] animate-pulse" />
                  <span id="promo-modal-title" className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8]">
                    NZ &amp; Australia Supporter Visas
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#94a3b8]">
                  <ShieldCheck className="w-3 h-3 text-[#00a3e0]" />
                  <span>FileWise Concierge</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {/* Enquire CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInquiryClick('NZ')}
                  className="flex items-center justify-center gap-1.5 w-full bg-[#00a3e0] hover:bg-[#0284c7] text-[#051329] font-black text-[11px] sm:text-xs py-2.5 px-3 rounded-xl shadow-[0_3px_12px_rgba(0,163,224,0.3)] transition-all cursor-pointer truncate"
                >
                  <Plane className="w-3.5 h-3.5 text-[#051329] shrink-0" />
                  <span className="truncate">Enquire for Visas</span>
                  <ArrowRight className="w-3 h-3 text-[#051329] shrink-0" />
                </motion.button>

                {/* WhatsApp Direct Chat */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center gap-1.5 w-full bg-[#1e293b] hover:bg-[#283548] text-white font-semibold text-[11px] sm:text-xs py-2.5 px-3 rounded-xl border border-white/15 hover:border-[#00a3e0]/40 transition-all cursor-pointer truncate"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span className="truncate">WhatsApp Desk</span>
                </motion.button>
              </div>

              {/* Dismiss link */}
              <div className="text-center pt-0.5">
                <button
                  onClick={onClose}
                  className="text-[10px] text-[#64748b] hover:text-[#94a3b8] transition-colors underline cursor-pointer"
                >
                  Continue to FileWise.co.za
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
