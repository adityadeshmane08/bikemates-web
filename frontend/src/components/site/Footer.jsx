import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Youtube, Apple, Play } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";

const cols = [
  { title: "Platform", links: [["Bike Rental", "/bike-rental"], ["Ride Sharing", "/ride-sharing"], ["Features", "/features"], ["How It Works", "/how-it-works"], ["Pricing", "/pricing"]] },
  { title: "Company", links: [["About", "/about"], ["Careers", "/careers"], ["Blog", "/blog"], ["Press Kit", "/press-kit"], ["Partner Colleges", "/partner-colleges"]] },
  { title: "Resources", links: [["Safety", "/safety"], ["Insurance", "/insurance"], ["Support", "/support"], ["FAQ", "/faq"], ["Refer & Earn", "/refer-earn"]] },
  { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms & Conditions", "/terms"], ["Refund Policy", "/refund"], ["Campus Ambassador", "/campus-ambassador"], ["Contact", "/contact"]] },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed! Welcome to the Bikemates community.");
    setEmail("");
  };
  return (
    <footer data-testid="site-footer" className="relative border-t border-white/10 bg-[#050505] px-6 pt-20 pb-10 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-14" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              India’s first student-only platform for bike rentals and ride sharing. Trusted campus mobility, built for students.
            </p>
            <form onSubmit={subscribe} className="mt-6 flex max-w-sm gap-2" data-testid="footer-newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                data-testid="footer-newsletter-input"
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
              />
              <button type="submit" data-testid="footer-newsletter-submit" className="whitespace-nowrap rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#E64300]">
                Subscribe
              </button>
            </form>
            <div className="mt-6 flex gap-3">
              <button data-testid="download-app-store" onClick={() => toast("App launching soon on the App Store.")} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10">
                <Apple className="h-5 w-5" /> App Store
              </button>
              <button data-testid="download-play-store" onClick={() => toast("App launching soon on Google Play.")} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10">
                <Play className="h-5 w-5" /> Google Play
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                <ul className="mt-4 space-y-3">
                  {c.links.map(([label, to]) => (
                    <li key={to}>
                      <Link to={to} className="text-sm text-white/50 transition-colors hover:text-primary">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">© 2025 Bikemates Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            {[Twitter, Instagram, Linkedin, Youtube].map((I, i) => (
              <a key={i} href="#" data-testid={`social-link-${i}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-primary hover:text-primary">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
