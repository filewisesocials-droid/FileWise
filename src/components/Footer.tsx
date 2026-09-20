import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Lock, CreditCard } from 'lucide-react';
import { PayPalLogo } from './PayPalButton';

interface FooterProps {
  setActiveTab: (tab: any) => void;
  onOpenPayment?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPayment }) => {
  return (
    <footer className="bg-[#f8f5ee] text-[#5c5044] text-xs border-t-2 border-[#c8a46b]/40 font-sans">
      
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 shadow-xs flex items-center justify-center shrink-0 border-2 border-[#c8a46b]/60">
              <img 
                src="/favicon-96x96.png" 
                alt="FileWise Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/favicon-32x32.png';
                }}
              />
            </div>
            <span className="font-serif font-extrabold text-lg text-[#2b241d] tracking-tight">FILEWISE</span>
          </div>

          <p className="text-[#5c5044] text-xs leading-relaxed">
            South African Consular &amp; Visa Advisory Agency. Specialist outbound visa assistance and Pretoria document legalisation (DIRCO, High Court &amp; Embassy Attestations).
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-[#2b241d] text-xs uppercase tracking-wider mb-3">Service Portals</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => setActiveTab('search')} className="hover:text-[#9e7127] transition-colors">
                Outbound Visa Countries
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('services')} className="hover:text-[#9e7127] transition-colors">
                SA Document Legalisation
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('inquiry')} className="hover:text-[#9e7127] transition-colors">
                Submit General Inquiry
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('tracking')} className="hover:text-[#9e7127] transition-colors">
                Track Application Status
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-[#9e7127] transition-colors">
                About FileWise
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('contact')} className="hover:text-[#9e7127] transition-colors">
                Contact Us
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('terms')} className="hover:text-[#9e7127] transition-colors">
                Terms &amp; Conditions
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('payments')} 
                className="hover:text-[#9e7127] transition-colors flex items-center gap-1.5 font-bold text-[#b48332]"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Client Payments (EFT &amp; PayPal)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Core Capabilities */}
        <div>
          <h4 className="font-serif font-bold text-[#2b241d] text-xs uppercase tracking-wider mb-3">Core Capabilities</h4>
          <ul className="space-y-2 text-[#5c5044]">
            <li>Outbound Visas (UAE, UK, Spain, Qatar, USA, etc.)</li>
            <li>DIRCO Hague Apostille Certificates (Pretoria)</li>
            <li>Pretoria Foreign Embassy Attestations</li>
            <li>High Court Authentication &amp; Legalisation</li>
            <li>High Court Sworn Translations</li>
            <li>SAPS Police Clearance Verification Support</li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="font-serif font-bold text-[#2b241d] text-xs uppercase tracking-wider mb-3">Pretoria Hub</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#b48332] shrink-0" />
              <span>Legal Processing Operations, Pretoria, SA</span>
            </div>
            <a href="mailto:info@filewise.co.za" className="flex items-center gap-2 text-[#2b241d] hover:text-[#9e7127] transition-colors font-medium">
              <Mail className="w-4 h-4 text-[#b48332] shrink-0" />
              <span>info@filewise.co.za</span>
            </a>
            <a href="https://api.whatsapp.com/send?phone=27502154465&text=Hello%20FileWise%20Team%2C%20I%20have%20an%20inquiry." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#2b241d] hover:text-[#9e7127] transition-colors font-medium">
              <Phone className="w-4 h-4 text-[#b48332] shrink-0" />
              <span>+27 50 215 4465</span>
            </a>
          </div>

          <div className="mt-4 pt-3 border-t border-[#ebdcc4]">
            <h5 className="font-bold text-[#44382e] text-[11px] uppercase tracking-wider mb-2">Follow Us Online</h5>
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1GhTJDMDL7/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook: FileWise"
                className="w-7 h-7 rounded-lg bg-white border border-[#c8a46b]/40 hover:bg-[#b48332] hover:text-white text-[#5c5044] flex items-center justify-center transition-all shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/filewise_za"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram: @filewise_za"
                className="w-7 h-7 rounded-lg bg-white border border-[#c8a46b]/40 hover:bg-[#b48332] hover:text-white text-[#5c5044] flex items-center justify-center transition-all shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@Filewise_ZA"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube: @Filewise_ZA"
                className="w-7 h-7 rounded-lg bg-white border border-[#c8a46b]/40 hover:bg-[#b48332] hover:text-white text-[#5c5044] flex items-center justify-center transition-all shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@filewise8"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok: @filewise8"
                className="w-7 h-7 rounded-lg bg-white border border-[#c8a46b]/40 hover:bg-[#b48332] hover:text-white text-[#5c5044] flex items-center justify-center transition-all shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.1v-3.6a6.34 6.34 0 0 0-.82-.05A6.33 6.33 0 0 0 3 15.57a6.33 6.33 0 0 0 10.8 4.47V10.4a8.16 8.16 0 0 0 4.79 1.54V8.5a4.84 4.84 0 0 1-3-.81z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-[#eee8db] border-t border-[#c8a46b]/30 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#6f6154]">
          <div>
            © {new Date().getFullYear()} Filewise Legalisation Solutions. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button onClick={() => setActiveTab('about')} className="hover:text-[#9e7127] transition-colors">About Us</button>
            <span className="text-[#c8a46b]">•</span>
            <button onClick={() => setActiveTab('payments')} className="hover:text-[#9e7127] transition-colors font-semibold text-[#7a5418]">Payments</button>
            <span className="text-[#c8a46b]">•</span>
            <button onClick={() => setActiveTab('contact')} className="hover:text-[#9e7127] transition-colors">Contact Us</button>
            <span className="text-[#c8a46b]">•</span>
            <button onClick={() => setActiveTab('terms')} className="hover:text-[#9e7127] transition-colors">Terms &amp; Conditions</button>
          </div>
        </div>
      </div>

    </footer>
  );
};
