"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/** One product a buyer can order (built on the server: ProductShop.tsx). */
export type ShopItem = {
  key: string;
  name: string;
  /** The product type it belongs to (Soluble Cutting Oil, Shuttering Oil…). */
  type: string;
  text: string;
  /** Grades or variants to choose from, if any. */
  grades: string[];
  line: string;
  lineTitle: string;
  lineShort: string;
  /** For the product page: what the catalogue has on it (any of these may be missing). */
  image?: string;
  imageAlt?: string;
  description?: string;
  benefits?: string[];
  uses?: string[];
  usesTitle?: string;
  properties?: { property: string; value: string; spec?: string }[];
  dilution?: string;
  dilutionRatios?: { operation: string; ratio: string }[];
  howTo?: string[];
  howToTitle?: string;
  packing?: string;
  storage?: string;
  shelfLife?: string;
  note?: string;
};
export type ShopLine = { id: string; title: string };
type CartLine = { id: string; key: string; name: string; type: string; line: string; grade: string; qty: number };

const STORE = "kc:cart";
const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]+/g, " ");

/**
 * Products as a simple shop (Products page). A search box and the three lines
 * as chips narrow the cards; each card has a photo, what it is, a short line
 * about it, a grade to pick where there are grades, and Add to cart. The cart
 * (remembered on this device) opens from the side: change quantities, add a
 * note, and send the whole list on WhatsApp in one tap. There is
 * no payment online: Krini Crude replies with price, stock and delivery.
 * Every product is in the page's HTML; the search and cart need scripts.
 */
export function ShopClient({ items, lines, whatsapp, top }: { items: ShopItem[]; lines: ShopLine[]; whatsapp: string; email?: string; top?: ReactNode }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [grades, setGrades] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<CartLine[]>([]);
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [ready, setReady] = useState(false);
  /** The product whose page is open (its key), or none. */
  const [view, setView] = useState<string | null>(null);
  const [pvQty, setPvQty] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pvRef = useRef<HTMLDivElement>(null);
  const pvBackRef = useRef<HTMLButtonElement>(null);

  // the cart is kept on this device between visits
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE) || "{}");
      if (Array.isArray(saved.cart)) setCart(saved.cart);
      if (typeof saved.notes === "string") setNotes(saved.notes);
    } catch {
      /* nothing saved, or storage blocked */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORE, JSON.stringify({ cart, notes }));
    } catch {
      /* storage blocked: the cart lasts for this visit */
    }
  }, [cart, notes, ready]);

  // while the cart or a product page is open, the page behind stays still
  const locked = open || view !== null;
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const scroller = (window as unknown as { __scroller?: { stop?: () => void; start?: () => void } }).__scroller;
    root.classList.add("has-dialog");
    scroller?.stop?.();
    return () => {
      root.classList.remove("has-dialog");
      scroller?.start?.();
    };
  }, [locked]);

  // the cart panel: Esc closes it
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open]);

  // a product page: a link of its own (#p=…), so the back button closes it and it can be shared
  useEffect(() => {
    const fromHash = () => {
      const m = location.hash.match(/^#p=(.+)$/);
      const key = m ? decodeURIComponent(m[1]) : null;
      setView(key && items.some((i) => i.key === key) ? key : null);
    };
    fromHash();
    window.addEventListener("popstate", fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener("popstate", fromHash);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [items]);
  const openProduct = (key: string) => {
    history.pushState({ kcp: key }, "", `#p=${encodeURIComponent(key)}`);
    setView(key);
  };
  const closeProduct = () => {
    setView(null);
    if ((history.state as { kcp?: string } | null)?.kcp) history.back();
    else history.replaceState(history.state, "", location.pathname + location.search);
  };
  // a new product page opens at its top, quantity 1, the back button in focus; Esc goes back
  useEffect(() => {
    if (!view) return;
    setPvQty(1);
    const top = () => pvRef.current?.scrollTo({ top: 0 });
    top();
    requestAnimationFrame(top);
    pvBackRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector(".pdrawer.is-open")) closeProduct();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const shown = useMemo(() => {
    const words = norm(query).split(" ").filter(Boolean);
    return items.filter((it) => {
      if (cat !== "all" && it.line !== cat) return false;
      if (!words.length) return true;
      const hay = norm(`${it.name} ${it.type} ${it.lineTitle} ${it.text} ${it.grades.join(" ")}`);
      return words.every((w) => hay.includes(w));
    });
  }, [items, query, cat]);

  const count = cart.reduce((n, l) => n + l.qty, 0);
  const lineId = (it: ShopItem, grade: string) => `${it.key}::${grade}`;
  const inCart = (it: ShopItem) => cart.find((l) => l.id === lineId(it, grades[it.key] ?? ""));

  const add = (it: ShopItem) => {
    const grade = grades[it.key] ?? "";
    const id = lineId(it, grade);
    setCart((c) => (c.some((l) => l.id === id) ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...c, { id, key: it.key, name: it.name, type: it.type, line: it.lineShort, grade, qty: 1 }]));
    setBump((b) => b + 1);
  };
  const addQty = (it: ShopItem, qty: number) => {
    const grade = grades[it.key] ?? "";
    const id = lineId(it, grade);
    setCart((c) => (c.some((l) => l.id === id) ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l)) : [...c, { id, key: it.key, name: it.name, type: it.type, line: it.lineShort, grade, qty }]));
    setBump((b) => b + 1);
  };
  const setQty = (id: string, qty: number) => setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l))));

  const order = [
    "Hi Krini Crude, I would like to order:",
    ...cart.map((l, i) => `${i + 1}. ${l.name}${l.grade ? ` (${l.grade})` : ""} · ${l.type} · Qty: ${l.qty}`),
    notes.trim() ? `Notes: ${notes.trim()}` : "",
    "Company / name: ",
    "Delivery location: ",
  ]
    .filter(Boolean)
    .join("\n");
  const waHref = `${whatsapp.split("?")[0]}?text=${encodeURIComponent(order)}`;
  const pv = view ? items.find((i) => i.key === view) : undefined;
  // more products under it: the same kind first, then the same line, then the rest
  const similar = pv
    ? [
        ...items.filter((i) => i.key !== pv.key && i.type === pv.type),
        ...items.filter((i) => i.key !== pv.key && i.type !== pv.type && i.line === pv.line),
        ...items.filter((i) => i.line !== pv.line),
      ].slice(0, 6)
    : [];
  const pvGrade = pv ? grades[pv.key] ?? "" : "";
  const pvLine = pv ? inCart(pv) : undefined;
  const pvWa = pv
    ? `${whatsapp.split("?")[0]}?text=${encodeURIComponent(
        [
          "Hi Krini Crude, I would like to order:",
          `1. ${pv.name}${pvGrade ? ` (${pvGrade})` : ""} · ${pv.type} · Qty: ${pvQty}`,
          "Company / name: ",
          "Delivery location: ",
        ].join("\n"),
      )}`
    : "";

  return (
    <section id="all-products" className="pshop" aria-labelledby="page-title">
      <div className="frame">
        {top}
        <div className="pshop-head">
          <div>
            <h1 id="page-title" className="pshop-title">
              Our products
            </h1>
            <p className="pshop-sub">
              Lubricants, greases, construction chemicals and aerosols, made in Chennai. Add what you need to the cart and send us the list: we reply with price, stock and
              delivery.
            </p>
          </div>
          <ol className="pshop-steps" aria-label="How ordering works">
            <li>
              <b>1</b> Add to cart
            </li>
            <li>
              <b>2</b> Send the list on WhatsApp
            </li>
            <li>
              <b>3</b> We confirm price and delivery
            </li>
          </ol>
        </div>

        {/* search, the lines and the cart: stays in view while the cards scroll */}
        <div className="pshop-bar">
          <label className="pshop-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="sr-only">Search products</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search: hydraulic oil, 46, shuttering, spray…" autoComplete="off" />
            {query ? (
              <button type="button" className="pshop-clear" onClick={() => setQuery("")} aria-label="Clear search">
                ×
              </button>
            ) : null}
          </label>
          <button type="button" className={`pshop-cartbtn${bump ? " is-bump" : ""}`} key={bump} onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
            <CartIcon />
            <span>Cart</span>
            <b>{count}</b>
          </button>
        </div>
        <div className="pshop-cats" role="group" aria-label="Product lines">
          {[{ id: "all", title: "All products" }, ...lines].map((l) => (
            <button key={l.id} type="button" className="pshop-cat" aria-pressed={cat === l.id} onClick={() => setCat(l.id)}>
              {l.title}
              <span>{l.id === "all" ? items.length : items.filter((i) => i.line === l.id).length}</span>
            </button>
          ))}
        </div>
        <p className="pshop-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "product" : "products"}
          {query ? <> for “{query}”</> : null}
        </p>

        {shown.length ? (
          <ul className="pshop-grid">
            {shown.map((it) => {
              const line = inCart(it);
              return (
                <li
                  key={it.key}
                  className="kcard"
                  onClick={(e) => {
                    if (!(e.target as HTMLElement).closest("select, button, label, a")) openProduct(it.key);
                  }}
                >
                  <div className="kcard-media">
                    <Photo src={it.image} alt="" />
                    <span className="kcard-line">{it.lineShort}</span>
                  </div>
                  <div className="kcard-body">
                    <p className="kcard-type">{it.type}</p>
                    <h3 className="kcard-name">
                      <button type="button" className="kcard-link" onClick={() => openProduct(it.key)}>
                        {it.name}
                      </button>
                    </h3>
                    <p className="kcard-text">{it.text}</p>
                    {it.grades.length ? (
                      <label className="kcard-grade">
                        <span>Grade</span>
                        <select value={grades[it.key] ?? ""} onChange={(e) => setGrades((g) => ({ ...g, [it.key]: e.target.value }))}>
                          <option value="">Not sure / any</option>
                          {it.grades.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </label>
                    ) : null}
                  </div>
                  <div className="kcard-foot">
                    {line ? (
                      <div className="kcard-step" aria-label={`${it.name} in cart`}>
                        <button type="button" onClick={() => setQty(line.id, line.qty - 1)} aria-label="One less">
                          −
                        </button>
                        <span>
                          <b>{line.qty}</b> in cart
                        </span>
                        <button type="button" onClick={() => setQty(line.id, line.qty + 1)} aria-label="One more">
                          +
                        </button>
                      </div>
                    ) : (
                      <button type="button" className="kcard-add" onClick={() => add(it)}>
                        <CartIcon /> Add to cart
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="pshop-empty">
            <p>
              No products match <b>“{query}”</b>.
            </p>
            <p>Try another word, or tell us what you need.</p>
            <a href={`${whatsapp.split("?")[0]}?text=${encodeURIComponent(`Hi Krini Crude, I am looking for: ${query}`)}`} target="_blank" rel="noopener noreferrer" className="pshop-wa">
              Ask on WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* the cart button that follows the visitor once there is something in it */}
      {count ? (
        <button type="button" className="pshop-float" key={`f${bump}`} onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
          <CartIcon />
          View cart <b>{count}</b>
        </button>
      ) : null}

      {/* a product's own page, over the shop: like a store's product page */}
      {pv ? (
        <div className="pv" role="dialog" aria-modal="true" aria-labelledby="pv-title" ref={pvRef} data-lenis-prevent>
          <div className="pv-bar">
            <button type="button" className="pv-back" onClick={closeProduct} ref={pvBackRef} aria-label="Back to products">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <p className="pv-bar-t">{pv.name}</p>
            <button type="button" className="pv-cartbtn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} items`}>
              <CartIcon />
              {count ? <b>{count}</b> : null}
            </button>
          </div>

          <div className="pv-top">
            <div className="pv-media">
              <Photo src={pv.image} alt={pv.imageAlt ?? pv.name} />
              <span className="pv-line">{pv.lineTitle}</span>
            </div>
            <div className="pv-info">
              <p className="pv-type">{pv.type}</p>
              <h2 id="pv-title" className="pv-name">
                {pv.name}
              </h2>
              <p className="pv-text">{pv.text}</p>
              <p className="pv-price">
                <b>Price on request</b>
                <span>Add it to the cart and send the list: we reply with price, stock and delivery.</span>
              </p>
              {pv.grades.length ? (
                <div className="pv-block">
                  <p className="pv-k">Grade</p>
                  <div className="pv-chips" role="group" aria-label="Grade">
                    {["", ...pv.grades].map((g) => (
                      <button key={g || "any"} type="button" className="pv-chip" aria-pressed={pvGrade === g} onClick={() => setGrades((x) => ({ ...x, [pv.key]: g }))}>
                        {g || "Not sure / any"}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="pv-block pv-qtyrow">
                <p className="pv-k">Quantity</p>
                <div className="pv-qty">
                  <button type="button" onClick={() => setPvQty((q) => Math.max(1, q - 1))} aria-label="One less">
                    −
                  </button>
                  <b aria-live="polite">{pvQty}</b>
                  <button type="button" onClick={() => setPvQty((q) => q + 1)} aria-label="One more">
                    +
                  </button>
                </div>
              </div>
              <ul className="pv-assure">
                <li>ISO certified factory, Chennai</li>
                <li>No payment online</li>
                <li>Reply on WhatsApp</li>
              </ul>
            </div>
          </div>

          <div className="pv-details">
            {pv.description && pv.description !== pv.text ? (
              <section className="pv-sec">
                <h3>About this product</h3>
                <p>{pv.description}</p>
              </section>
            ) : null}
            {pv.benefits?.length ? (
              <section className="pv-sec">
                <h3>Highlights</h3>
                <ul className="pv-list">
                  {pv.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {pv.uses?.length ? (
              <section className="pv-sec">
                <h3>{pv.usesTitle ?? "Where it is used"}</h3>
                <ul className="pv-tags">
                  {pv.uses.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {pv.properties?.length ? (
              <section className="pv-sec">
                <h3>Specifications</h3>
                <dl className="pv-specs">
                  {pv.properties.map((r) => (
                    <div key={r.property}>
                      <dt>{r.property}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
            {pv.dilution || pv.dilutionRatios?.length ? (
              <section className="pv-sec">
                <h3>Dilution{pv.dilution ? `: ${pv.dilution}` : ""}</h3>
                {pv.dilutionRatios?.length ? (
                  <dl className="pv-specs">
                    {pv.dilutionRatios.map((r) => (
                      <div key={r.operation}>
                        <dt>{r.operation}</dt>
                        <dd>{r.ratio}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </section>
            ) : null}
            {pv.howTo?.length ? (
              <section className="pv-sec">
                <h3>{pv.howToTitle ?? "How to use"}</h3>
                <ul className="pv-list">
                  {pv.howTo.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {pv.packing || pv.storage || pv.shelfLife ? (
              <section className="pv-sec">
                <h3>Packing &amp; storage</h3>
                <dl className="pv-specs">
                  {pv.packing ? (
                    <div>
                      <dt>Packing</dt>
                      <dd>{pv.packing}</dd>
                    </div>
                  ) : null}
                  {pv.storage ? (
                    <div>
                      <dt>Storage</dt>
                      <dd>{pv.storage}</dd>
                    </div>
                  ) : null}
                  {pv.shelfLife ? (
                    <div>
                      <dt>Shelf life</dt>
                      <dd>{pv.shelfLife}</dd>
                    </div>
                  ) : null}
                </dl>
              </section>
            ) : null}
            {pv.note ? <p className="pv-note">{pv.note}</p> : null}

            <section className="pv-sec pv-more">
              <h3>Similar products</h3>
              <ul className="pv-similar">
                {similar.map((s2) => (
                  <li key={s2.key}>
                    <button type="button" className="pv-mini" onClick={() => openProduct(s2.key)}>
                      <span className="pv-mini-media">
                        <Photo src={s2.image} alt="" />
                      </span>
                      <span className="pv-mini-type">{s2.type}</span>
                      <span className="pv-mini-name">{s2.name}</span>
                      <span className="pv-mini-go">View product</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* always at the foot: Add to cart and Order on WhatsApp */}
          <div className="pv-buy">
            {pvLine ? (
              <button type="button" className="pv-add is-in" onClick={() => setOpen(true)}>
                <CartIcon /> Go to cart ({pvLine.qty})
              </button>
            ) : (
              <button type="button" className="pv-add" onClick={() => addQty(pv, pvQty)}>
                <CartIcon /> Add to cart
              </button>
            )}
            <a href={pvWa} className="pv-wa" target="_blank" rel="noopener noreferrer">
              <WaIcon /> Order on WhatsApp
            </a>
          </div>
        </div>
      ) : null}

      <div className={`pdrawer-dim${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`pdrawer${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden={!open} data-lenis-prevent>
        <div className="cart-head">
          <span className="cart-head-ic" aria-hidden="true">
            <CartIcon />
          </span>
          <div className="cart-head-t">
            <h2 id="cart-title">Your cart</h2>
            <p>
              {cart.length
                ? `${cart.length} ${cart.length === 1 ? "product" : "products"} · ${count} ${count === 1 ? "item" : "items"}`
                : "Nothing added yet"}
            </p>
          </div>
          <button type="button" ref={closeRef} className="cart-close" onClick={() => setOpen(false)} aria-label="Close cart" tabIndex={open ? 0 : -1}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="cart-body">
          {cart.length ? (
            <ul className="cart-list">
              {cart.map((l) => (
                <li key={l.id} className="cart-item">
                  <span className="cart-tile" aria-hidden="true">
                    <DrumIcon />
                  </span>
                  <div className="cart-info">
                    <b className="cart-name">{l.name}</b>
                    <span className="cart-tags">
                      <span className="cart-tag">{l.type}</span>
                      {l.grade ? <span className="cart-tag cart-tag-grade">{l.grade}</span> : null}
                    </span>
                    <div className="cart-row">
                      <div className="cart-qty" role="group" aria-label={`Quantity of ${l.name}`}>
                        <button type="button" onClick={() => setQty(l.id, l.qty - 1)} aria-label="One less" tabIndex={open ? 0 : -1}>
                          −
                        </button>
                        <span>{l.qty}</span>
                        <button type="button" onClick={() => setQty(l.id, l.qty + 1)} aria-label="One more" tabIndex={open ? 0 : -1}>
                          +
                        </button>
                      </div>
                      <button type="button" className="cart-del" onClick={() => setQty(l.id, 0)} aria-label={`Remove ${l.name}`} tabIndex={open ? 0 : -1}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 12.5h9l1-12.5M10 11v5M14 11v5" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="cart-empty">
              <span className="cart-empty-ic" aria-hidden="true">
                <CartIcon />
              </span>
              <p>Your cart is empty</p>
              <span>Add products from the list, then send us the order on WhatsApp.</span>
              <button type="button" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                Browse products
              </button>
            </div>
          )}

          {cart.length ? (
            <button type="button" className="cart-more" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              + Add more products
            </button>
          ) : null}

          <div className="cart-next">
            <p className="cart-next-k">What happens next</p>
            <ol>
              <li>
                <b>1</b> You send the list on WhatsApp
              </li>
              <li>
                <b>2</b> We check stock and reply with price and delivery
              </li>
              <li>
                <b>3</b> You confirm, and we dispatch
              </li>
            </ol>
          </div>
        </div>

        <div className="cart-foot">
          <label className="cart-notes">
            <span>Add a note (optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Pack size, quantity in litres or kg, delivery city…"
              tabIndex={open ? 0 : -1}
            />
          </label>
          <a href={cart.length ? waHref : undefined} aria-disabled={!cart.length} className="cart-wa" target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1}>
            <WaIcon /> Send order on WhatsApp
          </a>
          {cart.length ? (
            <button type="button" className="cart-clear cart-clear-solo" onClick={() => setCart([])} tabIndex={open ? 0 : -1}>
              Clear cart
            </button>
          ) : null}
          <p className="cart-fine">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.4 7.5 9.5 4.3-1.1 7.5-5 7.5-9.5V6L12 3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            No payment now. We confirm price, stock and delivery first.
          </p>
        </div>
      </aside>
    </section>
  );
}

/** The frame a product photo goes in (the same look as ui.tsx's MediaSlot, without its imports). */
function PhotoSlot() {
  return (
    <div className="media-slot" style={{ aspectRatio: "4 / 3" }} aria-hidden="true" data-media-slot>
      <span className="media-slot-in">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7.5h3l1.6-2.5h6.8L17 7.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z" />
          <circle cx="12" cy="13" r="3.6" />
        </svg>
        <span className="media-slot-label">Product photo</span>
        <span className="media-slot-size">800 × 600 px</span>
      </span>
    </div>
  );
}

/** A product's photo, or the empty frame where one will go. */
function Photo({ src, alt }: { src?: string; alt: string }) {
  if (!src) return <PhotoSlot />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="kphoto" src={src} alt={alt} width={800} height={600} loading="lazy" decoding="async" />;
}

/** A small drum, for a product in the cart. */
function DrumIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="7" ry="2.5" />
      <path d="M5 5v14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" />
      <path d="M5 10c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5M5 15c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L20.5 8H6.2" />
      <circle cx="9.5" cy="19.5" r="1.3" />
      <circle cx="17" cy="19.5" r="1.3" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
