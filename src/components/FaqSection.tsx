import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'What is the difference between an Apostille and Embassy Legalisation?',
      a: 'An Apostille is an official authentication stamp issued under the 1961 Hague Convention. If both the country issuing the document and the destination country are Hague members (e.g., UK to Spain, US to Germany, Canada to France), only a single Apostille is needed. If either country is NOT a Hague member (e.g., UK to UAE, US to Qatar, India to Kuwait), full Embassy Legalisation is required (Notary ➔ Foreign Ministry ➔ Embassy Seal).'
    },
    {
      q: 'Do I need to send original documents or can digital scans be apostilled?',
      a: 'This depends on the document type. Vital records (Birth, Marriage, Death certificates) must generally be original certified copies issued by the Registrar. Academic degrees and commercial contracts can frequently be legalised on solicitor-certified true copies without sending the original parchment.'
    },
    {
      q: 'How long does document legalisation take?',
      a: 'Standard processing for a Hague Apostille takes 4-6 business days. Express service takes 24-48 hours. Embassy attestation for non-Hague nations (such as UAE, Qatar, Saudi Arabia, or China) typically takes 7-10 business days due to embassy appointment backlogs.'
    },
    {
      q: 'Will my legalised document ever expire?',
      a: 'An Apostille stamp itself does not have an expiration date. However, certain foreign authorities (especially for work visas or police clearance checks in Middle Eastern or Asian countries) may require police records or medical certificates to be legalised within 3 to 6 months of issuance.'
    },
    {
      q: 'Can Filewise handle sworn translations into Arabic, Spanish, or Chinese?',
      a: 'Yes! We provide official Sworn and Certified Translations by registered legal translators. In many countries (such as Spain or UAE), translations must be completed by a sworn court translator (Traductor Jurado) to be valid.'
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
