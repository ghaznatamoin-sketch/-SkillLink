import { ChatThread, AppNotification } from '@/types/message';

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread-1',
    bookingId: 'bk-1002',
    participantCustomer: {
      id: 'cust-marcus',
      name: 'Marcus Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    participantWorker: {
      id: 'prov-amara-bello',
      name: 'Amara Bello',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      title: 'Senior Master Electrician'
    },
    lastMessage: 'I am in your street right now, will buzz your intercom in 2 minutes.',
    lastMessageTime: '13:58 PM',
    unreadCount: 1,
    serviceTitle: 'Electrician — Breaker Panel Fix',
    messages: [
      {
        id: 'msg-1',
        senderId: 'cust-marcus',
        senderName: 'Marcus Chen',
        senderRole: 'customer',
        recipientId: 'prov-amara-bello',
        content: 'Hi Amara, wanted to confirm if you will bring a 32A replacement breaker with you?',
        timestamp: '11:20 AM',
        isRead: true
      },
      {
        id: 'msg-2',
        senderId: 'prov-amara-bello',
        senderName: 'Amara Bello',
        senderRole: 'worker',
        recipientId: 'cust-marcus',
        content: 'Yes Marcus, I have several DIN rail breakers (Schneider and ABB) in my service van!',
        timestamp: '11:25 AM',
        isRead: true
      },
      {
        id: 'msg-3',
        senderId: 'prov-amara-bello',
        senderName: 'Amara Bello',
        senderRole: 'worker',
        recipientId: 'cust-marcus',
        content: 'I am in your street right now, will buzz your intercom in 2 minutes.',
        timestamp: '13:58 PM',
        isRead: false
      }
    ]
  },
  {
    id: 'thread-2',
    bookingId: 'bk-1004',
    participantCustomer: {
      id: 'cust-tariq',
      name: 'Tariq Al-Mansoor',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    participantWorker: {
      id: 'prov-rafael-costa',
      name: 'Rafael Costa',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: 'Certified Master AC Tech'
    },
    lastMessage: 'Got it Tariq, I have your gate code noted down.',
    lastMessageTime: '08:45 AM',
    unreadCount: 0,
    serviceTitle: 'AC Technician — Coil Service',
    messages: [
      {
        id: 'msg-201',
        senderId: 'cust-tariq',
        senderName: 'Tariq Al-Mansoor',
        senderRole: 'customer',
        recipientId: 'prov-rafael-costa',
        content: 'Hello Rafael, parking is free in basement slot #102.',
        timestamp: '08:30 AM',
        isRead: true
      },
      {
        id: 'msg-202',
        senderId: 'prov-rafael-costa',
        senderName: 'Rafael Costa',
        senderRole: 'worker',
        recipientId: 'cust-tariq',
        content: 'Got it Tariq, I have your gate code noted down.',
        timestamp: '08:45 AM',
        isRead: true
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'cust-amara',
    userRole: 'customer',
    title: 'Booking Accepted',
    message: 'Rafael Costa has accepted your AC Technician service request for Sep 26.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'booking_accepted',
    linkUrl: '/customer/bookings/bk-1004'
  },
  {
    id: 'notif-2',
    userId: 'prov-rafael-costa',
    userRole: 'worker',
    title: 'New Service Request',
    message: 'You have a new request for AC Technician from Tariq Al-Mansoor.',
    timestamp: '3 hours ago',
    isRead: false,
    type: 'booking_request',
    linkUrl: '/worker/requests'
  },
  {
    id: 'notif-3',
    userId: 'prov-rafael-costa',
    userRole: 'worker',
    title: 'Payment Credited',
    message: 'Earnings of $90.00 have been credited for completed booking #bk-1001.',
    timestamp: '1 day ago',
    isRead: true,
    type: 'payout',
    linkUrl: '/worker/earnings'
  },
  {
    id: 'notif-4',
    userId: 'admin-1',
    userRole: 'admin',
    title: 'Worker Verification Request',
    message: 'Priya Sharma has submitted updated certificates for review.',
    timestamp: '5 hours ago',
    isRead: false,
    type: 'system',
    linkUrl: '/admin/workers'
  }
];
