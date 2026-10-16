import type { ReactNode } from "react";
import { routes } from "../content/site";
import { lines as allLines, type Line } from "../content/catalogue";
import type { Article } from "../content/articles";
import { ArticleCard } from "./ArticleCard";
import { Arrow, SectionHead, MediaSlot } from "./ui";
import { SwipeUI } from "./Swipe";

/**
 * The picture beside a page's h1 (the blog): 4:3 at every size, cut to the
 * frame's exact shape so the watermark in its corner always shows. It opens
 * like a roller shutter as the page loads and floats slightly slower than the
 * page (cinema.ts).
 */
export function HeaderFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="w-full" data-drift="0.05">
      <div className="media aspect-[4/3] rounded-sm" data-shutter>
        <MediaSlot label="Page photo" w={1200} h={900} />
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-4">
        <span className="label text-mute">{caption}</span>
      </figcaption>
    </figure>
  );
}

/** A section with the standard head: label, heading, optional text and link on the right. */
export function SectionIntro({
  label,
  heading,
  id,
  aside,
  size = "sm",
  wide = false,
}: {
  label: string;
  heading: ReactNode;
  id: string;
  aside?: ReactNode;
  size?: "sm" | "md";
  /** The heading across most of the width (two lines rather than four), the aside beside its last line. */
  wide?: boolean;
}) {
  const span = wide ? (aside ? "lg:col-span-8" : "lg:col-span-11") : "lg:col-span-7";
  return (
    <>
      <SectionHead>{label}</SectionHead>
      <div className={`grid gap-8 lg:grid-cols-12 lg:gap-8 ${wide ? "mt-10 lg:mt-14" : "mt-12 lg:mt-20"}`}>
        <h2 id={id} className={`display ${span} ${size === "md" ? "text-display-md" : wide ? "text-display-wide" : "text-display-sm"}`} data-split>
          {heading}
        </h2>
        {aside ? (
          <div className="self-end lg:col-span-4 lg:col-start-9" data-reveal>
            {aside}
          </div>
        ) : null}
      </div>
    </>
  );
}

/** Product lines as cards, each linking to its page. */
export function LineCards({ list, level = 3 }: { list: readonly Line[]; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <>
      <ul className={`m-swipe grid gap-x-6 gap-y-14 ${list.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`} data-swipe>
        {list.map((l) => (
          <li key={l.id} data-reveal>
            <article className="card group" data-tilt>
              <div className="media aspect-[4/3] rounded-sm" data-shutter>
                <MediaSlot label="Product line photo" w={1200} h={900} />
              </div>
              <p className="label mt-6 text-amber">{l.index}</p>
              <H className="display-tight mt-3 text-2xl leading-tight">
                <a href={routes.line(l.slug)} className="card-link hover:text-amber">
                  {l.title}
                </a>
              </H>
              <p className="mt-3 text-mute">{l.description}</p>
              <p className="mt-5 text-sm leading-relaxed text-bone/70">{l.products.map((p) => p.name).join(" · ")}</p>
              <p className="label mt-6 inline-flex items-center gap-3 text-bone/80 group-hover:text-amber" aria-hidden="true">
                View {l.short.toLowerCase()} <Arrow />
              </p>
            </article>
          </li>
        ))}
      </ul>
      <SwipeUI count={list.length} label="product line" />
    </>
  );
}

/** A row of guides from the blog. */
export function Guides({
  list,
  label,
  heading,
  id = "guides",
  wide = false,
}: {
  list: readonly Article[];
  label: string;
  heading: string;
  id?: string;
  /** The heading across most of the width (see SectionIntro). */
  wide?: boolean;
}) {
  return (
    <section id={id} className="section border-t border-bone/10" aria-labelledby={`${id}-title`}>
      <div className="frame">
        <SectionIntro
          label={label}
          heading={heading}
          id={`${id}-title`}
          wide={wide}
          aside={
            <a href={routes.blog} className="btn btn-ghost" data-magnetic>
              All articles <Arrow />
            </a>
          }
        />
        <ul className={`m-swipe mt-16 grid gap-x-6 gap-y-14 lg:mt-24 ${list.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`} data-swipe>
          {list.map((a) => (
            <li key={a.slug} data-reveal>
              <ArticleCard a={a} />
            </li>
          ))}
        </ul>
        <SwipeUI count={list.length} label="guide" />
      </div>
    </section>
  );
}

/** Products page header: the three lines as tall thumbnails, each opening its page. */
export function LineThumbs() {
  return (
    <nav aria-label="Product lines" data-reveal>
      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {allLines.map((l) => (
          <li key={l.id}>
            <a href={routes.line(l.slug)} className="group block">
              <div className="media aspect-[4/5] rounded-sm" data-shutter>
                <MediaSlot label="Product line photo" w={1200} h={1500} />
              </div>
              <span className="label mt-3 block text-amber">{l.index}</span>
              <span className="mt-1.5 flex items-start justify-between gap-2 text-sm leading-snug text-bone transition-colors group-hover:text-amber">
                {l.title}
                <Arrow className="mt-1 hidden shrink-0 sm:block" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
