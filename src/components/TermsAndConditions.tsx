import React from 'react';
import { ShieldCheck, FileText, Scale, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface TermsAndConditionsProps {
  onStartInquiry?: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onStartInquiry }) => {
  return (
    <section className="py-16 bg-slate-50 text-slate-900 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold px-4 py-1.5 rounded shadow-2xs">
            <Scale className="w-4 h-4 text-amber-700" />
            <span>Legal Framework &amp; Service Terms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900">
            Terms &amp; Conditions
          </h1>
        </div>

        {/* Section 1 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-serif font-bold text-lg">
            <FileText className="w-5 h-5 text-amber-600" />
            <span>1. Agreement &amp; Scope of Services</span>
          </div>
          <p>
            Welcome to FileWise. By accessing our platform or instructing us to assist with outbound visa application support, South African document legalisation, Hague Apostilles, or Pretoria embassy attestations, you agree to be bound by these Terms and Conditions.
          </p>
          <p>
            FileWise acts as an authorized service facilitator for outbound visa preparation and document submission to relevant South African government departments (DIRCO, SA High Courts, Department of Home Affairs) and foreign diplomatic missions in Pretoria.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-serif font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span>2. Client Responsibilities &amp; Original Documents</span>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Document Authenticity:</strong> You warrant that all certificates and records submitted for legalisation or visa applications are genuine, lawfully acquired, and free from falsification.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Correct Document Format:</strong> Certain authorities require original unabridged certificates or official university transcripts. FileWise will advise on requirements, but clients remain responsible for providing compliant base records.</span>
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-serif font-bold text-lg">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>3. Processing Times &amp; Government Agencies</span>
          </div>
          <p>
            While FileWise maintains daily hand-delivery submissions to DIRCO Pretoria, foreign embassies, and judicial offices, estimated processing timelines are subject to government workload, official holidays, and unforeseen diplomatic delays.
          </p>
          <p>
            FileWise is not liable for delayed timelines caused directly by government department administrative backlog or embassy operational schedule changes, provided FileWise fulfilled its duty of timely submission.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-serif font-bold text-lg">
            <Lock className="w-5 h-5 text-amber-600" />
            <span>4. Confidentiality &amp; Data Security (POPIA)</span>
          </div>
          <p>
            FileWise complies strictly with South Africa&apos;s Protection of Personal Information Act (POPIA). Personal identity records, certificates, and legal documentation uploaded or provided to FileWise are handled securely and used strictly for visa assistance and document legalisation.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-serif font-bold text-lg">
            <Scale className="w-5 h-5 text-amber-600" />
            <span>5. Fees, Quotations &amp; Refund Policy</span>
          </div>
          <p>
            All quotations reflect statutory government charges, official consular tariffs, and FileWise handling fees.
          </p>
          <p>
            Please note that FileWise operates as an independent consular advisory and document handling agency; we are not a government body or embassy and do not hold visa granting or consular approval authority. Final visa decisions, document approvals, or attestation outcomes rest entirely with respective foreign embassies, consulates, and DIRCO. In the event that a visa application or document is declined by an embassy or government entity, statutory fees disbursed to official bodies are strictly non-refundable.
          </p>
        </div>

        {/* Contact Footer */}
        <div className="text-center pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Questions regarding our terms? Contact our team at{' '}
            <a href="mailto:info@filewise.co.za" className="text-amber-800 font-bold hover:underline">
              info@filewise.co.za
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
