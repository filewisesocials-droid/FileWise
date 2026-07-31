import { DocumentTypeInfo, LegalisationRequirementResult, Country } from '../types';

export const DOCUMENT_TYPES: DocumentTypeInfo[] = [
  // Personal
  {
    id: 'birth_cert',
    name: 'Birth Certificate',
    category: 'PERSONAL',
    description: 'Government-issued vital record of birth.',
    requiresNotaryFirst: false,
    requiresSolicitorVerification: false,
    typicalFeeZAR: 1080,
    sampleName: 'Certified Copy of Entry of Birth'
  },
  {
    id: 'marriage_cert',
    name: 'Marriage Certificate',
    category: 'PERSONAL',
    description: 'Official vital record confirming marital status.',
    requiresNotaryFirst: false,
    requiresSolicitorVerification: false,
    typicalFeeZAR: 1080,
    sampleName: 'Civil Marriage Registration Certificate'
  },
  {
    id: 'police_clearance',
    name: 'Police Clearance / Criminal Record Check',
    category: 'PERSONAL',
    description: 'ACRO, FBI Identity History Summary, Disclosure & Barring Service (DBS), or local police certificate.',
    requiresNotaryFirst: false,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 1350,
    sampleName: 'Police Certificate of No Criminal Convictions'
  },
  {
    id: 'degree_diploma',
    name: 'University Degree / Academic Diploma',
    category: 'ACADEMIC',
    description: 'Bachelor, Master, PhD degree certificates or academic transcripts.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 1530,
    sampleName: 'Bachelor of Science Degree Certificate & Transcripts'
  },
  {
    id: 'academic_transcript',
    name: 'Academic Transcript / Report Card',
    category: 'ACADEMIC',
    description: 'Detailed semester grade reports issued by educational institution.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 1260,
    sampleName: 'Official Academic Transcript'
  },
  {
    id: 'cert_incorporation',
    name: 'Certificate of Incorporation',
    category: 'COMMERCIAL',
    description: 'Companies House / Secretary of State company registration proof.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 1980,
    sampleName: 'Company Registration Certificate'
  },
  {
    id: 'articles_association',
    name: 'Articles of Association / Company Bylaws',
    category: 'COMMERCIAL',
    description: 'Corporate constitution and statutory rules.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 2160,
    sampleName: 'Articles of Association & Memorandum'
  },
  {
    id: 'power_of_attorney',
    name: 'Power of Attorney (POA)',
    category: 'LEGAL',
    description: 'Legal authorization granting representative powers overseas.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 1710,
    sampleName: 'General / Special Power of Attorney'
  },
  {
    id: 'affidavit',
    name: 'Affidavit / Sworn Declaration',
    category: 'LEGAL',
    description: 'Sworn written statement made under oath.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 1440,
    sampleName: 'Affidavit of Single Status / Identity'
  },
  {
    id: 'commercial_invoice',
    name: 'Commercial Invoice / Certificate of Origin',
    category: 'COMMERCIAL',
    description: 'Export shipping document certified by Chamber of Commerce.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 2340,
    sampleName: 'Certificate of Origin & Invoice'
  },
  {
    id: 'medical_report',
    name: 'Medical Fit for Work Report / Health Certificate',
    category: 'MEDICAL',
    description: 'Doctor certified health evaluation for visa applications.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    typicalFeeZAR: 1350,
    sampleName: 'Medical Fitness Evaluation Certificate'
  }
];

export function calculateRequirement(origin: Country, destination: Country): LegalisationRequirementResult {
  const isHagueToHague = origin.hagueMember && destination.hagueMember;
  const legalisationType = isHagueToHague ? 'APOSTILLE' : 'FULL_EMBASSY_LEGALISATION';
  
  const steps = [];
  let stepCounter = 1;
  let totalDaysStandard = 0;
  let totalDaysExpress = 0;
  let totalFeeZAR = 0;

  // Step 1: Solicitor / Notary verification
  steps.push({
    stepNumber: stepCounter++,
    title: 'Solicitor or Notary Public Authentication',
    description: `Authentication of original signature or certified true copy verification in ${origin.name}.`,
    authority: `Registered Notary Public / Law Society Solicitor (${origin.name})`,
    estimatedDays: 1,
    estimatedFeeZAR: origin.solicitorFeeZAR,
    isMandatory: true
  });
  totalDaysStandard += 1;
  totalDaysExpress += 1;
  totalFeeZAR += origin.solicitorFeeZAR;

  // Step 2: Primary Government Authority (Apostille or Authentication)
  if (isHagueToHague) {
    steps.push({
      stepNumber: stepCounter++,
      title: 'Hague Convention Apostille Issuance',
      description: `Official Apostille certificate attachment by ${origin.name}'s competent foreign ministry authority. Valid directly in ${destination.name} without embassy seal!`,
      authority: `Foreign Ministry / Department of State (${origin.name})`,
      estimatedDays: origin.standardProcessingDays,
      estimatedFeeZAR: origin.apostilleFeeZAR,
      isMandatory: true
    });
    totalDaysStandard += origin.standardProcessingDays;
    totalDaysExpress += origin.expressProcessingDays;
    totalFeeZAR += origin.apostilleFeeZAR;
  } else {
    // Non-Hague -> Foreign Ministry Authentication
    steps.push({
      stepNumber: stepCounter++,
      title: 'State Foreign Ministry Pre-Legalisation',
      description: `Pre-authentication stamp from ${origin.name}'s Ministry of Foreign Affairs (FCO / State Dept).`,
      authority: `Ministry of Foreign Affairs Legalisation Office (${origin.name})`,
      estimatedDays: origin.standardProcessingDays,
      estimatedFeeZAR: Math.round(origin.apostilleFeeZAR * 0.9),
      isMandatory: true
    });
    totalDaysStandard += origin.standardProcessingDays;
    totalDaysExpress += origin.expressProcessingDays;
    totalFeeZAR += Math.round(origin.apostilleFeeZAR * 0.9);

    // Step 3: Destination Embassy Attestation
    steps.push({
      stepNumber: stepCounter++,
      title: `${destination.name} Embassy Consular Legalisation`,
      description: `Consular attestation stamp and hologram seal applied by the Embassy of ${destination.name} in ${origin.name}.`,
      authority: `Embassy / Consulate General of ${destination.name}`,
      estimatedDays: destination.standardProcessingDays,
      estimatedFeeZAR: destination.embassyAttestationFeeZAR,
      isMandatory: true
    });
    totalDaysStandard += destination.standardProcessingDays;
    totalDaysExpress += destination.expressProcessingDays;
    totalFeeZAR += destination.embassyAttestationFeeZAR;

    // Step 4: Final MOFA Attestation in destination
    steps.push({
      stepNumber: stepCounter++,
      title: `Ministry of Foreign Affairs (MOFA) Final Clearance`,
      description: `Final in-country attestation upon arrival in ${destination.name} for official government acceptance.`,
      authority: `Ministry of Foreign Affairs (${destination.name})`,
      estimatedDays: 2,
      estimatedFeeZAR: 810,
      isMandatory: true
    });
    totalDaysStandard += 2;
    totalDaysExpress += 1;
    totalFeeZAR += 810;
  }

  const notes: string[] = [];
  if (isHagueToHague) {
    notes.push(`Both ${origin.name} and ${destination.name} are members of the 1961 Hague Apostille Convention. Only a single Apostille stamp is required!`);
  } else {
    notes.push(`${destination.name} is not a Hague Apostille member (or origin is non-member). Full 3-tier embassy attestation sequence is compulsory.`);
  }

  if (destination.specialRequirements && destination.specialRequirements.length > 0) {
    notes.push(...destination.specialRequirements);
  }

  return {
    originCountry: origin,
    destinationCountry: destination,
    isHagueToHague,
    legalisationType,
    primarySteps: steps,
    totalEstimatedDaysStandard: totalDaysStandard,
    totalEstimatedDaysExpress: totalDaysExpress,
    totalEstimatedFeeZAR: totalFeeZAR,
    notes
  };
}
