import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, scrollPercent)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  const glowIntensity = useTransform(smoothProgress, [0, 0.5, 1], [0.3, 0.5, 1]);
  const glowScale = useTransform(smoothProgress, [0, 1], [4, 12]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none" data-lenis-prevent>
      <div className="h-[2px] w-full bg-white/[0.03]" />
      <motion.div
        className="absolute top-0 left-0 h-[2px] origin-left"
        style={{
          width: "100%",
          scaleX: smoothProgress,
          background: "linear-gradient(90deg, #FF4B00, #FF7A33, #FF4B00)",
          boxShadow: `0 0 ${glowScale}px rgba(255, 75, 0, ${glowIntensity})`,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: smoothProgress }}
      />
    </div>
  );
};

export default ScrollProgress;
