import React from "react";
import { PageHero, Reveal, Icon } from "@/components/site/primitives";
import { FinalCTA } from "@/components/site/sections";

const COVER = [
  { icon: "ShieldCheck", title: "Third-party liability", text: "Coverage for damage or injury to third parties during a trip." },
  { icon: "Bike", title: "Bike damage protection", text: "Owners are protected against accidental damage during rentals." },
  { icon: "HeartPulse", title: "Rider accident cover", text: "Personal accident coverage for riders on every booking." },
  { icon: "FileCheck", title: "Theft protection", text: "Financial protection in the rare event of theft during a rental." },
];

const Insurance = () => (
  <div>
    <PageHero eyebrow="Insurance" title="Every trip, protected." subtitle="Bikemates partners with leading insurers so owners and riders are covered end-to-end." />
    <section className="px-6 pb-16 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
        {COVER.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06} className="flex gap-5 rounded-3xl border border-white/10 bg-surface p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={c.icon} className="h-6 w-6" /></span>
            <div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{c.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/45">Insurance is provided by our licensed partners and subject to terms. A refundable security deposit complements coverage for added protection.</p>
    </section>
    <FinalCTA title="Ride and rent with confidence." subtitle="Comprehensive protection is built into every Bikemates trip." primary={{ to: "/signup", label: "Get Started", testid: "insurance-signup" }} secondary={{ to: "/safety", label: "Safety features", testid: "insurance-safety" }} />
  </div>
);

export default Insurance;
