import React from "react";
import { PageHero, SectionHeading } from "@/components/site/primitives";
import { ModuleDeepDive, FinalCTA, StepList } from "@/components/site/sections";
import { MODULES, HOW_IT_WORKS, IMAGES } from "@/lib/data";

const RideSharing = () => {
  const sharer = MODULES.find((m) => m.id === "ride-sharer");
  const book = MODULES.find((m) => m.id === "book-ride");
  return (
    <div>
      <PageHero eyebrow="Ride Sharing" title="Share the ride. Split the cost." subtitle="Post your daily commute or grab a seat with a classmate — safe, tracked, and fuel-fair." />
      <ModuleDeepDive module={sharer} image={IMAGES.commute} />
      <div className="border-y border-white/10 bg-surface/30">
        <ModuleDeepDive module={book} image={IMAGES.campus} reverse />
      </div>
      <section className="px-6 py-24 lg:px-10">
        <SectionHeading eyebrow="How ride sharing works" title="Match, book, and ride together." align="center" className="mb-14" />
        <StepList steps={HOW_IT_WORKS} />
      </section>
      <FinalCTA title="Never commute alone again." subtitle="Find classmates going your way and cut your travel costs in half." />
    </div>
  );
};

export default RideSharing;
