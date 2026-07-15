import React from "react";
import { PageHero, Reveal, Icon, CTAButton } from "@/components/site/primitives";
import { FinalCTA } from "@/components/site/sections";
import { PRICING } from "@/lib/data";

const Pricing = () => (
  <div>
    <PageHero eyebrow="Pricing" title="Fair pricing. Student-first." subtitle="Start free forever. Upgrade only when you want lower fees and premium perks." />
    <section className="px-6 pb-16 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
        {PRICING.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className={`relative rounded-3xl border p-8 ${p.highlight ? "border-primary/50 bg-gradient-to-b from-primary/10 to-surface" : "border-white/10 bg-surface"}`}>
            {p.highlight && <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">Popular</span>}
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-white/50">{p.tagline}</p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-semibold font-display">{p.price}</span>
              <span className="mb-1 text-sm text-white/45">/{p.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                  <Icon name="Check" className="h-4 w-4 shrink-0 text-primary" />{f}
                </li>
              ))}
            </ul>
            <CTAButton to="/signup" testid={`pricing-${p.name.toLowerCase().replace(/\W+/g, "-")}`} variant={p.highlight ? "primary" : "secondary"} icon={false} className="mt-8 w-full">{p.cta}</CTAButton>
          </Reveal>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-xl text-center text-sm text-white/45">All plans include verification, live GPS tracking, insurance and 24/7 support. Prices are indicative and inclusive of taxes.</p>
    </section>
    <FinalCTA title="Start free, upgrade anytime." subtitle="No hidden fees. Cancel whenever you like." />
  </div>
);

export default Pricing;
