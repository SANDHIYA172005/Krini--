import Lenis from "lenis";
import { gsapReady, prefersReducedMotion, type Disposer } from "./env";

export type Scroller = {
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
  velocity: () => number;
};

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and the
 * scroll position always update in the same frame. Falls back to native
 * scrolling when the visitor prefers reduced motion.
 */
export function initSmoothScroll(d: Disposer): Scroller {
  const { gsap, ScrollTrigger } = gsapReady();
  const navOffset = () => -(document.querySelector<HTMLElement>("[data-nav]")?.offsetHeight ?? 64);

  if (prefersReducedMotion()) {
    return {
      scrollTo: (target, opts) => {
        const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
        if (typeof el === "number") window.scrollTo({ top: el });
        else el?.scrollIntoView({ block: "start" });
        void opts;
      },
      stop: () => (document.documentElement.style.overflow = "hidden"),
      start: () => (document.documentElement.style.overflow = ""),
      velocity: () => 0,
    };
  }

  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true, syncTouch: false });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  d.add(() => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  });

  const scroller: Scroller = {
    scrollTo: (target, opts) => lenis.scrollTo(target, { offset: opts?.offset ?? navOffset(), immediate: opts?.immediate, duration: 1.6 }),
    stop: () => lenis.stop(),
    start: () => lenis.start(),
    velocity: () => lenis.velocity * 60,
  };
  (window as unknown as { __scroller?: Scroller }).__scroller = scroller;
  const onStop = () => lenis.stop();
  const onStart = () => lenis.start();
  window.addEventListener("scroller:stop", onStop);
  window.addEventListener("scroller:start", onStart);
  d.add(() => {
    window.removeEventListener("scroller:stop", onStop);
    window.removeEventListener("scroller:start", onStart);
    delete (window as unknown as { __scroller?: Scroller }).__scroller;
  });

  return scroller;
}

/**
 * In-page anchor links scroll smoothly and move focus for keyboard users.
 * "#top" and the footer's back-to-top (data-back-to-top; without scripts it
 * jumps to #main, the top of the page) go to the very top, and the footer's
 * puts focus on the home link in the top bar.
 */
export function initAnchors(d: Disposer, scroller: Scroller) {
  const onClick = (e: Event) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href")!;
    if (id.length < 2) return;
    if (id === "#top" || a.hasAttribute("data-back-to-top")) {
      e.preventDefault();
      scroller.scrollTo(0);
      if (a.closest("footer")) document.querySelector<HTMLElement>("[data-nav] a[href]:not([href^='#'])")?.focus({ preventScroll: true });
      history.replaceState(null, "", location.pathname + location.search);
      return;
    }
    const target = document.querySelector<HTMLElement>(id);
    if (!target) return;
    e.preventDefault();
    scroller.scrollTo(target);
    if (!a.hasAttribute("data-enquire")) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
    history.replaceState(null, "", id);
  };
  d.on(document, "click", onClick);
}
