import React, { useState } from "react";
import { PageHero, Reveal } from "@/components/site/primitives";
import { Field, useForm } from "@/components/site/form";
import { CAREERS } from "@/lib/data";

const Careers = () => {
  const [role, setRole] = useState("");
  const f = useForm({ name: "", email: "", role: "", portfolio: "", note: "" }, "Application received! We'll be in touch soon.");
  return (
    <div>
      <PageHero eyebrow="Careers" title="Build the future of campus mobility." subtitle="We're a small, ambitious team obsessed with trust, design and impact." />
      <section className="px-6 pb-16 lg:px-10">
        <div className="mx-auto max-w-4xl space-y-3">
          {CAREERS.map((c, i) => (
            <Reveal key={c.role} delay={i * 0.04} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{c.role}</h3>
                <p className="mt-1 text-sm text-white/50">{c.team} • {c.location} • {c.type}</p>
              </div>
              <button data-testid={`career-apply-${i}`} onClick={() => { setRole(c.role); document.getElementById("apply").scrollIntoView({ behavior: "smooth" }); }} className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5">Apply</button>
            </Reveal>
          ))}
        </div>
      </section>
      <section id="apply" className="border-t border-white/10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-semibold">Apply now</h2>
          <form onSubmit={f.onSubmit} data-testid="careers-form" className="mt-10 space-y-5 rounded-3xl border border-white/10 bg-surface p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" value={f.data.name} onChange={f.onChange} placeholder="Your name" testid="career-name" />
              <Field label="Email" type="email" name="email" value={f.data.email} onChange={f.onChange} placeholder="you@email.com" testid="career-email" />
            </div>
            <Field label="Role" name="role" value={f.data.role || role} onChange={f.onChange} options={CAREERS.map((c) => c.role)} testid="career-role" />
            <Field label="Portfolio / LinkedIn" name="portfolio" value={f.data.portfolio} onChange={f.onChange} placeholder="https://" required={false} testid="career-portfolio" />
            <Field label="Why Bikemates?" name="note" textarea value={f.data.note} onChange={f.onChange} placeholder="Tell us about yourself..." testid="career-note" />
            <button type="submit" data-testid="career-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Submit application</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Careers;
