import React from "react";
import { PageHero } from "@/components/site/primitives";
import { StepList, FinalCTA, SectionHeading } from "@/components/site/sections";
import { HOW_IT_WORKS } from "@/lib/data";

const HowItWorks = () => (
  <div>
    <PageHero eyebrow="How It Works" title="Safe from the first tap." subtitle="Bikemates is engineered around verification and trust — here's the journey end to end." />
    <section className="px-6 pb-24 lg:px-10">
      <StepList steps={HOW_IT_WORKS} />
    </section>
    <section className="border-y border-white/10 bg-surface/30 px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="The details" title="What happens behind the scenes." align="center" className="mb-12" />
        <div className="space-y-4">
          {[
            ["Verification", "We check your college email, government ID and driving licence before you can book or list — keeping the network 100% student-only."],
            ["Matching", "Smart route and location matching surfaces the nearest bikes and the most relevant rides for your schedule."],
            ["Secure handover", "QR + OTP handover with timestamped photos protects both parties, while a refundable deposit is held in escrow."],
            ["Live tracking & SOS", "Every trip is GPS-tracked in real time with one-tap Emergency SOS available throughout."],
            ["Payments & payout", "Transparent fees, instant digital payments, and fast wallet withdrawals for owners and ride sharers."],
          ].map(([t, d], i) => (
            <div key={t} className="flex gap-5 rounded-3xl border border-white/10 bg-surface p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-semibold text-primary">{i + 1}</span>
              <div>
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <FinalCTA />
  </div>
);

export default HowItWorks;
