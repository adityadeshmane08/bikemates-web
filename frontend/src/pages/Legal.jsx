import React from "react";
import { PageHero } from "@/components/site/primitives";

const CONTENT = {
  privacy: {
    eyebrow: "Privacy Policy",
    title: "Your privacy matters.",
    subtitle: "How we collect, use and protect your data at Bikemates.",
    sections: [
      ["Information we collect", "We collect information you provide during sign-up and verification, including your name, college email, government ID, driving licence and KYC details, as well as usage, location and payment data required to operate the platform safely."],
      ["How we use your data", "We use your data to verify your identity, match rides and rentals, process payments, provide live tracking and safety features, prevent fraud, and improve our services. We never sell your personal data."],
      ["Location & tracking", "Live GPS tracking is active during trips to keep every party safe. You can control location permissions in your device settings, though some features require location access to function."],
      ["Data sharing", "We share limited data with insurance and payment partners strictly to deliver the service, and with authorities only where legally required. Trip counterparts see only the information necessary for a safe handover."],
      ["Your rights", "You may access, correct, or request deletion of your data at any time. Contact privacy@bikemates.in to exercise your rights. Some records may be retained where required by law."],
      ["Security", "We use encryption, access controls and secure infrastructure to protect your data. No system is perfectly secure, but we continually invest in safeguards."],
    ],
  },
  terms: {
    eyebrow: "Terms & Conditions",
    title: "The rules of the road.",
    subtitle: "The terms governing your use of the Bikemates platform.",
    sections: [
      ["Eligibility", "Bikemates is available only to verified college students. You must provide accurate verification information and be legally permitted to ride a two-wheeler to book a bike."],
      ["Accounts", "You are responsible for your account and all activity under it. Keep your credentials secure and notify us of any unauthorised use immediately."],
      ["Bookings & handover", "All bookings, security deposits and handovers must follow the in-app QR + OTP process. Providing false information or bypassing verification is strictly prohibited."],
      ["Responsibilities", "Owners must list accurate, roadworthy and insured bikes. Riders must ride safely, obey traffic laws, and return bikes in the condition received. Both parties agree to fair ratings."],
      ["Payments & fees", "Bikemates charges a transparent booking commission. Fees, deposits and fuel splits are shown before you confirm. Payouts are processed to your wallet per the applicable schedule."],
      ["Prohibited conduct", "Harassment, fraud, misuse of SOS, tampering with GPS, or any illegal activity will result in suspension and may be reported to authorities."],
      ["Liability", "Bikemates facilitates connections between students. While we provide safety tools and insurance, users are responsible for their own conduct during trips as outlined in these terms."],
    ],
  },
  refund: {
    eyebrow: "Refund Policy",
    title: "Fair and transparent refunds.",
    subtitle: "When and how refunds are processed on Bikemates.",
    sections: [
      ["Cancellations", "Free cancellation is available up to 1 hour before a booking starts. Cancellations after this window may incur a small fee to compensate the owner or rider."],
      ["Security deposits", "Refundable security deposits are released back to your wallet within 24–72 hours after a successful return, provided there is no reported damage or dispute."],
      ["Damage & disputes", "If damage is reported at return, part or all of the deposit may be withheld pending resolution. Our team reviews photo evidence fairly before any deduction."],
      ["Failed trips", "If a bike is undeliverable or a ride is cancelled by the counterpart, you receive a full refund of fees and deposit automatically."],
      ["Refund method & timing", "Refunds are issued to your original payment method or Bikemates wallet. Bank refunds may take 5–7 business days depending on your provider."],
      ["Contact", "For any refund query, reach out via Support or email refunds@bikemates.in with your booking ID."],
    ],
  },
};

const Legal = ({ type }) => {
  const c = CONTENT[type];
  return (
    <div>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
      <section className="px-6 pb-24 lg:px-10">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-sm text-white/40">Last updated: December 2025</p>
          {c.sections.map(([h, body], i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-surface p-8">
              <h2 className="text-xl font-semibold">{i + 1}. {h}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Legal;
