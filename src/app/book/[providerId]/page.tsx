'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMarketplace } from '@/context/MarketplaceContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { PriceBreakdown } from '@/components/bookings/PriceBreakdown';
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

function BookServiceContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const providerId = params.providerId as string;
  const initialServiceSlug = searchParams.get('service') || '';

  const { getProviderById, createBooking, commissionRate } = useMarketplace();
  const { user } = useAuth();
  const { showToast } = useToast();

  const provider = getProviderById(providerId);

  // Default selected service
  const initialOffering = provider?.servicesOffered.find((s) =>
    s.serviceId.includes(initialServiceSlug) || s.serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(initialServiceSlug)
  ) || provider?.servicesOffered[0];

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialOffering?.serviceId || ''
  );
  const [date, setDate] = useState<string>('2026-09-28');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [streetAddress, setStreetAddress] = useState<string>(
    user?.address || '14 Admiralty Way, Lekki Phase 1'
  );
  const [city, setCity] = useState<string>(user?.location?.split(',')[0] || 'Lagos');
  const [country, setCountry] = useState<string>(user?.location?.split(',')[1]?.trim() || 'Nigeria');
  const [addressNotes, setAddressNotes] = useState<string>('2nd Floor, buzzer 4B');
  const [jobDescription, setJobDescription] = useState<string>(
    'Need thorough diagnostic inspection and repair for recurring issue.'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">Provider not found</h2>
        <Link
          href="/providers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 text-white text-xs font-semibold border border-emerald-500/30"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Providers</span>
        </Link>
      </div>
    );
  }

  const currentOffering = provider.servicesOffered.find((s) => s.serviceId === selectedServiceId) || provider.servicesOffered[0];

  // Dynamic calculations
  const baseAmount = currentOffering ? currentOffering.price * 2 : provider.hourlyRate * 2; // sample 2 hrs
  const serviceFee = 10;
  const totalCustomerPayment = baseAmount + serviceFee;
  const commPercent = commissionRate || 10;
  const platformCommissionAmount = (totalCustomerPayment * commPercent) / 100;
  const workerEarningsAmount = totalCustomerPayment - platformCommissionAmount;

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetAddress || !date || !timeSlot) {
      showToast('warning', 'Please fill in the appointment date, time, and address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newBooking = await createBooking({
        customerId: user?.id || 'cust-amara',
        customerName: user?.name || 'Amara Bello',
        customerPhone: user?.phone || '+234 801 234 5678',
        customerEmail: user?.email || 'amara.bello@example.com',
        providerId: provider.id,
        providerName: provider.name,
        providerAvatarUrl: provider.avatarUrl,
        serviceId: currentOffering?.serviceId || 'srv-generic',
        serviceName: currentOffering?.serviceName || 'Standard Service',
        categoryId: currentOffering?.categoryId || 'cat-general',
        categoryName: currentOffering?.categoryName || 'General',
        status: 'requested',
        date,
        timeSlot,
        address: {
          street: streetAddress,
          city,
          country,
          notes: addressNotes,
        },
        jobDescription,
        pricing: {
          baseAmount,
          serviceFee,
          totalCustomerPayment,
          platformCommissionPercent: commPercent,
          platformCommissionAmount,
          workerEarningsAmount,
          currency: 'USD',
        },
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      showToast(
        'success',
        `Booking request sent to ${provider.name}. Track status in your Customer Dashboard.`,
        'Booking Confirmed!'
      );

      router.push(`/customer/bookings/${newBooking.id}`);
    } catch (err) {
      showToast('error', 'Failed to place booking request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <Link href="/" className="hover:text-amber-300">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href="/providers" className="hover:text-amber-300">Providers</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href={`/providers/${provider.id}`} className="hover:text-amber-300">{provider.name}</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-100 font-bold">Book Service</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-900/30">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Schedule a Service Appointment
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Choose your service type, schedule date, and location details.
          </p>
        </div>

        {/* Selected Provider Badge */}
        <div className="flex items-center gap-3 bg-[#0e1714]/85 p-3 rounded-2xl border border-emerald-500/20 shadow-xl shadow-black/40">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#16241e] flex-shrink-0 border border-emerald-500/30">
            <Image
              src={provider.avatarUrl}
              alt={provider.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-xs sm:text-sm">{provider.name}</h4>
            <span className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              {provider.title}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Appointment Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select Service */}
          <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] border border-amber-400/30">1</span>
              <span>Select Service Offering</span>
            </div>

            <div className="space-y-2">
              {provider.servicesOffered.map((srv) => (
                <label
                  key={srv.serviceId}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedServiceId === srv.serviceId
                      ? 'bg-emerald-950/70 border-amber-400/50 ring-2 ring-amber-400/20'
                      : 'bg-[#121f19] border-emerald-900/40 hover:bg-[#182a22]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="serviceOption"
                      checked={selectedServiceId === srv.serviceId}
                      onChange={() => setSelectedServiceId(srv.serviceId)}
                      className="text-emerald-500 focus:ring-emerald-500 bg-[#0e1714] border-emerald-700"
                    />
                    <div>
                      <h5 className="font-bold text-slate-100 text-xs sm:text-sm">{srv.serviceName}</h5>
                      <span className="text-[11px] text-emerald-400 font-medium">{srv.categoryName}</span>
                    </div>
                  </div>

                  <span className="font-extrabold text-amber-300 text-sm">
                    ${srv.price} <span className="text-xs text-slate-400 font-normal">/{srv.priceUnit}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Date & Time Schedule */}
          <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] border border-amber-400/30">2</span>
              <span>Select Date & Time Window</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Time Window</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="08:00 AM - 10:00 AM" className="bg-[#0e1714]">Morning: 08:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 12:00 PM" className="bg-[#0e1714]">Morning: 10:00 AM - 12:00 PM</option>
                  <option value="01:00 PM - 03:00 PM" className="bg-[#0e1714]">Afternoon: 01:00 PM - 03:00 PM</option>
                  <option value="03:00 PM - 05:00 PM" className="bg-[#0e1714]">Late Afternoon: 03:00 PM - 05:00 PM</option>
                  <option value="05:00 PM - 07:00 PM" className="bg-[#0e1714]">Evening: 05:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Location & Job Details */}
          <div className="bg-[#0e1714]/85 backdrop-blur-xl rounded-3xl border border-emerald-500/20 p-6 shadow-xl shadow-black/40 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] border border-amber-400/30">3</span>
              <span>Service Location & Job Details</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Street Address</span>
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                  className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Access Notes / Apartment / Buzzer
                </label>
                <input
                  type="text"
                  value={addressNotes}
                  onChange={(e) => setAddressNotes(e.target.value)}
                  placeholder="e.g. Gate code #4092, Ring doorbell twice"
                  className="w-full px-3 py-2.5 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Problem Description / Job Requirements</span>
                </label>
                <textarea
                  rows={3}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the issue in detail, symptoms, and specific requests..."
                  className="w-full p-3 rounded-xl border border-emerald-900/40 bg-[#121f19] text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Price Breakdown & Confirm CTA */}
        <div className="lg:col-span-5 space-y-6">
          <PriceBreakdown
            pricing={{
              baseAmount,
              serviceFee,
              totalCustomerPayment,
              platformCommissionPercent: commPercent,
              platformCommissionAmount,
              workerEarningsAmount,
              currency: 'USD',
            }}
            showPlatformSplit={true}
          />

          {/* Guarantee banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3 shadow-lg shadow-black/40">
            <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-slate-100">SkillLink Guarantee</h5>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                Direct contact with verified specialist. You can cancel or reschedule easily if plans change before worker dispatch.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 border border-emerald-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Submitting Booking...' : 'Confirm & Request Booking'}</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default function BookServicePage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto p-12 text-center text-sm text-slate-500">Loading booking form...</div>}>
      <BookServiceContent />
    </Suspense>
  );
}
