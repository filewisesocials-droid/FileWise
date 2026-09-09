import React, { useState, useMemo } from 'react';
import { ArrowRight, ShieldCheck, FileCheck2, Globe, Clock, AlertTriangle, CheckCircle2, Building2, HelpCircle, FileText, Stamp } from 'lucide-react';
import { motion } from 'motion/react';
import { COUNTRIES, getCountryByCode } from '../data/countries';
import { calculateRequirement } from '../data/documents';

interface HeroSearchProps {
  onStartInquiry: (destCode: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onStartInquiry }) => {
  const [destCode, setDestCode] = useState('AE');

  const originCountry = useMemo(() => getCountryByCode('ZA'), []);
  const destCountry = useMemo(() => getCountryByCode(destCode), [destCode]);

  const requirement = useMemo(
    () => calculateRequirement(originCountry, destCountry),
    [originCountry, destCountry]
  );

  const popularVisaDestinations = [
    { dest: 'AE', label: 'UAE 🇦🇪 (Work & Residence Visas)' },
    { dest: 'GB', label: 'UK 🇬🇧 (Ancestry & Work Visas)' },
    { dest: 'ES', label: 'Spain 🇪🇸 (Digital Nomad Visas)' },
    { dest: 'QA', label: 'Qatar 🇶🇦 (Work Visas)' },
    { dest: 'SA', label: 'Saudi Arabia 🇸🇦 (Commercial Visas)' },
    { dest: 'DE', label: 'Germany 🇩🇪 (Blue Card)' },
    { dest: 'NL', label: 'Netherlands 🇳🇱 (MVV / Work Visas)' },
    { dest: 'US', label: 'USA 🇺🇸 (Consular Visas)' }
  ];

  return (
    <div className="bg-gradient-to-b from-[#fdfcf9] via-[#f9f5ed] to-[#f4eee2] text-[#2b241d] border-b border-[#c8a46b]/40 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-10 space-y-3"
        >
          <div className="inline-flex items-center gap-2 bg-[#fbf4e8] border border-[#dfbe87] text-[#8a5716] text-xs font-semibold px-4 py-1.5 rounded-full shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-[#b48332]" />
            <span>South African Diplomatic &amp; Visa Advisory Agency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#2b241d] leading-tight">
            Outbound Visas &amp; South African <br className="hidden sm:inline" />
            <span className="text-[#b48332]">Document Legalisation</span>
          </h1>

          <p className="text-[#5c5044] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            Specialist assistance for South Africans applying for international visas worldwide, and expert document legalisation (DIRCO, High Court, &amp; Embassy Attestation) executed within South Africa.
          </p>
        </motion.div>

        {/* Dual Core Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          
          {/* Section 1: Outbound Visa Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            className="lg:col-span-7 bg-white text-[#2b241d] border-2 border-[#c8a46b]/40 rounded-2xl p-6 sm:p-7 shadow-lg shadow-[#b48332]/5 hover:border-[#b48332]/80 transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#ebdcc4] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#fbf5eb] text-[#b48332] border border-[#dfbe87] flex items-center justify-center font-bold shadow-2xs">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-[#2b241d]">Outbound Visa Assistance</h2>
                  <p className="text-xs text-[#7a6b5e]">Applying from South Africa to any destination worldwide</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8a5716] bg-[#fbf4e8] border border-[#dfbe87] px-2.5 py-1 rounded-md">
                Outbound Visas
              </span>
            </div>

            {/* Destination Selection */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-[#44382e] uppercase tracking-wider">
                Select Outbound Destination Country:
              </label>

              <div className="relative">
                <select
                  value={destCode}
                  onChange={(e) => setDestCode(e.target.value)}
                  className="w-full bg-[#faf7f0] border-2 border-[#dfcfb5] text-[#2b241d] rounded-xl px-4 py-3 text-sm sm:text-base font-bold focus:outline-none focus:border-[#b48332] focus:ring-2 focus:ring-[#b48332]/20 cursor-pointer appearance-none pr-10 shadow-2xs transition-colors"
                >
                  {COUNTRIES.filter(c => c.code !== 'ZA').map((c) => (
                    <option key={`dest-${c.code}`} value={c.code}>
                      {c.flag} {c.name} — Visa &amp; Consular Guidance
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-4 text-[#8a5716] text-xs font-bold">▼</div>
              </div>

              {/* Popular Visa Shortcuts */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[#7a6b5e] uppercase tracking-wider block mb-2">
                  Popular Outbound Destinations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularVisaDestinations.map((pair) => (
                    <button
                      key={pair.dest}
                      onClick={() => setDestCode(pair.dest)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        destCode === pair.dest
                          ? 'bg-[#b48332] text-white font-bold border-[#9a6d23] shadow-xs'
                          : 'bg-[#faf7f0] hover:bg-[#f3ead8] text-[#5c5044] border-[#e2d5be]'
                      }`}
                    >
                      {pair.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Country Visa Info Box */}
              <motion.div 
                key={destCode}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="mt-5 p-4 bg-[#faf7f0] border border-[#dfcfb5] rounded-xl space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{destCountry.flag}</span>
                    <div>
                      <h3 className="font-bold text-sm text-[#2b241d]">{destCountry.name} Visa Assistance</h3>
                      <p className="text-xs text-[#7a6b5e]">Outbound application preparation for SA passport holders</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#8a5716] bg-white border border-[#dfbe87] px-2 py-1 rounded">
                    ~{destCountry.standardProcessingDays} Business Days
                  </span>
                </div>

                <div className="text-xs text-[#5c5044] leading-relaxed border-t border-[#ebdcc4] pt-2.5 space-y-1">
                  <p className="flex items-center gap-1.5 font-medium text-[#3b3127]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    Complete consular application form verification &amp; appointment scheduling.
                  </p>
                  <p className="flex items-center gap-1.5 font-medium text-[#3b3127]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    Support for work, business, study, ancestry, and visitor visa categories.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStartInquiry(destCode)}
                  className="w-full mt-2 bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-xs py-3 rounded-xl shadow-md border border-[#9a6d23] flex items-center justify-center gap-2 transition-all"
                >
                  <FileCheck2 className="w-4 h-4 text-[#fae1b8]" />
                  <span>Start Outbound Visa Inquiry for {destCountry.name}</span>
                </motion.button>
              </motion.div>

            </div>
          </motion.div>

          {/* Section 2: South African Document Legalisation & Attestations */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 bg-gradient-to-b from-[#fefdfb] to-[#fbf7f0] text-[#2b241d] border-2 border-[#c8a46b]/50 rounded-2xl p-6 sm:p-7 shadow-lg shadow-[#b48332]/5 space-y-5 hover:border-[#b48332]/80 transition-all duration-300"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#ebdcc4]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#b48332] text-white flex items-center justify-center font-bold shadow-xs">
                  <Stamp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-[#2b241d]">SA Document Legalisation</h2>
                  <p className="text-xs text-[#7a6b5e]">Processed within South Africa (Pretoria)</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5c5044] leading-relaxed font-sans">
              Legalising official South African documents for international or official use. We handle all processing directly at Pretoria government departments and embassies in SA.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-white border border-[#dfcfb5] hover:border-[#b48332] rounded-xl space-y-1 shadow-2xs transition-all">
                <div className="flex items-center justify-between text-xs font-bold text-[#8a5716]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#b48332]" /> DIRCO Hague Apostille
                  </span>
                  <span className="text-[10px] text-[#7a6b5e] bg-[#fbf5eb] px-2 py-0.5 rounded border border-[#dfbe87]/50">Pretoria DIRCO</span>
                </div>
                <p className="text-[11px] text-[#5c5044]">
                  For SA birth/marriage certificates, degrees, &amp; police clearance used in Hague member countries.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-[#dfcfb5] hover:border-[#b48332] rounded-xl space-y-1 shadow-2xs transition-all">
                <div className="flex items-center justify-between text-xs font-bold text-[#8a5716]">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#b48332]" /> Pretoria Foreign Embassy Attestation
                  </span>
                  <span className="text-[10px] text-[#7a6b5e] bg-[#fbf5eb] px-2 py-0.5 rounded border border-[#dfbe87]/50">Pretoria Consulates</span>
                </div>
                <p className="text-[11px] text-[#5c5044]">
                  Consular attestation at UAE, Qatar, Saudi Arabia, Kuwait, &amp; non-Hague embassies in Pretoria.
                </p>
              </div>

              <div className="p-3.5 bg-white border border-[#dfcfb5] hover:border-[#b48332] rounded-xl space-y-1 shadow-2xs transition-all">
                <div className="flex items-center justify-between text-xs font-bold text-[#8a5716]">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#b48332]" /> High Court &amp; Sworn Translations
                  </span>
                  <span className="text-[10px] text-[#7a6b5e] bg-[#fbf5eb] px-2 py-0.5 rounded border border-[#dfbe87]/50">SA High Courts</span>
                </div>
                <p className="text-[11px] text-[#5c5044]">
                  High Court notary authentication and certified High Court sworn translations in SA.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartInquiry('ZA')}
              className="w-full bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-xs py-3 rounded-xl shadow-md border border-[#9a6d23] flex items-center justify-center gap-2 transition-all"
            >
              <Stamp className="w-4 h-4" />
              <span>Inquire for SA Document Legalisation</span>
            </motion.button>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
