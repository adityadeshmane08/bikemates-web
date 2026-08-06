import React from "react";
import { motion } from "framer-motion";

// Same "premium" ease already used by the site's own <Reveal> primitive
// (components/site/primitives.jsx) — kept identical so this feels like the
// same design system, not a bolted-on effect.
const EASE = [0.22, 1, 0.36, 1];

const VARIANTS = {
  hidden: { opacity: 0, filter: "blur(30px) brightness(0.2)", scale: 1.04 },
  revealing: (durationMs) => ({
    opacity: 1,
    filter: "blur(0px) brightness(1)",
    scale: 1,
    transition: { duration: durationMs / 1000, ease: EASE },
  }),
  // Instant (0ms) — used both for the natural end-of-reveal resting state
  // and for an immediate "skip" jump straight to the finished heading.
  settled: { opacity: 1, filter: "blur(0px) brightness(1)", scale: 1, transition: { duration: 0.01 } },
};

export default function RevealText({ children, state = "hidden", durationMs = 800, className = "" }) {
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
      initial="hidden"
      animate={state === "revealing" ? "revealing" : state}
      custom={durationMs}
      variants={VARIANTS}
    >
      {children}
    </motion.span>
  );
}
