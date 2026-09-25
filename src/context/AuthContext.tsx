'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '@/types/user';
import { authService, SignUpParams } from '@/services/auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isSupabaseConnected: boolean;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (params: SignUpParams) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const DEMO_USERS: Record<UserRole, User | null> = {
  customer: {
    id: 'cust-amara',
    name: 'Amara Bello',
    email: 'amara.bello@example.com',
    role: 'customer',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+234 801 234 5678',
    location: 'Lagos, Nigeria',
    address: '14 Admiralty Way, Lekki Phase 1',
    createdAt: '2023-01-15',
    status: 'active',
    isVerified: true
  },
  worker: {
    id: 'prov-rafael-costa',
    name: 'Rafael Costa',
    email: 'rafael.costa@skilllink.pro',
    role: 'worker',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+55 11 98765 4321',
    location: 'São Paulo, Brazil',
    address: 'Av. Paulista 1000, Bela Vista',
    createdAt: '2023-03-10',
    status: 'active',
    isVerified: true
  },
  admin: {
    id: 'admin-meera',
    name: 'Meera Nair',
    email: 'admin@skilllink.global',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+1 415 555 0199',
    location: 'San Francisco, USA',
    address: 'SkillLink HQ, Market St',
    createdAt: '2022-10-01',
    status: 'active',
    isVerified: true
  },
  guest: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('customer');
  const [user, setUser] = useState<User | null>(DEMO_USERS.customer);

  useEffect(() => {
    // Check if real Supabase session exists
    if (isSupabaseConfigured) {
      authService.getCurrentProfile().then((profile) => {
        if (profile) {
          setUser(profile);
          setRole(profile.role);
          return;
        }
      });

      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await authService.getCurrentProfile();
          if (profile) {
            setUser(profile);
            setRole(profile.role);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setRole('guest');
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }

    // Fallback: restore saved demo role
    const savedRole = localStorage.getItem('skilllink_demo_role') as UserRole;
    if (savedRole && DEMO_USERS[savedRole] !== undefined) {
      setRole(savedRole);
      setUser(DEMO_USERS[savedRole]);
    }
  }, []);

  const switchRole = useCallback((newRole: UserRole) => {
    setRole(newRole);
    setUser(DEMO_USERS[newRole]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('skilllink_demo_role', newRole);
    }
  }, []);

  const login = useCallback(async (email: string, selectedRole: UserRole = 'customer', password?: string) => {
    if (isSupabaseConfigured) {
      const { data, error } = await authService.signIn(email, password);
      if (error) {
        return { success: false, error };
      }
      const profile = await authService.getCurrentProfile();
      if (profile) {
        setUser(profile);
        setRole(profile.role);
      }
      return { success: true };
    }

    // Demo mode login
    const defaultUser = DEMO_USERS[selectedRole];
    if (defaultUser) {
      setUser({ ...defaultUser, email });
    }
    setRole(selectedRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('skilllink_demo_role', selectedRole);
    }
    return { success: true };
  }, []);

  const signUp = useCallback(async (params: SignUpParams) => {
    if (isSupabaseConfigured) {
      const { user: newUser, error } = await authService.signUp(params);
      if (error) {
        return { success: false, error };
      }
      if (newUser) {
        const profile = await authService.getCurrentProfile();
        if (profile) {
          setUser(profile);
          setRole(profile.role);
        }
      }
      return { success: true };
    }

    // Demo mode registration
    const newUser: User = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: params.fullName,
      email: params.email,
      role: params.role,
      phone: params.phone || '+1 555 0100',
      location: params.location || 'New York, USA',
      address: params.address || 'Central District',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      isVerified: false,
    };
    setUser(newUser);
    setRole(params.role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('skilllink_demo_role', params.role);
    }
    return { success: true };
  }, []);

  const loginWithGoogle = useCallback(async () => {
    await authService.signInWithOAuth('google');
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) {
      await authService.signOut();
    }
    setRole('guest');
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.setItem('skilllink_demo_role', 'guest');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: role !== 'guest' && user !== null,
        isSupabaseConnected: isSupabaseConfigured,
        switchRole,
        login,
        signUp,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
