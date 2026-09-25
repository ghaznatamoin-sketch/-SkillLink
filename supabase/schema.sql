-- =============================================================================
-- SkillLink — Worldwide Services Marketplace PostgreSQL Database Schema
-- Based on: 03-PRD.md, 04-MVP-Technical-Specification.md, 08-Full-Stack-Integration.md
-- =============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PROFILES / USERS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'worker', 'admin')),
  phone TEXT,
  location TEXT,
  address TEXT,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 2. CUSTOMER PROFILES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  preferred_payment_method TEXT DEFAULT 'cash',
  default_address TEXT,
  default_city TEXT,
  default_country TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 3. WORKER PROFILES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.worker_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  hourly_rate NUMERIC(10, 2) NOT NULL DEFAULT 40.00,
  currency TEXT NOT NULL DEFAULT 'USD',
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00,
  review_count INTEGER NOT NULL DEFAULT 0,
  experience_years INTEGER NOT NULL DEFAULT 1,
  completed_jobs_count INTEGER NOT NULL DEFAULT 0,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT true,
  availability_schedule TEXT DEFAULT 'Mon - Sat: 8:00 AM - 6:00 PM',
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  service_radius_km INTEGER NOT NULL DEFAULT 25,
  badge TEXT CHECK (badge IN ('Top Rated', 'Verified Pro', 'Fast Responder', 'Elite Specialist')),
  response_time TEXT DEFAULT '< 30 mins',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 4. CATEGORIES TABLE (All 10 Core Defined Sectors)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  accent_hex TEXT NOT NULL,
  total_providers_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 5. SERVICES TABLE (All 71 Individual Services)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  starting_price NUMERIC(10, 2) NOT NULL,
  price_unit TEXT NOT NULL CHECK (price_unit IN ('hour', 'job', 'visit', 'day')),
  currency TEXT NOT NULL DEFAULT 'USD',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  estimated_duration TEXT,
  icon_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 6. WORKER SERVICES (Join Table)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.worker_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  price NUMERIC(10, 2) NOT NULL,
  price_unit TEXT NOT NULL DEFAULT 'hour',
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(worker_id, service_id)
);

-- -----------------------------------------------------------------------------
-- 7. WORKER SKILLS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.worker_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(worker_id, skill_name)
);

-- -----------------------------------------------------------------------------
-- 8. SERVICE AREAS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.service_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
  neighborhood TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 9. BOOKINGS / JOBS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  provider_id UUID NOT NULL REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL,
  provider_avatar_url TEXT,
  service_id TEXT NOT NULL REFERENCES public.services(id),
  service_name TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.categories(id),
  category_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('requested', 'accepted', 'in_progress', 'completed', 'rejected', 'cancelled')),
  scheduled_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  street_address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  address_notes TEXT,
  job_description TEXT NOT NULL,
  -- Transparent Financial Model
  base_amount NUMERIC(10, 2) NOT NULL,
  service_fee NUMERIC(10, 2) NOT NULL DEFAULT 10.00,
  total_customer_payment NUMERIC(10, 2) NOT NULL,
  platform_commission_percent NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
  platform_commission_amount NUMERIC(10, 2) NOT NULL,
  worker_earnings_amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  has_reviewed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 10. BOOKING TIMELINE EVENTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.booking_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id TEXT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 11. REVIEWS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL UNIQUE REFERENCES public.bookings(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.worker_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_avatar_url TEXT,
  rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  service_name TEXT NOT NULL,
  provider_response_date DATE,
  provider_response_comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 12. PAYMENTS & TRANSACTIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id TEXT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.profiles(id),
  worker_id UUID NOT NULL REFERENCES public.worker_profiles(id),
  gross_amount NUMERIC(10, 2) NOT NULL,
  platform_fee NUMERIC(10, 2) NOT NULL,
  worker_payout NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'refunded', 'disputed')),
  payment_method TEXT DEFAULT 'card',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 13. COMMISSIONS LEDGER TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id TEXT NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  rate_percent NUMERIC(5, 2) NOT NULL,
  commission_amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'collected' CHECK (status IN ('pending', 'collected', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 14. MESSAGES / CHAT THREADS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id TEXT REFERENCES public.bookings(id) ON DELETE SET NULL,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_name TEXT NOT NULL,
  sender_role TEXT NOT NULL,
  recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 15. NOTIFICATIONS TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  type TEXT NOT NULL CHECK (type IN ('booking_request', 'booking_accepted', 'booking_status', 'review', 'system', 'payout')),
  link_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 16. COMPLAINTS & DISPUTES TABLE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.complaints (
  id TEXT PRIMARY KEY,
  booking_id TEXT REFERENCES public.bookings(id) ON DELETE SET NULL,
  complainant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  complainant_name TEXT NOT NULL,
  complainant_role TEXT NOT NULL CHECK (complainant_role IN ('customer', 'worker')),
  target_id UUID NOT NULL,
  target_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'resolved', 'dismissed')),
  resolution TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 17. ADMIN SETTINGS TABLE (Configurable Marketplace Parameters)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- 1. Public Reads for Marketplaces
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read worker profiles" ON public.worker_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read worker services" ON public.worker_services FOR SELECT USING (true);
CREATE POLICY "Allow public read worker skills" ON public.worker_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read service areas" ON public.service_areas FOR SELECT USING (true);
CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);

-- 2. Profiles Policies
CREATE POLICY "Users can view own profile or public worker profile" ON public.profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 3. Customer Profile Policies
CREATE POLICY "Customers can manage own profile" ON public.customer_profiles
  FOR ALL USING (auth.uid() = user_id);

-- 4. Worker Profile Policies
CREATE POLICY "Workers can manage own profile" ON public.worker_profiles
  FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Workers manage own services" ON public.worker_services
  FOR ALL USING (EXISTS (SELECT 1 FROM public.worker_profiles WHERE worker_profiles.id = worker_services.worker_id AND worker_profiles.user_id = auth.uid()));
CREATE POLICY "Workers manage own skills" ON public.worker_skills
  FOR ALL USING (EXISTS (SELECT 1 FROM public.worker_profiles WHERE worker_profiles.id = worker_skills.worker_id AND worker_profiles.user_id = auth.uid()));
CREATE POLICY "Workers manage own areas" ON public.service_areas
  FOR ALL USING (EXISTS (SELECT 1 FROM public.worker_profiles WHERE worker_profiles.id = service_areas.worker_id AND worker_profiles.user_id = auth.uid()));

-- 5. Bookings Policies
CREATE POLICY "Customers and Workers can view their own bookings" ON public.bookings
  FOR SELECT USING (
    auth.uid() = customer_id OR
    EXISTS (SELECT 1 FROM public.worker_profiles WHERE worker_profiles.id = bookings.provider_id AND worker_profiles.user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Customers can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Participants can update booking status" ON public.bookings
  FOR UPDATE USING (
    auth.uid() = customer_id OR
    EXISTS (SELECT 1 FROM public.worker_profiles WHERE worker_profiles.id = bookings.provider_id AND worker_profiles.user_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

CREATE POLICY "Participants can view booking timeline" ON public.booking_timeline
  FOR SELECT USING (true);

-- 6. Reviews Policies
CREATE POLICY "Customers can insert reviews for their completed bookings" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- 7. Messages Policies
CREATE POLICY "Users can view and send their own messages" ON public.messages
  FOR ALL USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- 8. Notifications Policies
CREATE POLICY "Users can manage their own notifications" ON public.notifications
  FOR ALL USING (auth.uid() = user_id);

-- 9. Admin Settings & Complaints Policies
CREATE POLICY "Anyone can read admin settings" ON public.admin_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage admin settings" ON public.admin_settings
  FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Users can create and view complaints" ON public.complaints
  FOR ALL USING (
    auth.uid() = complainant_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );
