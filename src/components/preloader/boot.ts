export type PreloaderOptions = {
  /** sessionStorage key that marks the screen as seen in this tab. */
  key: string;
  /** Show it once per tab (true) or on every full page load (false). */
  once: boolean;
  /** Show it only when the page is refreshed (reloaded), not on a first visit or a typed address. */
  onlyReload?: boolean;
  /** Shortest time on screen, so a cached page doesn't just flash it. */
  minMs: number;
  /** Longest time on screen, however slow the page is. */
  maxMs: number;
  /** The emblem's SVG markup: the gear pair (gears.ts) or the engine (engine.ts); shown when there is no video. */
  engine: string;
  /** A short film shown small in the middle in place of the emblem: the gears turning in oil. */
  video?: { webm: string; mp4: string; poster: string };
  /** For the engine only: where its moving parts turn and slide (engine.ts, engineGeometry). */
  geo?: {
    cx: number[];
    cy: number;
    r: number;
    l: number;
    phase: number[];
    wheels: { x: number; y: number }[];
  };
};

/**
 * The loading screen, shown on every full load of the site (a refresh, or
 * arriving from outside); moving between pages inside the site doesn't load
 * the document again, so it doesn't show then.
 *
 * Runs as an inline script at the top of <body> (Preloader.tsx), before React
 * and the page's bundles arrive, so the screen is up from the first paint and
 * its counter moves while the rest of the page is still loading. It builds its
 * own element, <kc-preloader>, as a direct child of <body>: React skips nodes
 * it doesn't recognise there when it hydrates, so the screen can come and go
 * without React ever owning it.
 *
 * The counter follows what the visitor is actually waiting for:
 *   ready   the HTML is parsed                         (DOMContentLoaded)
 *   fonts   Archivo and IBM Plex are in                (document.fonts.ready)
 *   load    images and scripts are in                  (window load)
 * Between those it creeps forward so it never looks stuck. It stays at least
 * minMs and at most maxMs, holds at 100, then lifts away like a curtain.
 *
 * While it is up, the page underneath can't scroll (Lenis included). It fires
 * "preloader:lift" on window as it starts to lift and "preloader:done" once it
 * is gone, for anything that should start on reveal. Add ?intro to the address
 * to see it again in a tab that has already shown it.
 *
 * This function is serialised with Function#toString into the inline script,
 * so it must stay self-contained: no imports, nothing from outside its body.
 */
export function bootPreloader(o: PreloaderOptions): void {
  const d = document;
  const w = window;

  const forced = /[?&]intro(?:[=&]|$)/.test(location.search);
  if (o.onlyReload && !forced) {
    let kind = "";
    try {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      kind = nav ? nav.type : (performance as unknown as { navigation?: { type: number } }).navigation?.type === 1 ? "reload" : "";
    } catch {
      /* no timing: treat as not a refresh */
    }
    if (kind !== "reload") return;
  }
  try {
    if (o.once && !forced && sessionStorage.getItem(o.key)) return;
  } catch {
    /* storage blocked: show it */
  }

  const reduce = w.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minMs = reduce ? Math.min(600, o.minMs) : o.minMs;
  const t0 = performance.now();

  // ---- the screen
  const letters = (word: string) =>
    word
      .split("")
      .map((c, i) => `<span style="--i:${i}">${c}</span>`)
      .join("");

  // the reel's WebM carries a transparent ground (VP9 alpha); Safari can't show that, so it gets
  // the MP4 (black ground, hidden by the "lighten" blend in preloader.css)
  const safari = /^((?!chrome|chromium|android|crios|edg).)*safari/i.test(navigator.userAgent);
  const el = d.createElement("kc-preloader");
  el.setAttribute("role", "status");
  el.setAttribute("aria-label", "Loading Krini Crude");
  el.innerHTML =
    // the page can't scroll while the screen is up, and its scrollbar stays out of the picture
    `<style>html{overflow:hidden!important}</style>` +
    `<div class="kc-pre__grid" aria-hidden="true"></div>` +
    `<div class="kc-pre__glow" aria-hidden="true"></div>` +
    `<div class="kc-pre__top" aria-hidden="true">` +
    `<span>Lubricants &middot; Greases &middot; Aerosols</span>` +
    `<span class="kc-pre__iso">ISO certified &middot; Chennai</span>` +
    `</div>` +
    `<div class="kc-pre__center" aria-hidden="true">` +
    (o.video
      ? `<div class="kc-pre__reel"><video poster="${o.video.poster}" muted autoplay loop playsinline preload="auto" disablepictureinpicture>` +
        (safari ? "" : `<source src="${o.video.webm}" type="video/webm">`) +
        `<source src="${o.video.mp4}" type="video/mp4"></video></div>`
      : `<div class="kc-pre__emblem">${o.engine}</div>`) +
    `<div class="kc-pre__mark">` +
    `<span class="kc-pre__word kc-pre__word--amber">${letters("Krini")}</span>` +
    `<span class="kc-pre__word">${letters("Crude")}</span>` +
    `</div>` +
    `<div class="kc-pre__tag">Lubricant manufacturer in Chennai</div>` +
    `</div>` +
    `<div class="kc-pre__foot" aria-hidden="true">` +
    `<div class="kc-pre__now"><b data-kc-step>01 / 03</b><span data-kc-label>Lubricants</span></div>` +
    `<div class="kc-pre__count"><span data-kc-count>000</span><small>%</small></div>` +
    `</div>` +
    `<div class="kc-pre__bar" aria-hidden="true"><i data-kc-bar></i></div>`;
  d.body.appendChild(el);
  // the reel: muted, so it may play on its own; if the browser still holds it, the poster shows
  const reel = el.querySelector("video");
  if (reel) {
    reel.muted = true;
    const p = reel.play();
    if (p) p.catch(() => {});
  }

  const count = el.querySelector("[data-kc-count]") as HTMLElement;
  const bar = el.querySelector("[data-kc-bar]") as HTMLElement;
  const stepEl = el.querySelector("[data-kc-step]") as HTMLElement;
  const label = el.querySelector("[data-kc-label]") as HTMLElement;
  const now = el.querySelector(".kc-pre__now") as HTMLElement;

  // ---- the engine: idles at first and revs up as the page loads. The crank turns; each
  // piston rides its connecting rod (slider-crank); each cylinder fires once every two turns
  // (four-stroke), 1-3-2, with a spark at the plug and a flash in the chamber.
  const g = o.geo ?? { cx: [], cy: 0, r: 0, l: 0, phase: [], wheels: [] };
  /** How far the counter has got, 0 → 1 (the engine's speed follows it). */
  let shown = 0;
  const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
  const pistons = q<SVGGElement>("[data-e-piston]");
  const rods = q<SVGLineElement>("[data-e-rod]");
  const throws = q<SVGGElement>("[data-e-throw]");
  const wheels = q<SVGGElement>("[data-e-wheel]");
  const fires = q<SVGElement>("[data-e-fire]");
  const sparks = q<SVGElement>("[data-e-spark]");
  let crank = 0;
  let et = 0;
  const TAU = Math.PI * 2;
  const deg = (a: number) => ((a * 180) / Math.PI).toFixed(2);
  const pose = () => {
    wheels.forEach((wh, i) => wh.setAttribute("transform", `rotate(${deg(crank)} ${g.wheels[i].x} ${g.wheels[i].y})`));
    g.cx.forEach((x, i) => {
      const th = crank + g.phase[i];
      const s = Math.sin(th);
      const c = Math.cos(th);
      const px = x + g.r * s;
      const py = g.cy - g.r * c;
      const y = g.cy - (g.r * c + Math.sqrt(g.l * g.l - g.r * g.r * s * s));
      throws[i]?.setAttribute("transform", `rotate(${deg(th)} ${x} ${g.cy})`);
      const rod = rods[i];
      if (rod) {
        rod.setAttribute("x1", px.toFixed(2));
        rod.setAttribute("y1", py.toFixed(2));
        rod.setAttribute("y2", y.toFixed(2));
      }
      pistons[i]?.setAttribute("transform", `translate(${x} ${y.toFixed(2)})`);
      // where this cylinder is in its two-turn cycle: it fires just after top dead centre
      const cyc = (((th / TAU) % 2) + 2) % 2;
      fires[i]?.setAttribute("opacity", (cyc < 0.16 ? (1 - cyc / 0.16) * 0.95 : 0).toFixed(3));
      sparks[i]?.setAttribute("opacity", cyc < 0.035 ? "1" : "0");
    });
  };
  const run = (t: number) => {
    if (!el.isConnected) return;
    const dt = et ? Math.min(0.05, (t - et) / 1000) : 0;
    et = t;
    // revolutions a second: a slow idle, then up with the counter
    crank += dt * TAU * (0.8 + 3.4 * shown);
    pose();
    w.requestAnimationFrame(run);
  };
  pose();
  if (!reduce && o.geo) w.requestAnimationFrame(run);

  // ---- hold the page still (Lenis listens for wheel and touch on window too)
  const scrollKeys = /^(?: |Spacebar|PageUp|PageDown|Home|End|ArrowUp|ArrowDown)$/;
  const block = (e: Event) => {
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  const onKey = (e: KeyboardEvent) => {
    if (scrollKeys.test(e.key)) block(e);
  };
  const hold = { capture: true, passive: false };
  w.addEventListener("wheel", block, hold);
  w.addEventListener("touchmove", block, hold);
  w.addEventListener("keydown", onKey, true);
  let held = true;
  const release = () => {
    if (!held) return;
    held = false;
    w.removeEventListener("wheel", block, hold);
    w.removeEventListener("touchmove", block, hold);
    w.removeEventListener("keydown", onKey, true);
    // the scrollbar comes back and the page narrows by its width: have everything that measured
    // the page meanwhile (ScrollTrigger, the hero's canvas, fitted headings) measure again
    const wide = d.documentElement.clientWidth;
    el.querySelector("style")?.remove();
    if (d.documentElement.clientWidth !== wide) w.dispatchEvent(new Event("resize"));
  };

  // ---- what the visitor is waiting for
  const weights: Record<string, number> = { ready: 0.35, fonts: 0.2, load: 0.45 };
  const done: Record<string, boolean> = {};
  let changed = t0;
  const mark = (k: string) => {
    if (done[k]) return;
    done[k] = true;
    changed = performance.now();
  };
  const share = () => {
    let s = 0;
    for (const k in weights) if (done[k]) s += weights[k];
    return s;
  };

  const onReady = () => {
    mark("ready");
    if (d.fonts) d.fonts.ready.then(() => mark("fonts"), () => mark("fonts"));
    else mark("fonts");
  };
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", onReady, { once: true });
  else onReady();
  if (d.readyState === "complete") mark("load");
  else w.addEventListener("load", () => mark("load"), { once: true });

  // ---- the counter
  const lines = ["Lubricants", "Greases", "Aerosols"];
  let last = t0;
  let raf = 0;
  let line = 0;
  let finished = false;

  const render = () => {
    const pct = Math.floor(shown * 100);
    count.textContent = String(pct).padStart(3, "0");
    bar.style.transform = `scaleX(${shown.toFixed(4)})`;
    const k = pct < 34 ? 0 : pct < 67 ? 1 : 2;
    if (k !== line) {
      line = k;
      stepEl.textContent = `0${k + 1} / 03`;
      label.textContent = lines[k];
      now.classList.remove("is-swap");
      void now.offsetWidth; // restart the swap animation
      now.classList.add("is-swap");
    }
  };

  const frame = (t: number) => {
    raf = 0;
    if (!el.isConnected) return stop();
    const dt = Math.min(64, t - last);
    last = t;
    const elapsed = t - t0;
    const got = share();
    const all = got > 0.999;
    // between milestones, ease towards a share of what's left so it keeps moving
    const goal = all ? 1 : got + (1 - got) * 0.55 * (1 - Math.exp(-(t - changed) / 1400));
    // and never run ahead of the minimum time
    const u = Math.min(1, elapsed / minMs);
    const cap = u >= 1 ? 1 : (1 - (1 - u) * (1 - u)) * 0.985;
    const aim = elapsed >= o.maxMs ? 1 : Math.min(goal, cap);
    shown = Math.max(shown, shown + (aim - shown) * (1 - Math.exp(-dt / 150)));
    if (aim >= 1 && shown > 0.996) shown = 1;
    render();
    if (shown >= 1) finish();
    else raf = requestAnimationFrame(frame);
  };

  const stop = () => {
    finished = true;
    if (raf) cancelAnimationFrame(raf);
    release();
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    try {
      sessionStorage.setItem(o.key, "1");
    } catch {
      /* fine: it shows again next time */
    }
    el.classList.add("is-done");
    w.setTimeout(
      () => {
        release();
        el.classList.add("is-lift");
        w.dispatchEvent(new Event("preloader:lift"));
        w.setTimeout(
          () => {
            el.remove();
            w.dispatchEvent(new Event("preloader:done"));
          },
          reduce ? 400 : 750,
        );
      },
      reduce ? 100 : 250,
    );
  };

  raf = requestAnimationFrame(frame);
  // a tab opened in the background gets no animation frames: still finish
  w.setTimeout(() => {
    if (finished) return;
    shown = 1;
    render();
    finish();
  }, o.maxMs + 400);
}
