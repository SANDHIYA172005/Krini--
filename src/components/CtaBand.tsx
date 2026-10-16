import { enquireHref, site } from "../content/site";
import { Arrow, Glyph } from "./ui";

/**
 * The band that closes a page: on gold, one panel in two halves. The dark
 * half says what it is about (the label, the line, what to send us, the hours)
 * and gives the phone and email large. The white half has the ways to start:
 * Enquire now (the Contact page, with the enquiry's type chosen: `type`), Call
 * and WhatsApp; and, with `places` (the home page), the office and factory,
 * each opening its map: name, address and phone together on the page, for
 * people and for local search.
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
  const line = (l: readonly string[]) => l.join(" ").replace(/,\s*$/, "");
  return (
    <section className="cta-band cta3 section theme-yellow" aria-labelledby="cta-title">
      <div className="frame">
        <div className="cta3-panel">
          <div className="cta3-dark">
            <p className="cta3-k">{label}</p>
            <h2 id="cta-title" className="cta3-title">
              {heading}
            </h2>
            <p className="cta3-body">{body}</p>
            <ul className="cta3-chips">
              <li>
                <Glyph name="clock" size={16} /> Open {c.hours}
              </li>
              <li>
                <Glyph name="services" size={16} /> ISO certified · Chennai
              </li>
            </ul>
            <div className="cta3-reach">
              <a href={c.phoneHref}>
                <span className="cta3-reach-ic">
                  <Glyph name="call" size={18} />
                </span>
                <span>
                  <small>Call us</small>
                  {c.phone}
                </span>
              </a>
              <a href={`mailto:${c.email}`}>
                <span className="cta3-reach-ic">
                  <Glyph name="mail" size={18} />
                </span>
                <span>
                  <small>Email</small>
                  {c.email}
                </span>
              </a>
            </div>
          </div>

          <div className="cta3-light">
            <p className="cta3-light-k">Start here</p>
            <a href={enquireHref(type)} className="cta3-enquire" data-enquire={type}>
              Enquire now <Arrow />
            </a>
            <div className="cta3-row">
              <a href={c.phoneHref} className="cta3-btn">
                <Glyph name="call" size={18} /> Call
              </a>
              <a href={c.whatsapp} className="cta3-btn cta3-wa" target="_blank" rel="noopener noreferrer">
                <Glyph name="chat" size={18} /> WhatsApp
              </a>
            </div>
            {places ? (
              <address className="cta3-places">
                <a href={c.officeMap} target="_blank" rel="noopener noreferrer">
                  <span className="cta3-pin">
                    <Glyph name="contact" size={18} />
                  </span>
                  <span className="cta3-place">
                    <strong>Office</strong>
                    <span>{line(c.office)}</span>
                  </span>
                  <Arrow className="cta3-go" />
                </a>
                <a href={c.factoryMap} target="_blank" rel="noopener noreferrer">
                  <span className="cta3-pin">
                    <Glyph name="services" size={18} />
                  </span>
                  <span className="cta3-place">
                    <strong>Factory</strong>
                    <span>{line(c.factory)}</span>
                  </span>
                  <Arrow className="cta3-go" />
                </a>
              </address>
            ) : (
              <p className="cta3-note">Tell us the product, the quantity and where it is to be delivered.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
