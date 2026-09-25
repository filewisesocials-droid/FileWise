import React, { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Globe2, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Tv, 
  Plane, 
  ArrowRight, 
  X, 
  FileCheck, 
  CreditCard, 
  HelpCircle,
  Share2,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CompetitionPageProps {
  onStartInquiry: (countryCode?: string) => void;
  onOpenPayment?: () => void;
}

export const CompetitionPage: React.FC<CompetitionPageProps> = ({
  onStartInquiry,
  onOpenPayment,
}) => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [subTab, setSubTab] = useState<'current' | 'all' | 'past'>('current');

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-[#faf8f5] text-[#2c241c] min-h-screen">
      
      {/* Competitions Portal Navigation Bar & Internal Sub-Tabs */}
      <section className="bg-[#0b1320] border-b border-[#c8a46b]/40 text-white py-3.5 px-4 sm:px-6 lg:px-8 sticky top-18 sm:top-20 z-40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#b48332]/25 border border-[#c8a46b]/50 flex items-center justify-center text-[#f5d799] shrink-0">
              <Trophy className="w-4 h-4 text-[#f5d799]" />
            </div>
            <div>
              <span className="font-serif font-black text-sm text-white tracking-wide uppercase">
                FileWise Competitions
              </span>
              <span className="hidden sm:inline text-xs text-[#94a3b8] ml-2">
                Client promotional giveaways directory
              </span>
            </div>
          </div>

          {/* Internal Tabs: Current Competitions, All Competitions, Past Competitions */}
          <div className="flex items-center gap-1.5 p-1 bg-[#050b12] rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setSubTab('current')}
              id="tab-current-competitions"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                subTab === 'current'
                  ? 'bg-[#b48332] text-white shadow-xs'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Current Competitions</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                subTab === 'current' ? 'bg-white/20 text-white' : 'bg-white/10 text-[#cbd5e1]'
              }`}>
                1
              </span>
            </button>

            <button
              onClick={() => setSubTab('all')}
              id="tab-all-competitions"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                subTab === 'all'
                  ? 'bg-[#b48332] text-white shadow-xs'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              <span>All</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                subTab === 'all' ? 'bg-white/20 text-white' : 'bg-white/10 text-[#cbd5e1]'
              }`}>
                1
              </span>
            </button>

            <button
              onClick={() => setSubTab('past')}
              id="tab-past-competitions"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                subTab === 'past'
                  ? 'bg-[#b48332] text-white shadow-xs'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Past Competitions</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                subTab === 'past' ? 'bg-white/20 text-white' : 'bg-white/10 text-[#94a3b8]'
              }`}>
                0
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* When Past Competitions Tab is selected */}
      {subTab === 'past' ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#c8a46b]/40 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#fbf4e8] border border-[#dfbe87] flex items-center justify-center text-[#8a5716] mx-auto shadow-xs">
              <Trophy className="w-8 h-8 text-[#8a5716]" />
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h3 className="font-serif font-extrabold text-2xl text-[#2b241d]">
                Past Winners &amp; Competitions
              </h3>
              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed">
                Our past competition winners and giveaway announcements will be celebrated here once each draw concludes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#c8a46b]/30 max-w-lg mx-auto text-left space-y-2 text-xs text-[#5c5044]">
              <p className="font-bold text-[#2b241d] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Upcoming First Draw Winner:</span>
              </p>
              <p className="font-serif font-extrabold text-sm text-[#8a5716]">
                FILEWISE RUGBY WORLD CUP 2027 VISA GIVEAWAY
              </p>
              <p className="text-[11px] text-[#7a6b5e]">
                Scheduled: 01 October 2026 – 31 August 2027 • Winner drawn live: 04 September 2027 at 18:00 (SAST)
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSubTab('current')}
                className="inline-flex items-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-white" />
                <span>View Current Competition (1)</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Header Section */}
          <section className="relative bg-gradient-to-b from-[#0b121e] via-[#101a2b] to-[#070c14] text-white pt-14 pb-20 sm:pt-18 sm:pb-28 overflow-hidden border-b border-[#c8a46b]/40">
            
            {/* Background Visual Flair */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#b48332] blur-3xl" />
              <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#00a3e0] blur-3xl opacity-30" />
            </div>

            {/* Subtle Travel Coordinates Grid */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c8a46b_1px,transparent_1px)] [background-size:24px_24px]" 
            />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              
              {/* Campaign Schedule Status Chip - (Removed Official Promotional Campaign) */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#b48332]/25 text-[#f5d799] border border-[#c8a46b]/40 shadow-sm mb-6">
                <Calendar className="w-3.5 h-3.5 text-[#f5d799] shrink-0" />
                <span>Scheduled: 01 Oct 2026 – 31 Aug 2027</span>
                <span className="hidden sm:inline text-white/40">•</span>
                <span className="hidden sm:inline text-white/80">Live Draw: 04 Sept 2027 at 18:00</span>
              </div>

          {/* Campaign Name */}
          <p className="font-sans text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-[#dfbe87] mb-3">
            FILEWISE RUGBY WORLD CUP 2027 VISA GIVEAWAY
          </p>

          {/* Main Hero Headline */}
          <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] mb-6">
            APPLY FOR A VISA.<br />
            <span className="bg-gradient-to-r from-[#ffd88d] via-[#f7cb73] to-[#c8a46b] bg-clip-text text-transparent">
              YOU COULD GET IT FOR FREE.
            </span>
          </h1>

          {/* Intro Description */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#cbd5e1] font-normal leading-relaxed mb-8">
            From <strong className="text-white font-semibold">01 October 2026</strong> to <strong className="text-white font-semibold">31 August 2027</strong>, qualifying customers who use FileWise for their visa application will automatically stand a chance to win a <span className="text-[#f5d799] font-bold">100% refund of their eligible FileWise visa costs</span>.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <button
              onClick={() => onStartInquiry('AU')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md border border-[#9a6d23] transition-all cursor-pointer"
            >
              <Plane className="w-4 h-4 text-white" />
              <span>Apply for a Qualifying Visa</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => setIsTermsModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#f5d799]" />
              <span>View Full Terms &amp; Conditions</span>
            </button>
          </div>

          {/* Rugby Stadium Visual Feature Card */}
          <div className="mt-10 relative max-w-3xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[#c8a46b]/40 shadow-2xl bg-[#030906]">
            <div className="relative h-44 sm:h-64 w-full">
              <img
                src="/rugby-ball-stadium.jpg"
                alt="Rugby ball resting on floodlit stadium turf"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-[#0b121e]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b121e]/80 via-transparent to-[#0b121e]/80" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-left">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#00482b]/90 text-[#f5d799] border border-[#c8a46b]/50 backdrop-blur-sm mb-1.5">
                    <Trophy className="w-3 h-3 text-[#ffd57e]" />
                    <span>Grand Promotional Prize</span>
                  </div>
                  <h3 className="font-serif font-black text-lg sm:text-2xl text-white tracking-tight">
                    100% REFUND OF ELIGIBLE FILEWISE VISA COSTS
                  </h3>
                  <p className="text-xs text-[#cbd5e1] hidden sm:block">
                    Every qualifying paid FileWise invoice automatically enters the official live draw.
                  </p>
                </div>
                
                <div className="shrink-0 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-right">
                  <span className="text-[10px] text-[#f5d799] uppercase font-bold block">1 Winner</span>
                  <span className="text-xs font-extrabold text-white">Full Refund</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Period Prominent Banner */}
          <div className="mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#94a3b8]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#c8a46b]" />
              <span className="font-bold uppercase tracking-wider text-slate-200">Competition Period:</span>
              <span className="font-extrabold text-[#f5d799] text-sm">01 OCTOBER 2026 – 31 AUGUST 2027</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16 sm:space-y-24">

        {/* 1. HOW IT WORKS */}
        <section className="scroll-mt-24" id="how-it-works">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#9e7127] bg-[#fbf4e8] border border-[#dfbe87] px-3 py-1 rounded-full">
              Simple 5-Step Process
            </span>
            <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2b241d] tracking-tight mt-3">
              HOW IT WORKS
            </h2>
            <p className="text-xs sm:text-sm text-[#665749] mt-2">
              Qualifying paid visa applications automatically enter our official promotional register.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-5 border border-[#c8a46b]/30 shadow-xs flex flex-col items-center text-center relative group hover:border-[#b48332] hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#fbf4e8] border border-[#c8a46b]/40 text-[#8a5716] font-black text-sm flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase tracking-wide">
                APPLY
              </h3>
              <p className="text-xs text-[#5c5044] leading-relaxed">
                Apply for a qualifying visa through FileWise.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-5 border border-[#c8a46b]/30 shadow-xs flex flex-col items-center text-center relative group hover:border-[#b48332] hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#fbf4e8] border border-[#c8a46b]/40 text-[#8a5716] font-black text-sm flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase tracking-wide">
                PAY
              </h3>
              <p className="text-xs text-[#5c5044] leading-relaxed">
                Pay your qualifying FileWise invoice in full.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#fcf8f0] rounded-2xl p-5 border-2 border-[#b48332]/50 shadow-xs flex flex-col items-center text-center relative group hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#b48332] text-white font-black text-sm flex items-center justify-center mb-3 shadow-xs">
                3
              </div>
              <h3 className="font-serif font-extrabold text-base text-[#2b241d] mb-1.5 uppercase tracking-wide">
                GET ENTERED
              </h3>
              <p className="text-xs text-[#5c5044] leading-relaxed">
                Your qualifying FileWise invoice becomes your competition entry.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-5 border border-[#c8a46b]/30 shadow-xs flex flex-col items-center text-center relative group hover:border-[#b48332] hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#fbf4e8] border border-[#c8a46b]/40 text-[#8a5716] font-black text-sm flex items-center justify-center mb-3">
                4
              </div>
              <h3 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase tracking-wide">
                LIVE DRAW
              </h3>
              <p className="text-xs text-[#5c5044] leading-relaxed">
                One eligible entry will be randomly selected in the official live draw on 04 September 2027 at 18:00.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#0b121e] text-white rounded-2xl p-5 border border-[#c8a46b]/50 shadow-md flex flex-col items-center text-center relative group sm:col-span-2 lg:col-span-1">
              <div className="w-11 h-11 rounded-xl bg-[#b48332] text-white font-black text-sm flex items-center justify-center mb-3">
                5
              </div>
              <h3 className="font-serif font-extrabold text-base text-[#f5d799] mb-1.5 uppercase tracking-wide">
                WIN
              </h3>
              <p className="text-xs text-[#cbd5e1] leading-relaxed">
                The winner receives a 100% refund of their eligible FileWise visa costs associated with the winning entry.
              </p>
            </div>
          </div>
        </section>

        {/* 2. WHO CAN ENTER? & THE ENTRY (Side-by-side on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* WHO CAN ENTER? */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c8a46b]/35 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#fbf4e8] border border-[#dfbe87] flex items-center justify-center text-[#8a5716]">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h2 className="font-serif font-bold text-xl text-[#2b241d] tracking-tight">
                  WHO CAN ENTER?
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-4">
                The promotion is <strong>not limited</strong> to Australian or New Zealand visa applications. A qualifying FileWise visa application to <strong>any destination</strong> may be eligible.
              </p>

              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a6b5e] block mb-2">
                  Qualifying Destinations Include:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Australia', 'New Zealand', 'United Kingdom', 'United States', 'Canada', 'Schengen / Europe', 'UAE & Gulf', 'All Destinations'].map((dest) => (
                    <span 
                      key={dest} 
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-[#faf8f5] text-[#2c241c] border border-[#c8a46b]/30"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#b48332]" />
                      <span>{dest}</span>
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#7a6b5e] italic leading-normal">
                Any destination where FileWise provides visa assistance may qualify. The exact eligibility requirements are governed by the official competition Terms &amp; Conditions.
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[#f0e6d6]">
              <button
                onClick={() => onStartInquiry()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8a5716] hover:text-[#b48332] transition-colors"
              >
                <span>Check requirements for your destination</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* THE ENTRY */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c8a46b]/35 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#fbf4e8] border border-[#dfbe87] flex items-center justify-center text-[#8a5716]">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h2 className="font-serif font-bold text-xl text-[#2b241d] tracking-tight">
                  THE ENTRY
                </h2>
              </div>

              <div className="bg-[#fbf4e8] border border-[#dfbe87] rounded-xl p-3.5 mb-4">
                <p className="font-serif font-extrabold text-sm sm:text-base text-[#8a5716] tracking-tight">
                  YOUR FILEWISE INVOICE IS YOUR ENTRY.
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-3">
                A qualifying paid visa application creates an entry in the competition register.
              </p>

              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-4">
                Where a customer has multiple separate qualifying visa applications, each qualifying application may constitute a separate entry, subject to the official Terms &amp; Conditions.
              </p>

              {/* Crucial anti-splitting rule */}
              <div className="bg-[#fff9f0] border-l-4 border-[#b48332] p-3 rounded-r-xl text-xs text-[#665749] leading-relaxed">
                <strong className="text-[#2b241d]">Important Rule:</strong> Customers cannot create multiple entries simply by splitting one normal transaction into multiple invoices. Only genuine, separate qualifying visa applications will generate distinct entries.
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#f0e6d6]">
              <span className="text-[11px] text-[#7a6b5e]">
                Invoices paid between 01 October 2026 and 31 August 2027 are automatically indexed.
              </span>
            </div>
          </section>

        </div>

        {/* 3. THE PRIZE SECTION */}
        <section className="bg-gradient-to-br from-[#0e1726] to-[#070c14] text-white rounded-3xl p-6 sm:p-10 border border-[#c8a46b]/40 shadow-lg relative overflow-hidden">
          
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#b48332]/25 text-[#f5d799] border border-[#c8a46b]/40 mb-3">
              <Trophy className="w-3 h-3 text-[#f5d799]" />
              <span>Official Campaign Prize</span>
            </span>

            <h2 className="font-serif font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
              THE PRIZE: <span className="text-[#ffd88d]">100% REFUND</span>
            </h2>

            <p className="text-sm sm:text-base text-[#e2e8f0] leading-relaxed mb-4">
              One winner will receive a <strong>100% refund of the eligible FileWise visa costs</strong> associated with their winning qualifying application.
            </p>

            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-6">
              This includes eligible amounts charged by FileWise for the qualifying visa application, including the FileWise service fee and eligible visa-related costs included on the qualifying FileWise invoice, subject to the official Terms &amp; Conditions.
            </p>

            {/* Clear Exclusions & Sovereign Authority Disclaimer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-[#f5d799] shrink-0" />
                  <span>Travel Costs Excluded</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] leading-normal">
                  The prize does not include flights, accommodation, match tickets, travel insurance, spending money or other travel expenses.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00a3e0] shrink-0" />
                  <span>Visa Decisions Independent</span>
                </div>
                <p className="text-[11px] text-[#94a3b8] leading-normal">
                  Winning does not guarantee visa approval. The relevant immigration authority remains responsible for deciding whether a visa application is approved.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. THE LIVE DRAW & COMPETITION PERIOD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* THE LIVE DRAW */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c8a46b]/35 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#fbf4e8] border border-[#dfbe87] flex items-center justify-center text-[#8a5716]">
                <Tv className="w-5 h-5" />
              </div>
              <h2 className="font-serif font-bold text-xl text-[#2b241d] tracking-tight">
                THE LIVE DRAW
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-3">
              One winning FileWise entry will be selected through a random draw.
            </p>

            <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-3">
              The draw will be livestreamed on FileWise's social media channels, including <strong>TikTok</strong> (<a href="https://www.tiktok.com/@filewise8" target="_blank" rel="noopener noreferrer" className="text-[#8a5716] font-semibold underline">@filewise8</a>) and <strong>YouTube</strong> (<a href="https://www.youtube.com/@Filewise_ZA" target="_blank" rel="noopener noreferrer" className="text-[#8a5716] font-semibold underline">@Filewise_ZA</a>).
            </p>

            <div className="bg-[#fbf4e8] border border-[#dfbe87] rounded-xl p-3.5 mb-3 text-xs text-[#5c5044] space-y-1">
              <p className="font-black text-xs uppercase tracking-wider text-[#8a5716]">
                Official Live Draw Date &amp; Time:
              </p>
              <p className="font-serif font-extrabold text-base sm:text-lg text-[#2b241d]">
                04 September 2027 at 18:00 (SAST)
              </p>
              <p className="text-[#7a6b5e] text-xs">
                Livestreamed on FileWise's official TikTok and YouTube channels with independent verification.
              </p>
            </div>

            <div className="flex items-start gap-2 text-xs text-[#7a6b5e]">
              <ShieldCheck className="w-4 h-4 text-[#8a5716] shrink-0 mt-0.5" />
              <span>
                The competition will be independently overseen in accordance with the applicable South African promotional-competition requirements.
              </span>
            </div>
          </section>

          {/* COMPETITION PERIOD */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#c8a46b]/35 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#fbf4e8] border border-[#dfbe87] flex items-center justify-center text-[#8a5716]">
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 className="font-serif font-bold text-xl text-[#2b241d] tracking-tight">
                  COMPETITION PERIOD
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fbf4e8] to-[#f5ead6] border border-[#dfbe87] mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#8a5716] block">
                  Promotional Window
                </span>
                <span className="font-serif font-extrabold text-xl sm:text-2xl text-[#2b241d] tracking-tight">
                  01 OCTOBER 2026 – 31 AUGUST 2027
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-4">
                Qualifying visa applications paid during the promotional period will be eligible for the competition, subject to the official Terms &amp; Conditions.
              </p>

              <div className="bg-[#faf8f5] rounded-xl p-3 border border-[#c8a46b]/30 text-xs text-[#7a6b5e] leading-relaxed">
                <strong>Pre-Launch Notice:</strong> This campaign is currently scheduled and ready for launch on 01 October 2026. Paid applications made prior to 01 October 2026 are not eligible for this giveaway.
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#f0e6d6]">
              <button
                onClick={() => setIsTermsModalOpen(true)}
                className="text-xs font-bold text-[#8a5716] hover:text-[#b48332] underline cursor-pointer"
              >
                Review official timeline in T&amp;Cs
              </button>
            </div>
          </section>

        </div>

        {/* 5. RUGBY WORLD CUP 2027 CONNECTION */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#c8a46b]/35 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9e7127] bg-[#fbf4e8] border border-[#dfbe87] px-3 py-1 rounded-full">
                Campaign Connection
              </span>
              <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2b241d] tracking-tight mt-3 mb-4">
                GET READY FOR AUSTRALIA 2027
              </h2>

              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-4">
                Men's Rugby World Cup 2027 takes place in Australia from <strong>1 October to 13 November 2027</strong>.
              </p>

              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-6">
                FileWise's promotion gives its qualifying visa customers a chance to have their eligible visa costs refunded while getting ready for their next international adventure.
              </p>

              {/* Official Legal Affiliation Disclaimer */}
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#c8a46b]/30 text-xs text-[#7a6b5e] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#8a5716] shrink-0 mt-0.5" />
                <p>
                  <strong>Independent Consular Service Disclaimer:</strong> FileWise is an independent South African visa consultancy and document legalisation service. FileWise is not affiliated with, endorsed by, sponsored by, or an official partner of World Rugby or Rugby World Cup 2027.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md border border-[#c8a46b]/40 bg-[#09150f]">
              <img
                src="/rugby-match-action.jpg"
                alt="Atmospheric rugby match field under stadium floodlights"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 lg:h-72 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold flex items-center justify-between">
                <span className="bg-[#b48332] px-2.5 py-1 rounded-md text-[11px] font-bold text-white shadow-xs">
                  Australia 2027
                </span>
                <span className="text-[10px] text-white/80">01 Oct – 13 Nov 2027</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. TERMS & CONDITIONS PROMINENT SECTION */}
        <section className="text-center bg-[#fdfcf9] rounded-3xl p-8 sm:p-12 border-2 border-[#c8a46b]/40 shadow-sm max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fbf4e8] border border-[#dfbe87] flex items-center justify-center text-[#8a5716] mx-auto shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="font-serif font-extrabold text-2xl sm:text-3xl text-[#2b241d] tracking-tight">
            OFFICIAL COMPETITION RULES
          </h2>

          <p className="text-xs sm:text-sm text-[#5c5044] max-w-xl mx-auto leading-relaxed">
            The full official competition terms and conditions govern all aspects of eligibility, entry validation, invoice requirements, draw mechanics, winner verification, and refund procedures.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsTermsModalOpen(true)}
              id="view-full-terms-btn"
              className="inline-flex items-center gap-2 bg-[#2b241d] hover:bg-[#44382e] text-[#fbf4e8] font-bold text-sm px-7 py-3.5 rounded-xl shadow-sm border border-[#c8a46b] transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#dfbe87]" />
              <span>VIEW FULL TERMS &amp; CONDITIONS</span>
            </button>
          </div>

          <p className="text-[11px] text-[#7a6b5e] pt-1">
            Rules published in accordance with the Consumer Protection Act of South Africa.
          </p>
        </section>

        {/* FAQ Accordion for Quick Reference */}
        <section className="max-w-3xl mx-auto space-y-3">
          <h3 className="font-serif font-bold text-xl text-[#2b241d] mb-4 text-center">
            Frequently Asked Questions
          </h3>

          {[
            {
              q: "Does any visa application qualify, or only Australia/NZ?",
              a: "Any qualifying paid visa application to any destination processed by FileWise during the promotional window (01 October 2026 to 31 August 2027) may qualify, including Australia, New Zealand, the United Kingdom, USA, Canada, Schengen/Europe, and Gulf nations, subject to the official Terms & Conditions."
            },
            {
              q: "How do I get an entry?",
              a: "Your FileWise invoice is your entry. Once your qualifying visa invoice is paid in full between 01 October 2026 and 31 August 2027, your reference number is automatically recorded in the official competition register. Splitting a single transaction into multiple invoices is not permitted."
            },
            {
              q: "What does the 100% refund cover?",
              a: "The prize consists of a 100% refund of the eligible FileWise visa costs billed and paid on the winning invoice (including FileWise service fees and eligible consular visa costs). It does not include flights, match tickets, hotel accommodation, travel insurance, or other third-party travel costs."
            },
            {
              q: "Does winning guarantee my visa will be approved?",
              a: "No. Winning does not influence, expedite, or guarantee visa approval. Sovereign immigration departments and consulates retain sole, exclusive discretion over all visa approvals."
            },
            {
              q: "How will the live draw be conducted?",
              a: "The draw will take place on 04 September 2027 at 18:00 (SAST). It will be independently audited and livestreamed on FileWise's official social media channels, including TikTok and YouTube."
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl border border-[#c8a46b]/30 overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-4 text-left font-serif font-bold text-sm text-[#2b241d] hover:bg-[#faf8f5] transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#8a5716] transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="p-4 pt-0 text-xs text-[#5c5044] leading-relaxed border-t border-[#f0e6d6] bg-[#fdfcf9]">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </section>

      </div>
      </>
      )}

      {/* FULL TERMS & CONDITIONS MODAL */}
      <AnimatePresence>
        {isTermsModalOpen && (
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTermsModalOpen(false)}
              className="fixed inset-0 bg-[#040811]/85 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-[#c8a46b]/40 flex flex-col overflow-hidden z-10 text-[#2b241d]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-[#0b121e] text-white border-b border-[#c8a46b]/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#dfbe87] block">
                    Official Promotional Competition Rules
                  </span>
                  <h3 id="terms-modal-title" className="font-serif font-bold text-lg sm:text-xl text-white">
                    FILEWISE RUGBY WORLD CUP 2027 VISA GIVEAWAY TERMS &amp; CONDITIONS
                  </h3>
                </div>

                <button
                  onClick={() => setIsTermsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#b48332] text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Terms & Conditions"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Rules Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#4c4035] leading-relaxed">
                
                <div className="p-4 bg-[#fbf4e8] rounded-2xl border border-[#dfbe87] text-xs text-[#8a5716]">
                  <strong>Official Competition Notice:</strong> These terms and conditions ("Rules") govern the FileWise Rugby World Cup 2027 Visa Giveaway. By participating in this promotional competition, entrants agree to be bound by these official rules and all applicable statutory regulations of the Republic of South Africa.
                </div>

                {/* 1. Promoter Information */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    1. Promoter Information
                  </h4>
                  <p>
                    The promoter of this competition is Filewise Legalisation Solutions ("FileWise"), having its primary consular processing operations situated in Pretoria, Gauteng, Republic of South Africa (Email: <a href="mailto:info@filewise.co.za" className="text-[#8a5716] font-semibold underline">info@filewise.co.za</a>, Website: <a href="https://www.filewise.co.za" className="text-[#8a5716] font-semibold underline">filewise.co.za</a>, Telephone: +27 50 215 4465).
                  </p>
                </div>

                {/* 2. Competition Period */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    2. Competition Period
                  </h4>
                  <p>
                    The competition commences at <strong>00:00 South African Standard Time (SAST) on 01 October 2026</strong> and closes at <strong>23:59 SAST on 31 August 2027</strong> ("Promotional Period"). No visa applications paid prior to or subsequent to the Promotional Period shall qualify for inclusion.
                  </p>
                </div>

                {/* 3. Eligibility */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    3. Eligibility
                  </h4>
                  <p>
                    The competition is open to natural persons aged 18 (eighteen) years or older, or legal guardians acting on behalf of minors, who instruct FileWise for qualifying outbound visa services. Directors, members, partners, employees, agents, or consultants of FileWise and their immediate family members (spouses, life partners, parents, children, brothers, sisters) are excluded from participating.
                  </p>
                </div>

                {/* 4. Qualifying Visa Applications */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    4. Qualifying Visa Applications
                  </h4>
                  <p>
                    A qualifying visa application includes any international outbound tourist, visitor, transit, business, or visitor visa service actively offered and managed by FileWise. Destinations include, but are not limited to, Australia, New Zealand, the United Kingdom, the United States of America, Canada, Schengen Area Member States, the United Arab Emirates, and other territories where FileWise provides consular submission support.
                  </p>
                </div>

                {/* 5. Entry Requirements & Mechanism */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    5. Entry Requirements &amp; Invoice Mechanism
                  </h4>
                  <p className="mb-2">
                    <strong>YOUR FILEWISE INVOICE IS YOUR ENTRY.</strong> Participation is automatic upon receipt of full payment for a qualifying FileWise invoice issued within the Promotional Period.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>The customer must submit the requisite application information to FileWise.</li>
                    <li>An official FileWise invoice must be issued during the Promotional Period.</li>
                    <li>The invoice must be settled in full via approved payment channels (Electronic Funds Transfer or official PayPal gateway).</li>
                    <li>Each fully paid qualifying invoice reference number is automatically recorded in the competition register.</li>
                  </ul>
                </div>

                {/* 6. Multiple Qualifying Applications & Anti-Splitting Provision */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    6. Multiple Applications &amp; Prohibition of Invoice Splitting
                  </h4>
                  <p>
                    Where a customer legitimately requires and completes multiple separate qualifying visa applications (for example, distinct individual applications for separate family members or multiple separate itineraries), each qualifying paid invoice shall constitute a separate valid entry into the register.
                  </p>
                  <p className="mt-1.5 p-2.5 bg-[#fbf4e8] border border-[#dfbe87] rounded-lg text-xs font-medium text-[#8a5716]">
                    <strong>Strict Anti-Splitting Clause:</strong> Entrants are strictly prohibited from attempting to generate multiple entries by splitting a single ordinary transaction, fee schedule, or visa matter into multiple partial or divided invoices. Any artificial splitting of invoices will void all associated entries.
                  </p>
                </div>

                {/* 7. Prize Definition */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    7. Prize Definition
                  </h4>
                  <p>
                    There will be exactly <strong>one (1) winner</strong>. The prize consists of a <strong>100% refund of the eligible FileWise visa costs</strong> charged by FileWise on the winning qualifying invoice. This includes FileWise service fees and eligible consular/visa-related disbursements itemised on the qualifying FileWise invoice.
                  </p>
                  <p className="mt-1 text-xs text-[#7a6b5e]">
                    <strong>Exclusions:</strong> The prize strictly excludes flights, hotel or lodge accommodation, tournament or match tickets, airport transfers, travel insurance, car rentals, luggage costs, food, spending money, or any other personal expenses.
                  </p>
                </div>

                {/* 8. Visa Approval Limitations */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    8. Visa Approval Limitations &amp; Sovereign Authority
                  </h4>
                  <p>
                    Entering or winning this promotional competition does <strong>not</strong> guarantee, expedite, or influence the approval of any visa application. Consular authorities, high commissions, embassies, and sovereign immigration departments retain exclusive, sovereign discretion over visa approvals. FileWise accepts no liability for decisions made by any immigration department.
                  </p>
                </div>

                {/* 9. Draw Procedure, Live Stream & Independent Oversight */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    9. Draw Procedure, Live Stream &amp; Independent Oversight
                  </h4>
                  <p>
                    One winning entry will be selected by random draw from all verified qualifying entries. The live broadcast draw will take place on <strong>04 September 2027 at 18:00 (SAST)</strong> across FileWise official social channels, including TikTok and YouTube. The draw will be independently audited and overseen by an independent legal practitioner or certified auditor in full compliance with the South African Consumer Protection Act (Act 68 of 2008) and applicable Promotional Competition Regulations.
                  </p>
                </div>

                {/* 10. Winner Verification & Notification */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    10. Winner Verification &amp; Notification
                  </h4>
                  <p>
                    The provisional winner will be notified via telephone, WhatsApp, and registered email within five (5) business days following the draw. The provisional winner must provide verified identity documentation matching the invoice records. If a provisional winner cannot be reached after three (3) reasonable attempts within fourteen (14) calendar days, or is disqualified under these Rules, FileWise reserves the right to draw an alternate winner.
                  </p>
                </div>

                {/* 11. Refund Procedure */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    11. Refund Procedure
                  </h4>
                  <p>
                    Upon successful identity and invoice verification, the 100% refund of the eligible invoice value will be disbursed within thirty (30) calendar days via electronic funds transfer (EFT) into the verified South African bank account from which payment originated, or reversed through the original payment gateway.
                  </p>
                </div>

                {/* 12. Privacy & POPIA Compliance */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    12. Privacy &amp; Data Protection (POPIA)
                  </h4>
                  <p>
                    All personal data collected will be processed strictly in accordance with the Protection of Personal Information Act (Act 4 of 2013) ("POPIA"). Information will be used exclusively for the administration of this promotional competition and related visa services. The winner may decline consent to have their name and likeness published on social channels without forfeiting their prize.
                  </p>
                </div>

                {/* 13. Tournament & Non-Affiliation Disclaimer */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    13. Non-Affiliation Disclaimer
                  </h4>
                  <p>
                    This promotion is organized exclusively by FileWise. FileWise is not affiliated with, endorsed by, sponsored by, or an official partner of World Rugby, Rugby World Cup Limited, or Rugby World Cup 2027. All references to Rugby World Cup 2027 are purely descriptive of the international sporting calendar event.
                  </p>
                </div>

                {/* 14. Applicable Law & Copies of Rules */}
                <div>
                  <h4 className="font-serif font-bold text-base text-[#2b241d] mb-1.5 uppercase">
                    14. Applicable Law &amp; Full Rules Availability
                  </h4>
                  <p>
                    These Rules are governed by and construed in accordance with the laws of the Republic of South Africa. A copy of these rules is published on <a href="https://www.filewise.co.za" className="text-[#8a5716] font-semibold underline">filewise.co.za</a> and may be obtained free of charge upon written request addressed to <a href="mailto:info@filewise.co.za" className="text-[#8a5716] font-semibold underline">info@filewise.co.za</a>.
                  </p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-[#faf8f5] border-t border-[#c8a46b]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-[#7a6b5e]">
                  FileWise Promotional Competition • South Africa
                </span>
                <button
                  onClick={() => setIsTermsModalOpen(false)}
                  className="bg-[#2b241d] hover:bg-[#44382e] text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Close &amp; Return to Competition
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
