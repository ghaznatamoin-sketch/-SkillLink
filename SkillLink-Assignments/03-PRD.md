# SkillLink — Product Requirements Document (PRD)

**Document Type:** Product Requirements Document
**Product Name:** SkillLink
**Version:** 1.0 (Assignment 03)

---

## 1. Product Overview

**Product Name:** SkillLink

**Product Type:** Worldwide Home & Professional Services Marketplace (web application)

**Product Description:**
SkillLink is a digital marketplace that connects customers who need a service with skilled workers and service professionals who can provide that service. The platform organizes services into clear categories, allows customers to discover and evaluate available providers, and gives providers a structured way to be found and hired. SkillLink is designed to serve users worldwide rather than being limited to a single city or country.

**Problem Being Solved:**
Customers regularly struggle to find service professionals who are reliable, available, and suitable for their needs, relying on informal methods such as asking friends and family, searching social media, or contacting multiple providers to compare price and availability. Skilled workers, in turn, often lack a consistent digital channel to reach customers beyond their personal networks. This creates a recurring, two-sided problem of poor discovery and limited reach.

**Proposed Solution:**
SkillLink solves this by providing one organized, worldwide marketplace where customers can browse service categories, discover and compare providers using availability, ratings, service area, and pricing, and submit service requests or bookings. Workers can create professional profiles, list their services and availability, and receive and manage requests from customers actively looking for that service. An admin layer keeps the marketplace organized, verified, and commercially sustainable.

**Product Vision:**
To become a trusted, unified worldwide platform where finding and hiring a skilled service professional is as simple as searching, comparing, and booking — regardless of the type of service or the customer's location.

**Product Objective:**
To provide a functional, well-structured marketplace that connects customers and service professionals across a broad range of service categories, supports the core discovery-to-completion journey, and gives the platform owner the tools to operate and grow the marketplace responsibly.

**Why the Product Is Valuable:**
SkillLink brings together many service categories that are normally scattered across different tools, contacts, and platforms into a single, consistent experience. This reduces the time and effort customers spend searching for help, gives workers a wider and more structured channel to find work, and gives the platform owner a scalable, configurable marketplace business model. The value described here is a reasoned product rationale, not a measured or proven outcome.

---

## 2. Target Users

### Primary Users

**1. Customers / Service Seekers**
Individuals or households who need a service — such as a repair, cleaning, technical support, vehicle care, personal care, or professional service — and want an efficient way to find, evaluate, and hire a suitable provider. Their core need is fast, trustworthy discovery and a simple way to request or book a service.

**2. Workers / Technicians / Service Professionals**
Skilled tradespeople, technicians, freelancers, and independent professionals who offer one or more services and want a structured, reliable channel to reach customers, manage incoming requests, and track their jobs and earnings. Their core need is visibility to relevant customers and simple tools to manage their work.

### Secondary User

**3. Owner / Admin**
The individual or team operating the SkillLink platform. Responsible for maintaining the marketplace's integrity — managing users, verifying workers, configuring categories and services, monitoring bookings and payments, managing commission, and handling complaints or disputes. Their core need is visibility and control over the marketplace's health and revenue.

---

## 3. User Personas

*The following personas are representative and illustrative only. They are not real, interviewed individuals, and no claims are made about actual user research.*

### Persona 1 — Customer

**Name:** Amara Bello
**Age:** 34
**Role:** Customer / Homeowner
**Location:** Lagos, Nigeria

**Goals:**
* Quickly find a reliable electrician to fix a wiring issue at home.
* Compare a few available providers before deciding who to hire.
* Avoid the hassle of calling multiple people to check availability and price.

**Problems:**
* Doesn't have a trusted electrician in her personal network at her current address.
* Previous attempts to find help through social media groups were slow and unreliable.
* Struggles to judge whether a provider is trustworthy before meeting them.

**Needs:**
* A simple way to browse electricians in her area.
* Visibility into ratings, pricing, and availability before contacting anyone.
* A clear way to track the status of her request once submitted.

**How SkillLink Helps Her:**
Amara opens SkillLink, selects the "Electrician" service under Electrical & Appliances (or Home & Repair, depending on categorization), views a list of available providers in her area with ratings and pricing, and submits a booking request to the provider she prefers — all without needing to make multiple phone calls.

---

### Persona 2 — Worker / Service Professional

**Name:** Rafael Costa
**Age:** 29
**Role:** Independent Worker — Air Conditioning (AC) Technician
**Location:** São Paulo, Brazil

**Goals:**
* Find new customers beyond his existing referral network.
* Manage job requests and his schedule in one place.
* Build a visible reputation through customer reviews.

**Problems:**
* Relies mostly on word-of-mouth, which limits how much work he can find.
* Has no structured way to show his skills, experience, and availability to potential customers.
* Loses time coordinating manually with customers over calls and messages.

**Needs:**
* A professional profile where he can list his services, experience, and pricing.
* A way to control his availability and service area.
* A simple system to accept, manage, and complete job requests.

**How SkillLink Helps Him:**
Rafael creates a worker profile on SkillLink, selects "AC Technician" under Electrical & Appliances, sets his service area and availability, and starts receiving job requests from nearby customers. He can accept or reject requests, track his active jobs, and view his earnings and reviews from one dashboard.

---

### Persona 3 — Owner / Admin

**Name:** Meera Nair
**Age:** 41
**Role:** Platform Owner / Administrator
**Location:** Remote (platform operates internationally)

**Goals:**
* Keep the marketplace trustworthy by verifying workers and monitoring quality.
* Ensure bookings, payments, and commission are tracked accurately.
* Understand platform activity and growth through reports and analytics.

**Problems:**
* Needs visibility across a large, worldwide set of users and services.
* Must handle complaints or disputes fairly and efficiently.
* Needs to manage commission and revenue without manually reviewing every transaction.

**Needs:**
* A secure, centralized admin dashboard.
* Tools to manage categories, services, users, and bookings.
* Reporting and analytics to understand platform health.

**How SkillLink Helps Her:**
Meera logs into the admin dashboard to verify new worker accounts, manage service categories, monitor active bookings and payments, adjust the platform's commission settings, and review reports on platform activity — giving her the oversight needed to operate SkillLink responsibly at scale.

---

## 4. Service Categories

SkillLink organizes its services into distinct category groups. Within the product, each individual service must be represented as its own separate, clickable card or button — services must not be merged into a single generic "services" option. Selecting a service should lead the customer to relevant, available providers for that specific service.

### A. Home & Repair
Plumber · Electrician · Carpenter · Painter · Mason / Construction · Handyman · Door & Lock Repair · Window & Glass Repair · Roof Repair · General Home Repair

### B. Electrical & Appliances
AC Technician · Refrigerator Repair · Washing Machine Repair · Gas Stove Repair · Water Heater / Geyser · TV Repair · Generator Technician · Solar Technician

### C. Computer & Technology
Computer Repair · Laptop Repair · Printer Repair · Wi-Fi / Network Technician · CCTV Technician · Cable Technician · Mobile Repair · IT Support

### D. Outdoor & Garden
Gardener / Mali · Tree Service · Landscaping · Pool Cleaning · Irrigation Technician

### E. Cleaning
Home Cleaning · Sofa Cleaning · Window Cleaning · Carpet Cleaning · Deep Cleaning · Waste Removal · Sewerage / Drain Cleaning

### F. Vehicle Services
Car Mechanic · Tyre Service · Battery Service · Car Wash · Car Detailing · Motorcycle Repair · Towing

### G. Personal & Lifestyle
Tailor · Hairdresser / Barber · Makeup Artist · Beautician · Photographer · Videographer

### H. Moving & Delivery
Movers · Packing Service · Local Delivery · Furniture Moving · Storage Service

### I. Home Support
Babysitter · Elderly Care · Pet Care · Dog Walker · Housekeeper · Cook / Chef

### J. Professional Services
Web Developer · Graphic Designer · Typing / Data Entry · Tutor · Accountant · Legal Consultant · Business Consultant

Each category functions as a top-level grouping; each individual service within a category is its own selectable item that, when chosen, filters available providers who offer that specific service.

---

## 5. Core Features

### Customer Features
* Registration and login
* Google Login
* Email/password authentication
* Customer profile management
* Search services
* Browse categories
* Search/filter providers
* View provider profiles
* View skills and experience
* View service areas
* View availability
* View pricing/service details
* Ratings and reviews
* Request a service
* Book a service
* Track booking/job status
* Booking history
* Notifications
* Chat/messaging where required
* Rate/review completed services

### Worker Features
* Registration/login
* Google Login
* Email/password authentication
* Worker profile management
* Select service categories
* Select individual services
* Add skills
* Add experience
* Add service area/location
* Add availability
* Add pricing
* Receive job requests
* Accept/reject requests
* Manage jobs
* Update job status
* View completed jobs
* View earnings
* View ratings/reviews
* Customer communication

### Owner/Admin Features
* Secure admin login
* Protected admin dashboard
* Manage customers
* Manage workers
* Manage service categories
* Manage services
* Manage bookings/jobs
* Manage payments
* Manage commissions
* Manage platform revenue
* Manage complaints/disputes
* Manage ratings/reviews where moderation is required
* Reports
* Analytics
* Platform settings
* User verification/status management

---

## 6. Business Model

SkillLink operates as a marketplace business, earning revenue through a **configurable** platform commission and/or service fee, set and managed by the owner/admin rather than fixed permanently in the system.

**Illustrative Example (for understanding only, not a final rule):**

| Item | Amount |
|---|---|
| Customer payment | 5,000 |
| Worker receives | 4,500 |
| Platform commission | 500 |

This example demonstrates the general concept of a commission-based model, where the worker receives their agreed earning and the platform retains a commission or service fee on top. The actual commission percentage or fee structure must be configurable by the admin, and different rates could apply to different categories, regions, or worker tiers in future iterations. No specific commission rate is finalized in this document.

---

## 7. Core User Flows

### Customer Flow
Landing Page → Select Category → Select Service → View Available Providers → Open Provider Profile → Check Skills/Experience/Ratings/Location/Price → Request or Book → Confirm → Track Job → Complete Service → Payment → Review/Rating

### Worker Flow
Landing Page → Worker Login/Register → Create Profile → Select Services → Add Skills/Experience/Service Area/Availability/Pricing → Receive Request → Accept/Reject → Manage Job → Complete Job → Earnings → Customer Review

### Admin Flow
Admin Login → Admin Dashboard → Manage Users → Manage Workers → Manage Categories/Services → Manage Jobs/Bookings → Manage Payments/Commission → Complaints → Reports/Analytics → Settings

---

## 8. Provider Discovery Flow

Provider discovery is one of the most important flows in SkillLink, as it directly determines whether a customer can efficiently find a suitable provider.

Category → Service → Available Providers → Provider Profile → Ratings & Reviews → Location / Service Area → Price / Service Details → Request / Book

The interface should make this sequence feel simple and intuitive: a customer should be able to move from selecting a broad category to booking a specific provider in a small number of clear steps, with relevant filtering (such as location, availability, and rating) available at the "Available Providers" stage.

---

## 9. Functional Requirements

### Authentication & Authorization
* The system shall support registration and login via email/password and Google Login for customers and workers.
* The system shall support a separate, secured login flow for admin users.
* The system shall enforce role-based access control (Customer, Worker, Admin), restricting each role to its permitted actions and views.
* The system shall protect authenticated routes and dashboards from unauthorized access.

### Customer Management
* The system shall allow customers to create and update their profile information.
* The system shall allow customers to view their booking history and current requests.

### Worker Management
* The system shall allow workers to create and update a professional profile, including skills, experience, service area, availability, and pricing.
* The system shall allow workers to select one or more services they provide from the defined category/service list.
* The system shall support a verification/status field for workers, manageable by the admin.

### Category & Service Management
* The system shall allow the admin to create, update, and manage service categories and individual services.
* The system shall display each service as an individually selectable item within its category.

### Provider Profiles & Search
* The system shall allow customers to search and filter providers by service, location/service area, availability, and rating.
* The system shall display provider profile information including skills, experience, service area, availability, pricing, and reviews.

### Booking / Request Management
* The system shall allow customers to submit a service request or booking to a specific provider.
* The system shall allow workers to accept or reject incoming requests.
* The system shall track and update job status (e.g., Requested, Accepted, In Progress, Completed, Cancelled).
* The system shall maintain a booking history accessible to both the customer and the worker involved.

### Reviews & Ratings
* The system shall allow customers to submit a rating and review after a service is marked complete.
* The system shall display aggregated ratings on provider profiles.
* The system shall allow the admin to moderate reviews where necessary (e.g., removing abusive content).

### Messaging & Notifications
* The system shall support messaging or communication between a customer and a worker where required for a booking.
* The system shall notify users of relevant events, such as new requests, status changes, and new messages.

### Payments & Commission
* The system shall support recording of payment information associated with a completed booking.
* The system shall calculate and apply the platform's configured commission or service fee to each transaction.
* The system shall allow the admin to configure the commission/fee structure.

### Admin Management
* The system shall provide the admin with tools to manage customers, workers, categories, services, bookings, payments, and complaints.
* The system shall provide reporting and analytics on platform activity.

### General System Requirements
* The system shall support standard CRUD (Create, Read, Update, Delete) operations for relevant entities within each role's permissions.
* The system shall validate all form input and provide clear, actionable error messages.
* The system shall handle errors gracefully without exposing sensitive technical details to end users.
* The system shall display appropriate loading states while data is being fetched.
* The system shall display appropriate empty states when no data is available (e.g., no providers found, no bookings yet).

**Role Distinction Summary:**
* **Customers** may search, view, request/book, track, and review — they may not manage other users, categories, or platform settings.
* **Workers** may manage their own profile, services, availability, and jobs — they may not access other workers' dashboards or admin functions.
* **Admins** may manage all users, categories, services, bookings, payments, commission, and platform settings — admin access is restricted to verified admin accounts only.

---

## 10. Non-Functional Requirements

### Performance
The application must be fast and lightweight. This includes optimized assets, efficient rendering, lazy loading where appropriate, avoidance of unnecessary heavy libraries, optimized images, minimal unnecessary animation, and efficient database queries. Performance must be prioritized before visual effects.

### Responsiveness
The application must work properly across desktop, laptop, tablet, and mobile screen sizes, adapting layouts naturally rather than relying on a single fixed design.

### Usability
Navigation must be simple and intuitive, allowing customers, workers, and admins to complete their core tasks without confusion.

### Accessibility
The application should include appropriate keyboard navigation, form labels, sufficient color contrast, readable typography, and accessible interactive elements.

### Security
* Secure authentication for all user roles.
* Protected routes based on authentication and role.
* Role-based authorization enforced on both client and server/database layers.
* Supabase Row Level Security (RLS) applied to protect data access at the database level.
* Secure handling of environment variables; secret keys must never be exposed in client-side code.
* `.env` files and secrets must never be committed to GitHub.
* All user input must be validated before processing or storage.

### Reliability
The system must include proper error handling, loading states, empty states, and graceful failure behavior (e.g., a failed request should show a clear message rather than an unhandled crash). Database operations should be reliable and consistent.

### Scalability
The architecture should be able to support growth in the number of users, workers, services, bookings, locations, and countries without requiring a fundamental redesign.

---

## 11. UI/UX Requirements

SkillLink should feel modern, professional, premium, trustworthy, fast, clean, and interactive.

### Visual Direction
* Primary theme: deep emerald / dark green
* Soft mint accents
* White for contrast and readability
* Charcoal/dark neutral areas where useful
* Subtle gold accents where appropriate
* Light glassmorphism for suitable cards and panels

### Animation
Use light, smooth animation only, including subtle hover effects, smooth transitions, small entrance animations, interactive buttons, subtle card movement, and mouse-direction/following glow where appropriate. Different service/category cards may use subtle accent glow colors, but the overall design must remain cohesive and green-focused.

**Avoid:** excessive neon, heavy animations, excessive glow, slow visual effects, childish UI, chaotic colors, huge empty spaces, and plain/boring screens.

### 3D Usage
Three.js / React Three Fiber may be used only where it provides real UX or visual value (e.g., an interactive hero section or a subtle service/network visualization). Heavy 3D should not be used everywhere.

**Guiding rule:** Performance first → Usability second → Beauty/Animation third.

---

## 12. Major Screens / Pages

### Public
Landing/Home · Categories · Services · Provider Search · Provider Profile · About · Contact · Login · Registration · Role Selection (where required)

### Customer Dashboard
Dashboard Home · Profile · Search/Browse Services · Providers · Requests · Bookings · Booking Details · Messages · Notifications · History · Reviews/Ratings · Payments (where applicable) · Settings

### Worker Dashboard
Dashboard Home · Profile · Services · Skills · Experience · Service Area · Availability · Pricing · Job Requests · Active Jobs · Completed Jobs · Earnings · Reviews · Messages · Notifications · Settings

### Admin Dashboard
Admin Login · Dashboard · Customers · Workers · Categories · Services · Bookings/Jobs · Payments · Commissions · Revenue · Complaints · Reviews · Reports · Analytics · Settings

---

## 13. Data Requirements

The following are the major data entities anticipated for SkillLink. This section describes their purpose and relationships conceptually; no SQL or schema implementation is defined at this stage.

* **Users** — Base identity record for anyone using the platform (customer, worker, or admin), holding shared account information such as name, email, and authentication details.
* **User Roles** — Defines which role(s) a user holds (Customer, Worker, Admin), controlling access and available functionality.
* **Customer Profiles** — Extended profile information specific to customers, linked one-to-one with a User.
* **Worker Profiles** — Extended profile information specific to workers, linked one-to-one with a User, including verification status.
* **Categories** — Top-level groupings of services (e.g., Home & Repair, Cleaning).
* **Services** — Individual services within a category (e.g., Plumber, Home Cleaning), linked to a Category.
* **Worker Services** — A linking entity connecting Worker Profiles to the specific Services they provide, potentially including their pricing for that service.
* **Skills** — Skill descriptors associated with a Worker Profile.
* **Experience** — Work experience details associated with a Worker Profile.
* **Service Areas** — Location/coverage information defining where a worker is willing to provide services.
* **Availability** — Time-based availability information for a Worker Profile, used to indicate when a worker can accept jobs.
* **Bookings** — A customer's request to a worker for a specific service, linking a Customer Profile, a Worker Profile, and a Service.
* **Jobs** — The working record of an accepted Booking, tracking status from acceptance through completion.
* **Payments** — Records of payment transactions associated with a completed Job, linked to the relevant Booking/Job.
* **Commissions** — Records of the platform's commission or fee calculated against a Payment, based on admin-configured rates.
* **Reviews** — Customer-submitted feedback text linked to a completed Job/Worker.
* **Ratings** — Numerical scores associated with a Review, aggregated on Worker Profiles.
* **Messages** — Communication records between a Customer and a Worker, typically linked to a Booking.
* **Notifications** — System-generated alerts delivered to Users based on relevant events (new request, status change, new message, etc.).
* **Complaints** — Records of disputes or issues raised by a Customer or Worker, reviewed and managed by the Admin.
* **Admin Settings** — Platform-wide configuration values managed by the Admin, such as commission rates and category settings.

**Key relationships (conceptual):**
A User has one Role context per session but may relate to either a Customer Profile or a Worker Profile. A Worker Profile relates to many Worker Services, Skills, Experience entries, Service Areas, and Availability entries. A Booking relates one Customer Profile, one Worker Profile, and one Service, and progresses into a Job. A Job may result in a Payment, which generates a Commission record. A completed Job may generate a Review and Rating. Complaints may reference a Booking/Job, a Customer, and/or a Worker.

---

## 14. Technology Stack

### Frontend
* **Next.js** — provides a performant, SEO-friendly React framework suitable for a public-facing marketplace with authenticated dashboards.
* **React** — component-based UI development for maintainable, reusable interface elements.
* **TypeScript** — adds type safety, reducing bugs and improving maintainability as the codebase grows.
* **Tailwind CSS** — enables fast, consistent, utility-based styling aligned with the defined design direction.
* **Framer Motion** — used selectively for smooth, lightweight animations and transitions.
* **Three.js / React Three Fiber** — used only where genuinely useful for premium visual elements, kept minimal to protect performance.

### Backend / Database
* **Supabase** — provides authentication, a managed PostgreSQL database, and storage in one integrated platform, well-suited for a marketplace requiring structured relational data and role-based access.
* **PostgreSQL** — a robust, relational database suitable for the structured, relationship-heavy data model described in Section 13.
* **Supabase Authentication** — handles email/password and Google Login flows securely.
* **Supabase Storage** — used where file storage is required (e.g., profile images, documents).

### Deployment
* **GitHub** — source control and collaboration.
* **Vercel** — deployment platform well-suited for Next.js applications, offering straightforward hosting and continuous deployment.

---

## 15. International / Worldwide Requirements

SkillLink must be designed for international use rather than being limited to one city or country. This includes:

* Support for multiple countries and cities as selectable locations.
* A service area model that can represent location and coverage in different regions.
* Support for international users registering and using the platform from different locations.
* Support for multiple currencies where required, rather than a single hard-coded currency.
* Consideration of time zones where relevant to availability and scheduling.
* Location-based provider discovery, allowing customers to find providers relevant to their specific area.
* Country/city selection as part of the location and search experience.
* A scalable location architecture that can accommodate new regions being added over time without redesign.

No specific country-by-country legal, tax, or payment requirements are defined in this document, as these would require verified, jurisdiction-specific research rather than assumption.

---

## 16. Navigation

**Primary navigation should include:**
* Logo
* Home
* Services/Categories
* Find a Professional
* How It Works
* About
* Contact
* Login/Register

**After authentication:** the navigation should adapt to show role-relevant items, such as a "Dashboard" link, along with role-specific quick links (e.g., "My Bookings" for customers, "Job Requests" for workers, "Admin Panel" for admins). Unauthenticated visitors should see only public navigation items.

---

## 17. Social / Contact Links

The UI should include space for social and contact links, including:

WhatsApp · Facebook · Instagram · YouTube · TikTok · LinkedIn · X · Pinterest

**Important:** No fake or placeholder social media URLs should be invented or hard-coded. Actual links should only be added once official SkillLink account URLs exist and are confirmed. Until then, these should be treated as reserved UI slots rather than live links.

---

## 18. Error, Loading & Empty States

The interface must define clear behavior for the following states, each explaining what happened and, where relevant, what the user can do next:

* **Loading providers** — a loading indicator while provider results are being fetched.
* **No providers found** — a clear message indicating no providers currently match the search/filter, with a suggestion to adjust filters or check back later.
* **No bookings** — a message indicating the customer has no bookings yet, with a prompt to browse services.
* **No job requests** — a message indicating the worker has no pending requests yet.
* **Failed login** — a clear, non-technical error message with guidance (e.g., "incorrect email or password").
* **Failed registration** — a clear message explaining why registration failed (e.g., email already in use, invalid input).
* **Booking failure** — a message explaining that the booking could not be completed, with an option to retry.
* **Network/database error** — a general, user-friendly error message with a retry option, without exposing technical details.
* **Unauthorized access** — a message indicating the user does not have permission to view the requested page, with a redirect to an appropriate area.
* **Invalid form input** — inline validation messages indicating which fields need correction.
* **Empty dashboard data** — role-appropriate messaging (e.g., "You haven't added any services yet") with a relevant next action.

---

## 19. Success Criteria

Success criteria are defined functionally, without inventing numerical business targets.

**The MVP should be considered functionally successful when a customer can:**
1. Register/login.
2. Select a service category.
3. Select a service.
4. Find available providers.
5. View a provider profile.
6. View relevant provider information.
7. Request/book a service.
8. Track the request/job.
9. Complete the service flow.
10. Leave a rating/review.

**A worker should be able to:**
1. Register/login.
2. Create a service profile.
3. Select services.
4. Add skills/experience/service area/availability/pricing.
5. Receive job requests.
6. Accept/reject requests.
7. Manage jobs.
8. View earnings and reviews.

**An admin should be able to:**
1. Login securely.
2. Manage users.
3. Manage workers.
4. Manage categories/services.
5. Manage bookings/jobs.
6. Manage payments/commissions.
7. View reports/analytics.
8. Handle complaints and platform management.

---

## 20. MVP Boundary

The MVP should focus on the core marketplace journey:

**Find Service → Find Provider → Request/Book → Manage Job → Complete → Review**

This includes the essential customer, worker, and admin capabilities described in Sections 5, 9, and 19. The first version should not be overloaded with unnecessary advanced features.

**Future expansion may include:**
* AI assistance
* Smart provider matching
* Advanced maps
* Advanced analytics
* Automated recommendations
* Additional payment integrations
* Additional communication features

These are noted as potential future directions only and are not part of the current MVP scope.

---

## 21. Product Risks & Considerations

* **Fake or incomplete worker profiles** — Risk of low-quality or misleading profiles reducing customer trust. *Consideration:* implement admin verification status and encourage profile completeness before a worker is fully listed.
* **Provider availability accuracy** — Risk of providers appearing available when they are not. *Consideration:* allow workers to easily update availability, and design the system to reflect availability status clearly.
* **Customer trust** — Risk of customers hesitating to book unfamiliar providers. *Consideration:* surface ratings, reviews, and verification status prominently on provider profiles.
* **Review authenticity** — Risk of fake or manipulated reviews. *Consideration:* restrict review submission to customers with a completed booking tied to that provider, and allow admin moderation.
* **Payment disputes** — Risk of disagreements over payment or job completion. *Consideration:* maintain clear job status tracking and a complaint-handling process managed by the admin.
* **Location accuracy** — Risk of inaccurate service area data leading to mismatched search results. *Consideration:* validate and structure location/service area data carefully in the data model.
* **Service quality differences** — Risk of inconsistent service quality across independent workers. *Consideration:* rely on ratings/reviews and admin oversight rather than guaranteeing uniform quality.
* **Platform abuse** — Risk of misuse such as spam accounts or fraudulent requests. *Consideration:* role-based access control, admin monitoring tools, and complaint management.
* **Privacy/security** — Risk of exposing sensitive user data. *Consideration:* enforce Supabase Row Level Security, secure authentication, and careful handling of environment variables and secrets.
* **International scalability** — Risk of the platform's location, currency, or availability model not scaling cleanly across countries. *Consideration:* design the data model and location architecture (Section 13, Section 15) to be extensible from the start rather than region-specific.

No statistics or probability estimates are provided for these risks, as no such data has been collected or verified.

---

## 22. PRD Summary

SkillLink is a worldwide Home & Professional Services Marketplace that connects customers who need a service with skilled workers and service professionals who can provide it. It addresses a real, recurring problem: customers struggle to efficiently discover trustworthy, available providers, while workers struggle to reach customers beyond their personal networks.

The marketplace works by organizing services into clear categories, allowing customers to browse, compare, and request providers based on skills, ratings, availability, service area, and pricing, while giving workers structured tools to list their services and manage incoming job requests. The platform supports three user roles — **Customer**, **Worker**, and **Owner/Admin** — each with clearly defined responsibilities and permissions.

The core MVP journey is: **Find Service → Find Provider → Request/Book → Manage Job → Complete → Review**, supported by a configurable commission-based business model that the admin controls.

The technology direction centers on **Next.js, React, TypeScript, and Tailwind CSS** on the frontend, **Supabase/PostgreSQL** on the backend, and **GitHub/Vercel** for deployment — chosen for their fit with a structured, relational, role-based marketplace application.

The product's design and performance philosophy follows a clear priority order: **Performance first → Usability second → Beauty/Animation third**, paired with a premium, cohesive, emerald-and-mint visual direction intended to feel modern, trustworthy, and professional.

This document is intended to serve as the primary product reference for the next stages of SkillLink's development.
