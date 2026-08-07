import React, { useState, useMemo } from 'react';
import { Search, Globe, ShieldCheck, Building2, Clock, ChevronRight, X, Filter, Sparkles, ArrowRight, MessageSquare, Send, CheckCircle2, MessageCircle, HelpCircle, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { Country } from '../types';

interface CountryDirectoryProps {
  onSelectCountryForInquiry?: (countryCode: string) => void;
}

export const CountryDirectory: React.FC<CountryDirectoryProps> = ({ onSelectCountryForInquiry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [hagueFilter, setHagueFilter] = useState<'ALL' | 'HAGUE' | 'NON_HAGUE'>('ALL');
  const [selectedCountryDetail, setSelectedCountryDetail] = useState<Country | null>(null);

  // Custom Country Request Modal state
  const [isCustomCountryOpen, setIsCustomCountryOpen] = useState(false);
  const [customCountryForm, setCustomCountryForm] = useState({
    countryName: '',
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'whatsapp' as 'whatsapp' | 'email',
    documentType: '',
  });
  const [customSubmitted, setCustomSubmitted] = useState(false);
  const [isCustomCopied, setIsCustomCopied] = useState(false);
  const [customActionUrls, setCustomActionUrls] = useState<{
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

  // Popular search suggestions
  const quickCountries = [
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
  ];

  const hasActiveFilter = searchTerm.trim().length > 0 || selectedRegion !== 'ALL' || hagueFilter !== 'ALL';

  const filteredCountries = useMemo(() => {
    if (!hasActiveFilter) return [];

    return COUNTRIES.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.region.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion = selectedRegion === 'ALL' || c.region === selectedRegion;

      const matchesHague =
        hagueFilter === 'ALL' ||
        (hagueFilter === 'HAGUE' && c.hagueMember) ||
        (hagueFilter === 'NON_HAGUE' && !c.hagueMember);

      return matchesSearch && matchesRegion && matchesHague;
    });
  }, [searchTerm, selectedRegion, hagueFilter, hasActiveFilter]);

  const regions = ['ALL', 'Europe', 'Americas', 'Asia', 'Middle East', 'Africa', 'Oceania'];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCountryForm.countryName && customCountryForm.fullName && (customCountryForm.phone || customCountryForm.email)) {
      const formattedMessage = [
        `*FileWise Unlisted Country Legalisation Inquiry*`,
        `*Destination Country:* ${customCountryForm.countryName}`,
        `*Full Name:* ${customCountryForm.fullName}`,
        `*Email:* ${customCountryForm.email || 'Not provided'}`,
        `*Phone/WhatsApp:* ${customCountryForm.phone || 'Not provided'}`,
        customCountryForm.documentType ? `*Document Type:* ${customCountryForm.documentType}` : '',
      ].filter(Boolean).join('\n');

      const encodedMsg = encodeURIComponent(formattedMessage);
      const waAppUrl = `whatsapp://send?phone=27502154465&text=${encodedMsg}`;
      const waApiUrl = `https://api.whatsapp.com/send?phone=27502154465&text=${encodedMsg}`;
      const mailSubject = `Unlisted Country Inquiry: ${customCountryForm.countryName} - ${customCountryForm.fullName}`;
      const mailUrl = `mailto:info@filewise.co.za?subject=${encodeURIComponent(mailSubject)}&body=${encodedMsg}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@filewise.co.za&su=${encodeURIComponent(mailSubject)}&body=${encodedMsg}`;

      setCustomActionUrls({
        waApp: waAppUrl,
        waApi: waApiUrl,
        mail: mailUrl,
        gmail: gmailUrl,
        rawMessage: formattedMessage,
      });
      setCustomSubmitted(true);
      setIsCustomCopied(false);

      if (customCountryForm.preferredContact === 'whatsapp') {
        window.open(waApiUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.open(mailUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleCopyCustomMessage = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(customActionUrls.rawMessage);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = customActionUrls.rawMessage;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setIsCustomCopied(true);
    setTimeout(() => setIsCustomCopied(false), 3000);
  };

  const openCustomCountryModalWithSearch = () => {
    setCustomCountryForm((prev) => ({
      ...prev,
      countryName: searchTerm.trim() || prev.countryName,
    }));
    setCustomSubmitted(false);
    setIsCustomCountryOpen(true);
  };

  return (
    <section className="py-12 bg-slate-50 text-slate-900 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-3.5 py-1.5 rounded-full font-semibold mb-3 border border-blue-200 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Search Country Legalisation Requirements</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sans text-slate-900">
            Find Requirements For Any Destination Country
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Search for a specific country below to check Hague Apostille status, embassy protocols, and processing times.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6 space-y-4 max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Type country name or code (e.g. UK, UAE, USA, Qatar)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-10 py-3 focus:outline-none focus:border-blue-500 focus:bg-white placeholder-slate-400 transition-all shadow-inner"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Hague Filter dropdown buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0">
              <button
                onClick={() => setHagueFilter('ALL')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  hagueFilter === 'ALL' ? 'bg-white text-blue-700 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setHagueFilter('HAGUE')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  hagueFilter === 'HAGUE' ? 'bg-white text-blue-700 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Hague Apostille
              </button>
              <button
                onClick={() => setHagueFilter('NON_HAGUE')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                  hagueFilter === 'NON_HAGUE' ? 'bg-white text-blue-700 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Embassy Attestation
              </button>
            </div>
          </div>

          {/* Region Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-100 pt-3 scrollbar-none">
            <span className="text-slate-400 font-medium mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Region:
            </span>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {region === 'ALL' ? 'All Regions' : region}
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Display Area */}
        {!hasActiveFilter ? (
          /* Default Empty Search State */
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Search to View Country Legalisation Requirements</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Type any destination nation in the search bar above or click one of the popular destination shortcuts below.
                </p>
              </div>

              {/* Quick Country Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Popular Destination Quick Search:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {quickCountries.map((qc) => (
                    <button
                      key={qc.code}
                      onClick={() => setSearchTerm(qc.name)}
                      className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-2xs"
                    >
                      <span>{qc.flag}</span>
                      <span>{qc.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Country Not Listed Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Country Not Listed Above?</span>
                </div>
                <h4 className="text-lg font-extrabold">We Legalise Documents For All 190+ Countries</h4>
                <p className="text-xs text-blue-100 max-w-xl">
                  If your destination country is not listed, submit a quick request and our team will verify the diplomatic requirements and send details to your WhatsApp or Email.
                </p>
              </div>

              <button
                onClick={openCustomCountryModalWithSearch}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-xl transition-colors shrink-0 shadow-sm flex items-center gap-2"
              >
                <span>Request Country Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : filteredCountries.length === 0 ? (
          /* No Search Results */
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 max-w-2xl mx-auto text-center space-y-5 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Country Not Listed in Directory?</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                We couldn't find an exact directory match for <strong>"{searchTerm}"</strong>, but FileWise legalises documents for <strong>ALL 190+ countries globally</strong>.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900 text-left space-y-2">
              <span className="font-bold block text-blue-950">How we can help immediately:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                <li>Check exact DIRCO, High Court, or Embassy requirements for {searchTerm || 'your country'}</li>
                <li>Receive custom pricing &amp; processing timelines directly on WhatsApp or Email</li>
                <li>Free verification of document eligibility before submission</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={openCustomCountryModalWithSearch}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire About "{searchTerm || 'Unlisted Country'}"</span>
              </button>

              <button
                onClick={() => { setSearchTerm(''); setSelectedRegion('ALL'); setHagueFilter('ALL'); }}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-3 rounded-xl transition-colors"
              >
                Reset Search
              </button>
            </div>
          </div>
        ) : (
          /* Search Results Grid (Only appears when searched) */
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-2 text-xs text-slate-500">
              <span>Matching countries ({filteredCountries.length}):</span>
              <button
                onClick={() => { setSearchTerm(''); setSelectedRegion('ALL'); setHagueFilter('ALL'); }}
                className="text-blue-600 hover:underline font-semibold"
              >
                Clear Search
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCountries.map((c) => (
                <div
                  key={c.code}
                  className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-5 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl p-1 bg-slate-50 rounded-xl border border-slate-200">{c.flag}</span>
                        <div>
                          <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                            {c.name}
                          </h3>
                          <span className="text-[11px] text-slate-400 font-mono">{c.region} • Code: {c.code}</span>
                        </div>
                      </div>

                      {c.hagueMember ? (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                          HAGUE
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 shrink-0">
                          EMBASSY
                        </span>
                      )}
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 my-3">
                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase font-medium">Est. Processing</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-blue-600" /> ~{c.standardProcessingDays} days
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 text-[10px] block uppercase font-medium">Protocol</span>
                        <span className="font-bold text-blue-700 flex items-center gap-1 mt-0.5 text-[11px]">
                          {c.hagueMember ? 'DIRCO Apostille' : 'Embassy Attestation'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      <strong className="text-slate-700 font-semibold">Step 1:</strong> {c.recommendedSteps[0]}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCountryDetail(c)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>View Requirements</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {onSelectCountryForInquiry && (
                      <button
                        onClick={() => onSelectCountryForInquiry(c.code)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                      >
                        Inquire
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom helper card if user searched */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Can't find the specific country you are looking for?</span>
                  <span className="text-slate-500">We assist with legalisations for all unlisted territories worldwide.</span>
                </div>
              </div>

              <button
                onClick={openCustomCountryModalWithSearch}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-xl border border-blue-200 transition-colors shrink-0"
              >
                Inquire For Unlisted Country
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Country Detail Modal */}
      {selectedCountryDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCountryDetail(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedCountryDetail.flag}</span>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{selectedCountryDetail.name} Legalisation</h3>
                <span className="text-xs text-slate-500 font-medium">{selectedCountryDetail.region} • Destination Requirements</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Procedure:</h4>
              <div className="space-y-2">
                {selectedCountryDetail.recommendedSteps.map((step, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCountryDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              {onSelectCountryForInquiry && (
                <button
                  onClick={() => {
                    const code = selectedCountryDetail.code;
                    setSelectedCountryDetail(null);
                    onSelectCountryForInquiry(code);
                  }}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Start Inquiry
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Country Request Modal */}
      {isCustomCountryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCustomCountryOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                <Globe className="w-3.5 h-3.5" />
                <span>Custom Country Requirements</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Country Not Listed?</h3>
              <p className="text-xs text-slate-500">
                Submit your destination country details below and our team will check the exact diplomatic requirements and respond via WhatsApp or Email.
              </p>
            </div>

            {customSubmitted ? (
              <div className="bg-emerald-50/70 border border-emerald-200 text-slate-800 p-6 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div>
                  <h4 className="font-bold text-base text-slate-900">Inquiry Formatted &amp; Ready!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Thank you, <strong>{customCountryForm.fullName}</strong>. Your inquiry for <strong>{customCountryForm.countryName}</strong> has been prefilled. Select an option below to send or copy message text:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left pt-1">
                  <a
                    href={customActionUrls.waApi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs p-3 rounded-xl shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">Send via WhatsApp</div>
                      <div className="text-[10px] text-emerald-100 font-normal truncate">+27 50 215 4465 (Opens WhatsApp)</div>
                    </div>
                  </a>

                  <a
                    href={customActionUrls.gmail}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs p-3 rounded-xl shadow-md transition-all"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">Send via Gmail Web</div>
                      <div className="text-[10px] text-blue-100 font-normal truncate">mail.google.com (info@filewise.co.za)</div>
                    </div>
                  </a>

                  <a
                    href={customActionUrls.mail}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs p-3 rounded-xl shadow-md transition-all"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">Open Default Email App</div>
                      <div className="text-[10px] text-slate-300 font-normal truncate">info@filewise.co.za (mailto)</div>
                    </div>
                  </a>

                  <a
                    href={customActionUrls.waApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-900 font-bold text-xs p-3 rounded-xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">WhatsApp Protocol Link</div>
                      <div className="text-[10px] text-emerald-700 font-normal">whatsapp:// Protocol</div>
                    </div>
                  </a>
                </div>

                {/* Copy Text Option */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-left space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Prefilled Message Text:</span>
                    <button
                      type="button"
                      onClick={handleCopyCustomMessage}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs hover:bg-slate-100 transition-all"
                    >
                      {isCustomCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCustomCopied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 max-h-28 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {customActionUrls.rawMessage}
                  </pre>
                </div>

                <button
                  onClick={() => setIsCustomCountryOpen(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-5 py-2 rounded-xl transition-colors mt-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Destination Country Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vietnam, Zimbabwe, Malta, Bahamas..."
                    value={customCountryForm.countryName}
                    onChange={(e) => setCustomCountryForm({ ...customCountryForm, countryName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={customCountryForm.fullName}
                    onChange={(e) => setCustomCountryForm({ ...customCountryForm, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +27 50 215 4465"
                      value={customCountryForm.phone}
                      onChange={(e) => setCustomCountryForm({ ...customCountryForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sarah@example.com"
                      value={customCountryForm.email}
                      onChange={(e) => setCustomCountryForm({ ...customCountryForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    How would you prefer us to reply?
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setCustomCountryForm({ ...customCountryForm, preferredContact: 'whatsapp' })}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        customCountryForm.preferredContact === 'whatsapp'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCustomCountryForm({ ...customCountryForm, preferredContact: 'email' })}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        customCountryForm.preferredContact === 'email'
                          ? 'bg-blue-50 border-blue-300 text-blue-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <Send className="w-4 h-4 text-blue-600" />
                      <span>Email</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Document Type (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Birth Certificate, SAPS Police Clearance, Degree..."
                    value={customCountryForm.documentType}
                    onChange={(e) => setCustomCountryForm({ ...customCountryForm, documentType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Unlisted Country Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

