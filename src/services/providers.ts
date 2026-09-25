import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Provider } from '@/types/provider';
import { INITIAL_PROVIDERS_DATA } from '@/data/providers';

export const providerService = {
  /**
   * Fetch all providers / workers
   */
  async getProviders(): Promise<Provider[]> {
    if (!isSupabaseConfigured) {
      return INITIAL_PROVIDERS_DATA;
    }

    try {
      const { data, error } = await supabase
        .from('worker_profiles')
        .select(`
          id,
          user_id,
          title,
          bio,
          hourly_rate,
          experience_years,
          is_available,
          is_verified,
          availability_schedule,
          completed_jobs_count,
          rating,
          review_count,
          city,
          country,
          service_radius_km,
          badge,
          response_time,
          profiles:user_id (
            id,
            name,
            email,
            avatar_url,
            location,
            created_at
          )
        `);

      if (error || !data || data.length === 0) {
        return INITIAL_PROVIDERS_DATA;
      }

      return data.map((row: any) => {
        const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
        return {
          id: row.id,
          userId: row.user_id || row.id,
          name: profile?.name || 'Service Specialist',
          title: row.title || 'Verified Professional',
          avatarUrl: profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          bio: row.bio || '',
          rating: Number(row.rating) || 5.0,
          reviewCount: Number(row.review_count) || 0,
          experienceYears: Number(row.experience_years) || 2,
          completedJobsCount: Number(row.completed_jobs_count) || 0,
          hourlyRate: Number(row.hourly_rate) || 35,
          currency: 'USD',
          isVerified: row.is_verified ?? true,
          isAvailable: row.is_available ?? true,
          availabilitySchedule: row.availability_schedule || 'Mon-Sat: 8:00 AM - 6:00 PM',
          location: {
            city: row.city || profile?.location?.split(',')[0]?.trim() || 'Global',
            country: row.country || profile?.location?.split(',')[1]?.trim() || 'Worldwide',
            serviceRadiusKm: row.service_radius_km || 25,
            neighborhoods: ['Central', 'Metro Area'],
          },
          skills: ['Professional Service', 'Quality Work', 'Safety Certified'],
          servicesOffered: [],
          languages: ['English'],
          badge: row.badge || 'Verified Pro',
          responseTime: row.response_time || '< 30 mins',
          joinedDate: profile?.created_at ? profile.created_at.split('T')[0] : '2023-01-01',
          portfolioImages: [],
        };
      });
    } catch (err) {
      console.warn('[Supabase] Providers fetch fallback:', err);
      return INITIAL_PROVIDERS_DATA;
    }
  },

  /**
   * Update worker profile info
   */
  async updateWorkerProfile(workerId: string, updates: Partial<Provider>) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('worker_profiles')
        .update({
          title: updates.title,
          bio: updates.bio,
          hourly_rate: updates.hourlyRate,
          experience_years: updates.experienceYears,
          is_available: updates.isAvailable,
          availability_schedule: updates.availabilitySchedule,
        })
        .eq('id', workerId);

      return { success: !error, error: error?.message };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Toggle worker verification flag (Admin role)
   */
  async toggleVerification(workerId: string, currentStatus: boolean) {
    if (!isSupabaseConfigured) {
      return { success: true, isVerified: !currentStatus };
    }

    try {
      const { error } = await supabase
        .from('worker_profiles')
        .update({ is_verified: !currentStatus })
        .eq('id', workerId);

      return { success: !error, isVerified: !currentStatus, error: error?.message };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
