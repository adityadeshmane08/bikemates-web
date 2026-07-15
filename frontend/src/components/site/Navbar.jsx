import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, MORE_LINKS } from "@/lib/data";
import { CTAButton } from "@/components/site/primitives";
import { Logo } from "@/components/site/Logo";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMoreOpen(false); }, [pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "glass border-b border-white/10" : "bg-transparent"}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Logo className="h-10" testid="nav-logo" />

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${pathname === l.to ? "text-white" : "text-white/60 hover:text-white"}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="relative" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button data-testid="nav-more" className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:text-white">
              More <ChevronDown className="h-4 w-4" />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full w-64 pt-3">
                <div className="glass grid grid-cols-1 gap-1 rounded-2xl p-2 shadow-2xl">
                  {MORE_LINKS.map((l) => (
                    <Link key={l.to} to={l.to} data-testid={`nav-more-${l.label.toLowerCase().replace(/\s+/g, "-")}`} className="rounded-xl px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" data-testid="nav-login" className="text-sm font-medium text-white/70 transition-colors hover:text-white">Log in</Link>
          <CTAButton to="/signup" testid="nav-signup" icon={false} className="px-5 py-2.5">Get Started</CTAButton>
        </div>

        <button data-testid="nav-mobile-toggle" onClick={() => setOpen(!open)} className="lg:hidden text-white">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div data-testid="mobile-menu" className="glass border-t border-white/10 lg:hidden">
          <div className="max-h-[70vh] space-y-1 overflow-y-auto px-6 py-4">
            {[...NAV_LINKS, ...MORE_LINKS].map((l) => (
              <Link key={l.to} to={l.to} className="block rounded-xl px-4 py-3 text-sm font-medium text-white/75 hover:bg-white/5">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3">
              <CTAButton to="/login" variant="secondary" icon={false} className="flex-1">Log in</CTAButton>
              <CTAButton to="/signup" icon={false} className="flex-1">Get Started</CTAButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
