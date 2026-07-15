import React from "react";
import { PageHero, Reveal } from "@/components/site/primitives";
import { FinalCTA } from "@/components/site/sections";
import { BLOG_POSTS } from "@/lib/data";
import { toast } from "sonner";

const Blog = () => (
  <div>
    <PageHero eyebrow="Blog" title="Stories from campus." subtitle="Insights on student mobility, safety, sustainability and building a trusted community." />
    <section className="px-6 pb-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <button onClick={() => toast("Full article coming soon.")} data-testid={`blog-post-${i}`} className="group block h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-surface text-left transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">{p.category}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{p.date}</span><span>•</span><span>{p.read} read</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">{p.title}</h3>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
    <FinalCTA title="Get campus insights in your inbox." subtitle="Join our newsletter for the latest from Bikemates." primary={{ to: "/contact", label: "Subscribe", testid: "blog-subscribe" }} secondary={{ to: "/", label: "Back home", testid: "blog-home" }} />
  </div>
);

export default Blog;
