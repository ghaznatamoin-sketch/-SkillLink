import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Category, ServiceItem } from '@/types/category';
import { CATEGORIES_DATA } from '@/data/categories';

export const categoryService = {
  /**
   * Fetch all active categories, querying Supabase if credentials exist.
   */
  async getCategories(): Promise<Category[]> {
    if (!isSupabaseConfigured) {
      return CATEGORIES_DATA;
    }

    try {
      const { data: catRows, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (catError || !catRows || catRows.length === 0) {
        return CATEGORIES_DATA;
      }

      const { data: srvRows } = await supabase
        .from('services')
        .select('*');

      return catRows.map((cat) => {
        const servicesForCat: ServiceItem[] = (srvRows || [])
          .filter((s) => s.category_id === cat.id)
          .map((s) => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
            categoryId: s.category_id,
            description: s.description || '',
            startingPrice: Number(s.starting_price) || 25,
            priceUnit: (s.price_unit as 'hour' | 'job' | 'visit' | 'day') || 'hour',
            currency: s.currency || 'USD',
            popular: s.is_popular ?? false,
            estimatedDuration: s.estimated_duration || '1-2 hours',
            iconName: s.icon_name || 'Sparkles',
          }));

        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description || '',
          iconName: cat.icon_name || 'Sparkles',
          accentColor: cat.accent_color || 'cyan',
          accentHex: cat.accent_hex || '#06B6D4',
          services: servicesForCat.length > 0 ? servicesForCat : (
            CATEGORIES_DATA.find((c) => c.slug === cat.slug)?.services || []
          ),
          totalProvidersCount: cat.total_providers_count || 12,
        };
      });
    } catch (err) {
      console.warn('[Supabase] Category fetch fallback to local data:', err);
      return CATEGORIES_DATA;
    }
  },

  /**
   * Fetch a single category by its slug
   */
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const categories = await this.getCategories();
    return categories.find((c) => c.slug === slug);
  },

  /**
   * Fetch a service item by its unique slug
   */
  async getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
    const categories = await this.getCategories();
    for (const cat of categories) {
      const match = cat.services.find((s) => s.slug === slug);
      if (match) return match;
    }
    return undefined;
  },
};
