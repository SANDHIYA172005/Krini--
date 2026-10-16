import type { CSSProperties } from "react";
import { enquireHref, routes, site, type PageId } from "../content/site";
import { lineById, type Line } from "../content/catalogue";
import { Arrow, Glyph } from "./ui";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

function Chevron({ dir = "down" }: { dir?: "down" | "right" }) {
  return (
    <svg className="nav-chev" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "down" ? <path d="M3 4.5 6 7.5l3-3" /> : <path d="M4.5 3 7.5 6l-3 3" />}
    </svg>
  );
}

/**
 * The top of every page, in two levels. A thin dark strip (ISO, the factory,
 * phone, email, WhatsApp) folds away once the page moves; under it the white
 * bar: Home and About Us on the left, the logo in the centre, Products, Blog
 * and the gold Enquire now button on the right. Products opens a
 * full-width panel with the three lines side by side, each with its products,
 * and a private-label card (hover, or the arrow button for keyboard and touch:
 * src/motion/interactions.ts, initDrops). Below 1024px the same menu opens as
 * a sheet from the bar (unchanged).
 */
export function Nav({ current, line: currentLine }: { current?: PageId; line?: Line["id"] }) {
  const { contact, menu } = site;
  const here = currentLine ? menu.lines.find((m) => m.line === currentLine)?.label : menu.pages.find((n) => n.id === current)?.label;
  const href = (line: string, product?: string) => `${routes.line(lineById(line as Line["id"]).slug)}${product ? `#${product}` : ""}`;
  const onProducts = current === "products" || !!currentLine;
  const links: { id: string; label: string; href: string; on: boolean }[] = [
    { id: "home", label: "Home", href: routes.home, on: current === "home" },
    { id: "about", label: "About Us", href: routes.about, on: current === "about" },
    { id: "products", label: "Products", href: routes.products, on: onProducts },
    { id: "blog", label: "Blog", href: routes.blog, on: current === "blog" },
  ];
  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-bone px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="nav fixed inset-x-0 top-0 z-50" data-nav>
        <div className="nav-strip">
          <div className="frame nav-strip-in">
            <p className="nav-strip-note">
              <span className="nav-strip-dot" aria-hidden="true" />
              ISO certified manufacturer · Factory in Tiruverkadu, Chennai
            </p>
            <ul className="nav-strip-reach">
              <li>
                <a href={contact.phoneHref}>
                  <Glyph name="call" size={15} /> {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>
                  <Glyph name="mail" size={15} /> {contact.email}
                </a>
              </li>
              <li>
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
                  <Glyph name="chat" size={15} /> WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="nav-main">
          <div className="frame nav-bar nav-split flex items-center justify-between gap-6">
            {/* the logo, exactly as supplied (icon and words), on the left; the four pages in one box and Enquire now on the right */}
            <a href={routes.home} className="nav-logo nav-logo-c shrink-0" aria-label="Krini Crude, home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-lubecon.webp" alt="" width={476} height={220} className="nav-mark nav-logo-full nav-logo-dark" />
            </a>
            <nav aria-label="Primary" className="nav-box hidden lg:block">
              <ul className="nav-list">
                {links.map((item) =>
                    item.id === "products" ? (
                      <li key={item.id} className="nav-drop nav-drop-mega" data-drop>
                        <a className={`nav-link${item.on ? " is-current" : ""}`} href={item.href} aria-current={item.on ? "page" : undefined}>
                          {item.label}
                        </a>
                        <button
                          type="button"
                          className="nav-caret"
                          aria-expanded="false"
                          aria-controls="drop-products"
                          aria-label="Products: all lines"
                          data-drop-toggle
                        >
                          <Chevron />
                        </button>
                        <div className="nav-panel nav-mega" id="drop-products">
                          <div className="frame nav-mega-in">
                            {menu.lines.map((m) => {
                              const l = lineById(m.line);
                              return (
                                <div key={m.line} className={`nav-mega-col${m.line === currentLine ? " is-current" : ""}`}>
                                  <a href={href(m.line)} className="nav-mega-head nav-item">
                                    <span className="nav-mega-idx">{l.index}</span>
                                    <span className="nav-mega-title">{l.title}</span>
                                  </a>
                                  <p className="nav-mega-desc">{l.series}</p>
                                  <ul className="nav-mega-list">
                                    {m.items.map((it) => (
                                      <li key={it.product}>
                                        <a href={href(m.line, it.product)} className="nav-mega-link">
                                          {it.label}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                  <a href={href(m.line)} className="nav-mega-all">
                                    View all<span className="sr-only"> {m.label.toLowerCase()}</span> <Arrow />
                                  </a>
                                </div>
                              );
                            })}
                            <div className="nav-mega-card">
                              <p className="nav-mega-card-k">Private label</p>
                              <p className="nav-mega-card-t">Your brand. Our formulation floor.</p>
                              <p className="nav-mega-card-b">Lubricants, greases and sprays made and packed under your name.</p>
                              <a href={enquireHref("Private label")} className="btn btn-primary" data-enquire="Private label">
                                Discuss private label <Arrow />
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ) : (
                      <li key={item.id}>
                        <a className={`nav-link${item.on ? " is-current" : ""}`} href={item.href} aria-current={item.on ? "page" : undefined}>
                          {item.label}
                        </a>
                      </li>
                    ),
                  )}
              </ul>
            </nav>
            <div className="nav-side nav-side-r flex items-center gap-3">
              <a href={enquireHref("Enquiry")} className="btn btn-primary nav-enquire hidden sm:inline-flex" data-magnetic data-enquire="Enquiry">
                Enquire now <Arrow />
              </a>
              <button
                type="button"
                className="menu-toggle lg:hidden"
                aria-label="Open menu"
                aria-expanded="false"
                aria-controls="site-menu"
                data-menu-toggle
              >
                <span className="menu-toggle-icon" aria-hidden="true">
                  <span />
                  <span />
                </span>
                <span className="menu-toggle-label label" aria-hidden="true">
                  <span>Menu</span>
                  <span>Close</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Phones and tablets: a sheet that drops from the top bar over the dimmed page: Home and
          About Us as tiles, then the three product lines, each folding open to its products,
          then quick ways to get in touch and Enquire now. */}
      <div id="site-menu" className="menu lg:hidden" data-menu aria-hidden="true">
        <div className="menu-dim" data-menu-dim />
        <div className="menu-sheet" data-lenis-prevent>
          <div className="menu-head menu-item label" style={vars({ "--i": 0 })}>
            <span>Menu</span>
            {here ? (
              <span className="menu-now">
                <span className="menu-now-dot" aria-hidden="true" />
                <span className="sr-only">You are on: </span>
                <span>{here}</span>
              </span>
            ) : null}
          </div>
          <nav aria-label="Mobile">
            <ul className="menu-grid">
              {menu.pages.map((item, i) => (
                <li key={item.id} className="menu-item" style={vars({ "--i": i + 1 })}>
                  <a
                    href={item.href}
                    className={`menu-tile${item.id === current && !currentLine ? " is-current" : ""}`}
                    aria-current={item.id === current && !currentLine ? "page" : undefined}
                    data-menu-link
                    tabIndex={-1}
                  >
                    <span className="menu-tile-top">
                      <span className="label">{String(i + 1).padStart(2, "0")}</span>
                      <Glyph name={item.id === "home" ? "home" : item.id === "blog" ? "blog" : "user"} />
                    </span>
                    <span className="menu-tile-name display-tight">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="menu-lines">
              {menu.lines.map((m, i) => (
                <li key={m.line} className={`menu-line menu-item${m.line === currentLine ? " is-current" : ""}`} style={vars({ "--i": i + 3 })}>
                  <div className="menu-line-row">
                    <a
                      href={href(m.line)}
                      className="menu-line-name display-tight"
                      aria-current={m.line === currentLine ? "page" : undefined}
                      data-menu-link
                      tabIndex={-1}
                    >
                      <span className="label menu-line-idx">{lineById(m.line).index}</span>
                      {m.label}
                    </a>
                    <button
                      type="button"
                      className="menu-line-toggle"
                      aria-expanded="false"
                      aria-controls={`menu-${m.line}`}
                      aria-label={`${m.label}: products`}
                      data-menu-acc
                      tabIndex={-1}
                    >
                      <Chevron />
                    </button>
                  </div>
                  <ul className="menu-products" id={`menu-${m.line}`} hidden>
                    {m.items.map((it) => (
                      <li key={it.product}>
                        <a href={href(m.line, it.product)} className="menu-product" data-menu-link>
                          {it.label}
                        </a>
                        {it.sub ? (
                          <ul className="menu-range">
                            {it.sub.map((s) => (
                              <li key={s.label}>
                                <a href={href(m.line, s.product ?? it.product)} className="menu-range-item" data-menu-link>
                                  {s.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-foot menu-item" style={vars({ "--i": 6 })}>
            <a href={contact.phoneHref} className="menu-quick" data-menu-link tabIndex={-1}>
              <Glyph name="call" /> Call
            </a>
            <a href={contact.whatsapp} className="menu-quick" target="_blank" rel="noopener noreferrer" data-menu-link tabIndex={-1}>
              <Glyph name="chat" /> WhatsApp
            </a>
            <a href={enquireHref("Enquiry")} className="btn btn-primary menu-enquire" data-menu-link data-enquire="Enquiry" tabIndex={-1}>
              Enquire now <Arrow />
            </a>
          </div>
          <p className="menu-contact menu-item label" style={vars({ "--i": 7 })}>
            {contact.phone} · {contact.email}
          </p>
        </div>
      </div>
    </>
  );
}
