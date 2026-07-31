import { OrderTrackItem } from '../types';

export const INITIAL_TRACKING_ORDERS: OrderTrackItem[] = [
  {
    id: 'FW-98214',
    customerName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    originCountry: 'United Kingdom',
    destinationCountry: 'United Arab Emirates',
    documentSummary: '1x Master of Science Degree Certificate & Transcripts',
    status: 'EMBASSY_ATTESTATION',
    createdDate: '2026-07-26',
    estimatedCompletion: '2026-08-04',
    trackingNumber: 'DHL-884920419',
    courierName: 'DHL Express Courier',
    steps: [
      {
        title: 'Order Submitted & Documents Received',
        date: '2026-07-26 09:15 AM',
        completed: true,
        current: false,
        location: 'London Processing Centre',
        notes: 'Original document verified and logged into high-security legal vault.'
      },
      {
        title: 'Solicitor & Notary Verification',
        date: '2026-07-27 11:30 AM',
        completed: true,
        current: false,
        location: 'London High Court Notary',
        notes: 'Certificate verified with issuing university registrar.'
      },
      {
        title: 'FCDO Legalisation & Apostille Stamp',
        date: '2026-07-29 02:45 PM',
        completed: true,
        current: false,
        location: 'Foreign Commonwealth Office (Milton Keynes)',
        notes: 'Official FCDO Apostille seal #AP-992810 attached.'
      },
      {
        title: 'UAE Embassy Consular Attestation',
        date: '2026-07-31 10:00 AM',
        completed: false,
        current: true,
        location: 'Embassy of the UAE (London, South Kensington)',
        notes: 'Submitted for diplomatic attestation seal and barcode verification.'
      },
      {
        title: 'Final Quality Audit & Dispatch',
        completed: false,
        current: false,
        location: 'Filewise Dispatch Hub',
        notes: 'Secure tracked courier delivery to client in Dubai.'
      }
    ]
  },
  {
    id: 'FW-74309',
    customerName: 'Marcus Vance',
    email: 'marcus.v@example.com',
    originCountry: 'United States',
    destinationCountry: 'Spain',
    documentSummary: '1x FBI Criminal Background Check, 1x Birth Certificate',
    status: 'COMPLETED',
    createdDate: '2026-07-18',
    estimatedCompletion: '2026-07-25',
    trackingNumber: 'FEDEX-992104882',
    courierName: 'FedEx Priority',
    steps: [
      {
        title: 'Order Submitted & Documents Received',
        date: '2026-07-18 10:00 AM',
        completed: true,
        current: false,
        location: 'Washington DC Office',
        notes: 'Digital authentication check passed.'
      },
      {
        title: 'US Dept of State Apostille Seal',
        date: '2026-07-21 03:20 PM',
        completed: true,
        current: false,
        location: 'US Department of State Authentication Office',
        notes: 'Hague Apostille #US-2026-7710 issued.'
      },
      {
        title: 'Sworn Spanish Translation (Traductor Jurado)',
        date: '2026-07-23 01:15 PM',
        completed: true,
        current: false,
        location: 'Madrid Sworn Translation Desk',
        notes: 'Certified translation and sworn stamp appended.'
      },
      {
        title: 'Dispatched & Delivered',
        date: '2026-07-25 11:45 AM',
        completed: true,
        current: false,
        location: 'Barcelona, Spain',
        notes: 'Package signed by recipient Marcus Vance.'
      }
    ]
  }
];
