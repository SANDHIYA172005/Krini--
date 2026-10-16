import { routes, site } from "../content/site";
import { lines, type Line, type Product } from "../content/catalogue";
import { Arrow, Glyph, MediaSlot } from "./ui";

type Item = {
  key: string;
  name: string;
  /** The product type it belongs to (Soluble Cutting Oil, Shuttering Oil…). */
  type: string;
  text: string;
  grades: string[];
  line: Line;
  href: string;
};

/** One card per item a buyer can order: each named product in a range, or the product type itself where it has no named range. */
function itemsOf(line: Line): Item[] {
  const href = (p: Product) => `${routes.line(line.slug)}#${p.id}`;
  return line.products.flatMap((p) =>
    p.range?.length
      ? p.range.map((r) => ({
          key: `${p.id}-${r.name}`,
          name: r.name,
          type: p.name,
          text: r.text,
          grades: [],
          line,
          href: href(p),
        }))
      : [
          {
            key: p.id,
            name: p.name,
            type: line.short,
            text: p.about,
            grades: p.variants ?? [],
            line,
            href: href(p),
          },
        ],
  );
}

/** A WhatsApp chat to the sales number with the order already written (also used by the line pages' cards). */
export const orderHref = (name: string, line: string) =>
  `${site.contact.whatsapp.split("?")[0]}?text=${encodeURIComponent(
    `Hi Krini Crude, I would like to order:\n• ${name} (${line})\nQuantity: \nDelivery location: `,
  )}`;
const whatsapp = (item: Item) => orderHref(item.name, item.line.short);

/** The WhatsApp mark for the Order now buttons. */
export function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

/**
 * Products as a shop: the three lines down the side as categories (with how
 * many products each holds), and every product as a card: a frame for its
 * photo with its type, its name, two lines about it, up to three of its grades
 * (and how many more), and two ways on:
 * Order on WhatsApp (a chat with the order written out) and its details on the
 * line's page. The categories filter the cards (src/motion/interactions.ts,
 * initFilters); without scripts every card shows.
 */
export function ProductShop() {
  const all = lines.flatMap(itemsOf);
  return (
    <section id="all-products" className="shop" aria-labelledby="shop-title">
      <div className="frame">
        <div className="shop-head">
          <h2 id="shop-title" className="shop-title">
            All products
          </h2>
          <p className="shop-note">
            {all.length} products · tap <strong>Order now</strong> to send us a WhatsApp with the product, quantity and place.
          </p>
        </div>
        <div className="shop-grid">
          <aside className="shop-side" aria-label="Categories">
            <p className="shop-side-k">Categories</p>
            <div className="shop-cats filters" role="group" aria-label="Filter by category" data-filters data-noun="product">
              <button type="button" className="filter shop-cat" aria-pressed="true" data-filter="all">
                All products <span className="filter-n">{all.length}</span>
              </button>
              {lines.map((l) => (
                <button key={l.id} type="button" className="filter shop-cat" aria-pressed="false" data-filter={l.id}>
                  {l.title} <span className="filter-n">{all.filter((i) => i.line.id === l.id).length}</span>
                </button>
              ))}
            </div>
            <a href={site.contact.whatsapp} className="shop-help" target="_blank" rel="noopener noreferrer">
              <Glyph name="chat" size={18} />
              <span>
                <strong>Not sure what to order?</strong>
                <span>Tell us the job on WhatsApp</span>
              </span>
            </a>
          </aside>
          <ul className="shop-cards" data-filter-list>
            {all.map((it) => (
              <li key={it.key} data-category={it.line.id}>
                <article className="scard">
                  <div className="scard-media">
                    <MediaSlot label="Product photo" w={800} h={600} />
                    <span className="scard-tag">{it.type}</span>
                  </div>
                  <div className="scard-body">
                    <h3 className="scard-name">
                      <a href={it.href}>{it.name}</a>
                    </h3>
                    <p className="scard-text">{it.text}</p>
                    {it.grades.length ? (
                      <ul className="scard-grades" aria-label="Grades and variants">
                        {it.grades.slice(0, 3).map((g) => (
                          <li key={g}>{g}</li>
                        ))}
                        {it.grades.length > 3 ? (
                          <li className="scard-more-n" title={it.grades.slice(3).join(", ")}>
                            +{it.grades.length - 3}
                          </li>
                        ) : null}
                      </ul>
                    ) : null}
                  </div>
                  <div className="scard-actions">
                    <a href={whatsapp(it)} className="scard-wa" target="_blank" rel="noopener noreferrer" aria-label={`Order ${it.name} on WhatsApp`}>
                      <WhatsAppIcon />
                      Order now
                    </a>
                    <a href={it.href} className="scard-more" aria-label={`${it.name}: details`} title="Details">
                      <Arrow />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
        <p className="sr-only" role="status" aria-live="polite" data-filter-status />
      </div>
    </section>
  );
}
