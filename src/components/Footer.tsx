import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Globe, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-lg text-white font-sans tracking-tight">FILEWISE</span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            Global Document Legalisation, Hague Apostille Verification, Sworn Translation, and Consular Attestation Services worldwide.
          </p>

          <div className="pt-2 text-[11px] text-blue-400 font-semibold">
            100% Guaranteed Acceptance at Embassies Worldwide
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Legalisation Portals</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveTab('search')} className="hover:text-blue-400 transition-colors">
                Country Search Directory
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('calculator')} className="hover:text-blue-400 transition-colors">
                Instant Cost Calculator
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('ai')} className="hover:text-blue-400 transition-colors">
                AI Legalisation Advisor
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('tracking')} className="hover:text-blue-400 transition-colors">
                Track Application Status
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">
                Embassies & Notary Services
              </button>
            </li>
          </ul>
        </div>

        {/* Top Routes */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Popular Attestation Routes</h4>
          <ul className="space-y-2 text-slate-400">
            <li>UK to UAE Embassy Attestation</li>
            <li>US to Spain Hague Apostille</li>
            <li>Canada to China Legalization</li>
            <li>India to Qatar Degree Attestation</li>
            <li>Australia to Saudi Arabia Apostille</li>
            <li>UK to Germany Legalisation</li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Consular Support Hub</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Legal Processing Centre, London EC2A 4NE, UK</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>attestation@filewise-legalisation.ai.studio</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+44 20 7946 0912 / +1 800 555 0199</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 border-t border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Filewise Document Legalisation Ltd. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Consular Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Hague Convention Security Compliance</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
