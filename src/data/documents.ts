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
    sampleName: 'Certified Copy of Entry of Birth'
  },
  {
    id: 'marriage_cert',
    name: 'Marriage Certificate',
    category: 'PERSONAL',
    description: 'Official vital record confirming marital status.',
    requiresNotaryFirst: false,
    requiresSolicitorVerification: false,
    sampleName: 'Civil Marriage Registration Certificate'
  },
  {
    id: 'police_clearance',
    name: 'Police Clearance / Criminal Record Check',
    category: 'PERSONAL',
    description: 'SAPS Police Clearance Certificate or local criminal record check.',
    requiresNotaryFirst: false,
    requiresSolicitorVerification: true,
    sampleName: 'Police Certificate of No Criminal Convictions'
  },
  {
    id: 'degree_diploma',
    name: 'University Degree / Academic Diploma',
    category: 'ACADEMIC',
    description: 'Bachelor, Master, PhD degree certificates or academic transcripts.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    sampleName: 'Bachelor of Science Degree Certificate & Transcripts'
  },
  {
    id: 'academic_transcript',
    name: 'Academic Transcript / Report Card',
    category: 'ACADEMIC',
    description: 'Detailed semester grade reports issued by educational institution.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    sampleName: 'Official Academic Transcript'
  },
  {
    id: 'cert_incorporation',
    name: 'Certificate of Incorporation',
    category: 'COMMERCIAL',
    description: 'CIPC company registration proof.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    sampleName: 'Company Registration Certificate'
  },
  {
    id: 'articles_association',
    name: 'Articles of Association / Company Bylaws',
    category: 'COMMERCIAL',
    description: 'Corporate constitution and statutory rules.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    sampleName: 'Articles of Association & Memorandum'
  },
  {
    id: 'power_of_attorney',
    name: 'Power of Attorney (POA)',
    category: 'LEGAL',
    description: 'Legal authorization granting representative powers overseas.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    sampleName: 'General / Special Power of Attorney'
  },
  {
    id: 'affidavit',
    name: 'Affidavit / Sworn Declaration',
    category: 'LEGAL',
    description: 'Sworn written statement made under oath.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    sampleName: 'Affidavit of Single Status / Identity'
  },
  {
    id: 'commercial_invoice',
    name: 'Commercial Invoice / Certificate of Origin',
    category: 'COMMERCIAL',
    description: 'Export shipping document certified by Chamber of Commerce.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
    sampleName: 'Certificate of Origin & Invoice'
  },
  {
    id: 'medical_report',
    name: 'Medical Fit for Work Report / Health Certificate',
    category: 'MEDICAL',
    description: 'Doctor certified health evaluation for visa applications.',
    requiresNotaryFirst: true,
    requiresSolicitorVerification: true,
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

  // Step 1: SA Notary Public verification
  steps.push({
    stepNumber: stepCounter++,
    title: 'SA Notary Public Authentication',
    description: `Notarial verification of original signature or certified copy in ${origin.name}.`,
    authority: `Registered Notary Public (${origin.name})`,
    estimatedDays: 1,
    isMandatory: true
  });
  totalDaysStandard += 1;
  totalDaysExpress += 1;

  // Step 2: DIRCO / High Court Legalisation
  if (isHagueToHague) {
    steps.push({
      stepNumber: stepCounter++,
      title: 'DIRCO / High Court Hague Apostille',
      description: `Official Hague Apostille certificate issued by DIRCO (Pretoria) or High Court in ${origin.name}. Valid directly in ${destination.name}!`,
      authority: `DIRCO / High Court (${origin.name})`,
      estimatedDays: origin.standardProcessingDays,
      isMandatory: true
    });
    totalDaysStandard += origin.standardProcessingDays;
    totalDaysExpress += origin.expressProcessingDays;
  } else {
    // Non-Hague -> DIRCO Pre-Legalisation
    steps.push({
      stepNumber: stepCounter++,
      title: 'DIRCO Pre-Legalisation Stamping',
      description: `Authentication stamp from DIRCO Legalisation Section in Pretoria.`,
      authority: `DIRCO Legalisation Section (${origin.name})`,
      estimatedDays: origin.standardProcessingDays,
      isMandatory: true
    });
    totalDaysStandard += origin.standardProcessingDays;
    totalDaysExpress += origin.expressProcessingDays;

    // Step 3: Destination Embassy Attestation in Pretoria
    steps.push({
      stepNumber: stepCounter++,
      title: `${destination.name} Embassy Pretoria Attestation`,
      description: `Consular attestation stamp and seal applied by the Embassy of ${destination.name} in Pretoria.`,
      authority: `Embassy of ${destination.name} (Pretoria)`,
      estimatedDays: destination.standardProcessingDays,
      isMandatory: true
    });
    totalDaysStandard += destination.standardProcessingDays;
    totalDaysExpress += destination.expressProcessingDays;

    // Step 4: Final MOFA Attestation in destination
    steps.push({
      stepNumber: stepCounter++,
      title: `Ministry of Foreign Affairs (MOFA) Final Clearance`,
      description: `Final in-country attestation upon arrival in ${destination.name}.`,
      authority: `Ministry of Foreign Affairs (${destination.name})`,
      estimatedDays: 2,
      isMandatory: true
    });
    totalDaysStandard += 2;
    totalDaysExpress += 1;
  }

  const notes: string[] = [];
  if (isHagueToHague) {
    notes.push(`Both ${origin.name} and ${destination.name} are members of the Hague Apostille Convention. A single Apostille stamp is required.`);
  } else {
    notes.push(`${destination.name} is not a Hague Apostille member. Full embassy attestation in Pretoria is required.`);
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
    notes
  };
}
