import React from "react";
import { PageHero, Reveal, Counter, Icon } from "@/components/site/primitives";
import { FinalCTA, SectionHeading } from "@/components/site/sections";
import { STATS, FUTURE, IMAGES } from "@/lib/data";

const VALUES = [
  { icon: "ShieldCheck", title: "Trust first", text: "We build for safety before scale. Verification is non-negotiable." },
  { icon: "Users", title: "Community owned", text: "Students power the platform and share in its value." },
  { icon: "Leaf", title: "Sustainable by design", text: "Every shared ride is a step toward greener campuses." },
  { icon: "Sparkles", title: "Relentlessly simple", text: "Complex logistics, effortless experience." },
];

const About = () => (
  <div>
    <PageHero eyebrow="About" title="We're rebuilding how campuses move." subtitle="Bikemates began with a simple idea — students helping students get around, safely and affordably." />
    <section className="px-6 pb-20 lg:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-white/10">
            <img src={IMAGES.campus} alt="Campus at sunset" className="h-[420px] w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl font-semibold sm:text-4xl">Our mission</h2>
          <p className="mt-4 leading-relaxed text-white/60">To create the most trusted student mobility ecosystem in India — where getting around campus is affordable, safe, sustainable, and community-driven.</p>
          <p className="mt-4 leading-relaxed text-white/60">We connect verified students so idle bikes create income, empty seats become shared rides, and every trip strengthens a network built on trust.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-surface p-4 text-center">
                <p className="text-2xl font-semibold text-primary font-display"><Counter value={s.value} suffix={s.suffix} format={s.format} /></p>
                <p className="mt-1 text-[11px] text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
    <section className="border-y border-white/10 bg-surface/30 px-6 py-24 lg:px-10">
      <SectionHeading eyebrow="Our values" title="What we stand for." align="center" className="mb-14" />
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06} className="rounded-3xl border border-white/10 bg-surface p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={v.icon} className="h-6 w-6" /></span>
            <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{v.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
    <section className="px-6 py-24 lg:px-10">
      <SectionHeading eyebrow="Roadmap" title="Where we're headed." align="center" className="mb-12" />
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
        {FUTURE.map((f) => (
          <span key={f} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-5 py-3 text-sm text-white/70">
            <Icon name="Sparkles" className="h-4 w-4 text-primary" />{f}
          </span>
        ))}
      </div>
    </section>
    <FinalCTA title="Join the movement." subtitle="Be part of India's student mobility revolution." primary={{ to: "/careers", label: "See open roles", testid: "about-careers" }} secondary={{ to: "/signup", label: "Get Started", testid: "about-signup" }} />
  </div>
);

export default About;
