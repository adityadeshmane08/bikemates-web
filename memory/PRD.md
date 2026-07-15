# Bikemates — Product Requirements & Progress

## Original Problem Statement
Build a premium, investor-ready marketing website for **Bikemates** — India's first student-only
peer-to-peer bike rental and ride-sharing platform. Must look like a billion-dollar startup
(Apple/Airbnb/Uber/Tesla/Stripe/Notion caliber). Centered on 4 core modules: Bike Owner,
Ride Sharer, Rent Bike, Book Ride.

## User Choices (confirmed)
- Complete marketing website (all pages) + mock user auth + dashboard previews.
- Forms functional with great UX but **NOT connected to a database** (frontend-only).
- Premium theme (agent-designed). Visuals-only integrations (maps/GPS/payments = UI mockups).
- Realistic professional placeholder copy.

## Architecture
- **Frontend-only** React 19 app (CRA + craco). No backend/DB used (per user request).
- Dark premium theme: Electric Orange `#FF4B00`, Clash Display (headings) + Manrope (body).
- Framer Motion animations, glassmorphism, animated counters, marquee, floating cards.
- Mock auth via localStorage (`src/lib/auth.jsx`). Content in `src/lib/data.js`.
- Reusable: `components/site/primitives.jsx`, `sections.jsx`, `form.jsx`, `Navbar`, `Footer`.

## User Personas
- Students renting bikes / booking ride seats (Riders).
- Students listing bikes / sharing rides (Owners & Sharers).
- Colleges & investors evaluating trust and scale.

## What's Been Implemented (Dec 2025)
- **23 routes**, all rendering: Home, About, Features, Bike Rental, Ride Sharing, How It Works,
  Safety, Pricing, FAQ, Blog, Contact, Careers, Campus Ambassador, Refer & Earn, Insurance,
  Partner Colleges, Support, Press Kit, Privacy, Terms, Refund, 404, Login, Signup, Dashboard.
- Rich homepage: hero + floating cards, live stat counters, colleges marquee, problem/solution,
  4 module cards, why-choose, how-it-works, safety grid, dashboard previews, business model,
  future vision, testimonials, FAQ accordion, final CTA.
- Sticky glass navbar with "More" mega-dropdown; premium footer with newsletter + app download.
- Mock auth (signup/login → dashboard) with Rider/Owner tabs, earnings chart, quick actions.
- All forms (contact, careers, ambassador, support, partner, newsletter) show success toasts.
- SEO title/meta, data-testids on all interactive elements, fully responsive, accessible focus.

## Testing
- iteration_1.json: 100% of tested frontend flows pass. Fixed 2 low-priority items
  (dashboard chart bars, page title) — both verified.

## Prioritized Backlog (future)
- P1: Real backend + MongoDB to persist contact/careers/ambassador submissions & newsletter.
- P1: Real auth (JWT or Emergent Google Auth) + real user/owner dashboards with live data.
- P2: Real integrations — Google Maps/live GPS, Stripe/Razorpay payments, chat, notifications.
- P2: Blog CMS + individual article pages; multi-language.
