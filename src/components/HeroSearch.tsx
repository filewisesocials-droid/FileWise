import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, ShieldCheck, FileCheck2, Globe, Sparkles, Clock, AlertTriangle, CheckCircle2, Building2, HelpCircle } from 'lucide-react';
import { COUNTRIES, getCountryByCode } from '../data/countries';
import { calculateRequirement, DOCUMENT_TYPES } from '../data/documents';
import { Country } from '../types';

interface HeroSearchProps {
  onSelectPair: (originCode: string, destCode: string) => void;
  onStartQuote: (originCode: string, destCode: string) => void;
  onAskAi: (originCode: string, destCode: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSelectPair, onStartQuote, onAskAi }) => {
  const [originCode, setOriginCode] = useState('GB');
  const [destCode, setDestCode] = useState('AE');
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('ALL');

  const originCountry = useMemo(() => getCountryByCode(originCode), [originCode]);
  const destCountry = useMemo(() => getCountryByCode(destCode), [destCode]);

  const requirement = useMemo(
    () => calculateRequirement(originCountry, destCountry),
    [originCountry, destCountry]
  );

  const popularPairs = [
    { origin: 'GB', dest: 'AE', label: 'UK to UAE (Work/Visa)' },
    { origin: 'US', dest: 'ES', label: 'US to Spain (Non-Lucrative Visa)' },
    { origin: 'CA', dest: 'CN', label: 'Canada to China (Work)' },
    { origin: 'IN', dest: 'QA', label: 'India to Qatar (Attestation)' },
    { origin: 'AU', dest: 'SA', label: 'Australia to Saudi Arabia' },
    { origin: 'GB', dest: 'DE', label: 'UK to Germany (Hague Apostille)' }
  ];

  return (
    <div className="relative bg-slate-50 text-slate-900 overflow-hidden py-12 md:py-20 border-b border-slate-200">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Global Document Legalisation & Country Requirement Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-sans leading-tight">
            Document Legalisation <br className="hidden sm:inline" /><span className="text-blue-600">Made Simple.</span>
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Search 150+ origin and destination countries. Instantly verify Hague Apostille status, embassy attestation workflows, fees, and standard turnaround times.
          </p>
        </div>

        {/* Search Control Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Origin Country Selection */}
            <div className="md:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>1. Where was document issued?</span>
                <span className="text-[10px] text-slate-400 font-normal">Origin Country</span>
              </label>

              <div className="relative">
                <select
                  value={originCode}
                  onChange={(e) => setOriginCode(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-3.5 py-2.5 text-sm sm:text-base font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none pr-8 shadow-sm"
                >
                  {COUNTRIES.map((c) => (
                    <option key={`origin-${c.code}`} value={c.code}>
                      {c.flag} {c.name} {c.hagueMember ? '(Hague)' : '(Non-Hague)'}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-3.5 text-slate-400 text-xs">▼</div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  {originCountry.hagueMember ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hague Member
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Embassy Legalisation
                    </span>
                  )}
                </span>
                <span>Std: {originCountry.standardProcessingDays} days</span>
              </div>
            </div>

            {/* Swap Arrow */}
            <div className="md:col-span-2 flex justify-center py-1">
              <button
                type="button"
                onClick={() => {
                  const temp = originCode;
                  setOriginCode(destCode);
                  setDestCode(temp);
                }}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 transition-all flex items-center justify-center shadow border border-slate-200"
                title="Swap origin and destination"
              >
                <ArrowRight className="w-5 h-5 md:rotate-0 rotate-90" />
              </button>
            </div>

            {/* Destination Country Selection */}
            <div className="md:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>2. Where will it be used?</span>
                <span className="text-[10px] text-slate-400 font-normal">Destination Country</span>
              </label>

              <div className="relative">
                <select
                  value={destCode}
                  onChange={(e) => setDestCode(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-lg px-3.5 py-2.5 text-sm sm:text-base font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none pr-8 shadow-sm"
                >
                  {COUNTRIES.map((c) => (
                    <option key={`dest-${c.code}`} value={c.code}>
                      {c.flag} {c.name} {c.hagueMember ? '(Hague)' : '(Non-Hague)'}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-3.5 text-slate-400 text-xs">▼</div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  {destCountry.hagueMember ? (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hague Member
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Embassy Legalisation
                    </span>
                  )}
                </span>
                <span>Embassy Fee: ~R${destCountry.embassyAttestationFeeZAR} ZAR</span>
              </div>
            </div>

          </div>

          {/* Quick Popular Pairs Chips */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Popular routes:</span>
            {popularPairs.map((pair, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setOriginCode(pair.origin);
                  setDestCode(pair.dest);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  originCode === pair.origin && destCode === pair.dest
                    ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {pair.label}
              </button>
            ))}
          </div>

        </div>

        {/* Live Requirement Output Card */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 max-w-4xl mx-auto shadow-lg">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{originCountry.flag}</span>
                <span className="text-xl font-bold text-slate-900">{originCountry.name}</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
                <span className="text-2xl">{destCountry.flag}</span>
                <span className="text-xl font-bold text-slate-900">{destCountry.name}</span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                {requirement.isHagueToHague ? (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> HAGUE APOSTILLE VALID (1-STEP)
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-800 border border-amber-200 font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-amber-600" /> FULL CONSULAR EMBASSY LEGALISATION REQUIRED
                  </span>
                )}

                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> Standard: ~{requirement.totalEstimatedDaysStandard} business days
                </span>
                <span className="text-slate-600 font-mono font-semibold">
                  Est. Base Fee: R${requirement.totalEstimatedFeeZAR.toLocaleString()} ZAR
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onStartQuote(originCode, destCode)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200 flex items-center gap-1.5"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Calculate Precise Quote</span>
              </button>

              <button
                onClick={() => onAskAi(originCode, destCode)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Procedure Steps Visual Breakdown */}
          <div className="mt-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Required Legalisation Procedure Steps:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {requirement.primarySteps.map((step) => (
                <div key={step.stepNumber} className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">~{step.estimatedDays} days</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1 leading-snug">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{step.description}</p>
                  <p className="mt-2 text-[10px] text-blue-600 font-semibold truncate">{step.authority}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notes & Special Instructions */}
          {requirement.notes && requirement.notes.length > 0 && (
            <div className="mt-5 bg-amber-50/70 rounded-xl p-3.5 border border-amber-200 text-xs text-slate-700 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-amber-900">Important Advisory Notice:</span>
                {requirement.notes.map((note, idx) => (
                  <p key={idx} className="text-slate-700 text-[11px]">• {note}</p>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
