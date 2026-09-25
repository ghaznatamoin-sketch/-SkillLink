export interface Review {
  id: string;
  bookingId: string;
  providerId: string;
  customerId: string;
  customerName: string;
  customerAvatarUrl?: string;
  rating: number; // 1 - 5
  comment: string;
  serviceName: string;
  date: string;
  providerResponse?: {
    date: string;
    comment: string;
  };
}

export interface Complaint {
  id: string;
  bookingId: string;
  complainantId: string;
  complainantName: string;
  complainantRole: 'customer' | 'worker';
  targetId: string;
  targetName: string;
  subject: string;
  description: string;
  status: 'pending' | 'under_review' | 'resolved' | 'dismissed';
  createdAt: string;
  resolution?: string;
}
