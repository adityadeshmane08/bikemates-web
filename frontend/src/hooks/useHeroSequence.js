import { useEffect, useRef, useState, useCallback } from "react";

// Desktop timing (ms) — tuned so each bike-pass + reveal reads as one
// deliberate cinematic beat, not a slideshow.
const DESKTOP_TIMING = {
  ride: 1050, // time for a bike to cross the line, edge to edge
  smokeHold: 400, // spec: "after ~0.4s the smoke begins disappearing"
  smokeClear: 480, // spec: text waits until smoke has fully cleared
  reveal: 800, // text blur/opacity/scale reveal duration
  gap: 320, // pause before the next bike enters
  sweepDelay: 420, // pause after the last word settles, before the sweep
  sweep: 1100, // light-sweep duration across the finished heading
};

// Mobile timing — shorter + faster, per spec ("shorter animation, faster reveal")
const MOBILE_TIMING = {
  ride: 640,
  smokeHold: 220,
  smokeClear: 300,
  reveal: 520,
  gap: 180,
  sweepDelay: 220,
  sweep: 760,
};

function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Drives the hero's scene-by-scene timeline: ride -> clear -> reveal -> gap,
 * repeated per scene, then a final light sweep -> done.
 *
 * Runs once per mount (a full page refresh remounts Home.jsx and plays again,
 * matching the "plays once, replays on refresh" requirement — no
 * localStorage/sessionStorage flag is used on purpose).
 */
export function useHeroSequence(sceneCount = 3) {
  // Captured once at mount so a mid-animation resize can't restart the timeline.
  const isMobileRef = useRef(getIsMobile());
  const timing = isMobileRef.current ? MOBILE_TIMING : DESKTOP_TIMING;

  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState(() => (getReducedMotion() ? "done" : "ride"));
  const timeoutsRef = useRef([]);

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((fn, ms) => {
    timeoutsRef.current.push(setTimeout(fn, ms));
  }, []);

  // Jump straight to the final, fully-revealed state — no sweep, no bikes.
  const skip = useCallback(() => {
    clearTimers();
    setPhase("done");
  }, [clearTimers]);

  // "If user scrolls during animation, skip remaining sequence immediately."
  useEffect(() => {
    if (phase === "done") return undefined;
    const onScroll = () => skip();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase, skip]);

  useEffect(() => {
    if (getReducedMotion()) {
      setPhase("done");
      return undefined;
    }

    const runScene = (i) => {
      setSceneIndex(i);
      setPhase("ride");
      schedule(() => {
        setPhase("clear");
        schedule(() => {
          setPhase("reveal");
          schedule(() => {
            if (i < sceneCount - 1) {
              setPhase("gap");
              schedule(() => runScene(i + 1), timing.gap);
            } else {
              schedule(() => {
                setPhase("sweep");
                schedule(() => setPhase("done"), timing.sweep);
              }, timing.sweepDelay);
            }
          }, timing.reveal);
        }, timing.smokeClear);
      }, timing.ride + timing.smokeHold);
    };

    runScene(0);
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sceneIndex, phase, isMobile: isMobileRef.current, timing, skip };
}
