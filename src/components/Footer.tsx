import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
              <img 
                src="/logo.svg" 
                alt="FileWise Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.jpg';
                }}
              />
            </div>
            <span className="font-extrabold text-lg text-white font-sans tracking-tight">FILEWISE</span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            South Africa Document Legalisation, DIRCO Hague Apostille, Sworn Translation, and Foreign Embassy Attestation Services.
          </p>
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
              <button onClick={() => setActiveTab('inquiry')} className="hover:text-blue-400 transition-colors">
                Submit Legalisation Inquiry
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('tracking')} className="hover:text-blue-400 transition-colors">
                Track Application Status
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('services')} className="hover:text-blue-400 transition-colors">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-blue-400 transition-colors">
                About FileWise
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-blue-400 transition-colors">
                Contact Us
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('terms')} className="hover:text-blue-400 transition-colors">
                Terms &amp; Conditions
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('faq')} className="hover:text-blue-400 transition-colors">
                Frequently Asked Questions
              </button>
            </li>
          </ul>
        </div>

        {/* Top South Africa International Routes */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Popular International Routes</h4>
          <ul className="space-y-2 text-slate-400">
            <li>SA to UAE Embassy Attestation</li>
            <li>SA to Spain Hague Apostille</li>
            <li>SA to Qatar Degree Legalisation</li>
            <li>SA to China Consular Verification</li>
            <li>SA to Saudi Arabia Attestation</li>
            <li>SA to UK Apostille &amp; Visa Documents</li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">South Africa Hub</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Legal Processing Hub, South Africa</span>
            </div>
            <a href="mailto:info@filewise.co.za" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>info@filewise.co.za</span>
            </a>
            <a href="https://api.whatsapp.com/send?phone=27502154465&text=Hello%20FileWise%20Legalisation%20Team%2C%20I%20have%20an%20inquiry." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+27 50 215 4465</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-950 border-t border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Filewise Legalisation Solutions. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-400 transition-colors">About Us</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-slate-400 transition-colors">Contact Us</button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-slate-400 transition-colors">Terms &amp; Conditions</button>
            <span className="hover:text-slate-400 cursor-pointer">Hague Convention Security Compliance</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
