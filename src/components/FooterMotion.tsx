"use client";

import { useEffect } from "react";

/**
 * The footer's motion (Footer.tsx, theme.css "Footer, animated"): marks the
 * footer `is-in` the first time it scrolls into view (the columns rise in one
 * after another and the big KRINI CRUDE fills with gold), and keeps the back
 * to top ring showing how far down the page the visitor is (--ft-p, 0 → 1).
 * Without JavaScript, or with reduced motion, everything simply shows.
 */
export function FooterMotion() {
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>("[data-ft3]");
    if (!footer) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      footer.classList.add("is-in");
    }
    const io =
      !reduce && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                footer.classList.add("is-in");
                io?.disconnect();
              }
            },
            { threshold: 0.15 },
          )
        : null;
    io?.observe(footer);

    let raf = 0;
    const paint = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      footer.style.setProperty("--ft-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
