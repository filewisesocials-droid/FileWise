import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'Which countries do you assist with for visas and document legalisation?',
      a: 'FileWise assists with document legalisation (via DIRCO Pretoria or High Courts) and visa document preparation for destination countries around the world including the UK, UAE, USA, Europe, Qatar, Saudi Arabia, China, and 120+ nations worldwide.'
    },
    {
      q: 'How does DIRCO Apostille and High Court legalisation work in South Africa?',
      a: 'South Africa is a member of the 1961 Hague Apostille Convention. Public documents issued in South Africa (such as Home Affairs Birth/Marriage certificates, SAPS Police Clearance, or High Court documents) receive a DIRCO or High Court Apostille stamp. If your destination country is also a Hague member (e.g., UK, Spain, Germany), no embassy attestation is required. If the destination country is non-Hague (e.g., UAE, Qatar, Kuwait), full embassy attestation in Pretoria is required following DIRCO legalisation.'
    },
    {
      q: 'What is the difference between an Apostille and Embassy Legalisation?',
      a: 'An Apostille is an official authentication stamp issued under the 1961 Hague Convention. If both South Africa and the destination country are Hague members (e.g., South Africa to Spain, UK, or Germany), only a single Apostille is needed. If the destination country is NOT a Hague member (e.g., South Africa to UAE, Qatar, or Kuwait), full Embassy Legalisation in Pretoria is required (SA Notary ➔ High Court / DIRCO ➔ Foreign Embassy Seal).'
    },
    {
      q: 'Do I need to send original documents or can digital scans be apostilled?',
      a: 'Home Affairs certificates and SAPS Police Clearances generally require physical original documents or official DIRCO-verified copies. Academic degrees and commercial documents can often be notarised by an SA Notary Public on certified true copies.'
    },
    {
      q: 'How long does document legalisation in South Africa take?',
      a: 'DIRCO standard processing typically takes 5 to 10 business days. High Court Apostilles can be completed in 24 to 48 hours. Embassy attestation for non-Hague nations (such as UAE, Qatar, or Saudi Arabia in Pretoria) typically takes 5-8 business days.'
    },
    {
      q: 'Can Filewise handle sworn translations into Arabic, Spanish, French, or German?',
      a: 'Yes! We work directly with Sworn Translators registered with the High Court of South Africa. Official sworn court translations are provided with an official stamp and Certificate of Accuracy accepted by foreign embassies.'
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold font-sans text-slate-900 mt-3">
            Document Legalisation Knowledge Base
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Clear answers on Hague Apostilles, Notary Public requirements, and consular attestation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1 pt-3">
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
