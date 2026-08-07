import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';

interface ContactUsProps {
  onStartInquiry?: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onStartInquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Legalisation Inquiry',
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
    <section className="py-16 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-2xs">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Get in Touch With Our Specialists</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-slate-900">
            Contact Us
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Have questions about document legalisation, DIRCO Apostille certificates, or foreign embassy attestations? Our team in Rustenburg is ready to assist you.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phone & WhatsApp Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Call or WhatsApp</h3>
                <p className="text-xs text-slate-500 mt-1">Instant support • Mon - Fri: 08:00 - 17:00</p>
              </div>
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <a
                  href="tel:+27502154465"
                  className="text-base font-extrabold text-slate-900 hover:text-blue-600 transition-colors block"
                >
                  +27 50 215 4465
                </a>

                <a
                  href="https://wa.me/27502154465?text=Hello%20FileWise%20Legalisation%20Team%2C%20I%20have%20a%20document%20legalisation%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Email Info Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Email Inquiries</h3>
              <p className="text-xs text-slate-500 mt-1">Direct response within 24 hours</p>
            </div>
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">General:</span>
                <a
                  href="mailto:info@filewise.co.za"
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  info@filewise.co.za
                </a>
              </div>
              <div className="pt-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Support &amp; Tracking:</span>
                <a
                  href="mailto:support@filewise.co.za"
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  support@filewise.co.za
                </a>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Headquarters</h3>
              <p className="text-xs text-slate-500 mt-1">Legal Processing Hub</p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-700 leading-relaxed font-medium">
              Rustenburg<br />
              North West Province<br />
              South Africa
            </div>
          </div>

        </div>

        {/* Contact Form Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-500">
              Fill out the form below and one of our legalisation specialists will contact you shortly.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50/60 border border-emerald-200 text-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-5">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Message Formatted &amp; Ready!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed mt-1">
                  Thank you, <strong>{formData.name}</strong>. Your message details have been prefilled. Select an option below to open your messaging app or copy message text:
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
                  className="flex items-center gap-3 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 font-bold text-xs p-3.5 rounded-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold">WhatsApp Protocol Link</div>
                    <div className="text-[10px] text-emerald-700 font-normal">whatsapp:// Protocol</div>
                  </div>
                </a>
              </div>

              {/* Copy Message Section */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Prefilled Message Text:</span>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg shadow-2xs hover:bg-slate-100 transition-all"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {actionUrls.rawMessage}
                </pre>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'General Legalisation Inquiry', message: '', preferredContact: 'whatsapp' });
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Johan van der Merwe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. johan@example.co.za"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +27 50 215 4465"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  >
                    <option value="General Legalisation Inquiry">General Legalisation Inquiry</option>
                    <option value="Hague Apostille Certificate">Hague Apostille Certificate</option>
                    <option value="Embassy Attestation">Embassy Attestation</option>
                    <option value="Existing Order Support">Existing Order Support</option>
                    <option value="Partnership / Corporate">Partnership / Corporate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Message / Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the documents you need legalised and destination country..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-y"
                ></textarea>
              </div>

              {/* Contact Method Choice */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferred Contact Channel:
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredContact: 'whatsapp' })}
                    className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                      formData.preferredContact === 'whatsapp'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp (+27 50 215 4465)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredContact: 'email' })}
                    className={`p-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${
                      formData.preferredContact === 'email'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email (info@filewise.co.za)</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                  formData.preferredContact === 'whatsapp'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                }`}
              >
                {formData.preferredContact === 'whatsapp' ? (
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

      </div>
    </section>
  );
};
