import React from "react";
import "@/styles/hero-cinematic.css";
import { useHeroSequence } from "@/hooks/useHeroSequence";
import AnimatedBike from "@/components/hero/AnimatedBike";
import SmokeTrail from "@/components/hero/SmokeTrail";
import RevealText from "@/components/hero/RevealText";
import LightSweep from "@/components/hero/LightSweep";

// Matches the existing hero copy exactly (India's Next / Mobility / Network.)
// — three scenes, one bike pass each, per the brief.
const SCENES = [
  { text: "India's Next", bike: "sport", direction: "left", accent: false },
  { text: "Mobility", bike: "streetfighter", direction: "right", accent: true },
  { text: "Network.", bike: "tourer", direction: "left", accent: true },
];

export default function HeroCinematic({ className = "" }) {
  const { sceneIndex, phase, isMobile, timing } = useHeroSequence(SCENES.length);

  const getWordState = (i) => {
    if (phase === "done") return "settled"; // covers natural completion AND skip
    if (i < sceneIndex) return "settled";
    if (i === sceneIndex && phase === "reveal") return "revealing";
    if (i === sceneIndex && (phase === "gap" || phase === "sweep")) return "settled";
    return "hidden";
  };

  const showBike = (i) => i === sceneIndex && (phase === "ride" || phase === "clear");

  return (
    <h1 className={`hero-cinematic ${className}`} data-testid="hero-cinematic-heading">
      {/* Always-present accessible text — the animation below is purely decorative */}
      <span className="sr-only">India's Next Mobility Network.</span>

      <div className="hero-cinematic__backdrop" aria-hidden="true" />

      {!isMobile && (
        <div aria-hidden="true">
          {[...Array(9)].map((_, i) => (
            <span
              key={i}
              className="hero-cinematic__particle"
              style={{ left: `${6 + i * 11}%`, top: `${10 + (i % 4) * 22}%`, animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>
      )}

      <div className="hero-cinematic__lines" aria-hidden="true">
        {SCENES.map((scene, i) => (
          <div className="hero-cinematic__line" key={scene.text}>
            {showBike(i) && (
              <>
                <AnimatedBike variant={scene.bike} direction={scene.direction} durationMs={timing.ride} mobile={isMobile} />
                <SmokeTrail
                  direction={scene.direction}
                  rideMs={timing.ride}
                  holdMs={timing.smokeHold}
                  clearMs={timing.smokeClear}
                  mobile={isMobile}
                />
              </>
            )}
            <RevealText state={getWordState(i)} durationMs={timing.reveal} className={scene.accent ? "text-gradient" : ""}>
              {scene.text}
            </RevealText>
          </div>
        ))}
      </div>

      <LightSweep active={phase === "sweep"} durationMs={timing.sweep} />
    </h1>
  );
}
