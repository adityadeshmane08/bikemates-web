import React from "react";
import { PageHero, Reveal, Icon } from "@/components/site/primitives";
import { FinalCTA } from "@/components/site/sections";
import { SAFETY } from "@/lib/data";

const Safety = () => (
  <div>
    <PageHero eyebrow="Safety & Trust" title="Your safety, engineered in." subtitle="Nine layers of protection make every Bikemates trip accountable, tracked and insured." />
    <section className="px-6 pb-16 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SAFETY.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.06} className="rounded-3xl border border-white/10 bg-surface p-8 transition-transform duration-300 hover:-translate-y-1">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={s.icon} className="h-6 w-6" /></span>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
          </Reveal>
        ))}
        <Reveal className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 to-transparent p-8">
          <Icon name="HeartHandshake" className="h-8 w-8 text-primary" />
          <h3 className="mt-5 text-lg font-semibold">Trusted Community</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">Two-way ratings, reviews and fair dispute resolution keep every student accountable.</p>
        </Reveal>
      </div>
    </section>
    <FinalCTA title="Ride with total peace of mind." subtitle="Every trip is verified, tracked and insured on Bikemates." />
  </div>
);

export default Safety;
