import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Booking, JobStatus, BookingTimelineEvent } from '@/types/booking';
import { INITIAL_BOOKINGS_DATA } from '@/data/bookings';

export const bookingService = {
  /**
   * Fetch all bookings or filter by role / user ID
   */
  async getBookings(userId?: string, role?: 'customer' | 'worker' | 'admin'): Promise<Booking[]> {
    if (!isSupabaseConfigured) {
      return INITIAL_BOOKINGS_DATA;
    }

    try {
      let query = supabase.from('bookings').select(`
        *,
        timeline:booking_timeline (*)
      `);

      if (role === 'customer' && userId) {
        query = query.eq('customer_id', userId);
      } else if (role === 'worker' && userId) {
        query = query.eq('provider_id', userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return INITIAL_BOOKINGS_DATA;
      }

      return data.map((row: any) => {
        const sortedTimeline: BookingTimelineEvent[] = (row.timeline || [])
          .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
          .map((t: any) => ({
            status: t.status as JobStatus,
            timestamp: t.created_at,
            note: t.note,
          }));

        return {
          id: row.id,
          customerId: row.customer_id,
          customerName: row.customer_name || 'Customer',
          customerPhone: row.customer_phone || '',
          customerEmail: row.customer_email || '',
          providerId: row.provider_id,
          providerName: row.provider_name || 'Service Provider',
          providerAvatarUrl: row.provider_avatar_url,
          serviceId: row.service_id,
          serviceName: row.service_name || 'Home Service',
          categoryId: row.category_id || 'home-repairs',
          categoryName: row.category_name || 'Home & Professional Services',
          status: row.status as JobStatus,
          date: row.scheduled_date,
          timeSlot: row.time_slot || 'Morning (09:00 - 12:00)',
          address: {
            street: row.street_address || '123 Main St',
            city: row.city || 'Lagos',
            country: row.country || 'Nigeria',
            notes: row.address_notes || '',
          },
          jobDescription: row.job_description || '',
          pricing: {
            baseAmount: Number(row.base_amount) || 50,
            serviceFee: Number(row.service_fee) || 10,
            totalCustomerPayment: Number(row.total_customer_payment) || 60,
            platformCommissionPercent: Number(row.platform_commission_percent) || 10,
            platformCommissionAmount: Number(row.platform_commission_amount) || 6.0,
            workerEarningsAmount: Number(row.worker_earnings_amount) || 54.0,
            currency: row.currency || 'USD',
          },
          createdAt: row.created_at,
          timeline: sortedTimeline.length > 0 ? sortedTimeline : [
            { status: row.status as JobStatus, timestamp: row.created_at, note: 'Booking initiated' },
          ],
          hasReviewed: row.has_reviewed ?? false,
        };
      });
    } catch (err) {
      console.warn('[Supabase] Bookings fallback to local data:', err);
      return INITIAL_BOOKINGS_DATA;
    }
  },

  /**
   * Create a new booking
   */
  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'timeline'>): Promise<{ booking: Booking | null; error: string | null }> {
    const fallbackId = `bk-${Date.now().toString().slice(-4)}`;
    const now = new Date().toISOString();

    const localBooking: Booking = {
      ...bookingData,
      id: fallbackId,
      createdAt: now,
      timeline: [{ status: 'requested', timestamp: now, note: 'Booking request placed by customer' }],
      hasReviewed: false,
    };

    if (!isSupabaseConfigured) {
      return { booking: localBooking, error: null };
    }

    try {
      // 1. Insert into bookings table
      const { data: inserted, error: insertError } = await supabase
        .from('bookings')
        .insert({
          id: fallbackId,
          customer_id: bookingData.customerId,
          customer_name: bookingData.customerName,
          customer_phone: bookingData.customerPhone || null,
          customer_email: bookingData.customerEmail || null,
          provider_id: bookingData.providerId,
          provider_name: bookingData.providerName,
          provider_avatar_url: bookingData.providerAvatarUrl || null,
          service_id: bookingData.serviceId,
          service_name: bookingData.serviceName,
          category_id: bookingData.categoryId,
          category_name: bookingData.categoryName,
          status: 'requested',
          scheduled_date: bookingData.date,
          time_slot: bookingData.timeSlot,
          street_address: bookingData.address.street,
          city: bookingData.address.city,
          country: bookingData.address.country,
          address_notes: bookingData.address.notes || null,
          job_description: bookingData.jobDescription,
          currency: bookingData.pricing.currency,
          base_amount: bookingData.pricing.baseAmount,
          service_fee: bookingData.pricing.serviceFee || 10.0,
          total_customer_payment: bookingData.pricing.totalCustomerPayment,
          platform_commission_percent: bookingData.pricing.platformCommissionPercent,
          platform_commission_amount: bookingData.pricing.platformCommissionAmount,
          worker_earnings_amount: bookingData.pricing.workerEarningsAmount,
          has_reviewed: false,
        })
        .select()
        .single();

      if (insertError) {
        console.warn('[Supabase] Insert booking notice:', insertError.message);
      }

      const bookingId = inserted?.id || fallbackId;

      // 2. Insert initial timeline record
      await supabase.from('booking_timeline').insert({
        booking_id: bookingId,
        status: 'requested',
        note: 'Booking request placed by customer',
      });

      // 3. Create a notification for worker
      await supabase.from('notifications').insert({
        id: `notif-${Date.now()}`,
        user_id: bookingData.providerId,
        title: 'New Booking Request',
        message: `${bookingData.customerName} requested ${bookingData.serviceName} for ${bookingData.date}.`,
        type: 'booking_request',
        link_url: `/worker/requests`,
      });

      localBooking.id = bookingId;
      return { booking: localBooking, error: null };
    } catch (err: any) {
      return { booking: localBooking, error: err.message };
    }
  },

  /**
   * Update status transition of a booking
   */
  async updateStatus(bookingId: string, newStatus: JobStatus, note?: string) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      // Add timeline event
      await supabase.from('booking_timeline').insert({
        booking_id: bookingId,
        status: newStatus,
        note: note || `Status transitioned to ${newStatus.replace('_', ' ')}`,
      });

      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
