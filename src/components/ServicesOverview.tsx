import React from 'react';
import { ShieldCheck, Building2, FileCheck, Languages, Truck, CheckCircle2, ArrowRight, PlaneTakeoff, Stamp } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesOverviewProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onSelectService }) => {
  const services = [
    {
      icon: PlaneTakeoff,
      title: 'Outbound Visa Assistance',
      tag: 'From SA to Foreign Destinations',
      description: 'Consular visa document preparation, form verification, and appointment guidance for South Africans traveling, working, studying, or moving abroad.',
      features: ['Consular application preparation', 'Embassy appointment scheduling guidance', 'Verification of supporting financial & travel records']
    },
    {
      icon: ShieldCheck,
      title: 'DIRCO Hague Apostille (Pretoria)',
      tag: 'Executed in South Africa',
      description: 'Official Hague Convention Apostille legalisation issued directly by DIRCO (Pretoria) or SA High Courts for South African documents used in Hague member nations.',
      features: ['DIRCO Pretoria official Apostille seal', 'Valid across 120+ Hague member states', 'Express Pretoria hand-delivery submission']
    },
    {
      icon: Building2,
      title: 'Pretoria Embassy Attestation',
      tag: 'Executed in South Africa',
      description: 'Full consular legalisation sequence for Non-Hague destination countries: SA Notary / High Court ➔ DIRCO Legalisation ➔ Foreign Embassy Attestation in Pretoria.',
      features: ['Foreign Embassy stamps in Pretoria (UAE, Qatar, Saudi Arabia, etc.)', 'DIRCO & High Court pre-authentication', 'In-person embassy submission in Pretoria']
    },
    {
      icon: FileCheck,
      title: 'Notary Public & High Court Authentication',
      tag: 'Executed in South Africa',
      description: 'Notarial authentication of South African birth/marriage certificates, university degrees, SAPS police clearance, and commercial records by registered SA Notaries.',
      features: ['SA Notary Public wet-ink seal', 'Registrar degree verification', 'Certified True Copy verification']
    },
    {
      icon: Languages,
      title: 'High Court Sworn Translations',
      tag: 'Executed in South Africa',
      description: 'Certified sworn translations into Arabic, Spanish, French, German, Chinese, Portuguese, Italian, and 40+ languages accepted by foreign embassies.',
      features: ['Sworn High Court translator stamp & signature', 'Official Certificate of Accuracy', 'Direct embassy format compliance']
    },
    {
      icon: Truck,
      title: 'Door-to-Door Priority Courier',
      tag: 'Nationwide SA Collection',
      description: 'Secure door-to-door courier collection anywhere in South Africa (JHB, CPT, DUR, PTA) and priority delivery directly to your home or overseas destination.',
      features: ['Collection across all SA provinces', 'Global express delivery via DHL/FedEx', 'Live tracking update notifications']
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#f8f5ee] text-[#2b241d] border-b-2 border-[#c8a46b]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7a5418] bg-[#f4ecd9] border border-[#c8a46b]/50 px-3.5 py-1.5 rounded-full shadow-2xs">
            <Stamp className="w-3.5 h-3.5 text-[#b48332]" />
            <span>South African Consular &amp; Visa Advisory Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2b241d] tracking-tight">
            Our Core Services
          </h2>
          <p className="text-[#5c5044] text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Providing outbound visa assistance and legal document processing within South Africa for personal, academic, and commercial documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332] rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f4ecd9] text-[#9e7127] flex items-center justify-center mb-4 border-2 border-[#c8a46b]/50 shadow-2xs group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6 text-[#b48332]" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a5418] bg-[#fbf5eb] px-2.5 py-1 rounded-full border border-[#c8a46b]/40 inline-block">
                    {s.tag}
                  </span>

                  <h3 className="text-lg font-serif font-bold text-[#2b241d] mt-3 mb-2 group-hover:text-[#9e7127] transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-[#5c5044] text-xs leading-relaxed mb-5 font-sans">
                    {s.description}
                  </p>

                  <ul className="space-y-2 text-xs text-[#5c5044] mb-6 border-t border-[#ebdcc4] pt-4">
                    {s.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2e7d32] shrink-0 mt-0.5" />
                        <span className="font-medium text-[#2b241d]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectService(s.title)}
                  className="w-full bg-[#b48332] hover:bg-[#9f7228] text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs border border-[#9a6d23]"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-100" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
