import React from "react";

// Fixed aerial night-city backdrop for the public marketing site only.
// Sits behind Navbar/content (z-0), stays in place while pages scroll over it.
// Pure SVG + CSS animation — no images, no JS render loop.
export const CityBackground = () => (
  <div className="city-bg" aria-hidden="true">
    <svg viewBox="0 0 1000 1400" preserveAspectRatio="xMidYMid slice">
      <g>
        <path className="city-road" d="M0,150 L1000,180" />
        <path className="city-road" d="M0,340 L1000,300" />
        <path className="city-road" d="M0,520 L1000,560" />
        <path className="city-road" d="M0,720 L1000,690" />
        <path className="city-road" d="M0,900 L1000,940" />
        <path className="city-road" d="M0,1100 L1000,1080" />
        <path className="city-road" d="M0,1280 L1000,1300" />

        <path className="city-road" d="M120,0 L90,1400" />
        <path className="city-road" d="M320,0 L360,1400" />
        <path className="city-road" d="M520,0 L500,1400" />
        <path className="city-road" d="M720,0 L760,1400" />
        <path className="city-road" d="M900,0 L880,1400" />

        <path className="city-road city-road--minor" d="M120,150 L320,340 L520,300" />
        <path className="city-road city-road--minor" d="M320,520 L520,560 L720,690" />
        <path className="city-road city-road--minor" d="M520,900 L720,940 L900,1080" />
        <path className="city-road city-road--minor" d="M90,720 L360,690 L500,900" />
        <path className="city-road city-road--minor" d="M760,150 L880,520" />
      </g>

      <g>
        <rect className="city-building" x="150" y="180" width="60" height="90" rx="4" />
        <rect className="city-building city-building--lit" x="230" y="200" width="40" height="70" rx="4" />
        <rect className="city-building" x="380" y="60" width="70" height="60" rx="4" />
        <rect className="city-building" x="560" y="200" width="90" height="70" rx="4" />
        <rect className="city-building city-building--lit" x="150" y="380" width="50" height="100" rx="4" />
        <rect className="city-building" x="360" y="380" width="80" height="90" rx="4" />
        <rect className="city-building" x="560" y="360" width="60" height="120" rx="4" />
        <rect className="city-building city-building--lit" x="780" y="200" width="70" height="90" rx="4" />
        <rect className="city-building" x="150" y="580" width="90" height="80" rx="4" />
        <rect className="city-building" x="380" y="600" width="60" height="60" rx="4" />
        <rect className="city-building city-building--lit" x="580" y="600" width="70" height="60" rx="4" />
        <rect className="city-building" x="780" y="580" width="60" height="90" rx="4" />
        <rect className="city-building" x="150" y="780" width="70" height="80" rx="4" />
        <rect className="city-building city-building--lit" x="380" y="760" width="90" height="100" rx="4" />
        <rect className="city-building" x="600" y="780" width="60" height="70" rx="4" />
        <rect className="city-building" x="800" y="770" width="60" height="90" rx="4" />
        <rect className="city-building" x="150" y="960" width="60" height="90" rx="4" />
        <rect className="city-building city-building--lit" x="400" y="980" width="70" height="70" rx="4" />
        <rect className="city-building" x="600" y="1000" width="90" height="60" rx="4" />
        <rect className="city-building" x="800" y="960" width="60" height="90" rx="4" />
        <rect className="city-building city-building--lit" x="180" y="1160" width="70" height="80" rx="4" />
        <rect className="city-building" x="400" y="1180" width="60" height="60" rx="4" />
        <rect className="city-building" x="600" y="1160" width="80" height="90" rx="4" />
      </g>

      <g className="city-blip">
        <circle r="3.2">
          <animateMotion dur="14s" repeatCount="indefinite" path="M0,150 L1000,180" rotate="auto" />
        </circle>
      </g>
      <g className="city-blip">
        <circle r="3">
          <animateMotion dur="11s" repeatCount="indefinite" path="M320,0 L360,1400" rotate="auto" begin="2s" />
        </circle>
      </g>
      <g className="city-blip">
        <circle r="3">
          <animateMotion dur="16s" repeatCount="indefinite" path="M1000,690 L0,720" rotate="auto" begin="1s" />
        </circle>
      </g>
      <g className="city-blip">
        <circle r="2.8">
          <animateMotion dur="12s" repeatCount="indefinite" path="M720,0 L760,1400" rotate="auto" begin="4s" />
        </circle>
      </g>
      <g className="city-blip">
        <circle r="3">
          <animateMotion dur="18s" repeatCount="indefinite" path="M1000,940 L0,900" rotate="auto" begin="6s" />
        </circle>
      </g>
      <g className="city-blip">
        <circle r="2.6">
          <animateMotion dur="13s" repeatCount="indefinite" path="M120,0 L90,1400" rotate="auto" begin="3s" />
        </circle>
      </g>
    </svg>
    <div className="city-bg__vignette" />
  </div>
);
