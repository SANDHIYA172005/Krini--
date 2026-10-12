import { Disposer, gsapReady, prefersReducedMotion } from "./env";
import { initAnchors, initSmoothScroll } from "./smooth";
import { initScrollHero } from "./scrollhero";
import { initShowroom } from "./showroom";
import { initReveals } from "./reveal";
import { initFit } from "./fit";
import { initCinema } from "./cinema";
import { initProcess } from "./process";
import { initQuickBar, initSwipe } from "./mobile";
import { initCopy, initCursor, initEnquiry, initFilters, initMagnetic, initNav, initPipeline, initProducts } from "./interactions";

/**
 * Attaches all behaviour to the server-rendered page, whichever page it is:
 * each part looks for its own markup and does nothing when it isn't there.
 * Framework-agnostic: Next.js calls it from a client component; the static
 * preview calls it directly. Returns a cleanup function.
 */
export function initSite() {
  const d = new Disposer();
  const root = document.documentElement;
  root.classList.add("js");
  // the published preview's home page is wrapped by its host, which may not say the language;
  // justified paragraphs need it to hyphenate
  if (!root.lang) root.lang = "en-IN";
  if (!prefersReducedMotion()) root.classList.add("motion");
  d.add(() => root.classList.remove("motion", "js"));

  const { ScrollTrigger } = gsapReady();
  const scroller = initSmoothScroll(d);
  initAnchors(d, scroller);
  initNav(d, scroller);
  initScrollHero(d, scroller);
  initShowroom(d, scroller);
  initFit(d);
  initReveals(d);
  initCinema(d);
  initProducts(d);
  initPipeline(d);
  initMagnetic(d);
  initCursor(d);
  initCopy(d);
  initEnquiry(d, scroller);
  initFilters(d);
  initProcess(d, scroller);
  initSwipe(d);
  initQuickBar(d);

  // Images and fonts change layout after load; recalculate trigger positions.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { once: true });
  document.fonts?.ready.then(refresh).catch(() => undefined);
  d.add(() => window.removeEventListener("load", refresh));

  // Deep link: honour an initial #hash after layout settles
  if (location.hash.length > 1) {
    const target = document.querySelector<HTMLElement>(location.hash);
    if (target) window.setTimeout(() => scroller.scrollTo(target, { immediate: true }), 50);
  }

  return () => {
    d.dispose();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
