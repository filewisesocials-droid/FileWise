import React from 'react';
import { ShieldCheck, Building2, FileCheck, Languages, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesOverviewProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onSelectService }) => {
  const services = [
    {
      icon: ShieldCheck,
      title: 'Hague Convention Apostille',
      tag: '120+ Hague Treaty States',
      description: 'Direct government legalization stamp issued by Foreign Ministry (FCDO UK, US Dept of State, DFAT Australia) for Hague member nations without embassy seal.',
      features: ['Official Government Certificate', 'Valid indefinitely overseas', 'Express 24h option available']
    },
    {
      icon: Building2,
      title: 'Consular Embassy Attestation',
      tag: 'Non-Hague Nations (UAE, Qatar, China, Vietnam)',
      description: 'Comprehensive 3-tier consular authentication sequence: Notary Public ➔ Ministry of Foreign Affairs ➔ Destination Embassy Consular Seal.',
      features: ['Diplomatic Consular Seal', 'MOFA compliance guaranteed', 'Physical embassy submission']
    },
    {
      icon: FileCheck,
      title: 'Notary Public & Solicitor Verification',
      tag: 'Legal Verification',
      description: 'Certification of original documents or notarised true copy verification by registered UK/US Law Society solicitors and notary publics.',
      features: ['Solicitor wet-ink seal', 'Registrar degree verification', 'Certified True Copy stamp']
    },
    {
      icon: Languages,
      title: 'Sworn & Certified Translations',
      tag: 'Official Court Translators',
      description: 'Official sworn translations into Arabic, Spanish, French, German, Chinese, Portuguese, Italian, and 40+ languages accepted by foreign ministries.',
      features: ['Sworn translator stamp (Traductor Jurado)', 'Certificate of Accuracy', 'Direct embassy submission formatting']
    },
    {
      icon: Truck,
      title: 'Global Express Courier Delivery',
      tag: 'DHL / FedEx Priority',
      description: 'Secure tracked door-to-door courier delivery from our secure London/Washington legal vaults directly to your residence or employer overseas.',
      features: ['Full insurance cover', 'Live GPS tracking', 'Tamper-evident tamper bags']
    }
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            End-to-End Legalisation Suite
          </span>
          <h2 className="text-3xl font-extrabold font-sans text-slate-900 mt-3">
            Our Document Attestation & Consular Services
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Providing legal verification for personal, academic, legal, and corporate documents worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded-md border border-blue-100">
                    {s.tag}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2 font-sans group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {s.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                    {s.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectService(s.title)}
                  className="w-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold py-2.5 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Select & Get Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
