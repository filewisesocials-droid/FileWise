import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface PayPalButtonProps {
  referenceId?: string;
  variant?: 'primary' | 'outline' | 'compact' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSubtitle?: boolean;
}

export const PayPalLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 6.002 0h7.46c2.57 0 4.578.543 5.968 1.614 1.346 1.037 1.956 2.56 1.812 4.526-.37 5.045-3.327 7.734-8.086 7.734H9.79a.82.82 0 0 0-.81.696l-1.074 6.074a.642.642 0 0 1-.633.543l-.197-.15z" 
      fill="#003087"
    />
    <path 
      d="M9.79 13.874h3.366c4.76 0 7.716-2.69 8.086-7.734.144-1.966-.466-3.49-1.812-4.526C18.04.543 16.032 0 13.462 0H6.002C5.474 0 5.026.382 4.944.901L1.837 20.597a.641.641 0 0 0 .633.74h4.606l1.15-7.227.564-3.236zm.19-2.823l1.192-7.558a.428.428 0 0 1 .422-.364h3.36c1.713 0 3.05.362 3.974 1.077.897.692 1.303 1.708 1.208 3.018-.247 3.364-2.217 5.158-5.39 5.158H10.8a.547.547 0 0 1-.54-.464l-.28-1.571v.704z" 
      fill="#0079C1"
    />
  </svg>
);

export const PayPalButton: React.FC<PayPalButtonProps> = ({
  referenceId,
  variant = 'primary',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  const paypalUrl = 'https://paypal.me/FileWise';

  if (variant === 'compact') {
    return (
      <motion.a
        href={paypalUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center gap-2 bg-[#ffc439] hover:bg-[#f4ba31] text-[#003087] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#e0aa2b] shadow-2xs transition-all ${className}`}
        title="Pay securely via PayPal (@FileWise)"
      >
        <PayPalLogo className="w-4 h-4" />
        <span>Pay with PayPal</span>
        <ExternalLink className="w-3 h-3 opacity-75" />
      </motion.a>
    );
  }

  if (variant === 'pill') {
    return (
      <motion.a
        href={paypalUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`inline-flex items-center gap-2 bg-[#003087] hover:bg-[#00205b] text-white font-bold text-xs px-4 py-2 rounded-full shadow-xs border border-[#001d54] transition-all ${className}`}
      >
        <div className="w-5 h-5 rounded-full bg-[#ffc439] flex items-center justify-center shrink-0">
          <PayPalLogo className="w-3 h-3" />
        </div>
        <span>Pay Online (PayPal)</span>
      </motion.a>
    );
  }

  if (variant === 'outline') {
    return (
      <motion.a
        href={paypalUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#fbf7ee] text-[#003087] font-bold text-xs px-4 py-3 rounded-xl border-2 border-[#003087]/30 hover:border-[#003087] transition-all shadow-2xs ${className}`}
      >
        <PayPalLogo className="w-4 h-4" />
        <span>Pay via PayPal (@FileWise)</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
      </motion.a>
    );
  }

  // Primary variant: Classic, high-trust PayPal gold button
  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-3 text-xs sm:text-sm',
    lg: 'px-6 py-3.5 text-sm sm:text-base',
  }[size];

  return (
    <motion.a
      href={paypalUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center gap-3 bg-[#ffc439] hover:bg-[#f5b82e] text-[#003087] font-bold rounded-xl border border-[#e5ad27] shadow-sm hover:shadow-md transition-all duration-200 ${sizeClasses} ${className}`}
    >
      <div className="w-7 h-7 rounded-lg bg-white/90 flex items-center justify-center shrink-0 shadow-2xs border border-[#003087]/10">
        <PayPalLogo className="w-4 h-4" />
      </div>

      <div className="text-left">
        <div className="font-extrabold tracking-tight flex items-center gap-1.5 leading-tight">
          <span>Pay with PayPal</span>
          <span className="text-[11px] font-normal text-[#003087]/80">(@FileWise)</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </div>
        {showSubtitle && (
          <div className="text-[10px] font-medium text-[#003087]/85 tracking-normal">
            {referenceId ? `Ref: ${referenceId} • ` : ''}Cards &amp; PayPal Balance Accepted
          </div>
        )}
      </div>
    </motion.a>
  );
};
