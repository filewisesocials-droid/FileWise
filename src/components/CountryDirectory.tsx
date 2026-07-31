import React, { useState, useMemo } from 'react';
import { Search, Globe, ShieldCheck, Building2, CheckCircle2, Clock, DollarSign, ChevronRight, X, Sparkles, Filter, FileText } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { Country } from '../types';
import { calculateRequirement } from '../data/documents';

interface CountryDirectoryProps {
  onSelectCountryForQuote?: (originCode: string) => void;
  onAskAiForCountry?: (countryName: string) => void;
}

export const CountryDirectory: React.FC<CountryDirectoryProps> = ({ onSelectCountryForQuote, onAskAiForCountry }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [hagueFilter, setHagueFilter] = useState<'ALL' | 'HAGUE' | 'NON_HAGUE'>('ALL');
  const [selectedCountryDetail, setSelectedCountryDetail] = useState<Country | null>(null);

  const filteredCountries = useMemo(() => {
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
  }, [searchTerm, selectedRegion, hagueFilter]);

  const regions = ['ALL', 'Europe', 'Americas', 'Asia', 'Middle East', 'Africa', 'Oceania'];

  return (
    <section className="py-12 bg-slate-950 text-white min-h-[700px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-800 text-amber-400 text-xs px-3 py-1 rounded-full font-medium mb-2 border border-slate-700">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Country Requirements Database</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Search Countries & Legalisation Protocols
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select any issuing or receiving nation to inspect Hague membership, embassy procedures, turnarounds, and fees.
            </p>
          </div>

          <div className="text-right text-xs text-slate-400">
            <span>Showing <strong className="text-amber-400 font-mono">{filteredCountries.length}</strong> of {COUNTRIES.length} countries</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-lg mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search country name or code (e.g. UK, Spain, UAE, Qatar, China)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-400 placeholder-slate-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Hague Convention Filter */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-700 text-xs">
              <button
                onClick={() => setHagueFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  hagueFilter === 'ALL' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setHagueFilter('HAGUE')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  hagueFilter === 'HAGUE' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Hague Apostille Only
              </button>
              <button
                onClick={() => setHagueFilter('NON_HAGUE')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  hagueFilter === 'NON_HAGUE' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Embassy Legalisation Only
              </button>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-800 pt-3 scrollbar-none">
            <span className="text-slate-500 font-medium mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Region:
            </span>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-slate-800 text-amber-400 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-950'
                }`}
              >
                {region === 'ALL' ? 'All Regions' : region}
              </button>
            ))}
          </div>

        </div>

        {/* Country Cards Grid */}
        {filteredCountries.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            <Globe className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No countries match your search query</h3>
            <p className="text-sm text-slate-400">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedRegion('ALL'); setHagueFilter('ALL'); }}
              className="mt-4 bg-amber-500 text-slate-950 text-xs font-bold px-4 py-2 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCountries.map((c) => (
              <div
                key={c.code}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 transition-all shadow-md hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-1.5 bg-slate-950 rounded-xl border border-slate-800">{c.flag}</span>
                      <div>
                        <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                          {c.name}
                        </h3>
                        <span className="text-xs text-slate-400 font-mono">{c.region} • Code: {c.code}</span>
                      </div>
                    </div>

                    {c.hagueMember ? (
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1 shrink-0">
                        <ShieldCheck className="w-3 h-3" /> HAGUE MEMBER
                      </span>
                    ) : (
                      <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1 shrink-0">
                        <Building2 className="w-3 h-3" /> EMBASSY ATTESTATION
                      </span>
                    )}
                  </div>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80 my-3">
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase">Standard Days</span>
                      <span className="font-medium text-slate-200 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-amber-400" /> ~{c.standardProcessingDays} business days
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase">Est. Base Fee</span>
                      <span className="font-medium text-amber-400 flex items-center gap-1 mt-0.5 font-mono">
                        R${(c.hagueMember ? c.apostilleFeeZAR : c.embassyAttestationFeeZAR).toLocaleString()} ZAR
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1 text-xs text-slate-400 mb-4">
                    <p className="line-clamp-2">
                      <strong className="text-slate-300 font-semibold">Step 1:</strong> {c.recommendedSteps[0]}
                    </p>
                    {c.hagueYear && (
                      <p className="text-[11px] text-slate-500">
                        Hague Treaty Member since {c.hagueYear}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCountryDetail(c)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Requirements</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {onAskAiForCountry && (
                      <button
                        onClick={() => onAskAiForCountry(c.name)}
                        className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Ask AI about this country"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    )}

                    {onSelectCountryForQuote && (
                      <button
                        onClick={() => onSelectCountryForQuote(c.code)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Get Quote
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Country Detail Modal */}
      {selectedCountryDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 text-white relative shadow-2xl">
            
            <button
              onClick={() => setSelectedCountryDetail(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedCountryDetail.flag}</span>
              <div>
                <h3 className="text-2xl font-bold font-serif">{selectedCountryDetail.name}</h3>
                <p className="text-xs text-slate-400">{selectedCountryDetail.region} • ISO Code: {selectedCountryDetail.code}</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Status Banner */}
              <div className={`p-4 rounded-xl border text-xs font-medium ${
                selectedCountryDetail.hagueMember
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}>
                <div className="font-bold text-sm mb-1 flex items-center gap-2">
                  {selectedCountryDetail.hagueMember ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>1961 Hague Apostille Convention Member</span>
                    </>
                  ) : (
                    <>
                      <Building2 className="w-4 h-4" />
                      <span>Full Diplomatic Embassy Legalisation Required</span>
                    </>
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedCountryDetail.hagueMember
                    ? `Documents from ${selectedCountryDetail.name} receive an official Hague Apostille certificate from competent government authorities and are legally recognized in all 120+ Hague member states without embassy seals.`
                    : `${selectedCountryDetail.name} is not a party to the Hague Apostille Convention. All documents require notary certification, state ministry authentication, and Embassy consular legalization.`}
                </p>
              </div>

              {/* Recommended Steps */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Standard Legalisation Procedure Steps:</span>
                </h4>
                <ol className="space-y-2 text-xs text-slate-300">
                  {selectedCountryDetail.recommendedSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Special Instructions if any */}
              {selectedCountryDetail.specialRequirements && selectedCountryDetail.specialRequirements.length > 0 && (
                <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 space-y-1">
                  <strong className="block text-amber-400 font-bold mb-1">Country-Specific Rules:</strong>
                  {selectedCountryDetail.specialRequirements.map((req, idx) => (
                    <p key={idx}>• {req}</p>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                {onAskAiForCountry && (
                  <button
                    onClick={() => {
                      const name = selectedCountryDetail.name;
                      setSelectedCountryDetail(null);
                      onAskAiForCountry(name);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-700 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" /> Ask AI Specialist
                  </button>
                )}

                {onSelectCountryForQuote && (
                  <button
                    onClick={() => {
                      const code = selectedCountryDetail.code;
                      setSelectedCountryDetail(null);
                      onSelectCountryForQuote(code);
                    }}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg"
                  >
                    Start Order Quote
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
