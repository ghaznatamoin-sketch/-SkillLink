export type JobStatus =
  | 'requested'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export interface BookingPricing {
  baseAmount: number;
  serviceFee?: number;
  totalCustomerPayment: number;
  platformCommissionPercent: number; // e.g. 10%
  platformCommissionAmount: number;
  workerEarningsAmount: number;
  currency: string;
}

export interface BookingTimelineEvent {
  status: JobStatus;
  timestamp: string;
  note?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  providerId: string;
  providerName: string;
  providerAvatarUrl?: string;
  serviceId: string;
  serviceName: string;
  categoryId: string;
  categoryName: string;
  status: JobStatus;
  date: string;
  timeSlot: string;
  address: {
    street: string;
    city: string;
    country: string;
    zip?: string;
    notes?: string;
  };
  jobDescription: string;
  pricing: BookingPricing;
  createdAt: string;
  timeline: BookingTimelineEvent[];
  hasReviewed?: boolean;
}
