import React from "react";
import { PageHero, Reveal, Counter } from "@/components/site/primitives";
import { Field, useForm } from "@/components/site/form";
import { COLLEGES, STATS } from "@/lib/data";

const PartnerColleges = () => {
  const f = useForm({ college: "", name: "", email: "", role: "" }, "Thanks! Our partnerships team will reach out to your college.");
  return (
    <div>
      <PageHero eyebrow="Partner Colleges" title="320+ campuses. And counting." subtitle="We work hand-in-hand with colleges to bring safe, verified mobility to their students." />
      <section className="px-6 pb-16 lg:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLLEGES.map((c, i) => (
            <Reveal key={c} delay={(i % 4) * 0.05} className="flex items-center justify-center rounded-2xl border border-white/10 bg-surface p-6 text-center text-sm font-medium text-white/75 transition-colors hover:border-primary/40 hover:text-white">{c}</Reveal>
          ))}
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-4">
          {STATS.slice(0, 3).map((s) => (
            <div key={s.label} className="rounded-3xl border border-white/10 bg-surface p-6 text-center">
              <p className="text-3xl font-semibold text-primary font-display"><Counter value={s.value} suffix={s.suffix} format={s.format} /></p>
              <p className="mt-2 text-xs text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-white/10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-semibold">Bring Bikemates to your campus</h2>
          <p className="mt-3 text-center text-white/55">Are you a college administrator or student council member? Partner with us.</p>
          <form onSubmit={f.onSubmit} data-testid="partner-form" className="mt-10 space-y-5 rounded-3xl border border-white/10 bg-surface p-8">
            <Field label="College name" name="college" value={f.data.college} onChange={f.onChange} placeholder="Your institution" testid="partner-college" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" name="name" value={f.data.name} onChange={f.onChange} placeholder="Full name" testid="partner-name" />
              <Field label="Email" type="email" name="email" value={f.data.email} onChange={f.onChange} placeholder="you@college.edu" testid="partner-email" />
            </div>
            <Field label="Your role" name="role" value={f.data.role} onChange={f.onChange} options={["Administrator", "Faculty", "Student Council", "Placement Cell", "Other"]} testid="partner-role" />
            <button type="submit" data-testid="partner-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Request partnership</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PartnerColleges;
