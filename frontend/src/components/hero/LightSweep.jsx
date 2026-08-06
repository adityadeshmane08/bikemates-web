import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LightSweep({ active = false, durationMs = 1100 }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="hero-cinematic__sweep" aria-hidden="true">
          <motion.div
            className="hero-cinematic__sweep-bar"
            initial={{ x: "-30%", opacity: 0 }}
            animate={{ x: "130%", opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: durationMs / 1000, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
