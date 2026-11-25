import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Globe,
  Search,
  X,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  ClipboardList,
  FolderCheck,
  Compass,
  ArrowRight,
  Building2,
  ChevronRight,
  Info,
  Mail,
  Stamp,
  FileText,
} from 'lucide-react';
import {
  WORLDWIDE_DESTINATIONS,
  WORLDWIDE_REGIONS,
  FEATURED_REGION_GROUPS,
  VISA_STATUS_OPTIONS,
  DIRCO_FOREIGN_MISSIONS_URL,
  type WorldwideDestination,
  type WorldwideRegion,
  type FeaturedRegionGroup,
  type VisaStatusLabel,
} from '../data/worldwideVisaCountries';

export type NavTabTarget =
  | 'search'
  | 'countries'
  | 'inquiry'
  | 'tracking'
  | 'services'
  | 'faq'
  | 'about'
  | 'terms'
  | 'contact'
  | 'payments'
  | 'competitions'
  | 'competition';

interface WorldwideVisaCountriesPageProps {
  onStartInquiry: (destCode: string) => void;
  onNavigate: (tab: NavTabTarget) => void;
}

const DEFAULT_TITLE = 'FileWise | Visa Services, Document Legalisation & DIRCO Apostille';
const DEFAULT_DESCRIPTION =
  'FileWise is a South African visa and document legalisation service assisting clients with international visa applications, DIRCO Hague apostilles, embassy attestations, and sworn translations.';
const DEFAULT_CANONICAL = 'https://www.filewise.co.za/';

const COUNTRIES_PAGE_TITLE =
  'International Visa Assistance – Countries We Cover | FileWise South Africa';
const COUNTRIES_PAGE_DESCRIPTION =
  'Need help with an international visa application as a South African passport holder? Explore destinations where advance visas or travel authorisations are required, and separate SA document legalisation services.';
const COUNTRIES_PAGE_CANONICAL = 'https://www.filewise.co.za/countries';

type RegionFilter = 'ALL' | WorldwideRegion | 'TERRITORIES';
type StatusFilter = 'ALL' | VisaStatusLabel;
type DirectoryViewMode = 'REGIONS' | 'ALPHABETICAL';

const ASSISTANCE_AREAS = [
  {
    title: 'Document preparation and organisation',
    description:
      'Structuring your supporting pack cleanly into clear digital and physical sets ready for submission.',
    icon: FolderCheck,
  },
  {
    title: 'Application form assistance',
    description:
      'Methodical help completing destination visa application forms accurately and consistently.',
    icon: ClipboardList,
  },
  {
    title: 'Document checking',
    description:
      'Reviewing dates, passport validity, naming consistency, and supporting attachments before you submit.',
    icon: FileCheck2,
  },
  {
    title: 'Guidance on application requirements',
    description:
      'Clarifying standard supporting documentation categories relevant to your destination and travel purpose.',
    icon: Compass,
  },
  {
    title: 'Assistance with supporting documentation',
    description:
      'Coordinating South African civil certificates or police clearances needed for long-stay, work, or study files.',
    icon: ShieldCheck,
  },
  {
    title: 'General application process guidance',
    description:
      'Walking you through typical submission, appointment, and biometric steps from South Africa.',
    icon: Info,
  },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const FEATURED_GROUP_DESCRIPTIONS: Record<FeaturedRegionGroup, string> = {
  'North America': 'Major long-haul hubs where South African ordinary passport holders require advance visas.',
  Oceania: 'High-demand destinations requiring pre-approved Visitor, work, or study visas before travel.',
  Europe: 'United Kingdom, Ireland, and Schengen destinations requiring advance visa applications from SA.',
  Asia: 'Key Asian destinations requiring advance consular visas, e-Visas, electronic authorisations, or long-stay permits.',
  'Middle East and Arabian destinations':
    'Gulf and Middle Eastern destinations with advance visas, e-Visas/ETAs, or sponsored work and residence permits.',
};

function getStatusAccentClass(status: VisaStatusLabel): string {
  switch (status) {
    case 'Advance visa commonly required.':
      return 'text-[#8a5716]';
    case 'Electronic visa or travel authorisation.':
      return 'text-[#2c5282]';
    case 'Visa-free for ordinary short visits.':
      return 'text-[#276749]';
    case 'Requirements vary; check before travelling.':
      return 'text-[#6f6154]';
  }
}

function getStatusDotClass(status: VisaStatusLabel): string {
  switch (status) {
    case 'Advance visa commonly required.':
      return 'bg-[#b48332]';
    case 'Electronic visa or travel authorisation.':
      return 'bg-[#2b6cb0]';
    case 'Visa-free for ordinary short visits.':
      return 'bg-[#2f855a]';
    case 'Requirements vary; check before travelling.':
      return 'bg-[#8c7b6d]';
  }
}

export const WorldwideVisaCountriesPage: React.FC<WorldwideVisaCountriesPageProps> = ({
  onStartInquiry,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<RegionFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [viewMode, setViewMode] = useState<DirectoryViewMode>('REGIONS');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<WorldwideDestination | null>(null);

  // Sync SEO meta tags, canonical URL, and Schema.org JSON-LD while this page is active
  useEffect(() => {
    const prevTitle = document.title;
    document.title = COUNTRIES_PAGE_TITLE;

    const setMetaContent = (selector: string, content: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute('content', content);
    };

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.setAttribute('href', COUNTRIES_PAGE_CANONICAL);

    setMetaContent('meta[name="title"]', COUNTRIES_PAGE_TITLE);
    setMetaContent('meta[name="description"]', COUNTRIES_PAGE_DESCRIPTION);
    setMetaContent('meta[property="og:url"]', COUNTRIES_PAGE_CANONICAL);
    setMetaContent('meta[property="og:title"]', COUNTRIES_PAGE_TITLE);
    setMetaContent('meta[property="og:description"]', COUNTRIES_PAGE_DESCRIPTION);
    setMetaContent('meta[name="twitter:url"]', COUNTRIES_PAGE_CANONICAL);
    setMetaContent('meta[name="twitter:title"]', COUNTRIES_PAGE_TITLE);
    setMetaContent('meta[name="twitter:description"]', COUNTRIES_PAGE_DESCRIPTION);

    const scriptId = 'filewise-countries-jsonld';
    let ldScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = scriptId;
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.filewise.co.za/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Countries We Assist With',
            item: COUNTRIES_PAGE_CANONICAL,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'International Visa Application Assistance for South African Passport Holders',
        serviceType: 'Visa Application Preparation and Supporting Documentation Assistance',
        provider: {
          '@type': 'Organization',
          name: 'FileWise',
          url: 'https://www.filewise.co.za/',
          email: 'info@filewise.co.za',
          telephone: '+27 50 215 4465',
          areaServed: {
            '@type': 'Country',
            name: 'South Africa',
          },
        },
        areaServed: 'Worldwide',
        url: COUNTRIES_PAGE_CANONICAL,
        description: COUNTRIES_PAGE_DESCRIPTION,
      },
    ];
    ldScript.textContent = JSON.stringify(structuredData);

    return () => {
      document.title = prevTitle || DEFAULT_TITLE;
      if (canonicalEl) canonicalEl.setAttribute('href', DEFAULT_CANONICAL);
      setMetaContent('meta[name="title"]', DEFAULT_TITLE);
      setMetaContent('meta[name="description"]', DEFAULT_DESCRIPTION);
      setMetaContent('meta[property="og:url"]', DEFAULT_CANONICAL);
      setMetaContent('meta[property="og:title"]', DEFAULT_TITLE);
      setMetaContent('meta[property="og:description"]', DEFAULT_DESCRIPTION);
      setMetaContent('meta[name="twitter:url"]', DEFAULT_CANONICAL);
      setMetaContent('meta[name="twitter:title"]', DEFAULT_TITLE);
      setMetaContent('meta[name="twitter:description"]', DEFAULT_DESCRIPTION);
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, []);

  // Close detail dialog on Escape
  useEffect(() => {
    if (!selectedCountry) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCountry(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCountry]);

  const advanceVisaCount = useMemo(
    () =>
      WORLDWIDE_DESTINATIONS.filter(
        (d) => d.visaStatus === 'Advance visa commonly required.'
      ).length,
    []
  );
  const eVisaCount = useMemo(
    () =>
      WORLDWIDE_DESTINATIONS.filter(
        (d) => d.visaStatus === 'Electronic visa or travel authorisation.'
      ).length,
    []
  );
  const territoryCount = useMemo(
    () => WORLDWIDE_DESTINATIONS.filter((d) => d.classification !== 'sovereign').length,
    []
  );

  const featuredByGroup = useMemo(() => {
    const map = new Map<FeaturedRegionGroup, WorldwideDestination[]>();
    FEATURED_REGION_GROUPS.forEach((g) => map.set(g, []));
    WORLDWIDE_DESTINATIONS.forEach((dest) => {
      if (dest.featuredGroup) {
        map.get(dest.featuredGroup)?.push(dest);
      }
    });
    map.forEach((items) => {
      items.sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));
    });
    return map;
  }, []);

  const filteredDestinations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return WORLDWIDE_DESTINATIONS.filter((dest) => {
      if (selectedFilter === 'TERRITORIES') {
        if (dest.classification === 'sovereign') return false;
      } else if (selectedFilter !== 'ALL') {
        if (dest.region !== selectedFilter) return false;
      }

      if (statusFilter !== 'ALL' && dest.visaStatus !== statusFilter) {
        return false;
      }

      if (!q) return true;

      const haystack = [
        dest.name,
        dest.displayName || '',
        dest.subtitle || '',
        dest.code,
        dest.region,
        dest.classificationLabel,
        dest.visaStatus,
        dest.visaStatusDetail,
        ...(dest.aliases || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [searchQuery, selectedFilter, statusFilter]);

  const regionalSections = useMemo(() => {
    const regionsToShow =
      selectedFilter !== 'ALL' && selectedFilter !== 'TERRITORIES'
        ? [selectedFilter]
        : WORLDWIDE_REGIONS;

    return regionsToShow
      .map((region) => {
        const items = filteredDestinations.filter((d) => d.region === region);
        const sovereign = items.filter((d) => d.classification === 'sovereign');
        const territories = items.filter((d) => d.classification !== 'sovereign');
        return {
          region,
          sovereign,
          territories,
          total: items.length,
        };
      })
      .filter((sec) => sec.total > 0);
  }, [filteredDestinations, selectedFilter]);

  const alphabeticalSections = useMemo(() => {
    const sorted = [...filteredDestinations].sort((a, b) => a.name.localeCompare(b.name));
    const grouped = new Map<string, WorldwideDestination[]>();

    sorted.forEach((dest) => {
      const firstChar = dest.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .charAt(0)
        .toUpperCase();
      if (!grouped.has(firstChar)) grouped.set(firstChar, []);
      grouped.get(firstChar)!.push(dest);
    });

    const entries = Array.from(grouped.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    if (activeLetter) {
      return entries.filter(([letter]) => letter === activeLetter);
    }
    return entries;
  }, [filteredDestinations, activeLetter]);

  const availableLetters = useMemo(() => {
    const set = new Set<string>();
    filteredDestinations.forEach((dest) => {
      const ch = dest.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .charAt(0)
        .toUpperCase();
      set.add(ch);
    });
    return set;
  }, [filteredDestinations]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedFilter('ALL');
    setStatusFilter('ALL');
    setActiveLetter(null);
  }, []);

  const buildWhatsAppUrl = (countryName?: string) => {
    const message = countryName
      ? `Hello FileWise Team, I hold a South African passport and would like visa application assistance for ${countryName}.`
      : 'Hello FileWise Team, I hold a South African passport and would like assistance preparing an international visa application.';
    return `https://api.whatsapp.com/send?phone=27502154465&text=${encodeURIComponent(message)}`;
  };

  const turkeyEntry = useMemo(
    () => WORLDWIDE_DESTINATIONS.find((d) => d.code === 'TR') || null,
    []
  );

  return (
    <div className="bg-[#faf8f5] text-[#2b241d] font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#fdfcf9] via-[#f9f5ed] to-[#f4eee2] border-b border-[#c8a46b]/40 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#7a6b5e]">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('search');
                  }}
                  className="hover:text-[#915e19] font-medium transition-colors"
                >
                  Home
                </a>
              </li>
              <li aria-hidden="true" className="text-[#c8a46b]">
                /
              </li>
              <li aria-current="page" className="text-[#2b241d] font-semibold">
                Countries We Assist With
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-[#8a5716]">
                For South African Ordinary Passport Holders &middot; Outbound Visa Assistance
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif font-bold text-[#2b241d] leading-tight tracking-tight">
                Countries We Assist With &ndash; Worldwide Visa Application Assistance
              </h1>

              <p className="text-[#4c4035] text-sm sm:text-base leading-relaxed max-w-3xl">
                FileWise assists South African passport holders preparing visa and travel
                authorisation applications for destinations where entry permission is required before
                travelling. Rather than listing visa-free destinations unnecessarily, this directory
                prioritises countries such as the United States, United Kingdom, Australia, New
                Zealand, Canada, Ireland, Schengen Europe, China, Japan, India, Vietnam, and key
                Middle Eastern hubs where advance preparation helps avoid delays.
              </p>

              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed max-w-3xl">
                Note: Neighbouring Southern African countries and other visa-free short-visit
                destinations (such as Namibia, Botswana, Lesotho, Eswatini, Zimbabwe, and
                Mozambique) are excluded from this visa list. If you need apostilles, legalisation,
                or sworn translations for documents bound for any country, see our{' '}
                <a
                  href="#document-legalisation-separation"
                  className="font-semibold text-[#8a5716] underline underline-offset-2 hover:text-[#2b241d]"
                >
                  Document Legalisation section below
                </a>
                .
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-sm border border-[#9a6d23] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Enquiry (+27 50 215 4465)</span>
                </a>

                <a
                  href="#worldwide-country-directory"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#fbf5eb] text-[#2b241d] text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl border border-[#c8a46b]/60 transition-colors shadow-2xs"
                >
                  <Search className="w-4 h-4 text-[#b48332]" />
                  <span>Search Visa Destinations</span>
                </a>
              </div>
            </div>

            {/* Clean Scope Summary Panel */}
            <aside className="lg:col-span-4 bg-white border border-[#dfcfb5] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#ebdcc4]">
                <Globe className="w-5 h-5 text-[#b48332] shrink-0" />
                <h2 className="font-serif font-bold text-base text-[#2b241d]">
                  SA Passport Focus
                </h2>
              </div>

              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-[#7a6b5e] font-semibold">
                    Advance Visa Listed
                  </dt>
                  <dd className="text-2xl font-serif font-bold text-[#2b241d] mt-0.5">
                    {advanceVisaCount}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-[#7a6b5e] font-semibold">
                    e-Visa / ETA Listed
                  </dt>
                  <dd className="text-2xl font-serif font-bold text-[#2b241d] mt-0.5">
                    {eVisaCount}
                  </dd>
                </div>
              </dl>

              <p className="text-xs text-[#5c5044] leading-relaxed border-t border-[#ebdcc4] pt-3">
                Every destination below carries an entry-status label for South African ordinary
                passport holders. Always confirm current rules against official embassy or
                immigration portals before booking.
              </p>

              <div className="text-[11px] text-[#7a6b5e] leading-relaxed">
                Click any destination below to see status notes, how FileWise assists, and official
                consular links.
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Featured Popular Visa Destinations */}
      <section
        aria-labelledby="featured-destinations-heading"
        className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#ebdcc4]">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8a5716] block">
              Priority Visa Destinations for South Africans
            </span>
            <h2
              id="featured-destinations-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-[#2b241d]"
            >
              Featured Visa Destinations
            </h2>
            <p className="text-sm text-[#5c5044] max-w-2xl">
              Destinations where South African citizens most commonly require advance visas,
              electronic travel authorisations, or work/long-stay permits before travelling.
            </p>
          </div>

          <a
            href="#worldwide-country-directory"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8a5716] hover:text-[#2b241d] transition-colors shrink-0"
          >
            <span>Jump to full directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-8">
          {FEATURED_REGION_GROUPS.map((group) => {
            const destinations = featuredByGroup.get(group) || [];
            if (destinations.length === 0) return null;

            return (
              <div
                key={group}
                className="bg-white border border-[#dfcfb5] rounded-2xl p-5 sm:p-6 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4 pb-3 border-b border-[#f0e6d6]">
                  <div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#2b241d]">
                      {group}
                    </h3>
                    <p className="text-xs text-[#6f6154] mt-0.5">
                      {FEATURED_GROUP_DESCRIPTIONS[group]}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#8a5716] shrink-0">
                    {destinations.length}{' '}
                    {destinations.length === 1 ? 'destination' : 'destinations'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {destinations.map((dest) => (
                    <button
                      key={`feat-${dest.code}`}
                      type="button"
                      onClick={() => setSelectedCountry(dest)}
                      className="group text-left p-3.5 rounded-xl bg-[#fdfcf9] hover:bg-[#fbf5eb] border border-[#e5d8c3] hover:border-[#b48332] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs flex items-start justify-between gap-2.5 cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span
                          className="text-2xl leading-none shrink-0 mt-0.5"
                          aria-hidden="true"
                        >
                          {dest.flag}
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-[#2b241d] group-hover:text-[#8a5716] transition-colors leading-snug">
                            {dest.displayName || dest.name}
                          </div>
                          <div
                            className={`flex items-center gap-1.5 text-[11px] font-semibold mt-1 leading-snug ${getStatusAccentClass(
                              dest.visaStatus
                            )}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusDotClass(
                                dest.visaStatus
                              )}`}
                              aria-hidden="true"
                            />
                            <span>{dest.visaStatus}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#b48332] shrink-0 mt-1 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Curated Worldwide Visa Destinations Directory */}
      <section
        id="worldwide-country-directory"
        aria-labelledby="worldwide-directory-heading"
        className="py-12 sm:py-14 bg-[#fdfcf9] border-y border-[#c8a46b]/35 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8a5716] block">
              Curated for South African Citizens
            </span>
            <h2
              id="worldwide-directory-heading"
              className="text-2xl sm:text-3xl font-serif font-bold text-[#2b241d]"
            >
              Visa &amp; Travel Authorisation Directory
            </h2>
            <p className="text-sm text-[#5c5044] leading-relaxed">
              Browse destinations by region, filter by entry status, or switch to an alphabetical
              A&ndash;Z list. Destinations where South African ordinary passport holders enjoy
              unrestricted visa-free short tourist entry are omitted to keep this directory focused
              on actual visa and permit requirements.
            </p>
          </div>

          {/* Search, Regional Filter, Status Filter & View Controls */}
          <div className="bg-white border border-[#c8a46b]/45 rounded-2xl p-4 sm:p-5 shadow-xs mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
              {/* Search Box */}
              <div className="relative flex-1">
                <label htmlFor="worldwide-country-search" className="sr-only">
                  Search visa destinations
                </label>
                <Search className="w-4 h-4 text-[#b48332] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="worldwide-country-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveLetter(null);
                  }}
                  placeholder="Search destination, ISO code, Schengen, e-Visa (e.g. UK, USA, Australia, Japan, Saudi Arabia)..."
                  className="w-full bg-[#faf8f5] border border-[#dfcfb5] focus:border-[#b48332] focus:bg-white rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#2b241d] placeholder-[#8c7b6d] focus:outline-none focus:ring-2 focus:ring-[#b48332]/20 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a6b5e] hover:text-[#2b241d] p-1 rounded-lg hover:bg-[#f4eedf]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* View Mode Switch */}
              <div
                role="group"
                aria-label="Directory layout view"
                className="flex items-center bg-[#f5f0e6] p-1 rounded-xl border border-[#dfcfb5] shrink-0"
              >
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('REGIONS');
                    setActiveLetter(null);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'REGIONS'
                      ? 'bg-white text-[#2b241d] shadow-2xs border border-[#c8a46b]/50 font-bold'
                      : 'text-[#5c5044] hover:text-[#2b241d]'
                  }`}
                >
                  By Geographical Region
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('ALPHABETICAL')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'ALPHABETICAL'
                      ? 'bg-white text-[#2b241d] shadow-2xs border border-[#c8a46b]/50 font-bold'
                      : 'text-[#5c5044] hover:text-[#2b241d]'
                  }`}
                >
                  Alphabetical A&ndash;Z
                </button>
              </div>
            </div>

            {/* Region Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap pt-3 border-t border-[#f0e6d6]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a6b5e] mr-1">
                Region:
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('ALL');
                  setActiveLetter(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedFilter === 'ALL'
                    ? 'bg-[#b48332] text-white font-bold shadow-2xs'
                    : 'bg-[#faf8f5] text-[#5c5044] hover:bg-[#f3ead8] border border-[#e5d8c3]'
                }`}
              >
                All ({WORLDWIDE_DESTINATIONS.length})
              </button>

              {WORLDWIDE_REGIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(region);
                    setActiveLetter(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedFilter === region
                      ? 'bg-[#b48332] text-white font-bold shadow-2xs'
                      : 'bg-[#faf8f5] text-[#5c5044] hover:bg-[#f3ead8] border border-[#e5d8c3]'
                  }`}
                >
                  {region}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('TERRITORIES');
                  setActiveLetter(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedFilter === 'TERRITORIES'
                    ? 'bg-[#2b241d] text-white font-bold shadow-2xs'
                    : 'bg-[#faf8f5] text-[#5c5044] hover:bg-[#f3ead8] border border-[#e5d8c3]'
                }`}
              >
                Territories &amp; Special Regions ({territoryCount})
              </button>
            </div>

            {/* Entry Status Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[#f4ece0]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7a6b5e] mr-1">
                Entry Status:
              </span>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('ALL');
                  setActiveLetter(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  statusFilter === 'ALL'
                    ? 'bg-[#2b241d] text-white font-bold'
                    : 'bg-[#faf8f5] text-[#5c5044] hover:bg-[#f3ead8] border border-[#e5d8c3]'
                }`}
              >
                All Statuses
              </button>
              {VISA_STATUS_OPTIONS.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setStatusFilter(status);
                    setActiveLetter(null);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === status
                      ? 'bg-[#2b241d] text-white font-bold'
                      : 'bg-[#faf8f5] text-[#5c5044] hover:bg-[#f3ead8] border border-[#e5d8c3]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusDotClass(status)}`}
                    aria-hidden="true"
                  />
                  <span>{status}</span>
                </button>
              ))}
            </div>

            {/* Result Counter & Alphabet Jump Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6f6154] pt-2 border-t border-[#f4ece0]">
              <div>
                Showing <strong className="text-[#2b241d]">{filteredDestinations.length}</strong>{' '}
                {filteredDestinations.length === 1 ? 'destination' : 'destinations'}
                {selectedFilter !== 'ALL' && (
                  <span>
                    {' '}
                    in{' '}
                    <strong className="text-[#2b241d]">
                      {selectedFilter === 'TERRITORIES'
                        ? 'Territories & Special Regions'
                        : selectedFilter}
                    </strong>
                  </span>
                )}
                {statusFilter !== 'ALL' && (
                  <span>
                    {' '}
                    &middot; <strong className="text-[#2b241d]">{statusFilter}</strong>
                  </span>
                )}
                {searchQuery.trim() && (
                  <span>
                    {' '}
                    matching &ldquo;<strong className="text-[#2b241d]">{searchQuery.trim()}</strong>
                    &rdquo;
                  </span>
                )}
              </div>

              {(searchQuery || selectedFilter !== 'ALL' || statusFilter !== 'ALL' || activeLetter) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#8a5716] hover:underline self-start sm:self-auto cursor-pointer"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {viewMode === 'ALPHABETICAL' && (
              <div
                aria-label="Alphabetical index filter"
                className="flex flex-wrap items-center gap-1 pt-2 border-t border-[#f4ece0]"
              >
                <button
                  type="button"
                  onClick={() => setActiveLetter(null)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    activeLetter === null
                      ? 'bg-[#b48332] text-white font-bold'
                      : 'text-[#5c5044] hover:bg-[#f3ead8]'
                  }`}
                >
                  All A&ndash;Z
                </button>
                {ALPHABET.map((letter) => {
                  const hasItems = availableLetters.has(letter);
                  const isActive = activeLetter === letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      disabled={!hasItems}
                      onClick={() => setActiveLetter(isActive ? null : letter)}
                      className={`w-7 h-7 rounded-md text-xs font-bold transition-colors ${
                        !hasItems
                          ? 'text-[#c2b5a6] cursor-not-allowed'
                          : isActive
                          ? 'bg-[#b48332] text-white shadow-2xs cursor-pointer'
                          : 'text-[#2b241d] hover:bg-[#fbf4e8] border border-transparent hover:border-[#dfcfb5] cursor-pointer'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Directory Listings */}
          {filteredDestinations.length === 0 ? (
            <div className="bg-white border border-[#dfcfb5] rounded-2xl p-8 sm:p-10 text-center max-w-2xl mx-auto space-y-4 shadow-xs">
              <Globe className="w-8 h-8 text-[#b48332] mx-auto" />
              <div className="space-y-1.5">
                <h3 className="text-lg font-serif font-bold text-[#2b241d]">
                  No listed visa destination matched &ldquo;{searchQuery || statusFilter}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed">
                  South African ordinary passport holders enjoy visa-free entry for short tourist
                  visits to several countries (including Namibia, Botswana, Lesotho, Eswatini,
                  Zimbabwe, Mozambique, Mauritius, Brazil, and Singapore), so those countries are
                  intentionally omitted from this outbound visa list. If you need assistance with a
                  work/residence permit or South African document legalisation for that destination,
                  message us directly on WhatsApp.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-[#faf8f5] hover:bg-[#f3ead8] text-[#2b241d] text-xs font-bold px-4 py-2.5 rounded-xl border border-[#dfcfb5] transition-colors cursor-pointer"
                >
                  Show All Listed Destinations
                </button>
                <a
                  href={buildWhatsAppUrl(searchQuery.trim() || undefined)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-[#9a6d23] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Check on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : viewMode === 'REGIONS' ? (
            <div className="space-y-8">
              {regionalSections.map((sec) => (
                <section
                  key={sec.region}
                  aria-label={sec.region}
                  className="bg-white border border-[#dfcfb5] rounded-2xl p-5 sm:p-6 shadow-xs space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ebdcc4]">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-[#2b241d]">{sec.region}</h3>
                      {sec.region === 'Europe' && turkeyEntry && (
                        <p className="text-xs text-[#6f6154] mt-1">
                          Transcontinental note:{' '}
                          <button
                            type="button"
                            onClick={() => setSelectedCountry(turkeyEntry)}
                            className="font-semibold text-[#8a5716] underline underline-offset-2 hover:text-[#2b241d] cursor-pointer"
                          >
                            Turkey
                          </button>{' '}
                          is listed once under Middle East to prevent duplicate regional entries.
                        </p>
                      )}
                      {sec.region === 'Africa' && (
                        <p className="text-xs text-[#6f6154] mt-1">
                          Visa-free Southern African and short-visit destinations (including Namibia,
                          Botswana, Lesotho, Eswatini, Zimbabwe, Mozambique, Zambia, Malawi,
                          Tanzania, Kenya, Mauritius, and Seychelles) are excluded.
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-[#7a6b5e] font-medium shrink-0">
                      {sec.sovereign.length > 0 && (
                        <span>
                          {sec.sovereign.length}{' '}
                          {sec.sovereign.length === 1 ? 'country' : 'countries'}
                        </span>
                      )}
                      {sec.sovereign.length > 0 && sec.territories.length > 0 && (
                        <span aria-hidden="true"> &middot; </span>
                      )}
                      {sec.territories.length > 0 && (
                        <span>
                          {sec.territories.length}{' '}
                          {sec.territories.length === 1 ? 'territory' : 'territories'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sovereign Countries Grid */}
                  {sec.sovereign.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {sec.sovereign.map((dest) => (
                        <button
                          key={dest.code}
                          type="button"
                          onClick={() => setSelectedCountry(dest)}
                          className="group text-left px-3.5 py-3 rounded-xl bg-[#fdfcf9] hover:bg-[#fbf5eb] border border-[#eae0cf] hover:border-[#b48332] transition-all flex items-start justify-between gap-2 cursor-pointer"
                        >
                          <span className="flex items-start gap-2.5 min-w-0">
                            <span
                              className="text-xl leading-none shrink-0 mt-0.5"
                              aria-hidden="true"
                            >
                              {dest.flag}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-bold text-[#2b241d] group-hover:text-[#8a5716] transition-colors truncate">
                                {dest.name}
                              </span>
                              <span
                                className={`flex items-center gap-1.5 text-[11px] font-medium mt-0.5 ${getStatusAccentClass(
                                  dest.visaStatus
                                )}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusDotClass(
                                    dest.visaStatus
                                  )}`}
                                  aria-hidden="true"
                                />
                                <span className="truncate">{dest.visaStatus}</span>
                              </span>
                            </span>
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#c8a46b] group-hover:text-[#b48332] shrink-0 mt-1" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Separated Territories & Special Regions */}
                  {sec.territories.length > 0 && (
                    <div className="pt-4 border-t border-[#f2e9da] space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#7a6b5e]">
                        {sec.region} &mdash; Territories &amp; Special Regions
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {sec.territories.map((dest) => (
                          <button
                            key={dest.code}
                            type="button"
                            onClick={() => setSelectedCountry(dest)}
                            className="group text-left px-3.5 py-3 rounded-xl bg-[#faf8f5] hover:bg-[#fbf5eb] border border-dashed border-[#d9c7ab] hover:border-solid hover:border-[#b48332] transition-all flex items-start justify-between gap-2 cursor-pointer"
                          >
                            <span className="flex items-start gap-2.5 min-w-0">
                              <span
                                className="text-xl leading-none shrink-0 mt-0.5"
                                aria-hidden="true"
                              >
                                {dest.flag}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-bold text-[#2b241d] group-hover:text-[#8a5716] transition-colors truncate">
                                  {dest.displayName || dest.name}
                                </span>
                                <span className="block text-[11px] text-[#7a6b5e] truncate">
                                  {dest.classificationLabel}
                                </span>
                                <span
                                  className={`flex items-center gap-1.5 text-[11px] font-medium mt-0.5 ${getStatusAccentClass(
                                    dest.visaStatus
                                  )}`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusDotClass(
                                      dest.visaStatus
                                    )}`}
                                    aria-hidden="true"
                                  />
                                  <span className="truncate">{dest.visaStatus}</span>
                                </span>
                              </span>
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-[#c8a46b] group-hover:text-[#b48332] shrink-0 mt-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            /* Clean Alphabetical A–Z Country Listing */
            <div className="space-y-6">
              {alphabeticalSections.map(([letter, items]) => (
                <section
                  key={letter}
                  aria-label={`Destinations starting with ${letter}`}
                  className="bg-white border border-[#dfcfb5] rounded-2xl p-5 sm:p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ebdcc4]">
                    <h3 className="text-2xl font-serif font-bold text-[#8a5716]">{letter}</h3>
                    <span className="text-xs text-[#7a6b5e] font-medium">
                      {items.length} {items.length === 1 ? 'destination' : 'destinations'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {items.map((dest) => (
                      <button
                        key={`az-${dest.code}`}
                        type="button"
                        onClick={() => setSelectedCountry(dest)}
                        className="group text-left px-3.5 py-3 rounded-xl bg-[#fdfcf9] hover:bg-[#fbf5eb] border border-[#eae0cf] hover:border-[#b48332] transition-all flex items-start justify-between gap-2 cursor-pointer"
                      >
                        <span className="flex items-start gap-2.5 min-w-0">
                          <span
                            className="text-xl leading-none shrink-0 mt-0.5"
                            aria-hidden="true"
                          >
                            {dest.flag}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-bold text-[#2b241d] group-hover:text-[#8a5716] transition-colors truncate">
                              {dest.name}
                            </span>
                            <span className="block text-[11px] text-[#7a6b5e] truncate">
                              {dest.region}
                              {dest.classification !== 'sovereign'
                                ? ` · ${dest.classificationLabel}`
                                : ''}
                            </span>
                            <span
                              className={`flex items-center gap-1.5 text-[11px] font-medium mt-0.5 ${getStatusAccentClass(
                                dest.visaStatus
                              )}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusDotClass(
                                  dest.visaStatus
                                )}`}
                                aria-hidden="true"
                              />
                              <span className="truncate">{dest.visaStatus}</span>
                            </span>
                          </span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#c8a46b] group-hover:text-[#b48332] shrink-0 mt-1" />
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dedicated Separate Section: SA Document Legalisation, Apostilles & Sworn Translations */}
      <section
        id="document-legalisation-separation"
        aria-labelledby="document-legalisation-heading"
        className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#ebdcc4]"
      >
        <div className="bg-white border-2 border-[#c8a46b]/50 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#8a5716]">
                Separate Service Category &middot; Global Document Legalisation
              </div>
              <h2
                id="document-legalisation-heading"
                className="text-2xl sm:text-3xl font-serif font-bold text-[#2b241d]"
              >
                Document Legalisation, Apostilles &amp; Sworn Translations
              </h2>
              <p className="text-sm text-[#4c4035] leading-relaxed">
                <strong>Document legalisation is separate from tourist visa requirements.</strong>{' '}
                A country does not need to require a tourist visa in order for you to need official
                document authentication — and a country&apos;s appearance in our legalisation
                services does not mean South Africans need a visa to visit it.
              </p>
              <p className="text-sm text-[#5c5044] leading-relaxed">
                FileWise handles South African document legalisation for documents intended for{' '}
                <strong>any destination worldwide</strong> — including visa-free countries (such as
                Namibia, Botswana, Mauritius, Brazil, Argentina, Singapore, or Malaysia) for work
                contracts, marriage registration, citizenship, study, or business setup.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl border border-[#9a6d23] transition-colors cursor-pointer"
                >
                  <Stamp className="w-4 h-4" />
                  <span>Explore SA Document Legalisation</span>
                </button>

                <button
                  type="button"
                  onClick={() => onStartInquiry('ZA')}
                  className="inline-flex items-center gap-2 bg-[#faf8f5] hover:bg-[#f3ead8] text-[#2b241d] text-xs sm:text-sm font-bold px-5 py-3 rounded-xl border border-[#c8a46b]/60 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#b48332]" />
                  <span>Inquire for Apostille / Attestation</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-3">
              <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ebdcc4] space-y-1">
                <div className="text-xs font-bold text-[#2b241d] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#b48332] shrink-0" />
                  <span>DIRCO Hague Apostille Certificates (Pretoria)</span>
                </div>
                <p className="text-xs text-[#5c5044] leading-relaxed">
                  For South African birth, marriage, police clearance, and degree certificates used
                  in Hague Convention member countries worldwide.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ebdcc4] space-y-1">
                <div className="text-xs font-bold text-[#2b241d] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#b48332] shrink-0" />
                  <span>Foreign Embassy Attestations &amp; High Court</span>
                </div>
                <p className="text-xs text-[#5c5044] leading-relaxed">
                  DIRCO authentication and embassy legalisation in Pretoria for non-Hague destinations
                  such as the UAE, Qatar, Kuwait, Vietnam, and Taiwan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf8f5] border border-[#ebdcc4] space-y-1">
                <div className="text-xs font-bold text-[#2b241d] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#b48332] shrink-0" />
                  <span>High Court Sworn Translations</span>
                </div>
                <p className="text-xs text-[#5c5044] leading-relaxed">
                  Certified High Court sworn translations of South African official documents into
                  foreign languages required by overseas authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How FileWise Assists + Internal Service Links */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8a5716] block">
                How We Support Visa Applications
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b241d]">
                Administrative Preparation From Start to Submission
              </h2>
              <p className="text-sm text-[#5c5044] leading-relaxed">
                Where an advance visa or travel authorisation is required for your trip from South
                Africa, FileWise provides organised administrative preparation tailored to your
                application file.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ASSISTANCE_AREAS.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="bg-white border border-[#dfcfb5] rounded-xl p-4 space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-[#2b241d]">
                      <Icon className="w-4 h-4 text-[#b48332] shrink-0" />
                      <span>{area.title}</span>
                    </div>
                    <p className="text-xs text-[#5c5044] leading-relaxed">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-[#dfcfb5] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#ebdcc4]">
                <Building2 className="w-5 h-5 text-[#b48332] shrink-0" />
                <h3 className="font-serif font-bold text-lg text-[#2b241d]">
                  Related FileWise Services
                </h3>
              </div>

              <div className="space-y-2.5 text-sm">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('inquiry');
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#faf8f5] hover:bg-[#fbf5eb] border border-[#e5d8c3] hover:border-[#b48332] transition-colors"
                >
                  <div>
                    <div className="font-bold text-[#2b241d] text-xs sm:text-sm">
                      Submit a Visa or Document Inquiry
                    </div>
                    <div className="text-[11px] text-[#6f6154]">
                      Send your destination &amp; travel timeline to our Pretoria team
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#b48332] shrink-0" />
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('services');
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#faf8f5] hover:bg-[#fbf5eb] border border-[#e5d8c3] hover:border-[#b48332] transition-colors"
                >
                  <div>
                    <div className="font-bold text-[#2b241d] text-xs sm:text-sm">
                      SA Document Legalisation &amp; Apostille
                    </div>
                    <div className="text-[11px] text-[#6f6154]">
                      DIRCO Pretoria apostilles, High Court &amp; embassy attestations
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#b48332] shrink-0" />
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('search');
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#faf8f5] hover:bg-[#fbf5eb] border border-[#e5d8c3] hover:border-[#b48332] transition-colors"
                >
                  <div>
                    <div className="font-bold text-[#2b241d] text-xs sm:text-sm">
                      Outbound Visa &amp; Legalisation Tool
                    </div>
                    <div className="text-[11px] text-[#6f6154]">
                      Explore document legalisation &amp; outbound visa guidance
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#b48332] shrink-0" />
                </a>

                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('faq');
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#faf8f5] hover:bg-[#fbf5eb] border border-[#e5d8c3] hover:border-[#b48332] transition-colors"
                >
                  <div>
                    <div className="font-bold text-[#2b241d] text-xs sm:text-sm">
                      Frequently Asked Questions
                    </div>
                    <div className="text-[11px] text-[#6f6154]">
                      Answers on document preparation, processing, and couriers
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#b48332] shrink-0" />
                </a>
              </div>
            </div>

            <div className="bg-[#fbf6ec] border border-[#dfbe87] rounded-2xl p-5 text-xs text-[#4c4035] leading-relaxed space-y-2">
              <div className="font-bold text-[#2b241d] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#8a5716] shrink-0" />
                <span>Important Advisory Notice</span>
              </div>
              <p>
                Visa rules differ by destination, visa category, travel purpose, passport type, and
                individual circumstances, and governments update entry rules periodically. Always
                verify final requirements against official government portals before booking.
                FileWise provides independent administrative visa application assistance and does
                not issue visas, represent any government authority, or guarantee visa approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Conversion Section */}
      <section className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#fdfcf9] via-[#fbf5ea] to-[#f4ead6] border-2 border-[#c8a46b]/70 rounded-2xl p-7 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8a5716] block">
                Start Your Preparation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2b241d]">
                Planning your next international trip?
              </h2>
              <p className="text-base sm:text-lg font-medium text-[#4c4035]">
                Let FileWise help you prepare your visa application.
              </p>
              <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed max-w-2xl">
                Reach our South African team directly on WhatsApp at{' '}
                <strong className="text-[#2b241d]">+27 50 215 4465</strong> or email{' '}
                <a
                  href="mailto:info@filewise.co.za"
                  className="font-semibold text-[#8a5716] underline underline-offset-2"
                >
                  info@filewise.co.za
                </a>{' '}
                to check whether your destination requires visa preparation or supporting document
                legalisation.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-sm border border-[#9a6d23] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp FileWise</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#fbf5eb] text-[#2b241d] font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#c8a46b]/70 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#b48332]" />
                  <span>Contact FileWise</span>
                </button>

                <a
                  href="https://www.filewise.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#fbf5eb] text-[#2b241d] font-bold text-xs sm:text-sm px-4 py-3 rounded-xl border border-[#c8a46b]/70 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#b48332]" />
                  <span>Visit FileWise.co.za</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Information Panel Modal */}
      {selectedCountry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="country-panel-heading"
          className="fixed inset-0 z-50 bg-[#2b241d]/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCountry(null);
          }}
        >
          <div className="bg-white border-2 border-[#c8a46b] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            <button
              type="button"
              onClick={() => setSelectedCountry(null)}
              aria-label="Close destination visa details"
              className="absolute top-5 right-5 text-[#7a6b5e] hover:text-[#2b241d] p-1.5 rounded-lg hover:bg-[#f4eedf] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-3.5 pr-8">
              <span
                className="text-4xl leading-none p-2 bg-[#faf8f5] rounded-xl border border-[#dfcfb5] shrink-0"
                aria-hidden="true"
              >
                {selectedCountry.flag}
              </span>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8a5716]">
                  {selectedCountry.region} &middot; {selectedCountry.classificationLabel}
                </div>
                <h3
                  id="country-panel-heading"
                  className="text-2xl font-serif font-bold text-[#2b241d]"
                >
                  {selectedCountry.displayName || selectedCountry.name}
                </h3>
                {selectedCountry.subtitle && (
                  <p className="text-xs text-[#5c5044]">{selectedCountry.subtitle}</p>
                )}
              </div>
            </div>

            {/* Entry Status Box for South African Ordinary Passports */}
            <div className="bg-[#faf8f5] border border-[#dfcfb5] rounded-xl p-4 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#7a6b5e]">
                South African Ordinary Passport Entry Status
              </div>
              <div
                className={`flex items-center gap-2 text-sm font-bold ${getStatusAccentClass(
                  selectedCountry.visaStatus
                )}`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${getStatusDotClass(
                    selectedCountry.visaStatus
                  )}`}
                  aria-hidden="true"
                />
                <span>{selectedCountry.visaStatus}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4c4035] leading-relaxed">
                {selectedCountry.visaStatusDetail}
              </p>
            </div>

            {/* How FileWise Assists */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#5c5044]">
                How FileWise Assists South African Applicants
              </h4>
              <p className="text-xs sm:text-sm text-[#4c4035] leading-relaxed">
                Where an advance visa, e-Visa, travel authorisation, or work/long-stay permit is
                needed for{' '}
                <strong>{selectedCountry.displayName || selectedCountry.name}</strong>, FileWise
                provides structured administrative support:
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#2b241d]">
                {ASSISTANCE_AREAS.map((area) => (
                  <li
                    key={area.title}
                    className="flex items-start gap-2 bg-[#faf8f5] border border-[#ebdcc4] rounded-xl p-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#b48332] shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{area.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Compliance & Variable Requirements Notice */}
            <div className="bg-[#fbf6ec] border border-[#dfbe87] rounded-xl p-4 text-xs text-[#4c4035] leading-relaxed space-y-1.5">
              <div className="font-bold text-[#2b241d]">
                Requirements &amp; Independence Notice
              </div>
              <p>
                Specific visa eligibility criteria, required supporting documents, processing times,
                and official fees depend on your individual circumstances, passport type, purpose of
                travel, and the rules set by {selectedCountry.name}&apos;s authorities.
              </p>
              <p>
                FileWise provides independent administrative visa application assistance and
                document preparation only. FileWise does not issue visas, does not represent any
                embassy or immigration authority, does not provide licensed immigration advice, and
                does not guarantee visa approval.
              </p>
            </div>

            {/* Official Government / Immigration Reference */}
            <div className="bg-[#faf8f5] border border-[#ebdcc4] rounded-xl p-4 space-y-2 text-xs">
              <div className="font-bold text-[#2b241d]">
                Verify Official Government &amp; Consular Sources
              </div>
              <div className="flex flex-col gap-1.5">
                {selectedCountry.officialPortal && (
                  <a
                    href={selectedCountry.officialPortal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-[#8a5716] hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    <span>{selectedCountry.officialPortal.label}</span>
                  </a>
                )}
                <a
                  href={DIRCO_FOREIGN_MISSIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#5c5044] hover:text-[#8a5716] hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    DIRCO Directory of Foreign Missions Accredited to South Africa
                  </span>
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#ebdcc4] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedCountry(null);
                  onNavigate('services');
                }}
                className="text-xs font-semibold text-[#8a5716] hover:underline text-left cursor-pointer"
              >
                Need SA document legalisation (separate service)?
              </button>

              <div className="flex flex-wrap items-center gap-2.5 justify-end">
                <a
                  href={buildWhatsAppUrl(selectedCountry.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#b48332] hover:bg-[#9f7228] text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-[#9a6d23] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Enquiry</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const code = selectedCountry.code;
                    setSelectedCountry(null);
                    onStartInquiry(code);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#2b241d] hover:bg-[#44382e] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Start Visa Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
