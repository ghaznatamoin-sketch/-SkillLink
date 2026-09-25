import { Booking } from '@/types/booking';

export const INITIAL_BOOKINGS_DATA: Booking[] = [
  {
    id: 'bk-1001',
    customerId: 'cust-amara',
    customerName: 'Amara Bello',
    customerPhone: '+234 801 234 5678',
    customerEmail: 'amara.bello@example.com',
    providerId: 'prov-rafael-costa',
    providerName: 'Rafael Costa',
    providerAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    serviceId: 'srv-ac-technician',
    serviceName: 'AC Technician',
    categoryId: 'cat-electrical-appliances',
    categoryName: 'Electrical & Appliances',
    status: 'completed',
    date: '2026-09-18',
    timeSlot: '10:00 AM - 12:00 PM',
    address: {
      street: '14 Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      country: 'Nigeria',
      notes: 'Gate buzzer 4B, 2nd floor apartment'
    },
    jobDescription: 'Master bedroom inverter AC is blowing room-temperature air. Needs refrigerant leak test and refill.',
    pricing: {
      baseAmount: 90,
      serviceFee: 10,
      totalCustomerPayment: 100,
      platformCommissionPercent: 10,
      platformCommissionAmount: 10,
      workerEarningsAmount: 90,
      currency: 'USD'
    },
    createdAt: '2026-09-17T09:30:00Z',
    timeline: [
      { status: 'requested', timestamp: '2026-09-17T09:30:00Z', note: 'Customer submitted booking request' },
      { status: 'accepted', timestamp: '2026-09-17T09:45:00Z', note: 'Rafael accepted the request' },
      { status: 'in_progress', timestamp: '2026-09-18T10:05:00Z', note: 'Work started on site' },
      { status: 'completed', timestamp: '2026-09-18T11:40:00Z', note: 'Job finished and cooling verified' }
    ],
    hasReviewed: true
  },
  {
    id: 'bk-1002',
    customerId: 'cust-marcus',
    customerName: 'Marcus Chen',
    customerPhone: '+44 20 7946 0912',
    customerEmail: 'marcus.chen@example.com',
    providerId: 'prov-amara-bello',
    providerName: 'Amara Bello',
    providerAvatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    serviceId: 'srv-electrician',
    serviceName: 'Electrician',
    categoryId: 'cat-home-repair',
    categoryName: 'Home & Repair',
    status: 'in_progress',
    date: '2026-09-25',
    timeSlot: '02:00 PM - 04:00 PM',
    address: {
      street: '22 Kensington High St',
      city: 'London',
      country: 'United Kingdom',
      notes: 'Ring bell for Chen residence'
    },
    jobDescription: 'Main circuit breaker keeps tripping when oven and heater run together. Inspect load and replace breaker.',
    pricing: {
      baseAmount: 100,
      serviceFee: 10,
      totalCustomerPayment: 110,
      platformCommissionPercent: 10,
      platformCommissionAmount: 11,
      workerEarningsAmount: 99,
      currency: 'USD'
    },
    createdAt: '2026-09-24T14:15:00Z',
    timeline: [
      { status: 'requested', timestamp: '2026-09-24T14:15:00Z', note: 'Customer requested appointment' },
      { status: 'accepted', timestamp: '2026-09-24T14:28:00Z', note: 'Amara accepted the assignment' },
      { status: 'in_progress', timestamp: '2026-09-25T14:05:00Z', note: 'Technician on site inspecting distribution board' }
    ],
    hasReviewed: false
  },
  {
    id: 'bk-1003',
    customerId: 'cust-amara',
    customerName: 'Amara Bello',
    customerPhone: '+234 801 234 5678',
    customerEmail: 'amara.bello@example.com',
    providerId: 'prov-sophie-dubois',
    providerName: 'Sophie Dubois',
    providerAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    serviceId: 'srv-deep-cleaning',
    serviceName: 'Deep Cleaning',
    categoryId: 'cat-cleaning',
    categoryName: 'Cleaning',
    status: 'requested',
    date: '2026-09-27',
    timeSlot: '09:00 AM - 01:00 PM',
    address: {
      street: '14 Admiralty Way, Lekki Phase 1',
      city: 'Lagos',
      country: 'Nigeria',
      notes: '3-bedroom flat, focus on kitchen and windows'
    },
    jobDescription: 'Post-renovation deep cleaning and sanitization for 3-bedroom apartment.',
    pricing: {
      baseAmount: 150,
      serviceFee: 15,
      totalCustomerPayment: 165,
      platformCommissionPercent: 10,
      platformCommissionAmount: 16.5,
      workerEarningsAmount: 148.5,
      currency: 'USD'
    },
    createdAt: '2026-09-25T08:00:00Z',
    timeline: [
      { status: 'requested', timestamp: '2026-09-25T08:00:00Z', note: 'Request received from customer' }
    ],
    hasReviewed: false
  },
  {
    id: 'bk-1004',
    customerId: 'cust-tariq',
    customerName: 'Tariq Al-Mansoor',
    customerPhone: '+971 50 123 4567',
    customerEmail: 'tariq.mansoor@example.com',
    providerId: 'prov-rafael-costa',
    providerName: 'Rafael Costa',
    providerAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    serviceId: 'srv-ac-technician',
    serviceName: 'AC Technician',
    categoryId: 'cat-electrical-appliances',
    categoryName: 'Electrical & Appliances',
    status: 'accepted',
    date: '2026-09-26',
    timeSlot: '11:00 AM - 01:00 PM',
    address: {
      street: 'Tower 3, Apt 1802, Dubai Marina',
      city: 'Dubai',
      country: 'United Arab Emirates',
      notes: 'Visitor parking on B1 level'
    },
    jobDescription: 'Annual seasonal maintenance and coil antimicrobial cleaning for 2 split AC units.',
    pricing: {
      baseAmount: 90,
      serviceFee: 10,
      totalCustomerPayment: 100,
      platformCommissionPercent: 10,
      platformCommissionAmount: 10,
      workerEarningsAmount: 90,
      currency: 'USD'
    },
    createdAt: '2026-09-25T06:30:00Z',
    timeline: [
      { status: 'requested', timestamp: '2026-09-25T06:30:00Z', note: 'Request submitted' },
      { status: 'accepted', timestamp: '2026-09-25T07:15:00Z', note: 'Rafael accepted the booking' }
    ],
    hasReviewed: false
  }
];
