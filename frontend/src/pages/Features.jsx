import React from "react";
import { PageHero, Reveal, Icon } from "@/components/site/primitives";
import { FinalCTA } from "@/components/site/sections";
import { FEATURE_LIST, MODULES } from "@/lib/data";

const iconMap = {
  "Student Verification": "UserCheck", "College Email Verification": "Mail", "Driving Licence Verification": "IdCard",
  "KYC Verification": "FileCheck", "Secure Authentication": "Lock", "Google Maps Integration": "Map",
  "Live GPS Tracking": "Navigation", "Emergency SOS": "Siren", "QR Pickup & Return": "QrCode",
  "Digital Payments": "CreditCard", "Wallet": "Wallet", "Real-time Notifications": "Bell",
  "Chat System": "MessageSquare", "Ratings & Reviews": "Star", "Referral Program": "Users",
  "Rewards": "Gift", "Insurance": "ShieldCheck", "Booking Calendar": "Calendar",
  "Search & Filters": "Search", "Push Notifications": "BellRing", "Help & Support": "LifeBuoy", "Dispute Resolution": "Scale",
};

const Features = () => (
  <div>
    <PageHero eyebrow="Features" title="Everything you need to move." subtitle="A complete, safety-first toolkit powering rentals and ride sharing across campus." />
    <section className="px-6 pb-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_LIST.map((f, i) => (
          <Reveal key={f} delay={(i % 3) * 0.05} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-surface p-6 transition-transform duration-300 hover:-translate-y-1">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={iconMap[f] || "Sparkles"} className="h-5 w-5" /></span>
            <div>
              <h3 className="text-sm font-semibold">{f}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/50">Built into every Bikemates journey for a seamless, secure experience.</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
    <section className="border-y border-white/10 bg-surface/30 px-6 py-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {MODULES.map((m) => (
          <Reveal key={m.id} className="rounded-3xl border border-white/10 bg-surface p-6">
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${m.accent}22`, color: m.accent }}>{m.tag}</span>
            <h3 className="mt-4 text-lg font-semibold">{m.title}</h3>
            <p className="mt-1 text-xs text-white/50">{m.features.length} dedicated features</p>
          </Reveal>
        ))}
      </div>
    </section>
    <FinalCTA />
  </div>
);

export default Features;
