import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { ChatThread, ChatMessage } from '@/types/message';
import { INITIAL_CHAT_THREADS } from '@/data/messages';

export const messageService = {
  /**
   * Fetch chat threads
   */
  async getThreads(userId?: string): Promise<ChatThread[]> {
    if (!isSupabaseConfigured) {
      return INITIAL_CHAT_THREADS;
    }

    try {
      let query = supabase.from('messages').select(`
        id,
        booking_id,
        sender_id,
        receiver_id,
        content,
        is_read,
        created_at,
        sender:sender_id (full_name, role, avatar_url),
        receiver:receiver_id (full_name, role, avatar_url)
      `);

      if (userId) {
        query = query.or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);
      }

      const { data, error } = await query.order('created_at', { ascending: true });

      if (error || !data || data.length === 0) {
        return INITIAL_CHAT_THREADS;
      }

      // Group messages by booking_id
      const threadsMap = new Map<string, ChatThread>();

      data.forEach((m: any) => {
        const threadId = m.booking_id ? `th-${m.booking_id}` : `th-general`;
        const sender = Array.isArray(m.sender) ? m.sender[0] : m.sender;
        const receiver = Array.isArray(m.receiver) ? m.receiver[0] : m.receiver;

        const chatMsg: ChatMessage = {
          id: m.id,
          senderId: m.sender_id,
          senderName: sender?.full_name || 'User',
          senderRole: sender?.role || 'customer',
          recipientId: m.receiver_id,
          content: m.content,
          timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: m.is_read,
        };

        if (!threadsMap.has(threadId)) {
          threadsMap.set(threadId, {
            id: threadId,
            bookingId: m.booking_id,
            participantCustomer: {
              id: sender?.role === 'customer' ? m.sender_id : m.receiver_id,
              name: sender?.role === 'customer' ? sender?.full_name : receiver?.full_name || 'Customer',
              avatarUrl: sender?.role === 'customer' ? sender?.avatar_url : receiver?.avatar_url,
            },
            participantWorker: {
              id: sender?.role === 'worker' ? m.sender_id : m.receiver_id,
              name: sender?.role === 'worker' ? sender?.full_name : receiver?.full_name || 'Provider',
              avatarUrl: sender?.role === 'worker' ? sender?.avatar_url : receiver?.avatar_url,
              title: 'Verified Specialist',
            },
            lastMessage: m.content,
            lastMessageTime: 'Just now',
            unreadCount: m.is_read ? 0 : 1,
            serviceTitle: 'Service Job Discussion',
            messages: [chatMsg],
          });
        } else {
          const thread = threadsMap.get(threadId)!;
          thread.messages.push(chatMsg);
          thread.lastMessage = m.content;
          if (!m.is_read) thread.unreadCount += 1;
        }
      });

      return Array.from(threadsMap.values());
    } catch (err) {
      console.warn('[Supabase] Messages fallback:', err);
      return INITIAL_CHAT_THREADS;
    }
  },

  /**
   * Send a new chat message
   */
  async sendMessage(params: {
    bookingId?: string;
    senderId: string;
    receiverId: string;
    content: string;
  }) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('messages').insert({
        booking_id: params.bookingId || null,
        sender_id: params.senderId,
        receiver_id: params.receiverId,
        content: params.content,
        is_read: false,
      });

      return { success: !error, error: error?.message };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
