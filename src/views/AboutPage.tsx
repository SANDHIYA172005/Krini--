import { enquireHref, routes, site } from "../content/site";
import { lines } from "../content/catalogue";
import { seo, trail } from "../content/pages";
import { breadcrumbs, faqPage, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { Breadcrumbs, Facts } from "../components/PageHeader";
import { Figures } from "../components/Figures";
import { Faq } from "../components/Faq";
import { CtaBand } from "../components/CtaBand";
import { SectionIntro } from "../components/Blocks";
import { Arrow, CgNote, Fact, Glyph, Icon, SectionHead, type IconName } from "../components/ui";
import { isPlaceholder } from "../content/placeholder";

/**
 * About: the company in depth. The header: the live site's line, the name and
 * the sentence under it beside a picture held to the screen's height (a turning
 * seal on its corner, a fine gold frame behind it), the figures under them; the
 * story, vision and mission (from the live site's own words),
 * research & development from the Director's desk (name, message and photo to
 * be supplied), six things every client gets (a spec sheet), the figures, how
 * we work from enquiry to after-sales, where we are, and questions.
 */
export function AboutPage() {
  const p = site.pages.about;
  const a = site.about;
  const c = site.contact;
  const t = trail.about;
  return (
    <Shell current="about" schema={[webPage(seo.about, "AboutPage"), breadcrumbs(t), faqPage(seo.about.path, p.faq)]}>
      <div className="about-page">
        {/* Header: the live site's line, the name (as in the logo) and the sentence under it, centred
            against the picture; the figures under them */}
        <header className="page-head about-head" aria-labelledby="page-title">
          <div className="frame">
            <Breadcrumbs trail={t} />
            <div className="mt-10 grid gap-14 lg:mt-8 lg:grid-cols-12 lg:items-center lg:gap-8">
              <div className="lg:col-span-7">
                <p className="label text-amber" data-reveal>
                  {p.lead}
                </p>
                <h1 id="page-title" className="about-title display-tight mt-6" data-split>
                  {"About "}
                  <br />
                  <span className="text-amber">Krini</span> Crude
                </h1>
                <p className="about-lead mt-8 max-w-measure" data-reveal>
                  {a.headline}
                </p>
                <div className="mt-10 flex flex-wrap gap-3" data-reveal>
                  <a href={enquireHref("Enquiry")} className="btn btn-primary" data-enquire="Enquiry" data-magnetic>
                    Talk to our team <Arrow />
                  </a>
                  <a href={routes.products} className="btn btn-ghost" data-magnetic>
                    View products <Arrow />
                  </a>
                </div>
              </div>
              <figure className="about-figure mx-auto w-full sm:max-w-[460px] lg:col-span-5 lg:max-w-none" data-drift="0.05">
                <div className="about-pic">
                  {/* 4:3 on phones, so the picture doesn't take the whole screen; 4:5 on tablets; 4:3 again from
                      1024px, filling its column beside the words. Each still has the frame's own shape. */}
                  <div className="media aspect-[4/3] rounded-sm sm:aspect-[4/5] lg:aspect-[4/3]" data-shutter>
                    <picture className="media-pic">
                      <source media="(min-width: 1024px)" srcSet="/images/blog-lubricants.webp" width={1200} height={900} />
                      <source media="(min-width: 640px)" srcSet="/images/about.webp" width={1200} height={1500} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/blog-lubricants.webp"
                        alt="Helical steel gears in a gearbox, with a stream of oil feeding the mesh"
                        width={1200}
                        height={900}
                        decoding="async"
                        fetchPriority="high"
                      />
                    </picture>
                  </div>
                </div>
                <figcaption className="about-caption flex items-center justify-between gap-4">
                  <span className="label text-mute">Lubrication at the mesh point</span>
                  <CgNote />
                </figcaption>
              </figure>
            </div>
            <Facts items={p.facts} />
          </div>
        </header>

        {/* Our story: an editorial spread */}
        <section id="story" className="section" aria-labelledby="story-title">
          <div className="frame">
            <SectionHead>{p.story.label}</SectionHead>
            <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <h2 id="story-title" className="display text-display-sm" data-split>
                    {p.story.heading}
                  </h2>
                  <blockquote className="story-quote" data-reveal>
                    <p>{p.story.quote}</p>
                  </blockquote>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="story-body" data-reveal>
                  {a.story.map((para, i) => (
                    <p key={para.slice(0, 24)} className={i === 0 ? "dropcap" : undefined}>
                      {para}
                    </p>
                  ))}
                </div>
                <p className="label mt-12 text-mute" data-reveal>
                  Our three lines
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" data-chips>
                  {lines.map((l) => (
                    <li key={l.id}>
                      <a href={routes.line(l.slug)} className="chip chip-link">
                        {l.title} <Arrow className="ml-2" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="label mt-8 text-mute" data-reveal>
                  Markets we supply
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" data-chips>
                  {a.markets.map((m) => (
                    <li key={m} className="chip">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & mission: the vision fills like a gauge as it scrolls up; the mission in four commitments */}
        <section id="vision" className="section vm theme-navy" aria-labelledby="vision-title">
          <div className="frame">
            <SectionHead>{p.vision.label}</SectionHead>
            <p className="label mt-12 text-amber lg:mt-20" data-reveal>
              {p.vision.visionLabel}
            </p>
            <h2 id="vision-title" className="vm-vision display" data-fill>
              <span className="fill-line">{p.vision.vision}</span>
              <span className="fill-top" aria-hidden="true">
                {p.vision.vision}
              </span>
            </h2>
            <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <p className="label text-amber" data-reveal>
                  {p.vision.missionLabel}
                </p>
                <p className="mt-5 max-w-xs text-mute" data-reveal>
                  What we are committed to, in our own words.
                </p>
              </div>
              <ol className="vm-mission lg:col-span-9" data-rows>
                {p.vision.mission.map((m, i) => (
                  <li key={m.title} className="vm-item">
                    <span className="vm-n display" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="display-tight text-xl leading-tight">{m.title}</h3>
                      <p className="mt-2 text-mute">{m.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Research & development: from the Director's desk */}
        <section id="research" className="section border-t border-bone/10" aria-labelledby="rd-title">
          <div className="frame">
            <SectionHead>{p.rd.label}</SectionHead>
            <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
              {/* the Director: a small portrait beside the name on phones and tablets, a large one from 1024px */}
              <div className="director lg:col-span-4" data-reveal>
                <div className={`portrait-slot${isPlaceholder(p.leadership.photo) ? " is-empty" : ""}`}>
                  {isPlaceholder(p.leadership.photo) ? (
                    <span className="portrait-mono display" aria-hidden="true">
                      K
                    </span>
                  ) : null}
                  <Fact value={p.leadership.photo} />
                </div>
                <p className="director-id">
                  <Fact value={p.leadership.name} />
                  <span className="label text-mute">{p.leadership.role}, Krini Crude</span>
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="label text-mute" data-reveal>
                  {p.rd.desk}
                </p>
                <h2 id="rd-title" className="display mt-5 text-[clamp(min(2rem,8.4vw),4.4vw,4.5rem)] leading-[0.95]" data-split>
                  {p.rd.heading}
                </h2>
                <div className="letter" data-reveal>
                  <p className="letter-head label">
                    <span>Krini Crude · Research &amp; development</span>
                    <span>Chennai</span>
                  </p>
                  <p className="text-xl leading-relaxed text-bone">{p.leadership.note}</p>
                  <div className="mt-6">
                    <Fact value={p.leadership.message} />
                  </div>
                </div>
                <ul className="routes" aria-label="How our products are formulated">
                  {a.routes.map((r) => (
                    <li key={r.title} className="route" data-reveal>
                      <span className="route-icon" data-draw>
                        <Icon name={r.icon as IconName} />
                      </span>
                      <h3 className="route-title">{r.title}</h3>
                      <p className="route-short">{r.short}</p>
                      <p className="route-body">{r.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values: a spec sheet */}
        <section id="values" className="section border-t border-bone/10" aria-labelledby="values-title">
          <div className="frame">
            <SectionIntro label={p.values.label} heading={p.values.heading} id="values-title" aside={<p className="max-w-md text-mute">{p.values.lead}</p>} />
            <ol className="spec mt-16 lg:mt-24">
              {site.principles.map((pr, i) => (
                <li key={pr.title} className="spec-row" data-reveal>
                  <span className="spec-code label tabular-nums">KC–{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display-tight text-xl leading-tight">{pr.title}</h3>
                  <p className="text-mute">
                    {pr.body}
                    {pr.detail ? (
                      <span className="ml-3 inline-block align-middle">
                        <Fact value={pr.detail} />
                      </span>
                    ) : null}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Figures */}
        <section id="figures" className="section figures-band theme-yellow" aria-labelledby="figures-title">
          <div className="frame">
            <SectionIntro label={p.figures.label} heading={p.figures.heading} id="figures-title" />
            <div className="mt-16 lg:mt-24">
              <Figures />
            </div>
          </div>
        </section>

        {/* How we work */}
        <section id="process" className="section border-t border-bone/10" aria-labelledby="process-title">
          <div className="frame">
            <SectionIntro
              label={p.process.label}
              heading={p.process.heading}
              id="process-title"
              aside={
                <a href={`${routes.services}#private-label`} className="btn btn-ghost" data-magnetic>
                  Private label, step by step <Arrow />
                </a>
              }
            />
            <ol className="track mt-16 lg:mt-24" data-rows>
              {p.process.steps.map((st, i) => (
                <li key={st.title} className="track-step">
                  <span className="track-node label tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-tight text-lg leading-tight">{st.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Where we are */}
        <section id="places" className="section border-t border-bone/10" aria-labelledby="places-title">
          <div className="frame">
            <SectionIntro label={p.places.label} heading={p.places.heading} id="places-title" />
            <div className="place-grid mt-12 lg:mt-24">
              {[
                { label: "Office address", lines: c.office, map: c.officeMap },
                { label: "Factory address", lines: c.factory, map: c.factoryMap },
              ].map((pl) => (
                <div key={pl.label} className="place-box" data-reveal>
                  <p className="place-label label">
                    <Glyph name={pl.label === "Office address" ? "contact" : "services"} size={16} /> {pl.label}
                  </p>
                  <address className="place-address">
                    {pl.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <a href={pl.map} className="btn btn-ghost place-dir" target="_blank" rel="noopener noreferrer">
                    <Glyph name="route" size={16} /> Get directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Faq items={p.faq} />
        <CtaBand />
      </div>
    </Shell>
  );
}

/** A round seal with the company's line turning around the brand mark (CSS, .seal). */
function Seal({ text }: { text: string }) {
  return (
    <div className="seal" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="seal-ring">
        <defs>
          <path id="seal-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="seal-text">
          <textPath href="#seal-path" textLength="286" lengthAdjust="spacing">
            {`${text.toUpperCase()} · `}
          </textPath>
        </text>
      </svg>
      <span className="seal-mark">
        <span className="seal-dot" />
      </span>
    </div>
  );
}
