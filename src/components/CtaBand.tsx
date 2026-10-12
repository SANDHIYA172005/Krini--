import { enquireHref, site } from "../content/site";
import { Arrow, Glyph, SectionHead } from "./ui";

/**
 * The band that closes a page: a line set large across the full width, then,
 * under a rule, what to send us and three ways to get in touch. The heading
 * has the whole width to itself, so nothing ever sits beside it (a long word
 * such as "recommendation?" is also fitted to the width by fit.ts). The
 * enquiry button opens the Contact page's form with its type chosen (`type`).
 * With `places` (the home page) it also gives the office and factory addresses,
 * as on the Contact page, each opening its map: the name, address and phone
 * together on the page, for people and for local search.
 */
export function CtaBand({
  heading = site.cta.heading,
  body = site.cta.body,
  type = "Enquiry",
  label = site.cta.label,
  places = false,
}: {
  heading?: string;
  body?: string;
  type?: string;
  label?: string;
  places?: boolean;
}) {
  const c = site.contact;
  return (
    <section className="cta-band section theme-yellow" aria-labelledby="cta-title">
      <div className="cta-glow" aria-hidden="true" />
      <div className="frame">
        <SectionHead>{label}</SectionHead>
        <h2 id="cta-title" className="cta-title display" data-split>
          {heading}
        </h2>
        <div className="cta-foot" data-reveal>
          <div>
            <p className="cta-body">{body}</p>
            <p className="cta-reach label">
              <a href={c.phoneHref}>{c.phone}</a>
              <span aria-hidden="true">·</span>
              <a href={`mailto:${c.email}`}>{c.email}</a>
            </p>
            {places ? (
              <address className="cta-places">
                <a href={c.officeMap} target="_blank" rel="noopener noreferrer">
                  <span className="label">Office</span>
                  <span>{c.office.join(" ")}</span>
                </a>
                <a href={c.factoryMap} target="_blank" rel="noopener noreferrer">
                  <span className="label">Factory</span>
                  <span>{c.factory.join(" ")}</span>
                </a>
              </address>
            ) : null}
          </div>
          <div className="cta-actions">
            <a href={enquireHref(type)} className="btn btn-primary" data-enquire={type} data-magnetic>
              Enquire now <Arrow />
            </a>
            <a href={c.phoneHref} className="btn btn-ghost" data-magnetic>
              <Glyph name="call" size={16} /> Call
            </a>
            <a href={c.whatsapp} className="btn btn-ghost" target="_blank" rel="noopener noreferrer" data-magnetic>
              <Glyph name="chat" size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
