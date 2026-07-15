import React from "react";
import { PageHero, Reveal, Icon } from "@/components/site/primitives";
import { Field, useForm } from "@/components/site/form";

const PERKS = [
  { icon: "Wallet", title: "Earn per signup", text: "Get paid for every verified student you bring on board." },
  { icon: "Trophy", title: "Leaderboards", text: "Compete campus-wide with monthly ambassador rewards." },
  { icon: "Gift", title: "Exclusive swag", text: "Limited-edition Bikemates merch and event passes." },
  { icon: "Rocket", title: "Resume boost", text: "Real growth & ops experience with a certificate." },
];

const CampusAmbassador = () => {
  const f = useForm({ name: "", email: "", college: "", year: "", why: "" }, "Application submitted! Welcome aboard, future ambassador.");
  return (
    <div>
      <PageHero eyebrow="Campus Ambassador" title="Lead the movement on your campus." subtitle="Represent Bikemates, grow your network, and earn while you build real-world experience." />
      <section className="px-6 pb-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="rounded-3xl border border-white/10 bg-surface p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={p.icon} className="h-6 w-6" /></span>
              <h3 className="mt-5 text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-white/55">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="border-t border-white/10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-semibold">Become an ambassador</h2>
          <form onSubmit={f.onSubmit} data-testid="ambassador-form" className="mt-10 space-y-5 rounded-3xl border border-white/10 bg-surface p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" value={f.data.name} onChange={f.onChange} placeholder="Your name" testid="amb-name" />
              <Field label="College email" type="email" name="email" value={f.data.email} onChange={f.onChange} placeholder="you@college.edu" testid="amb-email" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="College" name="college" value={f.data.college} onChange={f.onChange} placeholder="Your college" testid="amb-college" />
              <Field label="Year of study" name="year" value={f.data.year} onChange={f.onChange} options={["1st Year", "2nd Year", "3rd Year", "Final Year", "Postgraduate"]} testid="amb-year" />
            </div>
            <Field label="Why do you want to join?" name="why" textarea value={f.data.why} onChange={f.onChange} placeholder="Tell us about your campus influence..." testid="amb-why" />
            <button type="submit" data-testid="ambassador-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Apply to lead</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CampusAmbassador;
