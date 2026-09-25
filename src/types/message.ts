export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'worker' | 'admin';
  recipientId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatThread {
  id: string;
  bookingId?: string;
  participantCustomer: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  participantWorker: {
    id: string;
    name: string;
    avatarUrl?: string;
    title?: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  serviceTitle: string;
  messages: ChatMessage[];
}

export interface AppNotification {
  id: string;
  userId: string;
  userRole: 'customer' | 'worker' | 'admin';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'booking_request' | 'booking_accepted' | 'booking_status' | 'review' | 'system' | 'payout';
  linkUrl?: string;
}
