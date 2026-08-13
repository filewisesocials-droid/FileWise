import React from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2, Globe, HeartHandshake, ArrowRight, Stamp } from 'lucide-react';

interface AboutUsProps {
  onStartInquiry?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onStartInquiry }) => {
  return (
    <section className="py-16 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold px-4 py-1.5 rounded shadow-2xs">
            <Building2 className="w-4 h-4 text-amber-700" />
            <span>South African Consular &amp; Visa Advisory Agency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-slate-900">
            About FileWise
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            FileWise is a specialized South African agency offering outbound visa assistance for South Africans traveling abroad, as well as South African document legalisation (DIRCO Hague Apostilles, High Court Authentication, Pretoria Foreign Embassy Attestation, and High Court Sworn Translations) executed in Pretoria.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Outbound</div>
            <div className="text-xs text-slate-600 font-medium">Visa Assistance</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">Pretoria</div>
            <div className="text-xs text-slate-600 font-medium">DIRCO &amp; Embassy Hub</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">120+</div>
            <div className="text-xs text-slate-600 font-medium">Hague Apostille States</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl text-center space-y-1 shadow-sm">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">High Court</div>
            <div className="text-xs text-slate-600 font-medium">Sworn Translators &amp; Notaries</div>
          </div>
        </div>

        {/* Story & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white border border-slate-200 p-8 rounded-xl space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center border border-slate-800">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              Navigating foreign visa requirements, diplomatic embassy protocols, and South African legalisation channels requires exact precision. Our mission is to guide South Africans through outbound visa applications and ensure their official documents are properly legalised in South Africa for international validity.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Outbound visa preparation and supporting document verification for SA passport holders.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Direct daily hand-delivery submissions to DIRCO in Pretoria &amp; SA High Courts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Foreign Embassy attestation in Pretoria (UAE, Qatar, Saudi Arabia, Kuwait, etc.).</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-xl space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center border border-slate-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">Why Choose FileWise?</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
              We handle every document and visa submission with complete diligence. From police clearance certificates, birth &amp; marriage certificates to academic degrees and company records, our specialists ensure compliance with embassy and diplomatic standards.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Pretoria-based embassy and DIRCO liaisons with daily processing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Access to registered SA Notaries Public &amp; High Court Sworn Translators.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Door-to-door express courier collection and delivery across South Africa.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold text-slate-900">Our Core Standards</h3>
            <p className="text-slate-500 text-xs mt-1 font-sans">Built on diplomatic compliance, security, and precision.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-xl text-center space-y-3 shadow-sm">
              <Globe className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-serif font-bold text-slate-900 text-base">Diplomatic Compliance</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Adhering strictly to Hague Apostille guidelines and foreign embassy regulations in Pretoria.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl text-center space-y-3 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-serif font-bold text-slate-900 text-base">Document Security</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Strict chain of custody ensuring your original certificates and records remain completely safe.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-xl text-center space-y-3 shadow-sm">
              <HeartHandshake className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-serif font-bold text-slate-900 text-base">Client Support</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Dedicated visa and legalisation advisors available via WhatsApp and Email.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        {onStartInquiry && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 sm:p-10 text-center space-y-4 shadow-xl text-white">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">Require Outbound Visa or Document Legalisation?</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto font-sans">
              Contact our Pretoria specialists for immediate guidance and processing timelines.
            </p>
            <button
              onClick={onStartInquiry}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-lg transition-all shadow-md"
            >
              <span>Submit General Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
