import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'Do you assist with visa applications from South Africa?',
      a: 'Yes! Outbound visa assistance for South Africans traveling abroad is our primary core service. We guide applicants on passport requirements, consular forms, appointment scheduling, and supporting document compilation for travel to the UK, Schengen states, UAE, USA, Qatar, Saudi Arabia, Australia, and nations worldwide.'
    },
    {
      q: 'Where are document legalisations and attestations processed?',
      a: 'All document legalisation, DIRCO Hague Apostilles, SA High Court authentications, and foreign embassy attestations are processed locally in Pretoria, South Africa. We do not process document legalisation for foreign documents outside of South Africa.'
    },
    {
      q: 'What is the difference between a Hague Apostille and Embassy Attestation?',
      a: 'If your destination country is a Hague Convention member state (e.g. South Africa to Spain, UK, Germany, or USA), your SA document requires a single DIRCO or High Court Hague Apostille. If the destination country is NOT a Hague member (e.g. South Africa to UAE, Qatar, Kuwait, or Saudi Arabia), full diplomatic embassy attestation in Pretoria is required.'
    },
    {
      q: 'Do I need original documents or can digital copies be processed?',
      a: 'Official Home Affairs certificates (birth, marriage) and SAPS Police Clearances require original physical certificates or DIRCO-verified copies. Academic degrees and corporate contracts can frequently be certified by an SA Notary Public on verified copies.'
    },
    {
      q: 'How long does DIRCO or embassy attestation in Pretoria take?',
      a: 'DIRCO Hague Apostille processing in Pretoria typically takes 5 to 10 business days. High Court Apostilles can be authenticated in 24 to 48 hours. Embassy attestations at Pretoria foreign missions (UAE, Qatar, Saudi Arabia) take approximately 5 to 12 business days.'
    },
    {
      q: 'Can FileWise arrange SA High Court Sworn Translations?',
      a: 'Yes. We work directly with official Sworn Translators registered with the High Court of South Africa for translation into English, Arabic, Spanish, French, German, and Portuguese, complete with official court stamps and Certificates of Accuracy.'
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded border border-amber-200">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mt-3">
            Visa &amp; Legalisation Knowledge Base
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Clear guidelines on outbound visas, DIRCO Hague Apostilles, and Pretoria diplomatic attestations.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-slate-900 hover:text-amber-800 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 mt-1 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
