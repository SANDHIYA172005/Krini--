import { finePointer, gsapReady, prefersReducedMotion, type Disposer } from "./env";
import type { Scroller } from "./smooth";

/**
 * The showroom (after the hero). The entrance is CSS (globals.css, "First
 * paint"), started by the inline script in Showroom.tsx once the section is in
 * view and its pictures have loaded.
 * Here:
 * - a late fallback start (once in view), in case that script did not run;
 * - desktop: a soft light follows the pointer over the chosen plinth, which
 *   leans toward it (the dimming of the others and the amber word in the
 *   heading are CSS);
 * - phones: the dots follow the swipe and bring a card into view; a card's
 *   light sweeps across it the first time it comes into view, and once the
 *   visitor has swiped, the card's word in the heading turns amber;
 * - arriving: the plinths rise into place as the section scrolls up (--hs-in);
 * - leaving the section: the words drift up, the plinths sink and dim (--hs-out).
 */
export function initShowroom(d: Disposer, _scroller: Scroller) {
  const hero = document.querySelector<HTMLElement>("[data-showroom]");
  if (!hero) return;
  const reduced = prefersReducedMotion();

  // late fallback, in case the inline script did not run: start once the section is in view
  let fallback = 0;
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      fallback = window.setTimeout(() => hero.classList.add("is-go"), 3000);
    },
    { threshold: 0.3 },
  );
  io.observe(hero);
  d.add(() => {
    io.disconnect();
    window.clearTimeout(fallback);
  });

  // --- desktop: the light follows the pointer, and the plinth leans toward it -------------------------
  if (!reduced && finePointer()) {
    hero.querySelectorAll<HTMLElement>("[data-hs-figure]").forEach((fig) => {
      d.on(fig, "pointermove", (e) => {
        const { clientX, clientY } = e as PointerEvent;
        const r = fig.getBoundingClientRect();
        const x = (clientX - r.left) / r.width;
        const y = (clientY - r.top) / r.height;
        fig.style.setProperty("--hs-lx", `${(x * 100).toFixed(1)}%`);
        fig.style.setProperty("--hs-ly", `${(y * 100).toFixed(1)}%`);
        fig.style.setProperty("--hs-rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
        fig.style.setProperty("--hs-ry", `${((x - 0.5) * 7).toFixed(2)}deg`);
      });
      d.on(fig, "pointerleave", () => {
        fig.style.setProperty("--hs-rx", "0deg");
        fig.style.setProperty("--hs-ry", "0deg");
      });
    });
  }

  // --- phones: a row of cards to swipe ----------------------------------------------------------
  const track = hero.querySelector<HTMLElement>("[data-hs-track]");
  const bays = Array.from(hero.querySelectorAll<HTMLElement>("[data-hs-bay]"));
  const dots = Array.from(hero.querySelectorAll<HTMLButtonElement>("[data-hs-dot]"));
  if (track && bays.length) {
    let active = 0;
    let swiped = false;
    let raf = 0;
    const snapPad = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
    const setActive = (k: number) => {
      if (swiped) hero.dataset.hsActive = String(k);
      if (k === active) return;
      active = k;
      dots.forEach((b, j) => (j === k ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current")));
      bays[k].classList.add("is-swept");
    };
    const read = () => {
      raf = 0;
      const max = track.scrollWidth - track.clientWidth;
      if (max < 4) return; // side by side: nothing to swipe
      const x = track.scrollLeft + snapPad();
      let best = 0;
      bays.forEach((b, j) => {
        if (Math.abs(b.offsetLeft - x) < Math.abs(bays[best].offsetLeft - x)) best = j;
      });
      // the last card cannot reach the snap line: the end of the row counts as the last card
      if (track.scrollLeft >= max - 2) best = bays.length - 1;
      setActive(best);
    };
    d.on(
      track,
      "scroll",
      () => {
        swiped = true;
        if (!raf) raf = requestAnimationFrame(read);
      },
      { passive: true },
    );
    d.add(() => cancelAnimationFrame(raf));
    dots.forEach((b, j) =>
      d.on(b, "click", () => {
        swiped = true;
        track.scrollTo({ left: bays[j].offsetLeft - snapPad(), behavior: reduced ? "auto" : "smooth" });
      }),
    );
  }

  // --- arriving and leaving: the plinths rise into place as the showroom comes up (--hs-in);
  //     leaving it, the words drift up and the plinths sink and dim (--hs-out) --------------------------
  if (!reduced) {
    const { ScrollTrigger } = gsapReady();
    const arrive = ScrollTrigger.create({
      trigger: hero,
      start: "top bottom",
      end: "top 20%",
      scrub: 0.6,
      onUpdate: (self) => hero.style.setProperty("--hs-in", self.progress.toFixed(3)),
    });
    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => hero.style.setProperty("--hs-out", self.progress.toFixed(3)),
    });
    hero.style.setProperty("--hs-in", arrive.progress.toFixed(3));
    d.add(() => {
      arrive.kill();
      st.kill();
      hero.style.removeProperty("--hs-in");
      hero.style.removeProperty("--hs-out");
    });
  }
}
