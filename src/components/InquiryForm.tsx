import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, AlertCircle, FileCheck2, Globe, Building2, MessageCircle, Mail, Copy, Check, ExternalLink } from 'lucide-react';
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

    // Format full message text
    const messageLines = [
      `*FileWise Legalisation Inquiry [Ref: ${randomRef}]*`,
      `*Full Name:* ${fullName}`,
      `*Email:* ${email}`,
      `*Phone/WhatsApp:* ${phone || 'Not provided'}`,
      `*Origin:* South Africa (ZA)`,
      `*Destination Country:* ${destCountry.name} (${destCountry.hagueMember ? 'Hague Apostille' : 'Embassy Attestation'})`,
      `*Selected Documents:* ${selectedDocsText}`,
      notes ? `*Special Notes:* ${notes}` : '',
    ].filter(Boolean).join('\n');

    const encodedMsg = encodeURIComponent(messageLines);
    const waAppUrl = `whatsapp://send?phone=27502154465&text=${encodedMsg}`;
    const waApiUrl = `https://api.whatsapp.com/send?phone=27502154465&text=${encodedMsg}`;
    const mailSubject = `FileWise Legalisation Inquiry - ${fullName} [${randomRef}]`;
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

    // Automatically trigger chosen contact channel safely in new window/tab
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
    <section className="py-12 bg-slate-50 text-slate-900 min-h-[700px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3.5 py-1.5 rounded-full font-semibold mb-3 border border-blue-200 shadow-sm">
            <FileCheck2 className="w-4 h-4 text-blue-600" />
            <span>South Africa Document Legalisation Inquiry</span>
          </div>
          <h2 className="text-3xl font-extrabold font-sans text-slate-900">
            Submit Document Legalisation Inquiry
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Request official guidance and processing support for legalising South African documents for international use.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                INQUIRY REFERENCE: {submittedRef}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-3">
                Inquiry Formatted &amp; Ready!
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your inquiry details for <strong>{destCountry.name}</strong> have been prefilled. Select an option below to open your app or copy message text:
              </p>
            </div>

            {/* Direct action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <a
                href={actionUrls.waApi}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs p-3.5 rounded-xl shadow-md transition-all"
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
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs p-3.5 rounded-xl shadow-md transition-all"
              >
                <ExternalLink className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold">Send via Gmail Web</div>
                  <div className="text-[10px] text-blue-100 font-normal truncate">mail.google.com (info@filewise.co.za)</div>
                </div>
              </a>

              <a
                href={actionUrls.mail}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs p-3.5 rounded-xl shadow-md transition-all"
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
                className="flex items-center gap-3 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-900 font-bold text-xs p-3.5 rounded-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold">WhatsApp Protocol Link</div>
                  <div className="text-[10px] text-emerald-700 font-normal">whatsapp:// Protocol</div>
                </div>
              </a>
            </div>

            {/* Copy Message Section */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Prefilled Inquiry Text:</span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs hover:bg-slate-100 transition-all"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {actionUrls.rawMessage}
              </pre>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1 text-slate-700">
              <p>• <strong>Document Origin:</strong> South Africa (ZA)</p>
              <p>• <strong>Destination Country:</strong> {destCountry.flag} {destCountry.name} ({destCountry.hagueMember ? 'Hague Apostille' : 'Embassy Attestation'})</p>
              <p>• <strong>Selected Documents:</strong> {selectedDocsText}</p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFullName('');
                setEmail('');
                setPhone('');
                setNotes('');
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-6 py-2.5 rounded-xl transition-all"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Step 1: Destination Selection */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>1. Select Destination Country</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5 font-medium flex items-center justify-between">
                    <span>Document Origin</span>
                    <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">South Africa Origin</span>
                  </label>
                  <div className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm font-bold flex items-center justify-between">
                    <span>🇿🇦 South Africa (ZA)</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">Fixed</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-1.5 font-medium">Destination Country</label>
                  <select
                    value={destCode}
                    onChange={(e) => setDestCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium cursor-pointer"
                  >
                    {COUNTRIES.filter(c => c.code !== 'ZA').map(c => (
                      <option key={`inq-dest-${c.code}`} value={c.code}>
                        {c.flag} {c.name} {c.hagueMember ? '(Hague Apostille)' : '(Embassy Attestation)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 bg-blue-50 p-3 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Legalisation Route for <strong>{destCountry.name}</strong>: {destCountry.hagueMember ? 'DIRCO / High Court Hague Apostille' : 'Pretoria Foreign Embassy Attestation'}</span>
              </div>
            </div>

            {/* Step 2: Document Selection */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>2. Select Documents Requiring Legalisation</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {DOCUMENT_TYPES.map(doc => {
                  const selected = selectedDocIds.includes(doc.id);
                  return (
                    <button
                      type="button"
                      key={doc.id}
                      onClick={() => toggleDocSelection(doc.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                        selected
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-semibold shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => {}}
                        className="mt-0.5 text-blue-600 rounded focus:ring-blue-500"
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

            {/* Step 3: Contact Details */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>3. Your Contact Information &amp; Submission Channel</span>
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +27 50 215 4465"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-700 font-medium mb-1">Special Notes / Timeline Requirements</label>
                  <input
                    type="text"
                    placeholder="e.g. Express urgent processing needed..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Contact Method Selector */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Choose How You Want To Send This Inquiry:
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setContactMethod('whatsapp')}
                    className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                      contactMethod === 'whatsapp'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp (+27 50 215 4465)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                      contactMethod === 'email'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email (info@filewise.co.za)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                contactMethod === 'whatsapp'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
              }`}
            >
              {contactMethod === 'whatsapp' ? (
                <>
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp (+27 50 215 4465)</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send via Email (info@filewise.co.za)</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </section>
  );
};
