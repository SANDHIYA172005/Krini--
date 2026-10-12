import { gsapReady, type Disposer } from "./env";

const HEADINGS = "h1, h2, h3, h4, .display, .display-tight, [data-fit]";

/**
 * No heading is ever wider than its column. Headings are set large, and one
 * long word ("recommendation?", "Tiruverkadu.") in a narrow column or on a
 * small screen could stick out of its box and run into what is beside it.
 * When the widest word of a heading is wider than the room it has, the
 * heading's type is scaled down just enough for that word to fit; everything
 * else keeps the size the stylesheet gives it.
 * Measured before the entrances split headings into words (reveal.ts), again
 * whenever fonts finish loading (they change the widths) and once the page
 * has loaded, and after the window changes width.
 */
export function initFit(d: Disposer) {
  const els = Array.from(document.querySelectorAll<HTMLElement>(HEADINGS));
  if (!els.length) return;
  const { ScrollTrigger } = gsapReady();
  const fitted = new Map<HTMLElement, string>();
  const range = document.createRange();

  /** The widest word in the element, in layout pixels; words inside a nested heading are that heading's. */
  const widest = (el: HTMLElement) => {
    let max = 0;
    // headings split into words (reveal.ts): each word is a box of its own, measured untransformed
    const words = el.querySelectorAll<HTMLElement>(".split-word");
    words.forEach((w) => {
      if (w.parentElement?.closest(HEADINGS) === el) max = Math.max(max, w.offsetWidth);
    });
    // anything else: each word of each text node, corrected for any scale on the way up
    const scale = el.getBoundingClientRect().width / (el.offsetWidth || 1) || 1;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
      const parent = n.parentElement;
      if (!parent || parent.closest(".split-word") || parent.closest(HEADINGS) !== el) continue;
      const re = /\S+/g;
      for (let m = re.exec(n.data); m; m = re.exec(n.data)) {
        range.setStart(n, m.index);
        range.setEnd(n, m.index + m[0].length);
        let w = 0;
        for (const r of Array.from(range.getClientRects())) w += r.width;
        max = Math.max(max, w / scale);
      }
    }
    return max;
  };

  /** The room the element has: its own content box, and never past the right edge of its parent's. */
  const room = (el: HTMLElement, cs: CSSStyleDeclaration) => {
    let box = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const parent = el.parentElement;
    if (parent) {
      const ps = getComputedStyle(parent);
      if (!ps.display.startsWith("inline") && ps.display !== "contents") {
        const pr = parent.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        const right = pr.left + parent.clientLeft + parent.clientWidth - parseFloat(ps.paddingRight);
        box = Math.min(box, right - (er.left + el.clientLeft + parseFloat(cs.paddingLeft)));
      }
    }
    return box;
  };

  const fit = () => {
    // Back to the stylesheet's sizes, then measure everything, then write. Transitions are held
    // off on the headings being changed and on everything inside them (their links and words
    // inherit the size), with !important, since the reduced-motion rule gives every property a
    // 0.01 ms transition with !important. So the sizes measured are the real ones, and a new size
    // never animates.
    type Styled = Element & ElementCSSInlineStyle;
    const touched = new Map<Styled, [string, string]>();
    const hold = (el: HTMLElement) => {
      for (const x of [el, ...Array.from(el.querySelectorAll<Styled & Element>("*"))] as Styled[]) {
        if (touched.has(x)) continue;
        touched.set(x, [x.style.getPropertyValue("transition"), x.style.getPropertyPriority("transition")]);
        x.style.setProperty("transition", "none", "important");
      }
    };
    fitted.forEach((was, el) => {
      hold(el);
      el.style.fontSize = was;
    });
    fitted.clear();
    const plan: [HTMLElement, number][] = [];
    for (const el of els) {
      if (!el.isConnected || !el.offsetWidth) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "inline" || /nowrap|pre/.test(cs.whiteSpace)) continue;
      const box = room(el, cs);
      const w = widest(el);
      if (box > 0 && w > box + 0.5) plan.push([el, (parseFloat(cs.fontSize) * box * 0.985) / w]);
    }
    for (const [el, size] of plan) {
      hold(el);
      fitted.set(el, el.style.fontSize);
      el.style.fontSize = `${Math.floor(size * 10) / 10}px`;
    }
    if (touched.size) {
      void document.body.offsetWidth; // apply the sizes while transitions are off
      touched.forEach(([value, priority], el) => (value ? el.style.setProperty("transition", value, priority) : el.style.removeProperty("transition")));
    }
    return plan.length;
  };

  fit();
  let width = window.innerWidth;
  let timer = 0;
  const later = (force: boolean) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (!force && window.innerWidth === width) return;
      width = window.innerWidth;
      fit();
      ScrollTrigger.refresh();
    }, 120);
  };
  d.on(window, "resize", () => later(false));
  // the fonts change the widths: fit again whenever a batch of them has loaded, and after the page has
  let alive = true;
  document.fonts?.ready.then(() => alive && fit()).catch(() => undefined);
  if (document.fonts)
    d.on(document.fonts, "loadingdone", () =>
      requestAnimationFrame(() => {
        if (!alive) return;
        fit();
        ScrollTrigger.refresh();
      }),
    );
  if (document.readyState === "complete") later(true);
  else d.on(window, "load", () => later(true));
  d.add(() => {
    alive = false;
    window.clearTimeout(timer);
    fitted.forEach((was, el) => (el.style.fontSize = was));
  });
}
