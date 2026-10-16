import { site } from "../content/site";
import { seo } from "../content/pages";
import { faqPage, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { ScrollHero } from "../components/ScrollHero";
import { Range } from "../components/Range";
import { CtaBand } from "../components/CtaBand";
import { Faq } from "../components/Faq";
import { MediaSlot, SectionHead } from "../components/ui";

/**
 * Home, kept to what search engines and first-time visitors need: the hero (a
 * film played by scrolling; a line saying what Krini Crude is and where, the
 * name and its tagline are the page's h1), the three ranges (lubricants and
 * greases, construction chemicals, aerosols, with their products and grades),
 * "Welcome to Krini Crude" (who we are, in Chennai), the questions buyers ask
 * (with the page's FAQPage structured data) and a way to get in touch, with
 * the office and factory addresses. Each part points on to its own page.
 */
export function HomePage() {
  const faq = site.pages.home.faq;
  return (
    <Shell current="home" schema={[webPage(seo.home), faqPage(seo.home.path, faq.items)]}>
      <ScrollHero />
      <Range />
      <HomeAbout />
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
          <div className="welcome-text lg:col-span-7">
            <h2 id="about-title" className="display text-display-wide" data-split>
              {h.heading[0]}{" "}
              <br />
              {h.heading[1]}
            </h2>
            <p className="welcome-lead mt-8" data-reveal>
              {a.lead}
            </p>
          </div>
          <figure className="welcome-fig lg:col-span-5 lg:col-start-8" data-drift="0.05">
            <div className="media welcome-media aspect-[4/3] rounded-sm" data-shutter>
              <MediaSlot label="Welcome photo" w={1200} h={900} />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

