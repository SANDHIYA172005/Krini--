import "./preloader.css";
import { bootPreloader, type PreloaderOptions } from "./boot";
import { gearPairSvg } from "./gears";

const options: PreloaderOptions = {
  key: "kc:preloaded",
  // on every full load (a refresh included); links inside the site swap the page without
  // reloading it (FastNav), so it doesn't come back on every click
  once: false,
  // only when the page is refreshed
  onlyReload: true,
  // never more than 3 seconds in all: the counter reaches 100 by about 2.4 s and the screen has lifted by 3 s
  minMs: 1300,
  maxMs: 1900,
  // the engine: two gears turning in mesh, a drop of oil falling where the teeth meet
  // (engine.ts has a three-cylinder engine: engineSvg() with geo: engineGeometry)
  engine: gearPairSvg(),
  // the gears turning in oil (Google Flow, shot on pure black): cropped to the gears, 816 × 432,
  // 3.5 s, no sound (public/videos). The WebM's ground is transparent (only the gears are in it);
  // the MP4, for Safari, has a black ground that the "lighten" blend hides.
  video: {
    webm: `${process.env.NEXT_PUBLIC_ASSET_BASE ?? ""}/videos/loader-gears-alpha.webm`,
    mp4: `${process.env.NEXT_PUBLIC_ASSET_BASE ?? ""}/videos/loader-gears.mp4`,
    poster: `${process.env.NEXT_PUBLIC_ASSET_BASE ?? ""}/videos/loader-gears-alpha.webp`,
  },
};

// "<" escaped so nothing in the options can close the script early
const script = `(${bootPreloader.toString()})(${JSON.stringify(options).replace(/</g, "\\u003c")})`;

/**
 * The loading screen. All it renders is its boot script (boot.ts),
 * which puts the screen up before anything else on the page has loaded: keep
 * it first inside <body> in app/layout.tsx.
 */
export function Preloader() {
  return <script id="kc-preloader" dangerouslySetInnerHTML={{ __html: script }} />;
}
