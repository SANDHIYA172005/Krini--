import { enquireHref, routes } from "../content/site";
import { lines } from "../content/catalogue";
import { Arrow, CgNote, SectionHead } from "./ui";

/**
 * Products page: the three lines. Desktop: a sticky frame on the left; as each
 * line scrolls through the right column its picture rolls up over the last
 * one, and three bars at the top of the frame show which line is in view.
 * Smaller screens: each line carries its own picture, which opens like a
 * roller shutter. The products slide in one after another (cinema.ts,
 * data-rows). Each line links to its own page.
 */
export function ProductLines({ label, heading }: { label: string; heading: readonly string[] }) {
  return (
    <section id="lines" className="section" aria-labelledby="lines-title">
      <div className="frame">
        <SectionHead>{label}</SectionHead>
        <div className="mt-12 flex flex-col gap-6 lg:mt-20 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="lines-title" className="display text-display-md" data-split>
            {heading[0]}{" "}
            <br />
            {heading[1]}
          </h2>
          <p className="max-w-sm text-mute" data-reveal>
            Standard, speciality and niche-market products, made to our formulations or to yours.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-24">
              {/* always 4:5, like the pictures, so none is ever cropped; each line's picture
                  rolls up over the last one (src/motion/interactions.ts, initProducts) */}
              <div className="product-media media relative aspect-[4/5] w-[min(100%,calc(78vh*0.8))] rounded-sm" data-product-media data-shutter>
                {lines.map((l, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={l.id}
                    src={l.image}
                    alt={l.imageAlt}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    decoding="async"
                    className={i === 0 ? "is-active" : ""}
                  />
                ))}
                <ol className="product-steps" aria-hidden="true">
                  {lines.map((l, i) => (
                    <li key={l.id} className={i === 0 ? "is-on" : ""} data-product-step />
                  ))}
                </ol>
              </div>
              <div className="mt-4 flex w-[min(100%,calc(78vh*0.8))] items-center justify-between gap-4">
                <p className="label text-bone" data-product-caption>
                  {lines[0].index} / {lines[0].title}
                </p>
                <CgNote />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            {lines.map((l) => (
              <article
                key={l.id}
                id={`range-${l.id}`}
                className="flex flex-col justify-center border-t border-bone/10 py-12 first:border-t-0 lg:min-h-[86vh] lg:py-16"
                data-product={l.id}
                aria-labelledby={`${l.id}-title`}
              >
                <div className="media mb-8 aspect-[4/3] rounded-sm lg:hidden" data-shutter>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.image.replace(".webp", "-43.webp")} alt={l.imageAlt} width={1200} height={900} loading="lazy" decoding="async" />
                </div>
                <p className="label text-amber" data-reveal>
                  {l.index}
                </p>
                <h3 id={`${l.id}-title`} className="display-tight mt-4 text-[clamp(min(2rem,8.6vw),3.9vw,3.75rem)] leading-[0.95]" data-reveal>
                  <a href={routes.line(l.slug)} className="hover:text-amber">
                    {l.title}
                  </a>
                </h3>
                <p className="mt-6 max-w-md text-mute" data-reveal>
                  {l.description}
                </p>
                <ul className="mt-10 border-b border-bone/10" data-rows>
                  {l.products.map((p) => (
                    <li key={p.id} className="border-t border-bone/10">
                      <a href={`${routes.line(l.slug)}#${p.id}`} className="group flex items-center justify-between gap-4 py-4">
                        <span className="text-lg transition-transform duration-500 ease-film group-hover:translate-x-2">{p.name}</span>
                        <span className="label shrink-0 text-right text-mute/70 transition-colors duration-500 group-hover:text-amber">
                          {p.variants && p.variants.length <= 4 && p.variants.every((v) => v.length <= 6) ? p.variants.join(" · ") : l.short}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3" data-reveal>
                  <a href={routes.line(l.slug)} className="btn btn-primary" data-magnetic>
                    View {l.short.toLowerCase()} <Arrow />
                  </a>
                  <a href={enquireHref(`Enquiry: ${l.title}`)} className="btn btn-ghost" data-enquire={`Enquiry: ${l.title}`} data-magnetic>
                    Enquire <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Every product as a card: its line as a badge, its name (linking to its place
 * on the line's page), its variants or grades, and an Enquire link that opens
 * the Contact form with the line and the product filled in. A bar above the
 * cards shows one line at a time (interactions.ts, initFilters; without
 * scripts every product shows). Two columns on phones, three from 768px, four
 * from 1024px.
 */
export function ProductIndex({ label, heading, note }: { label: string; heading: string; note: string }) {
  const count = lines.reduce((n, l) => n + l.products.length, 0);
  return (
    <section id="all-products" className="section theme-navy" aria-labelledby="index-title">
      <div className="frame">
        <SectionHead>{label}</SectionHead>
        <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-12">
          <h2 id="index-title" className="display text-display-sm lg:col-span-7" data-split>
            {heading}
          </h2>
          <p className="max-w-md self-end text-mute lg:col-span-4 lg:col-start-9" data-reveal>
            {note}
          </p>
        </div>
        <div className="filters mt-12 lg:mt-16" role="group" aria-label="Show products from" data-filters data-noun="product">
          <button type="button" className="filter" aria-pressed="true" data-filter="all">
            All <span className="filter-n">{count}</span>
          </button>
          {lines.map((l) => (
            <button key={l.id} type="button" className="filter" aria-pressed="false" data-filter={l.id}>
              {l.title} <span className="filter-n">{l.products.length}</span>
            </button>
          ))}
        </div>
        <ul className="pgrid mt-8" data-filter-list>
          {lines.flatMap((l) =>
            l.products.map((p) => (
              <li key={`${l.id}-${p.id}`} className="pcard" data-category={l.id}>
                <span className="pcard-badge label" data-line={l.id}>
                  {l.short}
                </span>
                <h3 className="pcard-title">
                  <a href={`${routes.line(l.slug)}#${p.id}`} className="card-link">
                    {p.name}
                  </a>
                </h3>
                <p className="pcard-variants">
                  {p.variants ? p.variants.join(" · ") : p.range ? p.range.map((r) => r.name).join(" · ") : <span className="text-mute">Ask us</span>}
                </p>
                <a href={enquireHref(`Enquiry: ${l.title}`, p.name)} className="pcard-enquire label" aria-label={`Enquire about ${p.name}`}>
                  Enquire <Arrow />
                </a>
              </li>
            )),
          )}
        </ul>
        <p className="sr-only" role="status" aria-live="polite" data-filter-status />
      </div>
    </section>
  );
}
