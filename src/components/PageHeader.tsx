import type { ReactNode } from "react";
import type { Crumb } from "../content/pages";

/** Where the page sits: Home / Products / Lubricants & Greases. The last crumb is the page itself. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs label" data-reveal>
      <ol>
        {trail.map((c, i) =>
          i < trail.length - 1 ? (
            <li key={c.path}>
              <a href={c.path}>{c.name}</a>
              <span className="crumbs-sep" aria-hidden="true">
                /
              </span>
            </li>
          ) : (
            <li key={c.path}>
              <span aria-current="page">{c.name}</span>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

export type FactItem = { value: string; label: string };

/** A row of short facts under a page header: 70+ / Products. */
export function Facts({ items }: { items: readonly FactItem[] }) {
  return (
    <dl className="facts" data-reveal>
      {items.map((f) => (
        <div key={f.label} className="facts-item">
          <dt className="label text-mute">{f.label}</dt>
          <dd className="display-tight facts-value">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The top of every page but Home: breadcrumbs, a label, the page's h1 and the
 * sentence under it, buttons, and optionally a picture beside it and a row of
 * facts below. The h1 rises word by word (reveal.ts, data-split), so it holds
 * plain text only.
 */
export function PageHeader({
  trail,
  label,
  title,
  lead,
  actions,
  aside,
  facts,
  children,
  id = "page-title",
}: {
  trail: Crumb[];
  label: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  facts?: readonly FactItem[];
  /** Anything else under the lead (e.g. the "on this page" links). */
  children?: ReactNode;
  id?: string;
}) {
  return (
    <header className="page-head" aria-labelledby={id}>
      <div className="frame">
        <Breadcrumbs trail={trail} />
        <div className={`mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-8 ${aside ? "lg:items-end" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "lg:col-span-11"}>
            <p className="label text-amber" data-reveal>
              {label}
            </p>
            <h1 id={id} className={`page-title display-tight mt-6 ${aside ? "" : "max-w-[18ch]"}`} data-split>
              {title}
            </h1>
            {lead ? (
              <p className="mt-8 max-w-measure text-lg leading-relaxed text-bone/90 md:text-xl" data-reveal>
                {lead}
              </p>
            ) : null}
            {children}
            {actions ? (
              <div className="mt-10 flex flex-wrap gap-3" data-reveal>
                {actions}
              </div>
            ) : null}
          </div>
          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
        {facts ? <Facts items={facts} /> : null}
      </div>
    </header>
  );
}
