import { finePointer, gsapReady, prefersReducedMotion, type Disposer } from "./env";

/**
 * The sections after the hero, filmed rather than faded. All declared in markup:
 *
 *   .section-head      the label slides in and its rule draws across
 *   data-shutter       a picture frame opens from the bottom like a roller shutter,
 *                      while the picture settles from a close-up and its lights come up
 *   data-drift="r"     the element floats past slower or faster than the page (depth)
 *   data-zoom="s"      the picture eases from scale s to 1 while it crosses the screen
 *   data-odometer="n"  a mechanical counter rolls up to n, the lower wheels carrying the higher
 *   data-draw          line icons draw themselves, like a technical drawing
 *   data-chips         tags drop into place one after another
 *   data-rows          a list's rows slide in one after another
 *   data-tilt          desktop: the card leans toward the pointer and catches the light
 *   data-fill          outline words fill with oil colour, bottom up, as they scroll into view
 *
 * Every picture carries Flow's watermark in its bottom-right corner, so pictures
 * only ever scale about that corner and their frames never crop it: the mark
 * stays whole while they move.
 *
 * Nothing is hidden unless this runs (globals.css hides only under html.motion),
 * and with reduced motion none of it runs.
 */
export function initCinema(d: Disposer) {
  if (prefersReducedMotion()) return;
  const { gsap, ScrollTrigger } = gsapReady();
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  const ctx = gsap.context(() => {
    // --- section labels and their rules --------------------------------------------------------
    ScrollTrigger.batch(".section-head", {
      start: "top 92%",
      once: true,
      onEnter: (els) => els.forEach((el) => el.classList.add("is-in")),
    });

    // --- picture frames: the roller shutter -----------------------------------------------------
    document.querySelectorAll<HTMLElement>("[data-shutter]").forEach((frame) => {
      const img = frame.querySelector<HTMLElement>("img");
      gsap.set(frame, { clipPath: "inset(100% 0% 0% 0%)", "--shade": 0.62 });
      if (img) gsap.set(img, { scale: 1.2, transformOrigin: "100% 100%" });
      ScrollTrigger.create({
        trigger: frame,
        start: "top 90%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0);
          if (img) tl.to(img, { scale: 1, duration: 2.6, ease: "expo.out", clearProps: "transform" }, 0.12);
          tl.to(frame, { "--shade": 0, duration: 2.2, ease: "power2.out" }, 0.35);
          tl.call(() => frame.classList.add("is-lit"), [], 0.9);
        },
      });
    });

    // --- depth: elements that float past at their own pace --------------------------------------
    document.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
      const r = parseFloat(el.dataset.drift || "0.06") * (wide ? 1 : 0.5);
      gsap.fromTo(
        el,
        { yPercent: r * 100 },
        { yPercent: -r * 100, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });

    document.querySelectorAll<HTMLElement>("[data-zoom]").forEach((img) => {
      const s = parseFloat(img.dataset.zoom || "1.12");
      const frame = img.closest<HTMLElement>("[data-zoom-frame]") ?? img.parentElement ?? img;
      gsap.fromTo(
        img,
        { scale: s, transformOrigin: "100% 100%" },
        { scale: 1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });

    // --- tags ------------------------------------------------------------------------------------
    document.querySelectorAll<HTMLElement>("[data-chips]").forEach((list) => {
      const chips = Array.from(list.children) as HTMLElement[];
      gsap.set(chips, { opacity: 0, y: 14, scale: 0.94 });
      ScrollTrigger.create({
        trigger: list,
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.to(chips, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "back.out(2)", stagger: 0.07, clearProps: "transform" });
          list.classList.add("is-in");
        },
      });
    });

    // --- lists of products: each row slides in after the one above ---------------------------------
    document.querySelectorAll<HTMLElement>("[data-rows]").forEach((list) => {
      const rows = Array.from(list.children) as HTMLElement[];
      gsap.set(rows, { opacity: 0, x: -28 });
      ScrollTrigger.create({
        trigger: list,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(rows, { opacity: 1, x: 0, duration: 1, ease: "expo.out", stagger: 0.07, clearProps: "transform,opacity" });
          list.classList.add("is-in");
        },
      });
    });

    // --- line icons draw themselves --------------------------------------------------------------
    ScrollTrigger.batch("[data-draw]", {
      start: "top 90%",
      once: true,
      onEnter: (els) => els.forEach((el, k) => window.setTimeout(() => el.classList.add("is-drawn"), k * 110)),
    });
  });
  d.add(() => ctx.revert());

  initOdometers(d);
  initTilt(d);
  initFill(d);
}

/** Words in outline that fill with oil colour from the bottom up as they scroll into view (About, the vision). */
function initFill(d: Disposer) {
  const { ScrollTrigger } = gsapReady();
  document.querySelectorAll<HTMLElement>("[data-fill]").forEach((el) => {
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      end: "bottom 45%",
      scrub: 0.8,
      onUpdate: (self) => el.style.setProperty("--fill", self.progress.toFixed(4)),
    });
    d.add(() => st.kill());
  });
}

/**
 * A mechanical counter: one wheel per digit. The lowest wheel turns with the
 * value; each wheel above it turns only while the one below rolls from 9 to 0,
 * the way a meter carries. The number reads normally without JavaScript, and
 * to screen readers.
 */
function initOdometers(d: Disposer) {
  const { gsap, ScrollTrigger } = gsapReady();
  const fmt = new Intl.NumberFormat("en-IN");
  document.querySelectorAll<HTMLElement>("[data-odometer]").forEach((el) => {
    const end = parseFloat(el.dataset.odometer || "0");
    const text = fmt.format(end);
    el.setAttribute("aria-label", text);
    el.textContent = "";
    const strips: { strip: HTMLElement; place: number }[] = [];
    const digits = text.replace(/\D/g, "").length;
    let place = digits - 1;
    for (const ch of text) {
      if (!/\d/.test(ch)) {
        const sep = document.createElement("span");
        sep.className = "odo-sep";
        sep.setAttribute("aria-hidden", "true");
        sep.textContent = ch;
        el.appendChild(sep);
        continue;
      }
      const col = document.createElement("span");
      col.className = "odo-col";
      col.setAttribute("aria-hidden", "true");
      const strip = document.createElement("span");
      strip.className = "odo-strip";
      // 0–9 and a second 0, so a wheel can roll from 9 back round to 0
      strip.innerHTML = Array.from("01234567890", (n) => `<span>${n}</span>`).join("");
      col.appendChild(strip);
      el.appendChild(col);
      strips.push({ strip, place });
      place -= 1;
    }
    const paint = (v: number) => {
      for (const { strip, place: k } of strips) {
        const unit = 10 ** k;
        const below = v % unit; // what the lower wheels show
        const carry = k === 0 ? 0 : Math.min(1, Math.max(0, below - (unit - 1)));
        const pos = k === 0 ? v % 10 : (Math.floor(v / unit) % 10) + carry;
        strip.style.transform = `translate3d(0, ${(-pos * 100) / 11}%, 0)`;
      }
    };
    paint(0);
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => gsap.to(obj, { v: end, duration: 2.6, ease: "power4.out", onUpdate: () => paint(obj.v), onComplete: () => paint(end) }),
    });
    d.add(() => {
      st.kill();
      el.textContent = text;
    });
  });
}

/** Desktop: cards lean toward the pointer, and a highlight follows it across them. */
function initTilt(d: Disposer) {
  if (!finePointer()) return;
  const { gsap } = gsapReady();
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
    const rx = gsap.quickTo(card, "rotationX", { duration: 0.7, ease: "power3.out" });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.7, ease: "power3.out" });
    gsap.set(card, { transformPerspective: 900, transformOrigin: "50% 50%" });
    d.on(card, "pointermove", (e) => {
      const { clientX, clientY } = e as PointerEvent;
      const r = card.getBoundingClientRect();
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;
      rx((0.5 - y) * 7);
      ry((x - 0.5) * 9);
      card.style.setProperty("--tx", `${(x * 100).toFixed(1)}%`);
      card.style.setProperty("--ty", `${(y * 100).toFixed(1)}%`);
    });
    d.on(card, "pointerleave", () => {
      rx(0);
      ry(0);
    });
  });
}
