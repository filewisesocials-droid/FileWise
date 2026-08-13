import React from 'react';
import { ShieldCheck, Building2, FileCheck, Languages, Truck, CheckCircle2, ArrowRight, PlaneTakeoff, Stamp } from 'lucide-react';

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
    <section className="py-16 sm:py-20 bg-slate-100 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-200 px-3.5 py-1.5 rounded shadow-2xs">
            <Stamp className="w-3.5 h-3.5 text-amber-700" />
            <span>South African Consular &amp; Visa Advisory Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Our Core Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Providing outbound visa assistance and legal document processing within South Africa for personal, academic, and commercial documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-amber-400 rounded-xl p-6 sm:p-7 transition-all duration-200 shadow-md hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center mb-4 border border-slate-800 shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 inline-block">
                    {s.tag}
                  </span>

                  <h3 className="text-lg font-serif font-bold text-slate-900 mt-3 mb-2">
                    {s.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-5 font-sans">
                    {s.description}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700 mb-6 border-t border-slate-100 pt-4">
                    {s.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-800">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectService(s.title)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
