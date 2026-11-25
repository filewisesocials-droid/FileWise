import React, { useState, useEffect, useCallback } from 'react';
import { Header, type AppTab } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { CountryDirectory } from './components/CountryDirectory';
import { InquiryForm } from './components/InquiryForm';
import { TrackingView } from './components/TrackingView';
import { ServicesOverview } from './components/ServicesOverview';
import { FaqSection } from './components/FaqSection';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { TermsAndConditions } from './components/TermsAndConditions';
import { PaymentsView } from './components/PaymentsView';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { CompetitionPromoModal } from './components/CompetitionPromoModal';
import { CompetitionPage } from './components/CompetitionPage';
import { WorldwideVisaCountriesPage } from './components/WorldwideVisaCountriesPage';

function getInitialTab(): AppTab {
  if (typeof window !== 'undefined') {
    const normalized = window.location.pathname.replace(/\/+$/, '');
    if (normalized === '/countries') {
      return 'countries';
    }
  }
  return 'search';
}

export default function App() {
  const [activeTab, setActiveTabState] = useState<AppTab>(getInitialTab);

  const [inquiryDest, setInquiryDest] = useState('AE');
  const [activeTrackId, setActiveTrackId] = useState('FW-98214');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPromoOpen, setIsPromoOpen] = useState(true);

  const setActiveTab = useCallback((tab: AppTab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
      const targetPath = tab === 'countries' ? '/countries' : '/';
      if (currentPath !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  }, []);

  // Sync browser back/forward buttons with /countries route
  useEffect(() => {
    const handlePopState = () => {
      const normalized = window.location.pathname.replace(/\/+$/, '');
      setActiveTabState(normalized === '/countries' ? 'countries' : 'search');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Automatically scroll to top whenever navigation tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleStartInquiry = (destCode: string) => {
    setInquiryDest(destCode);
    setActiveTab('inquiry');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleOpenQuickTrack = (trackId: string) => {
    setActiveTrackId(trackId);
    setActiveTab('tracking');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleInquirySubmitted = (trackId: string) => {
    setActiveTrackId(trackId);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c241c] font-sans selection:bg-[#b48332] selection:text-white">
      
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickTrack={handleOpenQuickTrack}
        onOpenPayment={() => setIsPaymentOpen(true)}
      />

      {/* Main Content Body */}
      <main>
        {activeTab === 'search' && (
          <>
            <HeroSearch
              onStartInquiry={handleStartInquiry}
              onBrowseCountries={() => setActiveTab('countries')}
            />

            <CountryDirectory
              onSelectCountryForInquiry={handleStartInquiry}
              onBrowseAllCountries={() => setActiveTab('countries')}
            />

            <ServicesOverview
              onSelectService={() => setActiveTab('inquiry')}
            />

            <FaqSection />
          </>
        )}

        {activeTab === 'countries' && (
          <WorldwideVisaCountriesPage
            onStartInquiry={handleStartInquiry}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'inquiry' && (
          <InquiryForm
            initialDestCode={inquiryDest}
            onInquirySubmitted={handleInquirySubmitted}
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingView
            initialTrackId={activeTrackId}
            onStartNewInquiry={() => setActiveTab('inquiry')}
          />
        )}

        {activeTab === 'services' && (
          <>
            <ServicesOverview
              onSelectService={() => setActiveTab('inquiry')}
            />
            <FaqSection />
          </>
        )}

        {activeTab === 'faq' && (
          <FaqSection />
        )}

        {activeTab === 'about' && (
          <AboutUs onStartInquiry={() => setActiveTab('inquiry')} />
        )}

        {activeTab === 'contact' && (
          <ContactUs 
            onStartInquiry={() => setActiveTab('inquiry')} 
            onNavigateToPayments={() => setActiveTab('payments')}
          />
        )}

        {activeTab === 'terms' && (
          <TermsAndConditions onStartInquiry={() => setActiveTab('inquiry')} />
        )}

        {activeTab === 'payments' && (
          <PaymentsView onStartInquiry={() => setActiveTab('inquiry')} />
        )}

        {(activeTab === 'competitions' || activeTab === 'competition') && (
          <CompetitionPage 
            onStartInquiry={handleStartInquiry}
            onOpenPayment={() => setIsPaymentOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenPayment={() => setIsPaymentOpen(true)}
      />

      {/* Official PayPal Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        prefilledRef={activeTrackId}
      />

      {/* FileWise Rugby World Cup 2027 Visa Giveaway Promotional Modal */}
      <CompetitionPromoModal
        isOpen={isPromoOpen}
        onClose={() => setIsPromoOpen(false)}
        onViewCompetition={() => {
          setIsPromoOpen(false);
          setActiveTab('competitions');
        }}
        onViewTerms={() => {
          setIsPromoOpen(false);
          setActiveTab('competitions');
        }}
      />

    </div>
  );
}
