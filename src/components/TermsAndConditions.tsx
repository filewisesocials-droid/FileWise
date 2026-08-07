import React from 'react';
import { ShieldCheck, FileText, Scale, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface TermsAndConditionsProps {
  onStartInquiry?: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onStartInquiry }) => {
  return (
    <section className="py-16 bg-slate-50 text-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-2xs">
            <Scale className="w-4 h-4 text-blue-600" />
            <span>Legal Framework &amp; Service Terms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-slate-900">
            Terms &amp; Conditions
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Effective Date: January 1, 2026 • Last Updated: August 2026
          </p>
        </div>

        {/* Section 1 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>1. Agreement &amp; Scope of Services</span>
          </div>
          <p>
            Welcome to FileWise Legalisation Services. By accessing our platform or instructing us to handle document verification, Hague Apostille certification, notarization, or consular attestation, you agree to be bound by these Terms and Conditions.
          </p>
          <p>
            FileWise acts as an authorized agent for document submission to relevant South African government departments (such as DIRCO, High Courts, Department of Home Affairs) and international diplomatic missions/embassies.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span>2. Client Responsibilities &amp; Original Documents</span>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Document Authenticity:</strong> You warrant that all documents submitted for legalisation are genuine, lawfully acquired, and free from falsification or fraudulent alterations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Correct Document Format:</strong> Certain authorities require original vaults, unabridged certificates, or official university transcripts. FileWise will advise on requirements, but clients remain responsible for providing compliant base records.</span>
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span>3. Processing Times &amp; Government Agencies</span>
          </div>
          <p>
            While FileWise maintains expedited daily submissions to DIRCO Pretoria, foreign embassies, and judicial offices, estimated processing timelines are subject to government workload, official holidays, and unforeseen diplomatic delays.
          </p>
          <p>
            FileWise is not liable for delayed timelines caused directly by government department administrative backlog, provided FileWise fulfilled its duty of timely submission.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
            <Lock className="w-5 h-5 text-blue-600" />
            <span>4. Confidentiality, POPIA &amp; Data Security</span>
          </div>
          <p>
            FileWise complies strictly with the Protection of Personal Information Act (POPIA) and international data safety standards. Personal identity records, certificates, and legal documentation uploaded or provided to FileWise are stored in encrypted environments and used strictly for the purpose of document legalisation.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm text-slate-600 text-sm leading-relaxed">
          <div className="flex items-center gap-3 text-slate-900 font-bold text-lg">
            <Scale className="w-5 h-5 text-blue-600" />
            <span>5. Fees, Quotations &amp; Refund Policy</span>
          </div>
          <p>
            All quotations reflect government statutory fees, consular stamp tariffs, and FileWise handling fees. Work commences upon payment receipt. In the unlikely event that a document cannot be processed due to FileWise error, fees for that document service will be refunded in full.
          </p>
        </div>

        {/* Contact Footer */}
        <div className="text-center pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Have questions regarding our terms? Contact our legal compliance department at{' '}
            <a href="mailto:support@filewise.co.za" className="text-blue-600 font-semibold hover:underline">
              support@filewise.co.za
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
