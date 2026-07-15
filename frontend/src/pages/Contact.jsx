import React from "react";
import { PageHero, Icon } from "@/components/site/primitives";
import { Field, useForm } from "@/components/site/form";

const Contact = () => {
  const f = useForm({ name: "", email: "", college: "", subject: "", message: "" }, "Thanks! Our team will get back to you within 24 hours.");
  const info = [
    { icon: "Mail", label: "Email", value: "hello@bikemates.in" },
    { icon: "Phone", label: "Phone", value: "+91 80 4718 2200" },
    { icon: "MapPin", label: "HQ", value: "Koramangala, Bengaluru, KA 560034" },
  ];
  return (
    <div>
      <PageHero eyebrow="Contact" title="Let's talk mobility." subtitle="Questions, partnerships or press — we'd love to hear from you." />
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {info.map((i) => (
                <div key={i.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-surface p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary"><Icon name={i.icon} className="h-5 w-5" /></span>
                  <div>
                    <p className="text-xs text-white/45">{i.label}</p>
                    <p className="text-sm font-medium">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={f.onSubmit} data-testid="contact-form" className="space-y-5 rounded-3xl border border-white/10 bg-surface p-8 lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" value={f.data.name} onChange={f.onChange} placeholder="Ananya Sharma" testid="contact-name" />
              <Field label="Email" type="email" name="email" value={f.data.email} onChange={f.onChange} placeholder="you@college.edu" testid="contact-email" />
            </div>
            <Field label="College" name="college" value={f.data.college} onChange={f.onChange} placeholder="Your college" required={false} testid="contact-college" />
            <Field label="Subject" name="subject" value={f.data.subject} onChange={f.onChange} placeholder="How can we help?" testid="contact-subject" />
            <Field label="Message" name="message" textarea value={f.data.message} onChange={f.onChange} placeholder="Tell us more..." testid="contact-message" />
            <button type="submit" data-testid="contact-submit" className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">Send message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
