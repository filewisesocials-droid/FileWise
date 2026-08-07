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
            <span>About FileWise Legalisation Services</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-slate-900">
            Simplifying Global Document Verification &amp; Legalisation
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            FileWise is a premier South African document legalisation specialist. We bridge the gap between South African public authorities, foreign embassies, and individuals or corporations requiring seamless document verification worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">120+</div>
            <div className="text-xs text-slate-600 font-medium">Hague Member Countries Supported</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">100%</div>
            <div className="text-xs text-slate-600 font-medium">Embassy Acceptance Guarantee</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">25,000+</div>
            <div className="text-xs text-slate-600 font-medium">Documents Successfully Legalised</div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-1 shadow-sm">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">Rustenburg</div>
            <div className="text-xs text-slate-600 font-medium">Consular &amp; Legalisation Hub</div>
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
              International bureaucratic processes can be overwhelming, opaque, and time-consuming. Our mission is to make document attestation, Hague Apostille certification, and consular authentication stress-free, reliable, and completely transparent for every client.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Direct daily submissions to DIRCO in Pretoria &amp; High Courts</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>In-house registered SA Notaries Public and Sworn Translators</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Full physical embassy liaisons (UAE, Qatar, Saudi Arabia, China, etc.)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Why Choose FileWise?</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We handle every document with bank-grade security protocols and meticulous attention to legal detail. From birth certificates and police clearances to corporate agreements and university degrees, our experienced legalisation officers verify compliance before submission to avoid costly rejections.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Real-time status tracking via unique reference code</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Door-to-door express courier collection and delivery</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Expert guidance tailored specifically to your destination country</span>
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
