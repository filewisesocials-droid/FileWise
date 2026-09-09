import React from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2, Globe, HeartHandshake, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutUsProps {
  onStartInquiry?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onStartInquiry }) => {
  return (
    <section className="py-16 bg-[#faf8f5] text-[#2b241d] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-[#f4ecd9] border border-[#c8a46b]/50 text-[#7a5418] text-xs font-bold px-4 py-1.5 rounded-full shadow-2xs">
            <Building2 className="w-4 h-4 text-[#b48332]" />
            <span>South African Consular &amp; Visa Advisory Agency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#2b241d]">
            About FileWise
          </h1>

          <p className="text-[#5c5044] text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            FileWise is a specialized South African agency offering outbound visa assistance for South Africans traveling abroad, as well as South African document legalisation (DIRCO Hague Apostilles, High Court Authentication, Pretoria Foreign Embassy Attestation, and High Court Sworn Translations) executed in Pretoria.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Outbound', sub: 'Visa Assistance' },
            { label: 'Pretoria', sub: 'DIRCO & Embassy Hub' },
            { label: '120+', sub: 'Hague Apostille States' },
            { label: 'High Court', sub: 'Sworn Translators & Notaries' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332] p-6 rounded-2xl text-center space-y-1 shadow-2xs transition-all"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#2b241d]">{stat.label}</div>
              <div className="text-xs text-[#5c5044] font-medium">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Story & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332]/60 p-8 rounded-2xl space-y-4 shadow-sm transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f4ecd9] text-[#7a5418] flex items-center justify-center border border-[#c8a46b]/60 shadow-2xs">
              <Award className="w-6 h-6 text-[#b48332]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2b241d]">Our Mission</h2>
            <p className="text-[#5c5044] text-xs sm:text-sm leading-relaxed font-sans">
              Navigating foreign visa requirements, diplomatic embassy protocols, and South African legalisation channels requires exact precision. Our mission is to guide South Africans through outbound visa applications and ensure their official documents are properly legalised in South Africa for international validity.
            </p>
            <ul className="space-y-2.5 text-xs text-[#2b241d] pt-2 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                <span>Outbound visa preparation and supporting document verification for SA passport holders.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                <span>Direct daily hand-delivery submissions to DIRCO in Pretoria &amp; SA High Courts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                <span>Foreign Embassy attestation in Pretoria (UAE, Qatar, Saudi Arabia, Kuwait, etc.).</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332]/60 p-8 rounded-2xl space-y-4 shadow-sm transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f4ecd9] text-[#7a5418] flex items-center justify-center border border-[#c8a46b]/60 shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-[#b48332]" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2b241d]">Why Choose FileWise?</h2>
            <p className="text-[#5c5044] text-xs sm:text-sm leading-relaxed font-sans">
              We handle every document and visa submission with complete diligence. From police clearance certificates, birth &amp; marriage certificates to academic degrees and company records, our specialists ensure compliance with embassy and diplomatic standards.
            </p>
            <ul className="space-y-2.5 text-xs text-[#2b241d] pt-2 font-sans">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                <span>Pretoria-based embassy and DIRCO liaisons with daily processing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                <span>Access to registered SA Notaries Public &amp; High Court Sworn Translators.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
                <span>Door-to-door express courier collection and delivery across South Africa.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-serif font-bold text-[#2b241d]">Our Core Standards</h3>
            <p className="text-[#5c5044] text-xs mt-1 font-sans">Built on diplomatic compliance, security, and precision.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332] p-6 rounded-2xl text-center space-y-3 shadow-2xs transition-all"
            >
              <Globe className="w-8 h-8 text-[#b48332] mx-auto" />
              <h4 className="font-serif font-bold text-[#2b241d] text-base">Diplomatic Compliance</h4>
              <p className="text-[#5c5044] text-xs leading-relaxed font-sans">
                Adhering strictly to Hague Apostille guidelines and foreign embassy regulations in Pretoria.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332] p-6 rounded-2xl text-center space-y-3 shadow-2xs transition-all"
            >
              <ShieldCheck className="w-8 h-8 text-[#b48332] mx-auto" />
              <h4 className="font-serif font-bold text-[#2b241d] text-base">Document Security</h4>
              <p className="text-[#5c5044] text-xs leading-relaxed font-sans">
                Strict chain of custody ensuring your original certificates and records remain completely safe.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -3 }}
              className="bg-white border-2 border-[#c8a46b]/40 hover:border-[#b48332] p-6 rounded-2xl text-center space-y-3 shadow-2xs transition-all"
            >
              <HeartHandshake className="w-8 h-8 text-[#b48332] mx-auto" />
              <h4 className="font-serif font-bold text-[#2b241d] text-base">Client Support</h4>
              <p className="text-[#5c5044] text-xs leading-relaxed font-sans">
                Dedicated visa and legalisation advisors available via WhatsApp and Email.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        {onStartInquiry && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="bg-[#fbf9f5] border-2 border-[#c8a46b] rounded-2xl p-8 sm:p-10 text-center space-y-4 shadow-sm text-[#2b241d]"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">Require Outbound Visa or Document Legalisation?</h3>
            <p className="text-[#5c5044] text-xs sm:text-sm max-w-xl mx-auto font-sans">
              Contact our Pretoria specialists for immediate guidance and processing timelines.
            </p>
            <button
              onClick={onStartInquiry}
              className="inline-flex items-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-xs border border-[#9a6d23]"
            >
              <span>Submit General Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};
