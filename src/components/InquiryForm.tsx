import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, FileCheck2, Globe, Building2, MessageCircle, Mail, Copy, Check, ExternalLink, Stamp, PlaneTakeoff } from 'lucide-react';
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
    <section className="py-12 sm:py-16 bg-slate-50 text-slate-900 min-h-[700px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs px-3.5 py-1.5 rounded-md font-bold mb-3 border border-amber-200">
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>South African Diplomatic &amp; Visa Advisory</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Submit an Inquiry
          </h2>
          <p className="text-slate-600 text-sm mt-2 font-sans">
            Submit your outbound visa or document legalisation requirements for expert guidance from our Pretoria team.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xl text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                REFERENCE: {submittedRef}
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mt-3">
                Inquiry Formatted &amp; Ready
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your inquiry has been generated. Choose your preferred channel to contact us:
              </p>
            </div>

            {/* Direct action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <a
                href={actionUrls.waApi}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs p-3.5 rounded-lg shadow-md transition-all"
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
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs p-3.5 rounded-lg shadow-md transition-all"
              >
                <ExternalLink className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold">Send via Gmail Web</div>
                  <div className="text-[10px] text-amber-300 font-normal truncate">mail.google.com (info@filewise.co.za)</div>
                </div>
              </a>

              <a
                href={actionUrls.mail}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs p-3.5 rounded-lg shadow-md transition-all"
              >
                <Mail className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold">Open Default Email App</div>
                  <div className="text-[10px] text-slate-300 font-normal truncate">info@filewise.co.za (mailto)</div>
                </div>
              </a>

              <a
                href={actionUrls.waApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-900 font-bold text-xs p-3.5 rounded-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold">WhatsApp Protocol Link</div>
                  <div className="text-[10px] text-emerald-700 font-normal">whatsapp:// Protocol</div>
                </div>
              </a>
            </div>

            {/* Copy Message Section */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Prefilled Inquiry Text:</span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 px-3 py-1 rounded hover:bg-slate-100 transition-all"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-700 bg-white p-3 rounded border border-slate-200 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
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
              className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-6 py-2.5 rounded transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-lg space-y-6">
            
            {/* Service Category Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Select Primary Service Type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInquiryCategory('VISA')}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    inquiryCategory === 'VISA'
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <PlaneTakeoff className={`w-5 h-5 shrink-0 mt-0.5 ${inquiryCategory === 'VISA' ? 'text-amber-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="font-serif font-bold text-sm">Outbound Visa Assistance</div>
                    <div className={`text-xs mt-0.5 ${inquiryCategory === 'VISA' ? 'text-slate-300' : 'text-slate-500'}`}>
                      Visas for South Africans traveling abroad
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setInquiryCategory('LEGALISATION')}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    inquiryCategory === 'LEGALISATION'
                      ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Stamp className={`w-5 h-5 shrink-0 mt-0.5 ${inquiryCategory === 'LEGALISATION' ? 'text-amber-400' : 'text-slate-500'}`} />
                  <div>
                    <div className="font-serif font-bold text-sm">SA Document Legalisation</div>
                    <div className={`text-xs mt-0.5 ${inquiryCategory === 'LEGALISATION' ? 'text-slate-300' : 'text-slate-500'}`}>
                      DIRCO, High Court, &amp; Embassy Attestation in SA
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Specific Service Options */}
            {inquiryCategory === 'VISA' ? (
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-600" />
                  <span>2. Outbound Visa Destination</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-medium">Passport / Departure</label>
                    <div className="w-full bg-slate-100 border border-slate-200 text-slate-800 rounded-lg px-3.5 py-2.5 text-sm font-bold">
                      🇿🇦 South African Passport Holder
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-600 mb-1 font-medium">Destination Country *</label>
                    <select
                      value={destCode}
                      onChange={(e) => setDestCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-lg px-3.5 py-2.5 text-sm font-bold focus:outline-none focus:border-slate-800 cursor-pointer"
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
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-amber-600" />
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
                        className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 ${
                          selected
                            ? 'bg-amber-50 border-amber-400 text-amber-950 font-semibold shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => {}}
                          className="mt-0.5 text-amber-600 rounded"
                        />
                        <div>
                          <div className="font-bold leading-snug">{doc.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal mt-0.5">{doc.category}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Contact Details */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>3. Contact Information &amp; Submission Channel</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johan van der Merwe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. johan@example.co.za"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +27 50 215 4465"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Additional Notes / Urgent Deadlines</label>
                  <input
                    type="text"
                    placeholder="e.g. Need urgent visa or DIRCO processing..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              {/* Contact Method Selector */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Choose Preferred Response Channel:
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`p-3 rounded-lg border font-bold flex items-center justify-center gap-2 transition-all ${
                      contactMethod === 'whatsapp'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp (+27 50 215 4465)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`p-3 rounded-lg border font-bold flex items-center justify-center gap-2 transition-all ${
                      contactMethod === 'email'
                        ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-amber-700" />
                    <span>Email (info@filewise.co.za)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-bold text-sm py-3.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white"
            >
              {contactMethod === 'whatsapp' ? (
                <>
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Send Inquiry via WhatsApp (+27 50 215 4465)</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Send Inquiry via Email (info@filewise.co.za)</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </section>
  );
};
