import React from "react";
import { motion } from "framer-motion";

const RIM_COLOR = "#FF7A33";

// A minimal, spec-accurate motorcycle silhouette rather than an attempt at
// photoreal art: filled shapes + gradient + rim-light glow, in the same
// dramatic-silhouette language premium motorcycle/auto marketing actually
// uses for hero shots. Swap these paths for real bike photography/video
// later without touching any of the animation logic below.
//
// Raw path data only (no fill/stroke baked in) so the SAME outline can be
// rendered twice: once as a blurred orange stroke (the rim-light glow) and
// once as the solid gradient body on top of it.
const BODY_PATHS = {
  sport: "M58,94 C50,78 56,58 82,50 C104,44 128,36 156,39 C180,41 198,50 207,60 C216,69 218,80 209,90 C199,100 178,97 168,93 C148,86 108,87 88,92 C76,95 64,97 58,94 Z",
  streetfighter: "M56,92 C50,74 60,56 86,50 C108,45 130,44 152,46 C176,48 196,54 206,64 C214,72 214,82 204,90 C194,98 174,96 162,92 C142,86 104,88 86,92 C74,95 62,96 56,92 Z",
  tourer: "M54,92 C48,76 54,58 78,50 C96,44 116,40 140,40 C168,40 196,46 212,58 C220,65 220,78 210,88 C200,98 180,96 168,92 C146,85 100,87 82,92 C70,95 60,96 54,92 Z",
};

// A small accent detail per silhouette (windscreen / mirror / saddlebag hint)
const ACCENTS = {
  sport: <path d="M150,40 C165,34 180,36 190,44" fill="none" stroke="#111" strokeWidth="10" strokeLinecap="round" opacity="0.9" />,
  streetfighter: <path d="M198,44 L214,40" stroke="#111" strokeWidth="6" strokeLinecap="round" />,
  tourer: <rect x="196" y="46" width="20" height="14" rx="4" fill="#111" opacity="0.85" />,
};

const HEADLIGHTS = {
  sport: { cx: 205, cy: 62 },
  streetfighter: { cx: 200, cy: 56 },
  tourer: { cx: 206, cy: 60 },
};

function Wheel({ cx, uid }) {
  return (
    <motion.g
      style={{ originX: `${cx}px`, originY: "96px" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
    >
      <circle cx={cx} cy={96} r={26} fill="#0c0c0c" stroke="#2a2a2a" strokeWidth="3" />
      <circle cx={cx} cy={96} r={9} fill="#161616" stroke={RIM_COLOR} strokeWidth="1.4" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={`${uid}-${deg}`}
          x1={cx}
          y1={96}
          x2={cx + 24 * Math.cos((deg * Math.PI) / 180)}
          y2={96 + 24 * Math.sin((deg * Math.PI) / 180)}
          stroke="#3a3a3a"
          strokeWidth="1.4"
        />
      ))}
    </motion.g>
  );
}

export default function AnimatedBike({ variant = "sport", direction = "left", durationMs = 1000, mobile = false }) {
  const mirrored = direction === "right";
  const enterX = direction === "left" ? "-130%" : "130%";
  const exitX = direction === "left" ? "130%" : "-130%";
  const light = HEADLIGHTS[variant];
  const filterId = `bmGlow-${variant}`;

  return (
    <motion.div
      className="hero-cinematic__bike-rig"
      initial={{ x: enterX, filter: "blur(0px)" }}
      animate={{
        x: [enterX, "0%", exitX],
        filter: ["blur(0px)", "blur(1.5px)", "blur(1.5px)", "blur(0px)"],
      }}
      transition={{
        duration: durationMs / 1000,
        ease: [0.22, 0.61, 0.36, 1], // realistic launch + hold-speed, no bounce
        times: [0, 0.45, 0.8, 1],
      }}
    >
      {/* Suspension: small independent bounce/lean layered on top of the travel motion */}
      <motion.div
        style={{ width: "100%", height: "100%", transform: mirrored ? "scaleX(-1)" : "none" }}
        animate={{ y: [0, -2, 1, -1.5, 0], rotate: [0, -0.6, 0.4, -0.3, 0] }}
        transition={{ duration: durationMs / 1000 / 3, repeat: 3, ease: "easeInOut" }}
      >
        {!mobile && (
          <div className="hero-cinematic__speedlines" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}

        <svg viewBox="0 0 260 130" width="100%" height="100%" fill="none">
          <defs>
            <linearGradient id="bmBodyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#232323" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Orange rim-light glow, sitting behind the body (same outline, stroked + blurred) */}
          <path d={BODY_PATHS[variant]} fill="none" stroke={RIM_COLOR} strokeWidth="2.5" opacity="0.55" filter={`url(#${filterId})`} />

          <Wheel cx={62} uid={`${variant}-f`} />
          <Wheel cx={236} uid={`${variant}-r`} />
          <path d={BODY_PATHS[variant]} fill="url(#bmBodyGrad)" />
          {ACCENTS[variant]}

          {/* Headlight glow */}
          <motion.circle
            cx={light.cx}
            cy={light.cy}
            r="14"
            fill={RIM_COLOR}
            style={{ filter: "blur(6px)" }}
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
          <ellipse cx={light.cx} cy={light.cy} rx="8" ry="6" fill="#FFD9A8" opacity="0.95" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
