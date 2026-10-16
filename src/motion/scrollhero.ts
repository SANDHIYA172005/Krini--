import { prefersReducedMotion, type Disposer } from "./env";
import type { Scroller } from "./smooth";
import { heroSeq } from "../content/media";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/**
 * Home's hero (ScrollHero.tsx): the stage stays on screen while its section
 * scrolls past; the scroll position (p, 0 → 1) picks the film's frame, drawn
 * on a canvas to cover the screen, and the step whose words are shown. The
 * film holds its first frame for the first heroSeq.lead of the scroll (the
 * name), plays to heroSeq.hold, and its last frame stays for the rest; each
 * step starts at its moment in the film (heroSeq.beats). On a screen narrower
 * than the film the crop follows its subject (heroSeq.focus).
 *
 * The frames come in sheets (heroSeq.perSheet frames stacked top to bottom
 * in one image), loaded coarse to fine (every 8th sheet, then every 4th, …)
 * so any scroll position soon has a sheet near it. Between two frames the
 * canvas blends them, so the film runs smoothly at a low frame rate. Until a
 * frame's sheet is in, the nearest loaded frame is drawn.
 *
 * Flow's watermark is always on screen once and whole: the footage's own, or,
 * when the crop leaves it out, the same mark in the stage's corner. With
 * reduced motion the hero stays one screen (CSS).
 */
export function initScrollHero(d: Disposer, scroller: Scroller) {
  const root = document.querySelector<HTMLElement>("[data-scrollhero]");
  const stage = root?.querySelector<HTMLElement>("[data-sh-stage]");
  const canvas = root?.querySelector<HTMLCanvasElement>("[data-sh-canvas]");
  if (!root || !stage || !canvas) return;
  if (prefersReducedMotion()) {
    root.classList.add("is-still");
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  root.classList.add("is-live");

  const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-sh-step]"));
  const ticks = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-sh-tick]"));
  const bar = root.querySelector<HTMLElement>("[data-sh-bar]");
  const mark = root.querySelector<HTMLElement>("[data-sh-mark]");
  const { frames: n, fps, perSheet, width: FW, height: FH, lead, hold } = heroSeq;
  const length = n / fps;
  /** The scroll share (0 → 1) at which the film shows second s. */
  const atSecond = (s: number) => lead + (s / length) * (hold - lead);
  const starts = heroSeq.beats.map((b, i) => (i === 0 ? 0 : atSecond(b)));
  /** Where the subject sits across the frame at second s: between the keyframes, eased. */
  const focusAt = (s: number) => {
    const keys = heroSeq.focus;
    if (s <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      const [s1, x1] = keys[i];
      if (s <= s1) {
        const [s0, x0] = keys[i - 1];
        const u = (s - s0) / (s1 - s0);
        return x0 + (x1 - x0) * u * u * (3 - 2 * u);
      }
    }
    return keys[keys.length - 1][1];
  };
  const sheetCount = Math.ceil(n / perSheet);

  // ---- the sheets, coarse to fine
  const sheets: (HTMLImageElement | null)[] = new Array(sheetCount).fill(null);
  const order: number[] = [];
  for (let stride = 8; stride >= 1; stride = Math.floor(stride / 2)) {
    for (let i = 0; i < sheetCount; i += stride) if (!order.includes(i)) order.push(i);
  }
  if (!order.includes(sheetCount - 1)) order.splice(1, 0, sheetCount - 1);
  let next = 0;
  let inflight = 0;
  let alive = true;
  d.add(() => {
    alive = false;
  });
  const loadMore = () => {
    while (alive && next < order.length && inflight < 3) {
      const k = order[next++];
      const im = new Image();
      im.decoding = "async";
      inflight++;
      im.onload = () => {
        inflight--;
        sheets[k] = im;
        last = -1; // redraw: this sheet may hold a nearer frame
        queue();
        loadMore();
      };
      im.onerror = () => {
        inflight--;
        loadMore();
      };
      im.src = heroSeq.sheet(k);
    }
  };
  const has = (f: number) => Boolean(sheets[Math.floor(f / perSheet)]);
  /** The nearest frame to f whose sheet is in. */
  const nearest = (f: number) => {
    for (let o = 0; o < n; o++) {
      if (f - o >= 0 && has(f - o)) return f - o;
      if (f + o < n && has(f + o)) return f + o;
    }
    return -1;
  };

  // ---- the stage's size and the crop
  let W = 0;
  let H = 0;
  let dpr = 1;
  const measure = () => {
    W = stage.clientWidth;
    H = stage.clientHeight;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    last = -1;
  };

  // ---- the words and the rail
  let step = -1;
  const setStep = (k: number) => {
    if (k === step) return;
    step = k;
    steps.forEach((s, i) => s.classList.toggle("is-on", i === k));
    ticks.forEach((t, i) => {
      t.classList.toggle("is-on", i === k);
      if (i === k) t.setAttribute("aria-current", "step");
      else t.removeAttribute("aria-current");
    });
    root.dataset.step = String(k);
    // the nav stays out of the way while the film opens and comes in for its last two steps
    // (keyboard focus brings it back at any time)
    nav?.classList.toggle("is-hidden", k < steps.length - 2 && !nav.contains(document.activeElement));
  };
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (nav) {
    d.on(nav, "focusin", () => nav.classList.remove("is-hidden"));
    d.add(() => nav.classList.remove("is-hidden"));
  }

  const paint = (f: number, alpha: number, dx: number, dy: number, dw: number, dh: number) => {
    const im = sheets[Math.floor(f / perSheet)]!;
    const sy = (f % perSheet) * FH;
    ctx.globalAlpha = alpha;
    ctx.drawImage(im, 0, sy, FW, FH, dx, dy, dw, dh);
  };

  let last = -1;
  let raf = 0;
  /** Opened from a link to Home: the last screen, shown as the sharp still. */
  let arrived = false;
  const draw = () => {
    raf = 0;
    const total = root.offsetHeight - H;
    const p = total > 0 ? clamp(-root.getBoundingClientRect().top / total) : 0;
    let k = 0;
    while (k + 1 < starts.length && p >= starts[k + 1]) k++;
    setStep(k);
    if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
    // once the film has ended (the last screen: the promise and the buttons), show its last frame
    // as the sharp still rather than a frame drawn from the sheets
    // (arriving from Home keeps the still for the whole last screen, until the visitor scrolls back)
    if (k < steps.length - 1) arrived = false;
    root.classList.toggle("at-end", arrived || p >= hold - 0.002);

    // the film: still until heroSeq.lead, playing to heroSeq.hold, then still on its last frame
    const t = clamp((p - lead) / (hold - lead)) * (n - 1);
    const key = Math.round(t * 8); // eighths of a frame are enough to look smooth
    if (key === last) return;
    const a = Math.floor(t);
    const fa = nearest(a);
    if (fa < 0) return;
    last = key;

    // cover the stage; on a narrow screen keep the film's subject (heroSeq.focus) in view
    const s = Math.max(W / FW, H / FH);
    const dw = FW * s;
    const dh = FH * s;
    let dx = clamp(W / 2 - dw * focusAt(t / fps), W - dw, 0);
    let dy = (H - dh) / 2;

    // Flow's mark sits in the footage's bottom-right corner. Never half of it on screen: when the
    // crop would cut it, the picture moves (a few pixels) so the mark is either whole or wholly
    // out of view, whichever is nearer; when it is out of view the same mark shows in the stage's
    // corner instead (data-sh-mark), so there is always exactly one.
    const m = heroSeq.mark;
    const fit = (over: number, edge: number, size: number) => {
      // over: how far the picture runs past the screen's edge; edge, size: the mark's margin and size
      if (over <= edge || over >= edge + size) return 0;
      return over - edge < edge + size - over ? -(over - edge) : edge + size - over;
    };
    dx += fit(dx + dw - W, dw * m.right, dw * m.width);
    dy += fit(dy + dh - H, dh * m.bottom, dh * m.height);
    const markOut = dx + dw - W >= dw * (m.right + m.width) - 0.5 || dy + dh - H >= dh * (m.bottom + m.height) - 0.5;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint(fa, 1, dx, dy, dw, dh);
    const b = a + 1;
    const mix = t - a;
    if (fa === a && b < n && mix > 0.02 && has(b)) paint(b, mix, dx, dy, dw, dh);
    ctx.globalAlpha = 1;
    root.classList.add("is-drawn");

    mark?.classList.toggle("is-on", markOut);
  };
  const queue = () => {
    if (!raf) raf = requestAnimationFrame(draw);
  };

  measure();
  loadMore();
  draw();
  d.on(window, "scroll", queue, { passive: true });
  d.on(window, "resize", () => {
    measure();
    queue();
  });
  d.add(() => cancelAnimationFrame(raf));

  // arriving from a link to Home (FastNav): open on the last screen, not the start of the film
  const toEnd = () => {
    arrived = true;
    root.classList.add("at-end");
    measure();
    const y = root.getBoundingClientRect().top + window.scrollY + root.offsetHeight - window.innerHeight;
    scroller.scrollTo(y, { immediate: true, offset: 0 });
    queue();
  };
  const w = window as unknown as { __kcHeroEnd?: boolean };
  if (w.__kcHeroEnd) {
    w.__kcHeroEnd = false;
    toEnd();
    // and again once the router has finished putting the new page at the top
    requestAnimationFrame(() => requestAnimationFrame(toEnd));
    window.setTimeout(toEnd, 120);
    window.setTimeout(toEnd, 450);
  }
  d.on(window, "hero:end", toEnd);

  // ---- four scrolls: on a mouse wheel or trackpad, each scroll inside the hero moves exactly one
  // step (the name → lubricants → greases → aerosols → get started), so the whole film takes four
  // scrolls; the next one carries on down the page, and scrolling up steps back the same way.
  // Touch screens scroll freely.
  const stepAt = (k: number) => (k <= 0 ? 0 : k >= starts.length - 1 ? 1 : starts[k] + (starts[k + 1] - starts[k]) * 0.6);
  const heroTop = () => root.getBoundingClientRect().top + window.scrollY;
  const heroTotal = () => root.offsetHeight - window.innerHeight;
  let lockedUntil = 0;
  let lastWheel = 0;
  const onWheel = (ev: Event) => {
    const e = ev as WheelEvent;
    if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX) || e.deltaY === 0) return;
    const top = heroTop();
    const total = heroTotal();
    const y = window.scrollY;
    // only while the hero fills the screen
    if (y < top - 2 || y > top + total + 2) return;
    const now = performance.now();
    const p = total > 0 ? clamp((y - top) / total) : 0;
    let k = 0;
    while (k + 1 < starts.length && p >= starts[k + 1] - 0.0005) k++;
    const down = e.deltaY > 0;
    const next = down ? k + 1 : k - 1;
    // past the ends: leave the scroll to the page
    if (next < 0 || next > starts.length - 1) {
      if (now < lockedUntil || now - lastWheel < 180) {
        lastWheel = now;
        e.preventDefault();
        e.stopImmediatePropagation();
      }
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
    // one step per scroll: the rest of a flick (a trackpad's glide) is swallowed until it stops
    const quiet = now - lastWheel > 180;
    lastWheel = now;
    if (now < lockedUntil || (!quiet && now < lockedUntil + 900)) return;
    lockedUntil = now + 1100;
    if (next !== starts.length - 1) arrived = false;
    scroller.scrollTo(top + total * stepAt(next), { offset: 0 });
  };
  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    d.add(() => window.removeEventListener("wheel", onWheel, { capture: true }));
  }

  // the rail: each mark jumps to its step (the middle of it)
  ticks.forEach((tick, i) => {
    d.on(tick, "click", () => {
      const total = root.offsetHeight - H;
      const top = root.getBoundingClientRect().top + window.scrollY;
      const mid = (starts[i] + (starts[i + 1] ?? 1)) / 2;
      scroller.scrollTo(top + total * mid, { offset: 0 });
    });
  });
  // the pills on the first screen: each jumps to its line's part of the film (without JavaScript
  // they open the line's page)
  root.querySelectorAll<HTMLAnchorElement>("[data-sh-jump]").forEach((pill) => {
    d.on(pill, "click", (e) => {
      const k = Number(pill.dataset.shJump);
      if (!(k > 0 && k < starts.length)) return;
      e.preventDefault();
      const total = root.offsetHeight - H;
      const top = root.getBoundingClientRect().top + window.scrollY;
      scroller.scrollTo(top + total * ((starts[k] + (starts[k + 1] ?? 1)) / 2), { offset: 0 });
    });
  });
}
