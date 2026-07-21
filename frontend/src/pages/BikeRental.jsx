import React from "react";
import { PageHero, SectionHeading } from "@/components/site/primitives";
import { ModuleDeepDive, FinalCTA, StepList } from "@/components/site/sections";
import { MODULES, HOW_IT_WORKS, IMAGES } from "@/lib/data";

const BikeRental = () => {
  const owner = MODULES.find((m) => m.id === "bike-owner");
  const rent = MODULES.find((m) => m.id === "rent-bike");
  return (
    <div>
      <PageHero eyebrow="Bike Rental" title="Need it ? Rent . Have it ? Earn." subtitle="A trusted, insured, GPS-tracked bike rental marketplace built exclusively for verified students." />
      <ModuleDeepDive module={rent} image={IMAGES.commute} />
      <div className="border-y border-white/10 bg-surface/30">
        <ModuleDeepDive module={owner} image={IMAGES.hero} reverse />
      </div>
      <section className="px-6 py-24 lg:px-10">
        <SectionHeading eyebrow="How rentals work" title="Book or list in four simple steps." align="center" className="mb-14" />
        <StepList steps={HOW_IT_WORKS} />
      </section>
      <FinalCTA title="Your next ride is on campus." subtitle="Rent instantly or start earning from your idle bike today." />
    </div>
  );
};

export default BikeRental;
