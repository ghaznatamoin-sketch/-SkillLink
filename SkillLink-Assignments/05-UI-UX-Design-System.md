# SkillLink — UI/UX Design & Design System

**Document Type:** UI/UX Design & Design System
**Product Name:** SkillLink
**Version:** 1.0 (Assignment 05)
**Based On:** 01-Problem-Discovery.md, 02-Solution-Product-Idea.md, 03-PRD.md, 04-MVP-Technical-Specification.md

---

## 1. Design Goal

SkillLink must be designed as a modern, professional, premium, trustworthy, fast, responsive, user-friendly, visually attractive, and lightweight web application. It should feel like a real commercial product — comparable to established marketplace platforms — rather than a basic student or demo website.

The design priority order, applied to every decision in this document, is:

**Performance → Usability → Beauty/Animation**

Every visual choice — color, animation, glass effect, or layout — must be evaluated against this order. If a visual enhancement would meaningfully slow the interface or make it harder to use, it must be simplified or removed. The interface should be beautiful, but never at the cost of speed or clarity.

---

## 2. Overall Visual Style

SkillLink's visual language is a modern, premium style built primarily around:

* **Deep emerald / dark green** — primary brand color
* **Soft mint** — secondary/light accent
* **White** — primary background and contrast surface
* **Charcoal / dark neutral** — text and selected dark UI areas
* **Subtle gold accents** — used sparingly for premium highlights (e.g., verified badges, featured labels)

The primary brand identity remains green-focused at all times; other colors support it rather than compete with it.

**Stylistic elements used throughout the product:**
* Light glassmorphism on select surfaces (see Section 3)
* Clean, well-structured cards
* Soft, minimal shadows
* Subtle borders rather than heavy divider lines
* Generous, consistent spacing
* Modern, simple line-style icons
* Clear typographic hierarchy
* Professional, data-focused dashboard layouts

The interface should avoid becoming overly dark (no full "black mode" dominance) and avoid neon or oversaturated color use. Green, white, and neutral tones should dominate the visual field at all times, with mint, gold, and category accents used only in small, purposeful doses.

---

## 3. Glassmorphism

Glassmorphism is used selectively, not globally, to keep the interface both distinctive and fast.

**Where glassmorphism is used:**
* Category cards (subtle glass background on hover/active state)
* Provider cards (light glass surface for the card container)
* Dashboard widgets (glass panel behind key metrics)
* Select navigation elements (e.g., a translucent sticky navbar background)
* Modals (glass backdrop behind the modal content)
* Selected/active states (e.g., an active filter or active tab)

**Glass effect guidelines:**
* Background blur: light to moderate only (roughly 8–16px blur) — never so strong that content behind becomes indistinguishable or performance suffers.
* Transparency: subtle (background visible faintly through the surface, opacity generally in the 70–90% range for the glass surface itself).
* Border: a thin, semi-transparent light border (often white or mint-tinted at low opacity) to define the glass edge without a heavy outline.
* Shadow: soft and minimal — enough to lift the surface, not enough to look heavy or artificial.

**What to avoid:**
* Excessive blur that harms readability or rendering performance
* Stacking multiple overlapping glass layers on the same view
* Overly transparent surfaces that make text hard to read
* Glow effects layered on top of glass surfaces in a way that creates visual noise

The glass effect exists to add a premium, layered feel to key surfaces — it must never come at the cost of text readability or page performance.

---

## 4. Category Design

Every SkillLink service is represented as its own separate, clickable card or button — services are never merged into a single generic "services" button. Categories act as groupings; each individual service inside a category is independently selectable.

**Category Groups and Services:**

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

**Grid Layout Guidelines:**
* Mobile/small tablet: 2 columns
* Larger tablet: 2–3 columns
* Desktop/large screens: 3–4 columns

Grids should be balanced — group sizes should be arranged so the final row does not leave a single, visually isolated card where avoidable (e.g., adjusting column count or grouping small categories together). Each card should have consistent height and padding regardless of label length, using truncation or wrapping rules rather than uneven card sizes.

---

## 5. Category Hover Effects

Category cards are interactive and respond to user attention.

**On hover (desktop):**
* A subtle glow appears around or behind the card.
* The glow may shift slightly based on cursor position within the card (a gentle directional highlight, not a dramatic spotlight effect).
* The card lifts slightly (small elevation increase, e.g., a few pixels of translateY and a soft shadow increase).
* The transition is smooth and short (roughly 150–250ms), using an ease-out curve.

**On tap (mobile/touch):**
* A brief, simple press/active state (slight scale-down or elevation change) substitutes for hover, since cursor-direction glow does not apply to touch devices.

**Category Accent Colors (subtle, illustrative):**
* Plumber → subtle cyan
* Electrician → subtle warm yellow
* Computer Repair → subtle purple
* Gardener → subtle green
* Cleaning → subtle soft blue
* (Other categories may be assigned similarly subtle, low-saturation accents during implementation, keeping the palette restrained.)

These accents appear only as a faint tint in the card's glow, icon, or border — never as a dominant fill color. Green remains the primary brand color across the interface; category accents are a light layer of differentiation, not a competing palette. The result should read as "one cohesive green-branded product with subtle category cues," never a multicolored or neon interface.

---

## 6. Animation Rules

Animation is used purposefully and lightly throughout SkillLink.

**Included animation types:**
* Smooth hover transitions (color, elevation, glow)
* Small entrance animations for cards/sections as they enter the viewport (subtle fade/slide, not bouncy or elaborate)
* Subtle card movement on hover/press (see Section 5)
* Button interaction feedback (press state, loading spinner where relevant)
* Page/section transitions where they aid orientation (e.g., a brief fade between major views), used sparingly
* Simple, fast loading animations (see Section 27)

**Timing guidelines:**
* Micro-interactions (hover, press): ~150–250ms
* Entrance animations: ~200–400ms
* Avoid animations that run longer than roughly half a second for any interactive element, since longer durations begin to feel sluggish.

**What to avoid:**
* Heavy animation libraries or complex animation chains for simple effects
* Particle systems or decorative background motion
* Constant, looping background movement that never settles
* Excessive or unnecessary spinning icons
* Long, elaborate page transitions that delay content visibility
* Animating every element on a page — animation should be reserved for elements where it adds clarity or delight, not applied universally

The interface should never feel slow because of animation; if in doubt, reduce or remove the animation rather than add more.

---

## 7. 3D Design Rules

Three.js / React Three Fiber may be used only where it delivers genuine visual or UX value, and never as a default styling choice.

**Appropriate potential uses:**
* A single, lightweight interactive visual in the landing page hero section
* A subtle "service network" visualization illustrating how customers and workers connect
* One lightweight decorative 3D element used deliberately, not repeated throughout the site

**Rules:**
* 3D content is never required for core functionality — the product must work fully with 3D disabled or unsupported.
* Dashboards, forms, tables, search/filter interfaces, and cards must remain fully lightweight, 2D, and free of 3D elements.
* Any 3D element must be optimized (low polygon count, minimal texture weight) and must not block or delay the loading of surrounding content.
* Performance testing should confirm that any 3D element does not meaningfully affect page load or interaction responsiveness before it is kept in production.

---

## 8. Typography

**Primary font:** A modern, clean sans-serif typeface (e.g., a geometric or humanist sans such as Inter, or a similar highly legible web-safe alternative) used consistently across the entire interface.

**Type roles:**
* **Headings (H1–H3):** Same font family, semi-bold to bold weight (600–700), used for page titles, section titles, and card titles, with a clear size step-down from H1 to H3.
* **Body text:** Regular weight (400), sized for comfortable reading (roughly 15–16px base on desktop, scaling appropriately on mobile), with generous line-height (around 1.5–1.6) for readability.
* **Button text:** Medium to semi-bold weight (500–600), slightly letter-spaced for clarity, sized to remain legible at typical button heights.
* **Navigation text:** Medium weight (500), sized smaller than body text but still easily readable, with clear active/selected styling.
* **Labels (form labels, field labels):** Medium weight, smaller size than body text, high contrast against the input background.
* **Captions (metadata, timestamps, helper text):** Regular weight, smaller and slightly muted in color, used for secondary information only.
* **Dashboard numbers (metrics, counts):** Bold or extra-bold weight, larger size, to create clear visual emphasis for key figures (e.g., earnings totals, booking counts).

**Priorities:**
* Readability above stylistic flair — no decorative, script, or hard-to-read display fonts anywhere in the core interface.
* Accessibility — sufficient size and contrast at every text role (see Section 31).
* Clear hierarchy — a user should be able to scan a page and understand its structure from typography alone.
* Mobile readability — base sizes should never shrink below a comfortably readable minimum on small screens; headings should scale down proportionally rather than becoming cramped.

---

## 9. Color System

### Brand
* **Primary** — Deep emerald green: the core brand color, used for primary buttons, active states, key icons, and brand elements.
* **Primary Hover** — A slightly darker or richer shade of the primary green, used on hover/press states of primary elements.
* **Primary Light** — A lighter, softer green (moving toward mint), used for light backgrounds, subtle highlights, and secondary emphasis.
* **Primary Dark** — A deep, near-charcoal green, used sparingly for dark UI sections, footers, or high-contrast brand moments.

### Neutral
* **White** — Primary background for most content areas and cards.
* **Background** — A very light neutral (off-white or pale mint-tinted gray) used as the page background behind cards/sections.
* **Surface** — The color of cards, panels, and modals, typically white or a very light neutral, sometimes with the glass treatment described in Section 3.
* **Border** — A light gray/neutral tone used for subtle dividers and card outlines.
* **Text** — Charcoal/dark neutral (not pure black) used for primary body and heading text, for a softer, more premium contrast than pure black on white.
* **Muted Text** — A mid-gray tone used for secondary text, captions, and placeholder content.

### Status
* **Success** — A clear, accessible green (distinct in tone from the brand primary if needed for clarity) used for success messages, completed statuses, and positive confirmations.
* **Warning** — An amber/orange tone used for pending states, cautions, and non-critical alerts.
* **Error** — A clear red tone used for errors, failed actions, and destructive/danger elements.
* **Information** — A calm blue tone used for neutral informational messages and tips.

### Category Accents
Each category/service may carry a low-saturation accent color (see examples in Section 5), used only for: category/service card glow and border tint, small category icon coloring, and minor visual differentiation in lists or filters. Category accents are never used for primary buttons, main text, or large fill areas — they remain a light accent layer over the primary green-and-neutral system, ensuring the interface always reads as a single cohesive brand rather than a set of unrelated colors.

---

## 10. Spacing System

SkillLink uses a consistent spacing scale rather than arbitrary margin/padding values, based on a small set of standardized steps (approximate values, in a 4px-based scale):

| Token | Value | Typical Use |
|---|---|---|
| xs | 4px | Icon-to-text gaps, tight inline spacing |
| sm | 8px | Compact padding, small gaps between related elements |
| md | 16px | Standard padding inside cards, form field spacing |
| lg | 24px | Spacing between related components/widgets |
| xl | 32px | Spacing between distinct sections within a page |
| 2xl | 48px | Spacing between major page sections |
| 3xl | 64px+ | Large section breaks, hero-area spacing |

**Application guidelines:**
* Page sections: use xl–3xl between major sections (e.g., hero to categories, categories to "how it works").
* Cards: use md padding inside cards; lg–xl gaps between cards in a grid.
* Buttons: use sm–md internal padding, scaled by button size (see Section 12).
* Forms: use md spacing between fields; sm spacing between a label and its input.
* Dashboard widgets: use lg gaps between widgets; md internal padding.
* Navigation: use md–lg spacing between nav items; sm padding around interactive nav elements for touch targets.
* Mobile layouts: reduce section spacing moderately (e.g., 2xl → xl) to avoid excessive scrolling, while keeping card/form spacing consistent with desktop for readability.

---

## 11. Border Radius & Shadows

### Border Radius
| Element | Radius |
|---|---|
| Small controls (checkboxes, small badges) | 4–6px |
| Buttons | 8–10px |
| Cards | 12–16px |
| Large panels/dashboard containers | 16–20px |
| Modals | 16–20px |

Radius values stay in a moderate range across the product — rounded enough to feel modern and friendly, but not so rounded (e.g., full pill shapes everywhere) that the interface feels informal or childish. Pill-shaped radius may be reserved for specific elements like tags/badges or toggle switches.

### Shadows
* Use soft, low-opacity shadows (subtle blur, low spread) to lift cards and modals gently off the background.
* Reserve slightly stronger shadows for elevated/hovered states and modals, keeping the increase modest rather than dramatic.
* Avoid multiple stacked heavy shadows, harsh drop shadows, or shadows with high opacity, which read as dated or heavy rather than premium.

---

## 12. Buttons

**Button variants:**
* **Primary** — Filled with the brand primary green, white text; used for the single main action on a screen (e.g., "Request Service," "Confirm Booking").
* **Secondary** — Filled with a lighter/neutral surface color and primary-colored text or border; used for supporting actions alongside a primary button.
* **Outline** — Transparent background with a primary-colored border and text; used where a visible but lower-emphasis action is needed.
* **Ghost** — No border or fill, primary-colored text only, used for low-emphasis or tertiary actions (e.g., "Cancel," "Skip").
* **Danger** — Filled or outlined with the error/red status color; used for destructive actions (e.g., "Cancel Booking," "Delete Account").
* **Disabled** — Reduced opacity, muted color, no hover/press feedback, and a non-interactive cursor state.
* **Loading** — Existing button label replaced or accompanied by a small, simple spinner; button remains at the same size to avoid layout shift, and is non-interactive while loading.

**States to define for each variant:** Normal, Hover (subtle color/elevation shift), Active/Pressed (slightly deeper color or scale-down), Focus (visible outline/ring for keyboard users), Disabled, Loading.

**Touch guidelines:** All buttons must maintain a minimum comfortable tap target size on mobile (approximately 44×44px effective touch area), with adequate spacing between adjacent buttons to prevent accidental taps.

---

## 13. Form Inputs

**Input types covered:** Text input, Email, Password (with show/hide toggle), Search (with icon and clear action), Select (dropdown), Multi-select (tag-style selection), Date picker, Time picker, Textarea, File/image upload (drag-and-drop or click-to-upload with a preview), Checkbox, Radio, Toggle/switch.

**States for each applicable input:**
* **Label** — Positioned above the input, medium weight, clear and short.
* **Placeholder** — Muted text color, illustrative example text, never used as a replacement for a label.
* **Focus** — A visible border/ring color change (typically to the brand primary), ensuring clear feedback that the field is active.
* **Error** — Red border/text with a short, specific inline error message beneath the field explaining what needs to be corrected.
* **Disabled** — Muted background and text, non-interactive appearance.
* **Success/Validation** — A subtle success indicator (e.g., a green check icon) for fields that have been validated correctly, used selectively (e.g., password strength, availability checks) rather than on every field.

**General form guidance:**
* Group related fields together with clear section spacing (see Section 10).
* Keep forms as short as possible for each step; long forms (e.g., worker profile setup) should be broken into logical steps rather than one long page.
* Use inline validation where practical, so users learn about an error before submitting the whole form.
* Ensure every input has a properly associated label for accessibility (see Section 31).

---

## 14. Navigation Design

**Primary navigation bar (public/unauthenticated):**
* SkillLink logo (left-aligned)
* Home
* Services/Categories
* Find a Professional
* How It Works
* About
* Contact
* Login/Register (right-aligned, typically styled as a primary or outline button)

**Behavior:**
* The navbar may use a light glass/translucent background when scrolled, per Section 3, while remaining fully readable.
* Active/current page is indicated with a clear but subtle style (e.g., underline or color change), not relying on color alone (see Section 31).

**After authentication:**
* Navigation adapts to show role-relevant items: a "Dashboard" entry plus quick links appropriate to the role (e.g., "My Bookings" for customers, "Job Requests" for workers, "Admin Panel" for admins).
* A user/profile menu (avatar or initials) replaces the Login/Register button, providing access to profile, settings, and logout.

**Mobile navigation:**
* Collapses into a hamburger/menu icon that opens a slide-in drawer or full-screen menu.
* The mobile menu lists the same primary items in a clear, stacked, touch-friendly layout, with the authentication/account action clearly separated at the top or bottom.
* The navbar itself remains uncluttered on small screens — no attempt to fit all desktop items horizontally.

---

## 15. Landing Page Design

**Structure:**
1. **Navbar** — as defined in Section 14.
2. **Hero section** — a clear, concise headline communicating the core value ("Find the right professional for the service you need"), a short supporting line, and a primary call-to-action (e.g., a search bar or "Find a Professional" button). May include a single lightweight visual (illustration or optional subtle 3D element per Section 7).
3. **Search/find-a-service area** — a prominent search or category-entry component directly below or within the hero, allowing the user to immediately start their journey (search by keyword or jump into category browsing).
4. **Popular services/categories** — a curated set of category cards (see Section 4) giving quick access to common services.
5. **How SkillLink works** — a short, visual step-by-step explanation (e.g., three or four simple steps: Search → Compare → Book → Get It Done).
6. **Featured/available professionals** — a small set of example provider cards (see Section 16) to demonstrate what discovery looks like.
7. **Why use SkillLink** — a short set of value points (e.g., wide category coverage, transparent ratings, simple booking) presented as compact, scannable items rather than long paragraphs.
8. **Trust/safety section** — a brief section addressing verification, ratings, and reliability, reinforcing the platform's trustworthiness without unverified claims or invented statistics.
9. **Call-to-action** — a final, focused prompt encouraging the visitor to either find a service or register as a worker.
10. **Footer** — includes secondary navigation links, category shortcuts, contact information, and reserved space for social links (see Section 17, with no invented URLs).

The landing page must communicate its core purpose — finding the right professional for a needed service — within the first screen a visitor sees, without relying on a large, mostly empty hero area; the hero should be compact and purposeful, quickly leading into the search/category content below it.

---

## 16. Provider Cards

Each provider card is compact, scannable, and consistent in structure across the platform. A provider card includes:

* Profile photo (or a clean placeholder avatar if unavailable)
* Name
* Professional title (e.g., "Licensed Electrician")
* Primary service(s) offered (short tag list)
* Key skills (short tag list, limited to a few top items)
* Years of experience (short label)
* Rating (star display) and review count
* Service area (short location label)
* Availability indicator (e.g., "Available Today," "Busy," using both color and text label — see Section 31)
* Starting/estimated price, where applicable
* Verification indicator, where applicable (a small badge, e.g., gold-accented per Section 2)
* "View Profile" action (secondary/outline button)
* "Request/Book" action (primary button)

Cards use a consistent height and internal spacing (per Section 10) regardless of content length, with truncation for long text fields (e.g., long titles) to preserve grid alignment. Cards are responsive: full-width or two-per-row on mobile, scaling up to three or four per row on larger screens, consistent with the grid approach described in Section 4.

---

## 17. Provider Profile Page

The full provider profile page expands on the provider card with a complete picture of the professional, structured as follows:

* **Header area:** profile photo, name, professional title, verification badge (if applicable), rating summary, and the primary "Request/Book" action, kept visible or easily accessible (e.g., sticky on scroll on desktop) so the primary action is never far from view.
* **About:** a short biography/description written by the worker.
* **Skills:** a tag-style list of key skills.
* **Experience:** years of experience and any notable background details.
* **Services:** the specific services this provider offers (linking back to relevant categories/services).
* **Service areas:** the location(s)/region(s) the provider covers.
* **Availability:** a simple, clear display of current availability status and general working hours/days.
* **Pricing/service details:** starting prices or pricing structure per service, clearly labeled as estimates where relevant.
* **Ratings:** an aggregated rating score and distribution.
* **Reviews:** a list of individual customer reviews (see Section 25).
* **Completed jobs:** where appropriate, a simple count or short summary of completed jobs on the platform.
* **Verification information:** where applicable, a short explanation of what "verified" means on SkillLink.
* **Request/Book action:** the primary call-to-action, styled prominently and repeated near the top and, on long profiles, again near the bottom or in a persistent element, so it always remains easy to find.

---

## 18. Customer Dashboard

The customer dashboard uses a sidebar (desktop) or bottom/drawer navigation (mobile) with the following areas:

* **Dashboard overview** — a summary view showing active bookings, recent activity, and quick shortcuts (e.g., "Find a Service").
* **Profile** — editable customer profile information.
* **Search services** — access to category/service browsing and search.
* **Provider results** — filtered list of providers for a selected service (see Section 22).
* **Requests** — pending requests sent to providers, with current status.
* **Active bookings** — confirmed/in-progress bookings with status and key details.
* **Booking history** — completed or past bookings.
* **Booking details** — a detailed view of a single booking, including provider info, service details, price, and status timeline (see Section 24).
* **Messages** — lightweight conversation view tied to relevant bookings (see Section 26).
* **Notifications** — list of recent platform notifications.
* **Reviews** — reviews the customer has submitted.
* **Payments** (where applicable) — record of payments associated with completed bookings.
* **Settings** — account, notification, and security preferences.

Dashboard widgets on the overview page display real, useful information (e.g., "2 Active Bookings," "1 Pending Request") rather than decorative placeholders, and link directly to the relevant detailed view when clicked.

---

## 19. Worker Dashboard

The worker dashboard mirrors the customer dashboard's structural approach but is tailored to a worker's needs:

* **Dashboard overview** — summary of new job requests, active jobs, and recent earnings/reviews activity.
* **Profile** — editable worker profile (photo, title, about).
* **Services** — management of which services the worker offers.
* **Skills** — management of listed skills.
* **Experience** — management of experience details.
* **Service area** — management of covered locations.
* **Availability** — management of availability status/schedule.
* **Pricing** — management of pricing per service.
* **Job requests** — incoming requests awaiting a response, presented prominently (e.g., at the top of the dashboard) with clear Accept/Reject actions, since responding quickly is central to the worker experience.
* **Active jobs** — jobs currently in progress, with status update controls.
* **Completed jobs** — history of finished jobs.
* **Earnings** — summary of earnings from completed jobs.
* **Reviews** — reviews received from customers.
* **Messages** — conversations tied to active/relevant bookings.
* **Notifications** — recent platform notifications.
* **Settings** — account, notification, and security preferences.

New job requests must be visually prominent (e.g., a highlighted card or a badge/counter on the navigation item) so a worker can immediately understand when action is needed, supporting quick response times.

---

## 20. Admin Dashboard

The admin dashboard is a structured, data-focused interface using a persistent sidebar (desktop) with the following sections:

* **Overview** — key platform metrics at a glance (e.g., total users, active bookings, pending verifications), using simple, informative cards rather than decorative charts.
* **Customers** — searchable/filterable table of customer accounts with status controls.
* **Workers** — searchable/filterable table of worker accounts, including verification status and controls.
* **Categories** — management interface for category groups.
* **Services** — management interface for individual services within categories.
* **Bookings** — table/list of all bookings with filters (status, date, category).
* **Jobs** — job-level status tracking across the platform.
* **Payments** — record of payment transactions.
* **Commissions** — configuration and record of commission/fee calculations.
* **Revenue** — summary view of platform revenue over time.
* **Complaints** — list and detail view of reported issues, with resolution status.
* **Reviews** — moderation view for flagged or reported reviews.
* **Reports** — structured, exportable summaries of platform activity.
* **Analytics** — charts showing meaningful trends (e.g., bookings over time, category popularity) — every chart included must represent real, useful data rather than being included for decoration.
* **Settings** — platform-wide configuration, including commission rates and category-level settings.

Tables should support sorting, filtering, and pagination (see Section 32) for any list that could grow large (customers, workers, bookings). Charts are used only where they clarify a trend or comparison better than a simple number or table would.

---

## 21. Login & Registration UI

SkillLink provides a role-aware authentication experience for three roles: **Customer**, **Worker**, and **Admin**.

**Customer & Worker:**
* A registration flow begins with a clear role selection step ("I need a service" / "I provide a service"), so the user's intent is explicit before account creation.
* Both Google Login and email/password options are presented clearly, with Google Login typically given visual priority as the faster option, and email/password available as a standard alternative.
* The interface clearly labels which role the user is registering or logging in as (e.g., a heading such as "Customer Login" or "Worker Login") so there is no ambiguity about which experience they will enter.

**Admin:**
* Admin login is a separate, non-publicly-linked entry point (not exposed in main navigation), with a more restrained, protected visual treatment (e.g., a simpler, darker, more formal layout) to reinforce that this is a controlled, internal access point rather than a general public page.
* Admin login uses email/password only (no Google Login), consistent with a more tightly controlled access model.

**General authentication UI guidance:**
* Forms are short, clearly labeled, and validated inline (see Section 13).
* Errors (e.g., invalid credentials) are shown clearly and non-technically (see Section 29).
* A clear path exists between login and registration for customers/workers ("Don't have an account? Register").

---

## 22. Search & Filter UI

The provider discovery interface allows customers to narrow results efficiently.

**Available filters:**
* Category
* Service
* Country
* City
* Service area
* Availability
* Price (range)
* Rating (minimum)
* Experience (minimum years)

**Design guidance:**
* On desktop, filters may appear as a persistent sidebar or a filter bar above the results grid.
* On mobile, filters are accessed via a clearly labeled "Filters" button that opens a bottom sheet or full-screen filter panel, keeping the results view uncluttered by default.
* Applied filters are shown as removable tags/chips above the results, so the user can see and adjust their current filter state at a glance.
* A visible result count (e.g., "24 providers found") gives immediate feedback after filters are applied.
* Filters should apply with minimal friction (either immediately or via a clear "Apply" action), avoiding a confusing or multi-step filtering process.

---

## 23. Booking UI

The booking/request flow is intentionally short and easy to follow, typically presented as a focused form or a short multi-step flow:

* **Selected service** — clearly displayed at the top, confirming what is being booked.
* **Selected provider** — provider name/photo shown for confirmation.
* **Date** — date picker for the requested service date.
* **Time** — time picker or time-slot selection.
* **Location/service area** — address or area input, potentially pre-filled from the customer's profile.
* **Service details** — a short free-text field for the customer to describe their specific need.
* **Price** — displayed estimate based on the provider's listed pricing, clearly labeled as an estimate where final pricing may vary.
* **Notes** — optional additional notes field.
* **Confirmation** — a clear summary screen showing all entered details before final submission, with an explicit "Confirm Booking" action.
* **Booking status** — immediately after submission, the customer sees a confirmation state and the booking's initial status (e.g., "Requested — awaiting provider response").

The flow should be completable in a small number of steps or a single well-organized form, avoiding unnecessary fields or steps that would make booking feel slow or complicated.

---

## 24. Job Status UI

Job/booking status is displayed using clear badges that combine color, text, and icon — never color alone (see Section 31).

**Status values and suggested treatment:**
* **Pending** — amber/warning color, clock icon, label "Pending"
* **Accepted** — primary green, check icon, label "Accepted"
* **Rejected** — error/red color, x icon, label "Rejected"
* **Confirmed** — primary green (slightly deeper tone or distinct icon from Accepted if both are used), label "Confirmed"
* **In Progress** — information/blue color, in-progress icon (e.g., a partial circle or gear), label "In Progress"
* **Completed** — success green, checkmark-circle icon, label "Completed"
* **Cancelled** — muted gray/neutral, x-circle icon, label "Cancelled"

A simple horizontal or vertical status timeline may be used on the Booking Details page to show progression through these states, giving both customer and worker a clear, shared understanding of where a job currently stands.

---

## 25. Reviews & Ratings UI

* **Star rating** — a standard five-star visual, filled proportionally to the score, used both for individual reviews and aggregated profile ratings.
* **Review text** — the customer's written feedback, displayed in a readable text block with reasonable length limits and "read more" truncation for long reviews.
* **Reviewer information** — first name (and last initial, or similar privacy-conscious format) and, optionally, a small avatar.
* **Review date** — displayed in a clear, human-readable format (e.g., "2 weeks ago" or a short date).
* **Rating summary** — an aggregated score (e.g., "4.8 out of 5") with a total review count and, optionally, a simple breakdown by star level.
* **Provider response** (where appropriate) — a clearly indented or visually distinct reply from the worker beneath a review, if the worker chooses to respond.

Reviews should be presented in a clean, readable list, with the most recent reviews shown first by default, reinforcing trustworthiness through clarity rather than heavy visual styling.

---

## 26. Messages & Notifications

### Messages
* **Conversation list** — a simple list of active conversations, each tied to a specific booking, showing the other party's name/photo and a short preview of the latest message.
* **Chat area** — a straightforward message thread view, clearly distinguishing the current user's messages from the other party's (e.g., alignment and color difference).
* **Message input** — a simple text input with a send button; attachments/media are not required for the MVP scope.
* **Send button** — clearly visible, disabled when the input is empty.
* **Read/unread state** — a simple visual indicator (e.g., a dot or bold styling) on unread conversations in the list.

### Notifications
* **Notification list** — a chronological list of platform events (new request, status change, new message, new review, etc.).
* **Read/unread state** — visually distinguished (e.g., background tint or dot indicator) without relying on color alone.
* **Timestamp** — relative or short absolute time shown for each notification.
* **Relevant action** — tapping/clicking a notification navigates directly to the related booking, message, or profile section.

Consistent with the MVP scope defined in 04-MVP-Technical-Specification.md, messaging and notifications remain intentionally simple in this phase — a clear, lightweight system rather than a fully featured real-time chat/notification platform.

---

## 27. Loading States

Loading states are lightweight and fast to render, avoiding heavy animation:

* **Skeleton cards** — simple gray placeholder shapes matching the layout of the content about to load (e.g., a card-shaped skeleton for provider cards), using a subtle shimmer or pulse effect at low intensity.
* **Button loading** — a small inline spinner within the button, replacing or accompanying the label, with the button remaining the same size to avoid layout shift.
* **Dashboard loading** — skeleton versions of dashboard widgets while data is fetched.
* **Search loading** — a brief loading indicator over the results area while filters/search are applied.
* **Booking loading** — a clear loading state during booking submission, preventing duplicate submissions until the action completes.

All loading states should feel brief and purposeful; if a load is expected to take noticeably longer, a short explanatory message may accompany the loading indicator.

---

## 28. Empty States

Each empty state clearly explains what happened and, where possible, offers a next action:

* **No providers** — "No providers found for this service yet. Try adjusting your filters or check back soon." with a "Clear Filters" action where relevant.
* **No bookings** — "You haven't made any bookings yet." with a "Browse Services" action.
* **No job requests** — "You have no job requests right now." with a short tip (e.g., "Make sure your profile and availability are up to date.").
* **No messages** — "No conversations yet. Messages will appear here once you have an active booking."
* **No notifications** — "You're all caught up — no new notifications."
* **No reviews** — "No reviews yet." (on a provider profile) or "You haven't left any reviews yet." (on a customer's own reviews page).
* **No search results** — "No results match your search. Try different keywords or filters."

Empty states use a simple icon or illustration, a short headline, a brief explanatory line, and a relevant action button where applicable — never left as a blank, unexplained area.

---

## 29. Error States

Error messages are clear, human-readable, and actionable — never raw technical error output:

* **Login failure** — "We couldn't log you in. Please check your email and password and try again."
* **Registration failure** — a specific message where possible (e.g., "This email is already registered.") or a general fallback if the cause is unclear.
* **Search failure** — "Something went wrong while searching. Please try again."
* **Booking failure** — "Your booking couldn't be submitted. Please try again, or contact support if the issue continues."
* **Database/network failure** — a general, friendly message (e.g., "We're having trouble connecting. Please check your connection and try again.") with a retry action where feasible.
* **Unauthorized access** — "You don't have permission to view this page." with a link back to an appropriate area (e.g., the user's own dashboard).
* **Invalid form** — inline field-level messages (see Section 13) plus, if needed, a short summary message at the top of the form.
* **Missing information** — a clear prompt indicating what is missing and where to add it (e.g., "Please complete your profile before accepting job requests.").

---

## 30. Responsive Design

### Desktop
* Full navigation bar with all primary links visible.
* Multi-column grids for categories, providers, and dashboard widgets.
* Dashboard layouts use a persistent sidebar alongside the main content area.
* Tables are used where appropriate for admin data views (customers, workers, bookings).

### Tablet
* Navigation may begin collapsing secondary items into a menu, depending on available width.
* Grids reduce column count (e.g., from four to two or three) while maintaining card proportions.
* Cards and panels remain flexible, adjusting width rather than breaking layout.
* Dashboard navigation may collapse into a compact/icon-only sidebar or a top menu, depending on space.

### Mobile
* Touch-friendly controls throughout, with adequately sized tap targets (see Section 12).
* Category and provider grids typically move to a single column or a balanced two-column layout, depending on content density.
* Navigation collapses into a mobile menu/drawer (see Section 14).
* Forms stack fields vertically, one per row, for clarity and ease of input.
* Dashboards adapt to a single-column, stacked layout, with sidebar navigation replaced by a bottom navigation bar or drawer menu.
* Horizontal scrolling is avoided at the page level entirely; it is used only where genuinely necessary for specific components (e.g., a horizontally scrollable row of category chips), never for the overall page layout.

---

## 31. Accessibility

* **Keyboard navigation** — all interactive elements (links, buttons, form fields, menus) must be reachable and operable via keyboard alone, in a logical tab order.
* **Visible focus states** — a clear, visible focus outline/ring on any focused interactive element, styled consistently with the brand (e.g., a primary-colored ring) rather than removed.
* **Proper labels** — every form input has an associated, descriptive label; icon-only buttons include accessible text labels (e.g., via `aria-label`).
* **Semantic HTML** — use of appropriate structural elements (headings, lists, buttons, nav, main, etc.) rather than generic containers for interactive or structural content.
* **Sufficient contrast** — text and interactive elements meet accessible contrast ratios against their backgrounds, including within colored/status elements and glass surfaces.
* **Accessible buttons** — buttons are implemented as true interactive elements (not styled `div`s), with appropriate states communicated to assistive technology (e.g., disabled, loading).
* **Accessible forms** — clear error association between a field and its error message, announced appropriately for screen readers.
* **Alternative text** — meaningful images (e.g., profile photos, illustrative graphics) include descriptive alt text; purely decorative images are marked as such.
* **Not color-alone status** — status indicators (job status, availability, read/unread) always pair color with text and/or an icon, as emphasized in Sections 24 and 26, so the interface remains usable for users with color vision differences.

---

## 32. Design System Component Inventory

| Component | Purpose |
|---|---|
| **Navbar** | Primary site navigation and branding; adapts by role and authentication state. |
| **Footer** | Secondary navigation, contact info, and reserved social link slots. |
| **Buttons** | Primary interactive actions across the interface (see Section 12). |
| **Inputs** | Text-based data entry across forms (see Section 13). |
| **Selects** | Single-choice dropdown selection for structured data (e.g., category, country). |
| **Cards** | General-purpose content container used across categories, providers, and dashboards. |
| **Category Cards** | Clickable entry points into a specific service (see Sections 4–5). |
| **Provider Cards** | Compact summary of a provider for browsing/comparison (see Section 16). |
| **Badges** | Small status or label indicators (e.g., verified, job status). |
| **Avatars** | Visual representation of a user (profile photo or initials placeholder). |
| **Rating Component** | Star-based display of ratings, used on cards, profiles, and reviews. |
| **Modal** | Focused overlay for confirmations, quick actions, or focused forms. |
| **Drawer** | Slide-in panel, primarily used for mobile navigation and filters. |
| **Dropdown** | Contextual menu for secondary actions (e.g., account menu). |
| **Tabs** | Switching between related views within the same page (e.g., dashboard sub-sections). |
| **Tables** | Structured, sortable/filterable data display, primarily in the admin dashboard. |
| **Pagination** | Navigation through large lists/tables of results. |
| **Alerts** | Inline, persistent messages communicating status or important information. |
| **Toasts** | Brief, temporary notifications for action feedback (e.g., "Booking submitted"). |
| **Skeletons** | Lightweight loading placeholders matching the shape of incoming content. |
| **Empty States** | Consistent, informative placeholders for lists/views with no data. |
| **Error States** | Consistent, informative placeholders/messages for failed actions or views. |
| **Booking Timeline/Status** | Visual representation of a booking's progression through defined statuses. |
| **Dashboard Widgets** | Compact, data-driven summary components used across all three dashboards. |

Each component should be built once as a reusable element and reused consistently across the application, rather than being redefined per page.

---

## 33. Design Principles

1. **Performance first.** Every design decision is weighed against its cost to load time and responsiveness.
2. **Keep the UI simple.** Favor clarity over decoration in every screen.
3. **Make important actions obvious.** Primary actions (Book, Accept, Confirm) are always visually distinct and easy to find.
4. **Use animation only when it improves UX.** Motion should clarify or delight, never distract or slow the experience.
5. **Use green as the primary brand identity.** All other colors support, rather than replace, this identity.
6. **Keep category accents subtle.** Differentiation, not decoration, is the goal of category color.
7. **Maintain consistent spacing and typography.** Predictable structure builds trust and usability.
8. **Design mobile-first/responsive.** Every component must work cleanly on the smallest supported screen before being scaled up.
9. **Avoid unnecessary visual complexity.** If a visual element does not aid understanding or usability, it should be reconsidered.
10. **Make the product feel trustworthy and professional.** Every screen should reinforce that SkillLink is a serious, reliable marketplace.

---

## 34. Design-to-Development Rules

* Build reusable components for every element listed in Section 32 rather than one-off, page-specific styles.
* Use consistent design tokens (colors, spacing, radius, typography) as defined in Sections 8–11, rather than hard-coded, inconsistent values scattered through the codebase.
* Avoid duplicate UI styles — if a similar component already exists, extend or reuse it rather than creating a near-duplicate.
* Optimize images (appropriate formats, compression, and responsive sizing) to protect load performance.
* Avoid unnecessary dependencies — only add a library (animation, 3D, UI kit) when it delivers clear, justified value over what is already in use.
* Keep animations lightweight, following the timing and usage rules in Section 6.
* Test responsive layouts across desktop, tablet, and mobile breakpoints for every new screen or component.
* Test keyboard accessibility for every interactive component, confirming focus order and visible focus states.
* Maintain consistent states for loading, error, empty, and success across all features, using the shared components defined in Sections 27–29 rather than inventing new patterns per feature.
* Keep performance as the first priority at every stage of implementation, consistent with the design goal stated in Section 1.

---

## Design Philosophy Summary

SkillLink's design exists to support one core outcome: helping a customer quickly find and trust the right professional, and helping a worker be found and trusted in return. Every visual and interaction decision in this document serves that outcome under a single guiding philosophy:

**Fast + Professional + Beautiful + Lightweight + Responsive + Interactive**

This document is intended to guide the visual and interaction design of SkillLink's development phases. It defines direction, structure, and rules — it does not include application code or a finalized visual design file (e.g., Figma), and no social media URLs have been included, consistent with the scope of this assignment.
