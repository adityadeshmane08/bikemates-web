import React from "react";
import { PageHero, Reveal, Icon } from "@/components/site/primitives";
import { Field, useForm } from "@/components/site/form";
import { Link } from "react-router-dom";

const TOPICS = [
  { icon: "BookOpen", title: "Getting Started", text: "Sign up, verification and your first trip." },
  { icon: "CreditCard", title: "Payments & Wallet", text: "Payments, refunds, deposits and withdrawals." },
  { icon: "Bike", title: "Rentals", text: "Booking, handover, returns and extensions." },
  { icon: "Users", title: "Ride Sharing", text: "Posting rides, booking seats and fuel splits." },
  { icon: "ShieldCheck", title: "Trust & Safety", text: "SOS, insurance, disputes and reporting." },
  { icon: "Settings", title: "Account", text: "Profile, notifications and settings." },
];

const Support = () => {
  const f = useForm({ name: "", email: "", category: "", message: "" }, "Ticket created! We'll respond within a few hours.");
  return (
    <div>
      <PageHero eyebrow="Support" title="We're here to help, 24/7." subtitle="Browse help topics or raise a ticket — our student support team responds fast." />
      <section className="px-6 pb-16 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.06} className="rounded-3xl border border-white/10 bg-surface p-7 transition-transform duration-300 hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={t.icon} className="h-6 w-6" /></span>
              <h3 className="mt-5 text-base font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm text-white/55">{t.text}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/50">Looking for quick answers? Check our <Link to="/faq" className="text-primary hover:underline">FAQ</Link>.</p>
      </section>
      <section className="border-t border-white/10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-semibold">Raise a ticket</h2>
          <form onSubmit={f.onSubmit} data-testid="support-form" className="mt-10 space-y-5 rounded-3xl border border-white/10 bg-surface p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" value={f.data.name} onChange={f.onChange} placeholder="Your name" testid="support-name" />
              <Field label="Email" type="email" name="email" value={f.data.email} onChange={f.onChange} placeholder="you@college.edu" testid="support-email" />
            </div>
            <Field label="Category" name="category" value={f.data.category} onChange={f.onChange} options={["Getting Started", "Payments & Wallet", "Rentals", "Ride Sharing", "Trust & Safety", "Account"]} testid="support-category" />
            <Field label="How can we help?" name="message" textarea value={f.data.message} onChange={f.onChange} placeholder="Describe your issue..." testid="support-message" />
            <button type="submit" data-testid="support-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Submit ticket</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Support;
