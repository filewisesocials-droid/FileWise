import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle2, MessageCircle, Copy, Check, ExternalLink, Building2, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import { PayPalLogo, PayPalButton } from './PayPalButton';

interface ContactUsProps {
  onStartInquiry?: () => void;
  onNavigateToPayments?: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onStartInquiry, onNavigateToPayments }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'email',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [actionUrls, setActionUrls] = useState<{
    waApp: string;
    waApi: string;
    mail: string;
    gmail: string;
    rawMessage: string;
  }>({
    waApp: '',
    waApi: '',
    mail: '',
    gmail: '',
    rawMessage: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const formattedMessage = [
        `*FileWise Direct Contact Message*`,
        `*Subject:* ${formData.subject}`,
        `*Name:* ${formData.name}`,
        `*Email:* ${formData.email}`,
        `*Phone/WhatsApp:* ${formData.phone || 'Not provided'}`,
        `*Message:* ${formData.message}`,
      ].join('\n');

      const encodedMsg = encodeURIComponent(formattedMessage);
      const waAppUrl = `whatsapp://send?phone=27502154465&text=${encodedMsg}`;
      const waApiUrl = `https://api.whatsapp.com/send?phone=27502154465&text=${encodedMsg}`;
      const mailSubject = `Contact Inquiry: ${formData.subject} - ${formData.name}`;
      const mailUrl = `mailto:info@filewise.co.za?subject=${encodeURIComponent(mailSubject)}&body=${encodedMsg}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@filewise.co.za&su=${encodeURIComponent(mailSubject)}&body=${encodedMsg}`;

      setActionUrls({
        waApp: waAppUrl,
        waApi: waApiUrl,
        mail: mailUrl,
        gmail: gmailUrl,
        rawMessage: formattedMessage,
      });
      setSubmitted(true);
      setIsCopied(false);

      if (formData.preferredContact === 'whatsapp') {
        window.open(waApiUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.open(mailUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleCopyMessage = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(actionUrls.rawMessage);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = actionUrls.rawMessage;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section className="py-16 bg-[#faf8f5] text-[#2b241d] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-[#f4ecd9] border border-[#c8a46b]/50 text-[#7a5418] text-xs font-bold px-4 py-1.5 rounded-full shadow-2xs">
            <Building2 className="w-4 h-4 text-[#b48332]" />
            <span>South African Diplomatic &amp; Visa Advisory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#2b241d]">
            Contact FileWise
          </h1>

          <p className="text-[#5c5044] text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            Contact our Pretoria specialists for inquiries regarding outbound visa application support or South African document legalisation, DIRCO Hague Apostille, and embassy attestations.
          </p>
        </motion.div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Phone & WhatsApp Card */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332] p-6 rounded-2xl space-y-4 shadow-2xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#f4ecd9] text-[#7a5418] flex items-center justify-center border border-[#c8a46b]/60 shadow-2xs">
                <MessageCircle className="w-6 h-6 text-[#b48332]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2b241d]">Call or WhatsApp</h3>
                <p className="text-xs text-[#5c5044] mt-1 font-sans">Mon - Fri: 08:00 - 17:00 (SAST)</p>
              </div>
              <div className="pt-2 border-t border-[#ebdcc4] space-y-2">
                <a
                  href="tel:+27502154465"
                  className="text-base font-bold text-[#2b241d] hover:text-[#9e7127] transition-colors block"
                >
                  +27 50 215 4465
                </a>

                <a
                  href="https://wa.me/27502154465?text=Hello%20FileWise%20Team%2C%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#2e7d32] hover:bg-[#256628] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Email Info Card */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332] p-6 rounded-2xl space-y-4 shadow-2xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#f4ecd9] text-[#7a5418] flex items-center justify-center border border-[#c8a46b]/60 shadow-2xs">
                <Mail className="w-6 h-6 text-[#b48332]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2b241d]">Email Address</h3>
                <p className="text-xs text-[#5c5044] mt-1 font-sans">Direct response from our Pretoria advisors</p>
              </div>
              <div className="pt-2 border-t border-[#ebdcc4]">
                <a
                  href="mailto:info@filewise.co.za"
                  className="text-base font-bold text-[#7a5418] hover:text-[#9e7127] transition-colors block"
                >
                  info@filewise.co.za
                </a>
              </div>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332] p-6 rounded-2xl space-y-4 shadow-2xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#f4ecd9] text-[#7a5418] flex items-center justify-center border border-[#c8a46b]/60 shadow-2xs">
                <MapPin className="w-6 h-6 text-[#b48332]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2b241d]">Headquarters</h3>
                <p className="text-xs text-[#5c5044] mt-1 font-sans">Legal &amp; Consular Hub</p>
              </div>
              <div className="pt-2 border-t border-[#ebdcc4] text-xs text-[#5c5044] leading-relaxed font-medium">
                National Legal Processing Operations<br />
                Pretoria Diplomatic &amp; Consular Hubs<br />
                South Africa
              </div>
            </div>
          </motion.div>

          {/* Client Payments / EFT & PayPal Card */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-white border-2 border-[#c8a46b]/50 hover:border-[#b48332] p-6 rounded-2xl space-y-4 shadow-2xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#f4ecd9] text-[#7a5418] flex items-center justify-center border border-[#c8a46b]/60 shadow-2xs">
                <CreditCard className="w-6 h-6 text-[#b48332]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#2b241d]">Client Payments</h3>
                <p className="text-xs text-[#5c5044] mt-1 font-sans">EFT (FNB) &amp; PayPal Settlement</p>
              </div>
              <div className="pt-2 border-t border-[#ebdcc4] space-y-2">
                <p className="text-[11px] text-[#7a6b5e] leading-relaxed">
                  Use your <strong className="text-[#7a5418]">Invoice Number</strong> as payment reference for fast file reconciliation.
                </p>
                {onNavigateToPayments ? (
                  <button
                    onClick={onNavigateToPayments}
                    className="inline-flex items-center justify-center gap-1.5 w-full bg-[#f4ecd9] hover:bg-[#ebdcc4] text-[#7a5418] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#c8a46b]/60 transition-all cursor-pointer"
                  >
                    <span>View Banking &amp; PayPal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href="https://paypal.me/FileWise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#ffc439] hover:bg-[#f5b82e] text-[#003087] font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs border border-[#e5ad27] transition-all"
                  >
                    <PayPalLogo className="w-4 h-4" />
                    <span>Pay with PayPal</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Social Media Channels Section */}
        <div className="bg-white border-2 border-[#c8a46b]/40 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#ebdcc4] pb-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2b241d]">
                Official Channels
              </h2>
              <p className="text-xs text-[#5c5044] mt-1 font-sans">
                Follow FileWise online for document legalisation and outbound visa updates.
              </p>
            </div>
            <span className="inline-flex items-center text-[10px] font-bold text-[#7a5418] bg-[#f4ecd9] border border-[#c8a46b]/50 px-3 py-1 rounded-full w-fit">
              Verified Social Profiles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1GhTJDMDL7/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 p-4 rounded-xl bg-[#fbf9f5] hover:bg-[#f4ecd9]/60 border border-[#c8a46b]/30 hover:border-[#c8a46b] transition-all shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#2b241d]">Facebook</div>
                <div className="text-xs text-[#5c5044] truncate">FileWise</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c7b6d] shrink-0" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/filewise_za"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 p-4 rounded-xl bg-[#fbf9f5] hover:bg-[#f4ecd9]/60 border border-[#c8a46b]/30 hover:border-[#c8a46b] transition-all shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#2b241d]">Instagram</div>
                <div className="text-xs text-[#5c5044] truncate">@filewise_za</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c7b6d] shrink-0" />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@Filewise_ZA"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 p-4 rounded-xl bg-[#fbf9f5] hover:bg-[#f4ecd9]/60 border border-[#c8a46b]/30 hover:border-[#c8a46b] transition-all shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#2b241d]">YouTube</div>
                <div className="text-xs text-[#5c5044] truncate">@Filewise_ZA</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c7b6d] shrink-0" />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@filewise8"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 p-4 rounded-xl bg-[#fbf9f5] hover:bg-[#f4ecd9]/60 border border-[#c8a46b]/30 hover:border-[#c8a46b] transition-all shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-[#2b241d] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.1v-3.6a6.34 6.34 0 0 0-.82-.05A6.33 6.33 0 0 0 3 15.57a6.33 6.33 0 0 0 10.8 4.47V10.4a8.16 8.16 0 0 0 4.79 1.54V8.5a4.84 4.84 0 0 1-3-.81z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[#2b241d]">TikTok</div>
                <div className="text-xs text-[#5c5044] truncate">@filewise8</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#8c7b6d] shrink-0" />
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white border-2 border-[#c8a46b]/40 rounded-2xl p-8 sm:p-10 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-serif font-bold text-[#2b241d]">Send Us a Direct Message</h2>
            <p className="text-xs text-[#5c5044] font-sans">
              Fill out the form below and one of our advisors will respond promptly.
            </p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-[#fbf9f5] border-2 border-[#c8a46b] text-[#2b241d] rounded-2xl p-6 sm:p-8 text-center space-y-5"
            >
              <CheckCircle2 className="w-12 h-12 text-[#2e7d32] mx-auto" />
              <div>
                <h3 className="text-xl font-serif font-bold text-[#2b241d]">Message Generated</h3>
                <p className="text-xs text-[#5c5044] max-w-md mx-auto leading-relaxed mt-1 font-sans">
                  Thank you, <strong>{formData.name}</strong>. Choose an option below to transmit your message:
                </p>
              </div>

              {/* Direct action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <a
                  href={actionUrls.waApi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#2e7d32] hover:bg-[#256628] text-white font-bold text-xs p-3.5 rounded-xl shadow-xs transition-all"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold">Send via WhatsApp</div>
                    <div className="text-[10px] text-emerald-100 font-normal truncate">+27 50 215 4465 (Opens WhatsApp)</div>
                  </div>
                </a>

                <a
                  href={actionUrls.gmail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-xs p-3.5 rounded-xl shadow-xs transition-all border border-[#9a6d23]"
                >
                  <ExternalLink className="w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold">Send via Gmail Web</div>
                    <div className="text-[10px] text-amber-100 font-normal truncate">mail.google.com (info@filewise.co.za)</div>
                  </div>
                </a>

                <a
                  href={actionUrls.mail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#f4ecd9] hover:bg-[#ebe0c8] text-[#5c3e0e] font-bold text-xs p-3.5 rounded-xl transition-all border border-[#c8a46b]"
                >
                  <Mail className="w-5 h-5 text-[#b48332] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold">Open Default Email App</div>
                    <div className="text-[10px] text-[#7a5418] font-normal truncate">info@filewise.co.za (mailto)</div>
                  </div>
                </a>

                <a
                  href={actionUrls.waApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border-2 border-[#2e7d32]/40 hover:bg-[#e8f5e9] text-[#1b5e20] font-bold text-xs p-3.5 rounded-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-[#2e7d32] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold">WhatsApp Protocol Link</div>
                    <div className="text-[10px] text-[#2e7d32] font-normal">whatsapp:// Protocol</div>
                  </div>
                </a>
              </div>

              {/* Copy Message Section */}
              <div className="bg-white p-4 rounded-xl border border-[#ebdcc4] text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2b241d]">Prefilled Message Text:</span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7a5418] bg-[#f4ecd9] border border-[#c8a46b]/60 px-3 py-1 rounded-lg hover:bg-[#ebe0c8] transition-all"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-[#2e7d32]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-[#5c5044] bg-[#fbf9f5] p-3 rounded-lg border border-[#ebdcc4] max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {actionUrls.rawMessage}
                </pre>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '', preferredContact: 'whatsapp' });
                }}
                className="bg-[#f4ecd9] hover:bg-[#ebe0c8] text-[#5c3e0e] font-bold text-xs px-5 py-2.5 rounded-xl transition-colors border border-[#c8a46b]/60 mt-2"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2b241d] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johan van der Merwe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-4 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2b241d] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. johan@example.co.za"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-4 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2b241d] uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +27 50 215 4465"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-4 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2b241d] uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-4 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white transition-all cursor-pointer font-medium"
                  >
                    <option value="Outbound Visa Assistance">Outbound Visa Assistance</option>
                    <option value="DIRCO Hague Apostille">DIRCO Hague Apostille (Pretoria)</option>
                    <option value="Pretoria Embassy Attestation">Pretoria Embassy Attestation</option>
                    <option value="Sworn High Court Translation">Sworn High Court Translation</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2b241d] uppercase tracking-wider mb-1">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your visa or document legalisation requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl p-4 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d] transition-all resize-y"
                ></textarea>
              </div>

              {/* Contact Method Choice */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#2b241d] uppercase tracking-wider mb-2">
                  Preferred Contact Channel:
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredContact: 'whatsapp' })}
                    className={`p-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
                      formData.preferredContact === 'whatsapp'
                        ? 'bg-[#e8f5e9] border-[#2e7d32] text-[#1b5e20] shadow-2xs'
                        : 'bg-[#fbf9f5] border-[#ebdcc4] text-[#5c5044] hover:bg-[#f4ecd9]/50'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-[#2e7d32]" />
                    <span>WhatsApp (+27 50 215 4465)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredContact: 'email' })}
                    className={`p-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
                      formData.preferredContact === 'email'
                        ? 'bg-[#fbf5eb] border-[#b48332] text-[#7a5418] shadow-2xs'
                        : 'bg-[#fbf9f5] border-[#ebdcc4] text-[#5c5044] hover:bg-[#f4ecd9]/50'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-[#b48332]" />
                    <span>Email (info@filewise.co.za)</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 border border-[#9a6d23]"
              >
                {formData.preferredContact === 'whatsapp' ? (
                  <>
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Send Message via WhatsApp (+27 50 215 4465)</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 text-white" />
                    <span>Send Message via Email (info@filewise.co.za)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
