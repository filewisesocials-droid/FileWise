import React from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2, Globe, HeartHandshake, ArrowRight } from 'lucide-react';

interface AboutUsProps {
  onStartInquiry?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onStartInquiry }) => {
  return (
    <section className="py-16 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-2xs">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>About FileWise Visa &amp; Legalisation Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-slate-900">
            Expert Visa Assistance &amp; Document Legalisation
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            FileWise is a specialized South African agency providing comprehensive visa application support and international document legalisation services. We assist individuals, families, and businesses moving, studying, or working abroad by ensuring all visa documentation, DIRCO Hague apostilles, foreign embassy attestations, and sworn translations are flawlessly prepared and legally verified.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">Global</div>
            <div className="text-xs text-slate-600 font-medium">Visa &amp; Consular Support</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">120+</div>
            <div className="text-xs text-slate-600 font-medium">Hague Member Countries Supported</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">Strict</div>
            <div className="text-xs text-slate-600 font-medium">DIRCO &amp; Embassy Verification</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">Pretoria</div>
            <div className="text-xs text-slate-600 font-medium">Embassy &amp; DIRCO Hub</div>
          </div>
        </div>

        {/* Story & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Navigating foreign embassies, visa requirements, and government legalisation channels can be complex and stressful. Our mission is to provide seamless visa guidance, consular document preparation, Hague Apostille certification, and sworn translations that make international travel, study, and relocation straightforward.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Comprehensive visa document preparation and checklist verification</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Direct daily submissions to DIRCO in Pretoria &amp; SA High Courts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Full embassy liaisons (UAE, Qatar, Saudi Arabia, UK, Schengen &amp; China)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Why Choose FileWise?</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We manage every document and visa submission with meticulous precision. From police clearances, birth certificates, and marriage certificates to academic degrees and corporate documentation, our specialists ensure your papers meet strict embassy standards to avoid delays or rejections.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>End-to-end guidance tailored specifically to your destination country</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>In-house registered SA Notaries Public &amp; Sworn Translators</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Door-to-door express courier collection and delivery</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-slate-900">Our Core Principles</h3>
            <p className="text-slate-500 text-xs mt-1">Built on integrity, speed, and absolute accuracy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-3 shadow-sm">
              <Globe className="w-8 h-8 text-blue-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-base">Global Standards</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Adhering strictly to Hague Convention guidelines and individual embassy diplomatic mandates.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-3 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-base">Document Integrity</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Chain of custody management ensuring your original vital records remain safe throughout processing.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-3 shadow-sm">
              <HeartHandshake className="w-8 h-8 text-blue-600 mx-auto" />
              <h4 className="font-bold text-slate-900 text-base">Client First</h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                Dedicated legalisation advisors available to guide you through every step of your application.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        {onStartInquiry && (
          <div className="bg-blue-600 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl text-white">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Need Your Documents Legalised?</h3>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto">
              Get started in minutes with our free requirement lookup and instant legalisation inquiry portal.
            </p>
            <button
              onClick={onStartInquiry}
              className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition-all shadow-md"
            >
              <span>Submit Legalisation Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
