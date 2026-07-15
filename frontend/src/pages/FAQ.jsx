import React from "react";
import { PageHero } from "@/components/site/primitives";
import { FinalCTA } from "@/components/site/sections";
import { FAQS } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => (
  <div>
    <PageHero eyebrow="FAQ" title="Everything you're wondering." subtitle="Can't find your answer? Reach out any time via Support or Contact." />
    <section className="px-6 pb-24 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible data-testid="faq-accordion">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-white/55">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
    <FinalCTA title="Still have questions?" subtitle="Our student support team is here 24/7." primary={{ to: "/contact", label: "Contact us", testid: "faq-contact" }} secondary={{ to: "/support", label: "Visit Support", testid: "faq-support" }} />
  </div>
);

export default FAQ;
