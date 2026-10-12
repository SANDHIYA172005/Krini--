import { enquireHref, routes, site } from "../content/site";
import { articles } from "../content/articles";
import { seo } from "../content/pages";
import { faqPage, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { ScrollHero } from "../components/ScrollHero";
import { Range } from "../components/Range";
import { Showroom } from "../components/Showroom";
import { Figures } from "../components/Figures";
import { ServicesStrip } from "../components/Services";
import { ArticleCard } from "../components/ArticleCard";
import { CtaBand } from "../components/CtaBand";
import { Faq } from "../components/Faq";
import { SectionIntro } from "../components/Blocks";
import { SwipeUI } from "../components/Swipe";
import { Arrow, CgNote, Icon, SectionHead, type IconName } from "../components/ui";

const industryIcon: Record<string, IconName> = { "auto-assembly": "car", "auto-component": "gear", construction: "crane", paint: "spray" };

/**
 * Home, in the live site's order: the hero, a film played by
 * scrolling (a line saying what Krini Crude is and where, the name and its
 * tagline are the page's h1), then lubricants, greases
 * and aerosols (the range, a still from the film for each), "Welcome to Krini Crude", "Our Product Range"
 * (the showroom), the industries we serve and the figures; then what we do,
 * the latest guides, the questions buyers ask (with the page's FAQPage
 * structured data) and a way to get in touch, with the office and factory
 * addresses. Each part points on to its
 * own page.
 */
export function HomePage() {
  const faq = site.pages.home.faq;
  return (
    <Shell current="home" schema={[webPage(seo.home), faqPage(seo.home.path, faq.items)]}>
      <ScrollHero />
      <Range />
      <HomeAbout />
      <Showroom />
      <Industries />
      <section className="section-tight theme-yellow" aria-label="Krini Crude in figures">
        <div className="frame">
          <Figures />
        </div>
      </section>
      <HomeServices />
      <LatestPosts />
      <Faq items={faq.items} label={faq.label} heading={faq.heading} lead={faq.lead} />
      <CtaBand places />
    </Shell>
  );
}

function HomeAbout() {
  const a = site.about;
  const h = site.pages.home.about;
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="frame">
        <SectionHead>{h.label}</SectionHead>
        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="about-title" className="display text-display-wide" data-split>
              {h.heading[0]}{" "}
              <br />
              {h.heading[1]}
            </h2>
            <p className="welcome-lead mt-8" data-reveal>
              {a.lead}
            </p>
          </div>
          <figure className="lg:col-span-6 lg:col-start-7" data-drift="0.05">
            <div className="media welcome-media aspect-[4/3] rounded-sm" data-shutter>
              {/* the 4:3 still, so the frame never cuts Flow's watermark */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/blog-lubricants.webp"
                alt="Helical steel gears in a gearbox, with a stream of oil feeding the mesh"
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between">
              <span className="label text-mute">Lubrication at the mesh point</span>
              <CgNote />
            </figcaption>
          </figure>
        </div>

        {/* the welcome's second and third paragraphs, word for word, and the markets */}
        <ul className="welcome-cards m-swipe mt-14 lg:mt-20" data-swipe>
          {h.parts.map((title, k) => (
            <li key={title} className="welcome-card" data-reveal>
              <span className="welcome-icon" data-draw>
                <Icon name={k === 0 ? "flask" : "label"} />
              </span>
              <h3 className="welcome-card-title display-tight">{title}</h3>
              <p className="welcome-card-body">{a.story[k + 1]}</p>
            </li>
          ))}
          <li className="welcome-card welcome-card-markets" data-reveal>
            <span className="welcome-icon" data-draw>
              <Icon name="factory" />
            </span>
            <h3 className="welcome-card-title display-tight">Markets we supply</h3>
            <ul className="mt-5 flex flex-wrap gap-2" data-chips>
              {a.markets.map((m) => (
                <li key={m} className="chip">
                  {m}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <SwipeUI count={h.parts.length + 1} label="about Krini Crude" />
      </div>
    </section>
  );
}

/**
 * The industries we serve as boxes: four in a row from 1024px, a row to swipe
 * on phones, each with the live site's own description in full.
 */
function Industries() {
  const h = site.pages.home.industries;
  return (
    <section id="industries" className="section theme-tint" aria-labelledby="industries-title">
      <div className="frame">
        <SectionIntro label={h.label} heading={h.heading} id="industries-title" wide />
        <ul className="ind-grid m-swipe mt-12 lg:mt-16" data-swipe>
          {site.industries.map((ind, i) => {
            return (
              <li key={ind.id} className="ind-box" data-reveal>
                <div className="ind-top">
                  <span className="ind-icon" data-draw>
                    <Icon name={industryIcon[ind.id]} />
                  </span>
                  <span className="label text-mute tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="ind-title display-tight">{ind.title}</h3>
                <p className="ind-body">{ind.body}</p>
              </li>
            );
          })}
        </ul>
        <SwipeUI count={site.industries.length} label="industry" />
      </div>
    </section>
  );
}

function HomeServices() {
  const s = site.services;
  const h = site.pages.home.services;
  const pl = site.pages.home.privateLabel;
  return (
    <section id="services" className="section theme-navy" aria-labelledby="services-title">
      <div className="frame">
        <SectionHead>{h.label}</SectionHead>
        <h2 id="services-title" className="display text-display-wide mt-10 lg:mt-14" data-split>
          {h.heading[0]}{" "}
          <br />
          {h.heading[1]}
        </h2>
        <p className="mt-8 max-w-xl text-mute" data-reveal>
          {s.lead}
        </p>
        <div className="mt-12 lg:mt-16">
          <ServicesStrip />
        </div>

        {/* private label, in brief */}
        <div className="feature mt-16 lg:mt-24">
          <div className="media feature-media" data-shutter>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/manufacturing-43.webp"
              alt="Production hall with stainless-steel process tanks, valves and yellow safety lines"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="feature-body" data-reveal>
            <p className="label text-amber">{pl.label}</p>
            <h3 className="display-tight mt-6 text-[clamp(1.75rem,3.4vw,3rem)] leading-[0.95]">{pl.heading}</h3>
            <p className="mt-6 max-w-md text-mute">{pl.body}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`${routes.services}#private-label`} className="btn btn-primary" data-magnetic>
                {pl.cta} <Arrow />
              </a>
              <a href={enquireHref("Private label")} className="btn btn-ghost" data-enquire="Private label" data-magnetic>
                Discuss private label
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LatestPosts() {
  const h = site.pages.home.blog;
  return (
    <section id="blog" className="section border-t border-bone/10" aria-labelledby="blog-title">
      <div className="frame">
        <SectionIntro
          label={h.label}
          heading={h.heading}
          id="blog-title"
          wide
          aside={
            <a href={routes.blog} className="btn btn-ghost" data-magnetic>
              {h.cta} <Arrow />
            </a>
          }
        />
        <ul className="m-swipe mt-12 grid gap-x-6 gap-y-14 md:grid-cols-3 lg:mt-16" data-swipe>
          {articles.slice(0, 3).map((a) => (
            <li key={a.slug} data-reveal>
              <ArticleCard a={a} />
            </li>
          ))}
        </ul>
        <SwipeUI count={3} label="guide" />
      </div>
    </section>
  );
}
