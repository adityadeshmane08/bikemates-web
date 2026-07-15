import React from "react";
import { PageHero, Reveal, Icon } from "@/components/site/primitives";
import { FinalCTA } from "@/components/site/sections";
import { toast } from "sonner";

const STEPS = [
  { icon: "Share2", title: "Share your link", text: "Send your unique referral link to friends on campus." },
  { icon: "UserPlus", title: "They join & verify", text: "Your friend signs up and completes student verification." },
  { icon: "Gift", title: "You both earn", text: "Get ₹100 in wallet credit each after their first trip." },
];

const ReferEarn = () => {
  const code = "ANANYA100";
  return (
    <div>
      <PageHero eyebrow="Refer & Earn" title="Bring your friends. Earn together." subtitle="Give ₹100, get ₹100. There's no limit to how much you can earn.">
        <div className="mx-auto flex max-w-md items-center gap-3 rounded-full border border-white/10 bg-surface p-2 pl-6">
          <span className="flex-1 text-left font-mono text-lg font-semibold tracking-widest text-primary">{code}</span>
          <button data-testid="copy-referral" onClick={() => { navigator.clipboard?.writeText(code); toast.success("Referral code copied!"); }} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-95">Copy</button>
        </div>
      </PageHero>
      <section className="px-6 pb-20 lg:px-10">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="rounded-3xl border border-white/10 bg-surface p-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={s.icon} className="h-7 w-7" /></span>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-white/55">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCTA title="Start earning with every referral." subtitle="Your rewards are added instantly to your Bikemates wallet." primary={{ to: "/signup", label: "Get your link", testid: "refer-signup" }} secondary={{ to: "/pricing", label: "See rewards", testid: "refer-pricing" }} />
    </div>
  );
};

export default ReferEarn;
