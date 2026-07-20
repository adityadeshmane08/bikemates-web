import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Navigation, ShieldCheck, Wallet, MapPin, Zap } from "lucide-react";
import {
  Reveal, Counter, CTAButton, SectionHeading, Icon,
} from "@/components/site/primitives";
import {
  STATS, COLLEGES, MODULES, WHY, HOW_IT_WORKS, SAFETY, BUSINESS_MODEL,
  FUTURE, TESTIMONIALS, FAQS, USER_DASHBOARD_CARDS, OWNER_DASHBOARD_CARDS, IMAGES,
} from "@/lib/data";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  const [activeModule, setActiveModule] = useState(0);
  const scrollRef = useRef(null);

  const scrollToCard = (i) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActiveModule(i);
  };

  const handleModuleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setActiveModule(Math.round(el.scrollLeft / el.clientWidth));
  };
  const [activeDashboard, setActiveDashboard] = useState(0);
  const dashboardScrollRef = useRef(null);

  const scrollToDashboard = (i) => {
    const el = dashboardScrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActiveDashboard(i);
  };

  const handleDashboardScroll = () => {
    const el = dashboardScrollRef.current;
    if (!el) return;
    setActiveDashboard(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative px-6 pt-40 pb-24 lg:px-10 lg:pt-48">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-[600px] w-[900px] -translate-x-1/2 radial-glow" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" /> Students | Verified Users Only
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.2rem]">
                India's Next <br /><span className="text-gradient">Mobility Network.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
                India’s first student & verified user only platform for bike rentals and ride sharing. Rent, share, and earn within a trusted community.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap gap-3">
                <CTAButton to="/bike-rental" testid="hero-rent-bike">Rent a Bike</CTAButton>
                <CTAButton to="/ride-sharing" testid="hero-share-ride" variant="secondary" icon={false}>Share a Ride</CTAButton>
                <CTAButton to="/bike-rental" testid="hero-become-owner" variant="secondary" icon={false}>Become a Bike Owner</CTAButton>
                <CTAButton to="/signup" testid="hero-download-app" variant="ghost" icon={false}>Download App</CTAButton>
              </div>
            </Reveal>
             </div>

          {/* Hero visual */}
          <Reveal delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <img src={IMAGES.hero} alt="Student riding a bike on campus" className="h-[520px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </div>
            {/* Floating cards */}
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -left-4 top-16 glass rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"><Navigation className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs text-white/50">Live GPS</p>
                  <p className="text-sm font-semibold">Tracking active</p>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute -right-4 bottom-24 glass rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400"><Wallet className="h-5 w-5" /></span>
                <div>
                  <p className="text-xs text-white/50">Fuel split</p>
                  <p className="text-sm font-semibold">₹42 saved today</p>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute left-8 bottom-6 glass rounded-2xl px-4 py-3 shadow-2xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <p className="text-xs font-medium">Verified user ride</p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* LIVE STATISTICS */}
      <section className="border-y border-white/10 bg-surface/40 px-6 py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="text-center">
              <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl font-display">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} format={s.format} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/45">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TRUSTED COLLEGES */}
      <section className="px-6 py-10 lg:px-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Trusted by students,verified users at 320+ campuses & cities</p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {[...COLLEGES, ...COLLEGES].map((c, i) => (
              <span key={i} className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-3xl border border-white/10 bg-surface p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-red-400/80">The Problem</span>
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">Daily commuting is broken.</h3>
              <ul className="mt-6 space-y-4 text-white/60">
                {["Crowded Buses, Autos and cabs are expensive on a student budget", "Idle bikes sit unused while others struggle to move", "No safe, verified, quick way to share rides with classmates", "Rising fuel costs, traffic and pollution"].map((t) => (
                  <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">The Solution</span>
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">BikeMates - A trusted mobility network.</h3>
              <ul className="mt-6 space-y-4 text-white/70">
                {["Rent bikes from students & verified users at peer prices", "Earn passive income from your idle bike", "Share rides and split fuel on your daily route", "Safe, GPS-tracked and insured — every single trip"].map((t) => (
                  <li key={t} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOUR CORE MODULES */}
      <section id="modules" className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Four core experiences" title="One platform. Four ways to move." subtitle="Whether you own a bike, share a ride, need wheels, or want a seat — Bikemates has a purpose-built flow for you." align="center" />

          <div className="mt-10 grid grid-cols-2 gap-2 sm:flex sm:justify-center sm:overflow-x-auto">
            {["List Bike", "Share Ride", "Rent Bike", "Book Ride"].map((label, i) => (
              <button
                key={label}
                onClick={() => scrollToCard(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors sm:px-5 sm:text-sm ${activeModule === i ? "border-primary bg-primary/15 text-primary" : "border-white/10 bg-white/5 text-white/60 hover:text-white"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            onScroll={handleModuleScroll}
            className="mt-8 flex snap-x snap-mandatory overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
          >
            {MODULES.map((m, i) => (
              <div key={m.id} className="w-full shrink-0 snap-center snap-always px-2">
                <Link to={m.link} data-testid={`module-card-${m.id}`} className="group block h-full max-w-xl mx-auto rounded-3xl border border-white/10 bg-surface p-8 transition-colors hover:border-white/20">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${m.accent}22`, color: m.accent }}>{m.tag}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${m.accent}18`, color: m.accent }}>
                      <Icon name={m.id === "bike-owner" ? "KeyRound" : m.id === "ride-sharer" ? "Users" : m.id === "rent-bike" ? "Bike" : "MapPinned"} className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">{m.title}</h3>
                  <p className="mt-2 font-medium text-white/80">{m.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{m.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {m.features.slice(0, 6).map((f) => (
                      <span key={f} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">{f}</span>
                    ))}
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">+{m.features.length - 6} more</span>
                  </div>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                    {m.cta} <Icon name="ArrowRight" className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="border-y border-white/10 bg-surface/30 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why Bikemates" title="Built for students & verified user, trusted by campuses." align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06} className="rounded-3xl border border-white/10 bg-surface p-8 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={w.icon} className="h-6 w-6" /></span>
                <h3 className="mt-5 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="How it works" title="From sign-up to riding in minutes." subtitle="A safe, verified flow that protects everyone in the community." align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08} className="relative rounded-3xl border border-white/10 bg-surface p-8">
                <span className="text-5xl font-semibold text-primary/25 font-display">{s.step}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY & VERIFICATION */}
      <section className="border-y border-white/10 bg-surface/30 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Safety & Trust" title="Safety is the whole point." subtitle="Every layer of Bikemates is designed to keep users & students safe and accountable." />
              <div className="mt-8 space-y-4">
                {["College Email Verification", "Driving Licence Verification", "KYC Verification", "Secure Authentication"].map((v) => (
                  <div key={v} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-surface px-5 py-4">
                    <Icon name="BadgeCheck" className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <CTAButton to="/safety" testid="safety-learn-more" variant="secondary" className="mt-8">Explore Safety</CTAButton>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {SAFETY.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.04} className="rounded-3xl border border-white/10 bg-surface p-6">
                  <Icon name={s.icon} className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEWS */}
      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Beautiful by design" title="Dashboards everyone actually love." subtitle="Manage everything — bookings, earnings, rides and rewards — from one elegant place." align="center" />

          <div className="mt-10 grid grid-cols-2 gap-2 sm:flex sm:justify-center sm:overflow-x-auto">
            {["User Dashboard", "Owner Dashboard"].map((label, i) => (
              <button
                key={label}
                onClick={() => scrollToDashboard(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors sm:px-5 sm:text-sm ${activeDashboard === i ? "border-primary bg-primary/15 text-primary" : "border-white/10 bg-white/5 text-white/60 hover:text-white"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            ref={dashboardScrollRef}
            onScroll={handleDashboardScroll}
            className="mt-8 flex snap-x snap-mandatory overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
          >
            <div className="w-full shrink-0 snap-center snap-always px-2">
              <div className="max-w-xl mx-auto rounded-3xl border border-white/10 bg-surface p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">User Dashboard</h3>
                  <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-400">Rider</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {USER_DASHBOARD_CARDS.map((c) => (
                    <div key={c.label} className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-colors hover:border-primary/40">
                      <Icon name={c.icon} className="h-5 w-5 text-primary" />
                      <span className="text-[11px] text-white/60">{c.label}</span>
                    </div>
                  ))}
                </div>
               </div>
            </div>
            <div className="w-full shrink-0 snap-center snap-always px-2">
              <div className="max-w-xl mx-auto rounded-3xl border border-white/10 bg-surface p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Owner Dashboard</h3>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">Earning</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {OWNER_DASHBOARD_CARDS.map((c) => (
                    <div key={c.label} className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center transition-colors hover:border-primary/40">
                      <Icon name={c.icon} className="h-5 w-5 text-primary" />
                      <span className="text-[11px] text-white/60">{c.label}</span>
                    </div>
                  ))}
               </div>
                <div className="mt-4 rounded-2xl bg-primary/10 p-4">
                  <p className="text-xs text-white/50">This month’s earnings</p>
                  <p className="text-2xl font-semibold text-primary font-display">₹7,340</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <CTAButton to="/dashboard" testid="explore-dashboard">Explore the Dashboard</CTAButton>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Loved on campus" title="Students & verified useres are moving smarter." align="center" />
          <div className="mt-14 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 lg:mx-0 lg:px-0">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.08} className="w-[85%] shrink-0 snap-center rounded-3xl border border-white/10 bg-surface p-8 sm:w-[380px]">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-primary text-primary" />)}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/75">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated text-sm font-semibold text-primary">{t.name[0]}</span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-white/45">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions, answered." align="center" />
          <Accordion type="single" collapsible className="mt-10" data-testid="home-faq">
            {FAQS.slice(0, 6).map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-white/55">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center">
            <CTAButton to="/faq" testid="view-all-faqs" variant="secondary">View all FAQs</CTAButton>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-14 lg:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-primary/15 via-surface to-surface p-12 text-center lg:p-20">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">Ready to move your campus forward?</h2>
            <p className="mx-auto mt-5 max-w-xl text-white/60">Join 48,200+ verified students already renting, sharing and earning on Bikemates.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <CTAButton to="/signup" testid="cta-get-started">Get Started Free</CTAButton>
              <CTAButton to="/how-it-works" testid="cta-how-it-works" variant="secondary" icon={false}>See how it works</CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
