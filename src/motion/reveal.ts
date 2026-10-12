import { gsapReady, prefersReducedMotion, type Disposer } from "./env";

/**
 * Entrances, declared in markup:
 *   data-split     a headline rises word by word, each word tipping up from below
 *                  its own edge like a panel on a hinge
 *   data-reveal    an element rises into place and comes into focus, once
 * Pictures, counters, icons and the rest: cinema.ts.
 * Nothing is hidden unless this module runs, so the page reads fully without JS.
 */
export function initReveals(d: Disposer) {
  if (prefersReducedMotion()) return;
  const { gsap, ScrollTrigger } = gsapReady();
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  const ctx = gsap.context(() => {
    // Split headlines into masked words, preserving <br> and the class of a wrapped word
    // (e.g. <span class="text-amber">Krini</span> keeps its colour)
    document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = "1";
      const nodes = Array.from(el.childNodes);
      // a <br> reads as a space, so "greases<br>and aerosols" is not announced as "greasesand"
      const label = nodes
        .map((n) => (n.nodeName === "BR" ? " " : n.textContent ?? ""))
        .join("")
        .replace(/\s+/g, " ")
        .trim();
      el.textContent = "";
      el.setAttribute("aria-label", label);
      for (const node of nodes) {
        if (node.nodeName === "BR") {
          el.appendChild(document.createElement("br"));
          continue;
        }
        const cls = node instanceof Element ? node.getAttribute("class") : null;
        const keep = cls ? ` ${cls}` : "";
        const words = (node.textContent ?? "").split(/(\s+)/);
        for (const w of words) {
          if (!w) continue;
          if (/^\s+$/.test(w)) {
            el.appendChild(document.createTextNode(" "));
            continue;
          }
          const outer = document.createElement("span");
          outer.className = `split-word${keep}`;
          outer.setAttribute("aria-hidden", "true");
          const inner = document.createElement("span");
          inner.className = "split-in";
          inner.textContent = w;
          outer.appendChild(inner);
          el.appendChild(outer);
        }
      }
      const words = el.querySelectorAll<HTMLElement>(".split-in");
      gsap.set(words, { yPercent: 118, rotationX: -72, opacity: 0, transformOrigin: "50% 100%" });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(words, { yPercent: 0, rotationX: 0, opacity: 1, duration: 1.45, ease: "expo.out", stagger: 0.07, clearProps: "transform" }),
      });
    });

    // Blocks rise into place; on larger screens they also come into focus
    if (wide) gsap.set("[data-reveal]", { filter: "blur(8px)" });
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 90%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.09,
          overwrite: true,
          clearProps: "filter",
        }),
    });
  });
  d.add(() => ctx.revert());
}
