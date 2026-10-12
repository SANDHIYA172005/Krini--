import { prefersReducedMotion, type Disposer } from "./env";

/**
 * Rows that swipe sideways on phones (`[data-swipe]`, src/components/Swipe.tsx):
 * the bars and the "02 / 04" under the row follow the swipe; the buttons bring
 * the previous or next card into view. From 640px the row is a grid and the
 * controls are hidden (CSS); this keeps working if the screen changes.
 */
export function initSwipe(d: Disposer) {
  document.querySelectorAll<HTMLElement>("[data-swipe]").forEach((list) => {
    const ui = list.nextElementSibling instanceof HTMLElement && list.nextElementSibling.matches("[data-swipe-ui]") ? list.nextElementSibling : null;
    if (!ui) return;
    const items = Array.from(list.children) as HTMLElement[];
    if (items.length < 2) return;
    const bars = Array.from(ui.querySelectorAll<HTMLElement>(".swipe-bars > span"));
    const now = ui.querySelector<HTMLElement>("[data-swipe-now]");
    const prev = ui.querySelector<HTMLButtonElement>("[data-swipe-prev]");
    const next = ui.querySelector<HTMLButtonElement>("[data-swipe-next]");
    // where each card starts, relative to the first (the row's padding keeps the first at the edge)
    const startOf = (k: number) => items[k].offsetLeft - items[0].offsetLeft;
    let index = -1;
    let raf = 0;
    const update = () => {
      raf = 0;
      const x = list.scrollLeft;
      const atEnd = x >= list.scrollWidth - list.clientWidth - 4;
      let k = 0;
      if (atEnd) k = items.length - 1;
      else {
        let best = Infinity;
        items.forEach((_, j) => {
          const dist = Math.abs(startOf(j) - x);
          if (dist < best) {
            best = dist;
            k = j;
          }
        });
      }
      if (k === index) return;
      index = k;
      bars.forEach((b, j) => b.classList.toggle("is-on", j === k));
      if (now) now.textContent = String(k + 1).padStart(2, "0");
      if (prev) prev.disabled = k === 0;
      if (next) next.disabled = k === items.length - 1;
    };
    d.on(list, "scroll", () => {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    // once the visitor touches the row or its buttons, the swipe hint (below) stays away
    let touched = false;
    const touch = () => {
      touched = true;
      list.style.scrollSnapType = "";
    };
    const go = (k: number) => {
      touch();
      const j = Math.max(0, Math.min(items.length - 1, k));
      list.scrollTo({ left: startOf(j), behavior: prefersReducedMotion() ? "auto" : "smooth" });
    };
    if (prev) d.on(prev, "click", () => go(index - 1));
    if (next) d.on(next, "click", () => go(index + 1));

    // the first time a row comes into view, it nudges sideways and back, to show that it swipes
    // (not with reduced motion, and not once the visitor has touched it)
    d.on(list, "pointerdown", touch, { passive: true });
    d.on(list, "touchstart", touch, { passive: true });
    if (!prefersReducedMotion() && "IntersectionObserver" in window) {
      let timer = 0;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          if (touched || list.scrollWidth <= list.clientWidth + 4 || list.scrollLeft > 0) return;
          // snapping would pull a half-way position to a card, so it is off for the nudge
          const restore = () => {
            list.style.scrollSnapType = "";
          };
          timer = window.setTimeout(() => {
            if (touched) return;
            list.style.scrollSnapType = "none";
            list.scrollTo({ left: Math.min(56, list.scrollWidth - list.clientWidth), behavior: "smooth" });
            timer = window.setTimeout(() => {
              if (!touched) list.scrollTo({ left: 0, behavior: "smooth" });
              timer = window.setTimeout(restore, 600);
            }, 520);
          }, 450);
          d.add(restore);
        },
        { threshold: 0.6 },
      );
      io.observe(list);
      d.add(() => {
        io.disconnect();
        window.clearTimeout(timer);
      });
    }
    d.on(window, "resize", () => {
      index = -1;
      update();
    });
    update();
    d.add(() => cancelAnimationFrame(raf));
  });
}

/**
 * The quick-contact bar on phones (src/components/QuickBar.tsx): shown once
 * the visitor is past the first screen (on Home, past the hero); hidden over the closing band and the
 * footer, while the menu or the enquiry pop-up is open, and while typing in a
 * form field (the on-screen keyboard is up). Hidden, it is also out of the tab
 * order and of the accessibility tree.
 */
export function initQuickBar(d: Disposer) {
  const bar = document.querySelector<HTMLElement>("[data-qbar]");
  if (!bar) return;
  const root = document.documentElement;
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  const ends = Array.from(document.querySelectorAll<HTMLElement>(".cta-band, .site-footer"));
  const inView = new Set<Element>();
  let past = false;
  let typing = false;
  let shown: boolean | null = null;

  const set = () => {
    const show = past && inView.size === 0 && !typing && !root.classList.contains("has-dialog") && !menu?.classList.contains("is-open");
    if (show === shown) return;
    shown = show;
    bar.classList.toggle("is-on", show);
    bar.toggleAttribute("inert", !show);
    if (show) bar.removeAttribute("aria-hidden");
    else bar.setAttribute("aria-hidden", "true");
  };

  // past the first screen; on Home, past the hero (its words sit where the bar would)
  const hero = document.querySelector<HTMLElement>("[data-scrollhero]");
  const onScroll = () => {
    const from = hero ? hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.6 : window.innerHeight * 0.8;
    const p = window.scrollY > from;
    if (p !== past) {
      past = p;
      set();
    }
  };
  d.on(window, "scroll", onScroll, { passive: true });

  if (ends.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        set();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    ends.forEach((el) => io.observe(el));
    d.add(() => io.disconnect());
  }

  const field = (el: EventTarget | null) => el instanceof HTMLElement && el.matches("input:not([type=radio]):not([type=checkbox]), textarea, select");
  d.on(document, "focusin", (e) => {
    if (field(e.target)) {
      typing = true;
      set();
    }
  });
  d.on(document, "focusout", (e) => {
    if (field(e.target)) {
      typing = false;
      set();
    }
  });

  // the menu sheet and the pop-up mark themselves with classes; follow them
  const mo = new MutationObserver(set);
  mo.observe(root, { attributes: true, attributeFilter: ["class"] });
  if (menu) mo.observe(menu, { attributes: true, attributeFilter: ["class"] });
  d.add(() => mo.disconnect());

  onScroll();
  set();
}
