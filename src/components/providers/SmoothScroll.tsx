"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** Access the Lenis instance (null when reduced motion is preferred). */
export const useLenis = () => useContext(LenisContext);

/**
 * Smooth, inertial scrolling with Lenis. Disabled entirely when the visitor
 * prefers reduced motion. Also sets Framer Motion to respect that preference.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: 0, duration: 1.6 },
      autoRaf: true,
    });
    // publish on the next frame (avoids a synchronous re-render inside the effect)
    const frame = requestAnimationFrame(() => setLenis(instance));
    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}

/** Scroll to an in-page anchor, using Lenis when it is active. */
export function scrollToHash(lenis: Lenis | null, hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else target.scrollIntoView({ behavior: "auto" });
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}
