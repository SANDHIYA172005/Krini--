import { enquireHref, routes, site } from "../content/site";
import { heroSeq } from "../content/media";
import { Arrow, Name } from "./ui";

/** The four steps as named on the rail beside the hero; where each starts in the scroll is heroSeq.beats. */
const STEPS = ["Krini Crude", "What we make", "Aerosols", "Get started"];
/** Phones, under the buttons: three of the live site's figures (site.stats). */
const [productsStat, , clientsStat] = site.stats;
const OPEN_STATS = [
  { value: `${productsStat?.value ?? 70}${productsStat?.suffix ?? "+"}`, label: "Products" },
  { value: `${clientsStat?.value ?? 1000}${clientsStat?.suffix ?? "+"}`, label: "Happy clients" },
  { value: "ISO", label: "Certified" },
];

/**
 * Home's hero, "From rust to radiance": a Google Flow film, one take, played
 * by scrolling. Golden oil pours over a rusty gear shaft, a thick coat of
 * grease follows, a spray can mists it, and the camera pulls back to the gear:
 * each thing Krini Crude does (site.work) in turn. Four screens, three
 * scrolls: the stage stays on screen while the scroll position picks the
 * film's frame (src/motion/scrollhero.ts draws it on a canvas) and the step
 * whose words are shown: the name, then the three lines of products side by
 * side while the oil pours and the grease coats, then the spray can at work
 * (the film on its own, no words), then the promise and the buttons. The h1 is the name with a
 * small line over it saying what Krini Crude is and where (site.film.kicker:
 * "Lubricant manufacturer in Chennai") and the tagline under it. On the first screen the
 * three lines are small pills, each a jump to its part of the film (without
 * JavaScript, a link to its page); each line's words carry a spec plate of its
 * products and grades (site.work[].spec, as published on krinicrude.com).
 * With reduced motion or without JavaScript the hero is one screen: the film's
 * last frame, the name, the promise and the buttons. Docs: docs/HERO.md.
 */
export function ScrollHero() {
  const { film, work } = site;
  const count = String(work.length).padStart(2, "0");
  return (
    <section id="top" className="sh theme-navy" data-hero data-scrollhero aria-labelledby="hero-title" suppressHydrationWarning>
      <div className="sh-stage" data-sh-stage>
        <picture className="sh-still" aria-hidden="true">
          <source media="(max-aspect-ratio: 4/5)" srcSet={heroSeq.endTall} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroSeq.end} alt="" width={heroSeq.width} height={heroSeq.height} decoding="async" fetchPriority="high" />
        </picture>
        <canvas className="sh-canvas" data-sh-canvas aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sh-mark" data-sh-mark src={heroSeq.mark.src} alt="" width={35} height={17} aria-hidden="true" />
        <div className="sh-scrim" aria-hidden="true" />

        <div className="sh-words frame">
          <div className="sh-step sh-open is-on" data-sh-step="0">
            <h1 id="hero-title" className="sh-title">
              <span className="sh-kicker label">{film.kicker}</span>{" "}
              <span className="sh-name display">
                <Name />
              </span>{" "}
              <span className="sh-tagline">{film.tagline}</span>
            </h1>
            <p className="sh-motto">{film.motto}</p>
            <ul className="sh-jumps" aria-label="What we make">
              {work.map((w, i) => (
                <li key={w.id}>
                  <a href={w.href} className="sh-jump label" data-sh-jump={w.id === "aerosols" ? 2 : 1}>
                    {w.rail}
                  </a>
                </li>
              ))}
            </ul>
            {/* phones: the film plays as a video on one screen, so the buttons sit here */}
            <div className="sh-open-ctas">
              <a href={routes.products} className="btn btn-primary">
                View products <Arrow />
              </a>
              <a href={enquireHref("Request a quote")} className="btn btn-ghost" data-enquire="Request a quote">
                Get a quote <Arrow />
              </a>
            </div>
            <dl className="sh-open-stats">
              {OPEN_STATS.map((st) => (
                <div key={st.label}>
                  <dt>{st.label}</dt>
                  <dd>{st.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="sh-step sh-lines" data-sh-step={1}>
            <p className="sh-count label" aria-hidden="true">
              <span className="text-amber">What we make</span>
            </p>
            <h2 className="sr-only">What we make</h2>
            <ol className="sh-lines-list">
              {work.map((w, i) => (
                <li key={w.id} className="sh-line">
                  <span className="sh-line-n label tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")} / {count}
                  </span>
                  <h3 className="sh-line-name display-tight">{w.name}</h3>
                  <p className="sh-line-body">{w.body}</p>
                  <p className="sh-line-grades">
                    {w.spec.map((row) => (
                      <span key={row.label} className="grade">
                        {row.label}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
            <a href={routes.products} className="sh-link label">
              View all products <Arrow />
            </a>
          </div>

          {/* aerosols: the spray can at work, the film on its own (the line is in "What we make") */}
          <div className="sh-step sh-spray" data-sh-step={2} aria-hidden="true" />

          <div className="sh-step sh-end" data-sh-step={3}>
            <p className="sh-big display-tight">{film.promise}</p>
            <p className="sh-body">{site.hero.lead}</p>
            <div className="sh-ctas">
              <a href={routes.products} className="btn btn-primary" data-magnetic>
                View products <Arrow />
              </a>
              <a href={enquireHref("Request a quote")} className="btn btn-ghost" data-enquire="Request a quote" data-magnetic>
                Get a quote <Arrow />
              </a>
            </div>
          </div>
        </div>

        {/* in the middle at the foot of the first screen: keep scrolling */}
        <div className="sh-scroll" aria-hidden="true">
          <span className="sh-mouse">
            <span className="sh-wheel" />
          </span>
          <span className="sh-scroll-text">Scroll to see what we do</span>
          <svg className="sh-chev" width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M1 1.5 7 7.5l6-6" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </div>

        {/* where the visitor is: one mark per step, each a way to jump there */}
        <nav className="sh-rail" aria-label="Hero steps">
          <ol>
            {STEPS.map((s, i) => (
              <li key={s}>
                <button type="button" className={`sh-tick${i === 0 ? " is-on" : ""}`} data-sh-tick={i} aria-label={`Step ${i + 1}: ${s}`}>
                  <span className="sh-tick-name label">{s}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <div className="sh-bar" aria-hidden="true">
          <span data-sh-bar />
        </div>
        {/* phones: at the foot of the one-screen hero, a nudge to scroll on */}
        <div className="sh-down" aria-hidden="true">
          <span>Scroll</span>
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M1 1.5 7 7.5l6-6" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
