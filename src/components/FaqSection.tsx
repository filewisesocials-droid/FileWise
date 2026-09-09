import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
    <section className="py-16 bg-[#faf8f5] text-[#2b241d] border-b-2 border-[#c8a46b]/30 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7a5418] bg-[#f4ecd9] px-3.5 py-1.5 rounded-full border border-[#c8a46b]/50 shadow-2xs inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2b241d] mt-3">
            Visa &amp; Legalisation Knowledge Base
          </h2>
          <p className="text-[#5c5044] text-sm mt-2">
            Clear guidelines on outbound visas, DIRCO Hague Apostilles, and Pretoria diplomatic attestations.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`bg-white border-2 rounded-2xl overflow-hidden shadow-2xs transition-all ${
                  isOpen ? 'border-[#b48332] shadow-sm' : 'border-[#c8a46b]/40 hover:border-[#b48332]/70'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#2b241d] hover:text-[#9e7127] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#b48332] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#8c7b6d] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#b48332]' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#5c5044] leading-relaxed font-sans border-t border-[#ebdcc4] pt-3 bg-[#fbf9f5]/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
