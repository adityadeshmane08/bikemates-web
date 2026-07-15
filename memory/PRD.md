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
### Phase 1 — Marketing site
- 23 marketing routes, rich animated homepage, sticky glass navbar + footer.

### Phase 2 — Full functional APP interface (frontend-only, localStorage-backed)
- **Real logo** wired in (navbar, footer, auth, app sidebar) + favicon/apple-touch/og image (`public/logo.jpg`).
- **App shell** (`components/app/AppLayout.jsx`): sidebar (Overview / Ride & Rent / Earn / Account), topbar with live wallet balance + avatar, responsive mobile drawer.
- **Store** (`lib/store.jsx`): localStorage-persisted state, seeded with 6 bikes + 4 rides + wallet + transactions. Actions: addBike, addRide, bookBike, bookRide, topUp, withdraw, reset.
- **4 core flows**:
  - Rider → **Rent Bike** (search/filter, detail dialog, plan select, pay → QR + OTP handover, booking recorded, wallet debited).
  - Rider → **Book Ride** (search, driver profile + route dialog, confirm → seat confirmed, seats decrement, wallet debited).
  - Owner → **List Bike for Rent** (full form + photo upload preview → appears in My Bikes).
  - Owner → **List Route / Share Ride** (route/schedule/fare form → appears in My Rides + Book Ride list as "Your ride").
- **Supporting pages**: Dashboard (stats, quick actions, earnings chart), My Bikes (booking requests accept/reject), My Rides, My Bookings, Wallet (add/withdraw dialogs + transactions), Messages (interactive chat), Notifications, Profile (verification badges), Settings (toggles + reset demo).

## Testing
- iteration_1.json: marketing site 100%. iteration_2.json: app flows 100%. iteration_3.json: dashboard rework + 10 new pages 100%.

### Phase 3 — Dashboard rework (matches provided screenshots)
- `/dashboard` now shows an icon-grid **User Dashboard** (blue "Rider" badge, 10 tiles) and **Owner Dashboard** (orange "Earning" badge, 9 tiles + "This month's earnings ₹7,340" box) with a User/Owner toggle — identical to the homepage preview.
- Every tile opens a real working page. Added 10 pages: Ride History, Saved Bikes, Rewards, Referral, Booking Requests, Availability Calendar, GPS Tracking (animated live map + SOS), Earnings, Analytics (charts + utilization gauge), Reviews.

## Prioritized Backlog (future)
- P1: Real backend + MongoDB to persist contact/careers/ambassador submissions & newsletter.
- P1: Real auth (JWT or Emergent Google Auth) + real user/owner dashboards with live data.
- P2: Real integrations — Google Maps/live GPS, Stripe/Razorpay payments, chat, notifications.
- P2: Blog CMS + individual article pages; multi-language.
