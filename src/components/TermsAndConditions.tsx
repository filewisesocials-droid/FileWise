import React from 'react';
import { ShieldCheck, FileText, Scale, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface TermsAndConditionsProps {
  onStartInquiry?: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onStartInquiry }) => {
  return (
    <section className="py-16 bg-[#faf8f5] text-[#2b241d] min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-[#f4ecd9] border border-[#c8a46b]/50 text-[#7a5418] text-xs font-bold px-4 py-1.5 rounded-full shadow-2xs">
            <Scale className="w-4 h-4 text-[#b48332]" />
            <span>Legal Framework &amp; Service Terms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2b241d]">
            Terms &amp; Conditions
          </h1>
        </motion.div>

        {/* Section 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="bg-white border-2 border-[#c8a46b]/40 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-[#5c5044] text-sm leading-relaxed hover:border-[#b48332]/60 transition-colors"
        >
          <div className="flex items-center gap-3 text-[#2b241d] font-serif font-bold text-lg">
            <FileText className="w-5 h-5 text-[#b48332]" />
            <span>1. Agreement &amp; Scope of Services</span>
          </div>
          <p>
            Welcome to FileWise. By accessing our platform or instructing us to assist with outbound visa application support, South African document legalisation, Hague Apostilles, or Pretoria embassy attestations, you agree to be bound by these Terms and Conditions.
          </p>
          <p>
            FileWise acts as an authorized service facilitator for outbound visa preparation and document submission to relevant South African government departments (DIRCO, SA High Courts, Department of Home Affairs) and foreign diplomatic missions in Pretoria.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="bg-white border-2 border-[#c8a46b]/40 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-[#5c5044] text-sm leading-relaxed hover:border-[#b48332]/60 transition-colors"
        >
          <div className="flex items-center gap-3 text-[#2b241d] font-serif font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-[#b48332]" />
            <span>2. Client Responsibilities &amp; Original Documents</span>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
              <span><strong>Document Authenticity:</strong> You warrant that all certificates and records submitted for legalisation or visa applications are genuine, lawfully acquired, and free from falsification.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e7d32] shrink-0 mt-0.5" />
              <span><strong>Correct Document Format:</strong> Certain authorities require original unabridged certificates or official university transcripts. FileWise will advise on requirements, but clients remain responsible for providing compliant base records.</span>
            </li>
          </ul>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="bg-white border-2 border-[#c8a46b]/40 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-[#5c5044] text-sm leading-relaxed hover:border-[#b48332]/60 transition-colors"
        >
          <div className="flex items-center gap-3 text-[#2b241d] font-serif font-bold text-lg">
            <AlertCircle className="w-5 h-5 text-[#b48332]" />
            <span>3. Processing Times &amp; Government Agencies</span>
          </div>
          <p>
            While FileWise maintains daily hand-delivery submissions to DIRCO Pretoria, foreign embassies, and judicial offices, estimated processing timelines are subject to government workload, official holidays, and unforeseen diplomatic delays.
          </p>
          <p>
            FileWise is not liable for delayed timelines caused directly by government department administrative backlog or embassy operational schedule changes, provided FileWise fulfilled its duty of timely submission.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="bg-white border-2 border-[#c8a46b]/40 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-[#5c5044] text-sm leading-relaxed hover:border-[#b48332]/60 transition-colors"
        >
          <div className="flex items-center gap-3 text-[#2b241d] font-serif font-bold text-lg">
            <Lock className="w-5 h-5 text-[#b48332]" />
            <span>4. Confidentiality &amp; Data Security (POPIA)</span>
          </div>
          <p>
            FileWise complies strictly with South Africa&apos;s Protection of Personal Information Act (POPIA). Personal identity records, certificates, and legal documentation uploaded or provided to FileWise are handled securely and used strictly for visa assistance and document legalisation.
          </p>
        </motion.div>

        {/* Section 5 */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="bg-white border-2 border-[#c8a46b]/40 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-[#5c5044] text-sm leading-relaxed hover:border-[#b48332]/60 transition-colors"
        >
          <div className="flex items-center gap-3 text-[#2b241d] font-serif font-bold text-lg">
            <Scale className="w-5 h-5 text-[#b48332]" />
            <span>5. Fees, Quotations &amp; Refund Policy</span>
          </div>
          <p>
            All quotations reflect statutory government charges, official consular tariffs, and FileWise handling fees.
          </p>
          <p>
            Please note that FileWise operates as an independent consular advisory and document handling agency; we are not a government body or embassy and do not hold visa granting or consular approval authority. Final visa decisions, document approvals, or attestation outcomes rest entirely with respective foreign embassies, consulates, and DIRCO. In the event that a visa application or document is declined by an embassy or government entity, statutory fees disbursed to official bodies are strictly non-refundable.
          </p>
        </motion.div>

        {/* Contact Footer */}
        <div className="text-center pt-4 border-t border-[#ebdcc4]">
          <p className="text-xs text-[#8c7b6d]">
            Questions regarding our terms? Contact our team at{' '}
            <a href="mailto:info@filewise.co.za" className="text-[#7a5418] font-bold hover:underline">
              info@filewise.co.za
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
