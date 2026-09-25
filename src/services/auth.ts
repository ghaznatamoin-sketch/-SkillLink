import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { User, UserRole } from '@/types/user';

export interface SignUpParams {
  email: string;
  password?: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  location?: string;
  address?: string;
}

export const authService = {
  /**
   * Register a new user with email & password via Supabase Auth
   * and create their matching record in the public.profiles table.
   */
  async signUp({ email, password = 'DefaultPassword123!', fullName, role, phone, location, address }: SignUpParams) {
    if (!isSupabaseConfigured) {
      console.info('[Supabase] Demo mode active: mocked signup for', email);
      return {
        user: {
          id: `usr-${Date.now()}`,
          name: fullName,
          email,
          role,
          phone: phone || '',
          location: location || '',
          address: address || '',
          createdAt: new Date().toISOString().split('T')[0],
          status: 'active' as const,
          isVerified: false,
        },
        error: null,
      };
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            name: fullName,
            role: role,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Upsert public.profiles
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: authData.user.id,
          email,
          name: fullName,
          role,
          phone: phone || null,
          location: location || null,
          address: address || null,
          status: 'active',
        });

        if (profileError) {
          console.warn('[Supabase] Profile creation notice:', profileError.message);
        }

        // If worker, also create a base worker profile
        if (role === 'worker') {
          const cityVal = location?.split(',')[0]?.trim() || 'Global';
          const countryVal = location?.split(',')[1]?.trim() || 'Worldwide';

          await supabase.from('worker_profiles').upsert({
            id: authData.user.id,
            user_id: authData.user.id,
            title: 'Professional Service Specialist',
            bio: 'Experienced verified technician ready for on-demand bookings.',
            hourly_rate: 45.00,
            experience_years: 3,
            is_available: true,
            is_verified: false,
            city: cityVal,
            country: countryVal,
            service_radius_km: 25,
            badge: 'Verified Pro',
            response_time: '< 30 mins',
          });
        }
      }

      return { user: authData.user, error: null };
    } catch (err: unknown) {
      const error = err as Error;
      return { user: null, error: error.message };
    }
  },

  /**
   * Sign in user with email and password
   */
  async signIn(email: string, password?: string) {
    if (!isSupabaseConfigured) {
      console.info('[Supabase] Demo mode active: mocked login for', email);
      return { data: { email }, error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || 'DefaultPassword123!',
      });
      if (error) throw error;
      return { data, error: null };
    } catch (err: unknown) {
      const error = err as Error;
      return { data: null, error: error.message };
    }
  },

  /**
   * Sign in with Google OAuth provider
   */
  async signInWithOAuth(provider: 'google' = 'google') {
    if (!isSupabaseConfigured) {
      console.info('[Supabase] Demo mode active: Google OAuth triggered in simulation.');
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
      },
    });

    return { error: error ? error.message : null };
  },

  /**
   * Sign out current user session
   */
  async signOut() {
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    const { error } = await supabase.auth.signOut();
    return { error: error ? error.message : null };
  },

  /**
   * Fetch current authenticated session profile
   */
  async getCurrentProfile(): Promise<User | null> {
    if (!isSupabaseConfigured) {
      return null;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error || !data) return null;

      return {
        id: data.id,
        name: data.name || data.full_name || 'User',
        email: data.email,
        role: data.role as UserRole,
        avatarUrl: data.avatar_url,
        phone: data.phone,
        location: data.location,
        address: data.address,
        createdAt: data.created_at,
        status: data.status || 'active',
        isVerified: data.is_verified ?? false,
      };
    } catch (err) {
      console.error('[Supabase] getCurrentProfile error:', err);
      return null;
    }
  },
};
