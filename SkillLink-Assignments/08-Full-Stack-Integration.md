# SkillLink — Full-Stack Integration & Complete Product Specification

**Document Type:** Full-Stack Integration & Complete Product Development Specification
**Product Name:** SkillLink
**Version:** 1.0 (Assignment 08)
**Based On:** 03-PRD.md, 04-MVP-Technical-Specification.md, 05-UI-UX-Design-System.md, 06-Build-MVP.md, 07-MVP-Iteration.md

---

## 1. Assignment Objective

This assignment converts the existing SkillLink frontend MVP (built in Assignment 06 and refined in Assignment 07) into a real full-stack application. The prior assignments established the problem (01), the product idea (02), the full PRD (03), the MVP scope (04), the design system (05), the frontend MVP (06), and its iteration/polish (07).

This assignment integrates that frontend with a real backend, replacing mock/demo functionality with real data, real authentication, and real database operations, using:

* **Supabase** (backend platform)
* **PostgreSQL** (database)
* **Supabase Authentication**
* **Supabase Storage** where required
* **GitHub** (source control)
* **Vercel** (deployment)

The objective is functional completeness of the core marketplace loop on real infrastructure, not the addition of new features beyond what has already been defined in `03-PRD.md` and `04-MVP-Technical-Specification.md`.

---

## 2. Full-Stack Architecture

**Architecture flow:**

**User → Next.js / React Frontend → Supabase Authentication → Supabase PostgreSQL Database → Supabase Storage (where required)**

**Role of each layer:**

* **User** — the customer, worker, or admin interacting with the application through a browser or mobile browser.
* **Next.js / React Frontend** — renders the UI built in Assignments 05–07, handles client-side routing, form state, and presentation logic, and communicates with Supabase through a dedicated data/service layer rather than embedding database calls throughout UI components.
* **Supabase Authentication** — manages user identity: registration, login (email/password and Google OAuth), session tokens, and password recovery. Issues the session used to identify the current user on subsequent requests.
* **Supabase PostgreSQL Database** — the system of record for all structured data (profiles, categories, services, bookings, reviews, messages, notifications, complaints, payments, commissions, admin settings). Enforces data integrity through constraints and enforces access control through Row Level Security (RLS).
* **Supabase Storage** — stores binary assets such as profile images and, where appropriate, worker-submitted documents, governed by storage-level access policies mirroring the database's RLS approach.

**Service layer principle:** the frontend's `services/` layer (established in `06-Build-MVP.md`, Section 29) is the only part of the codebase that calls Supabase directly. UI components call functions from this layer rather than embedding Supabase queries directly, keeping data-access logic centralized, testable, and easy to secure. No sensitive backend credentials (service-role keys, database passwords) are ever included in this frontend-facing layer; only the public anon key and project URL are used client-side, consistent with Section 35.

---

## 3. Authentication

Real Supabase Authentication replaces the frontend/demo authentication built in Assignment 06.

**Supported flows:**
* Email/password registration
* Email/password login
* Logout
* Password recovery (reset-password email flow)
* Google OAuth login
* Persistent session handling (Supabase session/token stored and refreshed appropriately)
* Authenticated user state available throughout the app (e.g., via a shared auth context/hook)

**Role determination:** upon successful registration, a corresponding profile record is created that stores the user's role (Customer or Worker; Admin accounts are provisioned separately and are not self-registerable through the public registration form). Upon login, the application reads the user's role from their profile record and redirects them to the appropriate dashboard (Customer Dashboard, Worker Dashboard, or Admin Dashboard) rather than a generic landing page.

---

## 4. Role-Based Access

Three roles are enforced across both the frontend and the backend:

* **Customer** — access limited to customer-facing functionality (browsing, booking, tracking, reviewing, messaging, and their own profile/settings).
* **Worker** — access limited to worker-facing functionality (profile/service management, job requests, job management, earnings, reviews received, messaging, and their own settings).
* **Admin** — access limited to platform management functionality (users, categories, services, bookings, payments, commissions, complaints, reports, settings).

**Enforcement approach (two layers, not one):**
1. **Frontend route protection** — protected routes/layouts check the authenticated user's role and redirect unauthorized users (e.g., a customer attempting to open a worker or admin route is redirected to their own dashboard with a clear message, per the pattern established in `07-MVP-Iteration.md`, Section 4).
2. **Database-level authorization (RLS)** — the authoritative control. Even if a user manually changes a URL to attempt to reach another role's data or view, the underlying Supabase queries are constrained by RLS policies (Section 7) so that no unauthorized data can be returned or modified, regardless of what the frontend attempts to display.

Frontend route protection exists for a good user experience; RLS exists for actual security. The application never relies on frontend checks alone.

---

## 5. Supabase Database

The following PostgreSQL tables form the core schema (described at a structural/conceptual level; this document does not include SQL, consistent with the assignment's scope):

| Table | Purpose |
|---|---|
| `users` / `profiles` | Core identity record shared by all roles, linked to Supabase Auth's user id; stores name, email, role, and shared account metadata. |
| `customer_profiles` | Customer-specific extension data (contact info, country, city, address/location). |
| `worker_profiles` | Worker-specific extension data (title, bio, experience, verification status). |
| `categories` | Top-level service groupings (e.g., Home & Repair). |
| `services` | Individual services, each linked to a category. |
| `worker_services` | Join table linking a worker to the services they offer, including their pricing per service. |
| `skills` | Reference list of skill descriptors. |
| `worker_skills` | Join table linking a worker to their selected skills. |
| `service_areas` | Location/coverage records defining where a worker offers service. |
| `worker_availability` | Availability records/schedule information for a worker. |
| `bookings` | The customer's request to a worker for a specific service; the central transactional record. |
| `jobs` | The working record tracking a booking's status lifecycle from acceptance to completion. |
| `payments` | Payment records associated with a completed job. |
| `commissions` | Platform commission/fee records calculated against a payment. |
| `reviews` | Customer feedback (rating + text) linked to a completed booking/worker. |
| `messages` | Communication records between a customer and a worker, tied to a booking where relevant. |
| `notifications` | System-generated alerts delivered to users based on key events. |
| `complaints` | Dispute/issue records raised by a customer or worker, reviewed by admin. |
| `admin_settings` | Platform-wide configuration values (e.g., commission rate) managed by the admin. |

**Column conventions applied across all tables:**
* UUID primary keys (aligning with Supabase Auth's user id format)
* Foreign keys enforcing referential integrity between related tables (e.g., `bookings.customer_id → customer_profiles.id`)
* `created_at` / `updated_at` timestamp columns on all tables
* Status fields using constrained/enumerated values where applicable (e.g., booking/job status, complaint status)
* Appropriate `NOT NULL` and uniqueness constraints (e.g., a worker cannot select the same service twice in `worker_services`)
* No unnecessary duplication of data across tables — shared information (e.g., a user's name) lives in one place and is referenced, not copied, elsewhere

---

## 6. Database Relationships

The schema implements the following relationships:

* **User → Profile** — one-to-one; every authenticated user has exactly one core profile record.
* **User → Customer Profile** — one-to-one, present only for users with the Customer role.
* **User → Worker Profile** — one-to-one, present only for users with the Worker role.
* **Category → Services** — one-to-many; each service belongs to exactly one category.
* **Worker → Services** (via `worker_services`) — many-to-many; a worker may offer multiple services, and a service may be offered by many workers.
* **Worker → Skills** (via `worker_skills`) — many-to-many.
* **Worker → Service Areas** — one-to-many; a worker may define multiple coverage areas.
* **Customer → Bookings** — one-to-many; a customer may have many bookings.
* **Worker → Bookings** — one-to-many; a worker may receive many bookings.
* **Booking → Service** — many-to-one; each booking references exactly one service.
* **Booking → Job** — one-to-one; a booking's working/status record.
* **Booking → Payment** — one-to-one (once a job reaches a payable state).
* **Booking → Commission** — one-to-one, derived from the associated payment.
* **Booking → Review** — one-to-one (at most one review per eligible completed booking, per Section 18).
* **Users → Messages** — one-to-many in both directions (sender and receiver), typically scoped to a booking.
* **Users → Notifications** — one-to-many; each notification belongs to exactly one recipient user.
* **Users → Complaints** — one-to-many; a complaint is raised by a user and may reference a specific booking/job.

This relationship structure mirrors the conceptual data model already defined in `03-PRD.md` (Section 13) and `04-MVP-Technical-Specification.md` (Section 7), now expressed as an implementable relational schema.

---

## 7. Row Level Security

Supabase Row Level Security (RLS) is enabled on every table containing user-specific or sensitive data, and policies are defined per role.

### Customer Policies
A customer can:
* Read public service/category/provider information (no restriction, as this is public marketplace data).
* Read and update only their own customer profile record.
* Create bookings where they are the customer on the booking.
* Read only bookings where they are the associated customer.
* Update only the specific fields on their own bookings permitted by business rules (e.g., cancellation within allowed limits), not arbitrary fields.
* Create a review only for a booking where they are the customer, the booking is in a "Completed" state, and no review already exists for that booking.
* Read and manage only their own messages and notifications (as sender/recipient).

### Worker Policies
A worker can:
* Read and update only their own worker profile record.
* Manage (create/update/delete) only their own rows in `worker_services`, `worker_skills`, `service_areas`, and `worker_availability`.
* Read bookings/jobs only where they are the associated worker.
* Update job status only along permitted transitions (Section 15) and only for jobs where they are the associated worker.
* Read only their own earnings-related payment/commission records.
* Read only reviews associated with their own completed jobs (for display) — they cannot edit reviews.
* Read and manage only their own messages and notifications.

### Admin Policies
An authenticated user with the Admin role can read and manage records across the platform-management tables (`categories`, `services`, `admin_settings`) and has elevated read access to operational tables (`bookings`, `jobs`, `payments`, `commissions`, `complaints`, `reviews` for moderation) required to perform the management functions defined in Section 20. Admin write access to user-owned data (e.g., editing a worker's profile) is limited to specific administrative actions (e.g., verification status, account activation/deactivation) rather than unrestricted editing of another user's content.

**Core principle:** RLS policies are the authoritative access-control mechanism. Frontend checks (Section 4) improve UX by hiding options a user cannot use, but every meaningful read/write is independently constrained at the database level, so a manipulated frontend request still cannot bypass these rules.

---

## 8. User Profiles

**Customer profile fields:**
* Name
* Profile image (stored via Supabase Storage, Section 25)
* Contact information (where appropriate, e.g., phone number)
* Country
* City
* Location/service address (where required for a booking)

**Worker profile fields:**
* Name
* Profile image (Supabase Storage)
* Professional title
* Bio
* Experience (years/description)
* Skills (via `worker_skills`)
* Services offered (via `worker_services`, including per-service pricing)
* Service areas (via `service_areas`)
* Availability (via `worker_availability`)
* Verification status (managed by admin, per Section 20)

Profile creation and editing use real CRUD operations against the corresponding Supabase tables (Section 21), replacing the mock profile forms built in Assignment 06. Profile image uploads use Supabase Storage with access policies restricting who can upload/replace a given user's image (the user themselves, plus admin where needed for moderation).

---

## 9. Categories & Services

Categories and services move from the frontend's mock data (Assignment 06, Section 30) to real, database-backed records.

**Admin capabilities (via the protected Admin Dashboard):**
* Create a category
* Read/list categories
* Update a category (name, description, status)
* Deactivate or delete a category where appropriate (deactivation preferred over hard deletion where services are already linked, to preserve historical booking data integrity)

* Create a service (linked to a category)
* Read/list services
* Update a service
* Deactivate or delete a service where appropriate, with the same integrity consideration as categories

**Customer-facing behavior:** the category and service browsing pages (built in Assignment 06, Section 5–6) now query the `categories` and `services` tables directly, so any admin change to categories/services is reflected for customers without a frontend code change.

---

## 10. All SkillLink Services

The full category/service list defined throughout Assignments 02, 03, 05, and 06 is seeded into the database as the initial `categories` and `services` data, with every service correctly linked to its parent category:

**Home & Repair** — Plumber, Electrician, Carpenter, Painter, Mason/Construction, Handyman, Door & Lock Repair, Window & Glass Repair, Roof Repair, General Home Repair

**Electrical & Appliances** — AC Technician, Refrigerator Repair, Washing Machine Repair, Gas Stove Repair, Water Heater/Geyser, TV Repair, Generator Technician, Solar Technician

**Computer & Technology** — Computer Repair, Laptop Repair, Printer Repair, Wi-Fi/Network Technician, CCTV Technician, Cable Technician, Mobile Repair, IT Support

**Outdoor & Garden** — Gardener/Mali, Tree Service, Landscaping, Pool Cleaning, Irrigation Technician

**Cleaning** — Home Cleaning, Sofa Cleaning, Window Cleaning, Carpet Cleaning, Deep Cleaning, Waste Removal, Sewerage/Drain Cleaning

**Vehicle Services** — Car Mechanic, Tyre Service, Battery Service, Car Wash, Car Detailing, Motorcycle Repair, Towing

**Personal & Lifestyle** — Tailor, Hairdresser/Barber, Makeup Artist, Beautician, Photographer, Videographer

**Moving & Delivery** — Movers, Packing Service, Local Delivery, Furniture Moving, Storage Service

**Home Support** — Babysitter, Elderly Care, Pet Care, Dog Walker, Housekeeper, Cook/Chef

**Professional Services** — Web Developer, Graphic Designer, Typing/Data Entry, Tutor, Accountant, Legal Consultant, Business Consultant

This seed data provides the baseline catalog admins can subsequently manage (add, edit, deactivate) through the Admin Dashboard described in Section 9.

---

## 11. Worker Service Management

Workers manage their real, database-backed service offerings through their dashboard (built in Assignment 06, Section 12), now connected to live data:

* Select one or more services from the seeded `services` table to offer (writing to `worker_services`)
* Add or remove offered services where business rules allow (e.g., not removing a service with active, unresolved bookings without appropriate handling)
* Add/manage skills (`worker_skills`)
* Add/manage experience details (`worker_profiles`)
* Define service areas (`service_areas`)
* Define availability (`worker_availability`)
* Define pricing per offered service (`worker_services`)

Because customer-facing provider search (Section 12) queries these same tables, a customer only ever sees services and providers that genuinely exist in the database — there is no remaining mock/sample provider data in the production-facing experience.

---

## 12. Provider Search

Mock provider data (used throughout Assignments 06–07 for UI demonstration) is fully replaced with real Supabase queries.

**Supported filters, applied as real database query parameters:**
* Category
* Service
* Country
* City
* Service area
* Availability
* Price (range)
* Rating (minimum, derived from aggregated `reviews`)
* Experience (minimum years)

**Efficiency requirements:**
* Queries select only the columns needed to render the provider results list (avoiding over-fetching full profile records for a summary view).
* Filtering and, where applicable, pagination are performed at the database query level rather than fetched in full and filtered client-side.
* Rating aggregation is computed efficiently (e.g., via a maintained aggregate column or an indexed query) rather than recalculated from the full review history on every search request.

---

## 13. Provider Profile

The provider profile page (built in Assignment 06, Section 9; refined in Assignment 07, Section 14) now renders entirely from real Supabase data:

* Name, profile image, professional title, bio (`worker_profiles`, Storage)
* Services (`worker_services` joined to `services`)
* Skills (`worker_skills` joined to `skills`)
* Experience (`worker_profiles`)
* Service area (`service_areas`)
* Availability (`worker_availability`)
* Pricing (`worker_services`)
* Ratings (aggregated from `reviews`)
* Reviews (`reviews`, joined to reviewer display info)
* Verification status (`worker_profiles`, set by admin)

No part of this page displays placeholder/sample content in the production build; any missing optional field (e.g., no bio yet) is handled through the empty-state patterns defined in Section 28, not fake sample text.

---

## 14. Booking System

The booking flow built in Assignment 06 (Section 14) and refined in Assignment 07 (Section 15) is connected to a real `bookings` table.

**Flow:**
1. Customer selects a service.
2. Customer selects a provider.
3. Customer selects a date.
4. Customer selects a time.
5. Customer enters location/service area.
6. Customer adds notes/details.
7. Customer reviews the estimated price (derived from the worker's `worker_services` pricing).
8. Customer submits the booking request.

On submission, a new row is inserted into `bookings` (and a corresponding `jobs` row is created to track status), with the current authenticated customer's id, the selected worker's id, the selected service, and all entered details. The customer immediately sees a real confirmation screen reflecting the created record's initial status, and the booking becomes visible in both the customer's and the worker's respective dashboards, since both now query the same underlying data.

---

## 15. Booking Status

The status lifecycle implemented in `jobs` (and reflected on the associated `bookings` record) is:

**Pending → Accepted / Rejected → Confirmed → In Progress → Completed / Cancelled**

**Permitted status changes by role:**
* **Worker** — may change a job from `Pending` to `Accepted` or `Rejected`; from `Accepted`/`Confirmed` to `In Progress`; and from `In Progress` to `Completed`.
* **Customer** — may change a job to `Cancelled` only while it remains in an early state (e.g., `Pending` or `Accepted`, per defined business rules), and may not set any other status directly.
* **Admin** — may override status in exceptional cases (e.g., resolving a complaint), with such actions logged for accountability.

Status transitions are validated at the database/authorization level (not only in the UI), so a request attempting an invalid or unauthorized transition (e.g., a customer trying to mark a job "Completed") is rejected regardless of what the frontend sends, consistent with the RLS-first principle in Section 7.

---

## 16. Worker Job Management

The worker dashboard's job-related views (Assignment 06, Section 12; refined in Assignment 07, Section 16) now operate on real data:

* View pending requests (`jobs` where status = Pending and worker_id = current user)
* Accept a request (status → Accepted)
* Reject a request (status → Rejected)
* View accepted jobs
* Update job status (Accepted/Confirmed → In Progress → Completed), per the permitted transitions in Section 15
* View completed jobs

Every status change is written to the database immediately and is reflected in real time (or on next data refresh) in the corresponding customer-facing booking status view, so both parties always see a consistent, shared state.

---

## 17. Customer Booking Management

The customer dashboard's booking-related views (Assignment 06, Section 11; refined in Assignment 07, Section 16) now operate on real data:

* View active bookings (`bookings`/`jobs` in non-terminal states for the current customer)
* View booking details (full record, including provider, service, price, and status timeline)
* View booking status (current state, using the status UI defined in `05-UI-UX-Design-System.md` Section 24)
* View history (bookings/jobs in `Completed` or `Cancelled` states)
* Cancel a booking where permitted by the status rules in Section 15
* View completed services
* Submit a review for an eligible completed booking (Section 18)

---

## 18. Reviews & Ratings

Reviews move from Assignment 06–07's sample review data to a real `reviews` table.

**A review record includes:**
* Customer id (reviewer)
* Worker id (reviewee)
* Booking id (the specific completed booking being reviewed)
* Rating (numeric score)
* Review text
* Created date

**Eligibility and integrity rules, enforced at the database/authorization level:**
* A review may only be created for a booking with status `Completed`.
* A review may only be created by the customer associated with that specific booking.
* At most one review is permitted per booking, unless an explicit edit policy is implemented (in which case the existing review is updated rather than a duplicate created).

Worker profile rating aggregates (Section 13) are computed from this real review data, so ratings displayed anywhere in the application always reflect actual stored reviews.

---

## 19. Payment & Commission Data

A database structure is implemented to record, for each completed job:

* Payment amount (total charged to the customer)
* Worker amount (the portion due to the worker)
* Platform commission (the portion retained by SkillLink)
* Payment status (e.g., Pending, Recorded, Refunded — scoped to what this assignment supports)
* Transaction/reference information (an internal reference identifier for the record)

**Illustrative example only (not a hard-coded rule):** a customer payment of 5,000 resulting in a worker amount of 4,500 and a platform commission of 500. The actual commission rate is read from `admin_settings` (configurable by the admin, per Section 20) and applied to compute the commission and worker-amount values for each transaction, rather than being fixed in application code.

**Scope clarification:** this assignment implements **payment record management** — the database structures and admin/reporting views for recording what was charged, what the worker earned, and what commission applied. It does **not** implement a live third-party payment gateway (e.g., card processing). That is explicitly identified as a **future integration**, consistent with the MVP boundary defined in `04-MVP-Technical-Specification.md`, Section 3.2.

---

## 20. Admin Management

The Admin Dashboard (built in Assignment 06, Section 13; refined in Assignment 07, Section 16) is now a protected, database-backed interface allowing the admin to manage:

* Customers (view, activate/deactivate)
* Workers (view, verify, activate/deactivate)
* Categories (Section 9)
* Services (Section 9)
* Bookings (view/filter across the platform)
* Jobs (status oversight, exception handling)
* Payments (view records, Section 19)
* Commissions (view and configure the platform commission rate via `admin_settings`)
* Revenue (aggregated summary views over `payments`/`commissions`)
* Reviews (moderate flagged/reported reviews)
* Complaints (Section 24)
* Reports (structured summaries over real operational data)
* Settings (`admin_settings`, including commission configuration)

All figures and lists shown in this dashboard reflect real database state — no remaining sample/demo data is used in this view for the production build.

---

## 21. CRUD Operations

Real CRUD functionality is implemented, scoped by role and protected by RLS, including:

**Users/Profiles** — Create (on registration), Read (own profile; admin can read others within permitted scope), Update (own profile; admin can update permitted administrative fields such as verification/activation status).

**Categories** — Create, Read, Update, Deactivate/Delete (admin only).

**Services** — Create, Read, Update, Deactivate/Delete (admin only).

**Worker Profiles** — Create (on worker registration), Read (own; public read of eligible fields for discovery), Update (own; admin can update verification/activation status).

**Bookings** — Create (customer), Read (customer/worker who are party to the booking; admin for oversight), Update allowed fields/status (per Section 15's role-based transition rules), Cancel where permitted.

**Reviews** — Create (customer, per Section 18's eligibility rules), Read (public, for provider profiles), Update where an explicit policy allows (e.g., the original reviewer editing within a defined window); otherwise reviews are immutable once submitted.

**Admin Settings** — Read (admin), Update (admin only).

Each CRUD operation is implemented through the frontend's `services/` data-access layer (Section 2) and is subject to the corresponding RLS policy (Section 7), so the permission model is enforced consistently regardless of which UI entry point triggers the operation.

---

## 22. Messages

A basic, database-backed messaging system is implemented using the `messages` table, supporting:

* Sender (user id)
* Receiver (user id)
* Booking/job reference, where the message relates to a specific booking
* Message content
* Timestamp
* Read/unread status

This replaces the sample conversation data used in Assignments 06–07 (Section 17/26). Consistent with the MVP scope boundary, the messaging system remains intentionally simple — a functional, persisted conversation thread tied to bookings, without real-time push delivery, typing indicators, or attachments, all of which remain future enhancements.

---

## 23. Notifications

Database-backed notifications are generated for key platform events, stored in the `notifications` table and surfaced in the notification UI built in Assignment 06 (Section 17):

* New booking request (to worker)
* Booking accepted (to customer)
* Booking rejected (to customer)
* Booking confirmed (to customer)
* Job started (to customer)
* Job completed (to customer, prompting a review)
* New review (to worker)
* Important admin action affecting the user (e.g., verification status change)

Notifications are created server-side (e.g., via a database function/trigger or a service-layer call at the point the triggering action occurs) so they cannot be forged or skipped by a manipulated frontend request.

---

## 24. Complaints

A basic complaint/dispute system is implemented using the `complaints` table:

* User (the complainant)
* Booking/job reference (where applicable)
* Subject
* Description
* Status (e.g., Open, In Review, Resolved, Dismissed)
* Admin notes
* Created date
* Updated date

Customers and workers can submit a complaint referencing a relevant booking; admins review and manage complaints through the Admin Dashboard (Section 20), updating status and adding internal notes as the issue is investigated and resolved.

---

## 25. Supabase Storage

Supabase Storage is used for:

* Profile images (customer and worker)
* Worker documents, where appropriate (e.g., a certification file, if collected for verification purposes)
* Service-related images/files, where genuinely necessary (kept minimal, consistent with the MVP boundary)

**Access control:**
* Profile images intended for public display (e.g., shown on a provider profile) are stored with read access appropriate to that public-facing purpose, while upload/replace permissions are restricted to the owning user (and admin, for moderation).
* Any more sensitive worker documents (e.g., verification materials) are stored with restricted access, readable only by the owning worker and admin — never publicly.
* No sensitive file is stored with public access "by default" without a specific, justified reason tied to its actual display purpose.

---

## 26. Error Handling

Consistent, user-friendly error handling is implemented across all real backend interactions:

* Authentication (invalid credentials, existing email, expired session)
* Database queries (fetch failures, timeouts)
* CRUD operations (failed create/update/delete)
* Booking (submission failure)
* Profile updates (validation or save failure)
* File uploads (failed upload, unsupported file type/size)
* Search (query failure)
* Reviews (submission failure, ineligible booking)
* Messages (failed send)

In every case, the user sees a clear, plain-language message (per the patterns established in `05-UI-UX-Design-System.md` Section 29 and `07-MVP-Iteration.md` Section 20) — never a raw Supabase/PostgreSQL error string, stack trace, or internal identifier exposed in the UI. Errors are logged appropriately on the server/service layer for debugging without surfacing sensitive detail to the end user.

---

## 27. Loading States

Real backend latency (network requests to Supabase) now requires the loading states already designed in Assignments 05–07 to be connected to genuine async operations:

* Authentication (login/registration submission)
* Dashboard (initial data fetch)
* Provider search (query in progress)
* Provider profile (data fetch)
* Booking (submission)
* Profile update (save in progress)
* File upload (progress indication)
* Admin tables (data fetch, especially with filters/pagination)
* CRUD operations generally (create/update/delete in progress)

All loading UI continues to use the lightweight skeleton/spinner approach defined in the design system — no new, heavier loading treatment is introduced simply because real network latency is now involved.

---

## 28. Empty States

Empty states, already designed in Assignments 05–07, are now driven by genuine empty query results rather than a simulated absence of mock data:

* No providers (a filtered search returns zero real matches)
* No bookings
* No job requests
* No messages
* No notifications
* No reviews
* No complaints
* No search results

Each continues to use the established pattern: a short explanatory message plus a relevant next action, per `05-UI-UX-Design-System.md` Section 28.

---

## 29. Security Requirements

The following security measures are implemented and verified:

* Supabase Auth for all identity and session management
* Row Level Security (RLS) enabled and enforced on every relevant table (Section 7)
* Protected frontend routes for role-specific areas (Section 4)
* Role-based authorization enforced at the database level, not just the frontend
* Input validation on both frontend forms and, where applicable, database constraints (Section 34)
* Secure environment variable usage (Section 35)
* Proper Supabase Storage access policies (Section 25)

**The application never:**
* Commits `.env` secrets to GitHub
* Exposes the Supabase service-role key in frontend code or any client-reachable location
* Hard-codes passwords anywhere in the codebase
* Places private API keys in frontend code
* Stores sensitive credentials in the GitHub repository, in commit history, or in client-visible configuration

---

## 30. International Requirements

Consistent with `03-PRD.md` Section 15, the full-stack implementation continues to support SkillLink as a worldwide platform:

* `customer_profiles` and `worker_profiles` include country and city fields rather than a single hard-coded region.
* `service_areas` are stored as structured, location-based records that can represent coverage in any country or city.
* Search/filtering (Section 12) supports filtering by country and city as genuine query parameters, not a fixed default.
* Currency information is represented where required (e.g., alongside payment amounts) rather than assuming a single hard-coded currency.
* Time zone handling is considered wherever date/time values are stored or displayed (e.g., storing timestamps in UTC and rendering in the viewer's local time), so scheduling remains coherent across regions.

No part of the schema, seed data, or UI hard-codes Karachi or Pakistan as a limiting default; any example data used during development is clearly illustrative rather than a structural constraint.

---

## 31. Performance Requirements

Full-stack performance follows the same priority established throughout the project:

**Performance → Usability → Beauty**

Applied specifically to backend integration:
* Efficient, targeted database queries (selecting only needed columns, using appropriate indexes on frequently filtered columns such as category, service, city, and rating)
* Pagination applied to any list that could grow large (provider search results, admin tables, booking history)
* Lazy loading for non-critical, below-the-fold content
* Optimized images, now served/stored via Supabase Storage with appropriately sized variants where practical
* Efficient React components that avoid unnecessary re-fetching or re-rendering when underlying data has not changed
* Minimizing the number of network requests per view (e.g., combining related data into a single query where reasonable, rather than many small sequential requests)
* Lightweight animations, unchanged from the design system — backend integration does not introduce any new animation weight

---

## 32. UI Preservation

The visual and interaction design established in Assignments 05–07 is preserved throughout backend integration:

* Green premium theme
* Light glassmorphism
* Responsive layouts
* Subtle hover effects
* Mouse-direction glow on category cards
* Lightweight animations
* Professional dashboard layouts

Connecting real data does not introduce new heavy visual effects, additional animation, or design deviations "because the backend is now real." Any UI change made during this assignment is strictly to accommodate real data shapes, loading/error/empty states tied to genuine async behavior, or security-driven UI (e.g., disabling an action the current user is not authorized to perform) — not a redesign.

---

## 33. Responsive Full-Stack Experience

Real database interactions are verified across desktop, laptop, tablet, and mobile, confirming:

* Forms submit correctly and show accurate validation/loading/success/error states with real backend responses
* Search returns and displays real, filtered results correctly at every breakpoint
* Booking can be completed end-to-end on each device size
* All three dashboards load and display real data correctly, including on mobile's stacked/adapted layouts (per `07-MVP-Iteration.md` Section 6)
* Admin tables remain usable with real (potentially larger) data volumes at every breakpoint, including the mobile "card row" adaptation established during iteration
* Navigation continues to function correctly post-authentication, including role-based redirects
* Loading and error states render correctly under real network conditions, not just simulated ones

---

## 34. Data Validation

Data is validated at two levels, since frontend validation alone is not treated as sufficient for security or integrity:

**Frontend validation** — immediate, user-facing feedback (per `05-UI-UX-Design-System.md` Section 13 and `06-Build-MVP.md` Section 32): required fields, email format, valid dates/times, sensible price/rating ranges, and clear inline messaging.

**Backend/database-level validation** — the authoritative layer: database constraints (`NOT NULL`, foreign keys, check constraints on status/rating ranges where applicable) and RLS-enforced permission checks (e.g., a user cannot submit a booking status update or review outside of their own authorized scope, regardless of what a manipulated request contains).

**Fields specifically validated at both levels:** required fields generally, email format, dates, times, prices, ratings, booking/job status transitions (Section 15), and user permissions for any write operation.

---

## 35. Environment Variables

All configuration values are managed through environment variables rather than hard-coded values:

* The frontend uses only the **public** Supabase configuration (project URL and anon/public API key), both safe for client-side exposure by design.
* The Supabase **service-role key** and any other elevated-privilege credential is used only in trusted server-side contexts (if/where needed for administrative or scheduled operations), and is **never** included in any frontend-reachable code, bundle, or repository file.
* A `.gitignore` entry excludes `.env` and any other local secret/configuration file from version control, so no secret value is ever committed to GitHub.
* Deployment environment variables (Section 38) are configured directly in the hosting platform's environment settings rather than committed as files.

---

## 36. Testing Requirements

The following areas are tested before the full-stack integration is considered complete:

**Authentication** — registration, login, Google Login, logout, and confirming that unauthorized access attempts are correctly blocked.

**Customer** — search, provider profile viewing, booking creation, booking status tracking, and review submission, each verified against real data.

**Worker** — profile management, job request receipt, accept/reject actions, job completion flow, and earnings visibility, each verified against real data.

**Admin** — login, user management, worker management, category/service management, booking management, and commission/payment record visibility.

**Database** — CRUD correctness for each entity, relationship integrity (foreign keys behaving as expected), RLS policy correctness (verifying a user genuinely cannot read/write data outside their permitted scope, including via direct API/URL manipulation attempts), and permission boundaries across all three roles.

Testing is performed manually across the core flows at minimum, with particular attention to the RLS and role-boundary tests, since these are the primary real security mechanism in the application.

---

## 37. Full-Stack Acceptance Criteria

**Customer**
* Can create an account.
* Can log in.
* Can use Google Login.
* Can browse real categories/services.
* Can find real database-backed providers.
* Can view a real provider profile.
* Can create a real booking.
* Can track real booking status.
* Can complete the customer journey end-to-end.
* Can leave a review after an eligible completed booking.

**Worker**
* Can create an account.
* Can log in.
* Can create/update a real profile.
* Can select real services.
* Can add real skills/experience.
* Can define real availability/service area.
* Can receive real booking requests.
* Can accept/reject real jobs.
* Can manage real job status.
* Can view real earnings/reviews.

**Admin**
* Can securely log in.
* Can manage real users.
* Can manage real workers.
* Can manage real categories/services.
* Can manage real bookings/jobs.
* Can manage real payment/commission records.
* Can manage real complaints.
* Can view real reports.

**Technical**
* Supabase Auth works correctly across all flows.
* PostgreSQL stores and retrieves data correctly.
* RLS correctly enforces role-based access at the database level.
* CRUD operations work correctly for every entity listed in Section 21.
* Storage works correctly where required (Section 25).
* Protected routes work correctly (Section 4).
* Loading/error/empty states work correctly against real data and real failure conditions.
* Responsive design continues to work across breakpoints (Section 33).
* No secrets are exposed anywhere in the codebase or repository.

---

## 38. Deployment Preparation

The application is prepared for deployment as follows:

* **GitHub** — the codebase is pushed to a GitHub repository, with `.env` and other secret files excluded via `.gitignore` (Section 35).
* **Vercel** — the Next.js application is deployed via Vercel, with the required public Supabase environment variables (project URL, anon key) configured directly in Vercel's project environment variable settings, not committed as files.
* **Supabase production project** — a dedicated Supabase project is used for production, separate from any local/development project used during earlier build phases, with the schema (Section 5), RLS policies (Section 7), and seed category/service data (Section 10) applied to it.
* The production database is confirmed to be running on real, live data — the frontend's remaining mock-data fallbacks (if any existed for local development convenience) are disabled or removed for the production build, so the deployed product never silently falls back to sample data.

---

## 39. Documentation

Project documentation is updated to explain, at a level useful to another developer picking up the project:

* The product and its purpose (summarized from `02-Solution-Product-Idea.md`)
* The architecture (Section 2)
* Authentication setup and flows (Section 3)
* The database schema and main tables (Sections 5–6)
* User roles and how they are enforced (Sections 4, 7)
* RLS policy summary (Section 7)
* CRUD operations by entity (Section 21)
* The booking flow end-to-end (Sections 14–17)
* The payment/commission data structure and its current scope (Section 19)
* Storage usage and access policies (Section 25)
* Required environment variables (names/purpose only — Section 35)
* Local development setup instructions
* Deployment instructions (Section 38)
* Testing approach (Section 36)

No actual secret values (API keys, passwords, service-role credentials) are included anywhere in this documentation — only variable names and their purpose, consistent with Section 35.

---

## 40. Final Full-Stack Product Flow

With full-stack integration complete, SkillLink supports the following real, end-to-end flow:

**Customer:**
Register/Login → Browse Category → Select Service → Find Provider → View Provider → Request/Book → Booking Created → Worker Receives Request → Worker Accepts → Job Starts → Job Completed → Payment/Commission Record Created → Customer Review

**Concurrently, Admin:**
Login → Monitor Users → Manage Services → Monitor Bookings → Manage Payments/Commission → Handle Complaints → View Reports

Every step in both flows now operates against the real Supabase-backed database described in this document, replacing the mock/demo behavior used throughout Assignments 06–07, while preserving the visual design, interaction patterns, and performance priorities established in Assignment 05.

---

## Summary

This document specifies the conversion of the SkillLink frontend MVP into a complete, real full-stack application built on Supabase, PostgreSQL, and Vercel. It defines the database schema and relationships, the Row Level Security model that serves as the platform's actual security boundary, real authentication and role-based access, and the full set of CRUD operations, booking lifecycle rules, messaging, notifications, complaints, and payment/commission record-keeping needed to support the core marketplace loop on live data.

Throughout, the specification preserves the product concept defined in Assignments 01–02, the requirements defined in `03-PRD.md`, the MVP scope defined in `04-MVP-Technical-Specification.md`, and the visual/interaction design defined in `05-UI-UX-Design-System.md` — this assignment changes *where the data comes from and how it is secured*, not *what SkillLink is or how it looks*.

**Design philosophy maintained throughout:** Fast + Professional + Beautiful + Lightweight + Responsive + Interactive
**Priority order maintained throughout:** Performance First → Usability Second → Beauty/Animation Third
