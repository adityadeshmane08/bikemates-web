import React from "react";
import { CTAButton, Reveal, SectionHeading, Icon } from "@/components/site/primitives";

export const FinalCTA = ({ title = "Ready to ride smarter?", subtitle = "Join thousands of verified students on Bikemates.", primary = { to: "/signup", label: "Get Started Free", testid: "final-cta-primary" }, secondary = { to: "/how-it-works", label: "How it works", testid: "final-cta-secondary" } }) => (
  <section className="px-6 py-24 lg:px-10">
    <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-primary/30 bg-gradient-to-br from-primary/15 via-surface to-surface p-12 text-center lg:p-20">
      <Reveal>
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-white/60">{subtitle}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CTAButton to={primary.to} testid={primary.testid}>{primary.label}</CTAButton>
          <CTAButton to={secondary.to} testid={secondary.testid} variant="secondary" icon={false}>{secondary.label}</CTAButton>
        </div>
      </Reveal>
    </div>
  </section>
);

// Deep dive for a single module: image + all features
export const ModuleDeepDive = ({ module, image, reverse = false }) => (
  <section className="px-6 py-20 lg:px-10">
    <div className={`mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 ${reverse ? "" : ""}`}>
      <Reveal className={reverse ? "lg:order-2" : ""}>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
          <img src={image} alt={module.title} className="h-[440px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute left-6 top-6 rounded-full px-4 py-1.5 text-xs font-semibold" style={{ backgroundColor: `${module.accent}dd`, color: "#fff" }}>{module.tag}</span>
        </div>
      </Reveal>
      <Reveal delay={0.1} className={reverse ? "lg:order-1" : ""}>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{module.tag}</span>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{module.title}</h2>
        <p className="mt-3 text-lg font-medium text-white/80">{module.tagline}</p>
        <p className="mt-3 leading-relaxed text-white/55">{module.description}</p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          {module.features.map((f) => (
            <div key={f} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
              <Icon name="Check" className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-xs text-white/70">{f}</span>
            </div>
          ))}
        </div>
        <CTAButton to="/signup" testid={`${module.id}-cta`} className="mt-8">{module.cta}</CTAButton>
      </Reveal>
    </div>
  </section>
);

export const StepList = ({ steps }) => (
  <div className="mx-auto max-w-7xl">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal key={s.step} delay={i * 0.08} className="relative rounded-3xl border border-white/10 bg-surface p-8">
          <span className="text-5xl font-semibold text-primary/25 font-display">{s.step}</span>
          <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
        </Reveal>
      ))}
    </div>
  </div>
);

export { SectionHeading };
