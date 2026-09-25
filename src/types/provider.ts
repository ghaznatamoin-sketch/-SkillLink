export interface ProviderServiceOffering {
  serviceId: string;
  serviceName: string;
  categoryId: string;
  categoryName: string;
  price: number;
  priceUnit: 'hour' | 'job' | 'visit' | 'day';
  description?: string;
}

export interface Provider {
  id: string;
  userId?: string;
  name: string;
  title: string;
  avatarUrl: string;
  bio: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  completedJobsCount: number;
  hourlyRate: number;
  currency: string;
  isVerified: boolean;
  isAvailable: boolean;
  availabilitySchedule: string; // e.g., "Mon-Sat: 8:00 AM - 6:00 PM"
  location: {
    city: string;
    country: string;
    state?: string;
    serviceRadiusKm: number;
    neighborhoods: string[];
  };
  skills: string[];
  servicesOffered: ProviderServiceOffering[];
  languages: string[];
  badge?: 'Top Rated' | 'Verified Pro' | 'Fast Responder' | 'Elite Specialist';
  responseTime: string; // e.g. "< 30 mins"
  joinedDate: string;
  portfolioImages?: string[];
}
