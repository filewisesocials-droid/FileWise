import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { CountryDirectory } from './components/CountryDirectory';
import { InquiryForm } from './components/InquiryForm';
import { TrackingView } from './components/TrackingView';
import { ServicesOverview } from './components/ServicesOverview';
import { FaqSection } from './components/FaqSection';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { TermsAndConditions } from './components/TermsAndConditions';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'inquiry' | 'tracking' | 'services' | 'faq' | 'about' | 'terms' | 'contact'>('search');
  
  const [inquiryDest, setInquiryDest] = useState('AE');
  const [activeTrackId, setActiveTrackId] = useState('FW-98214');

  // Automatically scroll to top whenever navigation tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleStartInquiry = (destCode: string) => {
    setInquiryDest(destCode);
    setActiveTab('inquiry');
  };

  const handleOpenQuickTrack = (trackId: string) => {
    setActiveTrackId(trackId);
    setActiveTab('tracking');
  };

  const handleInquirySubmitted = (trackId: string) => {
    setActiveTrackId(trackId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-amber-300">
      
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickTrack={handleOpenQuickTrack}
      />

      {/* Main Content Body */}
      <main>
        {activeTab === 'search' && (
          <>
            <HeroSearch
              onStartInquiry={handleStartInquiry}
            />

            <CountryDirectory
              onSelectCountryForInquiry={handleStartInquiry}
            />

            <ServicesOverview
              onSelectService={() => setActiveTab('inquiry')}
            />

            <FaqSection />
          </>
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
          <ContactUs onStartInquiry={() => setActiveTab('inquiry')} />
        )}

        {activeTab === 'terms' && (
          <TermsAndConditions onStartInquiry={() => setActiveTab('inquiry')} />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
