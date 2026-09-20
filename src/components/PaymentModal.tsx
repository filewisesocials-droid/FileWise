import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, ShieldCheck, CreditCard, Lock, ArrowRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PayPalLogo } from './PayPalButton';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledRef?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  prefilledRef = '',
}) => {
  const [reference, setReference] = useState(prefilledRef);
  const [isCopied, setIsCopied] = useState(false);
  const paypalUrl = 'https://paypal.me/FileWise';

  const handleCopy = () => {
    navigator.clipboard?.writeText(paypalUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#2b241d]/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-white border-2 border-[#c8a46b] rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-[#2b241d]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003087] via-[#0042a5] to-[#0079c1] text-white p-6 sm:p-7 relative">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0">
                  <PayPalLogo className="w-8 h-8" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/15 px-2.5 py-0.5 rounded-full mb-1">
                    <ShieldCheck className="w-3 h-3 text-[#ffc439]" />
                    <span>Verified Official Recipient</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold leading-tight">
                    Pay Online via PayPal
                  </h3>
                  <p className="text-xs text-blue-100 mt-0.5 font-sans">
                    FileWise Consular Advisory &amp; Legalisation Services
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-7 space-y-6">
              
              {/* Recipient details card */}
              <div className="bg-[#fbf9f5] border border-[#ebdcc4] rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8c7b6d] font-medium">Official PayPal Handle:</span>
                  <span className="font-mono font-bold text-[#003087] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                    @FileWise
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8c7b6d] font-medium">Direct Link:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#2b241d] font-semibold">paypal.me/FileWise</span>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#7a5418] hover:text-[#2b241d] bg-white border border-[#c8a46b]/60 px-2.5 py-1 rounded-md shadow-2xs hover:bg-[#f4ecd9] transition-all"
                      title="Copy link"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-[#2e7d32]" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {reference && (
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#ebdcc4]">
                    <span className="text-[#8c7b6d] font-medium">Invoice No. / File Reference:</span>
                    <span className="font-mono font-bold text-[#7a5418] bg-[#f4ecd9] px-2.5 py-0.5 rounded-md border border-[#c8a46b]/60">
                      {reference}
                    </span>
                  </div>
                )}
              </div>

              {/* Main Call to Action Button */}
              <div className="space-y-2.5">
                <a
                  href={paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#ffc439] hover:bg-[#f4ba31] text-[#003087] font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-2xl border-2 border-[#e0aa2b] shadow-md hover:shadow-lg transition-all text-center"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/90 flex items-center justify-center shrink-0 shadow-2xs">
                    <PayPalLogo className="w-4 h-4" />
                  </div>
                  <span>Open PayPal &amp; Pay Now (@FileWise)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <p className="text-[11px] text-[#8c7b6d] text-center">
                  Opens securely in a new window on PayPal's official portal.
                </p>
              </div>

              {/* Step-by-step instructions */}
              <div className="bg-white border border-[#ebdcc4] rounded-2xl p-4 space-y-2.5 text-xs text-[#5c5044]">
                <div className="font-serif font-bold text-[#2b241d] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5 text-[#b48332]" />
                  <span>How to complete your payment:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed text-[11px]">
                  <li>Click the <strong>"Open PayPal &amp; Pay Now"</strong> button above.</li>
                  <li>Enter the invoiced amount in your preferred currency (ZAR, USD, EUR, AED, GBP).</li>
                  <li>
                    In the PayPal <strong>"Add a note"</strong> field, please enter your <strong className="text-[#7a5418] font-semibold underline">Invoice Number</strong>{' '}
                    <strong className="text-[#7a5418] font-mono">{reference ? `(${reference})` : '(e.g. FW-XXXXX)'}</strong> so our accounting desk can immediately receipt your file.
                  </li>
                  <li>You may pay using your PayPal balance or any debit/credit card (no PayPal account required).</li>
                </ol>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-[#ebdcc4] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#8c7b6d]">
                <div className="flex items-center gap-1.5 text-[#2e7d32] font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted &amp; PayPal Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5 text-[#b48332]" />
                  <span>Visa, Mastercard &amp; PayPal</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
