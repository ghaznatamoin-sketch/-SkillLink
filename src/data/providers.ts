import { Provider } from '@/types/provider';

export const INITIAL_PROVIDERS_DATA: Provider[] = [
  {
    id: 'prov-rafael-costa',
    name: 'Rafael Costa',
    title: 'Certified HVAC & Master AC Technician',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Over 8 years of certified experience specializing in inverter AC diagnostics, compressor reconditioning, ductless split installations, and multi-zone climate control systems.',
    rating: 4.9,
    reviewCount: 84,
    experienceYears: 8,
    completedJobsCount: 230,
    hourlyRate: 45,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Mon - Sat: 8:00 AM - 7:00 PM',
    location: {
      city: 'São Paulo',
      country: 'Brazil',
      state: 'SP',
      serviceRadiusKm: 25,
      neighborhoods: ['Pinheiros', 'Jardins', 'Vila Madalena', 'Itaim Bibi', 'Moema']
    },
    skills: ['Inverter Diagnostics', 'R410A Refrigerant', 'Ductless Splits', 'Emergency Compressor Fix', 'Preventative Care'],
    servicesOffered: [
      {
        serviceId: 'srv-ac-technician',
        serviceName: 'AC Technician',
        categoryId: 'cat-electrical-appliances',
        categoryName: 'Electrical & Appliances',
        price: 45,
        priceUnit: 'job',
        description: 'Complete diagnostic check, pressure test, filter cleaning, and refrigerant top-up.'
      },
      {
        serviceId: 'srv-refrigerator-repair',
        serviceName: 'Refrigerator Repair',
        categoryId: 'cat-electrical-appliances',
        categoryName: 'Electrical & Appliances',
        price: 50,
        priceUnit: 'job',
        description: 'Thermostat testing, fan motor fix, and gas replenishment.'
      }
    ],
    languages: ['English', 'Portuguese', 'Spanish'],
    badge: 'Top Rated',
    responseTime: '< 20 mins',
    joinedDate: 'March 2023'
  },
  {
    id: 'prov-amara-bello',
    name: 'Amara Bello',
    title: 'Senior Master Electrician & Safety Inspector',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Licensed electrical engineer and contractor with over a decade of residential and commercial experience. Expert in breaker box overhauls, whole-home surge protection, and smart lighting.',
    rating: 4.95,
    reviewCount: 112,
    experienceYears: 11,
    completedJobsCount: 340,
    hourlyRate: 50,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Mon - Sun: 7:30 AM - 8:00 PM',
    location: {
      city: 'Lagos',
      country: 'Nigeria',
      state: 'Lagos State',
      serviceRadiusKm: 30,
      neighborhoods: ['Ikoyi', 'Victoria Island', 'Lekki Phase 1', 'Ikeja GRA', 'Surulere']
    },
    skills: ['Circuit Panel Upgrades', 'Short-Circuit Diagnostics', 'Smart Home Automation', 'Solar Inverter Cabling', 'Safety Certifications'],
    servicesOffered: [
      {
        serviceId: 'srv-electrician',
        serviceName: 'Electrician',
        categoryId: 'cat-home-repair',
        categoryName: 'Home & Repair',
        price: 50,
        priceUnit: 'hour',
        description: 'Certified electrical wiring, fault resolution, fixture installation, and load balancing.'
      },
      {
        serviceId: 'srv-generator-technician',
        serviceName: 'Generator Technician',
        categoryId: 'cat-electrical-appliances',
        categoryName: 'Electrical & Appliances',
        price: 55,
        priceUnit: 'hour',
        description: 'ATS panel setup, automatic generator synchronization, and servicing.'
      }
    ],
    languages: ['English', 'Yoruba'],
    badge: 'Elite Specialist',
    responseTime: '< 15 mins',
    joinedDate: 'January 2023'
  },
  {
    id: 'prov-marcus-chen',
    name: 'Marcus Chen',
    title: 'Certified Plumbing Contractor & Leak Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Specialist in modern piping systems (PEX, Copper, PVC), thermal leak detection, booster pump installations, and whole-house filtration setups.',
    rating: 4.88,
    reviewCount: 96,
    experienceYears: 9,
    completedJobsCount: 280,
    hourlyRate: 42,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Mon - Fri: 8:00 AM - 6:00 PM',
    location: {
      city: 'London',
      country: 'United Kingdom',
      state: 'Greater London',
      serviceRadiusKm: 20,
      neighborhoods: ['Kensington', 'Chelsea', 'Islington', 'Camden', 'Greenwich']
    },
    skills: ['Acoustic Leak Detection', 'PEX Pipe Welding', 'Water Pressure Tuning', 'Emergency Drain Jetting', 'Boiler Diagnostics'],
    servicesOffered: [
      {
        serviceId: 'srv-plumber',
        serviceName: 'Plumber',
        categoryId: 'cat-home-repair',
        categoryName: 'Home & Repair',
        price: 42,
        priceUnit: 'hour',
        description: 'Fast leak fixing, pipe replacements, bathroom fittings, and drain clearance.'
      },
      {
        serviceId: 'srv-water-heater-geyser',
        serviceName: 'Water Heater / Geyser',
        categoryId: 'cat-electrical-appliances',
        categoryName: 'Electrical & Appliances',
        price: 48,
        priceUnit: 'job',
        description: 'Electric and gas geyser installation, anode replacement, and thermostat tuning.'
      }
    ],
    languages: ['English', 'Mandarin'],
    badge: 'Verified Pro',
    responseTime: '< 30 mins',
    joinedDate: 'April 2023'
  },
  {
    id: 'prov-elena-rostova',
    name: 'Elena Rostova',
    title: 'Network Systems Engineer & IT Solutions Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    bio: 'CompTIA Network+ and Cisco CCNA certified technician. Expert in enterprise mesh Wi-Fi design, Ubiquiti UniFi setups, firewall security, and hardware diagnostics.',
    rating: 4.97,
    reviewCount: 68,
    experienceYears: 7,
    completedJobsCount: 175,
    hourlyRate: 55,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Mon - Sat: 9:00 AM - 7:00 PM',
    location: {
      city: 'Berlin',
      country: 'Germany',
      state: 'Berlin',
      serviceRadiusKm: 25,
      neighborhoods: ['Mitte', 'Prenzlauer Berg', 'Charlottenburg', 'Kreuzberg', 'Friedrichshain']
    },
    skills: ['Mesh Wi-Fi Roaming', 'Ubiquiti UniFi', 'Cat6A/Fiber Cabling', 'NAS Server Setup', 'VLAN Configuration'],
    servicesOffered: [
      {
        serviceId: 'srv-wifi-network',
        serviceName: 'Wi-Fi / Network Technician',
        categoryId: 'cat-computer-tech',
        categoryName: 'Computer & Technology',
        price: 55,
        priceUnit: 'hour',
        description: 'Complete wireless dead-zone elimination, router optimization, and security fortification.'
      },
      {
        serviceId: 'srv-computer-repair',
        serviceName: 'Computer Repair',
        categoryId: 'cat-computer-tech',
        categoryName: 'Computer & Technology',
        price: 45,
        priceUnit: 'job',
        description: 'Custom PC build repair, SSD upgrades, and thermal throttling resolution.'
      }
    ],
    languages: ['English', 'German', 'Russian'],
    badge: 'Top Rated',
    responseTime: '< 15 mins',
    joinedDate: 'May 2023'
  },
  {
    id: 'prov-david-mwangi',
    name: 'David Mwangi',
    title: 'Landscape Architect & Master Horticulturalist',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Creating sustainable, lush outdoor paradises for over 10 years. Expert in drought-tolerant landscaping, smart drip systems, aesthetic stone tiling, and tree health.',
    rating: 4.92,
    reviewCount: 77,
    experienceYears: 10,
    completedJobsCount: 210,
    hourlyRate: 40,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Mon - Sat: 7:00 AM - 5:30 PM',
    location: {
      city: 'Nairobi',
      country: 'Kenya',
      state: 'Nairobi County',
      serviceRadiusKm: 35,
      neighborhoods: ['Karen', 'Runda', 'Westlands', 'Kilimani', 'Lavington']
    },
    skills: ['Drip Irrigation', 'Flora Selection', 'Lawn Turf Aeration', 'Artistic Pruning', 'Soil Conditioning'],
    servicesOffered: [
      {
        serviceId: 'srv-gardener-mali',
        serviceName: 'Gardener / Mali',
        categoryId: 'cat-outdoor-garden',
        categoryName: 'Outdoor & Garden',
        price: 30,
        priceUnit: 'hour',
        description: 'Lawn manicuring, hedge sculpting, weed suppression, and seasonal floral bed care.'
      },
      {
        serviceId: 'srv-landscaping',
        serviceName: 'Landscaping',
        categoryId: 'cat-outdoor-garden',
        categoryName: 'Outdoor & Garden',
        price: 50,
        priceUnit: 'hour',
        description: 'Complete landscape design, stone pathways, and automated sprinkler integration.'
      }
    ],
    languages: ['English', 'Swahili'],
    badge: 'Verified Pro',
    responseTime: '< 45 mins',
    joinedDate: 'February 2023'
  },
  {
    id: 'prov-sophie-dubois',
    name: 'Sophie Dubois',
    title: 'Eco-Deep Cleaning & Sanitization Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bio: 'Hospital-grade hygiene standards with 100% non-toxic, eco-friendly enzymatic cleaning agents. Specialized in post-renovation cleanup, upholstery steam extraction, and deep sanitization.',
    rating: 4.96,
    reviewCount: 142,
    experienceYears: 6,
    completedJobsCount: 390,
    hourlyRate: 35,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Mon - Sun: 8:00 AM - 6:00 PM',
    location: {
      city: 'Toronto',
      country: 'Canada',
      state: 'Ontario',
      serviceRadiusKm: 25,
      neighborhoods: ['Downtown', 'Yorkville', 'The Annex', 'Liberty Village', 'Leslieville']
    },
    skills: ['Steam Extraction', 'Non-Toxic Products', 'HEPA Filtration', 'Allergen Removal', 'Grout Renewal'],
    servicesOffered: [
      {
        serviceId: 'srv-deep-cleaning',
        serviceName: 'Deep Cleaning',
        categoryId: 'cat-cleaning',
        categoryName: 'Cleaning',
        price: 80,
        priceUnit: 'job',
        description: 'Complete top-to-bottom scrub, appliance interior cleaning, sanitization, and baseboards.'
      },
      {
        serviceId: 'srv-sofa-cleaning',
        serviceName: 'Sofa Cleaning',
        categoryId: 'cat-cleaning',
        categoryName: 'Cleaning',
        price: 45,
        priceUnit: 'job',
        description: 'Deep microfiber & leather steam cleaning, spot removal, and antibacterial coating.'
      }
    ],
    languages: ['English', 'French'],
    badge: 'Top Rated',
    responseTime: '< 15 mins',
    joinedDate: 'June 2023'
  },
  {
    id: 'prov-tariq-al-mansoor',
    name: 'Tariq Al-Mansoor',
    title: 'Mobile Automotive Diagnostic & Recovery Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    bio: 'ASE Master Certified mechanic providing equipped on-site diagnostics, battery rescue, mobile brake disc replacement, and roadside assistance.',
    rating: 4.89,
    reviewCount: 65,
    experienceYears: 12,
    completedJobsCount: 195,
    hourlyRate: 50,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: '24/7 On-Call Assistance',
    location: {
      city: 'Dubai',
      country: 'United Arab Emirates',
      state: 'Dubai',
      serviceRadiusKm: 40,
      neighborhoods: ['Downtown Dubai', 'Dubai Marina', 'Jumeirah', 'Business Bay', 'Palm Jumeirah']
    },
    skills: ['OBD-II Live Telemetry', 'Brembo Brake Systems', 'Lithium/AGM Batteries', 'Mobile Wheel Balancer', 'Emergency Recovery'],
    servicesOffered: [
      {
        serviceId: 'srv-car-mechanic',
        serviceName: 'Car Mechanic',
        categoryId: 'cat-vehicle-services',
        categoryName: 'Vehicle Services',
        price: 50,
        priceUnit: 'hour',
        description: 'On-site computerized diagnostics, fluid servicing, suspension and brake replacement.'
      },
      {
        serviceId: 'srv-battery-service',
        serviceName: 'Battery Service',
        categoryId: 'cat-vehicle-services',
        categoryName: 'Vehicle Services',
        price: 35,
        priceUnit: 'visit',
        description: 'Testing, jump-start, or new battery installation in under 30 minutes.'
      }
    ],
    languages: ['English', 'Arabic'],
    badge: 'Fast Responder',
    responseTime: '< 10 mins',
    joinedDate: 'August 2023'
  },
  {
    id: 'prov-priya-sharma',
    name: 'Priya Sharma',
    title: 'Full-Stack Software Architect & Cloud Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Senior engineer specializing in Next.js, TypeScript, Supabase, Tailwind CSS, REST & GraphQL APIs, and high-converting modern user experiences.',
    rating: 4.99,
    reviewCount: 52,
    experienceYears: 7,
    completedJobsCount: 88,
    hourlyRate: 65,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Mon - Fri: 9:00 AM - 6:00 PM EST',
    location: {
      city: 'Austin',
      country: 'United States',
      state: 'Texas',
      serviceRadiusKm: 100,
      neighborhoods: ['Remote', 'Downtown', 'South Congress', 'Domain', 'East Austin']
    },
    skills: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js', 'System Architecture'],
    servicesOffered: [
      {
        serviceId: 'srv-web-developer',
        serviceName: 'Web Developer',
        categoryId: 'cat-professional-services',
        categoryName: 'Professional Services',
        price: 65,
        priceUnit: 'hour',
        description: 'Modern, responsive, ultra-fast web applications, MVP builds, and API integrations.'
      },
      {
        serviceId: 'srv-it-support',
        serviceName: 'IT Support',
        categoryId: 'cat-computer-tech',
        categoryName: 'Computer & Technology',
        price: 50,
        priceUnit: 'hour',
        description: 'Cloud deployment, DNS troubleshooting, SSL configuration, and codebase refactoring.'
      }
    ],
    languages: ['English', 'Hindi'],
    badge: 'Top Rated',
    responseTime: '< 30 mins',
    joinedDate: 'July 2023'
  },
  {
    id: 'prov-maya-lin',
    name: 'Maya Lin',
    title: 'Certified Holistic Yoga Instructor & Wellness Coach',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bio: 'Certified E-RYT 500 yoga teacher and licensed wellness practitioner with 7 years helping clients develop strength, flexibility, breathwork, and therapeutic muscle recovery.',
    rating: 4.96,
    reviewCount: 68,
    experienceYears: 7,
    completedJobsCount: 190,
    hourlyRate: 45,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Mon - Sat: 7:00 AM - 6:00 PM PST',
    location: {
      city: 'Vancouver',
      country: 'Canada',
      state: 'BC',
      serviceRadiusKm: 25,
      neighborhoods: ['Downtown', 'Kitsilano', 'Mount Pleasant', 'Yaletown', 'West End']
    },
    skills: ['Vinyasa Yoga', 'Breathwork & Pranayama', 'Deep Tissue Recovery', 'Nutritional Meal Guidance', 'Mobility Coaching'],
    servicesOffered: [
      {
        serviceId: 'srv-yoga-instructor',
        serviceName: 'Yoga Instructor',
        categoryId: 'cat-health-wellness',
        categoryName: 'Health & Wellness',
        price: 40,
        priceUnit: 'hour',
        description: 'Private 1-on-1 or small group restorative and dynamic flow sessions at home or outdoors.'
      },
      {
        serviceId: 'srv-personal-trainer',
        serviceName: 'Personal Trainer',
        categoryId: 'cat-health-wellness',
        categoryName: 'Health & Wellness',
        price: 45,
        priceUnit: 'hour',
        description: 'Targeted functional fitness, core strengthening, and stamina building routines.'
      },
      {
        serviceId: 'srv-massage-therapist',
        serviceName: 'Massage Therapist',
        categoryId: 'cat-health-wellness',
        categoryName: 'Health & Wellness',
        price: 65,
        priceUnit: 'hour',
        description: 'Therapeutic deep tissue and Swedish relaxation massage therapy on-site.'
      },
      {
        serviceId: 'srv-nutrition-consultant',
        serviceName: 'Nutrition Consultant',
        categoryId: 'cat-health-wellness',
        categoryName: 'Health & Wellness',
        price: 50,
        priceUnit: 'hour',
        description: 'Evidence-based meal structuring, macronutrient planning, and healthy lifestyle consulting.'
      }
    ],
    languages: ['English', 'Mandarin'],
    badge: 'Elite Specialist',
    responseTime: '< 15 mins',
    joinedDate: 'February 2023'
  },
  {
    id: 'prov-julian-vance',
    name: 'Julian Vance',
    title: 'Lead Event Director & Live Audio Producer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Experienced event designer, music director, and audiovisual technician with 9 years organizing corporate galas, private celebrations, concerts, and luxury weddings.',
    rating: 4.92,
    reviewCount: 94,
    experienceYears: 9,
    completedJobsCount: 215,
    hourlyRate: 70,
    currency: 'USD',
    isVerified: true,
    isAvailable: true,
    availabilitySchedule: 'Wed - Sun: 10:00 AM - 11:00 PM GMT',
    location: {
      city: 'London',
      country: 'United Kingdom',
      state: 'Greater London',
      serviceRadiusKm: 40,
      neighborhoods: ['Westminster', 'Camden', 'Kensington', 'Shoreditch', 'Canary Wharf']
    },
    skills: ['Event Operations', 'Live Audio Mixing', 'Stage & Lighting Design', 'Curated Setlists', 'Vendor Management'],
    servicesOffered: [
      {
        serviceId: 'srv-event-planner',
        serviceName: 'Event Planner',
        categoryId: 'cat-events-entertainment',
        categoryName: 'Events & Entertainment',
        price: 65,
        priceUnit: 'hour',
        description: 'End-to-end venue timeline orchestration, supplier negotiation, and day-of execution.'
      },
      {
        serviceId: 'srv-dj-music-service',
        serviceName: 'DJ / Music Service',
        categoryId: 'cat-events-entertainment',
        categoryName: 'Events & Entertainment',
        price: 75,
        priceUnit: 'hour',
        description: 'Full sound system, intelligent lighting, wireless microphones, and versatile genre sets.'
      },
      {
        serviceId: 'srv-event-decorator',
        serviceName: 'Event Decorator',
        categoryId: 'cat-events-entertainment',
        categoryName: 'Events & Entertainment',
        price: 55,
        priceUnit: 'hour',
        description: 'Aesthetic theme customization, centerpiece construction, and lighting accents.'
      },
      {
        serviceId: 'srv-event-photographer',
        serviceName: 'Event Photographer',
        categoryId: 'cat-events-entertainment',
        categoryName: 'Events & Entertainment',
        price: 70,
        priceUnit: 'hour',
        description: 'High-speed party and ceremonial photography with color-graded digital gallery.'
      }
    ],
    languages: ['English', 'French'],
    badge: 'Top Rated',
    responseTime: '< 20 mins',
    joinedDate: 'May 2023'
  }
];

export function getProviderById(id: string): Provider | undefined {
  return INITIAL_PROVIDERS_DATA.find(p => p.id === id);
}

export function getProvidersByServiceSlug(serviceSlug: string): Provider[] {
  return INITIAL_PROVIDERS_DATA.filter(p =>
    p.servicesOffered.some(s => s.serviceId.includes(serviceSlug) || s.serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(serviceSlug))
  );
}

export function getProvidersByCategoryId(categoryId: string): Provider[] {
  return INITIAL_PROVIDERS_DATA.filter(p =>
    p.servicesOffered.some(s => s.categoryId === categoryId)
  );
}
