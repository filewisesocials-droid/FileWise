export type HagueStatus = 'MEMBER' | 'NON_MEMBER' | 'PARTIAL';

export interface Country {
  code: string; // ISO 2-letter code e.g. 'GB', 'US', 'AE'
  name: string;
  flag: string; // emoji or flag image
  region: 'Europe' | 'Americas' | 'Asia' | 'Middle East' | 'Africa' | 'Oceania';
  hagueMember: boolean;
  hagueYear?: number;
  embassyInKeyCities: string[];
  standardProcessingDays: number;
  expressProcessingDays: number;
  apostilleFeeZAR: number;
  embassyAttestationFeeZAR: number;
  solicitorFeeZAR: number;
  translationFeePerPageZAR: number;
  specialRequirements?: string[];
  recommendedSteps: string[];
  popularForWorkVisas: boolean;
  popularForEducation: boolean;
  popularForBusiness: boolean;
}

export type DocumentCategory = 'PERSONAL' | 'ACADEMIC' | 'COMMERCIAL' | 'LEGAL' | 'MEDICAL';

export interface DocumentTypeInfo {
  id: string;
  name: string;
  category: DocumentCategory;
  description: string;
  requiresNotaryFirst: boolean;
  requiresSolicitorVerification: boolean;
  typicalFeeZAR: number;
  sampleName: string;
}

export interface LegalisationRequirementResult {
  originCountry: Country;
  destinationCountry: Country;
  isHagueToHague: boolean;
  legalisationType: 'APOSTILLE' | 'FULL_EMBASSY_LEGALISATION';
  primarySteps: {
    stepNumber: number;
    title: string;
    description: string;
    authority: string;
    estimatedDays: number;
    estimatedFeeZAR: number;
    isMandatory: boolean;
  }[];
  totalEstimatedDaysStandard: number;
  totalEstimatedDaysExpress: number;
  totalEstimatedFeeZAR: number;
  notes: string[];
}

export interface QuoteSelection {
  originCode: string;
  destinationCode: string;
  documents: {
    typeId: string;
    quantity: number;
    title?: string;
  }[];
  speed: 'STANDARD' | 'EXPRESS' | 'SUPER_EXPRESS';
  needTranslation: boolean;
  translationPages: number;
  needSolicitorCertification: boolean;
  needReturnCourier: boolean;
  courierDestination: string;
}

export interface OrderTrackItem {
  id: string; // e.g. FW-98214
  customerName: string;
  email: string;
  originCountry: string;
  destinationCountry: string;
  documentSummary: string;
  status: 'SUBMITTED' | 'NOTARY_VERIFICATION' | 'APOSTILLE_STAMPING' | 'EMBASSY_ATTESTATION' | 'DISPATCHED' | 'COMPLETED';
  createdDate: string;
  estimatedCompletion: string;
  trackingNumber: string;
  courierName: string;
  steps: {
    title: string;
    date?: string;
    completed: boolean;
    current: boolean;
    location?: string;
    notes?: string;
  }[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  groundingSources?: { title: string; url: string }[];
  suggestedActions?: string[];
}
