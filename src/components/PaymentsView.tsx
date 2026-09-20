import React, { useState } from 'react';
import { 
  Building2, 
  CreditCard, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  FileText, 
  Mail, 
  MessageCircle, 
  Clock, 
  ArrowRight,
  Receipt,
  HelpCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { PayPalLogo } from './PayPalButton';

interface PaymentsViewProps {
  onStartInquiry?: () => void;
  prefilledInvoice?: string;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({ 
  onStartInquiry,
  prefilledInvoice = ''
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const bankDetails = {
    accountHolder: 'FileWise',
    bank: 'First National Bank (FNB) / RMB',
    accountType: 'First Business Zero Account',
    accountNumber: '63221421281',
    branchCode: '250655',
    swiftBic: 'FIRNZAJJ',
    country: 'South Africa',
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCopyAllBanking = () => {
    const fullText = `BANKING DETAILS - FILEWISE
Account Holder: ${bankDetails.accountHolder}
Bank: ${bankDetails.bank}
Account Type: ${bankDetails.accountType}
Account Number: ${bankDetails.accountNumber}
Branch Code: ${bankDetails.branchCode}
SWIFT/BIC: ${bankDetails.swiftBic}
Country: ${bankDetails.country}
Payment Reference: Please use your official Invoice Number`;

    navigator.clipboard?.writeText(fullText);
    setCopiedKey('all');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 bg-[#f4ecd9] border border-[#c8a46b]/60 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#7a5418] shadow-2xs">
          <Receipt className="w-3.5 h-3.5 text-[#b48332]" />
          <span>Official Settlement Channels</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2b241d] tracking-tight">
          Client Payment Options
        </h1>
        <p className="text-sm sm:text-base text-[#5c5044] leading-relaxed">
          Settle official FileWise invoices, embassy consular disbursements, apostille facilitation fees, and outbound visa retainers securely via direct bank transfer (EFT) or PayPal.
        </p>
      </motion.div>

      {/* Crucial Reference Notice Box */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-amber-50/70 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-xs max-w-4xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-[#92560e] shadow-2xs">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-serif font-bold text-[#78350f]">
                Payment Reference Requirement: Use Your Invoice Number
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-mono">
                Mandatory
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#92400e] leading-relaxed">
              When making payment via either Electronic Funds Transfer (EFT) or PayPal, please enter your <strong className="font-bold underline">FileWise Invoice Number</strong> (or quotation reference code, e.g. <span className="font-mono font-bold">FW-XXXXX</span>) as your payment reference.
            </p>
            <p className="text-xs text-[#b45309]">
              Quoting your invoice number ensures your remittance is immediately reconciled by our accounting desk and your consular processing continues without administrative delay.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Two Main Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* METHOD 1: Bank Transfer (EFT / SWIFT) */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white border-2 border-[#c8a46b] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6"
        >
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#ebdcc4]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#f4ecd9] border border-[#c8a46b]/60 flex items-center justify-center text-[#7a5418] shadow-2xs">
                  <Building2 className="w-6 h-6 text-[#b48332]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7a5418] bg-[#fbf9f5] border border-[#ebdcc4] px-2 py-0.5 rounded">
                    South Africa &amp; International Wire
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2b241d] mt-1">
                    Direct Bank Transfer (EFT)
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed">
              Recommended for South African corporate accounts, local clients, and international SWIFT bank wires. Funds clear directly to our official corporate account.
            </p>

            {/* Banking Details Table */}
            <div className="bg-[#fbf9f5] border border-[#ebdcc4] rounded-2xl divide-y divide-[#ebdcc4] text-xs overflow-hidden">
              
              {/* Account Holder */}
              <div className="flex items-center justify-between p-3.5">
                <span className="text-[#7a6b5e] font-medium">Account Holder:</span>
                <span className="font-serif font-bold text-[#2b241d] text-sm">{bankDetails.accountHolder}</span>
              </div>

              {/* Bank */}
              <div className="flex items-center justify-between p-3.5">
                <span className="text-[#7a6b5e] font-medium">Bank:</span>
                <span className="font-bold text-[#2b241d]">{bankDetails.bank}</span>
              </div>

              {/* Account Type */}
              <div className="flex items-center justify-between p-3.5">
                <span className="text-[#7a6b5e] font-medium">Account Type:</span>
                <span className="font-medium text-[#2b241d]">{bankDetails.accountType}</span>
              </div>

              {/* Account Number with Copy */}
              <div className="flex items-center justify-between p-3.5 bg-white">
                <span className="text-[#7a6b5e] font-medium">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#003087] tracking-wider">
                    {bankDetails.accountNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(bankDetails.accountNumber, 'acc')}
                    className="p-1.5 rounded-lg bg-[#f4ecd9] hover:bg-[#e7dabf] text-[#7a5418] transition-colors border border-[#c8a46b]/40"
                    title="Copy Account Number"
                    aria-label="Copy Account Number"
                  >
                    {copiedKey === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Branch Code with Copy */}
              <div className="flex items-center justify-between p-3.5">
                <span className="text-[#7a6b5e] font-medium">Branch Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#2b241d]">{bankDetails.branchCode}</span>
                  <button
                    onClick={() => handleCopy(bankDetails.branchCode, 'branch')}
                    className="p-1.5 rounded-lg bg-[#f4ecd9] hover:bg-[#e7dabf] text-[#7a5418] transition-colors border border-[#c8a46b]/40"
                    title="Copy Branch Code"
                    aria-label="Copy Branch Code"
                  >
                    {copiedKey === 'branch' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* SWIFT / BIC with Copy */}
              <div className="flex items-center justify-between p-3.5">
                <span className="text-[#7a6b5e] font-medium">SWIFT / BIC:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#2b241d]">{bankDetails.swiftBic}</span>
                  <button
                    onClick={() => handleCopy(bankDetails.swiftBic, 'swift')}
                    className="p-1.5 rounded-lg bg-[#f4ecd9] hover:bg-[#e7dabf] text-[#7a5418] transition-colors border border-[#c8a46b]/40"
                    title="Copy SWIFT Code"
                    aria-label="Copy SWIFT Code"
                  >
                    {copiedKey === 'swift' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Country */}
              <div className="flex items-center justify-between p-3.5">
                <span className="text-[#7a6b5e] font-medium">Country:</span>
                <span className="font-medium text-[#2b241d]">{bankDetails.country}</span>
              </div>

              {/* Mandatory Reference Reminder in Table */}
              <div className="p-3.5 bg-amber-50/60 flex items-center justify-between">
                <span className="text-amber-900 font-bold">Payment Reference:</span>
                <span className="font-mono font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  Your Invoice Number
                </span>
              </div>
            </div>

            {/* Copy All Details Button */}
            <button
              onClick={handleCopyAllBanking}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[#fbf9f5] border-2 border-[#c8a46b]/60 hover:border-[#b48332] text-[#7a5418] text-xs font-bold transition-all shadow-2xs"
            >
              {copiedKey === 'all' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>All Banking Details Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Full Banking Details</span>
                </>
              )}
            </button>

            {/* Proof of Payment (POP) Instructions */}
            <div className="bg-[#f4ecd9]/40 border border-[#ebdcc4] rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#2b241d]">
                <FileText className="w-4 h-4 text-[#b48332]" />
                <span>Submit Proof of Payment (POP)</span>
              </div>
              <p className="text-[11px] text-[#5c5044] leading-relaxed">
                Kindly forward your electronic proof of payment so we may prioritize your consular file:
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href="mailto:info@filewise.co.za?subject=Proof%20of%20Payment%20-%20Invoice%20Reference"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-[#c8a46b]/60 hover:border-[#b48332] text-xs font-semibold text-[#2b241d] hover:bg-[#faf6ee] transition-all shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5 text-[#b48332]" />
                  <span>Email: info@filewise.co.za</span>
                </a>
                <a
                  href="https://wa.me/27502154465?text=Hello%20FileWise%20team,%20here%20is%20my%20proof%20of%20payment%20for%20Invoice%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white transition-all shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp POP</span>
                </a>
              </div>
            </div>

          </div>

          <div className="text-[11px] text-[#7a6b5e] border-t border-[#ebdcc4] pt-3 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#b48332] shrink-0" />
            <span>FNB-to-FNB transfers clear immediately. Other banks: 24–48 hours (or immediate clearance if selected).</span>
          </div>
        </motion.div>

        {/* METHOD 2: PayPal */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-[#003087]/30 hover:border-[#003087] rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 transition-colors"
        >
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#ebdcc4]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#003087] flex items-center justify-center shadow-md p-2 text-white shrink-0">
                  <PayPalLogo className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#003087] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    International &amp; Instant Card Payments
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#2b241d] mt-1">
                    Online via PayPal
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed">
              Ideal for international clients, expatriates abroad, and instant card settlement. Pay securely using your PayPal account balance or standard credit/debit cards without registration.
            </p>

            {/* PayPal Details Card */}
            <div className="bg-[#fbf9f5] border border-[#ebdcc4] rounded-2xl p-5 space-y-4 text-xs">
              
              <div className="flex items-center justify-between">
                <span className="text-[#7a6b5e] font-medium">Official PayPal Handle:</span>
                <span className="font-mono font-bold text-sm text-[#003087] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  @FileWise
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#7a6b5e] font-medium">Direct URL:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#2b241d] font-semibold">paypal.me/FileWise</span>
                  <button
                    onClick={() => handleCopy('https://paypal.me/FileWise', 'paypal_url')}
                    className="p-1.5 rounded-lg bg-white hover:bg-[#f4ecd9] text-[#7a5418] transition-colors border border-[#c8a46b]/40"
                    title="Copy PayPal Link"
                    aria-label="Copy PayPal Link"
                  >
                    {copiedKey === 'paypal_url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#ebdcc4]">
                <span className="text-[#7a6b5e] font-medium">Accepted Payment Methods:</span>
                <span className="font-semibold text-[#2b241d]">Visa, Mastercard &amp; PayPal Balance</span>
              </div>

              {/* Mandatory Reference in PayPal Box */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-2 text-[11px] text-[#92400e]">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Mandatory Note:</strong> In PayPal's <em>"Add a note"</em> field, please enter your <strong className="underline">Invoice Number</strong> so our accounting desk can immediately receipt your file.
                </div>
              </div>
            </div>

            {/* PayPal Button Action */}
            <div className="space-y-3">
              <motion.a
                href="https://paypal.me/FileWise"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 bg-[#ffc439] hover:bg-[#f5b82e] text-[#003087] font-extrabold text-sm sm:text-base py-3.5 px-6 rounded-2xl border-2 border-[#e5ad27] shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-white/90 flex items-center justify-center shrink-0 shadow-2xs">
                  <PayPalLogo className="w-4 h-4" />
                </div>
                <span>Open PayPal &amp; Pay (@FileWise)</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>

              <p className="text-[11px] text-[#7a6b5e] text-center">
                Transactions are processed in real-time under PayPal Buyer &amp; Seller Protection.
              </p>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="bg-white border border-[#ebdcc4] rounded-2xl p-4 space-y-2 text-xs text-[#5c5044]">
              <div className="font-serif font-bold text-[#2b241d] text-xs flex items-center gap-1.5 uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-[#b48332]" />
                <span>How to settle via PayPal:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed text-[11px]">
                <li>Click the gold <strong>"Open PayPal &amp; Pay"</strong> button above.</li>
                <li>Enter the invoiced amount in your invoice currency (ZAR, USD, EUR, GBP, or AED).</li>
                <li>
                  In the <strong>"Add a note"</strong> box, enter your <strong className="text-[#003087] font-mono">Invoice Number</strong>.
                </li>
                <li>Confirm payment with Visa, Mastercard, or your PayPal balance.</li>
              </ol>
            </div>

          </div>

          <div className="text-[11px] text-[#7a6b5e] border-t border-[#ebdcc4] pt-3 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>256-bit encrypted international transaction processing. Instant file receipting.</span>
          </div>
        </motion.div>

      </div>

      {/* Accounting & Invoicing Policy Notice Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="max-w-6xl mx-auto bg-white border border-[#ebdcc4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs"
      >
        <h3 className="text-lg font-serif font-bold text-[#2b241d] flex items-center gap-2">
          <Receipt className="w-5 h-5 text-[#b48332]" />
          <span>Accounting, Statutory Disbursements &amp; Receipting Policy</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#5c5044]">
          
          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-[#2b241d] text-sm">Official Tax Invoices</h4>
            <p className="leading-relaxed">
              Every client receives an itemized FileWise invoice outlining service facilitation, legalisation fees, and statutory disbursements before payment is requested.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-[#2b241d] text-sm">Consular Disbursements</h4>
            <p className="leading-relaxed">
              Embassy attestation vouchers, DIRCO expedited charges, and High Commission consular fees are disbursed upon receipt of payment to ensure uninterrupted submission.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-serif font-bold text-[#2b241d] text-sm">Automated Reconciliation</h4>
            <p className="leading-relaxed">
              Quoting your Invoice Number triggers automated matching in our docket management system, notifying your consular officer immediately.
            </p>
          </div>

        </div>

        {/* Support Callout */}
        <div className="pt-4 border-t border-[#ebdcc4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#5c5044] text-center sm:text-left">
            Have a question regarding an invoice or require a customized pro-forma invoice for your corporate accounts department?
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:info@filewise.co.za?subject=Invoice%20Query%20-%20FileWise%20Accounts"
              className="inline-flex items-center gap-1.5 bg-[#f4ecd9] hover:bg-[#ebdcc4] text-[#7a5418] font-bold text-xs px-4 py-2 rounded-xl transition-all border border-[#c8a46b]/60"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Accounts</span>
            </a>
            {onStartInquiry && (
              <button
                onClick={onStartInquiry}
                className="inline-flex items-center gap-1.5 bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs border border-[#9a6d23]"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </motion.div>

    </div>
  );
};
