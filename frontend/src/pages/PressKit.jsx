import React from "react";
import { PageHero, Reveal, Icon } from "@/components/site/primitives";
import { toast } from "sonner";

const ASSETS = [
  { icon: "Image", title: "Logo Pack", text: "Primary, monochrome and app-icon logos in SVG & PNG." },
  { icon: "Palette", title: "Brand Colors", text: "Electric Orange #FF4B00 and the full palette guide." },
  { icon: "FileText", title: "Company Fact Sheet", text: "Key stats, milestones and leadership bios." },
  { icon: "Camera", title: "Product Screenshots", text: "High-resolution app and dashboard imagery." },
];

const PressKit = () => (
  <div>
    <PageHero eyebrow="Press Kit" title="Bikemates in the media." subtitle="Everything journalists and partners need to tell the Bikemates story.">
      <button data-testid="download-press-kit" onClick={() => toast.success("Press kit download starting soon.")} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">
        <Icon name="Download" className="h-4 w-4" /> Download full kit
      </button>
    </PageHero>
    <section className="px-6 pb-20 lg:px-10">
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        {ASSETS.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06} className="flex items-center justify-between rounded-3xl border border-white/10 bg-surface p-7">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary"><Icon name={a.icon} className="h-6 w-6" /></span>
              <div>
                <h3 className="text-base font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-white/55">{a.text}</p>
              </div>
            </div>
            <button data-testid={`press-download-${i}`} onClick={() => toast("Asset download starting soon.")} className="rounded-full border border-white/20 p-3 transition-colors hover:bg-white/5"><Icon name="Download" className="h-4 w-4" /></button>
          </Reveal>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-white/10 bg-surface p-8 text-center">
        <p className="text-sm text-white/55">Media enquiries</p>
        <a href="mailto:press@bikemates.in" className="mt-1 block text-lg font-semibold text-primary">press@bikemates.in</a>
      </div>
    </section>
  </div>
);

export default PressKit;
