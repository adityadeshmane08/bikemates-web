import React from "react";
import { motion } from "framer-motion";

/**
 * A handful of smoke puffs "left behind" along the bike's path.
 * Deliberately NOT a child of the moving bike rig: the bike exits the
 * screen while these stay in place, hold briefly, then fade — matching
 * "bike exits screen -> ~0.4s later smoke begins disappearing".
 */
export default function SmokeTrail({ direction = "left", rideMs = 1000, holdMs = 400, clearMs = 480, mobile = false }) {
  const total = rideMs + holdMs + clearMs;
  const count = mobile ? 4 : 6;
  const puffs = Array.from({ length: count });

  // Puffs are laid from the entry edge toward mid-line, mirroring which
  // side the rear wheel trails on as the bike crosses.
  const startPct = direction === "left" ? 4 : 96;
  const endPct = direction === "left" ? 56 : 44;
  const driftSign = direction === "left" ? -1 : 1;

  return (
    <div className="hero-cinematic__smoke-field" aria-hidden="true">
      {puffs.map((_, i) => {
        const n = Math.max(1, count - 1);
        const pos = startPct + ((endPct - startPct) * i) / n;

        // Strictly increasing keyframe times (0..1) built additively so
        // Framer Motion never receives an invalid/out-of-order times array.
        const emitAt = (i / n) * 0.5; // staggered emission while the bike rides
        const grownAt = Math.min(emitAt + 0.16, 0.9);
        const fadeAt = Math.min(Math.max(grownAt + 0.05, (rideMs + holdMs) / total), 0.97);

        return (
          <motion.span
            key={i}
            className="hero-cinematic__smoke-puff"
            style={{ left: `${pos}%` }}
            initial={{ opacity: 0, scale: 0.3, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0.55, 0.5, 0],
              scale: [0.3, 1, 1.5, 1.9],
              x: [0, driftSign * 10, driftSign * 20, driftSign * 32],
              y: [0, -6, -10, -18],
            }}
            transition={{
              duration: total / 1000,
              times: [emitAt, grownAt, fadeAt, 1],
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
