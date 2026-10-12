import { enquireHref, routes, site } from "../content/site";
import { heroSeq } from "../content/media";
import { Arrow, Name } from "./ui";

/** The steps as named on the rail beside the hero; where each starts in the scroll is heroSeq.steps. */
const STEPS = ["Krini Crude", ...site.work.map((w) => w.rail), "Get started"];

/**
 * Home's hero, "From rust to radiance": a Google Flow film, one take, played
 * by scrolling. Golden oil pours over a rusty gear shaft, a thick coat of
 * grease follows, a spray can mists it, and the camera pulls back to the gear:
 * each thing Krini Crude does (site.work) in turn. The section is eight
 * screens tall and its stage stays on screen; the scroll position picks the
 * film's frame (src/motion/scrollhero.ts draws it on a canvas) and the step
 * whose words are shown: the name, then each line of products over its own
 * part of the film, then the promise and the buttons. The h1 is the name with a
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
                  <a href={w.href} className="sh-jump label" data-sh-jump={1 + i}>
                    {w.rail}
                  </a>
                </li>
              ))}
            </ul>
            <p className="sh-cue label" aria-hidden="true">
              <span className="sh-cue-line" /> Scroll to see what we do
            </p>
          </div>

          {work.map((w, i) => (
            <div key={w.id} className="sh-step" data-sh-step={1 + i}>
              <p className="sh-count label tabular-nums" aria-hidden="true">
                <span className="text-amber">{String(i + 1).padStart(2, "0")}</span> / {count}
              </p>
              <h2 className="sh-big display-tight">{w.name}</h2>
              <p className="sh-body">{w.body}</p>
              <dl className="sh-spec">
                {w.spec.map((row) => (
                  <div key={row.label} className="sh-spec-row">
                    <dt className="label">{row.label}</dt>
                    <dd>
                      {row.values.map((v) => (
                        <span key={v} className="grade">
                          {v}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <a href={w.href} className="sh-link label">
                {w.link} <Arrow />
              </a>
            </div>
          ))}

          <div className="sh-step sh-end" data-sh-step={work.length + 1}>
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
          <a href="#range" className="sh-skip label">
            Skip intro
          </a>
        </nav>
        <div className="sh-bar" aria-hidden="true">
          <span data-sh-bar />
        </div>
      </div>
    </section>
  );
}
