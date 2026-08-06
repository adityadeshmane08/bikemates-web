import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

// Dynamic lucide icon
export const Icon = ({ name, className = "", ...props }) => {
  const Cmp = Icons[name] || Icons.Circle;
  return <Cmp className={className} {...props} />;
};

// Scroll reveal wrapper (staggered fade-up)
export const Reveal = ({ children, delay = 0, y = 28, className = "", as = "div" }) => {
  const M = motion[as] || motion.div;
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </M>
  );
};

// Animated number counter
export const Counter = ({ value, prefix = "", suffix = "", format }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        let out;
        if (format === "compact") {
          out = v >= 1000000 ? (v / 1000000).toFixed(1) + "M" : Math.round(v).toLocaleString("en-IN");
        } else {
          out = Math.round(v).toLocaleString("en-IN");
        }
        setDisplay(out);
      },
    });
    return () => controls.stop();
  }, [inView, value, format]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
};

// Primary / secondary pill buttons that route
export const CTAButton = ({ to, children, variant = "primary", className = "", onClick, testid, icon = true }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black";
  const variants = {
    primary: "bg-primary text-white hover:shadow-[0_0_28px_rgba(255,75,0,0.45)] hover:bg-[#E64300]",
    secondary: "border border-white/20 text-white hover:bg-white/5",
    ghost: "text-white/80 hover:text-white",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon && <ArrowRight className="h-4 w-4" />}
    </>
  );
  if (to) return <Link to={to} data-testid={testid} className={cls}>{content}</Link>;
  return <button type="button" onClick={onClick} data-testid={testid} className={cls}>{content}</button>;
};

// Section eyebrow + heading
export const SectionHeading = ({ eyebrow, title, subtitle, align = "left", className = "" }) => (
  <div className={`${align === "center" ? "mx-auto text-center max-w-3xl" : "max-w-3xl"} ${className}`}>
    {eyebrow && (
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
      </Reveal>
    )}
    <Reveal delay={0.05}>
      <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={0.1}>
        <p className="mt-4 text-base leading-relaxed text-white/55 sm:text-lg">{subtitle}</p>
      </Reveal>
    )}
  </div>
);

// Page hero used by inner pages
export const PageHero = ({ eyebrow, title, subtitle, children }) => {
  const words = typeof title === "string" ? title.split(" ") : null;
  return (
    <section className="relative overflow-hidden px-6 pt-40 pb-20 lg:px-10">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[720px] -translate-x-1/2 radial-glow"
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-primary/50"
          style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 18}%` }}
          animate={{ y: [0, -14, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}
      <div className="relative mx-auto max-w-5xl text-center">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 16, skewX: -6 }}
            animate={{ opacity: 1, y: 0, skewX: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            {eyebrow}
          </motion.span>
        )}
        <h1 className="mt-6 overflow-hidden text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          {words ? (
            words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.07 }}
              >
                {w}{i < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))
          ) : (
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{title}</motion.span>
          )}
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + (words ? words.length * 0.07 : 0), ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >{subtitle}</motion.p>
        )}
      {children}
      </div>
    </section>
  );
};
