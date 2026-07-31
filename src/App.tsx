import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { CountryDirectory } from './components/CountryDirectory';
import { QuoteCalculator } from './components/QuoteCalculator';
import { DocumentAiAdvisor } from './components/DocumentAiAdvisor';
import { TrackingView } from './components/TrackingView';
import { ServicesOverview } from './components/ServicesOverview';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'search' | 'calculator' | 'ai' | 'tracking' | 'services' | 'faq'>('search');
  
  const [quoteOrigin, setQuoteOrigin] = useState('GB');
  const [quoteDest, setQuoteDest] = useState('AE');
  
  const [aiOrigin, setAiOrigin] = useState('United Kingdom');
  const [aiDest, setAiDest] = useState('United Arab Emirates');

  const [activeTrackId, setActiveTrackId] = useState('FW-98214');

  const handleSelectPairFromHero = (originCode: string, destCode: string) => {
    setQuoteOrigin(originCode);
    setQuoteDest(destCode);
    setActiveTab('calculator');
  };

  const handleStartQuote = (originCode: string, destCode: string) => {
    setQuoteOrigin(originCode);
    setQuoteDest(destCode);
    setActiveTab('calculator');
  };

  const handleAskAiFromHero = (originCode: string, destCode: string) => {
    setAiOrigin(originCode);
    setAiDest(destCode);
    setActiveTab('ai');
  };

  const handleSelectCountryForQuote = (originCode: string) => {
    setQuoteOrigin(originCode);
    setActiveTab('calculator');
  };

  const handleAskAiForCountry = (countryName: string) => {
    setAiOrigin(countryName);
    setActiveTab('ai');
  };

  const handleOpenQuickTrack = (trackId: string) => {
    setActiveTrackId(trackId);
    setActiveTab('tracking');
  };

  const handleOrderCreated = (trackId: string) => {
    setActiveTrackId(trackId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
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
              onSelectPair={handleSelectPairFromHero}
              onStartQuote={handleStartQuote}
              onAskAi={handleAskAiFromHero}
            />

            <CountryDirectory
              onSelectCountryForQuote={handleSelectCountryForQuote}
              onAskAiForCountry={handleAskAiForCountry}
            />

            <ServicesOverview
              onSelectService={() => setActiveTab('calculator')}
            />

            <FaqSection />
          </>
        )}

        {activeTab === 'calculator' && (
          <QuoteCalculator
            initialOriginCode={quoteOrigin}
            initialDestCode={quoteDest}
            onOrderCreated={handleOrderCreated}
          />
        )}

        {activeTab === 'ai' && (
          <DocumentAiAdvisor
            initialOrigin={aiOrigin}
            initialDest={aiDest}
          />
        )}

        {activeTab === 'tracking' && (
          <TrackingView
            initialTrackId={activeTrackId}
            onStartNewQuote={() => setActiveTab('calculator')}
          />
        )}

        {activeTab === 'services' && (
          <>
            <ServicesOverview
              onSelectService={() => setActiveTab('calculator')}
            />
            <FaqSection />
          </>
        )}

        {activeTab === 'faq' && (
          <FaqSection />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
