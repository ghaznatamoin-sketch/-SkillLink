export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  startingPrice: number;
  priceUnit: 'hour' | 'job' | 'visit' | 'day';
  currency: string;
  popular?: boolean;
  estimatedDuration?: string;
  iconName?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  accentColor: string; // e.g. cyan, amber, purple, emerald, sky, rose, pink, indigo, teal, blue
  accentHex: string;
  services: ServiceItem[];
  bannerImage?: string;
  totalProvidersCount?: number;
}
