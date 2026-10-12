import type { CSSProperties } from "react";
import { enquireHref, routes, site, type PageId } from "../content/site";
import { lineById, type Line } from "../content/catalogue";
import { Arrow, Glyph, Wordmark } from "./ui";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

function Chevron({ dir = "down" }: { dir?: "down" | "right" }) {
  return (
    <svg className="nav-chev" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "down" ? <path d="M3 4.5 6 7.5l3-3" /> : <path d="M4.5 3 7.5 6l-3 3" />}
    </svg>
  );
}

/**
 * The top bar: a floating rounded capsule of dark glass, held a little below
 * the top of the screen; on the left a round gold K badge with the name and
 * tagline (home); then Home, About Us and the three product menus, divided by
 * fine rules, the page you are on as a gold pill; on the right Enquire now as
 * a gold pill with a round arrow badge (it opens the enquiry pop-up). Each product menu drops a list of products on hover, or
 * from its arrow button (keyboard, touch); some products open a side list of
 * their range (site.menu). The line name itself goes to the line's page. The
 * page you are on is marked (aria-current). Below 1024px the same menu opens
 * as a sheet from the top bar, the product lists folding open under each
 * line, with quick ways to get in touch; Enquire now stays in the bar from
 * 640px. Behaviour: src/motion/interactions.ts, initNav.
 */
export function Nav({ current, line: currentLine }: { current?: PageId; line?: Line["id"] }) {
  const { contact, menu } = site;
  const here = currentLine ? menu.lines.find((m) => m.line === currentLine)?.label : menu.pages.find((n) => n.id === current)?.label;
  const href = (line: string, product?: string) => `${routes.line(lineById(line as Line["id"]).slug)}${product ? `#${product}` : ""}`;
  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-bone px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="nav fixed inset-x-0 top-0 z-50" data-nav>
        <div className="frame nav-bar flex items-center justify-between gap-6">
          <a href={routes.home} className="nav-logo shrink-0" aria-label="Krini Crude, home">
            <span className="nav-name">
              <Wordmark />
              <span className="nav-tag">{site.tagline}</span>
            </span>
          </a>
          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="nav-list">
              {menu.pages.map((item) => (
                <li key={item.id}>
                  <a
                    className={`nav-link${item.id === current && !currentLine ? " is-current" : ""}`}
                    href={item.href}
                    aria-current={item.id === current && !currentLine ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {menu.lines.map((m) => (
                <li key={m.line} className="nav-drop" data-drop>
                  <a
                    className={`nav-link${m.line === currentLine ? " is-current" : ""}`}
                    href={href(m.line)}
                    aria-current={m.line === currentLine ? "page" : undefined}
                  >
                    {m.label}
                  </a>
                  <button
                    type="button"
                    className="nav-caret"
                    aria-expanded="false"
                    aria-controls={`drop-${m.line}`}
                    aria-label={`${m.label}: products`}
                    data-drop-toggle
                  >
                    <Chevron />
                  </button>
                  <div className="nav-panel" id={`drop-${m.line}`}>
                    <ul className="nav-panel-list">
                      {m.items.map((it) => (
                        <li key={it.product} className={it.sub ? "nav-has-fly" : undefined} data-fly-host={it.sub ? "" : undefined}>
                          <a className="nav-item" href={href(m.line, it.product)}>
                            <span>{it.label}</span>
                            {it.sub ? <Chevron dir="right" /> : null}
                          </a>
                          {it.sub ? (
                            <ul className="nav-fly" aria-label={it.label}>
                              {it.sub.map((s) => (
                                <li key={s.label}>
                                  <a className="nav-sub" href={href(m.line, s.product ?? it.product)}>
                                    {s.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li className="ml-1 xl:ml-2">
                <a
                  href={enquireHref("Enquiry")}
                  className="btn btn-primary nav-enquire"
                  aria-current={current === "contact" ? "page" : undefined}
                  data-magnetic
                  data-enquire="Enquiry"
                >
                  Enquire now
                  <span className="nav-enquire-dot" aria-hidden="true">
                    <Arrow />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-3 lg:hidden">
            <a href={enquireHref("Enquiry")} className="btn btn-primary nav-enquire hidden sm:inline-flex" data-magnetic data-enquire="Enquiry">
              Enquire now
              <span className="nav-enquire-dot" aria-hidden="true">
                <Arrow />
              </span>
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
                      <Glyph name={item.id === "home" ? "home" : "user"} />
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
