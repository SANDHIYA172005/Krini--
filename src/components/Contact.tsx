import { site } from "../content/site";
import type { Crumb } from "../content/pages";
import { Breadcrumbs } from "./PageHeader";
import { EnquiryForm } from "./Enquiry";
import { Arrow, CgNote, Fact, Glyph } from "./ui";

/**
 * Top of the Contact page, kept short: the plant at dusk behind the h1, one
 * line, and four ways to reach the team. The picture is cut to the frame's
 * shape (4:5 on phones, 16:9 from 768px, 21:9 from 1024px), fades into the
 * page at its edges but not at the watermark in its corner, and eases back as
 * the page scrolls (cinema.ts). The four ways start below the picture, so the
 * mark is never covered.
 */
export function ContactHero({ trail }: { trail: Crumb[] }) {
  const p = site.pages.contact;
  const c = site.contact;
  const quick = [
    { glyph: "call" as const, label: "Call", value: c.phone, href: c.phoneHref },
    { glyph: "chat" as const, label: "WhatsApp", value: "Chat with us", href: c.whatsapp, external: true },
    { glyph: "mail" as const, label: "Email", value: c.email, href: `mailto:${c.email}` },
    { glyph: "route" as const, label: "Visit", value: "Anna Nagar East", href: c.officeMap, external: true },
  ];
  return (
    <section className="contact-hero relative isolate overflow-hidden" aria-labelledby="page-title">
      <div className="contact-bg" aria-hidden="true" data-zoom-frame>
        <picture className="media-pic" data-zoom="1.14">
          <source media="(min-width: 1024px)" srcSet="/images/contact-219.webp" width={2100} height={900} />
          <source media="(min-width: 768px)" srcSet="/images/contact.webp" width={1920} height={1080} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/contact-m.webp" alt="" width={960} height={1200} decoding="async" />
        </picture>
      </div>
      <div className="frame">
        <div className="contact-hero-text">
          <Breadcrumbs trail={trail} />
          <p className="label mt-10 text-amber lg:mt-14" data-reveal>
            {p.label}
          </p>
          <h1 id="page-title" className="display mt-6 text-[clamp(min(2.05rem,8.6vw),7.4vw,8rem)] leading-[0.86]" data-split>
            {p.heading}
          </h1>
          <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-bone md:text-xl" data-reveal>
            {p.lead}
          </p>
        </div>
        <ul className="quick" data-reveal>
          {quick.map((q) => (
            <li key={q.label}>
              <a href={q.href} className="quick-tile" {...(q.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <span className="quick-icon">
                  <Glyph name={q.glyph} />
                </span>
                <span className="quick-label label">{q.label}</span>
                <span className="quick-value">{q.value}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-right">
          <CgNote>Background: AI-generated visualisation</CgNote>
        </p>
      </div>
    </section>
  );
}

/**
 * The enquiry form (the live site's "Enquire Now", the same form as the
 * pop-up on other pages: src/components/Enquiry.tsx) and where to find us.
 * Enquire buttons on this page scroll to the form; links from other pages
 * without JavaScript arrive here as /contact?type=…&product=…#enquiry, and
 * what they are about goes into the message (interactions.ts).
 */
export function ContactMain({ endpoint = "" }: { endpoint?: string }) {
  const c = site.contact;
  const v = site.pages.contact.visit;
  return (
    <section id="details" className="section-tight" aria-label="Enquiry form and addresses">
      <div className="frame grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="enquiry lg:col-span-7">
          <EnquiryForm id="enquiry" endpoint={endpoint} wide />
        </div>

        <aside className="visit lg:col-span-4 lg:col-start-9" aria-labelledby="visit-title" data-reveal>
          <h2 id="visit-title" className="label text-amber">
            {v.label}
          </h2>
          {[
            { label: "Office address", lines: c.office, map: c.officeMap },
            { label: "Factory address", lines: c.factory, map: c.factoryMap },
          ].map((pl) => (
            <div key={pl.label} className="visit-place">
              <p className="label text-mute">{pl.label}</p>
              <address className="mt-2 not-italic leading-relaxed text-bone/90">{pl.lines.join(" ")}</address>
              <a href={pl.map} className="label mt-3 inline-flex items-center gap-2 text-amber hover:text-bone" target="_blank" rel="noopener noreferrer">
                Directions <Arrow />
              </a>
            </div>
          ))}
          <div className="visit-place">
            <p className="label text-mute">Hours</p>
            <p className="mt-2">
              <Fact value={c.hours} />
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
