import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Review, Complaint } from '@/types/review';
import { INITIAL_REVIEWS_DATA, INITIAL_COMPLAINTS_DATA } from '@/data/reviews';

export const reviewService = {
  /**
   * Fetch reviews
   */
  async getReviews(providerId?: string): Promise<Review[]> {
    if (!isSupabaseConfigured) {
      if (providerId) {
        return INITIAL_REVIEWS_DATA.filter((r) => r.providerId === providerId);
      }
      return INITIAL_REVIEWS_DATA;
    }

    try {
      let query = supabase.from('reviews').select('*');

      if (providerId) {
        query = query.eq('provider_id', providerId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return providerId ? INITIAL_REVIEWS_DATA.filter((r) => r.providerId === providerId) : INITIAL_REVIEWS_DATA;
      }

      return data.map((row: any) => ({
        id: row.id,
        bookingId: row.booking_id,
        providerId: row.provider_id,
        customerId: row.customer_id,
        customerName: row.customer_name || 'Verified Customer',
        customerAvatarUrl: row.customer_avatar_url,
        rating: Number(row.rating) || 5,
        comment: row.comment || '',
        serviceName: row.service_name || 'Verified Service',
        date: row.created_at ? row.created_at.split('T')[0] : '2023-01-01',
        providerResponse: row.provider_response_comment
          ? {
              date: row.provider_response_date || '',
              comment: row.provider_response_comment,
            }
          : undefined,
      }));
    } catch (err) {
      console.warn('[Supabase] Reviews fallback:', err);
      return providerId ? INITIAL_REVIEWS_DATA.filter((r) => r.providerId === providerId) : INITIAL_REVIEWS_DATA;
    }
  },

  /**
   * Add a new customer review
   */
  async addReview(reviewData: Omit<Review, 'id' | 'date'>) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const reviewId = `rev-${Date.now().toString().slice(-4)}`;
      const { error } = await supabase.from('reviews').insert({
        id: reviewId,
        booking_id: reviewData.bookingId,
        customer_id: reviewData.customerId,
        customer_name: reviewData.customerName,
        customer_avatar_url: reviewData.customerAvatarUrl || null,
        provider_id: reviewData.providerId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        service_name: reviewData.serviceName,
      });

      if (!error) {
        // Mark booking as reviewed
        await supabase
          .from('bookings')
          .update({ has_reviewed: true })
          .eq('id', reviewData.bookingId);
      }

      return { success: !error, error: error?.message };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  /**
   * Get all complaints (Admin)
   */
  async getComplaints(): Promise<Complaint[]> {
    if (!isSupabaseConfigured) {
      return INITIAL_COMPLAINTS_DATA;
    }

    try {
      const { data, error } = await supabase.from('complaints').select('*');

      if (error || !data || data.length === 0) {
        return INITIAL_COMPLAINTS_DATA;
      }

      return data.map((row: any) => ({
        id: row.id,
        bookingId: row.booking_id,
        complainantId: row.complainant_id,
        complainantName: row.complainant_name || 'Complainant',
        complainantRole: row.complainant_role || 'customer',
        targetId: row.target_id || '',
        targetName: row.target_name || 'Reported Party',
        subject: row.subject,
        description: row.description,
        status: row.status,
        createdAt: row.created_at ? row.created_at.split('T')[0] : '2023-01-01',
        resolution: row.resolution,
      }));
    } catch (err) {
      return INITIAL_COMPLAINTS_DATA;
    }
  },
};
