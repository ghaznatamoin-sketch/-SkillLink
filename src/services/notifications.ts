import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { AppNotification } from '@/types/message';
import { INITIAL_NOTIFICATIONS } from '@/data/messages';

export const notificationService = {
  /**
   * Fetch notifications for a user
   */
  async getNotifications(userId?: string): Promise<AppNotification[]> {
    if (!isSupabaseConfigured) {
      return INITIAL_NOTIFICATIONS;
    }

    try {
      let query = supabase.from('notifications').select('*');
      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return INITIAL_NOTIFICATIONS;
      }

      return data.map((row: any) => ({
        id: row.id,
        userId: row.user_id,
        userRole: 'customer',
        title: row.title,
        message: row.message,
        timestamp: row.created_at ? new Date(row.created_at).toLocaleDateString() : 'Today',
        isRead: row.is_read ?? false,
        type: row.type || 'system',
        linkUrl: row.link_url,
      }));
    } catch (err) {
      return INITIAL_NOTIFICATIONS;
    }
  },

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId: string) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      return { success: !error, error: error?.message };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
