# SkillLink — Deployment & Production

**Document Type:** Deployment & Production Specification
**Product Name:** SkillLink
**Version:** 1.0 (Assignment 10)
**Based On:** 01-Problem-Discovery.md, 02-Solution-Product-Idea.md, 03-PRD.md, 04-MVP-Technical-Specification.md, 05-UI-UX-Design-System.md, 06-Build-MVP.md, 07-MVP-Iteration.md, 08-Full-Stack-Integration.md, 09-Testing-GitHub.md

---

## Objective

This assignment deploys SkillLink as a real, production web application using GitHub, Vercel, Supabase, PostgreSQL, Supabase Authentication, and Supabase Storage where required. The finished deployment has a working public URL and runs against the real production database and authentication configured in `08-Full-Stack-Integration.md`, tested per `09-Testing-GitHub.md`.

The deployment must be secure, responsive, fast, and production-ready, following the priority order:

**Security → Functionality → Reliability → Performance → Usability → Beauty/Animation**

This document does not change the SkillLink concept, and does not invent a live URL, test results, or credentials. Wherever a real value would normally appear (a live domain, a repository link, a Supabase project name), a clearly marked placeholder is used instead, to be replaced with the real value once deployment is actually performed.

---

## 1. Production Readiness

Before deployment, SkillLink is verified to have all of the following, as built and refined across Assignments 06–09:

- [ ] Professional UI, consistent with `05-UI-UX-Design-System.md`
- [ ] Responsive design across desktop, tablet, and mobile
- [ ] Working navigation with no dead-end pages
- [ ] Customer functionality (browse, search, book, track, review)
- [ ] Worker functionality (profile, services, job requests, job management, earnings)
- [ ] Admin functionality (users, categories, services, bookings, commissions, complaints, reports)
- [ ] Authentication (email/password, Google login where configured)
- [ ] Role-based access, enforced at both the frontend and database (RLS) level
- [ ] A real, connected database (Supabase/PostgreSQL, per `08-Full-Stack-Integration.md`)
- [ ] CRUD functionality where required (Section 21 of `08-Full-Stack-Integration.md`)
- [ ] Search/filter functionality for provider discovery
- [ ] Booking/job functionality with a controlled status lifecycle
- [ ] Reviews/ratings tied to eligible completed bookings
- [ ] Error handling with clear, human-readable messages
- [ ] Loading states on all asynchronous actions
- [ ] Empty states on all "no data yet" scenarios
- [ ] Secure configuration (no exposed secrets, RLS enabled)

SkillLink is not deployed to production until this list is fully satisfied and the testing described in `09-Testing-GitHub.md` has been carried out against the application. An unfinished or broken core application (e.g., authentication not working, booking not completing) is not deployed.

---

## 2. GitHub Repository

The SkillLink GitHub repository is prepared for deployment as follows:

- [ ] All source code is pushed to the repository (frontend application, per the structure defined in `06-Build-MVP.md` Section 29)
- [ ] The project structure is correct and matches what is documented (`app/`, `components/`, `features/`, `hooks/`, `lib/`, `services/`, `types/`, `public/`, `styles/`)
- [ ] A `.gitignore` file exists and is correctly configured
- [ ] `node_modules/` is ignored and never committed
- [ ] `.env`, `.env.local`, and any other environment/secret file is ignored and never committed
- [ ] No secrets are committed anywhere in the repository or its commit history
- [ ] No passwords are committed
- [ ] No private API keys are committed
- [ ] No Supabase service-role key is exposed anywhere in the repository
- [ ] A `README.md` is included, following the structure defined in `09-Testing-GitHub.md` Section 15
- [ ] Commit history uses meaningful, descriptive messages, per `09-Testing-GitHub.md` Section 14

Once this checklist is satisfied, the repository is considered clean and production-ready, and is connected to Vercel (Section 6).

---

## 3. Supabase Production Setup

SkillLink's production backend runs on a dedicated Supabase project, configured as described in `08-Full-Stack-Integration.md`:

**Supabase components used:**
* PostgreSQL database — the system of record for all structured application data
* Supabase Authentication — manages registration, login, logout, and session handling
* Supabase Storage — used where required (profile images, and any worker documents, per `08-Full-Stack-Integration.md` Section 25)
* Row Level Security (RLS) — enforced on every relevant table as the platform's actual access-control boundary

**Required tables confirmed present in the production project**, matching `08-Full-Stack-Integration.md` Section 5:

* Users/profiles
* Customer profiles
* Worker profiles
* Categories
* Services
* Worker services
* Skills
* Worker skills
* Service areas
* Availability
* Bookings
* Jobs
* Payments
* Commissions
* Reviews
* Messages
* Notifications
* Complaints
* Admin settings

Each table's relationships, constraints, and RLS policies are verified in production to match what was designed and tested in `08-Full-Stack-Integration.md` and `09-Testing-GitHub.md`, rather than assumed to have carried over automatically from a development project.

**Credential handling:** database connection details, the service-role key, and any other elevated-privilege credential are never exposed in the frontend application, in the GitHub repository, or in any client-reachable configuration. Only the public Supabase project URL and anon/public key are used client-side (Section 7).

---

## 4. Supabase Authentication

Production authentication is verified to support:

- [ ] Email/password registration
- [ ] Google OAuth (where configured for this deployment)
- [ ] Login
- [ ] Registration
- [ ] Logout
- [ ] Session persistence across page reloads and navigation
- [ ] Protected routes (unauthenticated users redirected to login)
- [ ] Role-based access (each authenticated user reaching only their own role's dashboard and functionality)

**OAuth redirect URLs:** if Google OAuth is used, the redirect/callback URLs configured in both the Google OAuth provider settings and the Supabase Authentication settings must point to the actual production domain, not a development URL. No real production URL is invented in this document; the redirect URL is recorded using a placeholder such as:

```
https://YOUR-DOMAIN.vercel.app/auth/callback
```

This placeholder is replaced with the real production domain once the application is deployed (Section 8), and the OAuth provider configuration is updated to match before Google Login is relied upon in production.

---

## 5. Database Security

Production database security is verified against the RLS model defined in `08-Full-Stack-Integration.md` Section 7 and tested in `09-Testing-GitHub.md` Section 4:

- [ ] RLS is enabled on every table containing user-specific or sensitive data
- [ ] Customer data is protected (a customer can read/update only their own profile and bookings)
- [ ] Worker data is protected (a worker can read/update only their own profile, services, skills, service areas, availability, and jobs)
- [ ] Admin functionality is protected (only accounts with the Admin role can reach admin-scoped data and actions)
- [ ] Users cannot modify another user's private data, verified by attempting a direct request outside the intended UI flow
- [ ] Workers cannot modify another worker's jobs
- [ ] Customers cannot access admin data or routes
- [ ] Admin routes are protected both at the frontend (route guard) and database (RLS) level

**Critical rule, restated for production:** Supabase service-role credentials are never placed in client-side code, in any file shipped to the browser, or in the GitHub repository. If any server-side-only operation requires elevated privileges, it is executed in a trusted server context only, never exposed to or reachable from the deployed frontend bundle.

---

## 6. Vercel Deployment

SkillLink's production deployment follows this process:

1. **Connect GitHub repository to Vercel** — link the Vercel account to the GitHub account/organization hosting the SkillLink repository.
2. **Import the SkillLink project** — select the repository within Vercel's "New Project" flow.
3. **Select the correct framework** — Vercel should auto-detect the project as a Next.js application, matching the framework used throughout `06-Build-MVP.md` and `08-Full-Stack-Integration.md`.
4. **Configure build settings if required** — use the project's actual `package.json` scripts (e.g., the existing `build` and `start`/`dev` scripts) as the source of truth; no build command is invented here that differs from what is actually defined in the project.
5. **Add production environment variables** — configure the required Supabase public variables (Section 7) directly in Vercel's project environment variable settings.
6. **Deploy** — trigger the initial deployment from the connected repository's main/production branch.
7. **Check deployment logs** — review the build and deployment logs in Vercel for any errors or warnings before considering the deployment successful.
8. **Open the production URL** — once deployment succeeds, open the generated Vercel URL (or configured custom domain, Section 14) to confirm the application loads.
9. **Test the live application** — carry out the production testing described in Section 9 against the live URL, not just the local development build.

Any discrepancy between this general process and the project's actual configuration (e.g., a non-default build command, a monorepo structure) should be resolved by following the real `package.json` and framework configuration rather than this document's generic description.

---

## 7. Environment Variables

Production environment variables are managed carefully to keep secrets out of the codebase while still making the application function correctly.

**Variables actually required by the implemented application** (public, client-safe Supabase configuration):
* Supabase Project URL
* Supabase anonymous/public API key

Only variables genuinely used by the implemented SkillLink application are configured — this document does not add placeholder variables for functionality that was not actually built. No real secret value is written anywhere in this document or in any committed file.

**Environment layers:**
* **Local `.env.local`** — used during local development, holding the developer's own Supabase project URL and anon key; listed in `.gitignore` and never committed.
* **Vercel Environment Variables** — the same variable names configured directly in the Vercel project's settings, used at build and runtime for the deployed application.
* **Production environment** — the environment variable values used for the live, public deployment (the real Supabase production project's URL/anon key).
* **Preview environment** (where useful) — Vercel's preview deployments (triggered by non-production branches or pull requests) may use either the same production Supabase project's public configuration or a separate staging Supabase project, depending on the team's workflow; either way, only public, client-safe values are used.

**Rules enforced at every layer:**
* `.env.local` (or any equivalent local secret file) is never committed to GitHub.
* No server-only secret (e.g., a service-role key, if ever needed for a trusted server-side operation) is placed in any environment variable prefixed for client exposure (e.g., Next.js's `NEXT_PUBLIC_` convention is reserved strictly for values safe to expose in the browser).

---

## 8. Production URL

The following values are recorded here as placeholders and must be replaced with the real values once SkillLink is actually deployed:

**Production URL:** `https://YOUR-PRODUCTION-URL`

**GitHub Repository:** `YOUR-GITHUB-REPOSITORY`

**Supabase Project:** `YOUR-SUPABASE-PROJECT`

No real deployment URL, repository link, or Supabase project name is invented in this document. These placeholders should be updated as part of the actual deployment process, and the updated document (with real values filled in) should accompany the final submission described in Section 18.

---

## 9. Production Testing

Once deployed, the live SkillLink application (at the URL recorded in Section 8) is tested directly — not only the local development version — covering the same functional scope defined in `09-Testing-GitHub.md`, now verified against real production infrastructure.

### Authentication
- [ ] Registration
- [ ] Login
- [ ] Google Login (if configured)
- [ ] Logout
- [ ] Session persistence
- [ ] Invalid login handled with a clear error
- [ ] Protected routes correctly redirect unauthenticated users

### Customer
- [ ] Browse categories
- [ ] Search providers
- [ ] View provider profile
- [ ] Request/book a service
- [ ] View booking
- [ ] Track booking status
- [ ] Submit reviews
- [ ] Messages/notifications, where implemented

### Worker
- [ ] Worker login
- [ ] Profile management
- [ ] Services management
- [ ] Skills management
- [ ] Service areas management
- [ ] Availability management
- [ ] Receive job requests
- [ ] Accept/reject jobs
- [ ] Update job status
- [ ] Earnings visibility
- [ ] Reviews received visibility

### Admin
- [ ] Admin login
- [ ] Dashboard overview
- [ ] Customer management
- [ ] Worker management
- [ ] Categories management
- [ ] Services management
- [ ] Bookings management
- [ ] Complaints management
- [ ] Reviews moderation
- [ ] Commission/revenue data
- [ ] Settings management

All results from this testing pass are recorded as real findings once performed against the live deployment; no result is assumed or invented in advance.

---

## 10. Responsive Production Testing

The live production URL (Section 8) is tested directly on desktop, laptop, tablet, and mobile devices/viewports, re-checking:

Navbar · Hero · Categories · Provider cards · Forms · Dashboards · Tables · Booking screens · Modals · Footer · Buttons · Navigation

**Verified on the live deployment:**
- [ ] No horizontal scrolling at the page level
- [ ] No broken layout at any tested breakpoint
- [ ] No overlapping elements
- [ ] No unreadable text
- [ ] Touch controls work correctly on real mobile devices, not only browser device-emulation

This re-confirms, on real production infrastructure and real network conditions, the responsive behavior already verified in `07-MVP-Iteration.md` Section 6 and `09-Testing-GitHub.md` Section 5 — production deployment can sometimes surface issues (e.g., different font loading behavior, different CDN image delivery) not visible in local development.

---

## 11. Production Performance

The deployed application is verified to remain fast under real conditions:

- [ ] Initial loading time on the production URL is reasonable
- [ ] Page navigation feels fast and responsive
- [ ] Images are delivered efficiently (appropriately sized/optimized, not raw full-resolution files)
- [ ] Database requests are efficient and not excessive per page load
- [ ] No unnecessary duplicate requests are made
- [ ] No unusually large components slow down rendering
- [ ] JavaScript bundle weight remains reasonable (no unnecessary heavy dependencies shipped)
- [ ] Animations remain smooth, without dropped frames or lag
- [ ] Mobile performance is checked specifically on the live deployment, not assumed from desktop results

**Visual design remains attractive but lightweight in production**, consistent with `05-UI-UX-Design-System.md`:
* Light glassmorphism
* Subtle hover effects
* Short, smooth animations
* Limited glow
* Limited 3D usage (at most the single justified element defined in `05-UI-UX-Design-System.md` Section 7)

No heavy animation or unnecessary 3D element is introduced at deployment time that would negatively affect production performance; anything found to cost more than it visually adds is simplified or removed.

---

## 12. Error Handling in Production

Real production error conditions are tested against the live deployment:

- [ ] Network errors (e.g., simulated by briefly interrupting connectivity)
- [ ] Database errors (e.g., an invalid or unexpected query response)
- [ ] Authentication errors (invalid credentials, expired session)
- [ ] Invalid forms (submitting incomplete or malformed data)
- [ ] Missing data (viewing a record that no longer exists)
- [ ] Failed booking submission
- [ ] Failed profile/data update
- [ ] Failed file upload (Storage)
- [ ] Unauthorized access attempts

In every case, the production application shows a clear, user-friendly message, consistent with `05-UI-UX-Design-System.md` Section 29 and `09-Testing-GitHub.md` Section 8. No sensitive technical information (stack traces, raw database error text, internal identifiers, or infrastructure details) is exposed to normal users in the production environment; such detail, if needed for debugging, is confined to server-side logs or a development-only console, never the production UI.

---

## 13. Production Security Checklist

- [ ] No passwords in GitHub
- [ ] No API secrets in GitHub
- [ ] No service-role key in frontend code or bundle
- [ ] `.env` files ignored by Git
- [ ] RLS enabled on all relevant tables
- [ ] Protected routes working correctly in production
- [ ] Role-based access working correctly in production
- [ ] Authentication secure (correct session handling, no exposed tokens)
- [ ] Storage access rules checked (public vs. restricted files behave as intended)
- [ ] Admin area protected (unreachable by non-admin roles, both UI and database level)
- [ ] Sensitive error information hidden from end users (Section 12)
- [ ] Production environment variables configured securely in Vercel, not committed as files

---

## 14. Domain & HTTPS

* **Vercel provides a production domain** automatically upon deployment (typically in the form `project-name.vercel.app`), served over HTTPS by default.
* **HTTPS should be enabled** and confirmed active on the production URL — Vercel handles TLS/SSL certificates automatically for both its default domains and any connected custom domain.
* **A custom domain can be added later if required** (e.g., a purchased domain pointing to the Vercel deployment), configured through Vercel's domain settings and DNS configuration at that time.

No custom domain is invented in this document. Where a domain is referenced elsewhere in this document, the placeholder `https://YOUR-DOMAIN.vercel.app` (or the equivalent recorded in Section 8) is used until a real domain is assigned.

---

## 15. Deployment Workflow

SkillLink follows this deployment workflow:

```
Local Development
       ↓
     GitHub
       ↓
Supabase Production Backend
       ↓
  Vercel Deployment
       ↓
   Production URL
       ↓
   Live Testing
       ↓
    Bug Fix
       ↓
  GitHub Commit
       ↓
Automatic Vercel Redeployment
```

**Explanation:** changes are made and verified in local development first, then committed and pushed to the connected GitHub repository. The production Supabase backend (Section 3) serves as the live data layer regardless of where the frontend is deployed. When Vercel is connected to the GitHub repository, it automatically triggers a new deployment whenever new commits are pushed to the connected branch (typically the main/production branch) — this means that once a bug found during live testing (Section 9) is fixed locally, tested, and committed/pushed to GitHub, Vercel redeploys the updated application to the same production URL without requiring a separate manual deployment step.

This workflow keeps the live production URL continuously up to date with the latest tested, committed code, while ensuring nothing reaches production without first passing through local development and version control.

---

## 16. Deployment Troubleshooting

Common categories of deployment problems and how to investigate them:

### Build Error
Check:
* Vercel build logs, for the specific failing step
* TypeScript errors (type mismatches, missing types)
* Missing dependencies (a package used in code but not listed in `package.json`)
* Incorrect imports (wrong path, case-sensitivity issues that only appear in Linux-based build environments)
* Environment variables required at build time but not configured in Vercel

### Supabase Error
Check:
* The Supabase project URL is correct and matches the production project
* The public/anonymous key is correct and matches the production project
* Required database tables exist in the production project (Section 3)
* RLS policies are correctly configured and not unintentionally blocking legitimate requests
* Authentication configuration (allowed redirect URLs, enabled providers) matches the production setup

### Google Login Error
Check:
* The OAuth provider (Google Cloud Console) configuration is correct
* Redirect/callback URLs are correctly set for the production domain (Section 4)
* The production domain used in testing matches the domain configured in both Google's OAuth settings and Supabase's Authentication settings

### Environment Variable Error
Check:
* Variable names match exactly what the application code expects (including correct casing and prefixes)
* Variables are configured in the correct Vercel environment (Production vs. Preview vs. Development)
* Local `.env.local` values match what is expected in production (aside from pointing to a different Supabase project, if applicable)
* The application has been redeployed after changing environment variables, since a running deployment does not automatically pick up new variable values

### Page Not Working
Check:
* The browser console for client-side errors
* Vercel's function/deployment logs for server-side errors
* Network requests (browser dev tools) to see if a request to Supabase is failing and why
* Authentication/session state (whether the user is actually authenticated as expected)
* The underlying database query for that page, to confirm it returns the expected data

No specific, project-actual error message or incident is invented in this document; this section provides the general troubleshooting categories to apply once a real issue is encountered during deployment.

---

## 17. Final Production Checklist

- [ ] GitHub repository ready
- [ ] README complete
- [ ] `.gitignore` configured
- [ ] No secrets committed
- [ ] Supabase production project ready
- [ ] PostgreSQL database ready
- [ ] Tables created
- [ ] RLS configured
- [ ] Authentication configured
- [ ] Google OAuth configured if used
- [ ] Storage configured where required
- [ ] Vercel connected to GitHub
- [ ] Environment variables configured
- [ ] Production build successful
- [ ] Deployment successful
- [ ] Public URL available
- [ ] Customer flow tested
- [ ] Worker flow tested
- [ ] Admin flow tested
- [ ] CRUD tested
- [ ] Booking tested
- [ ] Reviews tested
- [ ] Responsive testing completed
- [ ] Mobile testing completed
- [ ] Performance checked
- [ ] Security checked
- [ ] Error handling checked
- [ ] Final live testing completed

---

## 18. Final Deliverables

1. Live SkillLink production URL (Section 8, once deployed)
2. GitHub repository (Section 2, 8)
3. Supabase project (Section 3, 8)
4. Production database, with tables and RLS configured (Section 3)
5. Authentication, working in production (Section 4)
6. Screenshots of the live, deployed application
7. A completed deployment/testing checklist (Section 17)
8. README/documentation, updated with the real production values (Section 8)
9. Final production test results (Section 9–12), recorded as real findings from the live deployment

No URL or test result is invented in this document; each of the above is completed with real values and real findings once deployment is actually carried out.

---

## 19. Final Production Standard

SkillLink is considered production-ready when:

* The live URL opens successfully
* Authentication works in production
* Customer functionality works in production
* Worker functionality works in production
* Admin functionality works in production
* Real database operations work correctly
* CRUD works where required
* RLS/security works correctly
* The core booking flow works end-to-end
* Reviews work correctly
* Responsive design works across devices
* The mobile experience works correctly
* Loading/error/empty states work correctly
* No critical bugs remain open (per the severity definitions in `09-Testing-GitHub.md` Section 9)
* GitHub contains no secrets
* Environment variables are configured securely in Vercel
* The application remains fast in production
* Animations remain lightweight
* The final product can be demonstrated live, directly from the public URL

---

## Summary

This document defines the deployment process that takes SkillLink from a tested, full-stack application (`08-Full-Stack-Integration.md`, `09-Testing-GitHub.md`) to a live, publicly accessible production system, using GitHub, Vercel, and Supabase. It covers production readiness, repository and backend preparation, secure environment-variable handling, the deployment workflow, live production testing across functionality, responsiveness, performance, error handling, and security, and troubleshooting guidance for common deployment issues.

No live URL, credential, or test result has been invented in this document — every placeholder (`YOUR-PRODUCTION-URL`, `YOUR-GITHUB-REPOSITORY`, `YOUR-SUPABASE-PROJECT`, and similar) is intended to be replaced with the real value once SkillLink is actually deployed, and every checklist is intended to be completed against the real, live application rather than assumed in advance. This concludes the documented development lifecycle of SkillLink, from the original problem definition (`01-Problem-Discovery.md`) through to a deployed, production-ready worldwide services marketplace.
