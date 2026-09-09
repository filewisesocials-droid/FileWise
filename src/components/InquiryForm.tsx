import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, FileCheck2, Globe, Building2, MessageCircle, Mail, Copy, Check, ExternalLink, Stamp, PlaneTakeoff } from 'lucide-react';
import { motion } from 'motion/react';
import { COUNTRIES } from '../data/countries';
import { DOCUMENT_TYPES } from '../data/documents';

interface InquiryFormProps {
  initialDestCode?: string;
  onInquirySubmitted?: (trackId: string) => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialDestCode = 'AE',
  onInquirySubmitted
}) => {
  const [inquiryCategory, setInquiryCategory] = useState<'VISA' | 'LEGALISATION'>('VISA');
  const [destCode, setDestCode] = useState(initialDestCode === 'ZA' ? 'AE' : initialDestCode);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>(['degree_diploma']);
  
  // Contact details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');
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

  const toggleDocSelection = (docId: string) => {
    if (selectedDocIds.includes(docId)) {
      if (selectedDocIds.length > 1) {
        setSelectedDocIds(selectedDocIds.filter(id => id !== docId));
      }
    } else {
      setSelectedDocIds([...selectedDocIds, docId]);
    }
  };

  const destCountry = COUNTRIES.find(c => c.code === destCode) || COUNTRIES[0];
  const selectedDocsText = selectedDocIds
    .map(id => DOCUMENT_TYPES.find(d => d.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const randomRef = `FW-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedRef(randomRef);

    const isVisa = inquiryCategory === 'VISA';

    // Format full message text
    const messageLines = [
      `*FileWise Inquiry [Ref: ${randomRef}]*`,
      `*Inquiry Type:* ${isVisa ? `Outbound Visa Assistance (${destCountry.name})` : 'South African Document Legalisation & Attestation'}`,
      `*Full Name:* ${fullName}`,
      `*Email:* ${email}`,
      `*Phone/WhatsApp:* ${phone || 'Not provided'}`,
      `*Document Origin:* South Africa (ZA)`,
      isVisa ? `*Destination Country:* ${destCountry.name}` : '*Service Location:* Executed in Pretoria, South Africa',
      !isVisa ? `*Selected Documents:* ${selectedDocsText}` : '',
      notes ? `*Notes:* ${notes}` : '',
    ].filter(Boolean).join('\n');

    const encodedMsg = encodeURIComponent(messageLines);
    const waAppUrl = `whatsapp://send?phone=27502154465&text=${encodedMsg}`;
    const waApiUrl = `https://api.whatsapp.com/send?phone=27502154465&text=${encodedMsg}`;
    const mailSubject = `FileWise Inquiry - ${fullName} [${randomRef}]`;
    const mailUrl = `mailto:info@filewise.co.za?subject=${encodeURIComponent(mailSubject)}&body=${encodedMsg}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@filewise.co.za&su=${encodeURIComponent(mailSubject)}&body=${encodedMsg}`;

    setActionUrls({
      waApp: waAppUrl,
      waApi: waApiUrl,
      mail: mailUrl,
      gmail: gmailUrl,
      rawMessage: messageLines,
    });
    setIsSubmitted(true);
    setIsCopied(false);

    if (onInquirySubmitted) {
      onInquirySubmitted(randomRef);
    }

    if (contactMethod === 'whatsapp') {
      window.open(waApiUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open(mailUrl, '_blank', 'noopener,noreferrer');
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
    <section className="py-12 sm:py-16 bg-[#faf8f5] text-[#2b241d] min-h-[700px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#f4ecd9] text-[#7a5418] text-xs px-3.5 py-1.5 rounded-full font-bold mb-3 border border-[#c8a46b]/50 shadow-2xs">
            <Building2 className="w-4 h-4 text-[#b48332]" />
            <span>South African Diplomatic &amp; Visa Advisory</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#2b241d]">
            Submit an Inquiry
          </h2>
          <p className="text-[#5c5044] text-sm mt-2 font-sans">
            Submit your outbound visa or document legalisation requirements for expert guidance from our Pretoria team.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-2 border-[#c8a46b] rounded-2xl p-6 sm:p-8 shadow-xl text-center max-w-2xl mx-auto space-y-6"
          >
            <div className="w-16 h-16 bg-[#f4ecd9] text-[#2e7d32] rounded-full flex items-center justify-center mx-auto border-2 border-[#c8a46b]/60 shadow-2xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-[#7a5418] bg-[#fbf5eb] px-3 py-1 rounded-full border border-[#c8a46b]/40">
                REFERENCE: {submittedRef}
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#2b241d] mt-3">
                Inquiry Formatted &amp; Ready
              </h3>
              <p className="text-sm text-[#5c5044] mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your inquiry has been generated. Choose your preferred channel to contact us:
              </p>
            </div>

            {/* Direct action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <a
                href={actionUrls.waApi}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs p-3.5 rounded-xl shadow-xs transition-all border border-[#1ea850]"
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
                className="flex items-center gap-3 bg-[#f4ecd9] hover:bg-[#ebe0c8] text-[#5c3e0e] font-bold text-xs p-3.5 rounded-xl shadow-xs transition-all border border-[#c8a46b]"
              >
                <Mail className="w-5 h-5 text-[#b48332] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold">Open Default Email App</div>
                  <div className="text-[10px] text-[#7a591e] font-normal truncate">info@filewise.co.za (mailto)</div>
                </div>
              </a>

              <a
                href={actionUrls.waApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-[#c8a46b]/60 hover:bg-[#fbf7ee] text-[#2b241d] font-bold text-xs p-3.5 rounded-xl transition-all shadow-2xs"
              >
                <MessageCircle className="w-5 h-5 text-[#2e7d32] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold">WhatsApp Protocol Link</div>
                  <div className="text-[10px] text-[#5c5044] font-normal">whatsapp:// Protocol</div>
                </div>
              </a>
            </div>

            {/* Copy Message Section */}
            <div className="bg-[#fbf9f5] p-4 rounded-xl border border-[#ebdcc4] text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2b241d]">Prefilled Inquiry Text:</span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9e7127] hover:text-[#7a591e] bg-white border border-[#c8a46b]/40 px-3 py-1 rounded-lg hover:bg-[#f4ecd9] transition-all shadow-2xs"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-[#2e7d32]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-[#5c5044] bg-white p-3 rounded-lg border border-[#ebdcc4] max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {actionUrls.rawMessage}
              </pre>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFullName('');
                setEmail('');
                setPhone('');
                setNotes('');
              }}
              className="bg-[#f4eedf] hover:bg-[#ebe2ce] text-[#4c4035] font-bold text-xs px-6 py-2.5 rounded-xl transition-all border border-[#c8a46b]/40 shadow-2xs"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleSubmit} 
            className="bg-white border-2 border-[#c8a46b]/50 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            
            {/* Service Category Toggle */}
            <div>
              <label className="block text-xs font-bold text-[#5c5044] uppercase tracking-wider mb-2">
                1. Select Primary Service Type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInquiryCategory('VISA')}
                  className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                    inquiryCategory === 'VISA'
                      ? 'bg-[#f4ecd9] border-[#c8a46b] text-[#2b241d] shadow-2xs'
                      : 'bg-[#fbf9f5] border-[#ebdcc4] text-[#5c5044] hover:bg-[#f4eedf]'
                  }`}
                >
                  <PlaneTakeoff className={`w-5 h-5 shrink-0 mt-0.5 ${inquiryCategory === 'VISA' ? 'text-[#b48332]' : 'text-[#8c7b6d]'}`} />
                  <div>
                    <div className="font-serif font-bold text-sm text-[#2b241d]">Outbound Visa Assistance</div>
                    <div className="text-xs mt-0.5 text-[#5c5044]">
                      Visas for South Africans traveling abroad
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryCategory('LEGALISATION')}
                  className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 ${
                    inquiryCategory === 'LEGALISATION'
                      ? 'bg-[#f4ecd9] border-[#c8a46b] text-[#2b241d] shadow-2xs'
                      : 'bg-[#fbf9f5] border-[#ebdcc4] text-[#5c5044] hover:bg-[#f4eedf]'
                  }`}
                >
                  <Stamp className={`w-5 h-5 shrink-0 mt-0.5 ${inquiryCategory === 'LEGALISATION' ? 'text-[#b48332]' : 'text-[#8c7b6d]'}`} />
                  <div>
                    <div className="font-serif font-bold text-sm text-[#2b241d]">SA Document Legalisation</div>
                    <div className="text-xs mt-0.5 text-[#5c5044]">
                      DIRCO, High Court, &amp; Embassy Attestation in SA
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Specific Service Options */}
            {inquiryCategory === 'VISA' ? (
              <div className="pt-4 border-t border-[#ebdcc4]">
                <h3 className="text-sm font-serif font-bold text-[#2b241d] mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#b48332]" />
                  <span>2. Outbound Visa Destination</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#5c5044] mb-1 font-medium">Passport / Departure</label>
                    <div className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 text-[#2b241d] rounded-xl px-3.5 py-2.5 text-sm font-bold">
                      🇿🇦 South African Passport Holder
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#5c5044] mb-1 font-medium">Destination Country *</label>
                    <select
                      value={destCode}
                      onChange={(e) => setDestCode(e.target.value)}
                      className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 text-[#2b241d] rounded-xl px-3.5 py-2.5 text-sm font-bold focus:outline-none focus:border-[#b48332] cursor-pointer"
                    >
                      {COUNTRIES.filter(c => c.code !== 'ZA').map(c => (
                        <option key={`inq-dest-${c.code}`} value={c.code}>
                          {c.flag} {c.name} Visa Assistance
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#ebdcc4]">
                <h3 className="text-sm font-serif font-bold text-[#2b241d] mb-3 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#b48332]" />
                  <span>2. Select South African Documents Requiring Legalisation</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {DOCUMENT_TYPES.map(doc => {
                    const selected = selectedDocIds.includes(doc.id);
                    return (
                      <button
                        type="button"
                        key={doc.id}
                        onClick={() => toggleDocSelection(doc.id)}
                        className={`p-3 rounded-xl border-2 text-left text-xs transition-all flex items-start gap-2.5 ${
                          selected
                            ? 'bg-[#f4ecd9] border-[#c8a46b] text-[#2b241d] font-semibold shadow-2xs'
                            : 'bg-[#fbf9f5] hover:bg-[#f4eedf] border-[#ebdcc4] text-[#5c5044]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => {}}
                          className="mt-0.5 accent-[#b48332] rounded"
                        />
                        <div>
                          <div className="font-bold leading-snug text-[#2b241d]">{doc.name}</div>
                          <div className="text-[10px] text-[#8c7b6d] font-normal mt-0.5">{doc.category}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            <div className="pt-4 border-t border-[#ebdcc4]">
              <h3 className="text-sm font-serif font-bold text-[#2b241d] mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#b48332]" />
                <span>3. Contact Information &amp; Submission Channel</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#5c5044] font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johan van der Merwe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] placeholder-[#8c7b6d]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5c5044] font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. johan@example.co.za"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] placeholder-[#8c7b6d]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5c5044] font-medium mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +27 50 215 4465"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] placeholder-[#8c7b6d]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#5c5044] font-medium mb-1">Additional Notes / Urgent Deadlines</label>
                  <input
                    type="text"
                    placeholder="e.g. Need urgent visa or DIRCO processing..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] placeholder-[#8c7b6d]"
                  />
                </div>
              </div>

              {/* Contact Method Selector */}
              <div className="mt-4 pt-3 border-t border-[#ebdcc4]">
                <label className="block text-xs font-bold text-[#5c5044] uppercase tracking-wider mb-2">
                  Choose Preferred Response Channel:
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`p-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
                      contactMethod === 'whatsapp'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-2xs'
                        : 'bg-[#fbf9f5] border-[#ebdcc4] text-[#5c5044] hover:bg-[#f4eedf]'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp (+27 50 215 4465)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`p-3 rounded-xl border-2 font-bold flex items-center justify-center gap-2 transition-all ${
                      contactMethod === 'email'
                        ? 'bg-[#f4ecd9] border-[#c8a46b] text-[#5c3e0e] shadow-2xs'
                        : 'bg-[#fbf9f5] border-[#ebdcc4] text-[#5c5044] hover:bg-[#f4eedf]'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-[#b48332]" />
                    <span>Email (info@filewise.co.za)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-bold text-sm py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white border border-[#9a6d23]"
            >
              {contactMethod === 'whatsapp' ? (
                <>
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Send Inquiry via WhatsApp (+27 50 215 4465)</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-white" />
                  <span>Send Inquiry via Email (info@filewise.co.za)</span>
                </>
              )}
            </button>

          </motion.form>
        )}

      </div>
    </section>
  );
};
