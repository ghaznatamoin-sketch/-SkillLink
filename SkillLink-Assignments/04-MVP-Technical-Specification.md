# SkillLink — MVP Planning & Technical Specification

**Document Type:** MVP Planning & Technical Specification
**Product Name:** SkillLink
**Version:** 1.0 (Assignment 04)
**Based On:** 01-Problem-Discovery.md, 02-Solution-Product-Idea.md, 03-PRD.md

---

## 1. MVP Definition

**What MVP Means for SkillLink**
The Minimum Viable Product (MVP) for SkillLink is the smallest, functionally complete version of the platform that allows a customer to find and request a service provider, and allows a worker to receive and manage that request, without including every feature described in the full PRD. It is "minimum" in scope but not in quality — the MVP must still be reliable, usable, and professional.

**Purpose of the MVP**
The purpose of the MVP is to prove that the core marketplace mechanism works end-to-end: a customer can discover a relevant provider and submit a request, and a worker can receive, act on, and complete that request. The MVP validates the central product concept before investing in secondary features such as advanced analytics, messaging, or AI-based matching.

**The Core Problem the MVP Must Solve**
As defined in Assignment 01, the core problem is that customers struggle to efficiently find reliable, available service providers, while workers struggle to reach customers. The MVP must directly address this by making discovery and request/booking simple, structured, and functional — even in its most basic form.

**What the First Usable Version Must Accomplish**
The first usable version of SkillLink must allow a real end-to-end journey to be completed by all three roles:

* A **customer** can register, browse categories and services, find providers, view a provider's profile, and submit a request/booking.
* A **worker** can register, create a profile, list services offered, and receive, accept/reject, and manage a job request through to completion.
* An **admin** can log in securely and perform the minimum management actions needed to keep the marketplace functional (manage categories/services, manage users, and view bookings).

The MVP must focus on the core marketplace journey:

**Find Service → Find Provider → Request/Book → Manage Job → Complete Service → Review**

The MVP must remain realistic and buildable within a student/final-project scope. It should not attempt to include every feature listed in the full PRD (Assignment 03); non-essential features are deferred to later phases, as outlined in Section 3.

---

## 2. MVP Goal

**Main Goal:**
A customer should be able to find a relevant service provider and request/book a service, and a worker should be able to receive that request, respond to it, and complete the job — with both sides able to see the outcome (status update and review) once the service is finished.

More specifically, the MVP goal can be broken into three linked outcomes:

1. **Customer outcome:** A customer can go from "I need a service" to "I have requested a specific provider" in a small number of clear steps.
2. **Worker outcome:** A worker can go from "I offer a service" to "I have an active job with a real customer" through a simple profile and request-management flow.
3. **Admin outcome:** The platform owner can maintain the categories, services, and users that make the above two outcomes possible, and has basic visibility into bookings taking place on the platform.

Success is not measured by the number of features included, but by whether this core loop — **discover, request, manage, complete, review** — works reliably for all three roles.

---

## 3. MVP Scope

### 3.1 In Scope (Included in MVP)

**Customer**
* Registration and login (email/password; Google Login if feasible within project time)
* Basic customer profile (name, contact info, location)
* Browse categories and services
* View list of available providers for a selected service
* View a provider's profile (skills, experience, service area, availability, pricing, ratings)
* Submit a service request/booking to a provider
* Track booking/job status (e.g., Requested, Accepted, In Progress, Completed)
* View booking history
* Submit a rating/review after a completed service

**Worker**
* Registration and login (email/password; Google Login if feasible within project time)
* Worker profile creation (skills, experience, service area, availability, pricing)
* Selection of one or more services offered, from the defined category/service list
* Receive job requests
* Accept or reject requests
* Update job status through to completion
* View basic earnings summary (based on recorded job pricing)
* View ratings/reviews received

**Admin**
* Secure admin login
* Manage categories and services (create/update/deactivate)
* Manage users (view customers and workers; activate/deactivate accounts)
* View bookings/jobs at a platform level
* Basic worker verification flag (verified/unverified)

**Cross-Cutting**
* Role-based access control for Customer, Worker, and Admin
* Basic notification of key events (e.g., new request received, request accepted) — minimum viable form (in-app notification list is acceptable; real-time push is not required for MVP)
* Core error, loading, and empty states as defined in the PRD (Section 18 of 03-PRD.md)

### 3.2 Out of Scope (Deferred Beyond MVP)

The following are explicitly deferred to future phases and are not required for the MVP to be considered complete:

* In-app real-time chat/messaging (a simple contact/notes field may substitute where communication is essential)
* In-app payment processing/integration (payment amount may be recorded manually or marked "completed" without a live payment gateway)
* Advanced search filters beyond category, service, location, and basic availability
* Smart/AI-based provider matching or recommendations
* Advanced analytics and reporting dashboards for admin
* Multi-currency conversion and automated currency detection
* Advanced maps/geolocation visualizations
* Dispute/complaint workflow automation (basic complaint recording may exist, but full workflow tooling is deferred)
* Multiple worker tiers, loyalty programs, or promotional systems
* Push notifications and email notification automation beyond basic in-app alerts

This scope boundary is intended to keep the MVP realistic and buildable, consistent with Section 20 of 03-PRD.md.

---

## 4. MVP User Stories

Written in the standard "As a [role], I want to [action], so that [benefit]" format, grouped by role.

### Customer User Stories
* As a customer, I want to register and log in, so that I can access the platform securely.
* As a customer, I want to browse service categories, so that I can find the type of help I need.
* As a customer, I want to view available providers for a service, so that I can compare my options.
* As a customer, I want to view a provider's profile and ratings, so that I can judge whether they are suitable.
* As a customer, I want to submit a request/booking to a provider, so that I can get the service I need.
* As a customer, I want to track the status of my request, so that I know what is happening with my booking.
* As a customer, I want to view my booking history, so that I can refer back to past services.
* As a customer, I want to leave a rating/review after a completed service, so that I can share my experience and help other customers.

### Worker User Stories
* As a worker, I want to register and log in, so that I can offer my services on the platform.
* As a worker, I want to create a profile with my skills, experience, and pricing, so that customers can evaluate me.
* As a worker, I want to select the services I provide, so that I appear in relevant searches.
* As a worker, I want to set my service area and availability, so that I only receive relevant requests.
* As a worker, I want to receive job requests, so that I can find new customers.
* As a worker, I want to accept or reject a request, so that I only take on jobs I can complete.
* As a worker, I want to update the status of a job, so that the customer knows its progress.
* As a worker, I want to view my earnings and reviews, so that I can track my performance on the platform.

### Admin User Stories
* As an admin, I want to log in securely, so that I can access platform management tools.
* As an admin, I want to manage categories and services, so that the marketplace stays organized and accurate.
* As an admin, I want to view and manage user accounts, so that I can maintain platform quality.
* As an admin, I want to verify workers, so that customers can trust the providers on the platform.
* As an admin, I want to view bookings at a platform level, so that I understand overall marketplace activity.

---

## 5. MVP Screens

Only the screens required to support the MVP scope (Section 3.1) are listed here. Additional screens from the full PRD (03-PRD.md, Section 12) are deferred until later phases.

### Public
* Landing/Home
* Categories
* Services (within a category)
* Provider Search / Provider List
* Provider Profile
* Login
* Registration (with role selection: Customer or Worker)

### Customer Area
* Dashboard Home
* Profile
* Browse Services
* Providers List
* Booking Request Form
* Booking Details / Status
* Booking History
* Leave a Review

### Worker Area
* Dashboard Home
* Profile Setup (skills, experience, service area, availability, pricing)
* Services Selection
* Job Requests (incoming)
* Active Jobs
* Completed Jobs
* Earnings Summary
* Reviews Received

### Admin Area
* Admin Login
* Admin Dashboard
* Manage Categories/Services
* Manage Users (Customers/Workers)
* Worker Verification
* Bookings Overview

---

## 6. MVP Core User Flows

### Customer Flow (MVP)
Register/Login → Browse Categories → Select Service → View Providers → Open Provider Profile → Submit Request/Booking → Track Status → Service Completed → Leave Review

### Worker Flow (MVP)
Register/Login → Create Profile → Select Services → Set Service Area/Availability/Pricing → Receive Request → Accept/Reject → Update Job Status → Mark Complete → View Earnings/Reviews

### Admin Flow (MVP)
Admin Login → Dashboard → Manage Categories/Services → Manage Users → Verify Workers → View Bookings Overview

These flows are simplified versions of the flows defined in Section 7 of 03-PRD.md, scoped specifically to what the MVP must deliver.

---

## 7. MVP Data Model Overview

This section describes, at a conceptual level, the minimum data entities required to support the MVP scope. No SQL or schema implementation is included; this is a planning-level description to guide later technical design.

| Entity | Purpose in MVP |
|---|---|
| **Users** | Core account record shared by customers, workers, and admins (name, email, auth reference, role). |
| **Customer Profiles** | Additional customer-specific details (contact info, location), linked to a User. |
| **Worker Profiles** | Additional worker-specific details (skills, experience, service area, availability, pricing, verification status), linked to a User. |
| **Categories** | Top-level service groupings (e.g., Home & Repair). |
| **Services** | Individual services within a category (e.g., Plumber), linked to a Category. |
| **Worker Services** | Links a Worker Profile to the specific Services they offer, with pricing. |
| **Bookings** | A customer's request to a specific worker for a specific service; the central record of the MVP flow. |
| **Job Status** | Status value(s) tracked on a Booking (Requested, Accepted, Rejected, In Progress, Completed, Cancelled). |
| **Reviews** | Customer feedback linked to a completed Booking/Worker. |
| **Ratings** | Numerical score attached to a Review, aggregated on the Worker Profile. |
| **Notifications** | Minimal in-app alerts tied to key Booking events. |

This model is intentionally a subset of the full data model described in Section 13 of 03-PRD.md — entities such as Messages, Payments, Commissions, and Complaints are acknowledged in the full PRD but are not required for the MVP's core loop, and can be layered on afterward without restructuring the core entities above.

---

## 8. MVP Technology Stack

Consistent with Section 14 of 03-PRD.md, the MVP will use:

**Frontend:** Next.js, React, TypeScript, Tailwind CSS (Framer Motion used sparingly for light transitions; Three.js/React Three Fiber only if time allows and only for a single, non-essential visual enhancement such as the landing page hero).

**Backend/Database:** Supabase (PostgreSQL, Authentication, Storage where needed for profile images).

**Deployment:** GitHub for source control, Vercel for hosting.

For the MVP specifically, the emphasis is on using this stack to deliver the core data model and user flows reliably, rather than exploring its full capabilities. Optional or advanced elements of the stack (e.g., Three.js visuals, advanced Framer Motion sequences) should only be added once the core MVP flow is functionally complete.

---

## 9. MVP Non-Functional Requirements

The non-functional requirements from Section 10 of 03-PRD.md apply to the MVP, with the following MVP-specific emphasis:

* **Performance:** The MVP must load and respond quickly even with a modest dataset; heavy visual effects should not be added until core functionality is stable.
* **Responsiveness:** The MVP must be usable on both desktop and mobile screen sizes at minimum; tablet support should follow naturally from a responsive layout.
* **Security:** Authentication, role-based access, and Supabase Row Level Security must be implemented from the start of the MVP, not added later, since the data model involves multiple roles with different permissions.
* **Reliability:** Core flows (registration, booking submission, status updates) must handle errors gracefully with clear feedback, since these are the flows the MVP is evaluated on.
* **Scalability:** While the MVP itself does not need to be tested at scale, the data model and architecture should not block future scaling (e.g., hard-coding a single country or currency should be avoided even in the MVP).

---

## 10. MVP Development Phases

The MVP can be built in logical phases to manage complexity and ensure each layer is functional before the next is added.

**Phase 1 — Foundation**
* Project setup (Next.js, TypeScript, Tailwind, Supabase connection)
* Authentication (registration, login, role selection)
* Basic role-based routing and protected pages

**Phase 2 — Core Data & Public Browsing**
* Category and service data setup
* Public browsing pages (categories, services, provider list)
* Provider profile page (read-only)

**Phase 3 — Worker Profile & Listing**
* Worker profile creation and editing
* Worker service selection, pricing, service area, and availability

**Phase 4 — Booking Flow**
* Customer request/booking submission
* Worker request handling (accept/reject)
* Job status updates and tracking on both sides

**Phase 5 — Completion & Feedback**
* Marking a job complete
* Review and rating submission
* Booking history views for customer and worker

**Phase 6 — Admin Essentials**
* Admin login and protected admin area
* Category/service management
* User management and worker verification
* Bookings overview

**Phase 7 — Polish**
* Error/loading/empty states across all flows
* Responsive design refinement
* Light animation and visual polish, applied only after core flows are verified

This phased approach ensures the core marketplace loop (Find Service → Find Provider → Request/Book → Manage Job → Complete Service → Review) is functional before secondary polish or optional enhancements are pursued.

---

## 11. MVP Acceptance Criteria

The MVP will be considered complete when the following can be demonstrated:

1. A customer can register, log in, browse categories/services, and view a list of providers for a chosen service.
2. A customer can open a provider's profile and view their skills, experience, service area, availability, pricing, and ratings.
3. A customer can submit a booking request to a provider and see it appear in their booking history with a status.
4. A worker can register, log in, and create a profile with services, skills, experience, service area, availability, and pricing.
5. A worker can view and respond (accept/reject) to an incoming request.
6. A worker can update a job's status through to completion.
7. Once a job is marked complete, the customer can submit a rating/review, which becomes visible on the worker's profile.
8. An admin can log in securely, manage categories/services, view/manage users, verify a worker, and view a list of bookings on the platform.
9. All core flows display appropriate loading, empty, and error states rather than failing silently or crashing.
10. The application is usable on both desktop and mobile screen widths.

These criteria mirror the success criteria defined in Section 19 of 03-PRD.md, narrowed specifically to what the MVP must demonstrate.

---

## 12. MVP Risks & Constraints

* **Time/scope risk:** Attempting to include too many PRD features in the MVP could delay delivery of the core loop. *Mitigation:* strictly follow the in-scope/out-of-scope boundary in Section 3.
* **Data model risk:** An overly simplified data model could make it difficult to add deferred features (payments, messaging) later. *Mitigation:* the MVP data model (Section 7) is designed as a subset of the full PRD data model, not a conflicting one, so later entities can be added without major rework.
* **Role-access risk:** Incomplete role-based access control could expose worker or admin functionality to the wrong users. *Mitigation:* implement authentication and role-based routing early, in Phase 1, rather than retrofitting it later.
* **Realism risk:** Without real users, some assumptions about the booking and review flow may not match real-world behavior. *Mitigation:* treat the MVP as a first testable version to be refined based on future feedback, not a final, unchangeable design.

---

## 13. Summary

This document defines the MVP for SkillLink: a scoped-down but fully functional version of the platform that proves the core marketplace loop — **Find Service → Find Provider → Request/Book → Manage Job → Complete Service → Review** — can work for customers, workers, and admins. It builds directly on the problem defined in Assignment 01, the product idea defined in Assignment 02, and the full requirements defined in Assignment 03 (03-PRD.md), narrowing them into a realistic, buildable first version.

The MVP includes core registration, browsing, provider discovery, booking, job management, review, and minimal admin functionality, while deliberately deferring advanced features such as payments integration, real-time messaging, AI-based matching, and advanced analytics to later phases. The technology direction (Next.js, React, TypeScript, Tailwind CSS, Supabase/PostgreSQL, GitHub/Vercel) and phased development plan outlined here are intended to guide the next, more technical stages of the SkillLink project.
