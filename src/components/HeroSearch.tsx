import React, { useState, useMemo } from 'react';
import { ArrowRight, ShieldCheck, FileCheck2, Globe, Clock, AlertTriangle, CheckCircle2, Building2, HelpCircle, FileText, Stamp } from 'lucide-react';
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
    <div className="bg-slate-900 text-white border-b border-slate-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-950/70 border border-amber-800/80 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>South African Diplomatic &amp; Visa Advisory Agency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Outbound Visas &amp; South African <br className="hidden sm:inline" />
            <span className="text-amber-400">Document Legalisation</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            Specialist assistance for South Africans applying for international visas worldwide, and expert document legalisation (DIRCO, High Court, &amp; Embassy Attestation) executed within South Africa.
          </p>
        </div>

        {/* Dual Core Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
          
          {/* Section 1: Outbound Visa Selector */}
          <div className="lg:col-span-7 bg-white text-slate-900 border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-slate-900">Outbound Visa Assistance</h2>
                  <p className="text-xs text-slate-500">Applying from South Africa to any destination worldwide</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded">
                Outbound Visas
              </span>
            </div>

            {/* Destination Selection */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Outbound Destination Country:
              </label>

              <div className="relative">
                <select
                  value={destCode}
                  onChange={(e) => setDestCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-4 py-3 text-sm sm:text-base font-bold focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-800/10 cursor-pointer appearance-none pr-10 shadow-xs"
                >
                  {COUNTRIES.filter(c => c.code !== 'ZA').map((c) => (
                    <option key={`dest-${c.code}`} value={c.code}>
                      {c.flag} {c.name} — Visa &amp; Consular Guidance
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-4 text-slate-500 text-xs">▼</div>
              </div>

              {/* Popular Visa Shortcuts */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Popular Outbound Destinations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularVisaDestinations.map((pair) => (
                    <button
                      key={pair.dest}
                      onClick={() => setDestCode(pair.dest)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        destCode === pair.dest
                          ? 'bg-slate-900 text-white font-bold border-slate-900'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {pair.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Country Visa Info Box */}
              <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{destCountry.flag}</span>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{destCountry.name} Visa Assistance</h3>
                      <p className="text-xs text-slate-500">Outbound application preparation for SA passport holders</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded">
                    ~{destCountry.standardProcessingDays} Business Days
                  </span>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 pt-2.5 space-y-1">
                  <p className="flex items-center gap-1.5 font-medium text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Complete consular application form verification &amp; appointment scheduling.
                  </p>
                  <p className="flex items-center gap-1.5 font-medium text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Support for work, business, study, ancestry, and visitor visa categories.
                  </p>
                </div>

                <button
                  onClick={() => onStartInquiry(destCode)}
                  className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <span>Start Outbound Visa Inquiry for {destCountry.name}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Section 2: South African Document Legalisation & Attestations */}
          <div className="lg:col-span-5 bg-slate-800 text-white border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Stamp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-white">SA Document Legalisation</h2>
                  <p className="text-xs text-slate-300">Processed within South Africa (Pretoria)</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Legalising official South African documents for international or official use. We handle all processing directly at Pretoria government departments and embassies in SA.
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-slate-900/80 border border-slate-700 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" /> DIRCO Hague Apostille
                  </span>
                  <span className="text-[10px] text-slate-400">Pretoria DIRCO</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  For SA birth/marriage certificates, degrees, &amp; police clearance used in Hague member countries.
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-700 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-400" /> Pretoria Foreign Embassy Attestation
                  </span>
                  <span className="text-[10px] text-slate-400">Pretoria Consulates</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Consular attestation at UAE, Qatar, Saudi Arabia, Kuwait, &amp; non-Hague embassies in Pretoria.
                </p>
              </div>

              <div className="p-3.5 bg-slate-900/80 border border-slate-700 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-amber-400" /> High Court &amp; Sworn Translations
                  </span>
                  <span className="text-[10px] text-slate-400">SA High Courts</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  High Court notary authentication and certified High Court sworn translations in SA.
                </p>
              </div>
            </div>

            <button
              onClick={() => onStartInquiry('ZA')}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Stamp className="w-4 h-4" />
              <span>Inquire for SA Document Legalisation</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
