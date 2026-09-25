'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Booking, JobStatus, BookingTimelineEvent } from '@/types/booking';
import { Provider } from '@/types/provider';
import { Review, Complaint } from '@/types/review';
import { ChatThread, ChatMessage, AppNotification } from '@/types/message';
import { INITIAL_BOOKINGS_DATA } from '@/data/bookings';
import { INITIAL_PROVIDERS_DATA } from '@/data/providers';
import { INITIAL_REVIEWS_DATA, INITIAL_COMPLAINTS_DATA } from '@/data/reviews';
import { INITIAL_CHAT_THREADS, INITIAL_NOTIFICATIONS } from '@/data/messages';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  bookingService,
  providerService,
  reviewService,
  messageService,
  notificationService,
} from '@/services';

interface MarketplaceContextType {
  bookings: Booking[];
  providers: Provider[];
  reviews: Review[];
  complaints: Complaint[];
  chatThreads: ChatThread[];
  notifications: AppNotification[];
  commissionRate: number; // e.g., 10 for 10%
  isSupabaseActive: boolean;
  // Actions
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'timeline'>) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: JobStatus, note?: string) => Promise<void>;
  addReview: (review: Omit<Review, 'id' | 'date'>) => Promise<void>;
  toggleWorkerVerification: (providerId: string) => Promise<void>;
  updateCommissionRate: (rate: number) => void;
  sendMessage: (threadId: string, content: string, senderId: string, senderName: string, senderRole: 'customer' | 'worker' | 'admin') => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  updateWorkerProfile: (providerId: string, updates: Partial<Provider>) => Promise<void>;
  resolveComplaint: (complaintId: string, resolution: string) => void;
  getProviderById: (id: string) => Provider | undefined;
  getBookingById: (id: string) => Booking | undefined;
  getReviewsByProviderId: (providerId: string) => Review[];
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS_DATA);
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS_DATA);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS_DATA);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS_DATA);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [commissionRate, setCommissionRate] = useState<number>(10);

  // Load live data from Supabase if configured or fallback to local storage
  useEffect(() => {
    async function loadData() {
      if (isSupabaseConfigured) {
        try {
          const [loadedProviders, loadedBookings, loadedReviews, loadedComplaints, loadedThreads, loadedNotifications] =
            await Promise.all([
              providerService.getProviders(),
              bookingService.getBookings(),
              reviewService.getReviews(),
              reviewService.getComplaints(),
              messageService.getThreads(),
              notificationService.getNotifications(),
            ]);

          if (loadedProviders && loadedProviders.length > 0) setProviders(loadedProviders);
          if (loadedBookings && loadedBookings.length > 0) setBookings(loadedBookings);
          if (loadedReviews && loadedReviews.length > 0) setReviews(loadedReviews);
          if (loadedComplaints && loadedComplaints.length > 0) setComplaints(loadedComplaints);
          if (loadedThreads && loadedThreads.length > 0) setChatThreads(loadedThreads);
          if (loadedNotifications && loadedNotifications.length > 0) setNotifications(loadedNotifications);
        } catch (err) {
          console.warn('[Marketplace] Data sync fallback:', err);
        }
      } else {
        try {
          const savedBookings = localStorage.getItem('skilllink_bookings');
          if (savedBookings) setBookings(JSON.parse(savedBookings));

          const savedCommission = localStorage.getItem('skilllink_commission');
          if (savedCommission) setCommissionRate(Number(savedCommission));
        } catch (e) {
          console.warn('LocalStorage error:', e);
        }
      }
    }

    loadData();
  }, []);

  // Save changes to localStorage for offline persistence
  const persistBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('skilllink_bookings', JSON.stringify(newBookings));
    }
  };

  const createBooking = useCallback(
    async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'timeline'>): Promise<Booking> => {
      const { booking } = await bookingService.createBooking(bookingData);
      const resultingBooking = booking || {
        ...bookingData,
        id: `bk-${Date.now().toString().slice(-4)}`,
        createdAt: new Date().toISOString(),
        timeline: [{ status: 'requested' as JobStatus, timestamp: new Date().toISOString(), note: 'Booking request placed' }],
        hasReviewed: false,
      };

      const updated = [resultingBooking, ...bookings];
      persistBookings(updated);

      // Notification for worker
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: bookingData.providerId,
        userRole: 'worker',
        title: 'New Booking Request',
        message: `${bookingData.customerName} requested ${bookingData.serviceName} for ${bookingData.date}.`,
        timestamp: 'Just now',
        isRead: false,
        type: 'booking_request',
        linkUrl: `/worker/requests`,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      return resultingBooking;
    },
    [bookings]
  );

  const updateBookingStatus = useCallback(
    async (bookingId: string, newStatus: JobStatus, note?: string) => {
      await bookingService.updateStatus(bookingId, newStatus, note);

      setBookings((prev) => {
        const updated = prev.map((bk) => {
          if (bk.id === bookingId) {
            const updatedTimeline: BookingTimelineEvent[] = [
              ...bk.timeline,
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                note: note || `Status transitioned to ${newStatus.replace('_', ' ')}`,
              },
            ];
            return {
              ...bk,
              status: newStatus,
              timeline: updatedTimeline,
            };
          }
          return bk;
        });
        if (typeof window !== 'undefined') {
          localStorage.setItem('skilllink_bookings', JSON.stringify(updated));
        }
        return updated;
      });

      // Notify customer of update
      const targetBooking = bookings.find((b) => b.id === bookingId);
      if (targetBooking) {
        const notif: AppNotification = {
          id: `notif-${Date.now()}`,
          userId: targetBooking.customerId,
          userRole: 'customer',
          title: `Booking ${newStatus.replace('_', ' ').toUpperCase()}`,
          message: `Your booking for ${targetBooking.serviceName} is now ${newStatus.replace('_', ' ')}.`,
          timestamp: 'Just now',
          isRead: false,
          type: 'booking_status',
          linkUrl: `/customer/bookings/${bookingId}`,
        };
        setNotifications((prev) => [notif, ...prev]);
      }
    },
    [bookings]
  );

  const addReview = useCallback(
    async (reviewData: Omit<Review, 'id' | 'date'>) => {
      await reviewService.addReview(reviewData);

      const newReview: Review = {
        ...reviewData,
        id: `rev-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0],
      };

      setReviews((prev) => [newReview, ...prev]);

      // Mark booking as reviewed
      setBookings((prev) => {
        const updated = prev.map((b) =>
          b.id === reviewData.bookingId ? { ...b, hasReviewed: true } : b
        );
        if (typeof window !== 'undefined') {
          localStorage.setItem('skilllink_bookings', JSON.stringify(updated));
        }
        return updated;
      });

      // Update provider rating & review count
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id === reviewData.providerId) {
            const newCount = p.reviewCount + 1;
            const newRating = Number(
              ((p.rating * p.reviewCount + reviewData.rating) / newCount).toFixed(2)
            );
            return {
              ...p,
              rating: newRating,
              reviewCount: newCount,
            };
          }
          return p;
        })
      );
    },
    []
  );

  const toggleWorkerVerification = useCallback(async (providerId: string) => {
    const target = providers.find((p) => p.id === providerId);
    if (target) {
      await providerService.toggleVerification(providerId, target.isVerified);
    }
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, isVerified: !p.isVerified } : p))
    );
  }, [providers]);

  const updateCommissionRate = useCallback((rate: number) => {
    setCommissionRate(rate);
    if (typeof window !== 'undefined') {
      localStorage.setItem('skilllink_commission', rate.toString());
    }
  }, []);

  const sendMessage = useCallback(
    async (
      threadId: string,
      content: string,
      senderId: string,
      senderName: string,
      senderRole: 'customer' | 'worker' | 'admin'
    ) => {
      await messageService.sendMessage({
        bookingId: threadId.replace('th-', ''),
        senderId,
        receiverId: 'counterpart',
        content,
      });

      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId,
        senderName,
        senderRole,
        recipientId: 'other',
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      };

      setChatThreads((prev) =>
        prev.map((t) => {
          if (t.id === threadId) {
            return {
              ...t,
              lastMessage: content,
              lastMessageTime: 'Just now',
              messages: [...t.messages, newMsg],
            };
          }
          return t;
        })
      );
    },
    []
  );

  const markNotificationAsRead = useCallback(async (notificationId: string) => {
    await notificationService.markAsRead(notificationId);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  }, []);

  const updateWorkerProfile = useCallback(async (providerId: string, updates: Partial<Provider>) => {
    await providerService.updateWorkerProfile(providerId, updates);
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, ...updates } : p))
    );
  }, []);

  const resolveComplaint = useCallback((complaintId: string, resolution: string) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId ? { ...c, status: 'resolved', resolution } : c
      )
    );
  }, []);

  const getProviderById = useCallback(
    (id: string) => providers.find((p) => p.id === id),
    [providers]
  );

  const getBookingById = useCallback(
    (id: string) => bookings.find((b) => b.id === id),
    [bookings]
  );

  const getReviewsByProviderId = useCallback(
    (providerId: string) => reviews.filter((r) => r.providerId === providerId),
    [reviews]
  );

  return (
    <MarketplaceContext.Provider
      value={{
        bookings,
        providers,
        reviews,
        complaints,
        chatThreads,
        notifications,
        commissionRate,
        isSupabaseActive: isSupabaseConfigured,
        createBooking,
        updateBookingStatus,
        addReview,
        toggleWorkerVerification,
        updateCommissionRate,
        sendMessage,
        markNotificationAsRead,
        updateWorkerProfile,
        resolveComplaint,
        getProviderById,
        getBookingById,
        getReviewsByProviderId,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
