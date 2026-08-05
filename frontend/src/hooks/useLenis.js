import { useEffect, useRef } from "react";
import Lenis from "lenis";
 
/**
 * useLenis — Global smooth scrolling hook for the entire BikeMates website.
 */
export const useLenis = () => {
  const lenisRef = useRef(null);
 
  useEffect(() => {
    // Initialize Lenis with premium settings
    const lenis = new Lenis({
      duration: 1.2, // Smoothness duration in seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential out easing
      smoothWheel: true,
      smoothTouch: false, // Keep native touch scroll on mobile
      touchMultiplier: 2,
      infinite: false,
    });
 
    lenisRef.current = lenis;
 
    // Connect Lenis to Framer Motion's scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
 
    // Handle anchor links smoothly
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -80, duration: 1.5 });
        }
      });
    });
 
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
 
  return lenisRef;
};
 
export const LenisProvider = ({ children }) => {
  useLenis();
  return <>{children}</>;
};
