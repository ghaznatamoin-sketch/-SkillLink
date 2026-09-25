-- =============================================================================
-- SkillLink — Supabase Seed Data (All 10 Categories & 71 Services)
-- =============================================================================

-- 1. Seed Categories
INSERT INTO public.categories (id, name, slug, description, icon_name, accent_color, accent_hex, total_providers_count)
VALUES
  ('cat-home-repair', 'Home & Repair', 'home-and-repair', 'Expert repairs, carpentry, plumbing, and structural renovations for modern residences.', 'Wrench', 'cyan', '#06b6d4', 42),
  ('cat-electrical-appliances', 'Electrical & Appliances', 'electrical-and-appliances', 'Certified technicians for AC systems, cooling, heating, and household electronics.', 'Cpu', 'amber', '#f59e0b', 38),
  ('cat-computer-tech', 'Computer & Technology', 'computer-and-technology', 'Hardware diagnostics, OS upgrades, networking, security setups, and IT support.', 'Monitor', 'purple', '#8b5cf6', 46),
  ('cat-outdoor-garden', 'Outdoor & Garden', 'outdoor-and-garden', 'Landscape design, lawn care, tree pruning, pool maintenance, and automatic watering systems.', 'Trees', 'emerald', '#10b981', 29),
  ('cat-cleaning', 'Cleaning', 'cleaning', 'Thorough sanitation, deep upholstery treatment, post-construction cleanup, and hygiene maintenance.', 'Sparkles', 'sky', '#0284c7', 54),
  ('cat-vehicle-services', 'Vehicle Services', 'vehicle-services', 'Roadside assistance, auto repair, detailing, diagnostics, and periodic mechanical maintenance.', 'Car', 'rose', '#f43f5e', 36),
  ('cat-personal-lifestyle', 'Personal & Lifestyle', 'personal-and-lifestyle', 'At-home grooming, beauty treatments, photography, videography, and bespoke tailoring.', 'Scissors', 'pink', '#ec4899', 31),
  ('cat-moving-delivery', 'Moving & Delivery', 'moving-and-delivery', 'Safe relocation, protective packing, city-wide deliveries, and secure furniture handling.', 'Truck', 'indigo', '#6366f1', 27),
  ('cat-home-support', 'Home Support', 'home-support', 'Trusted child supervision, senior care, pet exercise, housekeeping, and culinary support.', 'HeartHandshake', 'teal', '#14b8a6', 35),
  ('cat-professional-services', 'Professional Services', 'professional-services', 'Certified software engineers, digital creators, private tutors, accountants, and consultants.', 'Briefcase', 'blue', '#3b82f6', 48),
  ('cat-health-wellness', 'Health & Wellness', 'health-and-wellness', 'Personalized fitness coaching, restorative yoga, therapeutic massage, and certified nutritional counseling.', 'Activity', 'teal', '#0d9488', 34),
  ('cat-events-entertainment', 'Events & Entertainment', 'events-and-entertainment', 'Professional event planning, live DJ sound setups, aesthetic venue styling, and celebratory photography.', 'PartyPopper', 'violet', '#8b5cf6', 39)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- 2. Seed Services
INSERT INTO public.services (id, category_id, name, slug, description, starting_price, price_unit, currency, is_popular, estimated_duration, icon_name)
VALUES
  -- Home & Repair
  ('srv-plumber', 'cat-home-repair', 'Plumber', 'plumber', 'Leak diagnostics, pipe repairs, faucet installation, drainage and fixture maintenance.', 35.00, 'hour', 'USD', true, '1-3 hours', 'Droplet'),
  ('srv-electrician', 'cat-home-repair', 'Electrician', 'electrician', 'Wiring inspection, short circuit fixes, breaker panel upgrades, and lighting installations.', 40.00, 'hour', 'USD', true, '1-2 hours', 'Zap'),
  ('srv-carpenter', 'cat-home-repair', 'Carpenter', 'carpenter', 'Custom furniture building, cabinet repair, door alignment, and wooden fixture remodeling.', 38.00, 'hour', 'USD', false, '2-4 hours', 'Hammer'),
  ('srv-painter', 'cat-home-repair', 'Painter', 'painter', 'Interior wall painting, exterior weatherproof coating, wallpapering, and plaster finish.', 30.00, 'hour', 'USD', true, '4-8 hours', 'Paintbrush'),
  ('srv-mason-construction', 'cat-home-repair', 'Mason / Construction', 'mason-construction', 'Brickwork, cement repair, tile installation, stone paving, and boundary wall masonry.', 45.00, 'hour', 'USD', false, '3-6 hours', 'HardHat'),
  ('srv-handyman', 'cat-home-repair', 'Handyman', 'handyman', 'Quick versatile home fixes, TV wall mounting, shelf setup, curtain installation, and assembly.', 30.00, 'hour', 'USD', true, '1-2 hours', 'Wrench'),
  ('srv-door-lock-repair', 'cat-home-repair', 'Door & Lock Repair', 'door-lock-repair', 'Lock replacement, digital smart lock installation, latch repairs, and door realignment.', 32.00, 'job', 'USD', false, '1 hour', 'Key'),
  ('srv-window-glass-repair', 'cat-home-repair', 'Window & Glass Repair', 'window-glass-repair', 'Shattered glass replacement, window track repairs, sealing, and double-glazing fixes.', 45.00, 'job', 'USD', false, '1-2 hours', 'Maximize'),
  ('srv-roof-repair', 'cat-home-repair', 'Roof Repair', 'roof-repair', 'Roof leak waterproofing, shingle replacement, gutter clearing, and thermal insulation inspection.', 65.00, 'job', 'USD', false, '3-5 hours', 'Home'),
  ('srv-general-home-repair', 'cat-home-repair', 'General Home Repair', 'general-home-repair', 'Comprehensive property maintenance, preventative structural inspection, and multi-skill fixes.', 35.00, 'hour', 'USD', false, '2-4 hours', 'Home'),

  -- Electrical & Appliances
  ('srv-ac-technician', 'cat-electrical-appliances', 'AC Technician', 'ac-technician', 'AC deep cleaning, gas refill, compressor maintenance, filter replacement, and ducting checks.', 45.00, 'job', 'USD', true, '1-2 hours', 'Wind'),
  ('srv-refrigerator-repair', 'cat-electrical-appliances', 'Refrigerator Repair', 'refrigerator-repair', 'Thermostat fixes, coolant replenishment, compressor replacement, and door seal renewal.', 40.00, 'job', 'USD', true, '1-2 hours', 'Snowflake'),
  ('srv-washing-machine-repair', 'cat-electrical-appliances', 'Washing Machine Repair', 'washing-machine-repair', 'Drum repair, motor diagnosis, drainage pump fixes, and electronic board troubleshooting.', 38.00, 'job', 'USD', true, '1-2 hours', 'RotateCw'),
  ('srv-gas-stove-repair', 'cat-electrical-appliances', 'Gas Stove Repair', 'gas-stove-repair', 'Burner cleaning, gas leakage prevention, ignition replacement, and valve calibration.', 30.00, 'visit', 'USD', false, '1 hour', 'Flame'),
  ('srv-water-heater-geyser', 'cat-electrical-appliances', 'Water Heater / Geyser', 'water-heater-geyser', 'Heating element change, tank descaling, thermostat testing, and pressure valve replacement.', 35.00, 'job', 'USD', false, '1-2 hours', 'Thermometer'),
  ('srv-tv-repair', 'cat-electrical-appliances', 'TV Repair', 'tv-repair', 'OLED/LED panel troubleshooting, backlight repair, sound module and motherboard fixes.', 40.00, 'job', 'USD', false, '1-3 hours', 'Tv'),
  ('srv-generator-technician', 'cat-electrical-appliances', 'Generator Technician', 'generator-technician', 'Diesel and petrol generator overhaul, oil change, spark plug service, and wiring check.', 50.00, 'hour', 'USD', false, '2-3 hours', 'Activity'),
  ('srv-solar-technician', 'cat-electrical-appliances', 'Solar Technician', 'solar-technician', 'PV solar panel cleaning, inverter diagnostics, battery bank maintenance, and installation.', 55.00, 'hour', 'USD', true, '2-4 hours', 'Sun'),

  -- Computer & Technology
  ('srv-computer-repair', 'cat-computer-tech', 'Computer Repair', 'computer-repair', 'Desktop hardware upgrades, power supply replacement, malware cleanup, and thermal paste application.', 35.00, 'job', 'USD', true, '1-2 hours', 'Monitor'),
  ('srv-laptop-repair', 'cat-computer-tech', 'Laptop Repair', 'laptop-repair', 'Laptop screen replacement, keyboard repair, battery replacement, and hinge restoration.', 40.00, 'job', 'USD', true, '2-3 hours', 'Laptop'),
  ('srv-printer-repair', 'cat-computer-tech', 'Printer Repair', 'printer-repair', 'Laser & inkjet paper jam fixing, print head alignment, toner replacement, and driver setup.', 30.00, 'visit', 'USD', false, '1 hour', 'Printer'),
  ('srv-wifi-network', 'cat-computer-tech', 'Wi-Fi / Network Technician', 'wifi-network-technician', 'Mesh Wi-Fi deployment, Ethernet cabling, router configuration, firewall setup, and bandwidth tuning.', 45.00, 'hour', 'USD', true, '1-3 hours', 'Wifi'),
  ('srv-cctv-technician', 'cat-computer-tech', 'CCTV Technician', 'cctv-technician', 'IP camera installation, DVR/NVR configuration, mobile live-view setup, and night vision testing.', 50.00, 'job', 'USD', true, '2-4 hours', 'Video'),
  ('srv-cable-technician', 'cat-computer-tech', 'Cable Technician', 'cable-technician', 'Optical fiber termination, coax line testing, organized cable trunking, and wall plates.', 35.00, 'hour', 'USD', false, '1-2 hours', 'GitCommit'),
  ('srv-mobile-repair', 'cat-computer-tech', 'Mobile Repair', 'mobile-repair', 'Smartphone screen replacement, charging port repair, water damage recovery, and battery renewal.', 35.00, 'job', 'USD', true, '1-2 hours', 'Smartphone'),
  ('srv-it-support', 'cat-computer-tech', 'IT Support', 'it-support', 'Remote & on-site software troubleshooting, data backup, cloud setup, and user account assistance.', 40.00, 'hour', 'USD', false, '1-2 hours', 'HelpCircle'),

  -- Outdoor & Garden
  ('srv-gardener-mali', 'cat-outdoor-garden', 'Gardener / Mali', 'gardener-mali', 'Plant trimming, soil enrichment, seasonal planting, weed removal, and lawn mowing.', 25.00, 'hour', 'USD', true, '2-4 hours', 'Flower2'),
  ('srv-tree-service', 'cat-outdoor-garden', 'Tree Service', 'tree-service', 'High-branch cutting, stump grinding, hazardous tree removal, and crown shaping.', 70.00, 'job', 'USD', false, '2-5 hours', 'TreePine'),
  ('srv-landscaping', 'cat-outdoor-garden', 'Landscaping', 'landscaping', 'Garden landscape design, synthetic turf installation, stone garden paths, and ambient garden lighting.', 50.00, 'hour', 'USD', true, '4-8 hours', 'Compass'),
  ('srv-pool-cleaning', 'cat-outdoor-garden', 'Pool Cleaning', 'pool-cleaning', 'Chemical balance testing, chlorination, wall scrubbing, filter backwash, and debris skimming.', 45.00, 'visit', 'USD', true, '1-2 hours', 'Droplets'),
  ('srv-irrigation-technician', 'cat-outdoor-garden', 'Irrigation Technician', 'irrigation-technician', 'Drip system installation, sprinkler head replacement, smart water timer scheduling, and pipe leak fixes.', 40.00, 'hour', 'USD', false, '1-3 hours', 'CloudRain'),

  -- Cleaning
  ('srv-home-cleaning', 'cat-cleaning', 'Home Cleaning', 'home-cleaning', 'Floor mopping, dusting, kitchen degreasing, bathroom sanitization, and room tidying.', 28.00, 'hour', 'USD', true, '2-4 hours', 'Home'),
  ('srv-sofa-cleaning', 'cat-cleaning', 'Sofa Cleaning', 'sofa-cleaning', 'High-pressure steam extraction, fabric stain removal, leather conditioning, and allergen removal.', 40.00, 'job', 'USD', true, '1-2 hours', 'Armchair'),
  ('srv-window-cleaning', 'cat-cleaning', 'Window Cleaning', 'window-cleaning', 'Streak-free window washing, pane buffing, frame cleaning, and high-reach squeegee treatment.', 32.00, 'job', 'USD', false, '1-2 hours', 'Maximize2'),
  ('srv-carpet-cleaning', 'cat-cleaning', 'Carpet Cleaning', 'carpet-cleaning', 'Deep carpet shampooing, hot water extraction, pet odor treatment, and quick drying.', 45.00, 'job', 'USD', true, '1-3 hours', 'Layers'),
  ('srv-deep-cleaning', 'cat-cleaning', 'Deep Cleaning', 'deep-cleaning', 'Comprehensive sanitization behind appliances, grout restoration, inside cabinets, and disinfection.', 75.00, 'job', 'USD', true, '4-6 hours', 'Sparkle'),
  ('srv-waste-removal', 'cat-cleaning', 'Waste Removal', 'waste-removal', 'Bulky item disposal, construction debris clearing, green waste hauling, and eco-friendly sorting.', 50.00, 'job', 'USD', false, '1-2 hours', 'Trash2'),
  ('srv-sewerage-drain-cleaning', 'cat-cleaning', 'Sewerage / Drain Cleaning', 'sewerage-drain-cleaning', 'Hydro-jet drain unclogging, sewer line snaking, grease trap maintenance, and odor elimination.', 60.00, 'job', 'USD', false, '1-2 hours', 'Filter'),

  -- Vehicle Services
  ('srv-car-mechanic', 'cat-vehicle-services', 'Car Mechanic', 'car-mechanic', 'Engine diagnostics, brake pad change, suspension repair, oil & fluid changes on-site.', 45.00, 'hour', 'USD', true, '1-3 hours', 'Wrench'),
  ('srv-tyre-service', 'cat-vehicle-services', 'Tyre Service', 'tyre-service', 'Mobile flat puncture repair, wheel balancing, tyre rotation, and emergency spare replacement.', 30.00, 'visit', 'USD', true, '30-60 mins', 'CircleDot'),
  ('srv-battery-service', 'cat-vehicle-services', 'Battery Service', 'battery-service', 'Emergency jump-start, alternator health test, and new car battery replacement at your doorstep.', 35.00, 'visit', 'USD', true, '30-45 mins', 'BatteryCharging'),
  ('srv-car-wash', 'cat-vehicle-services', 'Car Wash', 'car-wash', 'Doorstep foam wash, underbody rinse, tire shine, interior vacuuming, and dashboard polish.', 25.00, 'job', 'USD', true, '45-60 mins', 'Sparkles'),
  ('srv-car-detailing', 'cat-vehicle-services', 'Car Detailing', 'car-detailing', 'Ceramic paint coating, multi-stage swirl removal, engine bay degreasing, and leather treatment.', 85.00, 'job', 'USD', false, '3-6 hours', 'ShieldCheck'),
  ('srv-motorcycle-repair', 'cat-vehicle-services', 'Motorcycle Repair', 'motorcycle-repair', 'Chain lubrication, carburetor/EFI adjustment, clutch cable fix, and brake tuning for 2-wheelers.', 30.00, 'hour', 'USD', false, '1-2 hours', 'Gauge'),
  ('srv-towing', 'cat-vehicle-services', 'Towing', 'towing', 'Flatbed recovery towing, accident transport, underground parking rescue, and long-distance hauling.', 65.00, 'job', 'USD', true, '1-2 hours', 'Truck'),

  -- Personal & Lifestyle
  ('srv-tailor', 'cat-personal-lifestyle', 'Tailor', 'tailor', 'Doorstep measurement taking, custom suit/dress stitching, alteration, and zipper replacement.', 25.00, 'job', 'USD', false, '2-3 days', 'Scissors'),
  ('srv-hairdresser-barber', 'cat-personal-lifestyle', 'Hairdresser / Barber', 'hairdresser-barber', 'Precision haircuts, beard grooming, hair coloring, blowout styling, and hot towel treatments at home.', 30.00, 'visit', 'USD', true, '45-60 mins', 'Smile'),
  ('srv-makeup-artist', 'cat-personal-lifestyle', 'Makeup Artist', 'makeup-artist', 'Bridal, party, or photoshoot makeup with premium skin prep, lash application, and hair setting.', 60.00, 'job', 'USD', true, '1-2 hours', 'Sparkles'),
  ('srv-beautician', 'cat-personal-lifestyle', 'Beautician', 'beautician', 'Facials, manicure, pedicure, waxing, threading, and relaxing wellness care at your convenience.', 35.00, 'visit', 'USD', true, '1-2 hours', 'Heart'),
  ('srv-photographer', 'cat-personal-lifestyle', 'Photographer', 'photographer', 'Portraits, event photography, real estate shoots, product photography, and high-res retouching.', 65.00, 'hour', 'USD', true, '2-4 hours', 'Camera'),
  ('srv-videographer', 'cat-personal-lifestyle', 'Videographer', 'videographer', '4K cinematography, corporate promos, social reels production, color grading, and audio recording.', 80.00, 'hour', 'USD', false, '2-6 hours', 'Video'),

  -- Moving & Delivery
  ('srv-movers', 'cat-moving-delivery', 'Movers', 'movers', 'Full house moving, loading, truck transport, unloading, and placement in your new space.', 70.00, 'hour', 'USD', true, '3-6 hours', 'Truck'),
  ('srv-packing-service', 'cat-moving-delivery', 'Packing Service', 'packing-service', 'Bubble wrap protection, heavy-duty carton boxing, fragile dishware padding, and item inventory.', 35.00, 'hour', 'USD', false, '2-4 hours', 'Package'),
  ('srv-local-delivery', 'cat-moving-delivery', 'Local Delivery', 'local-delivery', 'Fast courier for documents, parcels, purchases, and supplies with real-time route tracking.', 18.00, 'job', 'USD', true, '1-2 hours', 'Navigation'),
  ('srv-furniture-moving', 'cat-moving-delivery', 'Furniture Moving', 'furniture-moving', 'Heavy piano moving, sofa maneuvering, disassembly and reassembly with dollies and straps.', 50.00, 'hour', 'USD', true, '1-3 hours', 'Box'),
  ('srv-storage-service', 'cat-moving-delivery', 'Storage Service', 'storage-service', 'Climate-controlled temporary storage units, pickup from doorstep, and scheduled redelivery.', 60.00, 'job', 'USD', false, 'Flexible', 'Archive'),

  -- Home Support
  ('srv-babysitter', 'cat-home-support', 'Babysitter', 'babysitter', 'Vetted child care, homework assistance, meal prep, playtime activities, and bedtime supervision.', 22.00, 'hour', 'USD', true, '3-6 hours', 'Baby'),
  ('srv-elderly-care', 'cat-home-support', 'Elderly Care', 'elderly-care', 'Compassionate companionship, medication reminders, mobility support, and vital tracking.', 28.00, 'hour', 'USD', true, '4-8 hours', 'Heart'),
  ('srv-pet-care', 'cat-home-support', 'Pet Care', 'pet-care', 'In-home pet sitting, feeding, litter cleaning, brush grooming, and companionship for cats & dogs.', 20.00, 'visit', 'USD', true, '1-2 hours', 'PawPrint'),
  ('srv-dog-walker', 'cat-home-support', 'Dog Walker', 'dog-walker', 'Daily leashed walks, energetic park exercise, hydration, and paw cleaning after outdoor play.', 18.00, 'hour', 'USD', true, '45-60 mins', 'Footprints'),
  ('srv-housekeeper', 'cat-home-support', 'Housekeeper', 'housekeeper', 'Routine daily cleaning, laundry washing & folding, bed changing, and pantry organization.', 25.00, 'hour', 'USD', false, '3-5 hours', 'Sparkles'),
  ('srv-cook-chef', 'cat-home-support', 'Cook / Chef', 'cook-chef', 'Personalized meal planning, healthy home-cooked dinners, private dinner events, and dietary recipes.', 40.00, 'hour', 'USD', true, '2-4 hours', 'Utensils'),

  -- Professional Services
  ('srv-web-developer', 'cat-professional-services', 'Web Developer', 'web-developer', 'Full-stack web apps, e-commerce stores, responsive landing pages, and bug fixing.', 50.00, 'hour', 'USD', true, 'Project based', 'Code'),
  ('srv-graphic-designer', 'cat-professional-services', 'Graphic Designer', 'graphic-designer', 'Brand logo design, social media assets, marketing collateral, UI mockups, and presentations.', 38.00, 'hour', 'USD', true, '1-3 days', 'Palette'),
  ('srv-typing-data-entry', 'cat-professional-services', 'Typing / Data Entry', 'typing-data-entry', 'Spreadsheet digitization, document conversion, CRM data entry, and PDF transcriptions.', 20.00, 'hour', 'USD', false, '2-4 hours', 'FileText'),
  ('srv-tutor', 'cat-professional-services', 'Tutor', 'tutor', 'K-12 & university subject tutoring, mathematics, science, language learning, and exam preparation.', 32.00, 'hour', 'USD', true, '1-2 hours', 'GraduationCap'),
  ('srv-accountant', 'cat-professional-services', 'Accountant', 'accountant', 'Tax filing, bookkeeping, financial statement auditing, and business payroll management.', 55.00, 'hour', 'USD', true, '2-5 hours', 'Calculator'),
  ('srv-legal-consultant', 'cat-professional-services', 'Legal Consultant', 'legal-consultant', 'Contract reviews, NDA drafting, commercial compliance advice, and intellectual property consulting.', 75.00, 'hour', 'USD', false, '1-2 hours', 'Scale'),
  ('srv-business-consultant', 'cat-professional-services', 'Business Consultant', 'business-consultant', 'Growth strategy, market feasibility research, pitch deck refinement, and operational scaling.', 70.00, 'hour', 'USD', false, '2-4 hours', 'TrendingUp'),

  -- Health & Wellness
  ('srv-personal-trainer', 'cat-health-wellness', 'Personal Trainer', 'personal-trainer', 'Custom strength, cardio, and weight loss workout regimens delivered at home, outdoors, or private gyms.', 45.00, 'hour', 'USD', true, '1 hour', 'Dumbbell'),
  ('srv-yoga-instructor', 'cat-health-wellness', 'Yoga Instructor', 'yoga-instructor', 'Vinyasa, Hatha, restorative breathwork, and flexibility coaching for individuals or private groups.', 40.00, 'hour', 'USD', true, '1-1.5 hours', 'Flower2'),
  ('srv-massage-therapist', 'cat-health-wellness', 'Massage Therapist', 'massage-therapist', 'Deep tissue, Swedish relaxation, trigger point release, and sports recovery massage at home.', 65.00, 'hour', 'USD', true, '1-2 hours', 'Sparkles'),
  ('srv-nutrition-consultant', 'cat-health-wellness', 'Nutrition Consultant', 'nutrition-consultant', 'Dietary meal plans, metabolic health assessment, grocery planning, and macro tracking guidance.', 50.00, 'hour', 'USD', false, '1 hour', 'Apple'),

  -- Events & Entertainment
  ('srv-event-planner', 'cat-events-entertainment', 'Event Planner', 'event-planner', 'Full wedding, corporate summit, birthday, and celebration logistics coordination from setup to teardown.', 65.00, 'hour', 'USD', true, 'Flexible', 'Calendar'),
  ('srv-dj-music-service', 'cat-events-entertainment', 'DJ / Music Service', 'dj-music-service', 'Live music mixing, acoustic sound reinforcement, stage lighting, and curated party playlists.', 75.00, 'hour', 'USD', true, '3-6 hours', 'Music'),
  ('srv-event-decorator', 'cat-events-entertainment', 'Event Decorator', 'event-decorator', 'Theme design, floral arrangements, backdrop fabrication, and balloon styling for memorable gatherings.', 55.00, 'hour', 'USD', true, '2-5 hours', 'Palette'),
  ('srv-event-photographer', 'cat-events-entertainment', 'Event Photographer', 'event-photographer', 'High-resolution candids, red carpet shoots, edited digital galleries, and live celebration coverage.', 70.00, 'hour', 'USD', true, '2-6 hours', 'Camera')
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Default Admin Settings
INSERT INTO public.admin_settings (id, key, value, description)
VALUES
  ('set-comm-rate', 'platform_commission_percent', '10.0', 'Platform take rate percentage on completed bookings'),
  ('set-safety-fee', 'safety_guarantee_fee_usd', '10.0', 'Fixed customer platform guarantee and insurance fee in USD'),
  ('set-currency', 'base_currency', 'USD', 'Base platform settlement currency')
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;
