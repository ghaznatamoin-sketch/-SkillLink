# SkillLink — Build MVP: Development Plan & Implementation Specification

**Document Type:** Build MVP Development Plan & Implementation Specification
**Product Name:** SkillLink
**Version:** 1.0 (Assignment 06)
**Based On:** 03-PRD.md, 04-MVP-Technical-Specification.md, 05-UI-UX-Design-System.md

---

## 1. Assignment Objective

The objective of this assignment is to build the **frontend MVP** of SkillLink, translating the requirements defined in `03-PRD.md`, the scope defined in `04-MVP-Technical-Specification.md`, and the visual system defined in `05-UI-UX-Design-System.md` into a working, navigable frontend application.

At this stage, the focus is on:

* UI implementation
* UX flow and navigation
* Reusable components
* Forms and interactions
* Responsive design
* Loading, error, and empty states
* The core MVP user flows for all three roles

The frontend MVP demonstrates the complete conceptual user experience of SkillLink. It is **not** yet treated as the final full-stack product. Real backend, database, and authentication integration (Supabase) is explicitly deferred to a later full-stack assignment, consistent with the phased plan set out in `04-MVP-Technical-Specification.md`.

---

## 2. Development Approach

The frontend MVP is built using:

* **Next.js** — application framework and routing
* **React** — component-based UI
* **TypeScript** — type safety across components, props, and mock data structures
* **Tailwind CSS** — utility-based styling aligned with the design tokens in `05-UI-UX-Design-System.md`
* **Framer Motion** — used selectively for the light animation rules defined in Section 24
* **Three.js / React Three Fiber** — used only where genuinely valuable, per Section 25

The implementation follows a component-driven approach: the interface is assembled from small, reusable, well-named components rather than a small number of large, monolithic pages. No single component or page file should attempt to hold the full logic and markup for an entire dashboard or flow — each major UI region (navbar, category grid, provider card, booking form, dashboard widget, etc.) is its own component, composed together at the page level.

---

## 3. MVP Frontend Scope

The frontend MVP covers the full conceptual experience for all three SkillLink roles:

1. **Customer** — discovery, booking, tracking, and reviewing.
2. **Worker / Service Professional** — profile setup, request handling, job management, and earnings visibility.
3. **Owner / Admin** — platform oversight across users, categories, bookings, and reporting.

The frontend must allow a user to navigate the complete core journey end-to-end using sample data, even though no real backend is connected yet:

**Find Service → Find Provider → View Provider → Request/Book → Manage Job → Complete → Review**

Every screen described in this document exists to support this journey or the supporting role-based dashboards around it.

---

## 4. Landing Page

The landing page is the primary public entry point and includes:

* A responsive navbar with the SkillLink logo/brand
* A hero section communicating the product's purpose immediately ("Find the right professional for the service you need")
* A main service search component, allowing an immediate entry into discovery
* Clear call-to-action buttons (e.g., "Find a Professional," "Become a Worker")
* A popular service categories section (a curated subset of the full category grid)
* A "How SkillLink Works" section outlining the core journey in a few simple steps
* A featured provider section using sample provider cards
* A benefits/trust section summarizing why SkillLink is useful
* A final call-to-action section
* A footer with secondary navigation and reserved (unlinked) social icons

Consistent with `05-UI-UX-Design-System.md`, the hero section is kept compact and purposeful rather than large and empty, and the page avoids excessive animation, heavy 3D, or excessive glow effects.

---

## 5. Service Categories

The frontend implements every category and individual service as its own separate, clickable card/button, matching the full list defined in `02-Solution-Product-Idea.md`, `03-PRD.md`, and `05-UI-UX-Design-System.md`:

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

Every category and every individual service has a clear, functioning interactive path into the discovery flow — no category or service is a visual dead end.

---

## 6. Category Interaction

The frontend implements the following interaction chain:

**Category → Services → Providers**

Clicking a category card navigates to a services view listing the individual services within that category.

**Service → Available Providers**

Clicking an individual service navigates to the provider results page (Section 7), pre-filtered to that service.

**Provider Card → Provider Profile → Request/Book**

Clicking a provider card opens the full provider profile (Section 9), from which the customer can initiate a request/booking (Section 14).

All content shown at this stage uses realistic, clearly-labeled frontend sample data (Section 30). The code is structured so that this sample data can later be replaced by real database queries without restructuring the components themselves — components accept data as typed props/structures rather than embedding sample content directly inside rendering logic.

---

## 7. Provider Search Page

The provider search/results page includes:

* A search bar for keyword search
* Filters for: Category, Service, Location, Country, City, Service area, Availability, Price, Rating, Experience
* A responsive results grid of provider cards (Section 8)

**Responsive behavior:**
* **Desktop:** filters appear in a persistent sidebar or filter bar alongside the results grid.
* **Mobile:** filters are accessed through a "Filters" button that opens a drawer/bottom sheet, keeping the results view clean by default.

Applied filters are shown as removable chips above the results, and a visible result count gives immediate feedback, consistent with Section 22 of `05-UI-UX-Design-System.md`.

---

## 8. Provider Cards

A single, reusable **ProviderCard** component is used everywhere a provider is summarized (search results, featured section, related providers, etc.). Each card displays:

* Profile image (or placeholder avatar)
* Name
* Professional title
* Main service
* Skills (short tag list)
* Experience (years)
* Rating and review count
* Service area
* Availability indicator
* Price information (starting/estimated)
* Verification indicator, where applicable
* "View Profile" action
* "Request/Book" action

Sample provider data used in the frontend MVP is clearly fictional and is never presented as real individuals; this is documented explicitly alongside the sample data source (Section 30).

---

## 9. Provider Profile

The full provider profile page includes:

* Profile image, name, professional title, and verification badge (where applicable)
* About/bio section
* Skills
* Experience
* Services offered
* Service areas
* Availability
* Pricing/service information
* Ratings summary
* Reviews list (Section 16)
* Request/Book action, kept visually prominent and easy to locate throughout the page (e.g., present near the top and repeated near the bottom on longer profiles)

---

## 10. Authentication UI

The frontend implements the full authentication interface, including:

* Login page
* Registration page, with role selection (Customer / Worker) presented clearly before account creation
* Google Login button (UI only at this stage)
* Email/password form, with standard field validation
* Forgot password UI (request form and a confirmation state)
* Logout UI (accessible from the authenticated user/account menu)

At this stage, authentication behavior is frontend/demo-only: form submissions simulate success/failure states using local/mock logic rather than a real authentication service, and no real credentials are hard-coded anywhere in the project. Real Supabase authentication is explicitly deferred to the later full-stack assignment (referenced in this document as Assignment 8).

---

## 11. Customer Dashboard

The customer dashboard UI includes the following sections, each built as its own route/view within a shared dashboard layout:

* Overview (summary widgets: active bookings, pending requests, recent activity)
* Profile
* Search services
* Provider results
* Requests
* Active bookings
* Booking details
* Booking history
* Messages
* Notifications
* Reviews
* Payments placeholder (a clearly labeled "coming soon" or sample-only view, since real payments are out of MVP scope per `04-MVP-Technical-Specification.md`)
* Settings

Each section is populated with realistic sample data and representative UI states (populated, loading, empty) rather than a single static "happy path" view, so the interface can be evaluated under multiple realistic conditions.

---

## 12. Worker Dashboard

The worker dashboard UI includes:

* Overview
* Profile
* Services
* Skills
* Experience
* Service area
* Availability
* Pricing
* Job requests (visually prominent, with clear Accept/Reject actions)
* Active jobs
* Completed jobs
* Earnings
* Reviews
* Messages
* Notifications
* Settings

The dashboard is structured so a worker can visually distinguish, at a glance, between new requests, accepted jobs, active jobs, completed jobs, and earnings — using distinct sections and status indicators (Section 15) rather than a single undifferentiated list. Sample data is used throughout, matching the scope defined in Section 30.

---

## 13. Admin Dashboard

The admin dashboard UI includes:

* Dashboard overview
* Customers
* Workers
* Categories
* Services
* Bookings
* Jobs
* Payments
* Commissions
* Revenue
* Complaints
* Reviews
* Reports
* Analytics
* Settings

Data-heavy views (Customers, Workers, Bookings) use table components with sorting, filtering, and pagination affordances (implemented at the UI level against sample data). Charts on the Overview/Analytics views represent meaningful sample metrics (e.g., bookings by category, bookings over time) rather than arbitrary decorative visuals, consistent with Section 20 of `05-UI-UX-Design-System.md`.

---

## 14. Booking UI

The frontend implements a complete booking/request flow, including the following fields and steps:

* Selected service (display, read-only confirmation)
* Provider (display, read-only confirmation)
* Date
* Time
* Location/service area
* Service details (free text)
* Notes (optional)
* Price (estimated, based on sample provider pricing)
* Confirmation screen summarizing all entered details

After submission, the UI shows a clear booking confirmation state, including the initial job status (e.g., "Requested — awaiting provider response"). This flow is implemented entirely at the UI/state level in this assignment; real persistence to a database is deferred to the full-stack assignment.

---

## 15. Job Status UI

The frontend implements a shared **StatusBadge** component and, where relevant, a **BookingTimeline** component to represent job progression through the following states:

* Pending
* Accepted
* Rejected
* Confirmed
* In Progress
* Completed
* Cancelled

Each status is represented with a distinct color, icon, and text label together — never color alone — matching the accessibility and status rules defined in `05-UI-UX-Design-System.md` (Sections 24 and 31).

---

## 16. Reviews & Ratings

The frontend implements:

* A reusable **StarRating** component (display and, where needed, input mode)
* A **ReviewCard** component (reviewer info, date, rating, text, optional provider response)
* A **ReviewForm** component (for submitting a rating/review after a completed booking)
* A **RatingSummary** component (aggregated score and review count)
* A **ReviewList** component (paginated/scrollable list of reviews)

Sample review data is used throughout the frontend MVP, clearly separated from real user-generated content, consistent with Section 30.

---

## 17. Messages & Notifications

**Messages** are implemented as a lightweight UI including:
* A conversation list (tied conceptually to bookings)
* A chat window with distinct styling for each participant's messages
* A message input and send button
* A read/unread indicator on the conversation list

**Notifications** are implemented as:
* A notification list
* Read/unread state indication
* Timestamps
* An action link that navigates to the relevant booking, message, or profile section

Both features are deliberately kept simple at this stage, consistent with the MVP scope boundary defined in `04-MVP-Technical-Specification.md`, which defers real-time messaging infrastructure to a later phase.

---

## 18. Loading States

The frontend implements a shared set of reusable loading components:

* Skeleton cards (matching the shape of category, provider, and dashboard-widget content)
* Button loading state (inline spinner, fixed button size)
* Page-level loading indicator
* Dashboard loading (skeleton widgets)
* Search loading (overlay/inline indicator on the results area)
* Booking loading (during submission, preventing duplicate submits)

All loading animations are short and lightweight, consistent with the animation rules in Section 24 and `05-UI-UX-Design-System.md` Section 27.

---

## 19. Empty States

A shared, reusable **EmptyState** component is used consistently across the application, configured per context for:

* No providers found
* No bookings
* No requests
* No messages
* No notifications
* No reviews
* No search results

Each instance includes a short explanatory message and, where relevant, a clear next-action button (e.g., "Browse Services," "Clear Filters"), consistent with Section 28 of `05-UI-UX-Design-System.md`.

---

## 20. Error States

A shared, reusable **ErrorState** (and inline error messaging pattern) is used for:

* Login failure
* Invalid form input
* Search failure
* Booking failure
* Simulated network error
* Unauthorized page access
* Missing required data

All error messages are written in plain, human-readable language; no raw technical error output, stack traces, or console-style messages are ever shown directly to the user.

---

## 21. Design System Implementation

The frontend implements a shared component library covering:

Buttons, Inputs, Selects, Cards, Category Cards, Provider Cards, Badges, Avatars, Rating components, Modals, Drawers, Tabs, Tables, Alerts, Toasts, Skeletons, Empty states, Error states, and Dashboard widgets — matching the component inventory defined in Section 32 of `05-UI-UX-Design-System.md`.

Each component is built once, styled using shared design tokens (Section 22), and reused across every page and dashboard that needs it, ensuring visual and behavioral consistency throughout the application.

---

## 22. Visual Theme

The frontend implements the visual system defined in `05-UI-UX-Design-System.md`, using:

* Deep emerald/dark green as the primary brand color
* Soft mint as a light accent
* White as the primary background/surface tone
* Charcoal/dark neutral for text and select dark UI areas
* Subtle gold accents for premium highlights (e.g., verification badges)
* Light glassmorphism on select surfaces (category/provider cards, dashboard widgets, modals, select navigation elements)

The design remains professional and premium throughout, and explicitly avoids excessive neon or oversaturated color use, in line with Sections 2–3 of `05-UI-UX-Design-System.md`.

---

## 23. Hover & Interaction Effects

The frontend implements subtle interaction effects, including:

* Card hover (elevation and glow)
* Button hover/press feedback
* Border/glow color shifts on interactive elements
* A gentle mouse-direction-responsive glow on category cards (desktop only)

Category cards use subtle, low-saturation accent colors as illustrative examples (e.g., Plumber → cyan, Electrician → warm yellow, Computer Repair → purple, Gardener → green, Cleaning → soft blue), always layered lightly over the primary green-and-neutral brand system rather than replacing it, consistent with Section 5 of `05-UI-UX-Design-System.md`.

---

## 24. Animation Rules

The frontend uses:

* Short, smooth hover transitions (roughly 150–250ms)
* Small entrance animations for cards/sections as they appear
* Lightweight page/section transitions used sparingly
* Subtle interactive feedback on buttons and cards

The frontend avoids heavy animation libraries for simple effects, constant/looping background motion, excessive glow, large particle systems, long transitions, and animating every element on a page. Animation is applied selectively, only where it improves clarity or feedback, keeping the application fast at all times.

---

## 25. 3D Rules

Three.js / React Three Fiber is used, at most, for a single small, meaningful visual element — such as a lightweight interactive hero visual or a simple service-network visualization on the landing page. It is not used in dashboards, forms, tables, or any data-dense page. If, during implementation, a proposed 3D element does not add clear value relative to its performance cost, it is omitted rather than included for decoration, consistent with Section 7 of `05-UI-UX-Design-System.md`.

---

## 26. Responsive Design

The application is implemented to work correctly on desktop, laptop, tablet, and mobile breakpoints, ensuring:

* No horizontal overflow at the page level
* Touch-friendly controls and tap target sizing
* Responsive navigation (full navbar on desktop, drawer/menu on mobile)
* Responsive card grids (column count adjusting by breakpoint, per Section 4 of `05-UI-UX-Design-System.md`)
* Responsive dashboard layouts (sidebar on desktop, stacked/bottom-nav on mobile)
* Mobile-friendly, vertically stacked forms
* Readable typography and consistent spacing at every breakpoint

---

## 27. Performance Requirements

Performance is treated as the top priority throughout implementation, following:

**Performance first → Usability second → Beauty/Animation third**

This is achieved through:

* Optimized image usage (appropriate formats/sizes)
* Lazy loading for below-the-fold or non-critical content where appropriate
* Reusable components to minimize duplicated rendering logic
* Efficient rendering practices (avoiding unnecessary state updates and re-renders)
* Minimal, justified use of third-party dependencies
* Lightweight animations only (Section 24)
* Avoidance of heavy visual effects that are not functionally necessary

No visual or animation feature is retained if it noticeably degrades load time or interaction responsiveness.

---

## 28. Accessibility

The frontend implements:

* Semantic HTML structure throughout
* Properly associated labels for all form inputs
* Full keyboard navigation support
* Visible focus states on all interactive elements
* Accessible, real interactive elements for all buttons/actions (not non-semantic clickable `div`s)
* Sufficient color contrast across text and UI elements
* Alt text for meaningful images
* Status indicators that never rely on color alone (paired with text/icons), consistent with Section 31 of `05-UI-UX-Design-System.md`

---

## 29. Project Structure

A clean, maintainable Next.js project structure is used:

* **`app/`** — route-level pages and layouts (public pages, customer/worker/admin dashboard routes), following Next.js routing conventions.
* **`components/`** — shared, reusable UI components (buttons, cards, badges, modals, etc.) with no business logic specific to a single feature.
* **`features/`** — feature-specific logic and composed components (e.g., booking flow, provider search, dashboard widgets) that combine shared components with feature-specific behavior.
* **`hooks/`** — reusable custom React hooks (e.g., form handling helpers, responsive breakpoint detection, mock data fetching hooks).
* **`lib/`** — shared utility functions and helpers (formatting, validation helpers, constants).
* **`services/`** — the data-access layer; in this assignment, functions here return mock/sample data, structured so they can later be swapped for real Supabase calls without changing the components that consume them.
* **`types/`** — shared TypeScript types/interfaces for core entities (User, Provider, Booking, Review, etc.), matching the conceptual data model in `03-PRD.md` and `04-MVP-Technical-Specification.md`.
* **`public/`** — static assets (icons, sample images, favicon).
* **`styles/`** — global styles and Tailwind configuration/theme tokens matching `05-UI-UX-Design-System.md`.

This structure keeps UI, feature logic, data access, and types clearly separated, so replacing the mock data layer with real Supabase integration in the next assignment requires changes primarily within `services/`, not across the entire codebase.

---

## 30. Frontend Data Strategy

The frontend MVP uses clearly separated mock/sample data for all UI demonstration purposes.

**Rules followed throughout the project:**
* Mock data is kept in a dedicated location (e.g., within `services/` or a clearly labeled `mock-data` module) and is never presented to the user as real, verified data.
* Sample providers, customers, bookings, and reviews are clearly fictional; no real individuals, companies, or verified statistics are used or implied.
* The data-access layer (`services/`) is structured with function signatures and return shapes that mirror what real Supabase queries will eventually return, so the transition to real data in the next assignment is a substitution, not a redesign.
* No hard-coded sensitive information is included anywhere in the project — no real passwords, no real API keys or secrets, and no `.env` values committed to the repository.

---

## 31. Navigation Requirements

Every major page in the application is reachable through working navigation, with no isolated dead-end pages. This includes: Home, Categories, Services, Provider search, Provider profile, Login, Registration, Customer dashboard, Worker dashboard, Admin dashboard, Booking, Messages, Notifications, and Settings.

Navigation paths are verified in both directions where relevant (e.g., a user can navigate from a booking confirmation back to their dashboard, not only forward through the flow), and role-specific navigation only exposes the dashboard areas relevant to the signed-in role, per Section 14 of `05-UI-UX-Design-System.md`.

---

## 32. Forms & Validation

All frontend forms (registration, login, profile editing, booking, reviews, admin management forms) include:

* Clearly marked required fields
* Clear, descriptive labels
* Helpful placeholder text (never used as a substitute for a label)
* Inline validation messages explaining what needs correction
* A disabled submit state when required fields are incomplete or invalid
* A loading state during submission
* A clear success state after submission
* A clear error state if submission fails

Forms do not silently accept obviously invalid values (e.g., empty required fields, malformed email addresses); validation feedback is immediate and specific wherever practical.

---

## 33. Frontend MVP Acceptance Checklist

**Navigation**
- [ ] Main navigation works
- [ ] Mobile navigation works
- [ ] All important pages are connected

**Customer**
- [ ] Can browse categories
- [ ] Can select services
- [ ] Can see provider results
- [ ] Can open provider profile
- [ ] Can open booking form
- [ ] Can see booking status
- [ ] Can see reviews

**Worker**
- [ ] Can view worker dashboard
- [ ] Can view/edit profile UI
- [ ] Can view services
- [ ] Can view job requests
- [ ] Can view active jobs
- [ ] Can view completed jobs
- [ ] Can view earnings

**Admin**
- [ ] Can view admin dashboard
- [ ] Can view customers
- [ ] Can view workers
- [ ] Can view categories/services
- [ ] Can view bookings/jobs
- [ ] Can view payments/commissions
- [ ] Can view reports

**UI/UX**
- [ ] Responsive
- [ ] Fast
- [ ] Professional
- [ ] Lightweight animation
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Accessible forms

---

## 34. Build Quality Rules

The implementation follows these quality standards throughout:

* Clean, readable code with consistent formatting and conventions
* Reusable components used wherever a UI pattern repeats
* No unnecessary duplication of markup, styles, or logic
* Meaningful, descriptive naming for components, functions, and variables
* Components kept to a manageable size and responsibility (no single component handling an entire dashboard's logic)
* No hard-coded secrets or credentials anywhere in the codebase
* No claims, labels, or messaging implying a real backend/database is connected at this stage
* No unnecessary third-party dependencies added without clear justification
* Performance treated as a first-class concern in every implementation decision
* Visual and interaction consistency maintained across the entire application, per the design system in `05-UI-UX-Design-System.md`

---

## 35. Deliverables

Completing this assignment produces:

1. A working frontend MVP application
2. A fully responsive UI across desktop, tablet, and mobile
3. Working navigation across all major pages and dashboards
4. A library of reusable components (Section 21)
5. A complete core customer flow (discovery → booking → tracking → review)
6. A complete core worker flow (profile setup → job requests → job management → earnings)
7. A complete core admin UI (users, categories, bookings, reports)
8. Functional forms and interactions with validation (Section 32)
9. Implemented loading states (Section 18)
10. Implemented error states (Section 20)
11. Implemented empty states (Section 19)
12. Clearly separated frontend sample data (Section 30)
13. A clean, documented project structure (Section 29)
14. A short written summary of implemented features, mapped back to this specification
15. Screenshots demonstrating the working MVP across key screens and breakpoints

---

## Final Notes

This document defines the specification for building SkillLink's frontend MVP. It intentionally does not include application code, Supabase integration, real authentication, or SQL — these are explicitly reserved for the next, full-stack assignment referenced throughout this document as Assignment 8, which will connect the frontend built here to a real database, authentication system, and CRUD operations.

**Final design philosophy for this build phase:**

**Fast + Beautiful + Professional + Lightweight + Responsive + Interactive**
