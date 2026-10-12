import { prefersReducedMotion, type Disposer } from "./env";
import type { Scroller } from "./smooth";

const pad = (n: number) => String(n).padStart(2, "0");
const saveData = () => Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/**
 * Loads a clip whose addresses wait in data-src (1280 wide) and data-src-small
 * (960 wide): the small one when the frame is under 1150 device pixels wide
 * (phones; desktops at 1x), so no more is fetched than the screen can show.
 * Its poster (data-poster) loads too; with Save-Data or reduced motion only the
 * poster does (the clip would not play anyway with reduced motion).
 */
const load = (v: HTMLVideoElement | null) => {
  if (!v) return;
  if (v.dataset.poster && !v.getAttribute("poster")) v.poster = v.dataset.poster;
  if (v.getAttribute("src") || !v.dataset.src || saveData() || prefersReducedMotion()) return;
  const px = (v.getBoundingClientRect().width || v.parentElement?.getBoundingClientRect().width || 0) * (window.devicePixelRatio || 1);
  v.src = px < 1150 && v.dataset.srcSmall ? v.dataset.srcSmall : v.dataset.src;
  v.preload = "auto";
};
const play = (v: HTMLVideoElement | null) => {
  if (!v || !v.getAttribute("src")) return;
  v.muted = true;
  v.play().catch(() => undefined);
};

/**
 * How it's made (Process.tsx, ProcessFlow): the step that has crossed the
 * reading line is the one shown. Its picture fades in over the last one, its
 * clip plays (every other clip is paused), the clips either side of it load,
 * and the bar under the frame marks it and fills the steps before it. The
 * reading line is half way down the screen from 1024px; on phones and
 * tablets, where the frame stays at the top, it is a third of the way down
 * what is left below the frame. The bar's steps scroll to their step, clear
 * of the frame. Off screen, the clip pauses. With reduced motion or Save-Data
 * the clips don't load or play: each step shows its first frame (the poster).
 */
export function initProcess(d: Disposer, scroller: Scroller) {
  const root = document.querySelector<HTMLElement>("[data-process]");
  if (!root) return;
  const shots = Array.from(root.querySelectorAll<HTMLElement>("[data-process-shot]"));
  const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-process-step]"));
  const ticks = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-process-jump]"));
  const now = root.querySelector<HTMLElement>("[data-process-now]");
  const stage = root.querySelector<HTMLElement>(".process-stage");
  const videos = shots.map((s) => s.querySelector<HTMLVideoElement>("video"));
  const wide = window.matchMedia("(min-width: 1024px)");
  const still = prefersReducedMotion();
  const n = steps.length;
  let active = -1;
  let inView = false;
  let near = false;

  const sync = () => {
    videos.forEach((v, k) => {
      if (!v) return;
      if (k === active && inView && !still) play(v);
      else if (!v.paused) v.pause();
    });
  };
  const setActive = (i: number) => {
    if (i === active) return;
    active = i;
    shots.forEach((s, k) => s.classList.toggle("is-on", k === i));
    steps.forEach((s, k) => s.classList.toggle("is-on", k === i));
    ticks.forEach((t, k) => {
      t.classList.toggle("is-on", k === i);
      t.classList.toggle("is-done", k < i);
      if (k === i) t.setAttribute("aria-current", "step");
      else t.removeAttribute("aria-current");
    });
    if (now) now.textContent = `${pad(i + 1)} / ${pad(n)} · ${steps[i].dataset.place ?? ""}`;
    loadAround();
    sync();
  };
  /** The active step's clip and those either side of it, once the section is within a screen. */
  const loadAround = () => {
    if (!near || active < 0) return;
    for (const k of [active, active + 1, active - 1]) if (k >= 0 && k < n) load(videos[k]);
  };

  /** Where the reading line is, in viewport pixels. */
  const line = () => {
    if (wide.matches) return window.innerHeight * 0.5;
    const top = stage ? stage.getBoundingClientRect().bottom : 0;
    return top + (window.innerHeight - top) * 0.33;
  };
  const pick = () => {
    const y = line();
    let idx = 0;
    steps.forEach((s, k) => {
      if (s.getBoundingClientRect().top <= y) idx = k;
    });
    setActive(idx);
  };
  let raf = 0;
  const onScroll = () => {
    if (!raf)
      raf = requestAnimationFrame(() => {
        raf = 0;
        pick();
      });
  };
  d.on(window, "scroll", onScroll, { passive: true });
  d.on(window, "resize", onScroll);
  d.add(() => cancelAnimationFrame(raf));

  // the bar's steps: scroll to the step, clear of the frame on phones (and of the top bar)
  ticks.forEach((t, k) =>
    d.on(t, "click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const nav = document.querySelector<HTMLElement>("[data-nav]")?.offsetHeight ?? 64;
      const offset = wide.matches ? -(window.innerHeight * 0.5 - 40) : -((stage?.offsetHeight ?? 0) + nav + 24);
      // an absolute position, from where the page really is (not where a scroll in progress is headed)
      scroller.scrollTo(Math.max(0, steps[k].getBoundingClientRect().top + window.scrollY + offset), { offset: 0 });
    }),
  );

  // playing while any of the section is on screen (a section that only touches the screen's edge is not)
  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting && entry.intersectionRatio > 0;
    sync();
  });
  // loading once it is within a screen's height
  const nearby = new IntersectionObserver(
    ([entry]) => {
      near = entry.isIntersecting;
      loadAround();
    },
    { rootMargin: "100% 0px" },
  );
  io.observe(root);
  nearby.observe(root);
  d.add(() => {
    io.disconnect();
    nearby.disconnect();
  });
  d.add(() => videos.forEach((v) => v?.pause()));

  pick();
}
