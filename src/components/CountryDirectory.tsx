import React, { useState, useMemo } from 'react';
import { Search, Globe, ShieldCheck, Building2, Clock, ChevronRight, X, Filter, Sparkles, ArrowRight, MessageSquare, Send, CheckCircle2, MessageCircle, HelpCircle, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
    <section className="py-12 bg-[#faf8f5] text-[#2b241d] border-y border-[#c8a46b]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-[#f4ecd9] text-[#7a5418] text-xs px-3.5 py-1.5 rounded-full font-bold mb-3 border border-[#c8a46b]/50 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-[#b48332]" />
            <span>Outbound Visa Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b241d]">
            Outbound Visa Information by Destination Country
          </h2>
          <p className="text-[#5c5044] text-sm mt-1 font-sans">
            Search your destination nation below to review consular guidance, visa category preparation, and processing estimates for South African travelers.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/95 border-2 border-[#c8a46b]/40 p-5 sm:p-6 rounded-3xl shadow-md mb-8 space-y-4 max-w-4xl mx-auto backdrop-blur-xl">
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-[#b48332]" />
              <input
                type="text"
                placeholder="Type country name or code (e.g. UK, UAE, USA, Qatar)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 text-[#2b241d] text-sm rounded-2xl pl-11 pr-10 py-3 focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d] transition-all shadow-xs focus:ring-2 focus:ring-[#b48332]/20"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-3 text-[#8c7b6d] hover:text-[#2b241d] p-1 rounded-full hover:bg-[#eee8dc] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Hague Filter dropdown buttons */}
            <div className="flex items-center gap-1 bg-[#f5f0e6] p-1 rounded-2xl border border-[#c8a46b]/30 text-xs shrink-0">
              <button
                onClick={() => setHagueFilter('ALL')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
                  hagueFilter === 'ALL' ? 'bg-white text-[#9e7127] shadow-xs font-bold border border-[#c8a46b]/50' : 'text-[#5c5044] hover:text-[#2b241d]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setHagueFilter('HAGUE')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
                  hagueFilter === 'HAGUE' ? 'bg-white text-[#9e7127] shadow-xs font-bold border border-[#c8a46b]/50' : 'text-[#5c5044] hover:text-[#2b241d]'
                }`}
              >
                Hague Apostille
              </button>
              <button
                onClick={() => setHagueFilter('NON_HAGUE')}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all ${
                  hagueFilter === 'NON_HAGUE' ? 'bg-white text-[#9e7127] shadow-xs font-bold border border-[#c8a46b]/50' : 'text-[#5c5044] hover:text-[#2b241d]'
                }`}
              >
                Embassy Attestation
              </button>
            </div>
          </div>

          {/* Region Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-[#eee5d6] pt-3 scrollbar-none">
            <span className="text-[#8c7b6d] font-medium mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#b48332]" /> Region:
            </span>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-[#b48332] text-white font-bold shadow-xs'
                    : 'text-[#5c5044] hover:bg-[#f4eedf]'
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
            <div className="bg-white border-2 border-[#c8a46b]/40 rounded-3xl p-8 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-[#fbf6ec] text-[#b48332] rounded-2xl flex items-center justify-center mx-auto border border-[#c8a46b]/40 shadow-xs">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2b241d]">Search to View Country Legalisation Requirements</h3>
                <p className="text-xs text-[#5c5044] mt-1 max-w-md mx-auto">
                  Type any destination nation in the search bar above or click one of the popular destination shortcuts below.
                </p>
              </div>

              {/* Quick Country Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#8c7b6d] uppercase tracking-wider block mb-2.5">
                  Popular Destination Quick Search:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {quickCountries.map((qc) => (
                    <button
                      key={qc.code}
                      onClick={() => setSearchTerm(qc.name)}
                      className="inline-flex items-center gap-1.5 bg-[#fbf9f5] hover:bg-[#f4ecd9] border border-[#c8a46b]/40 hover:border-[#b48332] text-[#4c4035] hover:text-[#9e7127] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-2xs"
                    >
                      <span>{qc.flag}</span>
                      <span>{qc.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Country Not Listed Banner */}
            <div className="bg-gradient-to-r from-[#fbf7ee] via-[#f7f0df] to-[#f4ead6] border-2 border-[#c8a46b] rounded-2xl p-6 text-[#2b241d] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-[#9e7127] font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Country Not Listed Above?</span>
                </div>
                <h4 className="text-lg font-extrabold text-[#2b241d]">We Legalise Documents For All 190+ Countries</h4>
                <p className="text-xs text-[#5c5044] max-w-xl">
                  If your destination country is not listed, submit a quick request and our team will verify the diplomatic requirements and send details to your WhatsApp or Email.
                </p>
              </div>

              <button
                onClick={openCustomCountryModalWithSearch}
                className="bg-[#b48332] hover:bg-[#9f7228] text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shrink-0 shadow-sm border border-[#9a6d23] flex items-center gap-2"
              >
                <span>Request Country Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : filteredCountries.length === 0 ? (
          /* No Search Results */
          <div className="bg-white border-2 border-[#c8a46b]/40 rounded-3xl p-8 sm:p-10 max-w-2xl mx-auto text-center space-y-5 shadow-sm">
            <div className="w-12 h-12 bg-[#fbf6ec] text-[#b48332] rounded-2xl flex items-center justify-center mx-auto border border-[#c8a46b]/40">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-[#2b241d]">Country Not Listed in Directory?</h3>
              <p className="text-xs text-[#5c5044] mt-1 max-w-md mx-auto leading-relaxed">
                We couldn't find an exact directory match for <strong>"{searchTerm}"</strong>, but FileWise legalises documents for <strong>ALL 190+ countries globally</strong>.
              </p>
            </div>

            <div className="bg-[#fbf7ee] border border-[#c8a46b]/40 rounded-2xl p-4 text-xs text-[#5c5044] text-left space-y-2">
              <span className="font-bold block text-[#2b241d]">How we can help immediately:</span>
              <ul className="space-y-1.5 list-disc list-inside text-[#5c5044]">
                <li>Check exact DIRCO, High Court, or Embassy requirements for {searchTerm || 'your country'}</li>
                <li>Receive custom pricing &amp; processing timelines directly on WhatsApp or Email</li>
                <li>Free verification of document eligibility before submission</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={openCustomCountryModalWithSearch}
                className="w-full sm:w-auto bg-[#b48332] hover:bg-[#9f7228] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-sm border border-[#9a6d23] flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire About "{searchTerm || 'Unlisted Country'}"</span>
              </button>

              <button
                onClick={() => { setSearchTerm(''); setSelectedRegion('ALL'); setHagueFilter('ALL'); }}
                className="w-full sm:w-auto bg-[#f4eedf] hover:bg-[#ebe2ce] text-[#4c4035] text-xs font-bold px-5 py-3 rounded-xl transition-colors border border-[#c8a46b]/40"
              >
                Reset Search
              </button>
            </div>
          </div>
        ) : (
          /* Search Results Grid (Only appears when searched) */
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-2 text-xs text-[#5c5044]">
              <span>Matching countries ({filteredCountries.length}):</span>
              <button
                onClick={() => { setSearchTerm(''); setSelectedRegion('ALL'); setHagueFilter('ALL'); }}
                className="text-[#9e7127] hover:underline font-semibold"
              >
                Clear Search
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCountries.map((c) => (
                <div
                  key={c.code}
                  className="bg-white border-2 border-[#c8a46b]/35 hover:border-[#b48332] rounded-2xl p-5 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between group hover:-translate-y-0.5"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl p-1 bg-[#fbf9f5] rounded-xl border border-[#c8a46b]/30">{c.flag}</span>
                        <div>
                          <h3 className="font-bold text-base text-[#2b241d] group-hover:text-[#9e7127] transition-colors">
                            {c.name}
                          </h3>
                          <span className="text-[11px] text-[#8c7b6d] font-mono">{c.region} • Code: {c.code}</span>
                        </div>
                      </div>

                      {c.hagueMember ? (
                        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 shrink-0">
                          HAGUE
                        </span>
                      ) : (
                        <span className="bg-[#fbf5ea] text-[#8e6320] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#c8a46b]/50 shrink-0">
                          EMBASSY
                        </span>
                      )}
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#fbf9f5] p-2.5 rounded-xl border border-[#ebdcc4] my-3">
                      <div>
                        <span className="text-[#8c7b6d] text-[10px] block uppercase font-medium">Est. Processing</span>
                        <span className="font-bold text-[#2b241d] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-[#b48332]" /> ~{c.standardProcessingDays} days
                        </span>
                      </div>

                      <div>
                        <span className="text-[#8c7b6d] text-[10px] block uppercase font-medium">Protocol</span>
                        <span className="font-bold text-[#9e7127] flex items-center gap-1 mt-0.5 text-[11px]">
                          {c.hagueMember ? 'DIRCO Apostille' : 'Embassy Attestation'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#5c5044] line-clamp-2 mb-3">
                      <strong className="text-[#2b241d] font-semibold">Step 1:</strong> {c.recommendedSteps[0]}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-[#ebdcc4] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCountryDetail(c)}
                      className="text-xs font-bold text-[#9e7127] hover:text-[#785118] flex items-center gap-1"
                    >
                      <span>View Requirements</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {onSelectCountryForInquiry && (
                      <button
                        onClick={() => onSelectCountryForInquiry(c.code)}
                        className="bg-[#b48332] hover:bg-[#9f7228] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow-2xs border border-[#9a6d23]"
                      >
                        Inquire
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom helper card if user searched */}
            <div className="bg-white border-2 border-[#c8a46b]/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fbf6ec] text-[#b48332] flex items-center justify-center shrink-0 border border-[#c8a46b]/40">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#2b241d] block">Can't find the specific country you are looking for?</span>
                  <span className="text-[#5c5044]">We assist with legalisations for all unlisted territories worldwide.</span>
                </div>
              </div>

              <button
                onClick={openCustomCountryModalWithSearch}
                className="bg-[#fbf7ee] hover:bg-[#f4ecd9] text-[#9e7127] font-bold px-4 py-2 rounded-xl border border-[#c8a46b]/60 transition-colors shrink-0"
              >
                Inquire For Unlisted Country
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Country Detail Modal */}
      {selectedCountryDetail && (
        <div className="fixed inset-0 z-50 bg-[#2b241d]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#c8a46b] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCountryDetail(null)}
              className="absolute top-5 right-5 text-[#8c7b6d] hover:text-[#2b241d] p-1 rounded-full hover:bg-[#f4eedf] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-4xl p-1 bg-[#fbf9f5] rounded-2xl border border-[#c8a46b]/40">{selectedCountryDetail.flag}</span>
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#2b241d]">{selectedCountryDetail.name} Legalisation</h3>
                <span className="text-xs text-[#8c7b6d] font-medium">{selectedCountryDetail.region} • Destination Requirements</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#8c7b6d] uppercase tracking-wider">Recommended Procedure:</h4>
              <div className="space-y-2">
                {selectedCountryDetail.recommendedSteps.map((step, idx) => (
                  <div key={idx} className="bg-[#fbf9f5] p-3 rounded-xl border border-[#ebdcc4] text-xs text-[#4c4035] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#b48332] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#ebdcc4] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCountryDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5c5044] hover:bg-[#f4eedf] transition-colors"
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
                  className="bg-[#b48332] hover:bg-[#9f7228] text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm border border-[#9a6d23]"
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
        <div className="fixed inset-0 z-50 bg-[#2b241d]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#c8a46b] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCustomCountryOpen(false)}
              className="absolute top-5 right-5 text-[#8c7b6d] hover:text-[#2b241d] p-1 rounded-full hover:bg-[#f4eedf] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-[#fbf5eb] text-[#8e6320] text-xs font-bold px-3 py-1 rounded-full border border-[#c8a46b]/40">
                <Globe className="w-3.5 h-3.5 text-[#b48332]" />
                <span>Custom Country Requirements</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2b241d]">Country Not Listed?</h3>
              <p className="text-xs text-[#5c5044]">
                Submit your destination country details below and our team will check the exact diplomatic requirements and respond via WhatsApp or Email.
              </p>
            </div>

            {customSubmitted ? (
              <div className="bg-[#fbf9f5] border-2 border-[#c8a46b]/40 text-[#4c4035] p-6 rounded-2xl text-center space-y-4 shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-[#2e7d32] mx-auto" />
                <div>
                  <h4 className="font-bold text-base text-[#2b241d]">Inquiry Formatted &amp; Ready!</h4>
                  <p className="text-xs text-[#5c5044] leading-relaxed mt-1">
                    Thank you, <strong>{customCountryForm.fullName}</strong>. Your inquiry for <strong>{customCountryForm.countryName}</strong> has been prefilled. Select an option below to send or copy message text:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left pt-1">
                  <a
                    href={customActionUrls.waApi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs p-3 rounded-xl shadow-xs transition-all border border-[#1ea850]"
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
                    className="flex items-center gap-2.5 bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-xs p-3 rounded-xl shadow-xs transition-all border border-[#9a6d23]"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">Send via Gmail Web</div>
                      <div className="text-[10px] text-amber-100 font-normal truncate">mail.google.com (info@filewise.co.za)</div>
                    </div>
                  </a>

                  <a
                    href={customActionUrls.mail}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-[#f4ecd9] hover:bg-[#ebe0c8] text-[#5c3e0e] font-bold text-xs p-3 rounded-xl shadow-xs transition-all border border-[#c8a46b]"
                  >
                    <Mail className="w-4 h-4 text-[#b48332] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">Open Default Email App</div>
                      <div className="text-[10px] text-[#7a591e] font-normal truncate">info@filewise.co.za (mailto)</div>
                    </div>
                  </a>

                  <a
                    href={customActionUrls.waApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 bg-white border border-[#c8a46b]/60 hover:bg-[#fbf7ee] text-[#2b241d] font-bold text-xs p-3 rounded-xl transition-all shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4 text-[#2e7d32] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold">WhatsApp Protocol Link</div>
                      <div className="text-[10px] text-[#5c5044] font-normal">whatsapp:// Protocol</div>
                    </div>
                  </a>
                </div>

                {/* Copy Text Option */}
                <div className="bg-white p-3.5 rounded-xl border border-[#ebdcc4] text-left space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2b241d]">Prefilled Message Text:</span>
                    <button
                      type="button"
                      onClick={handleCopyCustomMessage}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9e7127] hover:text-[#7a591e] bg-[#fbf9f5] border border-[#c8a46b]/40 px-2.5 py-1 rounded-lg shadow-2xs hover:bg-[#f4ecd9] transition-all"
                    >
                      {isCustomCopied ? <Check className="w-3.5 h-3.5 text-[#2e7d32]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCustomCopied ? 'Copied!' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-[#5c5044] bg-[#fbf9f5] p-2.5 rounded-lg border border-[#ebdcc4] max-h-28 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {customActionUrls.rawMessage}
                  </pre>
                </div>

                <button
                  onClick={() => setIsCustomCountryOpen(false)}
                  className="bg-[#f4eedf] hover:bg-[#ebe2ce] text-[#4c4035] text-xs font-bold px-5 py-2 rounded-xl transition-colors mt-2 border border-[#c8a46b]/40"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#5c5044] uppercase tracking-wider mb-1">
                    Destination Country Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vietnam, Zimbabwe, Malta, Bahamas..."
                    value={customCountryForm.countryName}
                    onChange={(e) => setCustomCountryForm({ ...customCountryForm, countryName: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5c5044] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={customCountryForm.fullName}
                    onChange={(e) => setCustomCountryForm({ ...customCountryForm, fullName: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#5c5044] uppercase tracking-wider mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +27 50 215 4465"
                      value={customCountryForm.phone}
                      onChange={(e) => setCustomCountryForm({ ...customCountryForm, phone: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5c5044] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. sarah@example.com"
                      value={customCountryForm.email}
                      onChange={(e) => setCustomCountryForm({ ...customCountryForm, email: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5c5044] uppercase tracking-wider mb-1">
                    How would you prefer us to reply?
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setCustomCountryForm({ ...customCountryForm, preferredContact: 'whatsapp' })}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        customCountryForm.preferredContact === 'whatsapp'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-[#fbf9f5] border-[#c8a46b]/40 text-[#5c5044]'
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
                          ? 'bg-[#fbf5eb] border-[#c8a46b] text-[#7a5418]'
                          : 'bg-[#fbf9f5] border-[#c8a46b]/40 text-[#5c5044]'
                      }`}
                    >
                      <Send className="w-4 h-4 text-[#b48332]" />
                      <span>Email</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5c5044] uppercase tracking-wider mb-1">
                    Document Type (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Birth Certificate, SAPS Police Clearance, Degree..."
                    value={customCountryForm.documentType}
                    onChange={(e) => setCustomCountryForm({ ...customCountryForm, documentType: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#c8a46b]/40 rounded-xl px-3.5 py-2.5 text-sm text-[#2b241d] focus:outline-none focus:border-[#b48332] focus:bg-white placeholder-[#8c7b6d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow-sm border border-[#9a6d23] flex items-center justify-center gap-2"
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

