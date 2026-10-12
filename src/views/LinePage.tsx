import { enquireHref, routes, site } from "../content/site";
import { lines, type Line, type Product, type ProductRangeItem } from "../content/catalogue";
import { articles } from "../content/articles";
import { lineSeo, trail, type Crumb } from "../content/pages";
import { abs, breadcrumbs, faqPage, productList, webPage } from "../content/schema";
import { Shell } from "../components/Shell";
import { Breadcrumbs } from "../components/PageHeader";
import { Faq } from "../components/Faq";
import { CtaBand } from "../components/CtaBand";
import { Guides, LineCards, SectionIntro } from "../components/Blocks";
import { Arrow, Fact, Icon, SectionHead, type IconName } from "../components/ui";
import { ProductDetailsTrigger } from "../components/ProductDetailsModal";

const industryIcon: Record<string, IconName> = { "auto-assembly": "car", "auto-component": "gear", construction: "crane", paint: "spray" };

/** Grades (32, 46, 68; 15W40) rather than named variants. */
const isGrades = (v: readonly string[]) => v.every((x) => /\d/.test(x) && x.length <= 6);
/** A product's place in the catalogue: 01.04 is the line's fourth product. */
const numberOf = (line: Line, i: number) => `${line.index}.${String(i + 1).padStart(2, "0")}`;

/**
 * A product line's page (Lubricants & Greases, Construction Chemicals,
 * Aerosols). On a navy band: the line's name and description, the buttons,
 * its picture and an index of its products. Then every product as a data
 * sheet on a pale band (grades or variants, the products available under it,
 * what it is for, Krini Crude's own published claims, what is still to be
 * confirmed) and a card for products made to the customer's formulation; the
 * industries the line serves; guides; questions; the other lines.
 */
export function LinePage({ line }: { line: Line }) {
  const s = lineSeo(line);
  const t = trail.line(line);
  const type = `Enquiry: ${line.title}`;
  const guides = articles.filter((a) => a.line === line.id);
  const industries = site.industries.filter((i) => i.line === line.id);
  const others = lines.filter((l) => l.id !== line.id);
  return (
    <Shell
      current="products"
      line={line.id}
      schema={[
        webPage(s, "CollectionPage", { mainEntity: { "@id": `${abs(s.path)}#products` } }),
        breadcrumbs(t),
        productList(line),
        faqPage(s.path, line.faq),
      ]}
    >
      <LineHero line={line} trail={t} type={type} />

      <section id="products" className="section lp-products theme-tint" aria-labelledby="products-title">
        <div className="frame">
          <SectionIntro label="Products" heading={`The ${line.title.toLowerCase()} range.`} id="products-title" wide />
          <p className="lp-strap" data-reveal>
            {line.strap}
          </p>
          <div className="lp-grid mt-10 lg:mt-14">
            {line.products.map((p, i) => (
              <ProductSheet key={p.id} p={p} n={numberOf(line, i)} type={type} />
            ))}
            <FormulationCard />
          </div>
        </div>
      </section>

      {industries.length ? (
        <section id="industries" className="section theme-navy" aria-labelledby="industries-title">
          <div className="frame">
            <SectionHead>Industries we serve</SectionHead>
            <div className="lp-ind mt-12 lg:mt-16">
              <h2 id="industries-title" className="display lp-ind-title" data-split>
                {`Where our ${line.title.toLowerCase()} work.`}
              </h2>
              <ul className="lp-ind-list">
                {industries.map((ind) => (
                  <li key={ind.id} className="lp-ind-card" data-reveal>
                    <span className="lp-ind-icon" data-draw>
                      <Icon name={industryIcon[ind.id]} />
                    </span>
                    <h3 className="display-tight lp-ind-name">{ind.title}</h3>
                    <p className="lp-ind-body">{ind.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {guides.length ? <Guides list={guides} label="Guides" heading={`Choosing and using ${line.title.toLowerCase()}.`} wide /> : null}

      <Faq items={line.faq} />

      <section id="other-lines" className="section border-t border-bone/10" aria-labelledby="others-title">
        <div className="frame">
          <SectionIntro
            label="More from Krini Crude"
            heading="Our other product lines."
            id="others-title"
            wide
            aside={
              <a href={routes.products} className="btn btn-ghost" data-magnetic>
                All products <Arrow />
              </a>
            }
          />
          <div className="mt-12 lg:mt-16">
            <LineCards list={others} />
          </div>
        </div>
      </section>

      <CtaBand heading="Tell us what you need." body={`Send us the ${line.title.toLowerCase()} you need, with grades, quantities, application and delivery location.`} type={type} />
    </Shell>
  );
}

/**
 * The top of the page, on navy: breadcrumbs; the line's number and series,
 * the h1, the live site's description and the buttons; the line's picture
 * (4:5 from 1024px, its left edge cut on the slant like the logo's plate;
 * 4:3 below); and an index of the products, each a link to its sheet.
 */
function LineHero({ line, trail: t, type }: { line: Line; trail: Crumb[]; type: string }) {
  return (
    <header className="lp-hero theme-navy" aria-labelledby="page-title">
      <div className="frame">
        <Breadcrumbs trail={t} />
        <div className="lp-hero-grid mt-9 lg:mt-12">
          <div className="lp-hero-text">
            <p className="label text-amber" data-reveal>
              {line.index} · {line.series}
            </p>
            <h1 id="page-title" className="page-title display-tight mt-6" data-split>
              {line.heading}
            </h1>
            <p className="lp-lead" data-reveal>
              {line.description}
            </p>
            <div className="lp-ctas" data-reveal>
              <a href={enquireHref(type)} className="btn btn-primary" data-enquire={type} data-magnetic>
                Enquire now <Arrow />
              </a>
              <a href={enquireHref("Request a quote")} className="btn btn-ghost" data-enquire="Request a quote" data-magnetic>
                Request a quote <Arrow />
              </a>
            </div>
          </div>

          <figure className="lp-hero-fig" data-drift="0.05">
            <div className="lp-hero-frame">
              <div className="media lp-hero-media" data-shutter>
                <picture className="media-pic">
                  <source media="(min-width: 1024px)" srcSet={line.image} width={1200} height={1500} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={line.image.replace(".webp", "-43.webp")} alt={line.imageAlt} width={1200} height={900} decoding="async" fetchPriority="high" />
                </picture>
              </div>
            </div>
          </figure>

          <nav className="lp-index" aria-label="Products on this page" data-reveal>
            <p className="label lp-index-label">In this range</p>
            <ol className="lp-index-list">
              {line.products.map((p, i) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="lp-index-link">
                    <span className="lp-index-num label tabular-nums">{numberOf(line, i)}</span>
                    <span className="lp-index-name">{p.name}</span>
                    <Arrow className="lp-index-arrow" />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </header>
  );
}

/**
 * One product as a data sheet: its number and name, what it does; then rows
 * for its grades or variants, the products available under it (krinicrude.com's
 * own names and descriptions), typical uses and Krini Crude's claims; at the
 * foot, Enquire (the form opens with the product named) and what is still to
 * be confirmed.
 */
function ProductSheet({ p, n, type }: { p: Product; n: string; type: string }) {
  // a product with its own list of available products shows that list instead of its variants
  const v = p.range ? undefined : p.variants;
  const grades = v && isGrades(v) ? v : undefined;
  const variants = v && !grades ? v : undefined;
  const rows = Boolean(grades || variants || p.range || p.uses || p.claims);
  return (
    <article id={p.id} className="lp-card" aria-labelledby={`${p.id}-title`} data-reveal>
      <p className="lp-num label tabular-nums">{n}</p>
      <h3 id={`${p.id}-title`} className="lp-name display-tight">
        {p.name}
      </h3>
      <p className="lp-about">{p.about}</p>
      {rows ? (
        <dl className="lp-spec">
          {grades ? (
            <div className="lp-row">
              <dt className="label">Grades</dt>
              <dd>
                <ul className="lp-grades">
                  {grades.map((g) => (
                    <li key={g} className="lp-grade display-tight">
                      {g}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
          {variants ? (
            <div className="lp-row">
              <dt className="label">Variants</dt>
              <dd>
                <ul className="lp-variants">
                  {variants.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
          {p.range ? (
            <div className="lp-row lp-row-range">
              <div className="lp-range-header">
                <span className="label lp-range-lead-label">
                  {p.range.length === 4 ? "Four products" : p.range.length === 2 ? "Two products" : `${p.range.length} products`} · Complete technical information
                </span>
              </div>
              <ul className="lp-range-cards">
                {p.range.map((r, rIdx) => (
                  <li key={r.name} className={`lp-pitem ${r.details ? "lp-pitem-active" : ""}`}>
                    <div className="lp-pitem-main">
                      <div className="lp-pitem-thumb">
                        {r.details?.image ? (
                          <img
                            src={r.details.image}
                            alt={r.details.imageAlt || r.name}
                            className="lp-pitem-img"
                            width={88}
                            height={88}
                            loading="lazy"
                          />
                        ) : (
                          <div className="lp-pitem-placeholder">
                            <CanisterIcon />
                          </div>
                        )}
                      </div>
                      <div className="lp-pitem-info">
                        <h4 className="lp-pitem-title">
                          <span className="lp-pitem-num tabular-nums">0{rIdx + 1}.</span> {r.name}
                        </h4>
                        <p className="lp-pitem-sub">{r.text}</p>
                        <p className="lp-pitem-meta">
                          {r.details?.metaLine ||
                            (r.details
                              ? "Key benefits · Technical properties · Coverage · Application method · Storage and handling · Packing"
                              : "Benefits · Technical properties · Coverage · Usage · Storage and packing")}
                        </p>
                        {r.details ? (
                          <ProductDetailsTrigger product={r} type={type} />
                        ) : (
                          <div className="lp-pitem-chips">
                            <span className="lp-chip lp-chip-muted">TDS on Request</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {p.uses ? (
            <div className="lp-row">
              <dt className="label">Typical uses</dt>
              <dd>
                <ul className="ticks lp-ticks">
                  {p.uses.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
          {p.claims ? (
            <div className="lp-row">
              <dt className="label">Highlights</dt>
              <dd>
                <ul className="ticks ticks-amber lp-ticks">
                  {p.claims.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      <div className="lp-foot">
        <a href={enquireHref(type, p.name)} className="btn btn-primary lp-btn" data-enquire={type} data-product={p.name}>
          Enquire<span className="sr-only"> about {p.name}</span> <Arrow />
        </a>
        {p.tbc?.length ? (
          <span className="lp-tbc">
            {p.tbc.map((x) => (
              <Fact key={x.note} value={x} />
            ))}
          </span>
        ) : null}
      </div>
    </article>
  );
}

function CanisterIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lp-canister-icon"
      aria-hidden="true"
    >
      <rect x="5" y="5" width="14" height="16" rx="2" />
      <path d="M8 2h8v3H8z" />
      <path d="M12 9v5" />
      <path d="M10 11.5h4" />
    </svg>
  );
}


/**
 * The last card in the grid, on navy: products made to the customer's own
 * formulation or under their brand. Beside an odd number of products it fills
 * the row; otherwise it runs across the grid.
 */
function FormulationCard() {
  const type = "Custom formulation";
  return (
    <div className="lp-more theme-navy" data-reveal>
      <div className="lp-more-text">
        <p className="label text-amber">Your formulation</p>
        <h3 className="lp-more-title display-tight">
          Need something not listed here?
        </h3>
        <p className="lp-more-body">
          We manufacture to our own formulations and to formulations specified by customers, and make products for brands to sell under their own name.
        </p>
      </div>
      <div className="lp-more-actions">
        <a href={enquireHref(type)} className="btn btn-primary" data-enquire={type} data-magnetic>
          Discuss a formulation <Arrow />
        </a>
        <a href={`${routes.services}#private-label`} className="btn btn-ghost" data-magnetic>
          Private label <Arrow />
        </a>
      </div>
    </div>
  );
}
