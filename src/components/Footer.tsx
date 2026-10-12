import { routes, site, type PageId } from "../content/site";
import { Glyph, Name } from "./ui";

/**
 * On every page but Contact, kept to the minimum: the name and "Quality
 * Industrial Solutions"; three links (About Us, Our Products, Contact Us); the
 * phone and the email; then the copyright line and a way back to the top. On
 * wide screens the first three sit on one line. The addresses are on the
 * Contact and About pages; the product lines are in the menu.
 */
export function Footer({ current }: { current?: PageId }) {
  const year = 2026;
  const c = site.contact;
  const here = (href: string) => (current && href === routes[current as keyof typeof routes] ? "page" : undefined);
  return (
    <footer className="site-footer">
      <div className="frame">
        <div className="footer-row">
          <div className="footer-brand">
            <a href={routes.home} className="footer-logo display" aria-label="Krini Crude, home">
              <Name />
            </a>
            <p className="footer-tag label">{site.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer-links">
              {site.footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} aria-current={here(l.href)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="footer-reach">
            <li>
              <a href={c.phoneHref}>
                <Glyph name="call" size={17} /> <span>{c.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${c.email}`}>
                <Glyph name="mail" size={17} /> <span>{c.email}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>© {year} Krini Crude. All rights reserved.</p>
          <a href="#main" className="footer-up" aria-label="Back to top" data-back-to-top>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 13.5V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
