import { Review, Complaint } from '@/types/review';

export const INITIAL_REVIEWS_DATA: Review[] = [
  {
    id: 'rev-101',
    bookingId: 'bk-1001',
    providerId: 'prov-rafael-costa',
    customerId: 'cust-amara',
    customerName: 'Amara Bello',
    customerAvatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Rafael arrived exactly on time, diagnosed the refrigerant leak within 15 minutes, and sealed the pipe cleanly. AC is blowing icy cold air again. Outstanding professional!',
    serviceName: 'AC Technician',
    date: '2026-09-18',
    providerResponse: {
      date: '2026-09-19',
      comment: 'Thank you Amara! Glad we could restore your cooling before the weekend heat.'
    }
  },
  {
    id: 'rev-102',
    bookingId: 'bk-1002',
    providerId: 'prov-amara-bello',
    customerId: 'cust-marcus',
    customerName: 'Marcus Chen',
    customerAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Amara re-wired our entire breaker panel after constant tripping. She explained everything clearly and left the area spotless. Best electrician in town!',
    serviceName: 'Electrician',
    date: '2026-09-20'
  },
  {
    id: 'rev-103',
    bookingId: 'bk-1003',
    providerId: 'prov-elena-rostova',
    customerId: 'cust-tariq',
    customerName: 'Tariq Al-Mansoor',
    customerAvatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Elena configured our mesh network across all 3 floors with zero latency drops. Excellent communication and deep networking expertise.',
    serviceName: 'Wi-Fi / Network Technician',
    date: '2026-09-22'
  },
  {
    id: 'rev-104',
    bookingId: 'bk-1004',
    providerId: 'prov-sophie-dubois',
    customerId: 'cust-elena',
    customerName: 'Elena Rostova',
    customerAvatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Sophie did a deep steam cleaning of our sectional sofa. It looks and smells like brand new. Completely eco-friendly products, very impressed.',
    serviceName: 'Sofa Cleaning',
    date: '2026-09-23'
  }
];

export const INITIAL_COMPLAINTS_DATA: Complaint[] = [
  {
    id: 'comp-1',
    bookingId: 'bk-999',
    complainantId: 'cust-john',
    complainantName: 'John Doe',
    complainantRole: 'customer',
    targetId: 'prov-unknown',
    targetName: 'Express Fix Services',
    subject: 'Late arrival without notice',
    description: 'Technician was 45 minutes late for the appointment without prior message.',
    status: 'resolved',
    createdAt: '2026-09-15',
    resolution: 'Provider apologized and credited a 15% discount for the delay.'
  },
  {
    id: 'comp-2',
    bookingId: 'bk-998',
    complainantId: 'prov-rafael-costa',
    complainantName: 'Rafael Costa',
    complainantRole: 'worker',
    targetId: 'cust-unknown',
    targetName: 'Sarah Jenkins',
    subject: 'Incorrect address provided',
    description: 'Customer entered wrong house number, spent 20 minutes finding the correct gate.',
    status: 'resolved',
    createdAt: '2026-09-10',
    resolution: 'Customer updated profile location and confirmed coordinates.'
  }
];
