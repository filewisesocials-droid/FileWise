import React from 'react';
import { ShieldCheck, Building2, FileCheck, Languages, Truck, CheckCircle2, ArrowRight, PlaneTakeoff, Sparkles } from 'lucide-react';

interface ServicesOverviewProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onSelectService }) => {
  const services = [
    {
      icon: PlaneTakeoff,
      title: 'Visa Assistance & Preparation',
      tag: 'From South Africa to Any Country',
      description: 'Comprehensive visa document preparation and legalisation for South Africans travelling, working, studying, or emigrating abroad.',
      features: ['Consular visa document packing', 'Embassy appointment guidance', 'Verification of support records']
    },
    {
      icon: ShieldCheck,
      title: 'DIRCO & High Court Apostille',
      tag: 'South Africa Hague Apostille',
      description: 'Official Hague Convention Apostille legalisation issued directly by DIRCO (Pretoria) or South African High Courts for use in 120+ Hague member nations.',
      features: ['DIRCO Pretoria & High Court seals', 'Valid across Hague member states', 'Express courier submission']
    },
    {
      icon: Building2,
      title: 'Embassy Attestation (Non-Hague)',
      tag: 'UAE, Qatar, Saudi Arabia, China & More',
      description: 'Full consular legalization sequence for Non-Hague destination countries: SA Notary / High Court ➔ DIRCO Legalisation ➔ Foreign Embassy Attestation in Pretoria.',
      features: ['Foreign Embassy Pretoria stamps', 'MOFA compliance assured', 'Physical embassy liaison']
    },
    {
      icon: FileCheck,
      title: 'Notary Public & High Court Verification',
      tag: 'SA Legal Verification',
      description: 'Notarial authentication of South African birth/marriage certificates, degrees, police clearances (SAPS), and corporate contracts by registered SA Notaries Public.',
      features: ['SA Notary Public wet-ink seal', 'Registrar degree verification', 'Certified True Copy verification']
    },
    {
      icon: Languages,
      title: 'Sworn Court Translations',
      tag: 'Sworn Translators of SA High Court',
      description: 'Official sworn translations into Arabic, Spanish, French, German, Chinese, Portuguese, Italian, and 40+ languages accepted by international embassies.',
      features: ['Sworn High Court translator seal', 'Certificate of Accuracy', 'Direct embassy formatting']
    },
    {
      icon: Truck,
      title: 'Door-to-Door Express Courier',
      tag: 'DHL / FedEx Priority Courier',
      description: 'Secure tracked door-to-door courier collection anywhere in South Africa (JHB, CPT, DUR, PTA) and priority delivery directly to your overseas destination.',
      features: ['Collection across SA', 'Global express delivery', 'Live GPS tracking']
    }
  ];

  return (
    <section className="py-20 bg-slate-50/80 text-slate-900 border-b border-slate-200 relative overflow-hidden bg-mesh-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-100/70 border border-blue-200 px-3.5 py-1.5 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>South Africa Legalisation Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-slate-950 tracking-tight">
            Visa &amp; Document Attestation Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Providing legal verification and visa support for South African personal, academic, and commercial documents worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-blue-300 rounded-3xl p-7 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-all pointer-events-none" />

                <div>
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/80 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60 inline-block">
                    {s.tag}
                  </span>

                  <h3 className="text-lg font-bold text-slate-950 mt-3 mb-2 font-sans group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-5">
                    {s.description}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700 mb-6 border-t border-slate-100 pt-4">
                    {s.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium text-slate-700">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectService(s.title)}
                  className="w-full bg-slate-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white text-slate-900 hover:border-blue-600 text-xs font-extrabold py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-2xs group-hover:shadow-md"
                >
                  <span>Inquire About Service</span>
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

