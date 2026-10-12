/**
 * Hero imagery: one lit plinth per product line.
 *
 * Unbranded product visualisations generated with Google Flow (Nano Banana
 * Pro, 3:4), downloaded at 2K and graded to match by scripts/showroom.py:
 *   lubricants     a steel drum, an open pail of grease, a tin and a bottle of oil
 *   construction   jerrycans, a drum and a pail of release compound, formwork and rebar behind
 *   aerosols       six spray cans, one releasing an amber mist
 * Each keeps Flow's visible watermark (bottom right), so the page never crops
 * the bottom of the pictures. See docs/HERO.md.
 *
 * Paths are prefixed with NEXT_PUBLIC_ASSET_BASE so a static copy can live in a
 * sub-folder; leave it unset for a normal Next.js deployment.
 */
const base = process.env.NEXT_PUBLIC_ASSET_BASE ?? "";

const stage = (name: string, alt: string, focus: string) => ({
  /** 1200×1600 */
  src: `${base}/images/showroom-${name}.webp`,
  /** 720×960, for phones */
  srcSmall: `${base}/images/showroom-${name}-sm.webp`,
  alt,
  /** object-position: the plinth stays anchored to the bottom, only the empty light cone above is trimmed */
  focus,
});

export const heroMedia = {
  width: 1200,
  height: 1600,
  /** Keyed by product line id (site.products[].id). */
  stages: {
    lubricants: stage(
      "lubricants",
      "A steel oil drum, an open pail of amber grease, a tin and a bottle of oil on a black plinth under a spotlight",
      "50% 100%",
    ),
    construction: stage(
      "construction",
      "Two jerrycans, an oil drum and a pail of release compound on a black plinth, with steel formwork and rebar behind",
      "50% 100%",
    ),
    aerosols: stage("aerosols", "Six aerosol cans on a black plinth, one releasing a fine amber mist", "50% 100%"),
  },
  /** Shown under the plinths so the pictures are never mistaken for Krini Crude's own packaging. */
  credit: "AI-generated product visualisations (Google Flow), not Krini Crude packaging",
} as const;

export type HeroMedia = typeof heroMedia;
export type StageId = keyof typeof heroMedia.stages;

/**
 * The hero film's version, added to its frame addresses: change it whenever the
 * frames are replaced, so browsers fetch the new film rather than showing the
 * old one from their cache (the frames are served as unchanging for a year).
 */
const seqVersion = "rust";

/**
 * Home's hero (ScrollHero.tsx): one Google Flow film, a single take, played by
 * scrolling (src/motion/scrollhero.ts). A rusty gear shaft; golden oil pours
 * over it; a thick coat of grease; a spray can mists it; the camera pulls back
 * to the gear. scripts/hero/frames.sh cuts it into frames packed into sheets
 * (perSheet frames, top to bottom, in one image each) and prints `frames`.
 */
export const heroSeq = {
  /** Every frame of the film: 8 s at 24 frames a second. */
  frames: 192,
  fps: 24,
  perSheet: 10,
  sheet: (k: number) => `${base}/images/hero-seq/s${String(k).padStart(2, "0")}.webp?v=${seqVersion}`,
  /** One frame's size in the sheets. */
  width: 1280,
  height: 720,
  /** The last frame: the hero without the motion, wide and (cut 4:5 around the gear, Flow's mark stamped in its corner) for phones. */
  end: `${base}/images/hero-seq/end.webp?v=${seqVersion}`,
  endTall: `${base}/images/hero-seq/end-tall.webp?v=${seqVersion}`,
  /**
   * Where the film's subject sits across the frame (0 left, 1 right) as it
   * plays, as [second, x]: the oil and the shaft, then the spray can on the
   * right, then the gear. A narrow screen's crop follows it.
   */
  focus: [
    [0, 0.36],
    [1.2, 0.44],
    [2.2, 0.38],
    [3.8, 0.42],
    [4.4, 0.8],
    [5.7, 0.78],
    [6.4, 0.46],
    [8, 0.5],
  ] as [number, number][],
  /** Where each step of the words starts, in seconds of the film: the name; lubricants & oils (the oil pours); greases (the thick coat); aerosols & sprays (the can); the end (the pull-back). */
  beats: [0, 0.5, 2.6, 4.3, 6.2],
  /** The share of the scroll before the film starts (the name over its first frame), and the share at which it ends (its last frame stays for the rest). */
  lead: 0.08,
  hold: 0.92,
  /** Flow's watermark as it sits in the footage: size and margins from the bottom-right corner, as fractions of the frame. */
  mark: { src: `${base}/images/veo-mark.png`, width: 35 / 1920, height: 17 / 1080, right: 22 / 1920, bottom: 23 / 1080 },
} as const;
