import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, ShieldCheck, FileCheck2, Globe, Clock, AlertTriangle, CheckCircle2, Building2, HelpCircle, Sparkles, Compass } from 'lucide-react';
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

  const popularPairs = [
    { dest: 'AE', label: 'SA to UAE 🇦🇪 (Work/Residence)' },
    { dest: 'GB', label: 'SA to UK 🇬🇧 (Ancestry/Work)' },
    { dest: 'ES', label: 'SA to Spain 🇪🇸 (Digital Nomad)' },
    { dest: 'QA', label: 'SA to Qatar 🇶🇦 (Attestation)' },
    { dest: 'SA', label: 'SA to Saudi Arabia 🇸🇦 (Apostille)' },
    { dest: 'DE', label: 'SA to Germany 🇩🇪 (Blue Card)' },
    { dest: 'NL', label: 'SA to Netherlands 🇳🇱 (Work)' }
  ];

  const marqueeRoutes = [
    { flag: '🇦🇪', text: 'SA → UAE Embassy Attestation & Work Visa' },
    { flag: '🇬🇧', text: 'SA → UK Ancestry & Skilled Worker Visas' },
    { flag: '🇪🇸', text: 'SA → Spain Digital Nomad & Residence' },
    { flag: '🇶🇦', text: 'SA → Qatar Consular Document Attestation' },
    { flag: '🇸🇦', text: 'SA → Saudi Arabia DIRCO Hague Apostille' },
    { flag: '🇩🇪', text: 'SA → Germany Blue Card & University Visa' },
    { flag: '🇳🇱', text: 'SA → Netherlands MVV & Work Verification' },
    { flag: '🇺🇸', text: 'SA → USA State Dept & High Court Legalisation' },
  ];

  return (
    <div className="relative bg-slate-900 text-white overflow-hidden py-12 sm:py-16 border-b border-slate-800 bg-mesh-pattern">
      {/* Animated Background Mesh Shapes & Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-10 right-0 w-[24rem] h-[24rem] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-float-reverse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      {/* Moving Live Ticker / Marquee Banner */}
      <div className="relative z-10 mb-8 border-y border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-2.5 overflow-hidden">
        <div className="flex items-center gap-2 max-w-7xl mx-auto px-4">
          <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800/60 px-2.5 py-1 rounded-full shadow-2xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
            </span>
            <span>Live Routes</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
              {[...marqueeRoutes, ...marqueeRoutes].map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-default">
                  <span>{item.flag}</span>
                  <span>{item.text}</span>
                  <span className="text-slate-600">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-800/80 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>South Africa Visa Application Support &amp; Legalisation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Visa Assistance &amp; Document <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">Legalisation Services</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Expert guidance for work, study, and travel visas worldwide. DIRCO Hague apostille, High Court legalisation, and consular attestation requirement checks.
          </p>
        </div>

        {/* Search Control Box */}
        <div className="glass-panel-dark border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto relative overflow-hidden backdrop-blur-xl hover-glow-card">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative z-10">
            
            {/* Origin Country (Fixed to South Africa) */}
            <div className="md:col-span-5 bg-slate-900/90 p-4 rounded-2xl border border-blue-500/40">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>1. Document Origin</span>
                <span className="text-[10px] text-blue-400 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-800">South Africa</span>
              </label>

              <div className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-bold flex items-center justify-between shadow-xs">
                <span className="flex items-center gap-2">
                  <span className="text-xl">🇿🇦</span> South Africa (ZA)
                </span>
                <span className="text-[11px] bg-slate-700 text-slate-300 font-normal px-2 py-0.5 rounded-md">Hague Member</span>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> High Court / DIRCO Apostille
                </span>
                <span>Std: ~5 days</span>
              </div>
            </div>

            {/* Arrow Indicator */}
            <div className="md:col-span-2 flex flex-col items-center justify-center py-1 text-center">
              <div className="w-11 h-11 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-xs shadow-inner">
                <ArrowRight className="w-5 h-5 md:rotate-0 rotate-90" />
              </div>
            </div>

            {/* Destination Country Selection (Worldwide) */}
            <div className="md:col-span-5 bg-slate-900/90 p-4 rounded-2xl border border-slate-700/80 hover:border-slate-600 transition-colors">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>2. Destination Country</span>
                <span className="text-[10px] text-slate-400 font-normal">Any Country Worldwide</span>
              </label>

              <div className="relative">
                <select
                  value={destCode}
                  onChange={(e) => setDestCode(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none pr-8 shadow-xs"
                >
                  {COUNTRIES.filter(c => c.code !== 'ZA').map((c) => (
                    <option key={`dest-${c.code}`} value={c.code} className="bg-slate-900 text-white">
                      {c.flag} {c.name} {c.hagueMember ? '(Hague Apostille)' : '(Non-Hague Embassy)'}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3.5 top-3.5 text-slate-400 text-xs">▼</div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  {destCountry.hagueMember ? (
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hague Member
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Embassy Attestation Required
                    </span>
                  )}
                </span>
                <span>Proc: ~{destCountry.standardProcessingDays} days</span>
              </div>
            </div>

          </div>

          {/* Quick Popular Pairs Chips */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Popular Visa &amp; Legalisation Routes:</span>
            {popularPairs.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => setDestCode(pair.dest)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  destCode === pair.dest
                    ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-sm shadow-blue-500/25'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {pair.label}
              </button>
            ))}
          </div>

        </div>

        {/* Live Requirement Output Card */}
        <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">{originCountry.flag}</span>
                <span className="text-xl sm:text-2xl font-bold text-white">{originCountry.name}</span>
                <ArrowRight className="w-5 h-5 text-blue-400" />
                <span className="text-2xl sm:text-3xl">{destCountry.flag}</span>
                <span className="text-xl sm:text-2xl font-bold text-white">{destCountry.name}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                {requirement.isHagueToHague ? (
                  <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 font-semibold px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> HAGUE APOSTILLE VALID (DIRCO / HIGH COURT)
                  </span>
                ) : (
                  <span className="bg-amber-950/80 text-amber-300 border border-amber-800/80 font-semibold px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                    <Building2 className="w-4 h-4 text-amber-400" /> EMBASSY ATTESTATION REQUIRED (PRETORIA)
                  </span>
                )}

                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Est. Turnaround: ~{requirement.totalEstimatedDaysStandard} business days
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onStartInquiry(destCode)}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 group hover:scale-[1.02]"
              >
                <FileCheck2 className="w-4 h-4 text-blue-200" />
                <span>Start Visa / Attestation Inquiry</span>
              </button>
            </div>
          </div>

          {/* Procedure Steps Visual Breakdown */}
          <div className="mt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Required Visa &amp; Legalisation Procedure Steps:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {requirement.primarySteps.map((step) => (
                <div key={step.stepNumber} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 relative hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs font-extrabold flex items-center justify-center shadow-xs">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">~{step.estimatedDays} days</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 leading-snug">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{step.description}</p>
                  <p className="mt-2 text-[10px] text-blue-400 font-semibold truncate">{step.authority}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notes & Special Instructions */}
          {requirement.notes && requirement.notes.length > 0 && (
            <div className="mt-6 bg-amber-950/40 rounded-2xl p-4 border border-amber-800/60 text-xs text-amber-200 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-300">Important Advisory Notice:</span>
                {requirement.notes.map((note, idx) => (
                  <p key={idx} className="text-amber-200/90 text-[11px]">• {note}</p>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
