import { routes, site, type PageId } from "../content/site";
import { Glyph } from "./ui";

/**
 * Every page but Contact ends here (Contact is reached from Enquire now), kept small: one dark row with the name and
 * tagline, the main pages, and the phone and email; under it the copyright,
 * the ISO line, the Privacy Policy and Terms & Conditions, and a way back to the top. The addresses are on Contact.
 */
export function Footer({ current }: { current?: PageId }) {
  const year = new Date().getFullYear();
  const c = site.contact;
  const here = (href: string) => (current && href === routes[current as keyof typeof routes] ? "page" : undefined);
  const links = [
    { label: "About", href: routes.about },
    { label: "Products", href: routes.products },
    { label: "Services", href: routes.services },
    { label: "Blog", href: routes.blog },
  ];
  return (
    <footer className="site-footer ft">
      <div className="frame">
        <div className="ft-row">
          <a href={routes.home} className="ft-logo display" aria-label="Krini Crude, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-lubecon.webp" alt="" width={476} height={220} className="ft-logo-img" />
          </a>
          <nav aria-label="Footer">
            <ul className="ft-links">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} aria-current={here(l.href)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="ft-reach">
            <li>
              <a href={c.phoneHref}>
                <Glyph name="call" size={16} /> {c.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${c.email}`}>
                <Glyph name="mail" size={16} /> {c.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="ft-bottom">
          <p>© {year} Krini Crude · ISO certified · Chennai, India</p>
          <div className="ft-bottom-r">
            <ul className="ft-legal">
              <li>
                <a href={routes.privacy} aria-current={here(routes.privacy)}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href={routes.terms} aria-current={here(routes.terms)}>
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
            <a href="#main" className="ft-up" aria-label="Back to top" data-back-to-top>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 13.5V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
